import { after, NextResponse } from "next/server";
import type PocketBase from "pocketbase";
import { getAssumptions } from "@/lib/assumptions";
import { providerMonthlyCost } from "@/lib/fees";
import { CONSENT_VERSION, consentText, type Lead, leadSchema } from "@/lib/leads";
import { getPocketBaseAdminClient } from "@/lib/pocketbase";
import { getProviders } from "@/lib/providers";
import { trackServerEvent } from "@/lib/tracking";
import { SIGNATURE_HEADER, signBody } from "@/lib/webhook";

const WEBHOOK_TIMEOUT_MS = 8000;

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

type Webhook = { url: string; secret: string };

/**
 * Read with the admin client so the URL and secret never have to be publicly readable. A provider with a URL
 * but no secret gets nothing sent: unsigned leads can't be proven to come from us.
 */
async function getProviderWebhook(client: PocketBase, slug: string): Promise<Webhook | null> {
  try {
    const record = await client.collection("providers").getFirstListItem(client.filter("slug = {:slug}", { slug }), {
      fields: "outboundWebhookUrl,outboundWebhookSecret",
    });
    const url = record.outboundWebhookUrl as string;
    const secret = record.outboundWebhookSecret as string;
    if (url && !secret) console.warn(`[leads] ${slug} has a webhook URL but no secret; forward by hand.`);
    return url && secret ? { url, secret } : null;
  } catch {
    return null;
  }
}

/** First address in X-Forwarded-For is the client; later ones are proxies. */
function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
}

async function deliver(client: PocketBase, leadId: string, webhook: Webhook, payload: unknown) {
  let delivery: "sent" | "failed" = "failed";
  const body = JSON.stringify(payload);
  try {
    const res = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER]: signBody(webhook.secret, body),
        "X-NovatedCalc-Lead-Id": leadId,
      },
      body,
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (res.ok) delivery = "sent";
  } catch {
    // Recorded as failed below, then forwarded by hand from the admin.
  }
  await client.collection("leads").update(leadId, { delivery });
  trackServerEvent("lead_delivery", { delivery });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request.");
  }

  // Honeypot: people never see this field, so anything in it is a bot. Pretend it worked.
  if (body.website) return NextResponse.json({ ok: true });

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return fail(400, "Check your details and try again.");
  const lead: Lead = parsed.data;

  const [providers, assumptions] = await Promise.all([getProviders(), getAssumptions()]);
  const provider = providers.find((p) => p.slug === lead.providerSlug);
  if (!provider) return fail(404, "That provider isn't available any more.");
  // Made-up preview providers have nobody to receive a lead, so never store details for them.
  if (provider.sample) return fail(409, "Quote requests aren't available for example listings.");

  const unavailable = () => {
    trackServerEvent("lead_unstored", { providerSlug: provider.slug });
    return fail(503, "We couldn't send your request just now. Please try again shortly.");
  };
  const client = await getPocketBaseAdminClient().catch(() => null);
  if (!client) return unavailable();

  // Recalculated here rather than trusted from the browser.
  const estimatedMonthlyCost = Math.round(providerMonthlyCost(provider, lead.calculatorInput, assumptions) * 100) / 100;
  const consent = consentText(provider.name);
  const webhook = await getProviderWebhook(client, provider.slug);
  // Evidence of consent, kept so we can show any provider (or the person) exactly what was agreed and when.
  const consentedAt = new Date().toISOString();
  const pageUrl = req.headers.get("referer") ?? "";

  const record = await client
    .collection("leads")
    .create({
      providerSlug: provider.slug,
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      postcode: lead.postcode,
      state: lead.state,
      vehicleName: lead.vehicleName ?? "",
      calculatorInput: lead.calculatorInput,
      estimatedMonthlyCost,
      consentText: consent,
      consentVersion: CONSENT_VERSION,
      consentedAt,
      pageUrl,
      ipAddress: clientIp(req),
      userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? "",
      delivery: webhook ? "pending" : "manual",
    })
    .catch(() => null);
  if (!record) return unavailable();

  if (webhook) {
    const payload = {
      leadId: record.id,
      submittedAt: consentedAt,
      provider: provider.slug,
      contact: {
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        postcode: lead.postcode,
        state: lead.state,
      },
      vehicle: lead.vehicleName ?? null,
      calculatorInput: lead.calculatorInput,
      estimatedMonthlyCost,
      consent: { text: consent, version: CONSENT_VERSION, consentedAt, pageUrl, exclusiveTo: provider.slug },
    };
    after(() => deliver(client, record.id, webhook, payload));
  }

  trackServerEvent("lead_stored", { providerSlug: provider.slug, routed: !!webhook });
  return NextResponse.json({ ok: true });
}

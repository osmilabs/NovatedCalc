import { NextResponse } from "next/server";
import { z } from "zod";
import { getPocketBaseAdminClient } from "@/lib/pocketbase";
import { getProviders } from "@/lib/providers";
import { trackServerEvent } from "@/lib/tracking";

const leadSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  postcode: z.string().min(3).max(4),
  state: z.string().min(2).max(3),
  preferredProviderSlugs: z.array(z.string()).default([]),
  consentAccepted: z.literal(true),
  calculatorInput: z.object({
    salary: z.number().positive(),
    carPrice: z.number().positive(),
    leaseTermMonths: z.number().int().positive(),
    kilometresPerYear: z.number().positive(),
    vehicleType: z.enum(["ev", "non-ev"]),
  }),
  calculatorResult: z.object({
    monthlyLeaseCost: z.number(),
    monthlyPackageCost: z.number(),
    monthlyTakeHomeImpact: z.number(),
    estimatedAnnualSavings: z.number(),
    estimatedTermSavings: z.number(),
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lead = leadSchema.parse(body);
    const providers = await getProviders();

    const matchedProviders =
      lead.preferredProviderSlugs.length > 0
        ? providers.filter((provider) => lead.preferredProviderSlugs.includes(provider.slug))
        : providers.filter((provider) => provider.states.includes(lead.state)).slice(0, 3);

    const client = await getPocketBaseAdminClient();
    if (client) {
      await client.collection("leads").create({
        ...lead,
        matchedProviders: matchedProviders.map((provider) => provider.slug),
      });
    }

    // Optional outbound routing: only active when env toggle is enabled.
    if (process.env.LEAD_ROUTING_ENABLED === "true") {
      await Promise.all(
        matchedProviders.map(async (provider) => {
          if (provider.outboundWebhookUrl) {
            await fetch(provider.outboundWebhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lead, provider: provider.slug }),
            });
          }
        }),
      );
    }

    trackServerEvent("lead_stored", { matchedProviders: matchedProviders.length });
    return NextResponse.json({ ok: true, matchedProviders: matchedProviders.map((p) => p.slug) });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}

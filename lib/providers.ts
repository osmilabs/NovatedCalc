import { fallbackProviders, fallbackSeoPages } from "@/lib/mock-data";
import { getPocketBaseClient } from "@/lib/pocketbase";
import type { Provider, SeoPage } from "@/lib/types";

export async function getProviders(): Promise<Provider[]> {
  const client = getPocketBaseClient();
  if (!client) return fallbackProviders;

  try {
    const records = await client.collection("providers").getFullList({
      filter: "active = true",
      sort: "-responsivenessScore",
    });

    if (!records.length) return fallbackProviders;

    return records.map((record) => ({
      id: record.id,
      slug: record.slug,
      name: record.name,
      states: record.states ?? [],
      serviceModel: record.serviceModel,
      setupFee: record.setupFee ?? 0,
      monthlyAdminFee: record.monthlyAdminFee ?? 0,
      inclusions: record.inclusions ?? [],
      responsivenessScore: record.responsivenessScore ?? 0,
      supportChannels: record.supportChannels ?? [],
      affiliateLink: record.affiliateLink ?? undefined,
      summary: record.summary ?? "",
      active: !!record.active,
    }));
  } catch {
    return fallbackProviders;
  }
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const providers = await getProviders();
  return providers.find((provider) => provider.slug === slug) ?? null;
}

export async function getSeoPages(): Promise<SeoPage[]> {
  const client = getPocketBaseClient();
  if (!client) return fallbackSeoPages;

  try {
    const records = await client.collection("seo_pages").getFullList({ sort: "slug" });
    if (!records.length) return fallbackSeoPages;
    return records.map((record) => ({
      slug: record.slug,
      keyword: record.keyword,
      title: record.title,
      description: record.description,
      hero: record.hero,
      body: record.body,
      faq: record.faq ?? [],
    }));
  } catch {
    return fallbackSeoPages;
  }
}

export async function getSeoPageBySlug(slug: string): Promise<SeoPage | null> {
  const pages = await getSeoPages();
  return pages.find((page) => page.slug === slug) ?? null;
}

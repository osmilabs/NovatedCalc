import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { getProviders } from "@/lib/providers";
import { absoluteUrl } from "@/lib/site";

/** Indexable pages only: no calculator results, and no example (sample) providers. */
const STATIC_PATHS = [
  "/",
  "/novated-lease-calculator",
  "/novated-lease-comparison",
  "/how-novated-leasing-works",
  "/guides",
  "/ev-novated-lease-comparison",
  "/best-novated-lease-provider-australia",
  "/novated-lease-without-phone-number",
  "/novated-lease-brisbane",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const providers = await getProviders();
  return [
    ...STATIC_PATHS.map((path) => ({ url: absoluteUrl(path) })),
    ...GUIDES.map((guide) => ({ url: absoluteUrl(`/guides/${guide.slug}`), lastModified: guide.updated })),
    ...providers
      .filter((provider) => !provider.sample)
      .map((provider) => ({ url: absoluteUrl(`/providers/${provider.slug}`) })),
  ];
}

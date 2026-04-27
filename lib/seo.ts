import type { SeoPage } from "@/lib/types";
import { getSeoPageBySlug } from "@/lib/providers";

export async function resolveSeoPage(slug: string): Promise<SeoPage> {
  const page = await getSeoPageBySlug(slug);
  if (!page) {
    return {
      slug,
      keyword: slug.replaceAll("-", " "),
      title: `Novated Lease Guide: ${slug.replaceAll("-", " ")}`,
      description: "Estimate-first novated lease research page for Australian users.",
      hero: slug.replaceAll("-", " "),
      body: "Compare providers on inclusions and service quality before sharing your details.",
      faq: [],
    };
  }
  return page;
}

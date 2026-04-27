import type { Metadata } from "next";
import { SeoLanding } from "@/components/seo/SeoLanding";
import { resolveSeoPage } from "@/lib/seo";

const slug = "novated-lease-without-phone-number";

export async function generateMetadata(): Promise<Metadata> {
  const page = await resolveSeoPage(slug);
  return { title: page.title, description: page.description };
}

export default async function NovatedLeaseWithoutPhonePage() {
  const page = await resolveSeoPage(slug);
  return <SeoLanding page={page} />;
}

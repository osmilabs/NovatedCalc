import type { Metadata } from "next";
import { SeoLanding } from "@/components/seo/SeoLanding";
import { resolveSeoPage } from "@/lib/seo";

const slug = "novated-lease-brisbane";

export async function generateMetadata(): Promise<Metadata> {
  const page = await resolveSeoPage(slug);
  return { title: page.title, description: page.description };
}

export default async function NovatedLeaseBrisbanePage() {
  const page = await resolveSeoPage(slug);
  return <SeoLanding page={page} />;
}

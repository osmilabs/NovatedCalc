import type { Metadata } from "next";
import { SeoLanding } from "@/components/seo/SeoLanding";
import { resolveSeoPage } from "@/lib/seo";

/** The indexable landing page. Results live at ./results and are only reachable through the calculator. */
const slug = "novated-lease-comparison";

export async function generateMetadata(): Promise<Metadata> {
  const page = await resolveSeoPage(slug);
  return { title: page.title, description: page.description, alternates: { canonical: `/${slug}` } };
}

export default async function NovatedLeaseComparisonPage() {
  const page = await resolveSeoPage(slug);
  return <SeoLanding page={page} />;
}

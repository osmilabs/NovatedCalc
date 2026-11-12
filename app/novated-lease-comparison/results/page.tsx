import type { Metadata } from "next";
import { ProviderComparison } from "@/components/comparison/ProviderComparison";
import { getAssumptions } from "@/lib/assumptions";
import { getProviders } from "@/lib/providers";

/** Personal results from the calculator journey, so kept out of search. The landing page is one level up. */
export const metadata: Metadata = {
  title: "Your Novated Lease Comparison",
  robots: { index: false },
};

export default async function ComparisonPage() {
  const [providers, assumptions] = await Promise.all([getProviders(), getAssumptions()]);

  return <ProviderComparison providers={providers} assumptions={assumptions} />;
}

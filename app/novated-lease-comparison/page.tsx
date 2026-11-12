import type { Metadata } from "next";
import { ProviderComparison } from "@/components/comparison/ProviderComparison";
import { EstimateChip } from "@/components/ui/EstimateChip";
import { getAssumptions } from "@/lib/assumptions";
import { getProviders } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Novated Lease Comparison Australia",
  description:
    "Compare Australian novated lease providers on what they'd cost you each month, their fees, rates and inclusions.",
};

export default async function ComparisonPage() {
  const [providers, assumptions] = await Promise.all([getProviders(), getAssumptions()]);

  return (
    <>
      <EstimateChip />
      <ProviderComparison providers={providers} assumptions={assumptions} />
    </>
  );
}

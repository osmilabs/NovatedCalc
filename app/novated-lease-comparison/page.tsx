import type { Metadata } from "next";
import { ProviderComparisonTable } from "@/components/comparison/ProviderComparisonTable";
import { getProviders } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Novated Lease Comparison Australia",
  description:
    "Compare Australian novated lease providers on fees, inclusions, service model, and responsiveness.",
};

export default async function ComparisonPage() {
  const providers = await getProviders();

  return (
    <>
      <section className="glass-card hero">
        <h1>Novated lease comparison</h1>
        <p className="muted">
          Rates are usually quote-only. Compare known factors that materially impact your experience.
        </p>
      </section>
      <ProviderComparisonTable providers={providers} />
    </>
  );
}

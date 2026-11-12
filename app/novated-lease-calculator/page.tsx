import type { Metadata } from "next";
import { CalculatorFlow } from "@/components/calculator/CalculatorFlow";
import { getAssumptions } from "@/lib/assumptions";

export const metadata: Metadata = {
  title: "Novated Lease Calculator Australia",
  description:
    "Compare novated lease and car loan outcomes with clear assumptions and minimal inputs.",
  alternates: { canonical: "/novated-lease-calculator" },
};

// Rendered per request so the calculator can read ?step= on the server and render the right step.
export const dynamic = "force-dynamic";

export default async function CalculatorPage() {
  const assumptions = await getAssumptions();
  return <CalculatorFlow defaultAssumptions={assumptions} />;
}

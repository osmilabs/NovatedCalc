import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { defaultAssumptions } from "@/lib/mock-data";
import { getPocketBaseClient } from "@/lib/pocketbase";

export const metadata: Metadata = {
  title: "Novated Lease Calculator Australia",
  description:
    "Compare novated lease and car loan outcomes with clear assumptions and minimal inputs.",
};

async function getAssumptions() {
  const client = getPocketBaseClient();
  if (!client) return defaultAssumptions;

  try {
    const record = await client.collection("calculator_assumptions").getFirstListItem("active = true");
    return {
      gstRate: record.gstRate ?? defaultAssumptions.gstRate,
      novatedLeaseInterestRateAnnual:
        record.novatedLeaseInterestRateAnnual ?? defaultAssumptions.novatedLeaseInterestRateAnnual,
      carLoanInterestRateAnnual: record.carLoanInterestRateAnnual ?? defaultAssumptions.carLoanInterestRateAnnual,
      adminFeeMonthly: record.adminFeeMonthly ?? defaultAssumptions.adminFeeMonthly,
      insuranceMonthly: record.insuranceMonthly ?? defaultAssumptions.insuranceMonthly,
      maintenanceMonthly: record.maintenanceMonthly ?? defaultAssumptions.maintenanceMonthly,
      evFbtExemptionBenefitRate:
        record.evFbtExemptionBenefitRate ??
        record.evFbtDiscount ??
        defaultAssumptions.evFbtExemptionBenefitRate,
      fuelAndRunningRatePerKm: record.fuelAndRunningRatePerKm ?? defaultAssumptions.fuelAndRunningRatePerKm,
      registrationMonthly: record.registrationMonthly ?? defaultAssumptions.registrationMonthly,
    };
  } catch {
    return defaultAssumptions;
  }
}

export default async function CalculatorPage() {
  const assumptions = await getAssumptions();
  return (
    <>
      <section className="glass-card hero">
        <h1>Novated lease calculator</h1>
        <p className="muted">
          Compare a novated lease with a standard car loan using conservative assumptions and minimal inputs.
        </p>
      </section>
      <CalculatorForm assumptions={assumptions} />
    </>
  );
}

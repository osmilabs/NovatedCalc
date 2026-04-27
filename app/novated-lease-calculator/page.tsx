import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { defaultAssumptions } from "@/lib/mock-data";
import { getPocketBaseClient } from "@/lib/pocketbase";

export const metadata: Metadata = {
  title: "Novated Lease Calculator Australia",
  description:
    "Estimate monthly cost, take-home impact, and potential novated lease savings in Australia.",
};

async function getAssumptions() {
  const client = getPocketBaseClient();
  if (!client) return defaultAssumptions;

  try {
    const record = await client.collection("calculator_assumptions").getFirstListItem("active = true");
    return {
      gstRate: record.gstRate ?? defaultAssumptions.gstRate,
      adminFeeMonthly: record.adminFeeMonthly ?? defaultAssumptions.adminFeeMonthly,
      insuranceMonthly: record.insuranceMonthly ?? defaultAssumptions.insuranceMonthly,
      maintenanceMonthly: record.maintenanceMonthly ?? defaultAssumptions.maintenanceMonthly,
      evFbtDiscount: record.evFbtDiscount ?? defaultAssumptions.evFbtDiscount,
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
          Estimate monthly package cost, take-home impact and potential savings before requesting quotes.
        </p>
      </section>
      <CalculatorForm assumptions={assumptions} />
    </>
  );
}

import { defaultAssumptions } from "@/lib/mock-data";
import { getPocketBaseClient } from "@/lib/pocketbase";
import type { CalculatorAssumptions } from "@/lib/types";

export async function getAssumptions(): Promise<CalculatorAssumptions> {
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
      fuelAndRunningRatePerKm: record.fuelAndRunningRatePerKm ?? defaultAssumptions.fuelAndRunningRatePerKm,
      registrationMonthly: record.registrationMonthly ?? defaultAssumptions.registrationMonthly,
    };
  } catch {
    return defaultAssumptions;
  }
}

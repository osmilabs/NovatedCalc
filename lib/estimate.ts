import type { CalculatorAssumptions, CalculatorInput, CalculatorResult } from "@/lib/types";

function round(n: number) {
  return Math.round(n * 100) / 100;
}

export function estimateNovatedLease(
  input: CalculatorInput,
  assumptions: CalculatorAssumptions,
): CalculatorResult {
  const residualRate = input.leaseTermMonths >= 48 ? 0.28 : input.leaseTermMonths >= 36 ? 0.37 : 0.46;
  const financedAmount = input.carPrice * (1 - residualRate);
  const monthlyLeaseCost = financedAmount / input.leaseTermMonths;
  const runningMonthly =
    assumptions.insuranceMonthly +
    assumptions.maintenanceMonthly +
    assumptions.registrationMonthly +
    (input.kilometresPerYear / 12) * assumptions.fuelAndRunningRatePerKm;
  const monthlyPackageCost = monthlyLeaseCost + assumptions.adminFeeMonthly + runningMonthly;

  const marginalTaxRate = input.salary >= 180000 ? 0.45 : input.salary >= 120000 ? 0.37 : input.salary >= 45000 ? 0.325 : 0.19;
  const gstBenefit = monthlyPackageCost * assumptions.gstRate;
  const fbtFactor = input.vehicleType === "ev" ? assumptions.evFbtDiscount : 0;
  const taxBenefit = monthlyPackageCost * (marginalTaxRate + fbtFactor);

  const monthlyTakeHomeImpact = monthlyPackageCost - taxBenefit - gstBenefit;
  const estimatedAnnualSavings = (monthlyPackageCost - monthlyTakeHomeImpact) * 12;
  const estimatedTermSavings = estimatedAnnualSavings * (input.leaseTermMonths / 12);

  return {
    monthlyLeaseCost: round(monthlyLeaseCost),
    monthlyPackageCost: round(monthlyPackageCost),
    monthlyTakeHomeImpact: round(monthlyTakeHomeImpact),
    estimatedAnnualSavings: round(estimatedAnnualSavings),
    estimatedTermSavings: round(estimatedTermSavings),
  };
}

import type { CalculatorAssumptions, CalculatorInput, CalculatorResult } from "@/lib/types";

function round(n: number) {
  return Math.round(n * 100) / 100;
}

function monthlyPayment(principal: number, annualRate: number, months: number) {
  if (months <= 0) return 0;
  if (annualRate <= 0) return principal / months;
  const monthlyRate = annualRate / 12;
  const factor = (1 + monthlyRate) ** months;
  return principal * ((monthlyRate * factor) / (factor - 1));
}

export const LEASE_TERM_OPTIONS = [24, 36, 48, 60];

export function getResidualRate(termMonths: number) {
  if (termMonths >= 60) return 0.2;
  if (termMonths >= 48) return 0.28;
  if (termMonths >= 36) return 0.37;
  return 0.46;
}

export function getMarginalTaxRate(salary: number) {
  if (salary >= 180000) return 0.45;
  if (salary >= 120000) return 0.37;
  if (salary >= 45000) return 0.325;
  return 0.19;
}

export function estimateNovatedLease(
  input: CalculatorInput,
  assumptions: CalculatorAssumptions,
): CalculatorResult {
  const termMonths = Math.max(1, input.leaseTermMonths);
  const residualRate = getResidualRate(termMonths);
  const residualDueAtEnd = input.carPrice * residualRate;
  const financedAmount = Math.max(0, input.carPrice - residualDueAtEnd);
  const marginalTaxRate = getMarginalTaxRate(input.salary);

  const nlMonthlyFinanceCost = monthlyPayment(
    financedAmount,
    assumptions.novatedLeaseInterestRateAnnual,
    termMonths,
  );
  const runningMonthly =
    assumptions.insuranceMonthly +
    assumptions.maintenanceMonthly +
    assumptions.registrationMonthly +
    (input.kilometresPerYear / 12) * assumptions.fuelAndRunningRatePerKm;

  const nlMonthlyPackageCost = nlMonthlyFinanceCost + assumptions.adminFeeMonthly + runningMonthly;
  const nlPreTaxSaving = nlMonthlyPackageCost * marginalTaxRate;
  const nlGstSaving = nlMonthlyPackageCost * assumptions.gstRate;
  const nlEvBenefit =
    input.vehicleType === "ev" ? nlMonthlyPackageCost * assumptions.evFbtExemptionBenefitRate : 0;
  const novatedLeaseMonthlyTakeHomeImpact =
    nlMonthlyPackageCost - nlPreTaxSaving - nlGstSaving - nlEvBenefit;

  const carLoanMonthlyFinanceCost = monthlyPayment(financedAmount, assumptions.carLoanInterestRateAnnual, termMonths);
  const carLoanMonthlyCost = carLoanMonthlyFinanceCost + runningMonthly;
  // Paying cash for the same financed portion, spread over the term with no interest.
  const cashMonthlyCost = financedAmount / termMonths + runningMonthly;

  const monthlyDifference = carLoanMonthlyCost - novatedLeaseMonthlyTakeHomeImpact;
  const termDifference = monthlyDifference * termMonths;
  const comparisonLabel =
    Math.abs(monthlyDifference) < 25 ? "too-close" : monthlyDifference > 0 ? "nl-ahead" : "loan-ahead";

  return {
    novatedLeaseMonthlyTakeHomeImpact: round(novatedLeaseMonthlyTakeHomeImpact),
    carLoanMonthlyCost: round(carLoanMonthlyCost),
    monthlyDifference: round(monthlyDifference),
    termDifference: round(termDifference),
    residualDueAtEnd: round(residualDueAtEnd),
    novatedLeaseMonthlyPackageCost: round(nlMonthlyPackageCost),
    novatedLeaseMonthlyFinanceCost: round(nlMonthlyFinanceCost),
    carLoanMonthlyFinanceCost: round(carLoanMonthlyFinanceCost),
    runningMonthlyCost: round(runningMonthly),
    taxSavingMonthly: round(nlPreTaxSaving + nlGstSaving + nlEvBenefit),
    cashMonthlyCost: round(cashMonthlyCost),
    financedAmount: round(financedAmount),
    marginalTaxRate,
    residualRate,
    comparisonLabel,
  };
}

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

/** ATO minimum residual values for car leases (TD 93/142), by whole years of lease term. */
const MINIMUM_RESIDUALS: Record<number, number> = { 1: 0.6563, 2: 0.5625, 3: 0.4688, 4: 0.375, 5: 0.2813 };

export function getResidualRate(termMonths: number) {
  const years = Math.min(5, Math.max(1, Math.floor(termMonths / 12)));
  return MINIMUM_RESIDUALS[years];
}

/** Medicare levy, which salary packaging also saves. Ignores the low-income phase-in. */
const MEDICARE_LEVY = 0.02;

/** 2026-27 resident marginal income tax rate plus the Medicare levy. */
export function getMarginalTaxRate(salary: number) {
  if (salary > 190000) return 0.45 + MEDICARE_LEVY;
  if (salary > 135000) return 0.37 + MEDICARE_LEVY;
  if (salary > 45000) return 0.3 + MEDICARE_LEVY;
  if (salary > 18200) return 0.15 + MEDICARE_LEVY;
  return 0;
}

/** 2026-27 car limit. Your employer can claim back the GST on a car's price up to this amount. */
export const CAR_LIMIT = 69883;

/**
 * 2026-27 luxury car tax threshold for fuel-efficient vehicles. Electric cars priced at or under it are exempt from
 * FBT. Proposed rules would narrow this for leases starting from 1 April 2027; see the FBT guide.
 */
export const EV_FBT_EXEMPTION_THRESHOLD = 91661;

/** FBT statutory formula: the taxable value of a car is 20% of its base value (GST-inclusive price) per year. */
export const FBT_STATUTORY_RATE = 0.2;

export function isFbtExempt(input: Pick<CalculatorInput, "vehicleType" | "carPrice">) {
  return input.vehicleType === "ev" && input.carPrice <= EV_FBT_EXEMPTION_THRESHOLD;
}

export function estimateNovatedLease(
  input: CalculatorInput,
  assumptions: CalculatorAssumptions,
): CalculatorResult {
  const termMonths = Math.max(1, input.leaseTermMonths);
  const residualRate = getResidualRate(termMonths);
  const marginalTaxRate = getMarginalTaxRate(input.salary);
  /** The GST part of a GST-inclusive amount, e.g. 1/11 at 10%. */
  const gstIn = (amount: number) => (amount * assumptions.gstRate) / (1 + assumptions.gstRate);

  // The employer claims back the GST on the price (up to the car limit), so the lease is written on what's left.
  // The lease payments carry GST too, but the employer claims that back as well, so they cost the GST-free amount.
  const gstCreditOnPrice = gstIn(Math.min(input.carPrice, CAR_LIMIT));
  const leasedAmount = Math.max(0, input.carPrice - gstCreditOnPrice);
  const residualDueAtEnd = leasedAmount * residualRate;
  const financedAmount = leasedAmount - residualDueAtEnd;

  const nlMonthlyFinanceCost = monthlyPayment(
    financedAmount,
    assumptions.novatedLeaseInterestRateAnnual,
    termMonths,
  );
  const fuelMonthly = (input.kilometresPerYear / 12) * assumptions.fuelAndRunningRatePerKm;
  const runningMonthly =
    assumptions.insuranceMonthly + assumptions.maintenanceMonthly + assumptions.registrationMonthly + fuelMonthly;

  const nlMonthlyPackageCost = nlMonthlyFinanceCost + assumptions.adminFeeMonthly + runningMonthly;
  // Registration is a government charge with no GST. Insurance stamp duty is ignored.
  const runningGstCredit = gstIn(
    assumptions.insuranceMonthly + assumptions.maintenanceMonthly + fuelMonthly + assumptions.adminFeeMonthly,
  );
  const packageCostExGst = nlMonthlyPackageCost - runningGstCredit;

  // Employee contribution method: cars that aren't FBT exempt have part of the cost paid from after-tax pay, equal to
  // the FBT taxable value, so the employer owes no FBT. The employer remits GST on that contribution.
  const fbtExempt = isFbtExempt(input);
  const postTaxContributionMonthly = fbtExempt
    ? 0
    : Math.min((FBT_STATUTORY_RATE * input.carPrice) / 12, packageCostExGst * (1 + assumptions.gstRate));
  const preTaxDeductionMonthly =
    packageCostExGst - postTaxContributionMonthly / (1 + assumptions.gstRate);
  const novatedLeaseMonthlyTakeHomeImpact =
    postTaxContributionMonthly + preTaxDeductionMonthly * (1 - marginalTaxRate);

  // The loan and cash options leave the same balloon unpaid, so all three are compared on the same footing.
  const loanFinancedAmount = Math.max(0, input.carPrice - residualDueAtEnd);
  const carLoanMonthlyFinanceCost = monthlyPayment(
    loanFinancedAmount,
    assumptions.carLoanInterestRateAnnual,
    termMonths,
  );
  const carLoanMonthlyCost = carLoanMonthlyFinanceCost + runningMonthly;
  // Paying cash for the same amount, spread over the term with no interest.
  const cashMonthlyCost = loanFinancedAmount / termMonths + runningMonthly;

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
    taxSavingMonthly: round(nlMonthlyPackageCost - novatedLeaseMonthlyTakeHomeImpact),
    fbtExempt,
    postTaxContributionMonthly: round(postTaxContributionMonthly),
    preTaxDeductionMonthly: round(preTaxDeductionMonthly),
    gstCreditOnPrice: round(gstCreditOnPrice),
    cashMonthlyCost: round(cashMonthlyCost),
    financedAmount: round(financedAmount),
    marginalTaxRate,
    residualRate,
    comparisonLabel,
  };
}

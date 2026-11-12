import { estimateNovatedLease } from "./estimate";
import type { CalculatorAssumptions, CalculatorInput, Provider } from "@/lib/types";

export const COMPARISON_LEASE_MONTHS = 48;

/** Setup fee plus admin fees over a typical lease, the fairest single number we can compare. */
export function feesOverLease(provider: Provider, months = COMPARISON_LEASE_MONTHS) {
  return provider.setupFee + provider.monthlyAdminFee * months;
}

/**
 * What a provider's lease would take from your pay each month: the calculator's estimate using this
 * provider's rate and admin fee, plus its setup fee spread over the lease and paid before tax.
 * Providers without a published rate use the default rate.
 */
export function providerMonthlyCost(
  provider: Provider,
  input: CalculatorInput,
  assumptions: CalculatorAssumptions,
) {
  const result = estimateNovatedLease(input, {
    ...assumptions,
    adminFeeMonthly: provider.monthlyAdminFee,
    novatedLeaseInterestRateAnnual: provider.interestRate ?? assumptions.novatedLeaseInterestRateAnnual,
  });
  const setupMonthly = provider.setupFee / Math.max(1, input.leaseTermMonths);
  return result.novatedLeaseMonthlyTakeHomeImpact + setupMonthly * (1 - result.marginalTaxRate);
}

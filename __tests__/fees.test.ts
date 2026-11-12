import { describe, expect, it } from "vitest";
import { estimateNovatedLease } from "../lib/estimate";
import { feesOverLease, providerMonthlyCost } from "../lib/fees";
import { defaultAssumptions, fallbackProviders } from "../lib/mock-data";
import type { CalculatorInput, Provider } from "../lib/types";

const input: CalculatorInput = {
  salary: 120000,
  carPrice: 65400,
  leaseTermMonths: 48,
  kilometresPerYear: 15000,
  vehicleType: "ev",
};

const base: Provider = { ...fallbackProviders[0], setupFee: 0, monthlyAdminFee: 40, interestRate: 0.08 };

describe("providerMonthlyCost", () => {
  it("matches the calculator when there is no setup fee", () => {
    const expected = estimateNovatedLease(input, {
      ...defaultAssumptions,
      adminFeeMonthly: 40,
      novatedLeaseInterestRateAnnual: 0.08,
    }).novatedLeaseMonthlyTakeHomeImpact;
    expect(providerMonthlyCost(base, input, defaultAssumptions)).toBeCloseTo(expected, 2);
  });

  it("costs less with a lower rate", () => {
    const cheaper = { ...base, interestRate: 0.07 };
    expect(providerMonthlyCost(cheaper, input, defaultAssumptions)).toBeLessThan(
      providerMonthlyCost(base, input, defaultAssumptions),
    );
  });

  it("spreads the setup fee over the lease after tax", () => {
    const withSetup = { ...base, setupFee: 480 };
    const extra = providerMonthlyCost(withSetup, input, defaultAssumptions) - providerMonthlyCost(base, input, defaultAssumptions);
    // $480 over 48 months is $10 a month, less the 32% marginal rate (30% plus Medicare).
    expect(extra).toBeCloseTo(10 * (1 - 0.32), 2);
  });

  it("uses the default rate for quote-only providers", () => {
    const quoteOnly = { ...base, interestRate: null };
    const atDefault = { ...base, interestRate: defaultAssumptions.novatedLeaseInterestRateAnnual };
    expect(providerMonthlyCost(quoteOnly, input, defaultAssumptions)).toBeCloseTo(
      providerMonthlyCost(atDefault, input, defaultAssumptions),
      6,
    );
  });
});

describe("feesOverLease", () => {
  it("adds the setup fee to admin fees over the given term", () => {
    expect(feesOverLease({ ...base, setupFee: 300 }, 36)).toBe(300 + 40 * 36);
  });
});

import { describe, expect, it } from "vitest";
import { estimateNovatedLease } from "../lib/estimate";
import { defaultAssumptions } from "../lib/mock-data";

describe("estimateNovatedLease", () => {
  it("can show novated lease ahead for an EV scenario", () => {
    const result = estimateNovatedLease(
      {
        salary: 120000,
        carPrice: 65000,
        leaseTermMonths: 48,
        kilometresPerYear: 15000,
        vehicleType: "ev",
      },
      defaultAssumptions,
    );

    expect(result.novatedLeaseMonthlyTakeHomeImpact).toBeGreaterThan(0);
    expect(result.carLoanMonthlyCost).toBeGreaterThan(0);
    expect(result.monthlyDifference).toBeGreaterThan(0);
    expect(result.comparisonLabel).toBe("nl-ahead");
    expect(result.residualDueAtEnd).toBeGreaterThan(0);
  });

  it("can show car loan ahead when novated assumptions are unfavorable", () => {
    const result = estimateNovatedLease(
      {
        salary: 30000,
        carPrice: 35000,
        leaseTermMonths: 36,
        kilometresPerYear: 12000,
        vehicleType: "non-ev",
      },
      {
        ...defaultAssumptions,
        adminFeeMonthly: 420,
        novatedLeaseInterestRateAnnual: 0.22,
        carLoanInterestRateAnnual: 0.05,
      },
    );

    expect(result.monthlyDifference).toBeLessThan(0);
    expect(result.termDifference).toBeLessThan(0);
    expect(result.comparisonLabel).toBe("loan-ahead");
  });
});

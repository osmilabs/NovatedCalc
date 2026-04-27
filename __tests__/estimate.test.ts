import { describe, expect, it } from "vitest";
import { estimateNovatedLease } from "../lib/estimate";
import { defaultAssumptions } from "../lib/mock-data";

describe("estimateNovatedLease", () => {
  it("returns positive cost and savings values", () => {
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

    expect(result.monthlyPackageCost).toBeGreaterThan(0);
    expect(result.monthlyTakeHomeImpact).toBeGreaterThan(0);
    expect(result.estimatedAnnualSavings).toBeGreaterThan(0);
  });
});

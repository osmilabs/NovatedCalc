import { describe, expect, it } from "vitest";
import { CAR_LIMIT, estimateNovatedLease, EV_FBT_EXEMPTION_THRESHOLD } from "../lib/estimate";
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

  it("breaks the package into parts that add up", () => {
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

    expect(
      result.novatedLeaseMonthlyFinanceCost + result.runningMonthlyCost + defaultAssumptions.adminFeeMonthly,
    ).toBeCloseTo(result.novatedLeaseMonthlyPackageCost, 1);
    expect(result.novatedLeaseMonthlyPackageCost - result.taxSavingMonthly).toBeCloseTo(
      result.novatedLeaseMonthlyTakeHomeImpact,
      1,
    );
    expect(result.cashMonthlyCost).toBeLessThan(result.carLoanMonthlyCost);
    expect(result.financedAmount + result.residualDueAtEnd + result.gstCreditOnPrice).toBeCloseTo(65000, 1);
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

  const base = { salary: 100000, carPrice: 50000, leaseTermMonths: 48, kilometresPerYear: 15000 } as const;

  it("puts 20% of a petrol car's price a year into after-tax pay (employee contribution method)", () => {
    const result = estimateNovatedLease({ ...base, vehicleType: "non-ev" }, defaultAssumptions);

    expect(result.fbtExempt).toBe(false);
    expect(result.postTaxContributionMonthly).toBeCloseTo((0.2 * 50000) / 12, 1);
    expect(
      result.postTaxContributionMonthly + result.preTaxDeductionMonthly * (1 - result.marginalTaxRate),
    ).toBeCloseTo(result.novatedLeaseMonthlyTakeHomeImpact, 1);
  });

  it("worked example: $50k petrol car on $100k over 4 years", () => {
    const result = estimateNovatedLease({ ...base, vehicleType: "non-ev" }, defaultAssumptions);
    // Hand-checked: $4,545 GST off the price, $17,045 balloon, ~$833 after tax and ~$375 before tax a month.
    expect(result.gstCreditOnPrice).toBeCloseTo(4545.45, 1);
    expect(result.residualDueAtEnd).toBeCloseTo(17045.45, 1);
    expect(result.preTaxDeductionMonthly).toBeCloseTo(375, -1);
    expect(result.novatedLeaseMonthlyTakeHomeImpact).toBeCloseTo(1088, -1);
  });

  it("packages an eligible EV entirely before tax", () => {
    const result = estimateNovatedLease({ ...base, vehicleType: "ev" }, defaultAssumptions);

    expect(result.fbtExempt).toBe(true);
    expect(result.postTaxContributionMonthly).toBe(0);
    expect(result.novatedLeaseMonthlyTakeHomeImpact).toBeCloseTo(
      result.preTaxDeductionMonthly * (1 - result.marginalTaxRate),
      1,
    );
    const petrol = estimateNovatedLease({ ...base, vehicleType: "non-ev" }, defaultAssumptions);
    expect(result.novatedLeaseMonthlyTakeHomeImpact).toBeLessThan(petrol.novatedLeaseMonthlyTakeHomeImpact);
  });

  it("treats an EV over the luxury car tax threshold like a petrol car", () => {
    const atThreshold = estimateNovatedLease(
      { ...base, carPrice: EV_FBT_EXEMPTION_THRESHOLD, vehicleType: "ev" },
      defaultAssumptions,
    );
    const over = estimateNovatedLease(
      { ...base, carPrice: EV_FBT_EXEMPTION_THRESHOLD + 1, vehicleType: "ev" },
      defaultAssumptions,
    );

    expect(atThreshold.fbtExempt).toBe(true);
    expect(over.fbtExempt).toBe(false);
    expect(over.postTaxContributionMonthly).toBeGreaterThan(0);
  });

  it("caps the GST claimed on the price at the car limit", () => {
    const pricey = estimateNovatedLease({ ...base, carPrice: 120000, vehicleType: "non-ev" }, defaultAssumptions);
    expect(pricey.gstCreditOnPrice).toBeCloseTo(CAR_LIMIT / 11, 1);
  });

  it("gives no GST credit on registration", () => {
    const result = estimateNovatedLease({ ...base, vehicleType: "ev" }, defaultAssumptions);
    const pricierRego = estimateNovatedLease(
      { ...base, vehicleType: "ev" },
      { ...defaultAssumptions, registrationMonthly: defaultAssumptions.registrationMonthly + 110 },
    );
    expect(pricierRego.preTaxDeductionMonthly - result.preTaxDeductionMonthly).toBeCloseTo(110, 1);
  });
});

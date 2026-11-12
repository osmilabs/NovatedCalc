import { describe, expect, it } from "vitest";
import { getMarginalTaxRate, getResidualRate } from "../lib/estimate";

describe("getResidualRate", () => {
  // ATO minimum residual values (TD 93/142).
  it.each([
    [12, 0.6563],
    [24, 0.5625],
    [36, 0.4688],
    [48, 0.375],
    [60, 0.2813],
  ])("uses the ATO minimum for a %i-month lease", (months, expected) => {
    expect(getResidualRate(months)).toBe(expected);
  });
});

describe("getMarginalTaxRate", () => {
  // 2026-27 resident rates plus the 2% Medicare levy.
  it.each([
    [18_000, 0],
    [40_000, 0.17],
    [45_000, 0.17],
    [45_001, 0.32],
    [120_000, 0.32],
    [135_000, 0.32],
    [135_001, 0.39],
    [180_000, 0.39],
    [190_000, 0.39],
    [190_001, 0.47],
    [250_000, 0.47],
  ])("taxes a salary of %i at %f", (salary, expected) => {
    expect(getMarginalTaxRate(salary)).toBeCloseTo(expected, 10);
  });
});

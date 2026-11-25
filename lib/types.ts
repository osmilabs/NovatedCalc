export const STATES = ["QLD", "NSW", "VIC", "WA", "SA", "TAS", "ACT", "NT"] as const;
export type StateCode = (typeof STATES)[number];

export type VehicleType = "ev" | "non-ev";

export type CalculatorInput = {
  salary: number;
  carPrice: number;
  leaseTermMonths: number;
  kilometresPerYear: number;
  vehicleType: VehicleType;
};

export type CalculatorAssumptions = {
  gstRate: number;
  novatedLeaseInterestRateAnnual: number;
  carLoanInterestRateAnnual: number;
  adminFeeMonthly: number;
  insuranceMonthly: number;
  maintenanceMonthly: number;
  fuelAndRunningRatePerKm: number;
  registrationMonthly: number;
};

export type CalculatorResult = {
  novatedLeaseMonthlyTakeHomeImpact: number;
  carLoanMonthlyCost: number;
  monthlyDifference: number;
  termDifference: number;
  residualDueAtEnd: number;
  novatedLeaseMonthlyPackageCost: number;
  novatedLeaseMonthlyFinanceCost: number;
  carLoanMonthlyFinanceCost: number;
  runningMonthlyCost: number;
  /** The package cost less what actually leaves your take-home pay: income tax, Medicare levy and GST saved. */
  taxSavingMonthly: number;
  /** Electric car under the luxury car tax threshold, so no after-tax contribution is needed. */
  fbtExempt: boolean;
  /** Paid from after-tax pay under the employee contribution method, so the employer owes no FBT. */
  postTaxContributionMonthly: number;
  /** Taken from pay before tax. */
  preTaxDeductionMonthly: number;
  /** GST the employer claims back on the car's price, which the lease doesn't have to finance. */
  gstCreditOnPrice: number;
  cashMonthlyCost: number;
  financedAmount: number;
  marginalTaxRate: number;
  residualRate: number;
  comparisonLabel: "nl-ahead" | "loan-ahead" | "too-close";
};

export type Provider = {
  id: string;
  slug: string;
  name: string;
  product: string;
  /** Published annual rate, e.g. 0.0745. Null when the provider only quotes. */
  interestRate: number | null;
  /** Short selling points shown on the comparison card. */
  highlights: string[];
  offer?: string;
  states: string[];
  serviceModel: "broker" | "direct" | "hybrid";
  setupFee: number;
  monthlyAdminFee: number;
  inclusions: string[];
  responsivenessScore: number;
  supportChannels: string[];
  affiliateLink?: string;
  summary: string;
  active: boolean;
  /** A made-up provider used while the comparison is a preview. Never accepts quotes. */
  sample?: boolean;
};

export type SeoPage = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  hero: string;
  body: string;
  faq: Array<{ question: string; answer: string }>;
};

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
  evFbtExemptionBenefitRate: number;
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
  taxSavingMonthly: number;
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

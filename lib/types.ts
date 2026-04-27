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
  adminFeeMonthly: number;
  insuranceMonthly: number;
  maintenanceMonthly: number;
  evFbtDiscount: number;
  fuelAndRunningRatePerKm: number;
  registrationMonthly: number;
};

export type CalculatorResult = {
  monthlyLeaseCost: number;
  monthlyPackageCost: number;
  monthlyTakeHomeImpact: number;
  estimatedAnnualSavings: number;
  estimatedTermSavings: number;
};

export type Provider = {
  id: string;
  slug: string;
  name: string;
  states: string[];
  serviceModel: "broker" | "direct" | "hybrid";
  setupFee: number;
  monthlyAdminFee: number;
  inclusions: string[];
  responsivenessScore: number;
  supportChannels: string[];
  affiliateLink?: string;
  outboundWebhookUrl?: string;
  outboundEmail?: string;
  summary: string;
  active: boolean;
};

export type LeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  postcode: string;
  state: string;
  preferredProviderSlugs: string[];
  consentAccepted: boolean;
  calculatorInput: CalculatorInput;
  calculatorResult: CalculatorResult;
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

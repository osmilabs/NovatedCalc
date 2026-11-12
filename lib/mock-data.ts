import { EV_BILL_STATUS } from "./guides";
import type { CalculatorAssumptions, Provider, SeoPage } from "@/lib/types";

export const ASSUMPTIONS_REVIEWED = "September 2026";

export const defaultAssumptions: CalculatorAssumptions = {
  gstRate: 0.1,
  novatedLeaseInterestRateAnnual: 0.085,
  carLoanInterestRateAnnual: 0.0725,
  adminFeeMonthly: 49,
  insuranceMonthly: 120,
  maintenanceMonthly: 65,
  evFbtExemptionBenefitRate: 0.12,
  fuelAndRunningRatePerKm: 0.11,
  registrationMonthly: 95,
};

/**
 * Made-up providers so the comparison has something to show before real ones sign up.
 * Each is flagged `sample`, which labels it in the UI and blocks quote requests.
 */
export const fallbackProviders: Provider[] = [
  {
    id: "prov-1",
    slug: "alpha-fleet-australia",
    name: "Alpha Fleet Australia",
    product: "Alpha Complete",
    interestRate: 0.0775,
    highlights: ["Fuel, servicing, tyres and rego bundled", "Self-service portal for claims"],
    offer: "Admin fee waived for your first three months.",
    states: ["NSW", "QLD", "VIC", "WA"],
    serviceModel: "hybrid",
    setupFee: 395,
    monthlyAdminFee: 42,
    inclusions: ["Fuel card", "Maintenance", "Tyres", "Registration"],
    responsivenessScore: 8.2,
    supportChannels: ["Phone", "Email", "Portal"],
    affiliateLink: "https://example.com/alpha-affiliate",
    summary: "Balanced inclusions and a solid digital self-service flow.",
    active: true,
    sample: true,
  },
  {
    id: "prov-2",
    slug: "nova-lease-group",
    name: "Nova Lease Group",
    product: "Nova Flex Lease",
    interestRate: 0.079,
    highlights: ["A broker compares lenders for you", "Roadside assist included"],
    states: ["NSW", "VIC", "ACT", "SA"],
    serviceModel: "broker",
    setupFee: 295,
    monthlyAdminFee: 39,
    inclusions: ["Fuel card", "Maintenance", "Roadside assist"],
    responsivenessScore: 9.1,
    supportChannels: ["Phone", "Email"],
    affiliateLink: "https://example.com/nova-affiliate",
    summary: "High quote responsiveness and strong broker support.",
    active: true,
    sample: true,
  },
  {
    id: "prov-3",
    slug: "greenwheel-novated",
    name: "GreenWheel Novated",
    product: "GreenWheel EV Lease",
    interestRate: 0.072,
    highlights: ["Electric and plug-in hybrid cars only", "Help choosing and installing a charger"],
    offer: "Free home charger install on eligible EVs.",
    states: ["QLD", "NSW", "VIC"],
    serviceModel: "direct",
    setupFee: 349,
    monthlyAdminFee: 45,
    inclusions: ["Charging guidance", "Maintenance", "Registration"],
    responsivenessScore: 8.8,
    supportChannels: ["Email", "Portal", "Chat"],
    affiliateLink: "https://example.com/greenwheel-affiliate",
    summary: "EV-focused onboarding and practical packaging support.",
    active: true,
    sample: true,
  },
  {
    id: "prov-4",
    slug: "summit-salary-packaging",
    name: "Summit Salary Packaging",
    product: "Summit Full Package",
    interestRate: 0.0815,
    highlights: ["Insurance support included", "Covers five states"],
    states: ["QLD", "NSW", "VIC", "TAS", "SA"],
    serviceModel: "hybrid",
    setupFee: 410,
    monthlyAdminFee: 46,
    inclusions: ["Fuel card", "Maintenance", "Tyres", "Insurance support"],
    responsivenessScore: 7.6,
    supportChannels: ["Phone", "Email", "Portal"],
    affiliateLink: "https://example.com/summit-affiliate",
    summary: "Comprehensive package options with broad state coverage.",
    active: true,
    sample: true,
  },
  {
    id: "prov-5",
    slug: "metro-drive-benefits",
    name: "Metro Drive Benefits",
    product: "Metro Drive Essentials",
    interestRate: 0.0745,
    highlights: ["Deal directly with the lender", "Tyres and roadside assist included"],
    offer: "Roadside assistance for 12 months.",
    states: ["NSW", "QLD", "VIC", "WA", "NT"],
    serviceModel: "direct",
    setupFee: 330,
    monthlyAdminFee: 41,
    inclusions: ["Maintenance", "Tyres", "Roadside assist"],
    responsivenessScore: 7.9,
    supportChannels: ["Phone", "Email"],
    affiliateLink: "https://example.com/metro-affiliate",
    summary: "Simple direct model with reliable turnaround times.",
    active: true,
    sample: true,
  },
  {
    id: "prov-6",
    slug: "brisbane-novated-specialists",
    name: "Brisbane Novated Specialists",
    product: "Brisbane Local Lease",
    interestRate: 0.0835,
    highlights: ["Queensland only", "Local support team"],
    states: ["QLD"],
    serviceModel: "broker",
    setupFee: 270,
    monthlyAdminFee: 37,
    inclusions: ["Fuel card", "Maintenance", "Local support"],
    responsivenessScore: 8.7,
    supportChannels: ["Phone", "Email", "Chat"],
    affiliateLink: "https://example.com/brisbane-affiliate",
    summary: "QLD-local service tuned for fast quote follow-ups.",
    active: true,
    sample: true,
  },
];

export const fallbackSeoPages: SeoPage[] = [
  {
    slug: "novated-lease-comparison",
    keyword: "novated lease comparison",
    title: "Novated Lease Comparison Australia",
    description:
      "Compare Australian novated lease providers on what they'd cost you each month, including fees, rates and inclusions.",
    hero: "Compare novated lease providers on what they'd cost you",
    body: "Tell us about the car and your salary, and we'll estimate what each provider would take from your pay. Every provider is costed the same way, so you can compare fees, rates and inclusions like for like. There's no sign-up, and your details only go to a provider if you ask them for a quote.",
    faq: [
      {
        question: "Why do I need to enter my details first?",
        answer:
          "What a novated lease costs you depends on the car, your salary and how far you drive. Without them, any comparison would just be an average that may not apply to you.",
      },
      {
        question: "Do I need to give my name or phone number to compare?",
        answer: "No. Comparing is free and anonymous. Your salary stays in your browser.",
      },
      {
        question: "Is the estimate the price I'll pay?",
        answer:
          "No. It's an estimate from each provider's published fees and rates. The provider sets the final figures after checking your employer, the car and your circumstances.",
      },
    ],
  },
  {
    slug: "best-novated-lease-provider-australia",
    keyword: "best novated lease provider Australia",
    title: "Best Novated Lease Provider in Australia: How to Choose (2026)",
    description:
      "There's no single best provider. Here's what actually separates them: fees, interest rate, inclusions, service, and whether your employer works with them.",
    hero: "How to choose the best novated lease provider for you",
    body: [
      "The best provider for a colleague may not be the best for you. What you'll pay depends on your car, salary and employer, and providers differ most on the things their ads mention least: the interest rate, the fees and what's in the running-cost budget.",
      "Start with your employer. Many employers, especially in government and health, only work with providers on their own panel. Ask payroll which ones you can use before comparing anyone else.",
      "Then compare the costs you can see. Most providers publish a setup fee and a monthly admin fee, and over a 4-year lease the difference between them can run to hundreds of dollars. Our comparison costs every provider the same way for your car and salary.",
      "Ask for the interest rate in writing. Many quotes show only a weekly or fortnightly payment, which makes them hard to compare. A provider that won't state its rate is a reason to keep looking.",
      "Check what's bundled and what it costs. Insurance, tyres and servicing bought through the provider may cost more than you'd pay yourself. Ask whether you can remove items or use your own insurer.",
      "Finally, service. You'll deal with the provider for years: running-cost claims, end-of-lease options, changing jobs. Look at how you can reach them and how quickly they reply.",
    ].join("\n\n"),
    faq: [
      {
        question: "Is there one best provider for everyone?",
        answer:
          "No. It depends on your employer, your car and what you want included. The cheapest provider on fees may not offer the best rate or service for you.",
      },
      {
        question: "Do I have to use the provider my employer suggests?",
        answer:
          "If your employer has a panel, you'll usually need to choose from it. If not, you can often use any provider that will work with your employer, so it's worth comparing.",
      },
      {
        question: "Which fees should I compare?",
        answer:
          "The setup fee and the monthly admin fee. Added up over the lease, they're the clearest like-for-like number. Then ask each provider for its interest rate.",
      },
      {
        question: "Can I negotiate with a provider?",
        answer:
          "You can ask. A competing quote for the same car gives you something concrete to point to.",
      },
    ],
  },
  {
    slug: "novated-lease-without-phone-number",
    keyword: "novated lease without phone number",
    title: "Compare Novated Leases Without Giving Your Phone Number",
    description:
      "See estimated costs from every provider without handing over your contact details. Only share them with the one you pick, if you want to.",
    hero: "Compare every provider before anyone calls you",
    body: "Use the calculator and comparison to see what each provider would likely cost you, with no sign-up and no contact details. When one looks right, you can choose to send your details to that provider alone for a formal quote. Nobody else gets them.",
    faq: [
      {
        question: "Do I need to give a phone number to see the comparison?",
        answer:
          "No. Every estimate and comparison is free to see without any contact details.",
      },
      {
        question: "When would I give my details?",
        answer:
          "Only if you ask a provider for a formal quote. Your details, including a phone number so they can reach you, go to that one provider and no others.",
      },
      {
        question: "Is the estimate the price I'll pay?",
        answer:
          "No. It's an estimate from each provider's published fees and rates. The provider sets the final figures after checking your employer, the car and your circumstances.",
      },
    ],
  },
  {
    slug: "novated-lease-brisbane",
    keyword: "novated lease Brisbane",
    title: "Novated Lease Brisbane and Queensland: Compare Providers",
    description:
      "Compare novated lease providers that work with Queensland employers on fees, inclusions and service. Free, and no phone number needed.",
    hero: "Novated leasing in Brisbane and Queensland",
    body: [
      "A novated lease works the same way in Brisbane as anywhere in Australia: your employer pays for the car from your salary before tax. Income tax, GST and the electric car exemption are federal rules, so the saving doesn't depend on your state.",
      "What does vary by state is running costs. Queensland registration (which includes CTP insurance), fuel prices and insurance premiums all feed into your running-cost budget, so check those line items reflect Queensland prices.",
      "Not every provider works with every employer. Government, health and university employers often use a set panel of providers, so ask payroll which ones you can use.",
      "In our comparison you can filter to providers that operate in Queensland, then compare their fees and inclusions for your car and salary.",
    ].join("\n\n"),
    faq: [
      {
        question: "Do all providers support Queensland employers?",
        answer:
          "No. Check each provider's profile for the states it covers, and ask your employer whether it uses a panel.",
      },
      {
        question: "Is the tax saving different in Queensland?",
        answer:
          "No. Income tax, GST and FBT are federal, so the saving works the same as in other states. Only running costs like registration and fuel differ.",
      },
      {
        question: "Can I get an electric car on a novated lease in Brisbane?",
        answer:
          "Yes. The FBT exemption for eligible electric cars applies across Australia.",
      },
    ],
  },
  {
    slug: "ev-novated-lease-comparison",
    keyword: "EV novated lease comparison",
    title: "EV Novated Lease Comparison: Compare Providers for Electric Cars",
    description:
      "Compare novated lease providers for electric cars. See what an EV lease would cost you with the FBT exemption, and what's proposed from April 2027.",
    hero: "Compare novated leases for electric cars",
    body: [
      "Eligible electric cars are exempt from fringe benefits tax, so the whole lease and its running costs can come out of your pay before tax. For the same price, that usually makes an electric car lease worth thousands of dollars a year more than a petrol one.",
      "To qualify, the car must be battery electric or hydrogen fuel cell, first held and used on or after 1 July 2022, and under $91,661 when it was first sold (the 2026–27 threshold). Plug-in hybrids only qualify for leases committed to before 1 April 2025.",
      "Providers still differ on fees, interest rates and what they include, such as how charging is handled in the running-cost budget. Our comparison costs each one the same way for your car and salary.",
      `Changes are proposed. A bill before Parliament would cap the full exemption at a $75,000 base value for leases committed to from 1 April 2027. ${EV_BILL_STATUS}`,
    ].join("\n\n"),
    faq: [
      {
        question: "Is an electric car novated lease cheaper than a petrol one?",
        answer:
          "For the same price, usually. The whole electric car lease can be paid before tax, while a petrol lease needs part paid after tax to avoid FBT.",
      },
      {
        question: "Is there a catch with the EV exemption?",
        answer:
          "The car shows on your income statement as a reportable fringe benefit. You don't pay tax on it, but it counts in income tests such as HELP repayments and the Medicare levy surcharge.",
      },
      {
        question: "Is the EV FBT exemption ending?",
        answer:
          `Not yet. A bill would limit the full exemption to cars with a base value of $75,000 or less from 1 April 2027. Leases committed to before then would keep it until they end. ${EV_BILL_STATUS}`,
      },
      {
        question: "Can charging costs be included?",
        answer:
          "Usually. Ask each provider how they handle home and public charging in the running-cost budget.",
      },
    ],
  },
];

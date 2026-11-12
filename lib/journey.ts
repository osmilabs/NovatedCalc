import { z } from "zod";
import { calculatorInputSchema } from "./leads";
import type { CalculatorAssumptions, CalculatorInput } from "./types";

/**
 * Carries the calculator's answers to the provider comparison, in sessionStorage rather than the URL so
 * salary never reaches the server or analytics. Gone when the tab closes.
 */
const KEY = "novatedcalc:journey:v1";

export type Journey = {
  input: CalculatorInput;
  vehicleId: string | null;
  assumptions: CalculatorAssumptions;
};

const journeySchema = z.object({
  input: calculatorInputSchema,
  vehicleId: z.string().nullable(),
  assumptions: z.object({
    gstRate: z.number(),
    novatedLeaseInterestRateAnnual: z.number(),
    carLoanInterestRateAnnual: z.number(),
    adminFeeMonthly: z.number(),
    insuranceMonthly: z.number(),
    maintenanceMonthly: z.number(),
    evFbtExemptionBenefitRate: z.number(),
    fuelAndRunningRatePerKm: z.number(),
    registrationMonthly: z.number(),
  }),
});

export function saveJourney(journey: Journey) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(journey));
  } catch {
    // Private mode or storage blocked: the comparison falls back to its defaults.
  }
}

export function loadJourney(): Journey | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = journeySchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/**
 * Runs in <head> before first paint. Marks <html> when there are saved answers, so `.journey-gate` content
 * stays hidden until they're applied instead of flashing the defaults. See `markJourneyApplied`.
 */
export const JOURNEY_PENDING_SCRIPT = `try{if(sessionStorage.getItem(${JSON.stringify(KEY)}))document.documentElement.dataset.journeyPending=""}catch(e){}`;

export function markJourneyApplied() {
  delete document.documentElement.dataset.journeyPending;
}

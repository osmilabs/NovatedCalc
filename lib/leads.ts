import { z } from "zod";
import { STATES } from "./types";

/** Bump when the consent wording changes, so each stored lead records what the person agreed to. */
export const CONSENT_VERSION = "2026-11-06";

export function consentText(providerName: string) {
  return (
    `Send my details and these figures to ${providerName} so they can contact me about a quote. ` +
    `${providerName} will handle my details under its own privacy policy.`
  );
}

/** Strips spacing and punctuation, and turns +61 into a leading 0, e.g. "+61 412 345 678" → "0412345678". */
export function normalisePhone(raw: string) {
  const digits = raw.replace(/[\s\-().]/g, "");
  return digits.replace(/^\+?61/, "0");
}

/** Australian mobile or landline with area code, after normalising. */
const AU_PHONE = /^0[2-478]\d{8}$/;

export const calculatorInputSchema = z.object({
  salary: z.number().positive(),
  carPrice: z.number().positive(),
  leaseTermMonths: z.number().int().positive(),
  kilometresPerYear: z.number().nonnegative(),
  vehicleType: z.enum(["ev", "non-ev"]),
});

export const leadSchema = z.object({
  providerSlug: z.string().min(1).max(120),
  vehicleName: z.string().max(120).optional(),
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().transform(normalisePhone).pipe(z.string().regex(AU_PHONE)),
  postcode: z.string().trim().regex(/^\d{4}$/),
  state: z.enum(STATES),
  consentAccepted: z.literal(true),
  calculatorInput: calculatorInputSchema,
});

export type LeadRequest = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

/**
 * Display ads (Google AdSense). Set NEXT_PUBLIC_ADSENSE_CLIENT and the slot IDs to turn them on.
 * Without a client ID, slots show as labelled placeholders in development and render nothing in production.
 * Turning AdSense on adds advertising cookies: update app/privacy/page.tsx (it says there are none) first.
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export type AdPlacement = "rail" | "footer" | "mobile";

export const AD_SLOTS: Record<AdPlacement, string> = {
  rail: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RAIL ?? "",
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? "",
  mobile: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOBILE ?? "",
};

/** Fixed sizes, so the space is reserved and the page doesn't jump when an ad loads. */
export const AD_SIZES: Record<AdPlacement, { width: number; height: number }> = {
  rail: { width: 160, height: 600 },
  footer: { width: 728, height: 90 },
  mobile: { width: 320, height: 50 },
};

export const SHOW_PLACEHOLDERS = !ADSENSE_CLIENT && process.env.NODE_ENV !== "production";

/**
 * No ads in the quote funnel: the calculator and results are where leads come from, and contextual ads there
 * would mostly be other lease providers bidding for the same visitor.
 */
const AD_FREE_PATHS = ["/novated-lease-calculator", "/novated-lease-comparison/results"];

export function adsAllowedOn(pathname: string): boolean {
  if (!ADSENSE_CLIENT && !SHOW_PLACEHOLDERS) return false;
  return !AD_FREE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

/** Matches the CSS breakpoints for the ad layouts in globals.css. */
export const AD_MEDIA = {
  /** Wide enough for a 160px rail either side of the 1080px page. */
  rails: "(min-width: 1500px) and (min-height: 720px)",
  desktop: "(min-width: 768px)",
} as const;

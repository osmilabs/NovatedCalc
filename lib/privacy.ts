/**
 * Facts the privacy policy (app/privacy/page.tsx) states that the code can't know. Fill these in before
 * launch; values in [brackets] render as-is so a missing one is obvious on the page.
 */
export const PRIVACY = {
  /** Bump whenever the policy's substance changes. */
  lastUpdated: "2026-11-12",
  /** The legal entity or sole trader that operates the site. */
  operator: "[Operator legal name]",
  /** Shown after the operator's name, e.g. "ABN 12 345 678 901". Empty omits it; add it once registered. */
  abn: "",
  contactEmail: "[privacy contact email]",
  /** Where PocketBase and Umami run, e.g. "in Australia" or "in Australia and the United States". */
  hostingLocation: "[hosting location, e.g. in Australia]",
  /** How long quote requests are kept. Nothing deletes them automatically yet, so this is done by hand. */
  leadRetention: "2 years",
};

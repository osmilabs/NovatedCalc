/**
 * Where the EV FBT exemption bill (Treasury Laws Amendment (Tax Reform No. 4) Bill 2026) stands. Shown wherever the
 * proposed rules are mentioned; update the date and wording when the Senate votes.
 */
export const EV_BILL_STATUS =
  "As of 12 November 2026 – the bill has passed the House of Representatives but not the Senate. It isn't law yet, and the details may change before it passes.";

/** Long-form guides under /guides. Each has a page at app/guides/<slug>/page.tsx. */
export type GuideMeta = {
  slug: string;
  title: string;
  /** Shorter title for cards and links. */
  shortTitle: string;
  description: string;
  /** ISO date the facts were last checked. */
  updated: string;
  readMinutes: number;
};

export const GUIDES: GuideMeta[] = [
  {
    slug: "is-a-novated-lease-worth-it",
    title: "Is a novated lease worth it? (2026–27 guide)",
    shortTitle: "Is a novated lease worth it?",
    description:
      "Where the saving actually comes from, who comes out ahead, the costs that eat into it, and how to compare it fairly against a car loan.",
    updated: "2026-11-12",
    readMinutes: 7,
  },
  {
    slug: "ev-vs-petrol-novated-lease",
    title: "EV vs petrol novated lease: why they're different deals",
    shortTitle: "EV vs petrol novated lease",
    description:
      "Electric cars skip fringe benefits tax, so the whole lease can come out of your pay before tax. Here's what that's worth, with worked numbers.",
    updated: "2026-11-12",
    readMinutes: 6,
  },
  {
    slug: "fbt-and-the-ev-exemption",
    title: "FBT and the electric car exemption, explained",
    shortTitle: "FBT and the EV exemption",
    description:
      "What fringe benefits tax is, which cars are exempt, the proposed $75,000 cap from April 2027, and how reportable fringe benefits affect you.",
    updated: "2026-11-12",
    readMinutes: 7,
  },
  {
    slug: "novated-lease-balloon-payment",
    title: "Novated lease balloon payments: how much and what your options are",
    shortTitle: "Balloon (residual) payments",
    description:
      "The minimum balloon for each lease length, a worked example, and your four options when the lease ends.",
    updated: "2026-11-12",
    readMinutes: 5,
  },
  {
    slug: "novated-lease-changing-jobs",
    title: "What happens to a novated lease when you change jobs",
    shortTitle: "Changing jobs with a novated lease",
    description:
      "Your options if you resign, are made redundant or move employers, what each costs, and what to sort out before your last day.",
    updated: "2026-11-12",
    readMinutes: 5,
  },
];

export function getGuide(slug: string): GuideMeta {
  const guide = GUIDES.find((item) => item.slug === slug);
  if (!guide) throw new Error(`Unknown guide: ${slug}`);
  return guide;
}

export function formatGuideDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

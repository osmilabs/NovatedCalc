import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISON_LEASE_MONTHS, feesOverLease } from "@/lib/fees";
import { money } from "@/lib/format";
import { guideHref } from "@/components/guides/GuideArticle";
import { GUIDES } from "@/lib/guides";
import { getProviders, isPreview } from "@/lib/providers";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const ENTRY_TILES = [
  { href: "/novated-lease-comparison", mark: "⊞", title: "Compare providers" },
  { href: "/novated-lease-calculator", mark: "$", title: "Novated lease calculator" },
  { href: "/how-novated-leasing-works", mark: "?", title: "How novated leasing works" },
  { href: "/ev-novated-lease-comparison", mark: "⚡", title: "Electric car leases" },
  { href: "/best-novated-lease-provider-australia", mark: "★", title: "Choosing a provider" },
  { href: "/novated-lease-without-phone-number", mark: "✉", title: "Compare without a phone number" },
] as const;

const STEPS = [
  {
    title: "Tell us about the car",
    text: "Pick a model or enter a price, then add your salary. It takes about a minute and stays on your device.",
  },
  {
    title: "Compare providers",
    text: "See each provider's fees, inclusions and service side by side, worked out for your car and salary.",
  },
  {
    title: "Request a detailed quote",
    text: "When you're ready, share your details with the provider you choose and they'll call you back with a quote.",
  },
];

const REASONS = [
  {
    mark: "$",
    title: "Free to use",
    text: "Comparing providers and working out your numbers never costs you anything, and there's nothing to sign up for.",
  },
  {
    mark: "◎",
    title: "Private by default",
    text: "No sign-up and no account. Your salary stays in your browser, and your contact details go to one provider only when you request a quote.",
  },
  {
    mark: "=",
    title: "Like for like",
    text: `Every provider is costed the same way: setup fee plus admin fees over a ${COMPARISON_LEASE_MONTHS / 12}-year lease, so you're comparing the same thing.`,
  },
];

export default async function HomePage() {
  const providers = await getProviders();
  const byFees = [...providers].sort((a, b) => feesOverLease(a) - feesOverLease(b));
  const cheapest = byFees.slice(0, 3);
  const lowestFees = feesOverLease(byFees[0]);
  const highestFees = feesOverLease(byFees[byFees.length - 1]);
  const years = COMPARISON_LEASE_MONTHS / 12;
  const preview = isPreview(providers);

  return (
    <>
      <section className="home-banner">
        <div className="page home-hero">
          <div className="intro">
            <h1 className="headline headline-xl">
              Compare novated leases <span className="headline-accent">in one place.</span>
            </h1>
            <p className="lede lede-lg">
              novated.calc helps Australians work out what a novated lease would cost them and compare providers on
              fees, inclusions and service.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/novated-lease-calculator">
                Compare providers <span className="arrow" aria-hidden>→</span>
              </Link>
              <Link className="btn btn-ghost" href="/novated-lease-calculator">
                Work out my numbers
              </Link>
            </div>
          </div>

          <div className="panel home-preview" aria-label="Lowest provider fees">
            <div className="panel-head">
              <span className="label">Lowest fees over a {years}-year lease</span>
              <span className="pill">
                {providers.length} {preview ? "example " : ""}providers
              </span>
            </div>
            <ol className="plain-list mt">
              {cheapest.map((provider, i) => (
                <li key={provider.slug}>
                  <Link className="list-row home-preview-row" href={`/providers/${provider.slug}`}>
                    <span className="step-num">{i + 1}</span>
                    <span className="list-row-label">{provider.name}</span>
                    <span className="list-row-value">{money(feesOverLease(provider))}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="text-sm mt">Setup fee plus monthly admin fees. Interest and running costs depend on your quote.</p>
          </div>
        </div>
      </section>

      <div className="page">
        <section className="home-tiles" aria-label="Start here">
          {ENTRY_TILES.map((tile) => (
            <Link className="tile" href={tile.href} key={tile.href}>
              <span className="tile-mark" aria-hidden>
                {tile.mark}
              </span>
              <span className="tile-body">
                <span className="tile-title">{tile.title}</span>
              </span>
              <span className="tile-go" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </section>

        <section className="home-section text-center">
          <h2 className="headline headline-md home-heading">
            <strong>Providers</strong> we compare
          </h2>
          <ul className="home-providers plain-list">
            {providers.map((provider) => (
              <li key={provider.slug}>
                <Link href={`/providers/${provider.slug}`}>{provider.name}</Link>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            {preview
              ? "Listings are illustrative while we onboard provider partners. Names and figures are examples only."
              : "We don't compare every provider in the market. Fees are checked by hand and rates are quote-only."}
          </p>
        </section>

        <section className="home-section home-split">
          <div>
            <h2 className="headline headline-md">
              <strong>Same car,</strong> different fees
            </h2>
            <p className="lede mt-sm">
              Across the providers we compare, fees over a {years}-year lease run from {money(lowestFees)} to{" "}
              {money(highestFees)}. Here&apos;s how to find the right one for you.
            </p>
          </div>
          <ol className="plain-list home-steps">
            {STEPS.map((step, i) => (
              <li className="step-item" key={step.title}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <p className="title-sm">{step.title}</p>
                  <p className="text-sm mt-xs">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="home-section">
          <div className="text-center">
            <h2 className="headline headline-md home-heading">
              <strong>Why use</strong> novated.calc?
            </h2>
          </div>
          <div className="grid-3 mt-lg">
            {REASONS.map((reason) => (
              <div className="panel home-reason" key={reason.title}>
                <span className="tile-mark" aria-hidden>
                  {reason.mark}
                </span>
                <h3 className="title-sm mt">{reason.title}</h3>
                <p className="text-body mt-xs">{reason.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="panel-head">
            <h2 className="headline headline-md">
              <strong>Before you sign,</strong> read up
            </h2>
            <Link href="/guides">All guides →</Link>
          </div>
          <div className="grid-3 mt-lg">
            {GUIDES.slice(0, 3).map((guide) => (
              <Link className="tile" href={guideHref(guide.slug)} key={guide.slug}>
                <span className="tile-body">
                  <span className="tile-title">{guide.shortTitle}</span>
                  <span className="tile-sub">{guide.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="home-band">
        <div className="page text-center">
          <h2 className="headline headline-md">
            Know the numbers <strong>before you sign.</strong>
          </h2>
          <p className="lede mt-sm">Free, no sign-up, and nobody calls you unless you ask.</p>
          <div className="button-row home-band-actions">
            <Link className="btn btn-primary" href="/novated-lease-calculator">
              Compare providers <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

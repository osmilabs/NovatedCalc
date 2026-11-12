import Link from "next/link";
import { percent } from "@/lib/format";
import type { Provider } from "@/lib/types";

export type Frequency = "month" | "fortnight";

/** Dark tokens only, so the white initials stay readable. */
const MARK_COLOURS = ["var(--signal-ink)", "var(--ink)", "var(--accent-ink)", "var(--ink-2)", "var(--muted)"];

type Props = {
  provider: Provider;
  /** Position in the unsorted list, so a provider keeps its colour when the order changes. */
  colourIndex: number;
  monthlyCost: number;
  isCheapest: boolean;
  frequency: Frequency;
  onToggleFrequency: () => void;
  onRequestQuote: () => void;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

function dollarsAndCents(n: number) {
  const cents = Math.round(n * 100);
  return {
    dollars: Math.floor(cents / 100).toLocaleString("en-AU"),
    cents: String(cents % 100).padStart(2, "0"),
  };
}

export function ProviderCard({
  provider,
  colourIndex,
  monthlyCost,
  isCheapest,
  frequency,
  onToggleFrequency,
  onRequestQuote,
}: Props) {
  const cost = frequency === "month" ? monthlyCost : (monthlyCost * 12) / 26;
  const { dollars, cents } = dollarsAndCents(cost);

  return (
    <article className="cmp-card">
      <div className="cmp-mark" style={{ background: MARK_COLOURS[colourIndex % MARK_COLOURS.length] }} aria-hidden>
        {initials(provider.name)}
      </div>

      <div className="cmp-names">
        {isCheapest ? <span className="cmp-rank">Lowest cost to you</span> : null}
        <p className="cmp-prov">{provider.name}</p>
        <h3 className="cmp-prod">{provider.product || provider.name}</h3>
      </div>

      <div className="cmp-body">
        <div className="cmp-links">
          <Link href={`/providers/${provider.slug}`}>Provider profile</Link>
        </div>
        {provider.highlights.length ? (
          <ul className="cmp-bullets">
            {provider.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <dl className="cmp-fees">
        <div className="cmp-fee">
          <dt className="cmp-fee-k">Admin fee</dt>
          <dd className="cmp-fee-v">${provider.monthlyAdminFee}/mo</dd>
        </div>
        <div className="cmp-fee">
          <dt className="cmp-fee-k">Setup</dt>
          <dd className="cmp-fee-v">${provider.setupFee}</dd>
        </div>
        <div className="cmp-fee">
          <dt className="cmp-fee-k">Rate</dt>
          <dd className="cmp-fee-v">{provider.interestRate === null ? "On quote" : percent(provider.interestRate, 2)}</dd>
        </div>
      </dl>

      <div className="cmp-buy">
        <div>
          <p className="cmp-price">
            <span className="cmp-price-s">$</span>
            <span className="cmp-price-d">{dollars}</span>
            <span className="cmp-price-m">
              <span className="cmp-price-c">{cents}</span>
              <button
                type="button"
                className="cmp-freq"
                onClick={onToggleFrequency}
                aria-label={`Per ${frequency}. Show per ${frequency === "month" ? "fortnight" : "month"}`}
              >
                per {frequency} <span aria-hidden>⇄</span>
              </button>
            </span>
          </p>
          <p className="cmp-price-cap">estimated, off your take-home pay</p>
        </div>
        <button type="button" className="cmp-go" onClick={onRequestQuote}>
          Get a quote <span aria-hidden>›</span>
        </button>
      </div>

      {provider.offer ? <p className="cmp-offer">{provider.offer}</p> : null}
    </article>
  );
}

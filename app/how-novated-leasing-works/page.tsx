import type { Metadata } from "next";
import Link from "next/link";
import { EstimateChip } from "@/components/ui/EstimateChip";

export const metadata: Metadata = {
  title: "How Novated Leasing Works - A Plain-Language Guide",
  description:
    "What a novated lease is, who it suits, what's bundled into the payment, and the catches to watch for.",
};

const STEPS = [
  {
    title: "You choose the car",
    text: "New or used, from a dealer. It's yours to drive, with no employer logo or restrictions.",
  },
  {
    title: "A finance company buys it",
    text: "They own the car during the lease. A provider sets up the paperwork and manages the running costs.",
  },
  {
    title: "Your employer deducts the payments",
    text: "One amount comes out of each pay, before tax. It covers the lease and the running costs together.",
  },
  {
    title: "At the end, you decide",
    text: "Pay the balloon amount and keep the car, trade it in, or start a new lease.",
  },
];

const BUNDLED = ["Lease payments", "Fuel or charging", "Insurance", "Servicing", "Tyres", "Registration"];

const SUITS = ["Earn above about $60,000", "Have a stable, salaried job", "Drive a decent distance", "Want an electric car"];
const THINK_TWICE = ["Change jobs often", "Are on a lower income", "Barely drive", "Already own a car outright"];

const CATCHES = [
  {
    term: "There's a payment at the end",
    definition:
      "The balloon payment is due when the lease finishes. Its minimum is set by the tax office, and the longer the lease, the smaller it is.",
  },
  {
    term: "It's tied to your job",
    definition: "If you leave, the lease comes with you. You either take it to a new employer or pay it yourself.",
  },
  {
    term: "Your employer has to offer it",
    definition: "Most large employers and many government departments do. Smaller businesses often don't.",
  },
];

const JARGON = [
  { term: "Balloon payment (residual)", definition: "The lump sum owing at the end of the lease." },
  {
    term: "Fringe benefits tax (FBT)",
    definition: "A tax on non-cash benefits from your employer. Electric cars under the cap are exempt.",
  },
  { term: "Salary packaging", definition: "Paying for something out of your salary before tax is calculated." },
];

function TermList({ items }: { items: Array<{ term: string; definition: string }> }) {
  return (
    <div className="panel">
      {items.map((item) => (
        <div className="term" key={item.term}>
          <h3 className="term-word">{item.term}</h3>
          <p className="term-def">{item.definition}</p>
        </div>
      ))}
    </div>
  );
}

export default function HowNovatedLeasingWorksPage() {
  return (
    <>
      <EstimateChip />

      <div className="page page-narrow">
        <section className="section-hero intro">
          <p className="eyebrow">The basics</p>
          <h1 className="headline headline-md">What is a novated lease?</h1>
          <p className="lede">
            A three-way agreement between you, your employer and a finance company. Your employer pays for the car out
            of your salary before tax is taken out, which lowers the tax you pay.
          </p>
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">Where your pay goes</h2>
          <div className="panel">
            <p className="label">Your salary, each month</p>
            <div
              className="paybar mt-sm"
              role="img"
              aria-label="Illustration: part of your pay goes to the car before tax, and the rest is taxed as normal"
            >
              <div className="paybar-seg is-pre" style={{ width: "32%" }}>
                Car
              </div>
              <div className="paybar-seg is-taxed" style={{ width: "68%" }}>
                Taxed as normal
              </div>
            </div>
            <div className="paybar-legend" aria-hidden>
              <span>Taken out before tax</span>
              <span>What&apos;s left</span>
            </div>
            <div className="divider" />
            <p className="text-body">
              Because the car comes out of your pay first, you&apos;re taxed on a smaller amount. The saving is the tax
              you would have paid on that slice.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">How it works, step by step</h2>
          <ol className="plain-list">
            {STEPS.map((step, i) => (
              <li className="flowstep" key={step.title}>
                <div className="flowstep-rail" aria-hidden>
                  <span className="flowstep-dot" />
                  {i < STEPS.length - 1 ? <span className="flowstep-line" /> : null}
                </div>
                <div className="flowstep-body">
                  <p className="flowstep-title">{step.title}</p>
                  <p className="flowstep-text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">Usually bundled into the one payment</h2>
          <ul className="inclusion-grid plain-list">
            {BUNDLED.map((item) => (
              <li className="inclusion" key={item}>
                <span className="inclusion-tick" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm mt-sm">
            What&apos;s included varies by provider. This is why two quotes for the same car can look very different.
          </p>
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">Who it suits</h2>
          <div className="twocol">
            <div className="panel">
              <p className="label">Works well if you</p>
              <ul className="pro-list is-yes mt-xs">
                {SUITS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <p className="label">Think twice if you</p>
              <ul className="pro-list is-no mt-xs">
                {THINK_TWICE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="panel mint-panel">
            <p className="label">Electric cars</p>
            <p className="title-sm mt-xs">The saving is larger on an EV</p>
            <p className="text-body mt-sm">
              Electric cars under the price cap are exempt from fringe benefits tax. That removes a cost petrol cars
              still carry, so more of the payment comes out of your pay before tax.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">Things to watch</h2>
          <TermList items={CATCHES} />
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">Words you&apos;ll see</h2>
          <TermList items={JARGON} />
        </section>

        <section className="section">
          <div className="panel-flush">
            <p className="title-sm">Work out your own numbers</p>
            <p className="text-sm mt-xs">
              Takes about a minute. We show every figure we use, and you can change any of them.
            </p>
            <Link className="btn btn-primary btn-block mt" href="/novated-lease-calculator">
              Open the calculator <span className="arrow" aria-hidden>→</span>
            </Link>
            <p className="text-sm mt">
              Already sold on it? <Link href="/novated-lease-comparison">Compare providers on fees and service</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

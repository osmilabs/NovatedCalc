import type { Metadata } from "next";
import Link from "next/link";
import { guideHref } from "@/components/guides/GuideArticle";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "How Novated Leasing Works - A Plain-Language Guide",
  description:
    "What a novated lease is, who it suits, what's bundled into the payment, and the catches to watch for.",
  alternates: { canonical: "/how-novated-leasing-works" },
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

const SUITS = ["Earn above $45,000 (the 30% tax bracket)", "Have a stable, salaried job", "Drive a decent distance", "Want an electric car"];
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

/** 2026-27 marginal rates including the 2% Medicare levy. */
const PRE_TAX_VALUE = [
  { income: "$45,001 – $135,000", rate: "32%", cost: "$680" },
  { income: "$135,001 – $190,000", rate: "39%", cost: "$610" },
  { income: "Over $190,000", rate: "47%", cost: "$530" },
];

const NEEDS = [
  {
    term: "An employer that offers it",
    definition:
      "Ask payroll or HR whether they offer salary packaging for cars, and whether you have to use particular providers.",
  },
  {
    term: "A car within the provider's rules",
    definition:
      "New or used. Providers usually set an age limit for used cars, and the electric car exemption has a price limit.",
  },
  {
    term: "Finance approval",
    definition: "The finance company runs a credit check, much like a car loan.",
  },
];

const FAQ = [
  {
    question: "Who owns the car during a novated lease?",
    answer:
      "The finance company owns it until the lease ends. You drive it as your own, with no employer branding or restrictions.",
  },
  {
    question: "What happens if I leave my job?",
    answer:
      "The lease comes back to you. You can move it to a new employer that offers salary packaging, keep paying it yourself after tax, or pay it out.",
  },
  {
    question: "Can I get a novated lease on a used car?",
    answer:
      "Usually, yes. Providers often set an age limit, and a used electric car only gets the FBT exemption if it was first sold after 1 July 2022 under the price limit.",
  },
  {
    question: "Do I have to pay a balloon payment?",
    answer:
      "Yes, at the end of the lease. On a 4-year lease the minimum is 37.5% of the amount financed. You can pay it, sell or trade in the car, or re-lease it.",
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
          <h2 className="eyebrow section-title">What paying before tax is worth</h2>
          <div className="panel">
            <p className="text-body">What $1,000 of car costs takes from your take-home pay in 2026–27:</p>
            {PRE_TAX_VALUE.map((row) => (
              <div className="list-row" key={row.income}>
                <div>
                  <p className="list-row-label">{row.income}</p>
                  <p className="list-row-sub">{row.rate} tax rate, including Medicare</p>
                </div>
                <span className="list-row-value">{row.cost}</span>
              </div>
            ))}
          </div>
          <p className="text-sm mt-sm">
            Your employer also claims back GST on the car and running costs.{" "}
            <Link href={guideHref("is-a-novated-lease-worth-it")}>Is a novated lease worth it?</Link>
          </p>
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
          <h2 className="eyebrow section-title">What you need</h2>
          <TermList items={NEEDS} />
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
          <h2 className="eyebrow section-title">Common questions</h2>
          <TermList items={FAQ.map((item) => ({ term: item.question, definition: item.answer }))} />
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">Go deeper</h2>
          <div className="stack-sm">
            {GUIDES.map((guide) => (
              <Link className="tile" href={guideHref(guide.slug)} key={guide.slug}>
                <span className="tile-body">
                  <span className="tile-title">{guide.shortTitle}</span>
                </span>
                <span className="tile-go" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </>
  );
}

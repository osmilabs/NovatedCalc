import Link from "next/link";
import { EstimateChip } from "@/components/ui/EstimateChip";
import { getAssumptions } from "@/lib/assumptions";
import { estimateNovatedLease } from "@/lib/estimate";
import { amount, money } from "@/lib/format";
import { VEHICLES } from "@/lib/vehicles";

const EXAMPLE_SALARY = 120000;

const START_TILES = [
  { href: "/novated-lease-calculator", mark: "$", title: "Calculator", sub: "Your monthly cost and what you'd save" },
  { href: "/how-novated-leasing-works", mark: "?", title: "How novated leasing works", sub: "Plain-language guide, five minutes" },
  { href: "/novated-lease-comparison", mark: "⊞", title: "Compare providers", sub: "Fees and service side by side" },
] as const;

const CALCULATOR_STEPS = [
  { title: "Pick a car", text: "Choose a common model or enter your own price." },
  { title: "Add your salary", text: "It stays on your device unless you ask a provider for a quote." },
  { title: "See your numbers", text: "Monthly cost, yearly saving, and the full term." },
];

export default async function HomePage() {
  const assumptions = await getAssumptions();
  const car = VEHICLES[0];
  const example = estimateNovatedLease(
    {
      salary: EXAMPLE_SALARY,
      carPrice: car.price,
      leaseTermMonths: 48,
      kilometresPerYear: 15000,
      vehicleType: car.type,
    },
    assumptions,
  );

  return (
    <>
      <EstimateChip />

      <div className="page">
        <section className="section-hero home-hero">
          <div className="intro">
            <h1 className="headline headline-lg">Novated leasing, explained properly.</h1>
            <p className="lede">
              What it is, who it suits, and what it would cost you. Free to use, with no sign-up.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/novated-lease-calculator">
                Work out my numbers <span className="arrow" aria-hidden>→</span>
              </Link>
              <Link className="btn btn-ghost" href="/how-novated-leasing-works">
                First, explain novated leasing
              </Link>
            </div>
          </div>

          <div className="panel">
            <p className="label">
              Estimate for someone on {money(EXAMPLE_SALARY)} leasing a {car.name}
            </p>
            <p className="figure figure-lg mt-sm">
              <span className="pre">$</span>
              {amount(example.termDifference)}
            </p>
            <p className="text-sm mt-sm">
              {example.termDifference >= 0 ? "better off" : "worse off"} over four years than buying the same car with a
              car loan.
            </p>
            <div className="divider" />
            <p className="text-body">
              Your own number depends on your salary, the car, and how far you drive. The calculator takes about a
              minute.
            </p>
          </div>
        </section>
      </div>

      <div className="factbar">
        <div className="page">
          <span>No sign-up</span>
          <span>Free to use</span>
          <span>Details shared only if you ask</span>
        </div>
      </div>

      <div className="page">
        <section className="section">
          <h2 className="eyebrow section-title">Where to start</h2>
          <div className="grid-3">
            {START_TILES.map((tile) => (
              <Link className="tile" href={tile.href} key={tile.href}>
                <span className="tile-mark" aria-hidden>
                  {tile.mark}
                </span>
                <span className="tile-body">
                  <span className="tile-title">{tile.title}</span>
                  <span className="tile-sub">{tile.sub}</span>
                </span>
                <span className="tile-go" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">Using the calculator</h2>
          <ol className="grid-3 plain-list">
            {CALCULATOR_STEPS.map((step, i) => (
              <li className="step-item" key={step.title}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <p className="title-sm">{step.title}</p>
                  <p className="text-sm">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <div className="panel-flush">
            <p className="text-body">
              We don&apos;t sell or arrange leases. Everything here is an estimate to help you decide whether a real
              quote is worth getting.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

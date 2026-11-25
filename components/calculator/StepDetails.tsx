import { Slider } from "@/components/ui/Slider";
import { getMarginalTaxRate, getResidualRate, LEASE_TERM_OPTIONS } from "@/lib/estimate";
import { amount, percent } from "@/lib/format";
import type { CalculatorInput } from "@/lib/types";

type Props = {
  input: CalculatorInput;
  update: (patch: Partial<CalculatorInput>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function StepDetails({ input, update, onBack, onNext }: Props) {
  return (
    <>
      <section className="section-hero intro">
        <p className="eyebrow">Step 2 of 4</p>
        <h1 className="headline headline-sm">A few details about you.</h1>
        <p className="lede lede-sm">This stays on your device. It&apos;s only sent if you later ask a provider for a quote.</p>
      </section>

      <div className="stack mt-lg">
        <div className="panel">
          <div className="panel-head">
            <span className="label">Annual salary, before tax</span>
            <span className="pill">{percent(getMarginalTaxRate(input.salary), 1)} tax rate</span>
          </div>
          <p className="figure figure-md mt-sm">
            <span className="pre">$</span>
            {amount(input.salary)}
          </p>
          <Slider
            label="Annual salary"
            value={input.salary}
            min={45000}
            max={250000}
            step={1000}
            onChange={(salary) => update({ salary })}
            marks={["$45k", "$250k"]}
          />
        </div>

        <div className="panel">
          <span className="label">Lease term</span>
          <div className="chip-row mt" role="group" aria-label="Lease term">
            {LEASE_TERM_OPTIONS.map((term) => (
              <button
                key={term}
                type="button"
                className={"chip chip-fill" + (input.leaseTermMonths === term ? " is-active" : "")}
                aria-pressed={input.leaseTermMonths === term}
                onClick={() => update({ leaseTermMonths: term })}
              >
                {term / 12} yr
              </button>
            ))}
          </div>
          <p className="text-sm mt-sm">
            Balloon payment at the end:{" "}
            <b className="strong-ink">{percent(getResidualRate(input.leaseTermMonths), 1)}</b> of the car&apos;s price
          </p>
        </div>

        <div className="panel">
          <div className="panel-head">
            <span className="label">Yearly kilometres</span>
            <span className="value-mono">{amount(input.kilometresPerYear)} km</span>
          </div>
          <Slider
            label="Yearly kilometres"
            value={input.kilometresPerYear}
            min={5000}
            max={40000}
            step={500}
            onChange={(kilometresPerYear) => update({ kilometresPerYear })}
            marks={["5,000", "40,000"]}
          />
        </div>
      </div>

      <div className="bottom-bar">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn btn-primary btn-grow" onClick={onNext}>
          See my estimate <span className="arrow" aria-hidden>→</span>
        </button>
      </div>
    </>
  );
}

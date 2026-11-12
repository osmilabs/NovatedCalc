"use client";

import { useState } from "react";
import { getMarginalTaxRate, getResidualRate, LEASE_TERM_OPTIONS } from "@/lib/estimate";
import { money, percent } from "@/lib/format";
import { ASSUMPTIONS_REVIEWED } from "@/lib/mock-data";
import type { CalculatorAssumptions } from "@/lib/types";

type Unit = "$" | "%" | "c";

type Field = {
  key: keyof CalculatorAssumptions;
  label: string;
  sub: string;
  unit: Unit;
};

const GROUPS: Array<{ title: string; fields: Field[] }> = [
  {
    title: "Tax",
    fields: [
      { key: "gstRate", label: "GST", sub: "Packaged payments don't carry GST.", unit: "%" },
      {
        key: "evFbtExemptionBenefitRate",
        label: "Electric car exemption",
        sub: "Extra saving for EVs under the luxury car tax threshold.",
        unit: "%",
      },
    ],
  },
  {
    title: "Running costs",
    fields: [
      { key: "insuranceMonthly", label: "Insurance a month", sub: "Average comprehensive cover.", unit: "$" },
      { key: "maintenanceMonthly", label: "Servicing and tyres a month", sub: "Spread evenly across the year.", unit: "$" },
      { key: "registrationMonthly", label: "Registration a month", sub: "Blended national average.", unit: "$" },
      {
        key: "fuelAndRunningRatePerKm",
        label: "Fuel or charging, per km",
        sub: "Turns your yearly kilometres into dollars.",
        unit: "c",
      },
    ],
  },
  {
    title: "The lease itself",
    fields: [
      { key: "adminFeeMonthly", label: "Provider admin fee a month", sub: "Charged to manage the lease.", unit: "$" },
      {
        key: "novatedLeaseInterestRateAnnual",
        label: "Lease interest rate",
        sub: "Yearly rate on the financed amount.",
        unit: "%",
      },
      {
        key: "carLoanInterestRateAnnual",
        label: "Car loan interest rate",
        sub: "The loan we compare the lease against.",
        unit: "%",
      },
    ],
  },
];

// Percentages and cents are stored as fractions.
const SCALE: Record<Unit, number> = { $: 1, "%": 100, c: 100 };

type Props = {
  assumptions: CalculatorAssumptions;
  salary: number;
  onChange: (key: keyof CalculatorAssumptions, value: number) => void;
  onReset: () => void;
  onDone: () => void;
};

export function StepAssumptions({ assumptions, salary, onChange, onReset, onDone }: Props) {
  // Inputs are uncontrolled so part-typed values like "8." survive; bumping this remounts them after a reset.
  const [resetCount, setResetCount] = useState(0);

  return (
    <>
      <section className="section-hero intro">
        <p className="eyebrow">How we calculate</p>
        <h1 className="headline headline-sm">Every number we used.</h1>
        <p className="lede lede-sm">
          Change anything here and your estimate updates. Last reviewed{" "}
          <b className="strong-ink">{ASSUMPTIONS_REVIEWED}</b>.
        </p>
      </section>

      {GROUPS.map((group) => (
        <section className="section" key={group.title}>
          <h2 className="eyebrow section-title">{group.title}</h2>
          <div className="panel">
            {group.fields.map((field) => (
              <div className="list-row" key={field.key}>
                <div>
                  <label className="list-row-label" htmlFor={field.key}>
                    {field.label}
                  </label>
                  <p className="list-row-sub">{field.sub}</p>
                </div>
                <span className="number-field">
                  {field.unit === "$" ? "$" : null}
                  <input
                    key={`${field.key}-${resetCount}`}
                    id={field.key}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    defaultValue={Number((assumptions[field.key] * SCALE[field.unit]).toFixed(2))}
                    onChange={(e) => {
                      const value = e.target.valueAsNumber;
                      if (!Number.isNaN(value)) onChange(field.key, value / SCALE[field.unit]);
                    }}
                  />
                  {field.unit === "$" ? null : field.unit}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="section">
        <h2 className="eyebrow section-title">Set by your term and salary</h2>
        <div className="panel">
          <div className="list-row">
            <div>
              <p className="list-row-label">Balloon payment</p>
              <p className="list-row-sub">For {LEASE_TERM_OPTIONS.map((term) => term / 12).join(", ")} year terms.</p>
            </div>
            <span className="list-row-value">
              {LEASE_TERM_OPTIONS.map((term) => (getResidualRate(term) * 100).toFixed(1)).join(" / ")}%
            </span>
          </div>
          <div className="list-row">
            <div>
              <p className="list-row-label">Income tax rate</p>
              <p className="list-row-sub">Your marginal rate on {money(salary)}, including the 2% Medicare levy.</p>
            </div>
            <span className="list-row-value">{percent(getMarginalTaxRate(salary), 1)}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="panel-flush">
          <h2 className="eyebrow section-title">What we don&apos;t include</h2>
          <ul className="bullet-list">
            <li>Limits your employer puts on salary packaging.</li>
            <li>Stamp duty, which varies by state.</li>
            <li>The actual rate a provider offers you.</li>
            <li>Insurance priced on your driving history.</li>
          </ul>
          <p className="text-sm mt">
            These will change your final number. Use this to decide whether a real quote is worth getting.
          </p>
        </div>
      </section>

      <div className="bottom-bar">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            onReset();
            setResetCount((count) => count + 1);
          }}
        >
          Reset
        </button>
        <button type="button" className="btn btn-primary btn-grow" onClick={onDone}>
          Update my estimate
        </button>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { useCountUp } from "@/components/ui/useCountUp";
import { EV_FBT_EXEMPTION_THRESHOLD, LEASE_TERM_OPTIONS } from "@/lib/estimate";
import { guideHref } from "@/components/guides/GuideArticle";
import { amount, money, percent } from "@/lib/format";
import type { CalculatorAssumptions, CalculatorInput, CalculatorResult } from "@/lib/types";

type Props = {
  vehicleName: string | null;
  input: CalculatorInput;
  assumptions: CalculatorAssumptions;
  result: CalculatorResult;
  update: (patch: Partial<CalculatorInput>) => void;
  onEdit: () => void;
  onAssumptions: () => void;
  /** Called just before navigating to the comparison, to hand over the user's answers. */
  onCompare: () => void;
};

export function StepResults({
  vehicleName,
  input,
  assumptions,
  result,
  update,
  onEdit,
  onAssumptions,
  onCompare,
}: Props) {
  const [showNumbers, setShowNumbers] = useState(false);
  const termDifference = useCountUp(Math.abs(result.termDifference));
  const monthlyCost = useCountUp(result.novatedLeaseMonthlyTakeHomeImpact);
  const yearlyDifference = useCountUp(Math.abs(result.monthlyDifference * 12));

  const years = input.leaseTermMonths / 12;
  const yearsLabel = `${years} year${years === 1 ? "" : "s"}`;
  const isEv = input.vehicleType === "ev";
  const savesMoney = result.monthlyDifference >= 0;

  const heroLabel = {
    "nl-ahead": `You'd save over ${yearsLabel}`,
    "loan-ahead": `A car loan works out cheaper over ${yearsLabel}, by`,
    "too-close": `Over ${yearsLabel}, the difference is only`,
  }[result.comparisonLabel];

  const segments = [
    { label: "Lease payment", value: result.novatedLeaseMonthlyFinanceCost, color: "var(--ink)" },
    { label: "Running costs", value: result.runningMonthlyCost, color: "var(--muted-2)" },
    { label: "Admin fee", value: assumptions.adminFeeMonthly, color: "var(--accent)" },
  ];

  const ways = [
    { label: "Novated lease", yearly: result.novatedLeaseMonthlyTakeHomeImpact * 12 },
    { label: "Car loan", yearly: result.carLoanMonthlyCost * 12 },
    { label: "Paying cash", yearly: result.cashMonthlyCost * 12 },
  ];
  const cheapest = Math.min(...ways.map((way) => way.yearly));
  const dearest = Math.max(...ways.map((way) => way.yearly));

  const numbersUsed = [
    ["Car price", money(input.carPrice)],
    ["Monthly insurance", money(assumptions.insuranceMonthly)],
    ["Monthly servicing and tyres", money(assumptions.maintenanceMonthly)],
    ["Monthly registration", money(assumptions.registrationMonthly)],
    ["Fuel or charging, per km", `${Number((assumptions.fuelAndRunningRatePerKm * 100).toFixed(1))}c`],
    ["Monthly provider admin fee", money(assumptions.adminFeeMonthly)],
    ["Lease interest rate", percent(assumptions.novatedLeaseInterestRateAnnual, 2)],
    ["Car loan interest rate", percent(assumptions.carLoanInterestRateAnnual, 2)],
    ["Balloon payment", percent(result.residualRate, 1)],
    ["GST claimed on the price", money(result.gstCreditOnPrice)],
    ["Monthly after-tax contribution", money(result.postTaxContributionMonthly)],
  ];

  return (
    <>
      <section className="section-hero">
        <p className="eyebrow">
          {vehicleName ?? "Your car"} · {money(input.carPrice)} · {years} year lease
        </p>
        <p className="label mt">{heroLabel}</p>
        <p className="hero-figure mt-xs">
          <span className="pre">$</span>
          {amount(termDifference)}
        </p>
        <p className="text-sm mt-sm">
          Compared with a car loan, on a {percent(result.marginalTaxRate, 1)} tax rate.
          {result.fbtExempt ? " Electric cars under the luxury car tax threshold are FBT free." : null}
        </p>

        <div className="stat-grid mt-lg">
          <div className="stat">
            <span className="label">Monthly cost, after tax</span>
            <p className="figure figure-md">
              <span className="pre">$</span>
              {amount(monthlyCost)}
            </p>
          </div>
          <div className="stat">
            <span className="label">{savesMoney ? "Yearly savings" : "Yearly extra cost"}</span>
            <p className={"figure figure-md" + (savesMoney ? " is-good" : "")}>
              <span className="pre">$</span>
              {amount(yearlyDifference)}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="eyebrow section-title">Where your monthly payment goes</h2>
        <div className="panel">
          <div className="figure-row">
            <span className="label">Monthly total, before tax</span>
            <span className="figure figure-sm">
              <span className="pre">$</span>
              {amount(result.novatedLeaseMonthlyPackageCost)}
            </span>
          </div>
          <div className="bar-stack mt-sm" aria-hidden>
            {segments.map((segment) => (
              <div
                key={segment.label}
                className="bar-seg"
                style={{
                  width: `${(segment.value / result.novatedLeaseMonthlyPackageCost) * 100}%`,
                  background: segment.color,
                }}
              />
            ))}
          </div>
          <div className="legend">
            {segments.map((segment) => (
              <div className="legend-item" key={segment.label}>
                <span className="legend-dot" style={{ background: segment.color }} />
                <span>
                  <span className="legend-label">{segment.label}</span>
                  <span className="legend-value">{money(segment.value)}</span>
                </span>
              </div>
            ))}
            <div className="legend-item">
              <span className="legend-dot is-ring" />
              <span>
                <span className="legend-label">Tax and GST saved</span>
                <span className="legend-value is-good">-{money(result.taxSavingMonthly)}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="eyebrow section-title">Compared with other ways to pay</h2>
        <div className="panel">
          {ways.map((way) => (
            <div className="compare-row" key={way.label}>
              <span className="compare-name">{way.label}</span>
              <div className="compare-track" aria-hidden>
                <div
                  className={"compare-fill" + (way.yearly === cheapest ? " is-best" : "")}
                  style={{ width: `${(way.yearly / dearest) * 100}%` }}
                />
              </div>
              <span className="compare-num">{money(way.yearly)}</span>
            </div>
          ))}
          <p className="text-sm mt-sm">
            Yearly cost, lower is better. The loan assumes {percent(assumptions.carLoanInterestRateAnnual, 2)} over{" "}
            {yearsLabel}. None include the {money(result.residualDueAtEnd)} balloon payment at the end.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="eyebrow section-title">Change your details</h2>
        <div className="panel">
          <div className="panel-head">
            <span className="label">Salary</span>
            <span className="value-mono">{money(input.salary)}</span>
          </div>
          <Slider
            label="Salary"
            value={input.salary}
            min={45000}
            max={250000}
            step={1000}
            onChange={(salary) => update({ salary })}
          />

          <div className="divider" />

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
          />

          <div className="divider" />

          <div className="panel-head">
            <span className="label">Lease term</span>
            <div className="toggle" role="group" aria-label="Lease term">
              {LEASE_TERM_OPTIONS.map((term) => (
                <button
                  key={term}
                  type="button"
                  className={"toggle-opt" + (input.leaseTermMonths === term ? " is-active" : "")}
                  aria-pressed={input.leaseTermMonths === term}
                  onClick={() => update({ leaseTermMonths: term })}
                >
                  {term / 12} yr
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="eyebrow section-title">How we got this number</h2>
        <div className="panel mint-panel">
          <p className="text-body strong-ink">
            Over {yearsLabel} you finance <b>{money(result.financedAmount)}</b> of the{" "}
            <b>{money(input.carPrice)}</b> {vehicleName ?? "car"}, with <b>{money(result.residualDueAtEnd)}</b> left to pay
            at the end. Your employer claims back <b>{money(result.gstCreditOnPrice)}</b> of GST on the price, and the
            GST on most running costs.
          </p>
          {result.fbtExempt ? (
            <p className="text-body mt-sm">
              <b>FBT:</b> electric cars priced under {money(EV_FBT_EXEMPTION_THRESHOLD)} are exempt from fringe
              benefits tax, so the whole package comes out of your pay before{" "}
              <b>{percent(result.marginalTaxRate, 1)} income tax</b>. It still shows on your income statement as a
              reportable fringe benefit, which can affect HELP repayments and the Medicare levy surcharge, and the
              exemption is proposed to narrow from 1 April 2027.{" "}
              <Link href={guideHref("fbt-and-the-ev-exemption")}>How the EV exemption works</Link>.
            </p>
          ) : (
            <p className="text-body mt-sm">
              <b>FBT:</b>{" "}
              {isEv
                ? `electric cars over ${money(EV_FBT_EXEMPTION_THRESHOLD)} aren't exempt from fringe benefits tax. `
                : "petrol, diesel and hybrid cars attract fringe benefits tax. "}
              To cancel it out, <b>{money(result.postTaxContributionMonthly)} per month</b> comes from your after-tax pay
              (20% of the car&apos;s price per year, the employee contribution method), with no tax saving on that part.
              The other <b>{money(result.preTaxDeductionMonthly)}</b> comes out before{" "}
              <b>{percent(result.marginalTaxRate, 1)} income tax</b>.{" "}
              <Link href={guideHref("fbt-and-the-ev-exemption")}>How FBT works on a novated lease</Link>.
            </p>
          )}
          <button
            type="button"
            className="btn btn-dark mt"
            aria-expanded={showNumbers}
            onClick={() => setShowNumbers((shown) => !shown)}
          >
            {showNumbers ? "Hide" : "Show"} the numbers we used
          </button>
          {showNumbers ? (
            <dl className="numbers-grid">
              {numbersUsed.map(([term, value]) => (
                <Fragment key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </Fragment>
              ))}
            </dl>
          ) : null}
        </div>
      </section>

      <section className="section">
        <h2 className="eyebrow section-title">Next step</h2>
        <div className="panel">
          <p className="text-body">
            See what each provider would charge for {vehicleName ? `the ${vehicleName}` : "your car"}, using these
            numbers. No sign-up, and no details needed to compare.
          </p>
          <div className="button-row mt">
            <button type="button" className="btn btn-ghost" onClick={onEdit}>
              Change details
            </button>
            <button type="button" className="btn btn-ghost" onClick={onAssumptions}>
              How we calculate
            </button>
          </div>
        </div>
      </section>

      <div className="bottom-bar">
        <Link href="/novated-lease-comparison/results" className="btn btn-primary btn-grow" onClick={onCompare}>
          Compare providers <span className="arrow" aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}

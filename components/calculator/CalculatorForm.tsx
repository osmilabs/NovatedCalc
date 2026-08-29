"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { estimateNovatedLease } from "@/lib/estimate";
import type { CalculatorAssumptions, CalculatorInput, CalculatorResult } from "@/lib/types";
import { trackClientEvent } from "@/lib/tracking";

type Props = {
  assumptions: CalculatorAssumptions;
};

const defaultInput: CalculatorInput = {
  salary: 120000,
  carPrice: 65000,
  leaseTermMonths: 48,
  kilometresPerYear: 15000,
  vehicleType: "ev",
};

export function CalculatorForm({ assumptions }: Props) {
  const [input, setInput] = useState<CalculatorInput>(defaultInput);

  const result: CalculatorResult = useMemo(
    () => estimateNovatedLease(input, assumptions),
    [assumptions, input],
  );
  const comparisonSummary =
    result.comparisonLabel === "nl-ahead"
      ? "Novated lease estimated ahead"
      : result.comparisonLabel === "loan-ahead"
        ? "Car loan estimated ahead"
        : "Too close to call";

  return (
    <section className="glass-card">
      <h2>Compare novated lease vs car loan</h2>
      <p className="muted">
        Minimal inputs, transparent defaults. Results are estimates and can change by employer policy, provider structure,
        and quote details.
      </p>
      <div className="grid-two">
        <label>
          Salary (AUD)
          <input
            type="number"
            value={input.salary}
            onChange={(e) => setInput((p) => ({ ...p, salary: Number(e.target.value || 0) }))}
          />
        </label>
        <label>
          Car price (AUD)
          <input
            type="number"
            value={input.carPrice}
            onChange={(e) => setInput((p) => ({ ...p, carPrice: Number(e.target.value || 0) }))}
          />
        </label>
        <label>
          Lease term (months)
          <select
            value={input.leaseTermMonths}
            onChange={(e) => setInput((p) => ({ ...p, leaseTermMonths: Number(e.target.value) }))}
          >
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
            <option value={60}>60</option>
          </select>
        </label>
        <label>
          Kilometres per year
          <input
            type="number"
            value={input.kilometresPerYear}
            onChange={(e) => setInput((p) => ({ ...p, kilometresPerYear: Number(e.target.value || 0) }))}
          />
        </label>
        <label>
          Vehicle type
          <select
            value={input.vehicleType}
            onChange={(e) =>
              setInput((p) => ({ ...p, vehicleType: e.target.value as CalculatorInput["vehicleType"] }))
            }
          >
            <option value="ev">EV</option>
            <option value="non-ev">Non-EV</option>
          </select>
        </label>
      </div>

      <div className="result-grid">
        <div>
          <strong>${result.novatedLeaseMonthlyTakeHomeImpact.toLocaleString()}</strong>
          <span>Novated lease take-home impact / month</span>
        </div>
        <div>
          <strong>${result.carLoanMonthlyCost.toLocaleString()}</strong>
          <span>Car loan path cost / month</span>
        </div>
        <div>
          <strong>${result.monthlyDifference.toLocaleString()}</strong>
          <span>Difference / month (loan - novated)</span>
        </div>
        <div>
          <strong>${result.termDifference.toLocaleString()}</strong>
          <span>Difference over term</span>
        </div>
        <div>
          <strong>${result.residualDueAtEnd.toLocaleString()}</strong>
          <span>Residual due at end</span>
        </div>
      </div>
      <p className="muted">
        <strong>{comparisonSummary}</strong>. Positive difference means novated lease is estimated cheaper than the car
        loan path.
      </p>

      <details>
        <summary>Assumptions used</summary>
        <ul>
          <li>Novated finance rate: {(assumptions.novatedLeaseInterestRateAnnual * 100).toFixed(2)}% p.a.</li>
          <li>Car loan rate: {(assumptions.carLoanInterestRateAnnual * 100).toFixed(2)}% p.a.</li>
          <li>GST benefit rate: {(assumptions.gstRate * 100).toFixed(0)}%</li>
          <li>
            EV FBT exemption benefit rate (EV only): {(assumptions.evFbtExemptionBenefitRate * 100).toFixed(0)}%
          </li>
          <li>Admin fee: ${assumptions.adminFeeMonthly.toFixed(0)} / month</li>
          <li>Insurance: ${assumptions.insuranceMonthly.toFixed(0)} / month</li>
          <li>Maintenance: ${assumptions.maintenanceMonthly.toFixed(0)} / month</li>
          <li>Registration: ${assumptions.registrationMonthly.toFixed(0)} / month</li>
          <li>Fuel and running: ${assumptions.fuelAndRunningRatePerKm.toFixed(2)} / km</li>
          <li>Residual rates by term: 24m 46%, 36m 37%, 48m 28%, 60m 20%</li>
        </ul>
      </details>

      <Link
        className="btn-primary"
        href="/novated-lease-comparison"
        onClick={() => {
          trackClientEvent("calculator_completed", { vehicleType: input.vehicleType });
        }}
      >
        Compare providers
      </Link>
    </section>
  );
}

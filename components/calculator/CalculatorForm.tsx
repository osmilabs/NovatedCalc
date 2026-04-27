"use client";

import { useMemo, useState } from "react";
import { estimateNovatedLease } from "@/lib/estimate";
import type { CalculatorAssumptions, CalculatorInput, CalculatorResult } from "@/lib/types";
import { LeadCaptureForm } from "@/components/leads/LeadCaptureForm";
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
  const [showLeadForm, setShowLeadForm] = useState(false);

  const result: CalculatorResult = useMemo(
    () => estimateNovatedLease(input, assumptions),
    [assumptions, input],
  );

  return (
    <section className="glass-card">
      <h2>Estimate your novated lease impact</h2>
      <p className="muted">
        Estimates only. Final numbers vary by employer policy, provider packaging assumptions, and quote details.
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
          <strong>${result.monthlyPackageCost.toLocaleString()}</strong>
          <span>Estimated monthly package</span>
        </div>
        <div>
          <strong>${result.monthlyTakeHomeImpact.toLocaleString()}</strong>
          <span>Estimated take-home impact / month</span>
        </div>
        <div>
          <strong>${result.estimatedAnnualSavings.toLocaleString()}</strong>
          <span>Estimated annual savings</span>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={() => {
          trackClientEvent("calculator_completed", { vehicleType: input.vehicleType });
          setShowLeadForm(true);
        }}
      >
        Unlock matched providers
      </button>

      {showLeadForm ? <LeadCaptureForm calculatorInput={input} calculatorResult={result} /> : null}
    </section>
  );
}

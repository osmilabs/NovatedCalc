"use client";

import { useState } from "react";
import type { CalculatorInput, CalculatorResult } from "@/lib/types";
import { trackClientEvent } from "@/lib/tracking";

type Props = {
  calculatorInput: CalculatorInput;
  calculatorResult: CalculatorResult;
};

export function LeadCaptureForm({ calculatorInput, calculatorResult }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [stateCode, setStateCode] = useState("QLD");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    const payload = {
      fullName,
      email,
      phone,
      postcode,
      state: stateCode,
      preferredProviderSlugs: [],
      consentAccepted,
      calculatorInput,
      calculatorResult,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Lead submission failed");
      }
      trackClientEvent("lead_submit", { state: stateCode });
      setMessage("Lead submitted. You can now view provider matches.");
    } catch {
      setMessage("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <h3>Get matched providers</h3>
      <p className="muted">Phone is optional for first contact.</p>
      <div className="grid-two">
        <label>
          Full name
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          Email
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone (optional)
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Postcode
          <input required value={postcode} onChange={(e) => setPostcode(e.target.value)} />
        </label>
        <label>
          State
          <select value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
            <option value="QLD">QLD</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="WA">WA</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="ACT">ACT</option>
            <option value="NT">NT</option>
          </select>
        </label>
      </div>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={consentAccepted}
          onChange={(e) => setConsentAccepted(e.target.checked)}
          required
        />
        I agree to share my details with selected novated lease providers.
      </label>
      <button className="btn-primary" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit and compare"}
      </button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AffiliateLink } from "@/components/providers/AffiliateLink";
import { money } from "@/lib/format";
import { consentText, type LeadRequest } from "@/lib/leads";
import { trackClientEvent } from "@/lib/tracking";
import { type CalculatorInput, type Provider, STATES, type StateCode } from "@/lib/types";

type Props = {
  /** The provider being quoted, or null while the modal is closed. */
  provider: Provider | null;
  input: CalculatorInput;
  vehicleName: string | null;
  monthlyCost: number;
  defaultState: string;
  onClose: () => void;
};

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

function QuoteForm({ provider, input, vehicleName, monthlyCost, defaultState, onDone }: Omit<Props, "provider" | "onClose"> & { provider: Provider; onDone: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState<StateCode>(
    (STATES as readonly string[]).includes(defaultState) ? (defaultState as StateCode) : "QLD",
  );
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    const payload: LeadRequest & { website: string } = {
      providerSlug: provider.slug,
      vehicleName: vehicleName ?? undefined,
      fullName,
      email,
      phone,
      postcode,
      state,
      consentAccepted: consent as true,
      calculatorInput: input,
      website,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error);
      trackClientEvent("lead_submit", { providerSlug: provider.slug, state });
      setStatus({ kind: "sent" });
    } catch (error) {
      setStatus({
        kind: "error",
        message: (error instanceof Error && error.message) || "Something went wrong. Please try again.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="quote-done" role="status">
        <h2 id="quote-title" className="cmp-sheet-title">
          Sent to {provider.name}</h2>
        <p className="text-body">
          They&apos;ll contact you at {email} or {phone}. They&apos;ll check your employer and the car before giving you
          a formal quote, and their figures may differ from our estimate.
        </p>
        <button type="button" className="btn btn-primary btn-block mt" onClick={onDone}>
          Back to results
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={onSubmit}>
      <h2 id="quote-title" className="cmp-sheet-title">
        Get a quote from {provider.name}
      </h2>
      <dl className="cmp-dl quote-summary">
        {vehicleName ? (
          <div>
            <dt>Car</dt>
            <dd>{vehicleName}</dd>
          </div>
        ) : null}
        <div>
          <dt>Price</dt>
          <dd>{money(input.carPrice)}</dd>
        </div>
        <div>
          <dt>Term</dt>
          <dd>{input.leaseTermMonths / 12} years</dd>
        </div>
        <div>
          <dt>Our estimate</dt>
          <dd>{money(monthlyCost)}/mo</dd>
        </div>
      </dl>
      <div className="quote-caveat">
        <p>This is an estimate, not a quote. {provider.name} will work out the final figures with you.</p>
        <p>
          Some employers only allow certain providers. If yours doesn&apos;t work with {provider.name}, they may not be
          able to set up your lease. Your payroll or HR team can tell you.
        </p>
      </div>

      <label className="quote-field">
        <span>Full name</span>
        <input required autoComplete="name" minLength={2} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>
      <label className="quote-field">
        <span>Email</span>
        <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="quote-field">
        <span>Phone</span>
        <input
          required
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="04xx xxx xxx"
          pattern="[\d\s+()\-]{8,16}"
          title="An Australian phone number, e.g. 0412 345 678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <div className="quote-row">
        <label className="quote-field">
          <span>Postcode</span>
          <input
            required
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            title="Four digits"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </label>
        <label className="quote-field">
          <span>State</span>
          <select value={state} onChange={(e) => setState(e.target.value as StateCode)}>
            {STATES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <input
        className="quote-hp"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <label className="quote-consent">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{consentText(provider.name)}</span>
      </label>
      <p className="text-sm">
        See our <Link href="/privacy">privacy policy</Link> for how we handle your details.
      </p>
      <p className="text-sm">
        We may be paid a referral fee by {provider.name} if you go ahead. It never changes the order of results.
      </p>

      {status.kind === "error" ? (
        <p className="quote-error" role="alert">
          {status.message}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary btn-block" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : `Send to ${provider.name}`}
      </button>

      <p className="text-sm quote-alt">
        Rather not share your details?{" "}
        {provider.affiliateLink ? (
          <AffiliateLink href={provider.affiliateLink} providerSlug={provider.slug}>
            Visit {provider.name}&apos;s site
          </AffiliateLink>
        ) : (
          <Link href={`/providers/${provider.slug}`}>See {provider.name}&apos;s profile</Link>
        )}
      </p>
    </form>
  );
}

/** Shown instead of the form for an example provider: there's nobody to send details to. */
function SampleQuote({ provider, onDone }: { provider: Provider; onDone: () => void }) {
  return (
    <div className="quote-done" role="status">
      <h2 id="quote-title" className="cmp-sheet-title">
        Quote requests coming soon
      </h2>
      <p className="text-body">
        {provider.name} is an illustrative listing, so quote requests aren&apos;t available for it. No personal details
        have been collected.
      </p>
      <p className="text-body mt-sm">
        We&apos;re onboarding provider partners now. Once they&apos;re listed, you&apos;ll be able to request a quote
        directly from this page.
      </p>
      <button type="button" className="btn btn-primary btn-block mt" onClick={onDone}>
        Back to results
      </button>
    </div>
  );
}

export function QuoteRequest({ provider, onClose, ...rest }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (provider && !ref.current?.open) ref.current?.showModal();
  }, [provider]);

  return (
    <dialog
      ref={ref}
      className="cmp-sheet quote-sheet"
      aria-labelledby="quote-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="cmp-grab" aria-hidden />
      <button type="button" className="quote-x" aria-label="Close" onClick={() => ref.current?.close()}>
        ×
      </button>
      {provider?.sample ? (
        <SampleQuote provider={provider} onDone={() => ref.current?.close()} />
      ) : provider ? (
        <QuoteForm key={provider.id} provider={provider} {...rest} onDone={() => ref.current?.close()} />
      ) : null}
    </dialog>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { MyDetails } from "@/components/comparison/MyDetails";
import { type Frequency, ProviderCard } from "@/components/comparison/ProviderCard";
import { QuoteRequest } from "@/components/comparison/QuoteRequest";
import { RefineOptions, type SortKey } from "@/components/comparison/RefineOptions";
import { PreviewNotice } from "@/components/ui/PreviewNotice";
import { useJourney } from "@/components/ui/useJourney";
import { feesOverLease, providerMonthlyCost } from "@/lib/fees";
import { loadJourney } from "@/lib/journey";
import { trackClientEvent } from "@/lib/tracking";
import type { CalculatorAssumptions, Provider } from "@/lib/types";
import { VEHICLES } from "@/lib/vehicles";

type Props = {
  providers: Provider[];
  assumptions: CalculatorAssumptions;
};

export function ProviderComparison({ providers, assumptions: defaultAssumptions }: Props) {
  const { input, vehicleId, assumptions, update, selectVehicle } = useJourney(defaultAssumptions);
  const [frequency, setFrequency] = useState<Frequency>("month");
  const [sortBy, setSortBy] = useState<SortKey>("cost");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [showDetails, setShowDetails] = useState(false);
  const [quoteSlug, setQuoteSlug] = useState<string | null>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  // Results only make sense for someone's own answers, so without a saved journey start at the calculator.
  const [hasJourney, setHasJourney] = useState(false);
  useLayoutEffect(() => {
    if (loadJourney()) setHasJourney(true);
    else router.replace("/novated-lease-calculator");
  }, [router]);

  const toggleFrequency = () => setFrequency((f) => (f === "month" ? "fortnight" : "month"));
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  const vehicleName = vehicle?.name ?? "car";

  const rows = useMemo(() => {
    const priced = providers
      .map((provider, colourIndex) => ({
        provider,
        colourIndex,
        monthlyCost: providerMonthlyCost(provider, input, assumptions),
      }))
      .filter(({ provider }) => stateFilter === "ALL" || provider.states.includes(stateFilter));

    const key = {
      cost: (row: (typeof priced)[number]) => row.monthlyCost,
      fees: (row: (typeof priced)[number]) => feesOverLease(row.provider, input.leaseTermMonths),
      rate: (row: (typeof priced)[number]) => row.provider.interestRate ?? Infinity,
    }[sortBy];
    return priced.sort((a, b) => key(a) - key(b));
  }, [providers, input, assumptions, stateFilter, sortBy]);

  const preview = providers.some((provider) => provider.sample);
  const cheapest = Math.min(...rows.map((row) => row.monthlyCost));
  const quoteRow = rows.find((row) => row.provider.slug === quoteSlug);

  const refine = (
    <RefineOptions
      frequency={frequency}
      onFrequency={setFrequency}
      sortBy={sortBy}
      onSort={setSortBy}
      stateFilter={stateFilter}
      onStateFilter={setStateFilter}
    />
  );
  const details = (
    <MyDetails input={input} vehicleId={vehicleId} update={update} onSelectVehicle={selectVehicle} />
  );

  if (!hasJourney) return null;

  return (
    <div className="cmp journey-gate">
      <div className="cmp-layout">
        <div className="cmp-main">
          <header className="cmp-head">
            <h1 className="cmp-title">
              We found{" "}
              <b>
                {rows.length} {preview ? "example " : ""}provider{rows.length === 1 ? "" : "s"}
              </b>{" "}
              for your {vehicleName}
            </h1>
            <p className="cmp-sub">
              These are estimates, not quotes, based on your details and each provider&apos;s published fees and rates.
              The provider sets the final figures. Some employers only work with certain providers, so check with your
              payroll or HR team.
            </p>
            {preview ? <PreviewNotice className="mt" /> : null}
          </header>

          <div className="cmp-actions">
            <button type="button" className="cmp-act" onClick={() => sheetRef.current?.showModal()}>
              <span className="cmp-act-ico" aria-hidden>
                ⚙
              </span>
              Refine results
            </button>
            <button
              type="button"
              className={"cmp-act" + (showDetails ? " is-on" : "")}
              aria-expanded={showDetails}
              onClick={() => setShowDetails((open) => !open)}
            >
              <span className="cmp-act-ico" aria-hidden>
                ✎
              </span>
              My details
            </button>
          </div>
          {showDetails ? <div className="cmp-details">{details}</div> : null}

          {rows.length === 0 ? (
            <div className="panel-flush cmp-empty">
              <p className="text-body">We don&apos;t list a provider covering {stateFilter} yet.</p>
            </div>
          ) : (
            <div className="cmp-list">
              {rows.map((row) => (
                <ProviderCard
                  key={row.provider.id}
                  provider={row.provider}
                  colourIndex={row.colourIndex}
                  monthlyCost={row.monthlyCost}
                  isCheapest={row.monthlyCost === cheapest}
                  frequency={frequency}
                  onToggleFrequency={toggleFrequency}
                  onRequestQuote={() => {
                    trackClientEvent("quote_open", { providerSlug: row.provider.slug });
                    setQuoteSlug(row.provider.slug);
                  }}
                />
              ))}
            </div>
          )}

          <p className="cmp-note">
            We don&apos;t arrange leases. If you ask for a quote, we send your details to that provider only, and we may
            be paid a referral fee if you go ahead. That never changes the order, which you control.
          </p>
        </div>

        <aside className="cmp-side" aria-label="Refine and details">
          <section className="cmp-panel">
            <h2 className="cmp-panel-h">
              <span className="cmp-act-ico" aria-hidden>
                ⚙
              </span>
              Refine results
            </h2>
            {refine}
          </section>
          <section className="cmp-panel">
            <h2 className="cmp-panel-h">
              <span className="cmp-act-ico" aria-hidden>
                ✎
              </span>
              My details
            </h2>
            {details}
          </section>
        </aside>
      </div>

      <dialog
        ref={sheetRef}
        className="cmp-sheet"
        aria-labelledby="refine-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="cmp-grab" aria-hidden />
        <h2 id="refine-title" className="cmp-sheet-title">
          Refine results
        </h2>
        {refine}
        <button type="button" className="btn btn-primary btn-block mt" onClick={() => sheetRef.current?.close()}>
          Show {rows.length} result{rows.length === 1 ? "" : "s"}
        </button>
      </dialog>

      <QuoteRequest
        provider={quoteRow?.provider ?? null}
        input={input}
        vehicleName={vehicle ? `${vehicle.name} ${vehicle.trim}` : null}
        monthlyCost={quoteRow?.monthlyCost ?? 0}
        defaultState={stateFilter}
        onClose={() => setQuoteSlug(null)}
      />
    </div>
  );
}

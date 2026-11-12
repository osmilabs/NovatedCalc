"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StepAssumptions } from "@/components/calculator/StepAssumptions";
import { StepDetails } from "@/components/calculator/StepDetails";
import { StepResults } from "@/components/calculator/StepResults";
import { StepVehicle } from "@/components/calculator/StepVehicle";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { useJourney } from "@/components/ui/useJourney";
import { estimateNovatedLease } from "@/lib/estimate";
import { trackClientEvent } from "@/lib/tracking";
import type { CalculatorAssumptions } from "@/lib/types";
import { VEHICLES } from "@/lib/vehicles";

const STEPS = ["vehicle", "details", "results", "assumptions"] as const;
type Step = (typeof STEPS)[number];

function parseStep(value: string | null): Step {
  return STEPS.find((step) => step === value) ?? "vehicle";
}

const BACK: Record<Exclude<Step, "vehicle">, { label: string; to: Step }> = {
  details: { label: "Back", to: "vehicle" },
  results: { label: "Edit", to: "details" },
  assumptions: { label: "Results", to: "results" },
};

type Props = {
  defaultAssumptions: CalculatorAssumptions;
};

export function CalculatorFlow({ defaultAssumptions }: Props) {
  // The step lives in the URL, so browser Back and Forward move between steps, and Back from the
  // comparison lands on the results rather than the first step. A fresh visit starts at the car.
  const step = parseStep(useSearchParams().get("step"));
  const { input, vehicleId, assumptions, update, selectVehicle, setAssumptions, save } =
    useJourney(defaultAssumptions);

  const result = estimateNovatedLease(input, assumptions);
  const vehicleName = VEHICLES.find((vehicle) => vehicle.id === vehicleId)?.name ?? null;

  function compare() {
    save();
    trackClientEvent("calculator_to_comparison", { vehicleType: input.vehicleType });
  }

  function goTo(next: Step) {
    if (step === "details" && next === "results") {
      trackClientEvent("calculator_completed", { vehicleType: input.vehicleType });
    }
    window.history.pushState(null, "", next === "vehicle" ? window.location.pathname : `?step=${next}`);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className="flow-head">
        <div className="page page-narrow flow-bar">
          {step === "vehicle" ? (
            <Link href="/" className="back-link">
              ← Home
            </Link>
          ) : (
            <button type="button" className="back-link" onClick={() => goTo(BACK[step].to)}>
              ← {BACK[step].label}
            </button>
          )}
          <ProgressDots total={STEPS.length} current={STEPS.indexOf(step)} />
        </div>
      </div>

      <div className="page page-narrow journey-gate">
        {step === "vehicle" ? (
          <StepVehicle
            vehicleId={vehicleId}
            input={input}
            onSelectVehicle={selectVehicle}
            update={update}
            onNext={() => goTo("details")}
          />
        ) : null}
        {step === "details" ? (
          <StepDetails input={input} update={update} onBack={() => goTo("vehicle")} onNext={() => goTo("results")} />
        ) : null}
        {step === "results" ? (
          <StepResults
            vehicleName={vehicleName}
            input={input}
            assumptions={assumptions}
            result={result}
            update={update}
            onEdit={() => goTo("details")}
            onAssumptions={() => goTo("assumptions")}
            onCompare={compare}
          />
        ) : null}
        {step === "assumptions" ? (
          <StepAssumptions
            assumptions={assumptions}
            salary={input.salary}
            onChange={(key, value) => setAssumptions((prev) => ({ ...prev, [key]: value }))}
            onReset={() => setAssumptions(() => defaultAssumptions)}
            onDone={() => goTo("results")}
          />
        ) : null}
      </div>
    </>
  );
}

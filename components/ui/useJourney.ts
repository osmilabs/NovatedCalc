"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type Journey, loadJourney, markJourneyApplied, saveJourney } from "@/lib/journey";
import type { CalculatorAssumptions, CalculatorInput } from "@/lib/types";
import { DEFAULT_INPUT, DEFAULT_VEHICLE } from "@/lib/vehicles";

/**
 * The user's answers, shared by the calculator and the comparison: restored from the tab's session on
 * mount, and saved again whenever the user changes one, so either page picks up the other's edits.
 */
export function useJourney(defaultAssumptions: CalculatorAssumptions) {
  const [journey, setJourney] = useState<Journey>({
    input: DEFAULT_INPUT,
    vehicleId: DEFAULT_VEHICLE.id,
    assumptions: defaultAssumptions,
  });
  // Only save after a real change, so visiting a page doesn't overwrite saved answers with the defaults.
  const changed = useRef(false);

  // Before paint: on client navigation the defaults never show, and markJourneyApplied() reveals the
  // gated content once the saved answers are in.
  useLayoutEffect(() => {
    const saved = loadJourney();
    if (saved) setJourney(saved);
    markJourneyApplied();
  }, []);

  useEffect(() => {
    if (changed.current) saveJourney(journey);
  }, [journey]);

  function change(next: (prev: Journey) => Journey) {
    changed.current = true;
    setJourney(next);
  }

  return {
    ...journey,
    update: (patch: Partial<CalculatorInput>) => change((prev) => ({ ...prev, input: { ...prev.input, ...patch } })),
    selectVehicle: (vehicleId: string | null) => change((prev) => ({ ...prev, vehicleId })),
    setAssumptions: (next: (prev: CalculatorAssumptions) => CalculatorAssumptions) =>
      change((prev) => ({ ...prev, assumptions: next(prev.assumptions) })),
    /** Saves now, even if nothing changed, e.g. right before leaving for the comparison. */
    save: () => saveJourney(journey),
  };
}

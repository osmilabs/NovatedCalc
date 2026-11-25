"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { amount } from "@/lib/format";
import type { CalculatorInput, VehicleType } from "@/lib/types";
import { VEHICLES } from "@/lib/vehicles";

type Filter = "all" | VehicleType;

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "ev", label: "EV" },
  { key: "non-ev", label: "Non-EV" },
];

const CUSTOM_TYPES: Array<{ key: VehicleType; label: string }> = [
  { key: "ev", label: "Electric" },
  { key: "non-ev", label: "Petrol, diesel or hybrid" },
];

type Props = {
  vehicleId: string | null;
  input: CalculatorInput;
  onSelectVehicle: (id: string | null) => void;
  update: (patch: Partial<CalculatorInput>) => void;
  onNext: () => void;
};

export function StepVehicle({ vehicleId, input, onSelectVehicle, update, onNext }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const vehicles = VEHICLES.filter((vehicle) => filter === "all" || vehicle.type === filter);

  return (
    <>
      <section className="section-hero intro">
        <p className="eyebrow">Step 1 of 4</p>
        <h1 className="headline headline-sm">Which car are you looking at?</h1>
        <p className="lede lede-sm">Pick a common model, or enter your own price below.</p>
      </section>

      <div className="chip-row mt-lg">
        {FILTERS.map((option) => (
          <button
            key={option.key}
            type="button"
            className={"chip" + (filter === option.key ? " is-active" : "")}
            aria-pressed={filter === option.key}
            onClick={() => setFilter(option.key)}
          >
            {option.label}
          </button>
        ))}
        <span className="text-sm push-end">{vehicles.length} models</span>
      </div>

      <div className="stack-sm mt">
        {vehicles.map((vehicle) => {
          const active = vehicle.id === vehicleId;
          return (
            <button
              key={vehicle.id}
              type="button"
              className={"vehicle-card" + (active ? " is-active" : "")}
              aria-pressed={active}
              onClick={() => {
                onSelectVehicle(vehicle.id);
                update({ carPrice: vehicle.price, vehicleType: vehicle.type });
              }}
            >
              <span className="vehicle-shot" aria-hidden>
                <span
                  className="vehicle-dot"
                  style={{ background: vehicle.accent, boxShadow: `0 0 0 4px ${vehicle.accent}22` }}
                />
              </span>
              <span className="vehicle-info">
                <span className="vehicle-name">
                  {vehicle.name}
                  {vehicle.type === "ev" ? <span className="tag tag-signal">EV</span> : null}
                </span>
                <span className="vehicle-meta">
                  {vehicle.trim} · {vehicle.spec}
                </span>
              </span>
              <span className="vehicle-price">${(vehicle.price / 1000).toFixed(1)}k</span>
            </button>
          );
        })}
      </div>

      <div className="panel-flush mt-lg">
        <div className="figure-row">
          <span className="label">{vehicleId ? "Car not listed? Enter your own price" : "Your price"}</span>
          <span className="text-sm">drive-away</span>
        </div>
        <p className="figure figure-md mt-sm">
          <span className="pre">$</span>
          {amount(input.carPrice)}
        </p>
        <Slider
          label="Car price"
          value={input.carPrice}
          min={20000}
          max={150000}
          step={500}
          onChange={(carPrice) => {
            onSelectVehicle(null);
            update({ carPrice });
          }}
          marks={["$20k", "$85k", "$150k"]}
        />
        {/* Always shown, so it's clear the type changes the result. Switching a preset's type makes it a custom car. */}
        <div className="chip-row mt" role="group" aria-label="Vehicle type">
          {CUSTOM_TYPES.map((option) => (
            <button
              key={option.key}
              type="button"
              className={"chip" + (input.vehicleType === option.key ? " is-active" : "")}
              aria-pressed={input.vehicleType === option.key}
              onClick={() => {
                if (input.vehicleType === option.key) return;
                onSelectVehicle(null);
                update({ vehicleType: option.key });
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-sm mt-sm">Electric cars are exempt from fringe benefits tax, so they usually save more.</p>
      </div>

      <div className="bottom-bar">
        <button type="button" className="btn btn-primary btn-grow" onClick={onNext}>
          Continue <span className="arrow" aria-hidden>→</span>
        </button>
      </div>
    </>
  );
}

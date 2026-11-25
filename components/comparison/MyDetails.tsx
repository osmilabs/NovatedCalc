"use client";

import { useState } from "react";
import { LEASE_TERM_OPTIONS } from "@/lib/estimate";
import { amount, money } from "@/lib/format";
import type { CalculatorInput, VehicleType } from "@/lib/types";
import { VEHICLES } from "@/lib/vehicles";

const VEHICLE_TYPES: { key: VehicleType; label: string }[] = [
  { key: "ev", label: "Electric" },
  { key: "non-ev", label: "Petrol or hybrid" },
];

type Props = {
  input: CalculatorInput;
  vehicleId: string | null;
  update: (patch: Partial<CalculatorInput>) => void;
  onSelectVehicle: (id: string | null) => void;
};

function NumberRow({
  label,
  value,
  prefix,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="list-row">
      <span className="list-row-label">{label}</span>
      <label className="number-field">
        {prefix}
        <input
          type="number"
          inputMode="numeric"
          min={0}
          aria-label={label}
          value={value || ""}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        />
        {suffix}
      </label>
    </div>
  );
}

export function MyDetails({ input, vehicleId, update, onSelectVehicle }: Props) {
  const [editing, setEditing] = useState(false);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  const years = input.leaseTermMonths / 12;

  if (!editing) {
    return (
      <>
        <dl className="cmp-dl">
          <div>
            <dt>Car</dt>
            <dd>{vehicle ? `${vehicle.name} ${vehicle.trim}` : "Your car"}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>{money(input.carPrice)}</dd>
          </div>
          <div>
            <dt>Salary</dt>
            <dd>{money(input.salary)}</dd>
          </div>
          <div>
            <dt>Term</dt>
            <dd>
              {years} year{years === 1 ? "" : "s"}
            </dd>
          </div>
          <div>
            <dt>Distance</dt>
            <dd>{amount(input.kilometresPerYear)} km/yr</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{input.vehicleType === "ev" ? "Electric" : "Petrol or hybrid"}</dd>
          </div>
        </dl>
        <button type="button" className="btn btn-ghost btn-block cmp-edit" onClick={() => setEditing(true)}>
          Edit details
        </button>
      </>
    );
  }

  return (
    <div className="cmp-edit-form">
      <div className="cmp-group">
        <p className="cmp-group-k">Car</p>
        <div className="cmp-opts" role="group" aria-label="Car">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              type="button"
              className={"cmp-opt" + (v.id === vehicleId ? " is-on" : "")}
              aria-pressed={v.id === vehicleId}
              onClick={() => {
                onSelectVehicle(v.id);
                update({ carPrice: v.price, vehicleType: v.type });
              }}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <NumberRow
          label="Car price"
          prefix="$"
          value={input.carPrice}
          onChange={(carPrice) => {
            onSelectVehicle(null);
            update({ carPrice });
          }}
        />
        <NumberRow label="Salary before tax" prefix="$" value={input.salary} onChange={(salary) => update({ salary })} />
        <NumberRow
          label="Yearly distance"
          suffix=" km"
          value={input.kilometresPerYear}
          onChange={(kilometresPerYear) => update({ kilometresPerYear })}
        />
      </div>
      <div className="cmp-group">
        <p className="cmp-group-k">Lease term</p>
        <div className="cmp-opts" role="group" aria-label="Lease term">
          {LEASE_TERM_OPTIONS.map((term) => (
            <button
              key={term}
              type="button"
              className={"cmp-opt" + (input.leaseTermMonths === term ? " is-on" : "")}
              aria-pressed={input.leaseTermMonths === term}
              onClick={() => update({ leaseTermMonths: term })}
            >
              {term / 12} years
            </button>
          ))}
        </div>
      </div>
      <div className="cmp-group">
        <p className="cmp-group-k">Car type</p>
        <div className="cmp-opts" role="group" aria-label="Car type">
          {VEHICLE_TYPES.map((type) => (
            <button
              key={type.key}
              type="button"
              className={"cmp-opt" + (input.vehicleType === type.key ? " is-on" : "")}
              aria-pressed={input.vehicleType === type.key}
              onClick={() => update({ vehicleType: type.key })}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <button type="button" className="btn btn-primary btn-block cmp-edit" onClick={() => setEditing(false)}>
        Done
      </button>
    </div>
  );
}

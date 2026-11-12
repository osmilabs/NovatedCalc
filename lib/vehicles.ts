import type { CalculatorInput, VehicleType } from "@/lib/types";

export type VehiclePreset = {
  id: string;
  name: string;
  trim: string;
  spec: string;
  type: VehicleType;
  /** Indicative drive-away price in AUD. Review alongside the calculator assumptions. */
  price: number;
  /** Placeholder colour until we have vehicle images. */
  accent: string;
};

export const VEHICLES: VehiclePreset[] = [
  { id: "tesla-model-y", name: "Tesla Model Y", trim: "RWD", spec: "455 km range", type: "ev", price: 65400, accent: "#dc2626" },
  { id: "byd-atto-3", name: "BYD Atto 3", trim: "Extended", spec: "420 km range", type: "ev", price: 44999, accent: "#0ea5e9" },
  { id: "toyota-rav4", name: "Toyota RAV4", trim: "Hybrid GXL", spec: "4.8 L per 100km", type: "non-ev", price: 48990, accent: "#4a7470" },
  { id: "ford-ranger", name: "Ford Ranger", trim: "XLT 4x4", spec: "7.6 L per 100km", type: "non-ev", price: 67990, accent: "#1f2937" },
  { id: "kia-ev5", name: "Kia EV5", trim: "Air Std", spec: "400 km range", type: "ev", price: 56770, accent: "#84cc16" },
  { id: "toyota-hilux", name: "Toyota HiLux", trim: "SR5", spec: "8.0 L per 100km", type: "non-ev", price: 62500, accent: "#dc2626" },
];

export const DEFAULT_VEHICLE = VEHICLES[0];

/** Where the calculator and the provider comparison start. */
export const DEFAULT_INPUT: CalculatorInput = {
  salary: 120000,
  carPrice: DEFAULT_VEHICLE.price,
  leaseTermMonths: 48,
  kilometresPerYear: 15000,
  vehicleType: DEFAULT_VEHICLE.type,
};

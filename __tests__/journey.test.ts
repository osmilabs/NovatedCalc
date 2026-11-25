import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadJourney, saveJourney } from "../lib/journey";
import { defaultAssumptions } from "../lib/mock-data";
import { DEFAULT_INPUT } from "../lib/vehicles";

const journey = { input: { ...DEFAULT_INPUT, salary: 95000 }, vehicleId: "byd-atto-3", assumptions: defaultAssumptions };

beforeEach(() => {
  const store = new Map<string, string>();
  vi.stubGlobal("sessionStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
  });
});
afterEach(() => vi.unstubAllGlobals());

describe("journey", () => {
  it("round-trips the calculator's answers", () => {
    saveJourney(journey);
    expect(loadJourney()).toEqual(journey);
  });

  it("returns null when nothing was saved", () => {
    expect(loadJourney()).toBeNull();
  });

  it("ignores malformed or tampered data", () => {
    sessionStorage.setItem("novatedscout:journey:v1", JSON.stringify({ ...journey, input: { salary: "lots" } }));
    expect(loadJourney()).toBeNull();
    sessionStorage.setItem("novatedscout:journey:v1", "{not json");
    expect(loadJourney()).toBeNull();
  });

  it("returns null when storage is unavailable", () => {
    vi.stubGlobal("sessionStorage", undefined);
    expect(() => saveJourney(journey)).not.toThrow();
    expect(loadJourney()).toBeNull();
  });
});

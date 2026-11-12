import { describe, expect, it } from "vitest";
import { leadSchema, normalisePhone } from "../lib/leads";

const valid = {
  providerSlug: "alpha-fleet-australia",
  fullName: "Sam Citizen",
  email: "sam@example.com",
  phone: "0412 345 678",
  postcode: "4000",
  state: "QLD",
  consentAccepted: true,
  calculatorInput: { salary: 120000, carPrice: 65400, leaseTermMonths: 48, kilometresPerYear: 15000, vehicleType: "ev" },
};

describe("normalisePhone", () => {
  it.each([
    ["0412 345 678", "0412345678"],
    ["+61 412 345 678", "0412345678"],
    ["(07) 3123-4567", "0731234567"],
  ])("%s → %s", (raw, expected) => {
    expect(normalisePhone(raw)).toBe(expected);
  });
});

describe("leadSchema", () => {
  it("accepts a complete lead and normalises the phone", () => {
    expect(leadSchema.parse(valid).phone).toBe("0412345678");
  });

  it("requires consent", () => {
    expect(leadSchema.safeParse({ ...valid, consentAccepted: false }).success).toBe(false);
  });

  it.each([
    ["phone", "12345"],
    ["phone", ""],
    ["postcode", "400"],
    ["state", "XX"],
    ["email", "not-an-email"],
  ])("rejects a bad %s (%s)", (field, value) => {
    expect(leadSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
  });
});

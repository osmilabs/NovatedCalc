import { describe, expect, it } from "vitest";
import { signBody, SIGNATURE_TOLERANCE_SECONDS, verifySignature } from "../lib/webhook";

const secret = "whsec_test";
const body = JSON.stringify({ leadId: "abc123", provider: "alpha-fleet-australia" });
const now = 1_762_412_345;

describe("webhook signatures", () => {
  it("verifies a body signed with the same secret", () => {
    expect(verifySignature(secret, body, signBody(secret, body, now), now)).toBe(true);
  });

  it("rejects a different secret", () => {
    expect(verifySignature("whsec_other", body, signBody(secret, body, now), now)).toBe(false);
  });

  it("rejects a changed body", () => {
    const header = signBody(secret, body, now);
    expect(verifySignature(secret, body.replace("abc123", "abc124"), header, now)).toBe(false);
  });

  it("rejects a changed timestamp", () => {
    const header = signBody(secret, body, now).replace(`t=${now}`, `t=${now + 1}`);
    expect(verifySignature(secret, body, header, now)).toBe(false);
  });

  it("rejects an old signature", () => {
    const header = signBody(secret, body, now - SIGNATURE_TOLERANCE_SECONDS - 1);
    expect(verifySignature(secret, body, header, now)).toBe(false);
  });

  it.each([null, "", "garbage", "t=abc,v1=00", `t=${now}`])("rejects a malformed header (%s)", (header) => {
    expect(verifySignature(secret, body, header, now)).toBe(false);
  });
});

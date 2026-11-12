import { createHmac, timingSafeEqual } from "node:crypto";

export const SIGNATURE_HEADER = "X-NovatedCalc-Signature";

/** Signatures older than this are rejected, so a captured request can't be replayed later. */
export const SIGNATURE_TOLERANCE_SECONDS = 300;

function hmac(secret: string, timestamp: number, body: string) {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

/**
 * Header value for a webhook body, e.g. "t=1762412345,v1=5f2b…". The timestamp is signed with the body,
 * so neither can be changed without breaking the signature.
 */
export function signBody(secret: string, body: string, timestamp = Math.floor(Date.now() / 1000)) {
  return `t=${timestamp},v1=${hmac(secret, timestamp, body)}`;
}

/** What a provider runs on their side. Exported so the docs and tests use the same logic. */
export function verifySignature(
  secret: string,
  body: string,
  header: string | null,
  now = Math.floor(Date.now() / 1000),
) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((part) => part.split("=", 2) as [string, string]));
  const timestamp = Number(parts.t);
  if (!Number.isInteger(timestamp) || !parts.v1) return false;
  if (Math.abs(now - timestamp) > SIGNATURE_TOLERANCE_SECONDS) return false;

  const expected = Buffer.from(hmac(secret, timestamp, body), "hex");
  const given = Buffer.from(parts.v1, "hex");
  return expected.length === given.length && timingSafeEqual(expected, given);
}

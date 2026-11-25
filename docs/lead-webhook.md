# NovatedScout lead webhook

For providers receiving quote requests from NovatedScout.

Each lead is someone who compared providers on NovatedScout, chose yours, and asked for a quote. They ticked
a consent box that names your company only, and the lead goes to you alone.

## Request

`POST` to the URL you give us, with a JSON body.

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `X-NovatedScout-Signature` | `t=<unix seconds>,v1=<hex HMAC-SHA256>` |
| `X-NovatedScout-Lead-Id` | Same as `leadId` in the body. Use it to de-duplicate retries |

Reply with any `2xx` status within 8 seconds. Anything else counts as failed, and we forward the lead by hand.

```json
{
  "leadId": "r8x2k1m9q4w7z3p",
  "submittedAt": "2026-11-06T11:42:07.512Z",
  "provider": "your-slug",
  "contact": {
    "fullName": "Sam Citizen",
    "email": "sam@example.com",
    "phone": "0412345678",
    "postcode": "4000",
    "state": "QLD"
  },
  "vehicle": "Tesla Model Y RWD",
  "calculatorInput": {
    "salary": 120000,
    "carPrice": 65400,
    "leaseTermMonths": 48,
    "kilometresPerYear": 15000,
    "vehicleType": "ev"
  },
  "estimatedMonthlyCost": 1234.56,
  "consent": {
    "text": "Send my details and these figures to … so they can contact me about a quote. …",
    "version": "2026-11-06",
    "consentedAt": "2026-11-06T11:42:07.512Z",
    "pageUrl": "https://…/novated-lease-comparison/results",
    "exclusiveTo": "your-slug"
  }
}
```

`estimatedMonthlyCost` is our estimate, worked out from your published fees and rate. It is not a quote.

## Verifying a lead came from us

We share a secret with each provider separately. The signature is an HMAC-SHA256 of `<t>.<raw body>` using
that secret. Check it against the **raw** request body, before parsing the JSON, and reject anything older
than 5 minutes.

```js
import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyNovatedScout(secret, rawBody, header, now = Math.floor(Date.now() / 1000)) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=", 2)));
  const t = Number(parts.t);
  if (!Number.isInteger(t) || !parts.v1 || Math.abs(now - t) > 300) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex"), "hex");
  const given = Buffer.from(parts.v1, "hex");
  return expected.length === given.length && timingSafeEqual(expected, given);
}
```

## Consent records

For every lead we keep the exact consent wording, its version, the time, the page it was sent from, and the
browser and IP address it was sent from. Ask us for the record behind any `leadId`.

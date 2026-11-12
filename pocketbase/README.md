# PocketBase Setup
## Collections
Create these collections in PocketBase Admin UI:
1. `providers`
   - `name` (text, required)
   - `slug` (text, required, unique)
   - `product` (text, the lease product shown on the comparison card)
   - `interestRate` (number, published annual rate as a decimal, e.g. 0.0745; leave empty if quote-only)
   - `highlights` (json, array of short selling points)
   - `offer` (text, optional)
   - `states` (json, array of state codes)
   - `serviceModel` (select: broker/direct/hybrid)
   - `setupFee` (number)
   - `monthlyAdminFee` (number)
   - `inclusions` (json, array)
   - `responsivenessScore` (number)
   - `supportChannels` (json, array)
   - `affiliateLink` (url/text)
   - `outboundWebhookUrl` (url/text, optional; signed leads are POSTed here as JSON)
   - `outboundWebhookSecret` (text, optional; per-provider signing secret, e.g. from `openssl rand -hex 32`.
     Without it nothing is sent and leads are marked `manual`)
   - Hide both webhook fields from public API reads (the app reads them with the admin client), e.g. move
     public reads to a view collection that excludes them. See `docs/lead-webhook.md` for what providers receive.
   - `outboundEmail` (email, optional)
   - `summary` (text)
   - `active` (bool, default true)
2. `calculator_assumptions`
   - `gstRate` (number)
   - `adminFeeMonthly` (number)
   - `insuranceMonthly` (number)
   - `maintenanceMonthly` (number)
   - `evFbtDiscount` (number)
   - `fuelAndRunningRatePerKm` (number)
   - `registrationMonthly` (number)
   - `active` (bool)
3. `leads` (API rules: all empty/admin-only; the app writes with the admin client)
   - `providerSlug` (text, required)
   - `fullName` (text, required)
   - `email` (email, required)
   - `phone` (text, required, normalised to e.g. `0412345678`)
   - `postcode` (text, required)
   - `state` (text, required)
   - `vehicleName` (text)
   - `calculatorInput` (json)
   - `estimatedMonthlyCost` (number, recalculated on the server)
   - `consentText` (text, the exact wording the person agreed to)
   - `consentVersion` (text)
   - `consentedAt` (text, ISO timestamp)
   - `pageUrl` (text, the page the request was sent from)
   - `ipAddress` (text) and `userAgent` (text): consent evidence, kept here and not sent to providers.
     The privacy policy must say these are collected
   - `delivery` (select: pending/sent/failed/manual). `manual` and `failed` leads need forwarding by hand.
4. `seo_pages`
   - `slug` (text, required, unique)
   - `keyword` (text, required)
   - `title` (text, required)
   - `description` (text, required)
   - `hero` (text, required)
   - `body` (text, required)
   - `faq` (json, array)

## Seed Guidance
- Add 5-10 providers manually in `providers`.
- Add one active `calculator_assumptions` record.
- Add SEO records for:
  - `best-novated-lease-provider-australia`
  - `novated-lease-without-phone-number`
  - `novated-lease-brisbane`
  - `ev-novated-lease-comparison`
- If a collection is empty, the app falls back to local mock data.

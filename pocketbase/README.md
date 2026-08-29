# PocketBase Setup
## Collections
Create these collections in PocketBase Admin UI:
1. `providers`
   - `name` (text, required)
   - `slug` (text, required, unique)
   - `states` (json, array of state codes)
   - `serviceModel` (select: broker/direct/hybrid)
   - `setupFee` (number)
   - `monthlyAdminFee` (number)
   - `inclusions` (json, array)
   - `responsivenessScore` (number)
   - `supportChannels` (json, array)
   - `affiliateLink` (url/text)
   - `outboundWebhookUrl` (url/text, optional)
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
3. `seo_pages`
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

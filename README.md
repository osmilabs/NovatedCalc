# NovatedCalc MVP

Next.js + PocketBase MVP for Australian novated lease estimate and provider comparison.

## Stack

- Next.js App Router (server-rendered pages)
- PocketBase (manual provider CMS + assumptions + SEO content)
- TypeScript
- Vitest (smoke test for estimator)

## Local Setup

1. Install dependencies:
   - `pnpm install`
2. Copy env:
   - `cp .env.example .env.local`
3. Run app:
   - `pnpm dev`

In production, set `SITE_URL` to the public address (e.g. `https://example.com.au`). Canonical links,
`/sitemap.xml`, `/robots.txt` and structured data use it; without it they point at localhost.

## Core Routes

- `/` home
- `/how-novated-leasing-works`
- `/novated-lease-calculator` (4 steps: car, details, estimate, editable assumptions), ending at the
  comparison with the same answers. The step is in the URL (`?step=results`); the answers are shared
  both ways in `sessionStorage` (`lib/journey.ts`), never the URL
- `/novated-lease-comparison` (landing page)
- `/novated-lease-comparison/results` (noindex; needs a saved calculator journey, otherwise redirects to the calculator)
- `/providers/[slug]`
- `POST /api/leads` (quote requests: stored in PocketBase `leads`, then sent to the provider's webhook if set)
- `/best-novated-lease-provider-australia`
- `/novated-lease-without-phone-number`
- `/novated-lease-brisbane`
- `/ev-novated-lease-comparison`
- `/guides` and `/guides/[topic]` (long-form guides; add one in `lib/guides.ts` plus a page under `app/guides/`)
- `/sitemap.xml`, `/robots.txt`

## Design System

Tokens and component classes live in `app/globals.css`, ported from the
"Novated Lease Calculator" Claude Design project (teal + orange on white, Geist).
Shared React primitives are in `components/ui`. Rules the UI holds to:
no sign-up, contact details collected only when someone asks a provider for a quote (with
explicit consent naming that provider), an estimate disclaimer on every page, and
every calculator figure visible and editable.

## Analytics (Umami)

Traffic numbers for provider pitches come from a self-hosted [Umami](https://umami.is/docs) instance.
Analytics stays off until `UMAMI_SCRIPT_URL` and `UMAMI_WEBSITE_ID` are set.

1. Run Umami with Postgres, e.g. its Docker Compose setup, on the same box as PocketBase. Put it on its
   own subdomain behind HTTPS and change the default admin password.
2. Add a website in Umami for the production domain and copy its website ID.
3. Set `UMAMI_SCRIPT_URL` (`https://<umami-host>/script.js`), `UMAMI_WEBSITE_ID`, and `UMAMI_DOMAINS`
   (production hostname, so local and preview visits don't count).

Page views are automatic. Custom events, in funnel order:

| Event | When | Data |
| --- | --- | --- |
| `calculator_completed` | Calculator reaches the results step | `vehicleType` |
| `calculator_to_comparison` | "Compare providers" pressed on the results step | `vehicleType` |
| `quote_open` | "Get a quote" pressed on a provider card | `providerSlug` |
| `lead_submit` | Quote request saved | `providerSlug`, `state` |
| `affiliate_outbound_click` | A provider's affiliate link clicked | `providerSlug` |

Ad blockers hide some visitors from Umami, so the counts are a lower bound. For lead numbers, count the
PocketBase `leads` collection rather than `lead_submit`.

## PocketBase

Collection structure and seed guidance:
- `pocketbase/README.md`

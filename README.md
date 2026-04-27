# NovatedCalc MVP

Next.js + PocketBase MVP for Australian novated lease estimate and provider comparison.

## Stack

- Next.js App Router (server-rendered pages)
- PocketBase (manual provider CMS + lead storage)
- TypeScript
- Vitest (smoke test for estimator)

## Local Setup

1. Install dependencies:
   - `pnpm install`
2. Copy env:
   - `cp .env.example .env.local`
3. Run app:
   - `pnpm dev`

## Core Routes

- `/novated-lease-calculator`
- `/novated-lease-comparison`
- `/providers/[slug]`
- `/best-novated-lease-provider-australia`
- `/novated-lease-without-phone-number`
- `/novated-lease-brisbane`
- `/ev-novated-lease-comparison`

## PocketBase

Collection structure and seed guidance:
- `pocketbase/README.md`

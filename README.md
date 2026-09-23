# NY Tech TV Repair website

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4. A full rebuild of nytechtvrepair.com. Every business fact comes from the original site and lives in `src/content/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, PayPal return URL. Defaults to `https://nytechtvrepair.com`. |
| `RESEND_API_KEY` | Sends booking requests by email via [Resend](https://resend.com). Without it, dev logs requests to the console; production shows "please call". |
| `BOOKING_TO_EMAIL` | Where booking requests go. Defaults to `nytvrepair@optonline.net`. |
| `BOOKING_FROM_EMAIL` | A sender address verified in Resend. |

## Where things live

- `src/content/`: the single source of truth for business info, prices, booking options, terms, brands and ZIP codes. Change facts here, never in components.
- `src/app/`: pages. Legacy `.html` URLs redirect to the new routes (see `next.config.ts`).
- `src/app/api/book/route.ts`: booking endpoint (zod validation shared with the form, rate limit, honeypot, Resend email).
- `src/components/pay/PayPalForm.tsx`: PayPal Payments Standard, the same account and item formats as the original payment page.
- `public/data/models/*.json`: brand model lists imported from the original brand pages.
- `src/assets/images/`: photography (Unsplash License, see `CREDITS.md`).

## Scripts

| Script | What it does |
|---|---|
| `npm run verify:content` | Re-fetches the original site and checks every price, fee, phone number, booking option and brand against `src/content`. Also fails on any em/en dash in `src`. |
| `npm run scrape:models` | Re-imports brand model lists and brand facts from the original site. |
| `npm run build:map` | Regenerates the borough map paths from NYC borough boundaries. |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript. |

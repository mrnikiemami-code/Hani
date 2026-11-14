# Gate 9 — Frontend Launch Contract

- Gate: 9
- Status: PASSED (Core)
- Date: 2026-11-14
- Predecessor: Gate 8.1 PASSED (Core)

## 1. Goal

Deliver the first production-capable Next.js frontend for the Hani API-first
marketplace, with FA/EN/AR routing, RTL/LTR layout, and the core public pages
that map to the Hani BFF and module APIs.

## 2. Deliverables

| ID | Deliverable | Evidence |
|---|---|---|
| G9-01 | Next.js 16 / React 19 app | `frontend/package.json`, `next.config.ts` |
| G9-02 | Locale routing FA/EN/AR + RTL/LTR | `i18n/*`, `proxy.ts`, `messages/*` |
| G9-03 | API client and typed DTOs | `lib/api.ts`, `lib/types.ts` |
| G9-04 | Home page BFF | `app/[locale]/page.tsx` |
| G9-05 | Tours list/detail | `app/[locale]/tours/*` |
| G9-06 | Hotels list/detail | `app/[locale]/hotels/*` |
| G9-07 | Visa list/detail | `app/[locale]/visa/*` |
| G9-08 | Blog/Travelogue/Video pages | `app/[locale]/blog/*`, `itineraries/*`, `videos/*` |
| G9-09 | Agency directory/profile | `app/[locale]/agencies/*` |
| G9-10 | Author aggregate page | `app/[locale]/u/[username]` |
| G9-11 | Restaurants/Attractions | `app/[locale]/restaurants/*`, `attractions/*` |
| G9-12 | Flights metasearch page | `app/[locale]/flights` |
| G9-13 | Login entry page | `app/[locale]/auth/login` |
| G9-14 | Docker image + build | `frontend/Dockerfile`, `npm run build` |

## 3. Acceptance

- `npm run build` succeeds with TypeScript checks.
- `/fa`, `/en`, `/en/tours`, `/fa/hotels`, `/ar/visa`, `/en/agencies` return
  200 against the Hani API.
- All language lists come from `i18n/routing.ts`; no hard-coded locale fallback
  in page code.
- Public pages consume Hani APIs, not static fixtures.
- RTL is applied for FA/AR and LTR for EN.

## 4. External/deployment residuals

- Real PSP credentials and production checkout redirect.
- Real Flight Provider credentials/contract.
- Lastgram SSO and Competition ecosystem.
- Production CDN/DNS/TLS and secret distribution.
- Playwright E2E suite against a deployed environment (the core HTTP smoke
  was executed locally).

## 5. Verification

- `cd frontend; npm install; npm run build`
- HTTP smoke: `/fa`, `/en`, `/en/tours`, `/fa/hotels`, `/ar/visa`,
  `/en/agencies` => 200.
- Backend `scripts/verify.ps1` and `scripts/check-baseline.ps1` remain green.

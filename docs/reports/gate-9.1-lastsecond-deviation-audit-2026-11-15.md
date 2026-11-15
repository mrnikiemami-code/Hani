# Gate 9.1 — Lastsecond Deviation Audit & Phase Plan

- **Date:** 2026-11-15
- **Scope:** Frontend (`frontend/`) vs Lastsecond parity report
- **Reference:** `docs/reports/lastsecond-reaudit-post-gate8-2026-11-14.md`
- **Plan:** `docs/plan/GATE-9.1-EXECUTION-PLAN.md`
- **Design contract:** `docs/architecture/FRONTEND-DESIGN-CONSISTENCY.md`

---

## 1. Executive Summary

The template is now the application base and the main grids are API-bound, but
the current frontend still has **three structural deviations** from Lastsecond:

1. **Route shape is not Lastsecond-shaped.**
   Current canonical routes are template routes
   (`/tour/tour-grid`, `/hotel/hotel-grid`, `/visa/visa-grid`).
   Lastsecond uses `/tours`, `/hotels`, `/visa`, `/flights`, `/blog`,
   `/itineraries`, `/videos`, `/agencies`, `/u/{username}`, etc.

2. **Several Lastsecond pages do not exist yet.**
   Missing: restaurants, attractions, itineraries, videos, agencies, author,
   badges, blind-tour, safarsaz, advertisement, agency request, canonical
   sitemap/robots route.

3. **The template still contains dead duplicate component trees.**
   `src/core/common`, `src/core/redux`, `src/app/Providers.tsx`,
   `src/components/auth`, and `src/app/global.scss` are not part of the
   canonical path. They must be removed to prevent component drift.

Data binding is partially complete:

- Home BFF: partial (default home)
- Tour Grid: ✅ API
- Hotel Grid: ✅ API
- Visa Grid: ✅ API
- Blog Grid: ✅ API, but seed content is empty/corrupted
- Blog List/Detail: ⏳ mock
- Auth/Dashboards/Checkout: ⏳ mock

---

## 2. Route Parity Matrix

| Lastsecond route | Current route | Status |
|---|---|---|
| `/` | `/` | ✅ |
| `/tours` | `/tour/tour-grid` | ❌ shape mismatch |
| `/tours/installment-tours` | — | ❌ missing |
| `/tours/{slug}` | `/tour/tour-details?slug=` | ❌ shape mismatch |
| `/hotels` | `/hotel/hotel-grid` | ❌ shape mismatch |
| `/hotels/{slug}` | `/hotel/hotel-details?slug=` | ❌ shape mismatch |
| `/restaurants` | — | ❌ missing |
| `/restaurants/{slug}` | — | ❌ missing |
| `/attractions` | — | ❌ missing |
| `/attractions/{slug}` | — | ❌ missing |
| `/visa` | `/visa/visa-grid` | ❌ shape mismatch |
| `/visa/{country}` | `/visa/visa-details?slug=` | ❌ shape mismatch |
| `/flights` | `/flight/flight-grid` | ❌ shape mismatch |
| `/flights/{route}` | `/flight/flight-details` | ❌ shape mismatch |
| `/itineraries` | — | ❌ missing |
| `/itineraries/{slug}` | — | ❌ missing |
| `/blog` | `/blog/blog-grid` | ❌ shape mismatch |
| `/blog/{slug}` | `/blog/blog-details?slug=` | ❌ shape mismatch |
| `/videos` | — | ❌ missing |
| `/videos/{slug}` | — | ❌ missing |
| `/agencies` | — | ❌ missing |
| `/agencies/{slug}` | — | ❌ missing |
| `/u/{username}` | — | ❌ missing |
| `/badges/{username}` | — | ❌ missing |
| `/blind-tour` | — | ❌ missing |
| `/safarsaz` | — | ❌ missing |
| `/pages/aboutus` | `/pages/about-us` | ❌ shape mismatch |
| `/pages/advertisement` | — | ❌ missing |
| `/requests/agency/general-info` | `/become-an-expert` | ❌ shape mismatch |
| `sitemap.xml` / `robots.txt` | backend endpoints | ⚠️ no frontend route |

Extra template routes currently public:

- `/car/*`, `/cruise/*`, `/bus/*`, `/guide/*`, `/activity/*`
- These are outside the Hani MVP and must be feature-flagged or redirected.

---

## 3. Component Duplication Audit

| Duplicate area | Canonical tree | Dead/duplicate tree | Action |
|---|---|---|---|
| Header | `src/components/common-header` | `src/core/common/header` | remove dead |
| Footer | `src/components/common-footer` | `src/core/common/footer` | remove dead |
| Sidebar | `src/components/common-sidebar` | `src/core/common/sidebar` | remove dead |
| Modals | `src/components/modals` | `src/core/common/modal` | remove dead |
| Breadcrumb | `src/components/breadcrumb` | `src/core/common/Breadcrumb` | remove dead |
| Booking form | `src/components/booking` | `src/core/common/booking` | remove dead |
| Reviews | `src/components/reviews` | `src/core/common/reviews` | remove dead |
| Data table | `src/components/data-table` | `src/core/common/dataTable` | remove dead |
| Image helper | `src/components/image-with-base-path` | `src/core/common/imageWithBasePath` | remove dead |
| Auth components | `src/views/auth` | `src/components/auth` | remove dead |
| Redux store | `src/providers` + `src/redux` | `src/core/redux` + `src/app/Providers.tsx` | remove dead |
| Global SCSS | `src/app/globals.scss` | `src/app/global.scss` | remove dead |
| Mock data | `src/core/data` | `src/core/common/data` | remove dead |

Confirmed unused:

- `src/core/common/**` — no imports in `src`.
- `src/core/redux/**` — only used by unused `src/app/Providers.tsx`.
- `src/components/auth/**` — auth pages use `src/views/auth/**`.
- `src/app/Providers.tsx` — layout uses `src/providers/StoreProvider`.
- `src/app/global.scss` — layout imports `globals.scss`.

Keep:

- `src/core/data` — still used by template views (mock data until binding).
- `src/redux` — used by `src/providers`.
- `src/views` — canonical page view tree.
- `src/components` — canonical shared component tree.

---

## 4. Data Binding Status

| Area | Status | Note |
|---|---|---|
| Home BFF | Partial | default home only |
| Tour Grid | ✅ | Search API |
| Hotel Grid | ✅ | Hotel API |
| Visa Grid | ✅ | Visa API |
| Blog Grid | ✅ API | seed content empty/corrupted |
| Blog List/Detail | ⏳ | mock |
| Travelogue/Video | ⏳ | missing routes |
| Auth | ⏳ | template email/password |
| Traveler Dashboard | ⏳ | mock |
| Agency Dashboard | ⏳ | mock |
| Checkout | ⏳ | not connected |

---

## 5. Design Consistency Status

The new Hani home sections use template classes but are new compositions:

- `HaniTrendingTours`
- `HaniRecommendedVisas`
- `HaniLatestContent`

They must pass the visual review gate:

- same card radius/padding/shadow
- same typography scale
- same badge/price/meta hierarchy
- FA/EN/AR + RTL/LTR screenshots
- compared with the original template card

Known field/visual gaps:

- Tour `coverImageUrl` missing
- Hotel `priceFrom` missing
- Visa `coverImageUrl` missing
- Content author/reading time missing

---

## 6. Updated Phase Plan

### Phase C1 — Route Parity & Deduplication (P0)

Goal: Lastsecond-shaped URLs and one component tree.

1. Create canonical route wrappers:
   - `/[locale]/tours`
   - `/[locale]/tours/[slug]`
   - `/[locale]/hotels`
   - `/[locale]/hotels/[slug]`
   - `/[locale]/visa`
   - `/[locale]/visa/[slug]`
   - `/[locale]/flights`
   - `/[locale]/flights/[route]`
   - `/[locale]/blog`
   - `/[locale]/blog/[slug]`
2. Add missing Lastsecond routes:
   - restaurants, attractions, itineraries, videos, agencies,
     author, badges, blind-tour, safarsaz, advertisement, agency request.
3. Reuse existing `views` via thin server wrappers; do not duplicate components.
4. Redirect old template routes to canonical routes.
5. Remove dead duplicate trees listed in section 3.
6. Update `all_routes` and header nav to canonical paths.
7. Add sitemap/robots route handlers proxying Hani.

Acceptance:

- `/fa/tours`, `/fa/hotels`, `/fa/visa`, `/fa/flights`, `/fa/blog` return 200.
- Old template routes redirect.
- No duplicate header/footer/auth/redux trees.
- `npm run build` green.

### Phase C2 — Data Completion

- Blog List/Detail
- Travelogue/Video
- Remaining home variants
- Restaurants/Attractions
- Agencies/Author
- Missing fields: tour cover, hotel price, visa cover, author/reading time

### Phase C3 — Auth & Preferences

- OTP request/verify
- HttpOnly session
- Route guards
- User preferences
- Home experience persistence

### Phase C4 — Traveler Dashboard

- Orders, invoices, refunds, payments, reviews, wishlist, profile

### Phase C5 — Agency Dashboard

- Listings, offers, bookings, earnings, payouts, settings

### Phase C6 — Checkout/MoR

- Quote, hold, order, payment, invoice, refund, confirmation

### Phase C7 — Design & Quality Gate

- Visual review of Hani card compositions
- FA/EN/AR + RTL/LTR screenshots
- Playwright, axe, Lighthouse
- Translation editorial pass

---

## 7. Immediate Next Actions

1. **C1.1** Remove dead duplicate trees:
   - `src/core/common/**`
   - `src/core/redux/**`
   - `src/app/Providers.tsx`
   - `src/components/auth/**`
   - `src/app/global.scss`
2. **C1.2** Add canonical Lastsecond route wrappers for tours/hotels/visa/flights/blog.
3. **C1.3** Redirect old template routes.
4. **C1.4** Update `all_routes` and header nav.
5. **C1.5** Build + route smoke + visual checkpoint.

---

## 8. Summary for Stakeholders

- **Done:** template base, 12 home experiences, FA/EN/AR, RTL/LTR, Tour/Hotel/Visa API grids, Home BFF partial, Blog Grid API.
- **Main deviation:** Lastsecond URL shape and missing pages.
- **Clean architecture risk:** dead duplicate component/redux trees.
- **Next phase:** C1 route parity and deduplication, then C2 data completion, then auth/dashboards/checkout.
- **Translation:** usable, editorial pass later; not blocking.

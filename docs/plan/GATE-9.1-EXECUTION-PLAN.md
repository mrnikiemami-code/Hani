# Gate 9.1 — Execution Plan (Data, Auth, Dashboards, Checkout)

- **Status:** Planned — next execution stream
- **Date:** 2026-11-15
- **Base:** Dreamstour template inside `frontend/`
- **Current gate:** Gate 9.1 — Template-First Integration
- **Related:** `GATE-9.1-CONTRACT.md`, `LASTSECOND-SIMULATION-MAP.md`, `../architecture/FRONTEND-ARCHITECTURE.md`

---

## 1. Current State

Already done:

- Dreamstour template is the application base.
- One app tree: `(public-pages)` + `(auth-pages)`.
- 12 Home Experiences mapped to real template views.
- FA/EN/AR routing + RTL/LTR + locale fonts.
- 2,890 template copy strings externalized for FA/AR.
- Tour Grid → Hani Search API.
- Hotel Grid → Hani Hotel API.
- Visa Grid → Hani Visa API.
- Settings → Hani API health + Home Experience cookie.
- Backend Search DTO extended with:
  `destinationNames`, `averageRating`, `reviewCount`, `agencyName`,
  `nextDepartureDate`.
- 190 backend tests green; frontend build green; baseline check green.

Not done yet:

- Home content is still template mock data.
- Blog/Travelogue/Video pages are still template mock data.
- Auth is still template email/password.
- Dashboards are still mock data.
- Checkout is not connected.
- Several backend fields are still missing:
  tour cover image, hotel price from, visa cover, content author/cover.
- Translation quality needs an editorial pass (not blocking).

---

## 2. Principles

1. Use template pages/components; patch them in place.
2. Frontend never owns price/availability/payment state.
3. Every API field must exist in DTO + OpenAPI before UI use.
4. Every page gets loading/empty/error/unauthorized states.
5. No new visual language.
6. Translation is parallel, not blocking.
7. Each sprint ends with a visual checkpoint and a green build.

---

## 3. Workstreams

### A. Home BFF Data Binding

Goal: Home sections read real Hani data instead of template mock arrays.

Backend:

- Reuse `GET /market/v1/home` (`HomeFeedDto`).
- Add hero/section metadata only if the template needs it:
  - `hero` (title, subtitle, media, CTA)
  - `trustStats`
  - `featuredDestinations`
  - `seo`
- Keep `tours`, `visas`, `travelogues`, `blog`, `campaigns`.

Frontend:

- `src/features/home-experience/application/home-feed.ts`
  — server fetch + typed ViewModel.
- `src/features/home-experience/ui/HomeFeedProvider.tsx`
  — React context for template sections.
- `src/features/home-experience/ui/HaniHomeSections.tsx`
  — template-styled sections:
  - featured tours
  - visas
  - travelogues/blog
  - campaigns
- Patch the default home experience first:
  `src/views/home-service-one/homeServiceOne.tsx`
- Then patch remaining home views one at a time:
  `homeServiceTwo`, `homeOne` ... `homeTwelve`.

Acceptance:

- Home tour cards show API titles/prices/destinations.
- Home visa cards show API countries/prices.
- Home editorial cards show API blog/travelogue data.
- Empty/error state appears if API is down.
- No template mock array is used in patched sections.

### B. Content API Binding

Goal: Blog/Travelogue/Video pages use Hani Content APIs.

Backend:

- Reuse:
  - `/market/v1/content/blog`
  - `/market/v1/content/blog/{slug}`
  - `/market/v1/content/blog/{slug}/related`
  - `/market/v1/content/travelogues`
  - `/market/v1/content/videos`
- Add content author summary fields if needed:
  - `author` (name, username, avatar)
  - `readingTimeMinutes`
  - `coverImageUrl` already exists on summaries; confirm detail.

Frontend:

- `src/features/content/infrastructure/content-api.ts`
- Patch:
  - `views/blog/blog-grid`
  - `views/blog/blog-list`
  - `views/blog/blog-details`
- Add Hani routes for Travelogue/Video using template blog card/detail styling:
  - `/[locale]/travelogues`
  - `/[locale]/travelogues/[slug]`
  - `/[locale]/videos`
  - `/[locale]/videos/[slug]`
- Add comments/likes only after auth exists; show disabled state before that.

Acceptance:

- Blog cards use API title/excerpt/cover/date.
- Blog detail uses API body/author/related.
- Travelogue/video pages use API data.
- JSON-LD still works.

### C. OTP Auth + Session

Goal: Replace template email/password auth with Hani OTP.

Backend:

- Reuse:
  - `POST /market/v1/auth/otp/request`
  - `POST /market/v1/auth/otp/verify`
- Add if missing:
  - `POST /market/v1/auth/logout`
  - `GET /market/v1/me/profile`
  - `GET/PUT /market/v1/me/preferences`

Frontend:

- Create:
  - `src/features/auth/infrastructure/auth-api.ts`
  - `src/features/auth/application/session.ts`
  - `src/app/[locale]/(auth-pages)/login` patched to OTP
  - `src/app/[locale]/(auth-pages)/verify`
  - `src/app/api/auth/session/route.ts` (sets HttpOnly cookies)
  - `src/app/api/auth/logout/route.ts`
- Store access/refresh tokens in HttpOnly, Secure, SameSite cookies.
- Add route guards in `src/proxy.ts` for:
  - `/[locale]/user/**`
  - `/[locale]/agent/**`
  - `/[locale]/checkout/**`
- Keep Lastgram SSO feature-flagged.

Acceptance:

- OTP request/verify works.
- Session survives refresh.
- Logout clears cookies.
- Unauthorized redirects to login.
- No token in localStorage.

### D. Preferences + Home Experience Persistence

Goal: Home selection persists for authenticated users, not only cookie.

Backend:

- Add `UserPreferences`:
  - `UserId`
  - `HomeExperienceId`
  - `Locale`
  - `Currency`
  - `Theme`
  - `ReducedMotion`
  - `UpdatedAt`
- Add endpoints:
  - `GET /market/v1/me/preferences`
  - `PUT /market/v1/me/preferences`
- Add migration and tests.
- Validate `HomeExperienceId` against server registry.

Frontend:

- Settings page:
  - authenticated → API
  - anonymous → signed cookie
- Precedence:
  user → cookie → agency default → experiment → default.

Acceptance:

- Selection persists across login.
- Invalid ID falls back safely.
- FA/AR/EN and theme preferences persist.

### E. Traveler Dashboard

Goal: Replace mock traveler dashboard with real Hani data.

Backend list endpoints needed:

- `GET /market/v1/orders?page=...`
- `GET /market/v1/invoices?page=...`
- `GET /market/v1/refunds?page=...`
- `GET /market/v1/payments?page=...`
- `GET /market/v1/me/reviews?page=...`
- `GET/PUT /market/v1/me/profile`
- `GET /market/v1/wishlist`
- `POST/DELETE /market/v1/wishlist/{productId}`

Frontend:

- Patch template dashboards:
  - `user/dashboard`
  - `customer-all-bookings`
  - `customer-invoices`
  - `customer-cancellation-refunds`
  - `payment`
  - `review`
  - `wallet`
  - `wishlist`
  - `my-profile`
  - `notification`
- Use server components for initial data + client tables for filters.

Acceptance:

- Dashboard counts come from API.
- Bookings/invoices/refunds lists are real.
- Unauthorized state works.
- Empty state works.

### F. Agency Dashboard

Goal: Connect template agency pages to Hani supplier/channel APIs.

Backend:

- Reuse:
  - channel dashboard
  - supplier offers/departures
  - reservations
  - settlements/payouts
- Add list endpoints if missing.

Frontend:

- Patch:
  - `agent-dashboard`
  - `agent-listings`
  - `agent-tour-booking`
  - `agent-earnings`
  - `agent-payment-history`
  - `agent-settings`

Acceptance:

- Agency sees only its own data.
- Role guard works.
- Settlement/payout totals are real.

### G. Checkout + Hani MoR

Goal: Wire template checkout/booking pages to Hani quote/hold/order/payment.

Backend:

- Reuse:
  - quotes
  - holds
  - orders
  - payment intents
  - invoices
  - refunds
- Ensure public list/detail endpoints exist for traveler.

Frontend:

- Create Hani checkout flow inside template shell:
  - `/[locale]/checkout/[productId]`
  - `/[locale]/checkout/review`
  - `/[locale]/checkout/payment`
  - `/[locale]/checkout/confirmation`
- Price/tax/availability always from API.
- Payment callback reconciliation.
- Invoice/refund states.

Acceptance:

- Sandbox payment completes.
- Order status updates.
- Invoice/refund visible in traveler dashboard.
- No client-side final price.

### H. Missing Fields

Backend additions:

| Field | Entity/DTO | Why |
|---|---|---|
| `coverImageUrl` | TourProduct / ProductSearchItemDto | tour card image |
| `priceFrom` | HotelSummaryDto | hotel card price |
| `coverImageUrl` | VisaCountryDto | visa card image |
| `author` | Blog/Travelogue/Video summary | byline |
| `readingTimeMinutes` | Blog/Travelogue summary | card/detail |
| `processingTime` | Visa summary | card/detail |

Every change includes:

- DTO
- OpenAPI
- migration if persisted
- test
- frontend mapper/card update

### I. Translation Editorial Pass (non-blocking)

- Review machine translations of:
  - Home
  - Tour/Hotel/Visa
  - Auth
  - Dashboard
- Add glossary:
  - Tour, Hotel, Flight, Visa, Booking, Offer, Review, Wishlist
- Keep brands/codes untranslated.
- Add missing-key check in CI.

---

## 4. Priority Correction ? Route Parity First

The Lastsecond deviation audit found a P0 gap:

- canonical URLs are not Lastsecond-shaped;
- several Lastsecond pages are missing;
- dead duplicate component trees remain.

Therefore, **Phase C1 (Route Parity & Deduplication)** runs before the
remaining data binding. See
[`../reports/gate-9.1-lastsecond-deviation-audit-2026-11-15.md`](../reports/gate-9.1-lastsecond-deviation-audit-2026-11-15.md).

## 5. Sprint Order

### Sprint D1 — Data Foundation

1. Home BFF default home binding.
2. Blog Grid/List/Details API binding.
3. Missing fields: tour cover, hotel price, visa cover.
4. Visual checkpoint.

### Sprint D2 — Auth and Preferences

1. OTP request/verify.
2. HttpOnly session.
3. Logout + route guards.
4. Preferences API.
5. Home Experience persistence.
6. Visual checkpoint.

### Sprint D3 — Traveler Dashboard

1. Orders/invoices/refunds/payments lists.
2. Profile/preferences.
3. Reviews/wishlist.
4. Visual checkpoint.

### Sprint D4 — Agency Dashboard

1. Listings/offers.
2. Bookings.
3. Earnings/payouts.
4. Settings.
5. Visual checkpoint.

### Sprint D5 — Checkout/MoR

1. Quote/hold.
2. Order.
3. Payment.
4. Invoice/refund.
5. Visual checkpoint.

### Sprint D6 — Hardening

1. E2E Playwright.
2. axe/Lighthouse.
3. RTL visual tests.
4. Translation editorial pass.
5. Documentation.

---

## 5. Test Gates

Every sprint:

- `dotnet build`
- `dotnet test`
- `scripts/check-baseline.ps1`
- `cd frontend; npm run build`
- FA/EN/AR smoke
- RTL screenshot
- API error/empty state
- unauthorized state where applicable

---

## 6. Immediate Next Actions

1. Implement Home BFF binding for `home-service-one` (default experience).
2. Implement Content API adapters for Blog Grid/List/Details.
3. Add tour `coverImageUrl` and hotel `priceFrom` fields.
4. Build and produce visual checkpoint.
5. Then move to OTP Auth.

---

## 7. Definition of Done

A task is done only when:

- It uses the template visual components.
- It uses real Hani API or a documented contract.
- DTO + OpenAPI are updated.
- FA/EN/AR and RTL are verified.
- Loading/empty/error/unauthorized states exist.
- Tests/build/baseline are green.
- Docs and visual preview are updated.

# Gate 9.1 — Template Integration & Lastsecond Simulation

- **Status:** In Progress — Home Experience Registry + i18n/RTL
- **Date:** 2026-11-15
- **Predecessor:** Gate 9 PASSED (Core)
- **Architecture:** [`docs/architecture/FRONTEND-ARCHITECTURE.md`](../architecture/FRONTEND-ARCHITECTURE.md)
- **Mandatory i18n/RTL contract:** [`docs/architecture/FRONTEND-I18N-RTL.md`](../architecture/FRONTEND-I18N-RTL.md)
- **Parity map:** [`LASTSECOND-SIMULATION-MAP.md`](LASTSECOND-SIMULATION-MAP.md)

---

## 1. Goal

Use the purchased Dreamstour template as the **actual frontend base** and the
single visual source of truth, while:

- retaining all 12 home experiences as user-selectable layouts mapped to the
  template's real home views;
- delivering Lastsecond-equivalent public pages using template pages;
- connecting template pages to real Hani APIs;
- adding missing backend fields and rendering them through template cards,
  forms, and tables;
- enforcing clean architecture, FA/EN/AR, and RTL;
- keeping the UI consistent and accessible.

This gate is **not** a redesign and **not** a parallel Hani design system. It is
a controlled integration of the purchased template with Hani platform code.

---

## 2. Scope

### In scope

- Frontend architecture cleanup
- Home Experience Registry + settings, mapped to real template home views
- Template integration and defect patching (no parallel design system)
- i18n/RTL foundation applied to template layout and styles
- Public Lastsecond simulation pages using template pages
- OTP auth UI
- Traveler dashboard subset
- Agency dashboard subset
- Checkout/MoR UI
- SEO, accessibility, performance, tests
- Backend contract additions required by the UI

### Out of scope

- Car/cruise/bus/guide/activity MVP verticals
- Lastgram production SSO (external)
- Real PSP/Flight-provider credentials (external)
- Admin back-office UI
- Native mobile apps

---

## 3. Current Progress

- Dreamstour template copied into `frontend` as the application base.
- One app tree kept: `(public-pages)` + `(auth-pages)`.
- Duplicate route trees removed: `(feature-module)`, `(auth)`, root
  `index-10`/`index-12`.
- Duplicate component tree `src/components/pages` removed; `src/views` is the
  active page view tree.
- `npm run build` green: 554 static pages, 184 routes × 3 locales.
- All 12 Home Experiences mapped to actual template views:
  `@/views/home-service-one/homeServiceOne` ... `@/views/home-twelve/homeTwelve`.
- Home route `/[locale]` resolves the selected experience and lazy-loads the
  real template view.
- Settings page `/[locale]/settings/experience` lets the user select a variant.
- Anonymous selection persisted in the `hani_home_experience` cookie.
- Language Switcher (FA/EN/AR) preserves path and query.
- `html lang` / `dir` is server-side; `fa`/`ar` are RTL, `en` is LTR.
- Locale fonts: Vazirmatn (FA), Noto Kufi Arabic (AR), Inter (EN).
- Metadata alternates/hreflang added at locale layout level.
- `/` redirects to `/fa`.
- Header/footer duplication on home fixed; home has one header and one footer.
- Settings page performs a server-side Hani API health call and shows
  connected/unavailable status.
- RTL/LTR smoke verified for home, tour grid, visa grid, and settings.

> **Next:** template hard-coded copy → FA/AR message catalogs; template pages
> → Hani API adapters; missing fields → DTO/OpenAPI + template cards/forms.

## 4. Phase Plan

### Phase 0 — Template Freeze and Build Cleanup

Deliverables:

- Copy the template Next.js app into `frontend` as the application base.
- Freeze one template app tree; delete the duplicate route tree.
- Delete duplicate header/footer/page component trees.
- No `output: "export"` for the Hani app.
- No `basePath=/nextjs` in production.
- `frontend/` builds with `npm run build`.
- Hani integration skeleton inside the template tree:
  `src/features`, `src/lib/hani`, `src/i18n`, `src/messages`.
- Template assets remain in `public/assets`; template SCSS remains in
  `src/style`.
- No imports from `reference/`.

Exit criteria:

- `npm run build` green.
- `npm run lint` green.
- No duplicate routes.
- No demo-only pages in the production route table.
- Template visual components remain the base.

### Phase 1 — Home Experience Registry and Settings

Deliverables:

- `HOME_EXPERIENCE_IDS` registry with all 12 layouts.
- Registry loaders point to actual template views:
  `@/views/home-service-one/homeServiceOne` ... `@/views/home-twelve/homeTwelve`.
- `resolveHomeExperience` precedence function.
- `/[locale]/settings/experience` page, styled with template components.
- Anonymous cookie persistence.
- `GET/PUT /market/v1/me/preferences` backend endpoint.
- Agency/channel default home experience field.
- Analytics event `home_experience_view`.

Exit criteria:

- All 12 template home views render.
- User can switch and persist selection.
- Unknown ID falls back safely.
- Only selected experience is in the initial bundle.
- FA/EN/AR + RTL verified for each experience.
- No custom `HomeExperienceFrame` remains in the final path.

### Phase 2 — Design System and UI Standard

Deliverables:

- Tokens: color, typography, spacing, radius, shadow, z-index, breakpoints.
- Fonts: Vazirmatn, Noto Kufi Arabic, Inter.
- Primitives: Button, Input, Select, DatePicker, Card, Badge, Tabs,
  Pagination, Breadcrumb, Modal, Drawer, Toast, Skeleton, EmptyState,
  ErrorState, DataTable.
- Page shell and page header pattern.
- RTL logical-property migration for shared components.
- Storybook or component gallery.
- Axe/visual checks.

Exit criteria:

- No raw color/spacing values in feature components.
- All primitives have RTL and mobile examples.
- Keyboard focus and axe checks pass.

### Phase 3 — Lastsecond Public Simulation

Deliverables:

- Home (12 experiences)
- Tours search/list/detail/compare
- Hotels list/detail/hotel-tours
- Flights search/detail + deep link
- Visa list/detail/application/tracking
- Restaurants/Attractions list/detail/reservation
- Destinations landing
- Blog/Travelogue/Video
- Agencies directory/profile
- Author profile
- Reviews criteria and review list
- Static: about, contact, FAQ, terms, privacy, trust
- Global search
- Campaigns/newsletter entry points

Exit criteria:

- Pages use Hani APIs only.
- No mock data in production.
- All public pages have metadata/hreflang/JSON-LD.
- Lastsecond page matrix is green except explicitly external items.

### Phase 4 — Auth and Dashboards

Deliverables:

- OTP request/verify UI
- HttpOnly cookie session
- Route guards
- Traveler dashboard: orders, payments, invoices, refunds, installments,
  reviews, wishlist, profile, notifications, settings
- Agency dashboard: onboarding, offers/departures, bookings, settlements,
  payouts, cancellation, reviews, settings
- RBAC and unauthorized states

Exit criteria:

- OTP flow works end-to-end.
- No token in localStorage.
- Dashboard API calls are scoped to the authenticated user/agency.
- Role-based route protection verified.

### Phase 5 — Checkout and Hani MoR

Deliverables:

- Quote -> Hold -> Order
- Payment Intent and redirect/callback
- Installments
- Invoice and PDF link
- Refund/cancellation request
- Price breakdown and taxes/fees
- Idempotency and retry states
- Payment failure/expiry states

Exit criteria:

- Test payment flow completes in sandbox.
- Webhook/callback state is reflected in UI.
- Invoice/refund states are consistent.
- No client-side price calculation as source of truth.

### Phase 6 — Quality and Release

Deliverables:

- Playwright E2E
- axe accessibility
- Lighthouse/bundle budget
- Visual regression for FA/AR
- Error boundaries and observability
- Deployment configuration
- Runbook

Exit criteria:

- `npm run build`, `npm run lint`, E2E, axe, and visual tests pass.
- Core Web Vitals budgets met.
- Production deployment checklist signed.

---

## 5. Backend Field Gap Backlog

The frontend must not invent fields. The following additions are required or
must be confirmed in OpenAPI before UI implementation.

### 4.1. Home and Discovery

| DTO | Missing field | Why |
|---|---|---|
| `HomeFeedDto` | `hero` | localized hero media/CTA |
| `HomeFeedDto` | `sections[]` | ordered home sections |
| `HomeFeedDto` | `trustStats` | social proof |
| `HomeFeedDto` | `featuredDestinations` | destination discovery |
| `HomeFeedDto` | `editorial` | blog/travelogue/video block |
| `HomeFeedDto` | `seo` | metadata/JSON-LD |
| `ProductSearchItemDto` | `coverImageUrl` | card image |
| `ProductSearchItemDto` | `destinationNames` | localized card location |
| `ProductSearchItemDto` | `averageRating`, `reviewCount` | trust |
| `ProductSearchItemDto` | `agencyName`, `agencySlug` | multi-agency display |
| `ProductSearchItemDto` | `nextDepartureDate`, `availableSeats` | urgency/availability |
| `ProductSearchItemDto` | `originalPrice`, `discountPercent` | pricing |
| `ProductSearchItemDto` | `badges[]` | instant confirm, bestseller, etc. |
| `ProductSearchItemDto` | `cancellationPolicySummary` | decision support |
| `ProductSearchItemDto` | `isWishlisted` | authenticated wishlist |

### 4.2. Tour Detail

| DTO | Missing field | Why |
|---|---|---|
| `ProductComparisonDto` | `gallery[]` | detail gallery |
| `ProductComparisonDto` | `highlights[]` | overview |
| `ProductComparisonDto` | `included[]`, `excluded[]` | package clarity |
| `ProductComparisonDto` | `itineraryDays[]` | day-by-day plan |
| `ProductComparisonDto` | `meetingPoint` | logistics |
| `ProductComparisonDto` | `cancellationPolicy` | policy |
| `ProductComparisonDto` | `agencyRating` | trust |
| `ProductComparisonDto` | `reviewsSummary` | rating breakdown |
| `ProductComparisonDto` | `availability` | departure availability |

### 4.3. Hotel

| DTO | Missing field | Why |
|---|---|---|
| `HotelSummaryDto` | `coverImageUrl` | card image |
| `HotelSummaryDto` | `cityName`, `countryName` | location |
| `HotelSummaryDto` | `priceFrom`, `currency` | pricing |
| `HotelSummaryDto` | `amenitiesPreview[]` | card amenities |
| `HotelSummaryDto` | `offersCount` | multi-agency offers |
| `HotelSummaryDto` | `isWishlisted` | wishlist |
| `HotelDto` | `policies` | check-in/out, cancellation |
| `HotelDto` | `reviewsSummary` | rating breakdown |
| `HotelDto` | `offers[]` | agency offers |
| `HotelDto` | `taxesAndFees` | price clarity |

### 4.4. Visa

| DTO | Missing field | Why |
|---|---|---|
| `VisaCountryDto` | `coverImageUrl` | destination card |
| `VisaCountryDto` | `minPrice`, `currency` | pricing |
| `VisaCountryDto` | `processingTime` | decision support |
| `VisaCountryDto` | `stayDays` | eligibility |
| `VisaCountryDto` | `embassy` | logistics |
| `VisaCountryDto` | `eligibility` | qualification |
| `VisaTypeDto` | `requiredDocuments` | already present, confirm shape |
| `VisaApplicationDto` | `status`, `timeline`, `trackingCode` | tracking |
| `VisaApplicationDto` | `appointment` | appointment info |

### 4.5. Flight

| DTO | Missing field | Why |
|---|---|---|
| `FlightOfferDto` | `airlineLogoUrl` | card branding |
| `FlightOfferDto` | `originAirportName`, `destinationAirportName` | clarity |
| `FlightOfferDto` | `arrivalDate` | overnight flights |
| `FlightOfferDto` | `refundable` | fare rules |
| `FlightOfferDto` | `seatsLeft` | urgency |
| `FlightOfferDto` | `providerLogoUrl` | metasearch provider |
| `FlightOfferDto` | `deepLink` | already present, confirm |

### 4.6. Content and UGC

| DTO | Missing field | Why |
|---|---|---|
| `BlogSummaryDto` | `author`, `readingTime`, `tags` | card/detail |
| `BlogDetailDto` | `gallery`, `related`, `comments` | detail |
| `TravelogueSummaryDto` | `author`, `destinationNames`, `readingTime` | card |
| `TravelogueDetailDto` | `gallery`, `comments` | detail |
| `VideoSummaryDto` | `author`, `tags`, `thumbnail` | card |
| `VideoDetailDto` | `related`, `comments` | detail |
| `ReviewCriteriaSummaryDto` | `labels` | localized criteria |

### 4.7. Agency and Author

| DTO | Missing field | Why |
|---|---|---|
| `PublicAgencyDto` | `logoUrl`, `coverUrl`, `gallery` | profile |
| `PublicAgencyDto` | `socialLinks` | profile |
| `PublicAgencyDto` | `responseTime` | trust |
| `PublicAgencyDto` | `certifications` | trust |
| `PublicAgencyDto` | `reviewSummary` | trust |
| `AuthorDto` | `coverUrl`, `followersCount` | profile |
| `AuthorDto` | `content[]` | authored items |
| `AuthorProfileDto` | `seo` | author SEO |

### 4.8. User, Orders, Payments

| DTO | Missing field | Why |
|---|---|---|
| `UserProfileDto` | `avatarUrl`, `email`, `locale`, `currency` | profile/settings |
| `UserPreferencesDto` | `homeExperienceId`, `theme`, `reducedMotion` | settings |
| `OrderListDto` | list endpoint and summary fields | dashboard |
| `InvoiceListDto` | list endpoint and PDF URL | dashboard |
| `RefundListDto` | public list endpoint | dashboard |
| `PaymentListDto` | public list endpoint | dashboard |
| `QuoteDto` | `priceBreakdown`, `expiresAt`, `cancellationPolicy` | checkout |
| `OrderDto` | `paymentStatus`, `items`, `total`, `currency` | checkout |
| `PaymentIntentDto` | `redirectUrl`, `status`, `expiresAt` | payment |
| `InvoiceDto` | `lineItems`, `tax`, `pdfUrl` | invoice |
| `RefundDto` | `reason`, `status`, `processedAt` | refunds |

### 4.9. Agency

| DTO | Missing field | Why |
|---|---|---|
| `AgencyDashboardDto` | `metrics`, `recentBookings`, `alerts` | dashboard |
| `OfferDto` | `coverImageUrl`, `availability`, `status` | agency listings |
| `SettlementDto` | `status`, `dueDate`, `amount`, `reference` | payouts |
| `AgencyPreferencesDto` | `defaultHomeExperienceId` | channel default |

**Rule:** every field above must be added to the DTO and OpenAPI in the same
change. The frontend then regenerates types and maps to ViewModels.

---

## 6. Acceptance Criteria

Gate 9.1 is PASSED (Core) only when:

- [ ] One frontend application tree builds successfully.
- [ ] All 12 home experiences are available in settings.
- [ ] Home experience selection persists for anonymous and authenticated users.
- [ ] Public pages use real Hani APIs.
- [ ] Farsi/English/Arabic routes work.
- [ ] RTL visual tests pass for FA and AR.
- [ ] Every shared component is verified in FA/EN/AR and RTL/LTR.
- [ ] Every public page has localized metadata and hreflang.
- [ ] Public pages have canonical, hreflang, and JSON-LD.
- [ ] OTP login works with HttpOnly cookies.
- [ ] Traveler and agency dashboards are role-scoped.
- [ ] Checkout sandbox flow completes.
- [ ] Missing fields are present in DTO + OpenAPI + generated frontend types.
- [ ] `npm run build`, `npm run lint`, E2E, axe pass.
- [ ] No mock data in production.
- [ ] Documentation is updated.

---

## 7. Key Risks

| Risk | Mitigation |
|---|---|
| Duplicate route/UI trees | Freeze one template tree and delete the duplicate |
| Building a parallel design system | Template is the only visual source; wrappers are thin |
| 12 home variants causing bundle bloat | lazy load actual template views + registry |
| Home variant hydration mismatch | resolve on server, pass ID |
| RTL regressions | patch template CSS with logical properties + visual tests |
| Field drift between frontend/backend | generated OpenAPI types |
| Fake checkout behavior | server is price/state authority |
| Dashboard scope explosion | MVP subset, hide unsupported pages |
| Template legacy Bootstrap/SCSS | keep template `src/style` as canonical |

---

## 8. Immediate Next Actions

1. Approve the template-first architecture in
   [`FRONTEND-ARCHITECTURE.md`](../architecture/FRONTEND-ARCHITECTURE.md).
2. Freeze the base application tree from the template.
3. Approve the 12 Home Experience IDs and default.
4. Approve the preference API and DTO additions.
5. Start Phase 0: build cleanup and template integration skeleton.

# Hani — STATUS (وضعیت زنده)

> **تاریخ:** ۲۴ آبان ۱۴۰۵
> **فاز فعال:** Gate 9.1 — Template-First Integration (IN_PROGRESS — C7 quality + mock dashboard widgets)
> **آخرین commit کد:** `b3021be`
> **وضعیت Gate:** Gate 1 ✅ / Gate 2 ✅ / Gate 3 ✅ / Gate 4 ✅ Remediated / Gate 5 ✅ PASSED / Gate 5.1 ✅ PASSED / Gate 6 ✅ PASSED / Gate 7 ✅ PASSED (Core) / Gate 8 ✅ PASSED (Core) / Gate 8.1 ✅ PASSED (Core) / Gate 9 ✅ PASSED (Core) / Gate 9.1 ⏳ In Progress
> **Baseline:** [`BASELINE.md`](BASELINE.md) + [`baseline.json`](baseline.json)
> **قرارداد فاز:** [`PHASE-CONTRACT.md`](PHASE-CONTRACT.md)
> **گزارش Gate:** [`../reports/baseline-gate-8.md`](../reports/baseline-gate-8.md)
> **قرارداد Gate 8.1:** [`GATE-8.1-CONTRACT.md`](GATE-8.1-CONTRACT.md)
> **قرارداد Gate 9:** [`GATE-9-CONTRACT.md`](GATE-9-CONTRACT.md)
> **قرارداد Gate 9.1:** [`GATE-9.1-CONTRACT.md`](GATE-9.1-CONTRACT.md)
> **معماری فرانت:** [`../architecture/FRONTEND-ARCHITECTURE.md`](../architecture/FRONTEND-ARCHITECTURE.md)
> **قرارداد i18n/RTL:** [`../architecture/FRONTEND-I18N-RTL.md`](../architecture/FRONTEND-I18N-RTL.md)
> **نقشه Lastsecond:** [`LASTSECOND-SIMULATION-MAP.md`](LASTSECOND-SIMULATION-MAP.md)
> **ADR فرانت:** [`../adr/0030-frontend-architecture.md`](../adr/0030-frontend-architecture.md)
> **بازبینی دوباره Lastsecond:** [`../reports/lastsecond-reaudit-post-gate8-2026-11-14.md`](../reports/lastsecond-reaudit-post-gate8-2026-11-14.md)
> **Audit کامل Lastsecond:** [`../reports/lastsecond-full-architecture-audit-2026-11-14.md`](../reports/lastsecond-full-architecture-audit-2026-11-14.md)
> **برنامه Remediation:** [`AUDIT-REMEDIATION.md`](AUDIT-REMEDIATION.md)
> **Deviation Audit پس از Gate 6:** [`../reports/lastsecond-deviation-audit-post-gate6-2026-11-14.md`](../reports/lastsecond-deviation-audit-post-gate6-2026-11-14.md)
> **دفتر کارهای انجام‌شده:** [`DONE.md`](DONE.md)

---

## ۱. نمای کلی فازها

| فاز | عنوان | وضعیت | پیشرفت |
|---|---|---|---|
| 0 | Foundation & Governance | ✅ Done | 100% |
| 1 | Core Domain: Catalog + Identity + Supply | ✅ Gate Passed | 100% |
| 2 | Marketplace Read + Booking | ✅ Baseline Gate 4 Remediated | 100% |
| 3 | Channel + Billing + Settlement | ✅ Gate 7 PASSED (Core) | 100% |
| 4 | Flights | ✅ Gate 5 | 100% |
| 5 | Content + Hotels + Visa + SEO/i18n | ✅ Gate 5/5.1 + Gate 6 | 100% |
| 6 | Hardening & Scale | ✅ Gate 8 + 8.1 PASSED (Core) | 100% |
| 7 | Frontend Launch | ✅ Gate 9 PASSED (Core) | 100% |
| 8 | Template Integration & Lastsecond Simulation | ⏳ Gate 9.1 In Progress | 20% |

> از این لحظه، برنامه‌ریزی بر اساس `BASELINE.md` و Gateهای ۱ تا ۸ است. Phase 2 فعلی فقط تا زمان تکمیل Gate 1 به‌عنوان وضعیت تاریخی باقی می‌ماند.

---

## ۲. Phase 0 — Done ✅

| تحویل | وضعیت | شاهد |
|---|---|---|
| Solution + BuildingBlocks | ✅ | `Hani.slnx` |
| ArchitectureTests | ✅ | ۱۳ تست |
| BannedSymbols | ✅ | RS0030 |
| Central Packages + lock | ✅ | `Directory.Packages.props` |
| Docker Compose | ✅ | `deploy/docker` |
| Serilog + OTel | ✅ | `Observability` |
| Cache | ✅ | `ICacheService` |
| Tenant | ✅ | `TenantMiddleware` |
| Idempotency | ⚠️ | InMemory؛ پایدار نشده |
| MassTransit + Outbox | ⚠️ | wired؛ Outbox پیش‌فرض خاموش |
| CI + CODEOWNERS | ✅ | `.github` |

---

## ۳. Phase 1 — Done ✅ (Gate Passed)

### انجام‌شده

| مورد | جزئیات | commit |
|---|---|---|
| Catalog Domain | TourProduct + Translation + Destination | `9fa5a3e` |
| Catalog API | Create / Publish / Get | `9fa5a3e` |
| Catalog Migration | `InitialCatalog` | `9fa5a3e` |
| Identity Domain | Agency + ApiClient | `af5b415` |
| Identity API | Create Agency / Create ApiClient / Get Agency | `af5b415` |
| Identity Security | Secret generation + SHA-256 hash | `af5b415` |
| Identity Migration | `InitialIdentity` | `af5b415` |
| Supply | AgencyOffer Create/Get | `825ed39` |
| Supply Migration | `InitialSupply` + Outbox | `ab3b2e7` |
| Departure Domain | TourDeparture + Price + Capacity + Concurrency | `56a9243` |
| Departure API | Create/List/Availability/Price | `56a9243` |
| Departure Migration | `AddTourDepartures` | `56a9243` |
| Supplier Upsert | `PUT /offers/{externalId}` + Idempotency | `d4b9465` |
| Moderation | Submit / Approve / Reject | `d4b9465` |
| Archive Offer | `DELETE /offers/{id}` | `d4b9465` |
| API Key Auth | `X-Api-Key` + `X-Api-Secret` + scope | `d4b9465` |
| Tenant Isolation | claim + 401/404 | `d4b9465` |
| Localized Errors | عنوان FA/EN/AR + code | `d4b9465` |
| Destination API | `POST /internal/v1/destinations` | `d4b9465` |
| Offer Migration | `AddOfferLifecycle` | `d4b9465` |
| Gate Demo | `scripts/demo-phase1.ps1` | `d4b9465` |
| Documentation | XML summary + module README + test | `8bc804c` |
| Marketplace Search | Product search + min price + offer count | `17b6415` |
| Marketplace Compare | Compare approved offers + agency names | `17b6415` |
| Booking Quote | pricing + 15m TTL | `422b06d` |
| Booking Hold | atomic reserve + idempotent + release | `422b06d` |
| Booking Migration | InitialBooking | `422b06d` |
| Read Contracts | Catalog / Supply / Identity read services | `17b6415` |
| Localization config | زبان‌ها و عنوان خطاها از `Localization` در appsettings؛ بدون hard-code؛ `LocalizationHardcodeTests` | `5b956d3` / `783cd59` |
| ID Generator | `IIdGenerator` + `Uuid7IdGenerator`؛ حذف `Guid.*` مستقیم از دامنه/کاربرد | `5b956d3` |
| ProblemDetails | خروجی خطای مرکزی RFC 7807 + `X-Correlation-Id` + `traceId` | `3b4c68e` |
| Order + Contract | تبدیل Hold به Order + Contract immutable + مسافران/خطوط | `f43339e` |
| Payments | PaymentIntent + Gateway Adapter + MerchantScope=Hani | `dc76539` |
| Payment Webhook | HMAC verify + dedupe + Order.Paid | `7b85652` |
| Settlement | Commission Rule + CommissionEntry + Double-entry Ledger | `0dd6fbe` |
| Pricing architecture | ADR-0024: چندارزی + VAT/Duty + BookingMode + تفکیک MoR | docs only |
| Lastsecond gap analysis | گزارش بررسی صفحات و اولویت‌بندی شکاف‌ها | `docs/reports/lastsecond-gap-analysis-2026-11-12.md` |
| Tour Content Model | Itinerary/Meals/Services/Policies/RequiredItems چندزبانه (GAP-01) | `99d42ea` |
| Offer Options | Accommodation + Flight + MealPlan (GAP-02/03) | `68a4895` |
| Multi-currency Pricing | PriceComponent + VAT/Duty + PaymentObligation + per-currency Payment/Commission | `79daeb7` |
| Lastsecond Re-audit | تأیید صفحات + اصلاح minPrice چندارزی + هتل/پرواز/مالیات در compare + هتل در Quote/Order/Contract | `13cf435` |
| Discovery & SEO | Faceted Search/Sort + Canonical/JSON-LD/Sitemap/Landing + robots | `d7921ac` |
| Identity Core | User + OTP + JWT/refresh + profile + author | `026724a` |
| Trust & Agency | Onboarding/documents/admin panel/trust + reviews/claims/media | `fc26e43` |
| Booking/Request Modes | BookingMode/CollectionMode + ReservationRequest + search/compare exposure | Gate 4 |
| Lead/RFQ | LeadRequest + توزیع به همه آژانس‌های فعال + Match/Close برای تور سفارشی/هتل/پرواز/ویزا | Gate 4 |
| Price Discrepancy | گزارش مغایرت قیمت + صف بررسی + Resolve | Gate 4 |
| Installments | InstallmentPlan به تفکیک ارز + پرداخت قسط | Gate 4 |
| Offline Payment | CollectionMode=Offline + رسید Cash/Transfer/Cheque + کمیسیون | Gate 4 |
| Hotels Vertical | جستجو/فیلتر، گالری، Inquiry، Nearby، امتیاز تجمیعی | Gate 5 |
| Restaurants/Attractions | دایرکتوری، منو، Nearby، Reservation و امتیاز | Gate 5 |
| Visa Vertical | VisaCountry/Type، قیمت، مدارک، FAQ و VisaApplication | Gate 5 |
| Flights Metasearch | FlightRoute/Offer، Provider abstraction و deep link | Gate 5 |
| Geo | `/geo/nearby` یکپارچه + Haversine برای هتل/مکان | Gate 5 |
| Vertical SEO | `/seo/{type}/{slug}` + sitemap همه verticalها | Gate 5 |
| Vertical Reviews | `IReviewSummaryReadService` + rating/reviewCount + sort=rating | Gate 5 |
| Gate 5.1 Depth | Hotel rooms/board + meal/diet + linked tours + rank/recommendation | Gate 5.1 |
| Gate 5.1 Flight | Airline/Airport canonical + filters + external provider adapter | Gate 5.1 |
| Gate 5.1 Visa/SEO | Visa issuance/doc category/applicants + landing SEO/AggregateRating/FAQPage | Gate 5.1 |
| Agent policy | `AGENTS.md` + Cursor rule + PR/DoD | AGENTS.md |

### خارج از Gate (به فاز بعد منتقل شد)

| مورد | فاز مقصد |
|---|---|
| User + Role + JWT | Phase 2/3 |
| Blog/Itinerary/Video + Growth | Gate 6 |
| ترجمه per-code با resx کامل | Phase 5 |
| Postgres Idempotency پایدار | Phase 2 |
| Outbox فعال + Consumer | Phase 2 |

---

## ۴. APIهای موجود

| متد | مسیر | وضعیت |
|---|---|---|
| POST | `/internal/v1/agencies` | ✅ |
| GET | `/internal/v1/agencies/{id}` | ✅ |
| POST | `/internal/v1/agencies/{id}/api-clients` | ✅ |
| POST | `/internal/v1/destinations` | ✅ |
| POST | `/internal/v1/products` | ✅ |
| POST | `/internal/v1/products/{id}/publish` | ✅ |
| GET | `/market/v1/products/{id}` | ✅ |
| POST | `/supplier/v1/offers` | ✅ |
| PUT | `/supplier/v1/offers/{externalId}` | ✅ (Idempotent) |
| GET | `/supplier/v1/offers/{id}` | ✅ |
| POST | `/supplier/v1/offers/{id}/submit` | ✅ |
| DELETE | `/supplier/v1/offers/{id}` | ✅ (Archive) |
| POST | `/internal/v1/offers/{id}/approve` | ✅ |
| POST | `/internal/v1/offers/{id}/reject` | ✅ |
| POST | `/supplier/v1/offers/{id}/departures` | ✅ |
| GET | `/supplier/v1/offers/{id}/departures` | ✅ |
| PATCH | `/supplier/v1/departures/{id}/availability` | ✅ |
| PUT | `/supplier/v1/departures/{id}/prices` | ✅ |
| POST | `/market/v1/orders` | ✅ (Idempotent) |
| GET | `/market/v1/orders/{id}` | ✅ |
| GET | `/market/v1/orders/{id}/contract` | ✅ |
| POST | `/market/v1/reservation-requests` | ✅ |
| GET | `/market/v1/reservation-requests/{id}` | ✅ |
| POST | `/market/v1/reservation-requests/{id}/accept` | ✅ |
| POST | `/market/v1/leads` | ✅ |
| GET | `/market/v1/leads/{id}` | ✅ |
| POST | `/market/v1/price-discrepancies` | ✅ |
| POST | `/market/v1/orders/{id}/installments` | ✅ |
| GET | `/market/v1/orders/{id}/installments?currency=IRR` | ✅ |
| GET | `/supplier/v1/reservation-requests` | ✅ (Supplier) |
| POST | `/supplier/v1/reservation-requests/{id}/confirm` | ✅ (Supplier) |
| POST | `/supplier/v1/reservation-requests/{id}/reject` | ✅ (Supplier) |
| POST | `/internal/v1/reservation-requests/{id}/confirm` | ✅ |
| POST | `/internal/v1/reservation-requests/{id}/reject` | ✅ |
| GET | `/internal/v1/leads` | ✅ |
| POST | `/internal/v1/leads/{id}/match` | ✅ |
| POST | `/internal/v1/leads/{id}/close` | ✅ |
| GET | `/internal/v1/price-discrepancies` | ✅ |
| POST | `/internal/v1/price-discrepancies/{id}/resolve` | ✅ |
| POST | `/internal/v1/installments/pay` | ✅ |
| POST | `/internal/v1/payments/offline` | ✅ |
| POST | `/market/v1/payments/intents` | ✅ (Idempotent) |
| GET | `/market/v1/payments/intents/{id}` | ✅ |
| POST | `/market/v1/payments/webhook/{provider}` | ✅ (HMAC) |
| POST | `/internal/v1/settlements/commission-rules` | ✅ |
| GET | `/internal/v1/settlements/commissions/{orderId}` | ✅ |
| GET | `/internal/v1/settlements/ledger/{transactionId}` | ✅ |
| GET | `/health` | ✅ |

> Supplier API با `X-Api-Key` + `X-Api-Secret` و scope `supplier.write` محافظت می‌شود.

---

## ۵. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | 150 passed |
| Architecture Tests | 34 passed |
| Total | **190 passed** (150 unit + 34 architecture + 6 integration) |
| Migrations | Supply (۸) / Catalog (۶) / Content (۲) / Identity (۶) / Booking (۱۰) / Payments (۸) / Settlement (۳) |
| Format | clean |
| Vulnerable Packages | none |
| API Health | Healthy |

---

## ۶. تسک فعال / بعدی

**تسک فعال:** Gate 9.1 — Home Experience Registry + i18n/RTL foundation

> **Gate 8.1 (2026-11-14):** ۱۲ انحراف Backend بسته شد (Continent/هیبرارشی، Hotel sort/rank، Agency directory/profile، Author aggregate، Home BFF، Content JSON-LD، Review criteria، Blog tags/related، Visa related articles، Media upload، HTTP Email/SMS). E-07 (credential پرووایدر پرواز) و A-15 (Lastgram SSO/Competition) به‌عنوان تحویل خارجی باقی ماندند؛ E-01 در Gate 9 بسته شد. قرارداد: [`GATE-8.1-CONTRACT.md`](GATE-8.1-CONTRACT.md).
> **Gate 9 (2026-11-14):** Frontend Next.js 16 / React 19 با routing سه‌زبانه FA/EN/AR، RTL/LTR، صفحات Home/Tours/Hotels/Visa/Blog/Itineraries/Videos/Agencies/Author/Restaurants/Attractions/Flights ساخته شد. Contract: [`GATE-9-CONTRACT.md`](GATE-9-CONTRACT.md).
> **Gate 9.1 (IN_PROGRESS):** قالب Dreamstour خودِ فرانت است و تنها منبع طراحی است. Home Experience Registry با ۱۲ variant فعلاً ساخته شده و در مهاجرت به Homeهای واقعی قالب وصل می‌شود. Locale Switcher و RTL/LTR پایه پیاده شد. مراحل بعدی: Template Build Cleanup، اتصال Homeهای واقعی، Design System قالب، و صفحات Lastsecond. Contract: [`GATE-9.1-CONTRACT.md`](GATE-9.1-CONTRACT.md).
**GAPهای Gate 1:** ✅ GAP-01, GAP-02, GAP-03, GAP-07, GAP-08
**GAPهای Gate 2:** ✅ GAP-04, GAP-28
**GAPهای Gate 3:** ✅ GAP-09/10/26/27/31/11/20/32
**GAPهای Gate 4:** ✅ GAP-05/06/19 (TC-088), GAP-17/18 (TC-098)
**GAPهای Gate 5:** ✅ GAP-13/25/29 (TC-094), GAP-14 (TC-090), GAP-15/21 (TC-091), GAP-16 (TC-092)
**GAPهای Gate 6:** ✅ GAP-12/22/23/24/30/33/34
**Gate 7:** ✅ PASSED (Core) — OAuth/Channel API/Refund/Invoice/Payout/Webhook/Dunning/Dashboard/Reconciliation
**Gate 8:** ✅ PASSED (Core) — Search read model/indexes/batch/cache, content sitemap, Testcontainers, k6/SLO, DR, security, observability, ADR-0029
**Baseline:** ۳۴ GAP ثبت‌شده؛ `currentGate = 8`

### Audit 2026-11-14 — Lastsecond Full Architecture

سند کامل: [`../reports/lastsecond-full-architecture-audit-2026-11-14.md`](../reports/lastsecond-full-architecture-audit-2026-11-14.md)  
برنامه: [`AUDIT-REMEDIATION.md`](AUDIT-REMEDIATION.md)

**نتیجه:** Audit Remediation A-01..A-08 کامل شد و Gate 5 آماده شروع است:

- [x] A-01 — ADR-0026: `CollectionMode` v2 + `SellerOfRecord`/`InvoiceIssuer`
- [x] A-02 — `InstallmentTerms` (پیش‌پرداخت، کارمزد ماهانه، چک صیادی، شرایط آژانس) + فیلتر اقساطی
- [x] A-03 — Review criteria template per target + proof (واچر/قرارداد) + owner reply
- [x] A-04 — تکمیل PublicAgency (مجوز/مدیر/پرسنل/آدرس/فایل مجوز)
- [x] A-05 — Canonical Hotel + اتصال `OfferAccommodationOption.HotelId`
- [x] A-06 — Place/Geo/Nearby برای Restaurant/Attraction
- [x] A-07 — ADR-0027: Flight Metasearch/Redirect
- [x] A-08 — `TourCategory` + `TravelType` + search filters

**شکاف‌های اصلی Gate 6/7:** Blog/Travelogue/Video، Gamification، Ads/Newsletter/Campaign، Dashboard Requests/Passengers/Documents/Messages، Refund/Cancellation/Invoice/Payout.

### Gate 9 — Exit Checklist ✅ PASSED (Core)

- [x] Next.js 16 / React 19 application
- [x] FA/EN/AR routing + RTL/LTR
- [x] API client + typed public DTOs
- [x] Home BFF page
- [x] Tours list/detail
- [x] Hotels list/detail
- [x] Visa list/detail
- [x] Blog / Itineraries / Videos
- [x] Agency directory/profile
- [x] Author aggregate profile
- [x] Restaurants / Attractions
- [x] Flights metasearch page
- [x] Login entry page
- [x] `npm run build` + HTTP smoke
- [ ] Playwright E2E + production credentials/CDN/TLS (external)

### Gate 9.1 — Exit Checklist ⏳ IN_PROGRESS

- [x] i18n/RTL foundation: locale switcher, FA/AR fonts, `html lang/dir`, hreflang metadata
- [x] Template به‌عنوان Base وارد `frontend` شد
- [x] یک درخت App: `(public-pages)` + `(auth-pages)`
- [x] حذف درخت‌های تکراری Route و `components/pages`
- [x] `npm run build` سبز: ۵۵۴ صفحه، ۳ زبان
- [x] `Home Experience Registry` با ۱۲ variant
- [x] Registry mapping به Homeهای واقعی قالب (`@/views/home-*`)
- [x] Settings انتخاب Home Experience + Cookie (مهمان)
- [x] اتصال Health Check به Hani API در Settings
- [ ] UserPreferences API برای کاربر لاگین‌کرده
- [x] ترجمه متن‌های ثابت قالب به FA/AR (`template.fa/ar.json`)
- [ ] پاس ویرایشی ترجمه و پوشش متن‌های پویا
- [ ] اتصال داده‌های واقعی Hani به صفحات قالب
- [ ] OTP Login + HttpOnly Session
- [ ] Traveler Dashboard حداقلی
- [ ] Agency Dashboard حداقلی
- [ ] Checkout + Hani MoR
- [ ] افزودن فیلدهای Backend + OpenAPI + Generated Types
- [ ] Playwright/axe/Lighthouse

### Gate 8.1 — Exit Checklist ✅ PASSED (Core)

- [x] Continent taxonomy + hierarchical destination filtering
- [x] Hotel sort `newest/reviews/alphabetical/rating/rank` + `RankInCity`
- [x] Public agency directory + agency profile tour count
- [x] Author aggregate profile endpoint
- [x] Home page BFF endpoint
- [x] Blog/Travelogue/Video JSON-LD
- [x] Review criteria aggregate endpoint
- [x] Blog destination tags + related posts
- [x] Visa related article slugs
- [x] Multipart media upload + storage abstraction
- [x] HTTP Email/SMS sender with logging fallback
- [ ] Next.js frontend / real Flight Provider credentials / Lastgram SSO + Competition (external)

### Gate 8 — Exit Checklist ✅ PASSED (Core)

- [x] Search batch hydration + no N+1 loop
- [x] PostgreSQL indexes + `pg_trgm` search indexes
- [x] 30s search cache with full request key
- [x] Content sitemap + robots discovery + hreflang
- [x] Testcontainers integration tests + all module migrations
- [x] k6 search/SEO load tests + SLO evidence
- [x] DR drill + backup/restore runbook
- [x] Security headers + configurable rate limiting + HSTS
- [x] `/health/live` + `/health/ready` + observability dashboard/alerts
- [x] ADR-0028 search read model + ADR-0029 modular monolith decision
- [ ] Persistent idempotency / outbox consumer / shared rate limiter / frontend CSP (follow-up)

### Gate 7 — Exit Checklist ✅ PASSED (Core)

- [x] OAuth2 Client Credentials + channel scopes
- [x] Channel catalog/offers/departures
- [x] Channel quote/booking/list/detail/cancel
- [x] Entitlements + plan + white-label settings
- [x] Channel booking webhook + signature
- [x] Refund requested/processed (provider abstraction; mock PSP)
- [x] Invoice create/read + dunning reminder endpoint
- [x] Settlement terms + payout create/paid
- [x] Agency/Traveler/Admin booking dashboards
- [x] Reconciliation + chargeback
- [x] Channel finance/settlement endpoints
- [ ] Real PSP credentials / DNS white-label routing / frontend (external)

### Gate 6 — Exit Checklist ✅ PASSED

- [x] Blog + category + translation + SEO + comments + like
- [x] Travelogue + series + destination tags + comments
- [x] Video Aparat/MP4 + level + duration + comments
- [x] Gamification: points/level/travelStyle/badge definitions/awards
- [x] Ads: slot, creative, impression/click
- [x] Newsletter/SMS consent + verification + unsubscribe
- [x] Campaign/Blind Tour + registration
- [x] Analytics event + summary
- [x] Recommendation محصول بر اساس مقصد/نوع سفر/مدت
- [x] Notification dispatcher + retry + provider abstraction
- [x] Dashboard messages/documents + summary
- [x] Content module + migrations + OpenAPI + README
- [x] `verify.ps1` + `check-baseline.ps1` سبز

### Gate 5.1 — Exit Checklist ✅ PASSED

- [x] Restaurant meal periods/dietary options + filters
- [x] Hotel rooms/board + gallery categories equivalent
- [x] Hotel → linked tours API
- [x] Rank in city + recommendation percent
- [x] Review date range + approved user gallery
- [x] Airline/Airport canonical + flight filters + external provider adapter
- [x] Visa issuance type + document categories + multi-applicant
- [x] Vertical/city landing SEO + AggregateRating/FAQPage + localized labels
- [x] Violation/Amendment claim types
- [x] Migrationها + OpenAPI + README + tests
- [x] `verify.ps1` + `check-baseline.ps1` سبز

### Gate 5 — Exit Checklist ✅ PASSED

- [x] Hotel search/detail/nearby + gallery + amenities + inquiry + rating
- [x] Restaurant search/detail/menu/nearby + reservation + rating
- [x] Attraction search/detail/nearby + rating
- [x] Visa country/type + price/documents/steps/FAQ + visa application
- [x] Flight metasearch route/offer + provider abstraction + deep link
- [x] Unified geo nearby + Haversine
- [x] Vertical SEO `/seo/{type}/{slug}` + full vertical sitemap
- [x] Review aggregation + `sort=rating`
- [x] Migrationها + OpenAPI + README + B-01..B-08
- [x] Gate 5 Deviation Audit + PASS report
- [x] `verify.ps1` + `check-baseline.ps1` سبز

### Gate 4 — Exit Checklist ✅ Remediated

- [x] `BookingMode`/`CollectionMode` v2 روی Offer + snapshot
- [x] `ReservationRequest` + تایید/رد/پذیرش + پنل آژانس
- [x] `LeadRequest` + Match/Distribute/Close
- [x] `PriceDiscrepancyReport` + Resolve
- [x] `InstallmentPlan` + `InstallmentTerms` (پیش‌پرداخت/کارمزد/چک)
- [x] پرداخت آفلاین + رد PaymentIntent آنلاین + کمیسیون
- [x] Search/Compare افشای BookingMode + `onlineOnly` + `installmentOnly`
- [x] Migrationها + OpenAPI + README + ADR-0025/0026
- [x] Gate 4 Deviation Audit + PASS report
- [x] `verify.ps1` + `check-baseline.ps1` سبز

> Audit کامل 2026-11-14 دو انحراف Gate 4 را ثبت کرد. هر دو در A-01/A-02 رفع شدند و Gate 4 اکنون Remediated است.

### Gate 3 — Exit Checklist ✅

- [x] User + OTP + JWT + refresh rotation
- [x] Profile + author endpoint
- [x] Agency onboarding + documents
- [x] Agency/Admin panel APIs
- [x] Trust/Support
- [x] Reviews + multi-criteria ratings + photos
- [x] Claims/Corrections
- [x] Media/UGC moderation
- [x] Migration `AddTrustAgencyAndEngagement`
- [x] OpenAPI + README
- [x] Gate 3 Deviation Audit + PASS report

> Gate 3 **PASSED** شد. Gate 4 فقط با GAPهای BookingMode/Lead/RFQ/Installments شروع می‌شود.

### Gate 2 — Exit Checklist ✅

- [x] فیلترهای GAP-04 روی Offer/Departure/Hotel/Flight واقعی
- [x] Sort و Pagination بعد از فیلتر
- [x] تست برای فیلترها و Sort
- [x] Canonical + JSON-LD + Sitemap + Landing metadata
- [x] OpenAPI و README
- [x] Deviation Audit علیه Lastsecond
- [x] `verify.ps1` + `check-baseline.ps1` سبز
- [x] گزارش `baseline-gate-2.md`

> Gate 2 **PASSED** شد. Gate 3 فقط پس از همین قرارداد و با GAPهای Identity/Trust/Agency شروع می‌شود.

### ۵ تسک اول Baseline Gate 1 — Done ✅

| ترتیب | تسک | GAP | خروجی |
|---|---|---|---|
| 1 | Tour Content Model | GAP-01 | برنامه سفر/خدمات/قوانین |
| 2 | Accommodation + Flight Options | GAP-02/03 | چند هتل/اتاق/MealPlan/پرواز |
| 3 | PriceComponent + TaxStatus | GAP-07/08 | مدل قیمت چندارزی/مالیاتی |
| 4 | Quote/Order/Contract Snapshot | GAP-07/08 | snapshot چندارزی + PaymentObligation |
| 5 | PaymentObligation + Commission/Ledger | GAP-07/08 | پرداخت/کمیسیون چندارزی |

---

## ۷. Phase 1 Gate

- [x] Agency → ApiClient → Product → Offer → Publish → Query (دمو)
- [x] API Key اجباری روی Supplier API
- [x] Tenant isolation test
- [x] Departure + Price + Capacity (`56a9243`)
- [x] Supplier upsert idempotent
- [x] Moderation approve/reject
- [x] خطاهای کددار + عنوان محلی FA/EN/AR
- [x] `scripts/verify.ps1` سبز
- [x] STATUS.md و TASKS.md به‌روز

**نتیجه:** ✅ **PASSED** — گزارش: [`../reports/phase-1-gate.md`](../reports/phase-1-gate.md)

---

## ۸. Commit Log (این مرحله)

| commit | موضوع |
|---|---|
| `825ed39` | Governance bootstrap |
| `98ab18d` | Observability / Cache / Tenant / Idempotency / Docker |
| `ab3b2e7` | MassTransit + Outbox |
| `9fa5a3e` | Catalog |
| `af5b415` | Identity |
| `56a9243` | Tour Departures |
| `d4b9465` | Auth / Upsert / Moderation / Gate |
| `8bc804c` | XML docs / module READMEs / DocumentationTests |
| `17b6415` | Marketplace search + compare |
| `422b06d` | Booking quote + hold |
| `f2b7a15` | Booking/Marketplace API docs |
| `5b956d3` | Config-driven localization + IIdGenerator |
| `783cd59` | Localization hard-code CI gate |
| `3b4c68e` | Central ProblemDetails + Correlation ID |
| `f43339e` | Order + immutable Contract |
| `dc76539` | PaymentIntent + Gateway adapter |
| `7b85652` | Payment webhook verification and dedupe |
| `0dd6fbe` | Settlement ledger and commission accrual |
| `3a8992b` | Lastsecond baseline lock and gate checks |
| `99d42ea` | Multilingual tour content model (TC-083) |
| `68a4895` | Offer accommodation and flight options (TC-084) |
| `79daeb7` | Multi-currency pricing, taxes, obligations, settlement (TC-082) |
| `13cf435` | Lastsecond re-audit fixes |
| `a540530` | Endpoint handler XML documentation guard |
| `d7921ac` | Faceted search and SEO (Gate 2) |
| `026724a` | Identity core: OTP, JWT, profiles |
| `fc26e43` | Trust, agency, reviews, claims, media (Gate 3) |
| `f91e461` | Booking modes, reservation/lead, installments, offline payment (Gate 4) |

---

## Gate 9.1 — Domestic/Foreign tour scope (2026-11-15)

### تحویل‌شده در این برش

- [x] `TourScope` در دامنه + `tour_scope` در persistence + migration `AddTourScope`.
- [x] فیلتر scope در `CatalogProductFilter` و `SearchProductsQuery`.
- [x] `GET /market/v1/search?scope=Domestic|Foreign`.
- [x] `GET /market/v1/home?scope=Domestic|Foreign` (همان BFF، بدون صفحه تکراری).
- [x] تب‌های خانه با `?scope=domestic|foreign` و لندینگ‌های SEO:
  `/{locale}/tours/domestic` و `/{locale}/tours/foreign`.
- [x] تب‌های لیست تور با کامپوننت‌های `nav`/`nav-link` قالب؛ بدون کارت/دکمه جدید.
- [x] شمارش واقعی نتایج در لیست تور + رفع کلیدهای `???` در `fa.json`/`ar.json`.
- [x] تست واحد `Search_Should_Filter_By_Tour_Scope`.
- [x] `verify.ps1` سبز (151 unit + 34 architecture + 6 integration).
- [x] Build فرانت سبز؛ FA/AR RTL و EN LTR بررسی شد.

## Gate 9.1 — C3 Preferences (2026-11-16)

- [x] `UserPreferences` (home/locale/currency/theme/reducedMotion) + migration `AddUserPreferences`.
- [x] `GET/PUT /market/v1/me/preferences` با `RequireAuthorization("User")`.
- [x] اعتبارسنجی `HomeExperienceId` با `HomeExperienceCatalog` و fallback امن.
- [x] precedence: user → cookie → default در صفحه خانه و تنظیمات.
- [x] صفحه `/{locale}/settings/experience` با گرید ۱۲ تجربه + فرم نمایش.
- [x] `/user/preferences-settings` به مسیر canonical تنظیمات redirect می‌شود.
- [x] تست‌های `UserPreferencesTests` (defaults/normalize/fallback) و تست API دستی.

## Gate 9.1 — C4/C5 Dashboard Core (2026-11-16)

- [x] `GET /market/v1/me/dashboard` با summary واقعی + ۵ رزرو آخر.
- [x] `GET /market/v1/me/orders?page&pageSize` با paging.
- [x] تطبیق رزرو با email یا موبایل کاربر احرازه‌شده.
- [x] کارت‌های داشبورد مسافر با داده واقعی (تعداد/مبلغ/میانگین/آخرین رزروها).
- [x] `GET /market/v1/me/agency/dashboard` برای مالک آژانس.
- [x] کارت‌های داشبورد آژانس با داده واقعی + empty state برای آژانس ناقص.
- [x] redirect به login برای داشبورد بدون نشست.

## Gate 9.1 — C6 Checkout Core (2026-11-16)

- [x] `/{locale}/checkout/[productId]` با قیمت/سانس/اتاق از compare API.
- [x] server action: quote → hold → order → payment intent با Idempotency-Key.
- [x] `/{locale}/checkout/confirmation` با orderId یا intent و وضعیت پرداخت.
- [x] `Payments:ReturnUrlBase` توسعه به confirmation محلی.
- [x] مسیر پرداخت mock تا صدور order و intent؛ تکمیل نهایی به PSP واقعی وابسته است.
- [x] FA/AR RTL و EN LTR در فرم و صفحه تأیید.

## Gate 9.1 — C4/C5 Full Data (2026-11-16)

- [x] `GET /market/v1/me/payments` / `invoices` / `refunds` برای کاربر احرازه‌شده.
- [x] صفحات پرداخت، فاکتور و بازپرداخت با جدول واقعی و empty state.
- [x] `GET /market/v1/me/reviews` + صفحه نظرات من.
- [x] ویش‌لیست: `GET/POST/DELETE /market/v1/me/wishlist` + صفحه و حذف واقعی.
- [x] پروفایل: خواندن/ذخیره `/market/v1/auth/me` و فرم پروفایل.
- [x] `GET /market/v1/me/agency/listings` + صفحه لیستینگ آژانس.
- [x] `GET /market/v1/me/agency/orders` + صفحه رزروهای آژانس.
- [x] `GET /market/v1/me/agency/payouts` + صفحه درآمد/تسویه.
- [x] صفحه تنظیمات آژانس از `/market/v1/agencies/me`.
- [x] `AddWishlistItems` migration + تست‌های ویش‌لیست.
- [x] `dotnet format`، build و ۱۵۶ unit + ۳۴ architecture سبز.

### شکاف‌های باز (صادقانه)

- [x] داشبورد آژانس بازنویسی شد؛ نمودارها/Recently Added/Recent Invoices mock حذف و با رزرو/لیستینگ/تسویه واقعی جایگزین شدند.
- [x] `GET /market/v1/me/messages` و `POST /me/messages/{id}/read` + صفحه اعلان‌ها.
- [x] C6 پرداخت mock توسعه: `POST /internal/v1/payments/mock/complete/{intentId}` + دکمه پرداخت آزمایشی؛ Order به Paid می‌رسد.
- [x] Playwright smoke (FA RTL / EN LTR) اضافه و PASS شد.
- [ ] C6 PSP واقعی و webhook production.
- [ ] C7 axe/Lighthouse و ویرایش نهایی ترجمه؛ ممیزی اولیه، بدهی a11y قالب را نشان داد.
- [ ] جستجوی همه‌جانبه/فیلترهای صفحه تور هنوز به query string کامل متصل نیست.
- [ ] تصاویر `coverImageUrl` تور/ویزا و author/reading time محتوا.
- [ ] پاک‌سازی داده demo محلی و seed بلاگ خراب.
- [ ] E-07 provider پرواز، A-15 Lastgram، SMS/Email واقعی، storage تولیدی، PSP، CDN/DNS/TLS.

> این سند Gate 9.1 را کامل اعلام نمی‌کند؛ scope، preferences، C4/C5 داده‌محور، checkout core و mock payment بسته شده‌اند، اما PSP واقعی، axe/Lighthouse و بدهی a11y قالب باز هستند.

---

## Gate 9.1 — Lastsecond Homepage Benchmark (2026-11-16)

- Report: [`../reports/lastsecond-homepage-benchmark-2026-11-16.md`](../reports/lastsecond-homepage-benchmark-2026-11-16.md)
- Home tabs are local UI state: no URL/head change, one filter-options XHR.
- Foreign form: origin, destination, departure/return, duration, hotel.
- Domestic form: city/type + departure only.
- Search targets: foreign `/tours?hotel&list`; domestic `/tours/تور-ایرانگردی?list`.
- Lighthouse home: SEO 100, Accessibility 83, Best Practices 83.
- Key gaps to beat: brand-only H1, no JSON-LD, no `og:image`, non-semantic tabs, zoom lock, image dimensions/lazy/srcset, no `main` landmark.
- Implementation plan: [`GATE-9.1-HOME-PARITY-PLAN.md`](GATE-9.1-HOME-PARITY-PLAN.md)
- Next: Phase 1 backend contracts + Phase 2 template hero/tabs.
- Next implementation must be template-first and include canonical/hreflang/JSON-LD/a11y.
- Phase 1 home contracts: `featuredTours`, `latestDomesticTours`, `latestForeignTours`, `originCities`, `/market/v1/search/options`, `OriginDestinationName` ? done.
- Home parity Phase 2: Tour default hero; domestic/foreign scope; conditional fields; server-driven options; latest domestic/foreign sections; localized date labels ? done.
- Home parity Phase 3: origin-city section + filter, travelogue/blog split, visa cover/processing, destination translation include fix ? done.
- Home parity Phase 4: canonical/hreflang, OG/Twitter, JSON-LD, sitemap/robots, topical H1, main landmark, skip link, keyboard tabs, labels, slider/dropdown/footer a11y; Lighthouse 100/100/100 for FA/EN/AR home and tour listing ? done.
- Calendar architecture accepted and implemented in slice 1; see ADR-0032 and CALENDAR-ARCHITECTURE-PLAN.
- Calendar phase 2 implemented: global MediatR DateOnly guard, locale-aware picker facade, public display migration, CI date-architecture gate, AGENTS rules.
- Calendar modal + no-default dates: home date inputs start empty, centered Jalali modal, searchable/scrollable home dropdowns; Playwright 16 passed.
- Calendar/dropdown QA fix: repaired corrupted FA/AR message strings, date modal text verified, dropdown flips upward and stays inside viewport.
- Date/dropdown QA follow-up: modal title deduplicated; dropdown always opens below and scrolls with the page.
- Date label/portal follow-up: date labels appear only after selection, dropdown menu is portaled/fixed and follows scroll, FA/AR message strings verified clean.
- Home search polish: hero form raised, dropdown portal positioning verified, demo catalog labels repaired, test hotels filtered.
- Search UX: opening dropdowns no longer changes scrollY; menu stays below and follows manual scroll.
- Homepage control panel: `content.home_page_settings` (JSONB), public/admin settings API, `/[locale]/admin/home` editor, Lastsecond-parity order with optional template sections off by default. Agency advertising/contract model proposed in ADR-0033.
- Admin homepage panel now uses the template agency-dashboard shell instead of a custom page layout.
- Content Media Library phase 1: WebP conversion, variants, content-addressed local storage, admin media library, alt/caption/credit. Phases 2?5 planned (responsive SEO delivery, folders/usage, CMS, cloud storage).
- Content Media Library phase 2: responsive `<picture>`/WebP srcset, OG from hero, hero preload, CDN base switch, home image sitemap; 19 Playwright tests green.
- Media Phase 3 backend foundation: folders, tags, focal point, replace-image endpoint. Phase 3 admin UI, usage/audit/bulk, Phase 4 CMS and Phase 5 cloud storage remain.
- Media Phase 3 core: folders/tags/focal, replace, bulk delete, usage/audit APIs and admin controls. Usage/audit panels, crop variants, and per-agency quota remain.
- Content CMS core: ContentEntry + revisions, admin content editor, public content page, draft/publish/unpublish, hero media/SEO fields.
- Content CMS completion: rich text, revision restore, scheduled publish, automatic media usage, public page/API, content sitemap, media-backed hero variants. Draft preview remains.
- Admin production polish: 20MB Server Action upload limit, chip-based tags, explicit focal-point labels, CKEditor 5 GPL editor, live SEO audit, responsive media/content layouts, and a compact mobile admin nav. Content media API is namespaced under `/internal/v1/content-media` to avoid the identity moderation route collision.
- Media upload UX: tag input and add button share one aligned row with chips below; folder creation moved next to the folder select and opens a centered modal, with the old bottom folder form removed. Tags now occupy a dedicated row, and the input, button, and hint share the same measured width on desktop and mobile.
- Content admin IA: content list is now a template table with create/edit/delete actions; create and edit live on dedicated routes. CKEditor exposes font family/size/color, alignment, indentation, code, find/replace, special characters, and table controls, with sanitized rich-text output.
- Media admin IA: media list is now a template table with search and folder filters, template pagination, bulk delete, and row edit/delete actions. Upload and metadata/replacement editing live on dedicated create and edit routes.
- Media table layout: compact responsive columns collapse folder/tags/date at smaller widths, eliminating nested horizontal and vertical scrollbars; pagination and page count are always shown when the library has rows.
- Content editor UX: Jalali schedule date picker + time, translated type/status labels, RTL CKEditor content for FA/AR, published date in Jalali, Section block guidance, and fixed revision insert concurrency on save.
- Content table UX: server-side search/type/status filters, pagination/page count, compact responsive columns, and no nested table scrollbars.
- Unified message system: `MessageProvider` provides timed toasts and modal confirmations/alerts for success, warning, question, and error; admin media/content/home editors now use it instead of local alerts or `window.confirm`.
- OTP security phases 1-2: memory-first `IOtpSecurityState`, 120s code/cooldown, three distinct mobile changes per IP window, IP blocking, admin-editable `identity.security_settings`, admin security page, and login resend countdown. Redis can replace the state provider without changing handlers.
- Admin panel architecture approved for planning: `docs/architecture/ADMIN-PANEL-ARCHITECTURE.md` defines the 12-section Super Admin IA, template component reuse, route map, RBAC, financial/audit rules, phased delivery, and end-to-end acceptance scenario.
- Admin phase 1 started: permission-driven 12-section shell, `/internal/v1/admin/me`, real admin dashboard, agency directory with approval, paged user directory, and Admin authorization on internal dashboard/agency/user endpoints. Role editing, documents/contracts, immutable audit, and base settings remain in the next phase-1 slices.
- Admin phase 2 started: Products section with catalogue overview, live hotel search/pagination from the admin catalogue API, template-table UI, and active submenu state. Tours, flights, visas, product forms, offer approval, and hotel create/edit remain in phase-2 continuation.
- Hotel Lastsecond parity gap analysis added: `docs/plan/PHASE-2-HOTEL-LASTSECOND-GAP.md` covers contact/policies, categorized media, amenity catalog, review breakdown, recommendation/rank, booking request, JSON-LD, publication, and hotel form completion criteria.
- Hotel parity slice 1: added property type, contact phone/website, check-in/out, lifecycle status, SEO fields, gallery category/alt/cover/source/media reference, public published-only filtering, and an admin hotel content editor.
- Hotel parity slice 2: public hotel detail with gallery, amenities, rooms, review breakdown/list, booking-request widget, JSON-LD, canonical metadata, hotel sitemap, and owner-claim entry.
- Hotel parity slice 3: localized policies, amenity code/icon/sort, room inventory/rate/tax/cancellation/stop-sell fields, public helpful/report actions, and admin review/photo moderation.
- Hotel parity completion: public hotel filter counts by stars/amenity, real filter application, public detail, reviews, booking request, JSON-LD, sitemap, owner claim, and moderation are done. Lastsecond content/review/inquiry parity is closed; online availability hold is a separate commerce capability.
- Phase 3 started: admin bookings read model (orders, reservation requests, hotel inquiries), finance summary by payment/commission/payout status and currency, and enabled Bookings/Finance navigation. Booking detail/actions, refunds, settlement approval, and reconciliation workflow remain.
- Phase 3 operations: order detail with cancel and per-currency refund actions, successful payment-intent history, pending payout settlement, and finance tables for refunds, agency invoices, reconciliations, recorded commissions, and the double-entry ledger. Immutable actor audit and dual-approval workflow remain.
- Admin governance: append-only audit events with actor, before/after, reason, correlation id, IP, and user agent; two-person refund and settlement approvals; self-approval denial is audited; settlement evidence requires bank reference and receipt link; `/admin/finance/approvals` and `/admin/audit` added. `IdentityDbContext` rejects audit updates/deletes.
- Phase 4 marketing slice: admin campaign list/create/activate, localized FA/EN/AR content, Jalali date pickers over Gregorian ISO API values, responsive campaign table, and marketing audit events. Direct UI verified at desktop 1440x900, tablet 820x1180, and mobile 390x844 for FA/EN/AR.
- Phase 4 operations completion: operational reports (orders, revenue by currency, refunds, commission, payouts, top agencies, catalog, users, support backlog), support ticket workspace with customer/admin thread and internal notes, notification outbox with failed-delivery retry, and advertising slots/creatives with impression/click counters. UI verified desktop/tablet/mobile for FA/EN/AR.
- Architecture remediation slice 1: `AdminAdsEndpoints` no longer injects `DbContext`; it sends `ListAdminAdSlotsQuery` handled by `IAdminAdsReadModel` in Content.Infrastructure. Added `EndpointDbContextRatchetTests` and the report `docs/reports/architecture-review-endpoint-db-access.md`; 13 endpoint files remain explicitly tracked as debt.
- Endpoint DbContext remediation completed: all admin/content/media/catalog/report endpoint DB access moved to application services/read models. `src/Hani.Api` contains no endpoint DbContext/EF references; only `Program.cs` registers DbContexts. Architecture ratchet allowlist is empty and the report is closed.
- API host composition root refactor: `Program.cs` is now 11 lines; registrations live under `Configuration/`, pipeline under `Pipeline/`, endpoints under `Endpoints/{Admin|Public|Channel}/`, middleware under `Middleware/`, health under `Health/`, audit adapters under `Auditing/`. `ProgramCompositionTests` enforces the contract.

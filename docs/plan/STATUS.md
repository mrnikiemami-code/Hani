# Hani — STATUS (وضعیت زنده)

> **تاریخ:** ۲۳ آبان ۱۴۰۵
> **فاز فعال:** Gate 6 — Content & Growth (Ready)
> **آخرین commit کد:** `7083b45` + Gate 5
> **وضعیت Gate:** Gate 1 ✅ / Gate 2 ✅ / Gate 3 ✅ / Gate 4 ✅ Remediated / Gate 5 ✅ PASSED / Gate 6 ⏳ Ready
> **Baseline:** [`BASELINE.md`](BASELINE.md) + [`baseline.json`](baseline.json)
> **قرارداد فاز:** [`PHASE-CONTRACT.md`](PHASE-CONTRACT.md)
> **گزارش Gate:** [`../reports/baseline-gate-5.md`](../reports/baseline-gate-5.md)
> **Audit کامل Lastsecond:** [`../reports/lastsecond-full-architecture-audit-2026-11-14.md`](../reports/lastsecond-full-architecture-audit-2026-11-14.md)
> **برنامه Remediation:** [`AUDIT-REMEDIATION.md`](AUDIT-REMEDIATION.md)
> **دفتر کارهای انجام‌شده:** [`DONE.md`](DONE.md)

---

## ۱. نمای کلی فازها

| فاز | عنوان | وضعیت | پیشرفت |
|---|---|---|---|
| 0 | Foundation & Governance | ✅ Done | 100% |
| 1 | Core Domain: Catalog + Identity + Supply | ✅ Gate Passed | 100% |
| 2 | Marketplace Read + Booking | ✅ Baseline Gate 4 Remediated | 100% |
| 3 | Channel + Billing + Settlement | ⏳ Gate 7 | 0% |
| 4 | Flights | ✅ Gate 5 | 100% |
| 5 | Content + Hotels + Visa + SEO/i18n | ✅ Gate 5 (Hotels/Visa/Flights/Places) / ⏳ Gate 6 (Content) | 70% |
| 6 | Hardening & Scale | ⏳ Gate 8 | 0% |

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
| Unit Tests | ۱۳۱ passed |
| Architecture Tests | ۳۴ passed |
| Total | **۱۶۵ passed** |
| Migrations | Supply (۸) / Catalog (۶) / Identity (۵) / Booking (۹) / Payments (۶) / Settlement (۳) |
| Format | clean |
| Vulnerable Packages | none |
| API Health | Healthy |

---

## ۶. تسک فعال / بعدی

**تسک فعال:** Gate 6 — Content & Growth (Ready)
**GAPهای Gate 1:** ✅ GAP-01, GAP-02, GAP-03, GAP-07, GAP-08
**GAPهای Gate 2:** ✅ GAP-04, GAP-28
**GAPهای Gate 3:** ✅ GAP-09/10/26/27/31/11/20/32
**GAPهای Gate 4:** ✅ GAP-05/06/19 (TC-088), GAP-17/18 (TC-098)
**GAPهای Gate 5:** ✅ GAP-13/25/29 (TC-094), GAP-14 (TC-090), GAP-15/21 (TC-091), GAP-16 (TC-092)
**Baseline:** ۳۴ GAP ثبت‌شده؛ `currentGate = 6`؛ Audit Remediation A-01..A-08 و B-01..B-08 کامل شد
**قرارداد Gate 5:** [`PHASE-CONTRACT.md`](PHASE-CONTRACT.md)

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

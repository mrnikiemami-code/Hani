# Hani Baseline — Lastsecond Gap Analysis

- **Baseline version:** 1
- **Report:** `docs/reports/lastsecond-gap-analysis-2026-11-12.md`
- **Machine-readable:** `docs/plan/baseline.json`
- **Status:** Locked for planning
- **Current gate:** Gate 0 — Financial Foundation

> این فایل مرجع برنامه‌ریزی است. هر GAP باید یک Gate، Task، وضعیت و Evidence داشته باشد.
> تغییر یا حذف هر GAP فقط با نسخه جدید Baseline و ADR/Waiver مجاز است.

## ۱. قواعد

- هر Gate فقط وقتی PASS است که تمام P0های همان Gate و P0های Gateهای قبلی Done یا Waived باشند.
- Waived فقط با `waiverAdr` معتبر.
- Done فقط با Evidence غیرخالی.
- هر Gate باید حداقل یک قابلیت Hani-Better داشته باشد.
- `scripts/check-baseline.ps1` و `BaselineCoverageTests` این قواعد را در CI اجرا می‌کنند.
- Hash گزارش Baseline در JSON ذخیره می‌شود؛ تغییر بی‌هماهنگ گزارش، تست را Fail می‌کند.

## ۲. Gateها

| Gate | عنوان | P0های اصلی | Exit Criteria |
|---|---|---|---|
| 0 | Financial Foundation | GAP-07, GAP-08 | چندارزی، VAT/Duty، PaymentObligation، Commission per currency، Ledger تفکیک‌شده |
| 1 | Tour Depth & Supply | GAP-01, GAP-02, GAP-03 | محتوای کامل تور، هتل/اتاق/MealPlan، پرواز |
| 2 | Discovery & SEO | GAP-04, GAP-28 | Faceted Search، Sort، Landing، Canonical، JSON-LD، Sitemap |
| 3 | Identity, Trust & Agency | GAP-09, GAP-11, GAP-26 | User/OTP/Profile، Reviews، Agency Onboarding |
| 4 | Booking, Request & Lead | GAP-05, GAP-06 | Online، ReservationRequest، RFQ، استعلام هتل، پرداخت آفلاین |
| 5 | Verticals | GAP-13, GAP-14, GAP-15, GAP-16 | هتل، ویزا، پرواز، جاذبه/رستوران |
| 6 | Content & Growth | GAP-12, GAP-22, GAP-23, GAP-24 | سفرنامه/بلاگ/ویدیو، SMS، کمپین، رتبه‌بندی |
| 7 | Channel & Billing | — | Channel OAuth/Booking، Plans، White-label، Invoice/Settlement |
| 8 | Hardening | — | Load/Security/DR/SLO |

## ۳. Baseline Coverage

| GAP | قابلیت | اولویت | Gate | Task | وضعیت |
|---|---|---|---|---|---|
| GAP-01 | Tour Content Model | P0 | 1 | TC-083 | Planned |
| GAP-02 | Accommodation Options | P0 | 1 | TC-084 | Planned |
| GAP-03 | Flight Details | P0 | 1 | TC-084 | Planned |
| GAP-04 | Faceted Search | P0 | 2 | TC-085 | Planned |
| GAP-05 | Booking/Request Modes | P0 | 4 | TC-088 | Planned |
| GAP-06 | Lead/RFQ | P0 | 4 | TC-088 | Planned |
| GAP-07 | Multi-currency | P0 | 0 | TC-082 | Planned |
| GAP-08 | VAT/Duty | P0 | 0 | TC-082 | Planned |
| GAP-09 | User Auth/OTP | P0 | 3 | TC-086 | Planned |
| GAP-10 | Profiles/Authors | P1 | 3 | TC-086 | Planned |
| GAP-11 | Reviews/UGC | P0 | 3 | TC-089 | Planned |
| GAP-12 | Content/Itineraries/Blog/Video | P1 | 6 | TC-093 | Planned |
| GAP-13 | Attractions/Restaurants | P1 | 5 | TC-094 | Planned |
| GAP-14 | Hotels | P1 | 5 | TC-090 | Planned |
| GAP-15 | Visa | P1 | 5 | TC-091 | Planned |
| GAP-16 | Flights | P1 | 5 | TC-092 | Planned |
| GAP-17 | Installments | P1 | 4 | TC-098 | Planned |
| GAP-18 | Offline Payment | P0 | 4 | TC-098 | Planned |
| GAP-19 | Price Mismatch | P1 | 4 | TC-088 | Planned |
| GAP-20 | Ownership Claims | P1 | 3 | TC-089 | Planned |
| GAP-21 | Visa Documents | P1 | 5 | TC-091 | Planned |
| GAP-22 | SMS/Newsletter | P1 | 6 | TC-096 | Planned |
| GAP-23 | Campaigns | P2 | 6 | TC-100 | Planned |
| GAP-24 | Ranking/Recommendation | P1 | 6 | TC-099 | Planned |
| GAP-25 | Geo/Maps | P1 | 5 | TC-094 | Planned |
| GAP-26 | Agency Onboarding | P0 | 3 | TC-087 | Planned |
| GAP-27 | Agency/Admin Panels | P1 | 3 | TC-087 | Planned |
| GAP-28 | SEO | P0 | 2 | TC-097 | Planned |
| GAP-29 | Restaurant Reservation | P2 | 5 | TC-094 | Planned |
| GAP-30 | Ads | P2 | 6 | TC-099 | Planned |
| GAP-31 | Trust/Legal | P1 | 3 | TC-087 | Planned |
| GAP-32 | Media/UGC | P1 | 3 | TC-089 | Planned |
| GAP-33 | Notifications | P1 | 6 | TC-096 | Planned |
| GAP-34 | Analytics | P2 | 6 | TC-099 | Planned |

## ۴. Gate Evidence Pack

برای هر Gate این فایل‌ها الزامی‌اند:

- `docs/reports/gate-{n}-scope.md` — GAPهای داخل Gate
- `docs/reports/gate-{n}-evidence.md` — تست، Migration، OpenAPI، Demo، Regression
- به‌روزرسانی `BASELINE.md` و `baseline.json`
- به‌روزرسانی `STATUS.md` و `DONE.md`
- سبز بودن `scripts/verify.ps1`
- سبز بودن `scripts/check-baseline.ps1`

## ۵. Hani Better

هر Gate باید حداقل یکی از این‌ها را اضافه کند:

- Supplier/Channel API
- Multi-tenant isolation
- Multi-currency + Tax/Duty breakdown
- Commission per currency
- CollectionMode
- FA/EN/AR config-driven
- ProblemDetails + CorrelationId
- Outbox/Idempotency
- Architecture/Regression tests
- Agency MoR برای ReservationRequest

# Hani Baseline — Lastsecond Gap Analysis

- **Baseline version:** 1
- **Report:** `docs/reports/lastsecond-gap-analysis-2026-11-12.md`
- **Machine-readable:** `docs/plan/baseline.json`
- **Status:** Locked for planning
- **Current gate:** Gate 7 — Channel & Billing (Gate 1/2/3 ✅ Passed, Gate 4 ✅ Remediated, Gate 5/5.1 ✅ Passed, Gate 6 ✅ Passed)
- **Gate 5 status:** ✅ Passed — GAP-13/14/15/16/21/25/29 + B-01..B-08 Done
- **Gate 6 status:** ✅ Passed — GAP-12/22/23/24/30/33/34 + C-01..C-08 Done

> این فایل مرجع برنامه‌ریزی است. هر GAP باید یک Gate، Task، وضعیت و Evidence داشته باشد.
> ترتیب Gateها از گزارش Lastsecond و وابستگی‌های واقعی محصول پیروی می‌کند؛ هیچ GAP حذف نمی‌شود.

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
| 1 | Tour Experience & Pricing | GAP-01, GAP-02, GAP-03, GAP-07, GAP-08 | محتوای کامل تور، هتل/اتاق/MealPlan، پرواز، چندارزی، VAT/Duty |
| 2 | Discovery & SEO | GAP-04, GAP-28 | Faceted Search، Sort، Landing، Canonical، JSON-LD، Sitemap |
| 3 | Identity, Trust & Agency | GAP-09, GAP-11, GAP-26 | User/OTP/Profile، Reviews، Agency Onboarding |
| 4 | Booking, Request & Lead | GAP-05, GAP-06, GAP-18 | Online، ReservationRequest، RFQ + توزیع، مغایرت قیمت، اقساط، پرداخت آفلاین |
| 5 | Verticals | GAP-13, GAP-14, GAP-15, GAP-16 | هتل، ویزا، پرواز، جاذبه/رستوران |
| 6 | Content & Growth | GAP-12, GAP-22, GAP-23, GAP-24 | سفرنامه/بلاگ/ویدیو، SMS، کمپین، رتبه‌بندی |
| 7 | Channel & Billing | — | Channel OAuth/Booking، Plans، White-label، Invoice/Settlement |
| 8 | Hardening | — | Load/Security/DR/SLO |

## ۳. Baseline Coverage

| GAP | قابلیت | اولویت | Gate | Task | وضعیت |
|---|---|---|---|---|---|
| GAP-01 | Tour Content Model | P0 | 1 | TC-083 | Done |
| GAP-02 | Accommodation Options | P0 | 1 | TC-084 | Done |
| GAP-03 | Flight Details | P0 | 1 | TC-084 | Done |
| GAP-04 | Faceted Search | P0 | 2 | TC-085 | Done |
| GAP-05 | Booking/Request Modes | P0 | 4 | TC-088 | Done |
| GAP-06 | Lead/RFQ | P0 | 4 | TC-088 | Done |
| GAP-07 | Multi-currency | P0 | 1 | TC-082 | Done |
| GAP-08 | VAT/Duty | P0 | 1 | TC-082 | Done |
| GAP-09 | User Auth/OTP | P0 | 3 | TC-086 | Done |
| GAP-10 | Profiles/Authors | P1 | 3 | TC-086 | Done |
| GAP-11 | Reviews/UGC | P0 | 3 | TC-089 | Done |
| GAP-12 | Content/Itineraries/Blog/Video | P1 | 6 | TC-093 | Done |
| GAP-13 | Attractions/Restaurants | P1 | 5 | TC-094 | Done |
| GAP-14 | Hotels | P1 | 5 | TC-090 | Done |
| GAP-15 | Visa | P1 | 5 | TC-091 | Done |
| GAP-16 | Flights | P1 | 5 | TC-092 | Done |
| GAP-17 | Installments | P1 | 4 | TC-098 | Done |
| GAP-18 | Offline Payment | P0 | 4 | TC-098 | Done |
| GAP-19 | Price Mismatch | P1 | 4 | TC-088 | Done |
| GAP-20 | Ownership Claims | P1 | 3 | TC-089 | Done |
| GAP-21 | Visa Documents | P1 | 5 | TC-091 | Done |
| GAP-22 | SMS/Newsletter | P1 | 6 | TC-096 | Done |
| GAP-23 | Campaigns | P2 | 6 | TC-100 | Done |
| GAP-24 | Ranking/Recommendation | P1 | 6 | TC-099 | Done |
| GAP-25 | Geo/Maps | P1 | 5 | TC-094 | Done |
| GAP-26 | Agency Onboarding | P0 | 3 | TC-087 | Done |
| GAP-27 | Agency/Admin Panels | P1 | 3 | TC-087 | Done |
| GAP-28 | SEO | P0 | 2 | TC-097 | Done |
| GAP-29 | Restaurant Reservation | P2 | 5 | TC-094 | Done |
| GAP-30 | Ads | P2 | 6 | TC-099 | Done |
| GAP-31 | Trust/Legal | P1 | 3 | TC-087 | Done |
| GAP-32 | Media/UGC | P1 | 3 | TC-089 | Done |
| GAP-33 | Notifications | P1 | 6 | TC-096 | Done |
| GAP-34 | Analytics | P2 | 6 | TC-099 | Done |

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

- HB-01: Multilingual content FA/EN/AR با URL و SEO locale-aware
- HB-02: Supplier/Channel API
- HB-03: Multi-currency + VAT/Duty breakdown
- HB-04: ProblemDetails + CorrelationId
- HB-05: Config-driven languages و بدون hard-code

## ۶. اصلاح کارهای قبلی

- مدل تک‌ارزی فعلی Booking/Payments/Settlement در Gate 1 بازکاری می‌شود؛ نسخه فعلی خروجی نهایی نیست.
- هیچ مدل موازی تک‌ارزی/چندارزی ساخته نمی‌شود.
- `TourProduct` فعلی فقط ورودی اولیه است؛ محتوای کامل تور در Gate 1 جایگزین/تکمیل می‌شود.
- چندزبانگی از Gate 1 در مدل داده و API لحاظ می‌شود؛ ترجمه‌ها بعداً پر می‌شوند اما ساختار از ابتدا locale-aware است.


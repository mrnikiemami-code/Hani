# Hani — Phase / Gate Contract

> این سند قاعده «فاز کامل» را قفل می‌کند. هیچ Gateای فقط با ادعا یا کد ناقص PASS نمی‌شود.

## ۱. قانون کلی

هر Gate فقط زمانی PASS می‌شود که همه موارد زیر هم‌زمان برقرار باشند:

1. همه `GAP`های همان Gate وضعیت `Done` یا `Waived` (با ADR) داشته باشند.
2. برای هر GAP شاهد مشخص در `baseline.json` ثبت شده باشد.
3. Code + Tests + OpenAPI + README مربوطه به‌روز باشد.
4. `scripts/verify.ps1` و `scripts/check-baseline.ps1` سبز باشند.
5. Migration drift صفر باشد.
6. **Deviation Audit** علیه Lastsecond و گزارش Baseline انجام شده باشد.
7. هیچ P0 باز از Gateهای قبلی وجود نداشته باشد.
8. گزارش Gate در `docs/reports/` ثبت شود.

تا این ۸ شرط کامل نشود، وضعیت Gate `In Progress` است و گزارش PASS ارسال نمی‌شود.

---

## ۲. ترتیب Gateها (قفل‌شده)

| Gate | نام | GAPها / Taskها | وضعیت |
|---|---|---|---|
| 1 | Tour Experience & Pricing | GAP-01/02/03/07/08 — TC-083/084/082 | ✅ PASSED |
| 2 | Discovery & SEO | GAP-04 — TC-085، GAP-28 — TC-097 | ✅ PASSED |
| 3 | Identity, Trust & Agency | GAP-09/10/26/27/31 (TC-086/087)، GAP-11/20/32 (TC-089) | ✅ PASSED |
| 4 | Booking, Request & Lead | GAP-05/06/19 (TC-088)، GAP-17/18 (TC-098) | ✅ PASSED |
| 5 | Verticals | GAP-13/25/29 (TC-094)، GAP-14 (TC-090)، GAP-15/21 (TC-091)، GAP-16 (TC-092) | ⛔ Blocked by Audit Remediation |
| 6 | Content & Growth | GAP-12 (TC-093)، GAP-22/33 (TC-096)، GAP-23 (TC-100)، GAP-24/30/34 (TC-099) | ⏳ |
| 7 | Channel & Billing | HB-02 — Supplier/Channel OAuth + contracts (بدون GAP در baseline) | ⏳ |
| 8 | Hardening | Reliability/Security/Performance/NFR (بدون GAP در baseline) | ⏳ |

---

## ۳. قرارداد Gate 2 — Discovery & SEO

### 3.1. هدف فاز

جستجوی واقعی faceted + sort روی تورها، و SEO server-side برای محصول/مقصد/سایتمپ.

### 3.2. GAP-04 — Faceted Search + Sort (TC-085)

**In scope:**

- فیلتر مقصد و مبدا (destination/origin)
- بازه تاریخ رفت/برگشت
- بازه مدت
- نوع تور / نوع سفر
- بازه قیمت + ارز
- ستاره هتل
- MealPlan
- ایرلاین
- آژانس
- تعداد مسافر (Adults/Children/Infants) و ظرفیت
- نام هتل / کلیدواژه هتل
- وسیله نقلیه / نوع اقامت / درجه سختی (از Catalog)
- `onlineOnly` (Hani فعلاً Online-only است؛ فیلتر باید رفتار صریح داشته باشد)
- Sort: ارزان‌ترین، گران‌ترین، جدیدترین، کوتاه‌ترین، طولانی‌ترین
- Pagination با `totalCount` بعد از اعمال فیلترها

**Out of scope (به Gate خودش منتقل می‌شود):**

- امکانات هتل و نقد و بررسی‌ها → GAP-11/14 (Gate 3/5)
- رزرو آنلاین رستوران → GAP-29 (Gate 5)
- اقساط → GAP-17 (Gate 4)
- تخفیف/کمپین → GAP-23 (Gate 6)

**Acceptance:**

- فیلترها روی داده واقعی Offer/Departure/Hotel/Flight اعمال شوند، نه فقط query string.
- حداقل یک تست برای هر فیلتر و هر Sort.
- OpenAPI و Marketplace README کامل.
- Smoke Test با حداقل دو ارز و دو هتل.

### 3.3. GAP-28 — SEO / Landing / Sitemap (TC-097)

**In scope:**

- Canonical URL برای محصول/مقصد
- BreadcrumbList JSON-LD
- Product/TouristTrip JSON-LD
- `sitemap.xml` از محصولات منتشرشده
- landing metadata برای مقصد (title/description/canonical)
- locale-aware URL برای FA/EN/AR
- robots policy برای query filters
- تست‌های metadata/XML

**Out of scope:**

- رندر HTML نهایی (Frontend) تا دریافت قالب Next.js
- Blog/Itinerary SEO → GAP-12 (Gate 6)
- Reviews rich snippet → GAP-11 (Gate 3)

**Acceptance:**

- هر محصول منتشرشده در sitemap باشد.
- JSON-LD معتبر و escape-safe باشد.
- Canonical با locale هماهنگ باشد.
- query filters در robots محدود شوند.
- OpenAPI/README/تست به‌روز.

### 3.4. خروجی‌های اجباری Gate 2

| خروجی | محل |
|---|---|
| Search filters/sort | `Marketplace.Application/Queries/SearchProducts` |
| SEO metadata/sitemap/landing | `Marketplace` + `Catalog` contracts |
| OpenAPI | `docs/api/marketplace-api-v1.openapi.yaml` |
| README | `src/Modules/Marketplace/README.md` |
| Tests | `tests/Hani.UnitTests/Marketplace` + Architecture |
| Evidence | `docs/plan/baseline.json` |
| Gate report | `docs/reports/baseline-gate-2.md` |

---

## ۴. قرارداد Gate 3 — Identity, Trust & Agency

### 4.1. هدف فاز

هویت واقعی کاربر، OTP، پروفایل/نویسنده، نظرات چندمعیاره، Onboarding آژانس، پنل آژانس/ادمین و Trust.

### 4.2. GAPها

| GAP | تسک | محدوده |
|---|---|---|
| GAP-09 | TC-086 | User + OTP + JWT/refresh + rate limit |
| GAP-10 | TC-086 | Profile + author profile (`/u/{username}`) |
| GAP-11 | TC-089 | Reviews چندمعیاره + عکس + like/report |
| GAP-20 | TC-089 | Ownership claim / correction request |
| GAP-26 | TC-087 | Agency onboarding + documents + license status |
| GAP-27 | TC-087 | Agency/Admin panel APIs |
| GAP-31 | TC-087 | Trust/Support (Enamad، قوانین، تماس، وضعیت) |
| GAP-32 | TC-089 | Media/UGC upload metadata + moderation |

### 4.3. Acceptance

- OTP با TTL، مصرف یک‌بار، rate limit و lockout.
- JWT access + refresh با rotation و revoke.
- Profile و author profile چندزبانه/عمومی.
- Review فقط برای کاربر احرازشده و با moderation.
- Claim/correction قابل پیگیری و idempotent.
- Agency onboarding با مدارک و وضعیت.
- همه endpointها OpenAPI + تست + README.
- Deviation Audit علیه Lastsecond و `verify.ps1` سبز.

### 4.4. Out of scope

- BookingMode/Lead/RFQ → Gate 4
- Hotels/Visa/Flights/Attractions/Restaurants → Gate 5
- Blog/Itinerary/Video CMS → Gate 6
- Channel/Billing → Gate 7
- Hardening → Gate 8

---

## ۵. قرارداد Gate 4 — Booking, Request & Lead

### 5.1. هدف فاز

پشتیبانی کامل از مسیرهای واقعی Lastsecond: رزرو آنلاین، درخواست رزرو آژانس، Lead/RFQ تور سفارشی، مغایرت قیمت، اقساط و دریافت آفلاین.

### 5.2. GAPها

| GAP | تسک | محدوده |
|---|---|---|
| GAP-05 | TC-088 | `BookingMode` روی Offer + انتشار در Quote/Order/Contract/Search/Compare + `ReservationRequest` |
| GAP-06 | TC-088 | `LeadRequest` برای Safarsaz/هتل/پرواز/ویزا/طراحی/سفارشی + Match/Close |
| GAP-19 | TC-088 | `PriceDiscrepancyReport` + صف بررسی + Resolve |
| GAP-17 | TC-098 | `InstallmentPlan` به تفکیک ارز + پرداخت قسط داخلی |
| GAP-18 | TC-098 | `CollectionMode=Offline` + رد PaymentIntent آنلاین + رسید Cash/Transfer/Cheque + کمیسیون |

### 5.3. Acceptance

- `BookingMode`/`CollectionMode` روی `AgencyOffer` ذخیره و در snapshot بی‌تغییر Quote/Order/Contract کپی شود.
- Search و Compare حالت رزرو را افشا کنند؛ `onlineOnly` فقط Offerهای Online را برگرداند.
- `ReservationRequest` بدون Hold/پرداخت ساخته شود، TTL داشته باشد، و Confirm/Reject/Accept با کنترل مالکیت آژانس کار کند.
- Lead/RFQ برای همه نوع‌های سرویس ساخته شود؛ Match تک‌آژانس و Distribute به همه آژانس‌های Active (بدون تکرار) کار کند و Close شود.
- مغایرت قیمت با ارز و قیمت گزارش‌شده ثبت و قابل Resolve باشد.
- InstallmentPlan برای هر ارز یکتا باشد، جمع اقساط دقیقاً برابر مبلغ باشد و اقساط قابل پرداخت/پیگیری باشند.
- سفارش Offline هرگز PaymentIntent آنلاین نسازد؛ رسید آفلاین obligation را Paid کند و کمیسیون/دفتر کل به‌روز شود.
- همه endpointها XML summary، OpenAPI، README و تست داشته باشند.
- Migration drift صفر، `verify.ps1` و `check-baseline.ps1` سبز، و Deviation Audit ثبت شود.

### 5.4. خروجی‌های اجباری Gate 4

| خروجی | محل |
|---|---|
| BookingMode/CollectionMode | `Supply.Domain/AgencyOffers` + snapshot |
| Reservation/Lead/Discrepancy/Installment | `Booking.Domain` + `Booking.Application/Commands/Requests` |
| Offline payment | `Payments.Domain/OfflinePayments` + internal endpoint |
| OpenAPI | `docs/api/marketplace-api-v1.openapi.yaml` + `supplier-api-v1.openapi.yaml` + `internal-booking-api-v1.openapi.yaml` |
| ADR | `docs/adr/0025-booking-modes-requests-leads-installments-offline.md` |
| Tests | `tests/Hani.UnitTests/Booking/Gate4Tests.cs` + Marketplace tests |
| Gate report | `docs/reports/baseline-gate-4.md` |

---

## ۶. قاعده Deviation Audit

قبل از PASS هر Gate:

1. صفحات Lastsecond مرتبط با آن Gate دوباره fetch/بررسی شوند.
2. هر GAP با شاهد فعلی تطبیق داده شود.
3. اگر سایت تغییر کرده، در گزارش Deviation ثبت شود.
4. اگر پیاده‌سازی ناقص است، GAP به `InProgress` برگردد و Gate PASS نشود.
5. اگر تغییر plan لازم است، ADR + نسخه جدید baseline، نه تغییر خاموش.

---

## ۷. وضعیت فعلی

- Gate 1: ✅ PASSED و Re-audit شده.
- Gate 2: ✅ PASSED — GAP-04/28 بسته شدند و گزارش `baseline-gate-2.md` ثبت شد.
- Gate 3: ✅ PASSED — GAP-09/10/26/27/31/11/20/32 بسته شدند.
- Gate 4: ⚠️ Conditional PASS — GAP-05/06/19/17/18 بسته شدند، اما Audit کامل 2026-11-14 دو انحراف `CollectionMode` و `InstallmentTerms` را ثبت کرد.
- Gate 5: ⛔ Blocked — تا تکمیل A-01..A-08 در `docs/reports/lastsecond-full-architecture-audit-2026-11-14.md` شروع نمی‌شود.
- Audit: [`../reports/lastsecond-full-architecture-audit-2026-11-14.md`](../reports/lastsecond-full-architecture-audit-2026-11-14.md)

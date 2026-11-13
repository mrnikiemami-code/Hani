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
| 2 | Discovery & SEO | GAP-04 — TC-085، GAP-28 — TC-097 | 🚧 In Progress |
| 3 | Identity, Trust & Agency | GAP-09/10/26/27/31 (TC-086/087)، GAP-11/20/32 (TC-089) | ⏳ |
| 4 | Booking, Request & Lead | GAP-05/06/19 (TC-088)، GAP-17/18 (TC-098) | ⏳ |
| 5 | Verticals | GAP-13/25/29 (TC-094)، GAP-14 (TC-090)، GAP-15/21 (TC-091)، GAP-16 (TC-092) | ⏳ |
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

## ۴. قاعده Deviation Audit

قبل از PASS هر Gate:

1. صفحات Lastsecond مرتبط با آن Gate دوباره fetch/بررسی شوند.
2. هر GAP با شاهد فعلی تطبیق داده شود.
3. اگر سایت تغییر کرده، در گزارش Deviation ثبت شود.
4. اگر پیاده‌سازی ناقص است، GAP به `InProgress` برگردد و Gate PASS نشود.
5. اگر تغییر plan لازم است، ADR + نسخه جدید baseline، نه تغییر خاموش.

---

## ۵. وضعیت فعلی

- Gate 1: ✅ PASSED و Re-audit شده.
- Gate 2: 🚧 In Progress — GAP-04/28 هنوز باز هستند.
- Gate 3 (Identity): شروع نشده و تا PASS شدن Gate 2 وارد نمی‌شود.

# Baseline Gate 2 Report — Discovery & SEO

> **تاریخ:** ۱۳ نوامبر ۲۰۲۶
> **وضعیت:** ✅ **PASSED**
> **Gate بعدی:** Gate 3 — Identity, Trust & Agency

---

## ۱. GAPهای بسته‌شده

| GAP | عنوان | تسک | شاهد اصلی |
|---|---|---|---|
| GAP-04 | Faceted Search + Sort | TC-085 | `SearchProductsQueryHandler`, `CatalogReadService`, `SearchProductsHandlerTests` |
| GAP-28 | SEO / Landing / Sitemap | TC-097 | `SeoMetadataBuilder`, `SeoQueryHandlers`, `MarketplaceEndpoints`, `SeoHandlerTests` |

---

## ۲. Faceted Search — GAP-04

### فیلترهای پیاده‌شده

| دسته | فیلتر |
|---|---|
| مقصد/مبدا | `destinationSlug`, `originSlug`, `originDestinationId` |
| تاریخ | `startDate`, `endDate` |
| مدت | `minDuration`, `maxDuration` |
| تور | `tourType`, `difficulty`, `vehicleType`, `accommodationType` |
| قیمت | `minPrice`, `maxPrice`, `currency` |
| هتل | `hotel`, `hotelStars`, `mealPlan`, `roomType` |
| پرواز | `airline`, `cabin` |
| آژانس | `agencyId` |
| مسافر | `adults`, `children`, `infants` + ظرفیت سانس |
| عمومی | `q` (کلیدواژه), `onlineOnly` |
| صفحه‌بندی | `page`, `pageSize` |

### Sortها

`price_asc`، `price_desc`، `duration_asc`، `duration_desc`، `newest`، `title`

### رفتار مهم

- حداقل قیمت به تفکیک ارز محاسبه می‌شود و مقایسه بین ارزها انجام نمی‌شود.
- محصول بدون Offer تاییدشده در نتایج نمی‌آید.
- `totalCount` بعد از اعمال فیلترها محاسبه می‌شود.
- `onlineOnly` فعلاً no-op است چون همه Offerهای Hani Online هستند؛ در Gate 4 با BookingMode واقعی می‌شود.

### خارج از GAP-04 (با GAP خودش)

- امکانات/نقد هتل → GAP-11/14
- رزرو آنلاین رستوران → GAP-29
- اقساط/تخفیف/کمپین → GAP-17/23
- Review score / review period → GAP-11

---

## ۳. SEO — GAP-28

### Endpointها

| Endpoint | خروجی |
|---|---|
| `GET /market/v1/products/{id}/seo?locale=fa` | canonical، alternate، BreadcrumbList، TouristTrip |
| `GET /market/v1/destinations/{slug}/landing?locale=fa` | landing metadata + CollectionPage + تعداد تور |
| `GET /market/v1/seo/sitemap.xml` | sitemap چندزبانه |
| `GET /sitemap.xml` | alias عمومی |
| `GET /market/v1/seo/robots.txt` | robots policy |
| `GET /robots.txt` | alias عمومی |

### قابلیت‌ها

- canonical locale-aware از `Seo:PublicBaseUrl`
- hreflang/alternate برای همه زبان‌های `ILanguageCatalog`
- JSON-LD با `System.Text.Json` (escape-safe)
- BreadcrumbList + TouristTrip برای محصول
- CollectionPage برای landing مقصد
- robots با Disallow روی query filterها
- sitemap شامل محصولات منتشرشده + destination landingها

---

## ۴. Smoke Test واقعی

```text
Search:
locale=fa, destination=istanbul, adults=2, children=1,
currency=IRR, hotelStars=4, mealPlan=Breakfast,
airline=Iran, price range, sort=price_asc
→ totalCount=1

Product SEO:
canonical=https://app.hani.ir/fa/tours/istanbul-4-nights
alternates=3, breadcrumbs=4

Landing:
title=... tours, productCount=1

Sitemap:
200 application/xml, محصول در sitemap, hreflang موجود

robots.txt:
200 text/plain, sitemap root موجود
```

---

## ۵. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۹۹ passed |
| Architecture Tests | ۳۴ passed |
| Total | **۱۳۳ passed** |
| Migration drift | ندارد (Gate 2 Migration جدید نداشت) |
| `verify.ps1` | سبز |
| `check-baseline.ps1` | سبز |

---

## ۶. Deviation Audit علیه Lastsecond

| مورد | Lastsecond | Hani پس از Gate 2 |
|---|---|---|
| Faceted filterها | ده‌ها query filter در robots | فیلترهای دامنه‌ای موجود پوشش داده شدند |
| Sort | price/review/date/... | price/duration/newest/title |
| Canonical | دارد | دارد |
| Breadcrumb JSON-LD | دارد | دارد |
| Product rich data | دارد | TouristTrip |
| Sitemap | دارد | دارد |
| hreflang | ندارد (تک‌زبانه) | دارد (Hani-Better) |
| Review/Hotel/Video schema | دارد | در Gateهای 3/5/6 |

**نتیجه:** در محدوده GAP-04/28 انحراف باز وجود ندارد. قابلیت‌های وابسته به دامنه‌های بعدی به GAP خودشان منتقل شده‌اند.

---

## ۷. تصمیم

Gate 2 بسته شد. `currentGate = 3` و Gate بعدی **Identity, Trust & Agency** است.

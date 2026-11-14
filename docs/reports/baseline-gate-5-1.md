# Hani — Gate 5.1 (Verticals Depth) Report

> **تاریخ:** ۲۳ آبان ۱۴۰۵ (2026-11-14)
> **وضعیت:** ✅ PASSED
> **دامنه:** بستن residualهای مقایسه صفحه‌به‌صفحه با Lastsecond پس از Gate 5
> **Baseline:** 34 GAP، `currentGate = 6`

---

## ۱. گپ‌هایی که بسته شدند

| # | گپ | راه‌حل |
|---|---|---|
| 1 | وعده غذایی/رژیم رستوران | `PlaceMealPeriod`، `PlaceDietaryOption` + فیلتر `mealPeriod`/`dietaryOption` + migration |
| 2 | اتاق و پلن اقامت هتل | `HotelRoom` (RoomType/MealPlan/Adults/Children/Price/Currency) + گالری اتاق در HotelDto |
| 3 | تورهای مرتبط هتل | `IHotelOfferReadService` + `GET /market/v1/hotels/{slug}/tours` |
| 4 | رتبه در شهر و پیشنهاد کاربران | `RankInCity`، `RecommendationPercent`، `RecommendedCount` در ReviewSummary |
| 5 | فیلتر زمانی نقد و گالری کاربران | `from`/`to` در Review API + `IReviewMediaReadService` + `userPhotos` در Hotel/Place |
| 6 | فلایت واقعی‌تر | `Airline`/`Airport` canonical + `/flights/references` + فیلتر airline/stops/price/time + `FlightProviderOptions` و External provider adapter |
| 7 | عمق ویزا | `IssuanceType` (E_Visa/Label/OnArrival)، `VisaDocument.Category`، `VisaApplicant` و `PassengerCount` |
| 8 | Landing عمودی/شهری | `/market/v1/seo/{type}/landing` + CollectionPage + sitemap landing paths |
| 9 | JSON-LD و کپی SEO | `AggregateRating`، `FAQPage`، labels از config (FA/EN/AR) و حذف copy hardcoded از مسیرهای SEO |
| 10 | Violation/Amendment | `ClaimType.Violation` و `ClaimType.Amendment` |
| 11 | گالری کاربران | عکس‌های تأییدشده Review به‌عنوان `userPhotos` در هتل/مکان |

---

## ۲. APIهای جدید

- `GET /market/v1/hotels/{slug}/tours`
- `GET /market/v1/flights/references`
- `POST /internal/v1/flights/airlines`
- `POST /internal/v1/flights/airports`
- `GET /market/v1/seo/{type}/landing?destinationSlug=...`
- `GET /market/v1/restaurants?mealPeriod=...&dietaryOption=...`
- `GET /reviews?...&from=...&to=...`

---

## ۳. Migration و کیفیت

- Catalog: `20261114060152_AddGate51VerticalDepth`
- Booking: `20261114060158_AddGate51VisaApplicants`
- Unit tests: **133 passed**
- Architecture tests: **34 passed**
- Total: **167 passed**
- Build: 0 warning / 0 error
- `verify.ps1` و `check-baseline.ps1` سبز
- Smoke واقعی: Hotel Room/rank، Restaurant meal/diet filter، Visa issuance/doc category، Airline/Airport، Flight filters، vertical landing، hotel tours endpoint

---

## ۴. محدودیت‌های باقی‌مانده

- اتصال External Flight Provider نیازمند قرارداد/credential واقعی provider است؛ adapter و fallback آماده است و با `FlightProvider:ExternalEnabled=false` به catalog برمی‌گردد.
- Map tile و صفحات Next.js هنوز Frontend هستند.
- Gate 6 (Content & Growth) و Gate 7/8 (Refund/Invoice/Payout/ReadModel) همچنان خارج از این گیت‌اند.

# Hani — Gate 5 (Verticals) PASS Report

> **تاریخ:** ۲۳ آبان ۱۴۰۵ (2026-11-14)
> **وضعیت:** ✅ PASSED
> **Baseline:** `docs/plan/baseline.json` (34 GAP, `currentGate = 6`)
> **قرارداد:** `docs/plan/PHASE-CONTRACT.md` — بخش ۶
> **Audit مرجع:** `docs/reports/lastsecond-full-architecture-audit-2026-11-14.md`

---

## ۱. GAPهای بسته‌شده

| GAP | عنوان | Task | شاهد کلیدی |
|---|---|---|---|
| GAP-13 | Attractions/Restaurants | TC-094 | `Place`, `SearchPlacesQueryHandler`, `GetNearbyPlacesQueryHandler`, `PlaceMenuItem`, `/market/v1/restaurants`, `/market/v1/attractions` |
| GAP-14 | Hotels | TC-090 | `Hotel`, `HotelImage`, `SearchHotelsQueryHandler`, `HotelInquiry`, `/market/v1/hotels`, `/market/v1/hotel-inquiries` |
| GAP-15 | Visa | TC-091 | `VisaCountry`, `VisaType`, `VisaApplication`, `/market/v1/visas`, `/market/v1/visa-applications` |
| GAP-16 | Flights | TC-092 | `FlightRoute`, `FlightOffer`, `IFlightProvider`, `/market/v1/flights/search` |
| GAP-21 | Visa Documents | TC-091 | `VisaDocument`, `VisaApplicationDocument`, required document validation |
| GAP-25 | Geo/Maps | TC-094 | `GetGeoNearbyQueryHandler`, `/market/v1/geo/nearby`, hotel/place Haversine |
| GAP-29 | Restaurant Reservation | TC-094 | `RestaurantReservation`, confirm/reject endpoints |

## ۲. Audit Remediation B-01..B-08

| ID | Acceptance | وضعیت | شاهد |
|---|---|---|---|
| B-01 | Hotel page + Inquiry + Review + Gallery | ✅ Done | `HotelImage`, `HotelInquiry`, `IReviewSummaryReadService` |
| B-02 | Restaurant page + menu + reservation + filters | ✅ Done | `PlaceMenuItem`, `RestaurantReservation`, `SearchPlacesQuery` |
| B-03 | Attraction page + nearby graph | ✅ Done | `Place(Type=Attraction)`, `GetNearbyPlacesQueryHandler`, `/geo/nearby` |
| B-04 | Visa page + price + documents + FAQ + request | ✅ Done | `VisaCountry`, `VisaApplication` |
| B-05 | Flight metasearch + provider abstraction + route page | ✅ Done | `IFlightProvider`, `FlightRoute`, ADR-0027 |
| B-06 | Geo filter/distance + city/province landing | ✅ Done | `/geo/nearby` + destination landing SEO |
| B-07 | Vertical SEO + sitemap | ✅ Done | `/market/v1/seo/{type}/{slug}`, full vertical sitemap |
| B-08 | Review aggregation + rank per city | ✅ Done | `IReviewSummaryReadService`, `averageRating/reviewCount`, `sort=rating` |

## ۳. APIهای جدید Gate 5

### Marketplace

- `GET /market/v1/hotels`
- `GET /market/v1/hotels/nearby`
- `GET /market/v1/hotels/{slug}`
- `GET /market/v1/restaurants`
- `GET /market/v1/restaurants/{slug}`
- `GET /market/v1/attractions`
- `GET /market/v1/attractions/{slug}`
- `GET /market/v1/geo/nearby`
- `GET /market/v1/visas`
- `GET /market/v1/visas/{slug}`
- `GET /market/v1/flights/search`
- `GET /market/v1/flights/routes/{slug}`
- `GET /market/v1/seo/{type}/{slug}`
- `POST /market/v1/hotel-inquiries`
- `GET /market/v1/hotel-inquiries/{id}`
- `POST /market/v1/restaurant-reservations`
- `GET /market/v1/restaurant-reservations/{id}`
- `POST /market/v1/visa-applications`
- `GET /market/v1/visa-applications/{id}`

### Internal

- `POST /internal/v1/hotels` (گالری)
- `POST /internal/v1/places` (منو)
- `POST /internal/v1/visas`
- `POST /internal/v1/flights/routes`
- `GET /internal/v1/hotel-inquiries`
- `POST /internal/v1/hotel-inquiries/{id}/respond`
- `GET /internal/v1/restaurant-reservations`
- `POST /internal/v1/restaurant-reservations/{id}/confirm`
- `POST /internal/v1/restaurant-reservations/{id}/reject`
- `GET /internal/v1/visa-applications`
- `POST /internal/v1/visa-applications/{id}/status`

## ۴. Migrationها

- Catalog: `20261114052316_AddGate5Verticals`
- Catalog: `20261114053204_AddGate5VerticalMedia`
- Booking: `20261114052322_AddGate5Requests`

Migration drift صفر است.

## ۵. تست و Smoke

- `dotnet build Hani.slnx`: ۰ warning / ۰ error
- Unit tests: **۱۳۱ passed**
- Architecture tests: **۳۴ passed**
- Total: **۱۶۵ passed**

Smoke واقعی روی API:

- hotel search + detail با گالری و rating fields
- restaurant search + detail با منو
- visa country + type + application
- flight route + provider offers + deep link
- hotel inquiry create/read
- restaurant reservation create/read
- unified geo nearby
- vertical SEO + sitemap شامل هتل/رستوران/جاذبه/ویزا/پرواز

## ۶. Deviation Audit علیه Lastsecond

| موضوع | Lastsecond | Hani Gate 5 |
|---|---|---|
| Hotel | صفحه هتل + استعلام | همان + canonical hotel + gallery + agency offers + inquiry + review criteria |
| Restaurant | دایرکتوری + رزرو | همان + menu + online reservation status + review |
| Attraction | دایرکتوری + Nearby | همان + unified geo + SEO |
| Visa | صفحه ویزا + درخواست | همان + VisaType price/documents/FAQ + application workflow |
| Flight | Metasearch/Redirect | همان؛ طبق ADR-0027 بلیط صادر نمی‌شود |
| Reviews | امتیاز نمایشی | aggregate published reviews + rank در جستجو |
| SEO | صفحه‌محور | vertical SEO + JSON-LD + sitemap کامل |

**انحراف عمدی:** Hani در هتل/رستوران/ویزا مسیر درخواست/استعلام دارد و checkout آنلاین فقط برای محصولات واجد شرایط Gate 4 است. این مطابق A-01/A-07 است و GAP محسوب نمی‌شود.

## ۷. باقی‌مانده (خارج از Gate 5)

- Frontend Next.js برای صفحات vertical تا دریافت قالب کاربر.
- Cancellation/Refund/Invoice/Payout → Gate 7/8 (D-01..D-05).
- Search read model/index/cache → D-06.
- Blog/Travelogue/Video/Growth → Gate 6.
- Full load/SLO test → D-08.

## ۸. نتیجه

گیت ۵ با هفت GAP پایه و هشت اقدام B کامل شد. هیچ P0 باز از Gate 1..5 باقی نمانده است. Gate 6 (Content & Growth) آماده شروع است.

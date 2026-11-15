# Marketplace Module

> **مسئولیت:** خواندن و ترکیب داده کاتالوگ و Supply برای جستجو و مقایسه Offerهای چند آژانس.

## معماری

Marketplace یک ماژول **Read-Only** است:

```
Marketplace.Application
   ├── ICatalogReadService   (Hani.Contracts.Catalog)
   ├── IOfferReadService     (Hani.Contracts.Supply)
   └── IAgencyReadService    (Hani.Contracts.Identity)
```

- هیچ DbContext اختصاصی ندارد.
- هیچ Join بین Schemaها انجام نمی‌دهد.
- داده را از قراردادهای خواندنی ماژول‌ها ترکیب می‌کند.
- Search now uses a query-side read model with batched hydration and a 30-second cache; ADR-0028 defines the materialized projection trigger.

## Endpointها

| متد | مسیر | توضیح |
|---|---|---|
| GET | `/market/v1/search?locale=fa&destinationSlug=&scope=Domestic&page=1&pageSize=20` | جستجوی faceted + حداقل قیمت هر ارز + تعداد Offer + فیلتر داخلی/خارجی |
| GET | `/market/v1/products/{id}/compare?locale=fa` | مقایسه Offerهای تاییدشده یک محصول + هتل/پرواز/مالیات |
| GET | `/market/v1/products/{id}/seo?locale=fa` | Canonical + hreflang + JSON-LD محصول |
| GET | `/market/v1/destinations/{slug}/landing?locale=fa` | Landing metadata مقصد + تعداد تور |
| GET | `/market/v1/seo/sitemap.xml` | Sitemap چندزبانه |
| GET | `/market/v1/seo/robots.txt` | robots policy |
| GET | `/market/v1/hotels` | جستجو/فیلتر هتل |
| GET | `/market/v1/hotels/nearby` | هتل‌های نزدیک با Haversine |
| GET | `/market/v1/hotels/{slug}` | پروفایل canonical هتل + گالری + اتاق + امتیاز |
| GET | `/market/v1/hotels/{slug}/tours` | تورهای مرتبط با هتل |
| GET | `/market/v1/places/nearby` | مکان‌های نزدیک با Haversine |
| GET | `/market/v1/restaurants` | جستجوی رستوران |
| GET | `/market/v1/restaurants/{slug}` | رستوران + منو + امتیاز |
| GET | `/market/v1/attractions` | جستجوی جاذبه |
| GET | `/market/v1/attractions/{slug}` | جاذبه + امتیاز |
| GET | `/market/v1/geo/nearby` | هتل/رستوران/جاذبه نزدیک به‌صورت یکپارچه |
| GET | `/market/v1/visas` | لیست کشورهای ویزا |
| GET | `/market/v1/visas/{slug}` | جزئیات ویزا، قیمت، مدارک و FAQ |
| GET | `/market/v1/flights/search` | متاسرچ پرواز |
| GET | `/market/v1/flights/references` | ایرلاین/فرودگاه canonical |
| GET | `/market/v1/flights/routes/{slug}` | جزئیات مسیر پرواز و پیشنهادها |
| GET | `/market/v1/seo/{type}/{slug}` | SEO عمودی + JSON-LD |
| GET | `/market/v1/seo/{type}/landing` | SEO landing عمودی/شهری + CollectionPage |
| GET | `/market/v1/seo/sitemap.xml` | sitemap شامل تور/هتل/رستوران/جاذبه/ویزا/پرواز |

## قواعد

- فقط `TourProduct` منتشرشده دیده می‌شود.
- فقط `AgencyOffer` با وضعیت `Approved` دیده می‌شود.
- فقط `TourDeparture` با وضعیت `Open` و پایان‌نگرفته دیده می‌شود.
- قیمت مقایسه از قیمت سانس‌ها محاسبه می‌شود؛ در نبود سانس، `BasePrice`.
- حداقل قیمت به تفکیک ارز (`minPrices`) محاسبه می‌شود؛ مقایسه عددی بین ارزها انجام نمی‌شود.
- گزینه‌های اقامت، پرواز و قوانین VAT/Duty هر Offer در پاسخ compare برگردانده می‌شوند.
- `bookingMode` و `collectionMode` هر Offer در compare و `bookingModes` هر نتیجه جستجو برگردانده می‌شود تا UI بین رزرو مستقیم و `ReservationRequest` تفکیک کند.
- عنوان/خلاصه/توضیح بر اساس locale با fallback به زبان پیش‌فرض `Localization:DefaultCulture`.
- فیلترهای جستجو: مقصد/مبدا، تاریخ، مدت، نوع تور، دسته (`category`)، نوع سفر (`travelType`)، دامنه (`scope`: `Domestic`/`Foreign`)، سختی، وسیله، اقامت، قیمت/ارز، ستاره هتل، MealPlan، ایرلاین، آژانس، مسافر، نام هتل، نوع اتاق، کابین، کلیدواژه (`q`)، `onlineOnly` و `installmentOnly`.
- Sortهای پشتیبانی‌شده: `price_asc`, `price_desc`, `duration_asc`, `duration_desc`, `newest`, `title`.
- SEO: canonical و hreflang از `Seo:PublicBaseUrl` ساخته می‌شوند؛ JSON-LD با `System.Text.Json` سریالایز می‌شود.
- Sitemap فقط محصولات منتشرشده و destination landingهای مرتبط را شامل می‌شود؛ query filterها در robots محدود شده‌اند.
- `onlineOnly=true` فقط Offerهایی با `BookingMode=Online` را برمی‌گرداند؛ Offerهای `ReservationRequest` در جستجوی عادی دیده می‌شوند.
- `installmentOnly=true` فقط Offerهایی را برمی‌گرداند که `InstallmentTerms.IsEnabled` دارند.
- `category` و `travelType` از `TourProduct` فیلتر می‌کنند و در نتیجه جستجو برگردانده می‌شوند.

## محدودیت فعلی

- Approved offers are hydrated in one batch per page; there is no per-product query loop.
- رتبه‌بندی پیشرفته، فیلتر تاریخ و قیمت هنوز اضافه نشده است.


## Gate 8 ? Search hardening

- Offer hydration is batched with `GetApprovedOffersByProductIdsAsync`; there is no per-product query loop.
- Paged search results are cached for 30 seconds through `ICacheService`.
- Search tolerates indexed `ILIKE` filters through `pg_trgm`.
- Content discovery is served by `/content-sitemap.xml` and linked from `robots.txt`.
- ADR-0028 records the query-side read model and the scale trigger.


## Gate 8.1 ? Home and directory BFF

- `GET /market/v1/home` aggregates featured tours, visas, travelogues, blog,
  and campaigns.
- `GET /market/v1/home?scope=Domestic|Foreign` applies the same server-side
  tour scope filter used by search, so home tabs never filter client-side.
- Public agency directory/profile BFF adds approved tour counts.

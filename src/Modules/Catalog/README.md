# Catalog Module

> **مسئولیت:** کاتالوگ مشترک محصولات سفر (`TourProduct`)، مقاصد (`Destination`)، هتل (`Hotel`) و مکان‌های رستوران/جاذبه (`Place`) به‌همراه ترجمه FA/EN/AR و مختصات جغرافیایی.

## چرا TourProduct مشترک است؟

لست‌سکند هر تور را به یک آژانس می‌چسباند؛ Hani محصول مشترک دارد و آژانس‌ها روی آن `AgencyOffer` می‌دهند. نتیجه: مقایسه واقعی، SEO واحد و جلوگیری از تکرار.

## اجزای اصلی

| نوع | مسئولیت |
|---|---|
| `TourProduct` | محصول مشترک (مقصد، مدت، نوع تور، سختی، وسیله، اقامت، وضعیت) |
| `TourProductTranslation` | عنوان/خلاصه/توضیح/SEO/وعده‌ها/خدمات/قوانین/لوازم برای هر زبان |
| `TourItineraryDay` | روز برنامه سفر با وعده‌های غذایی |
| `TourItineraryDayTranslation` | عنوان/توضیح/اقامت هر روز برای هر زبان |
| `TourProductDestination` | اتصال محصول به مقاصد با ترتیب |
| `Destination` | کشور/استان/شهر/منطقه |
| `DestinationTranslation` | نام و توضیح مقصد در هر زبان |
| `TourProductStatus` | Draft / Published / Archived |
| `TourDifficulty` / `TourVehicleType` / `TourAccommodationType` | کدهای زبان‌مستقل برای نمایش چندزبانه |
| `TourCategory` / `TravelType` | Normal/Installment/Luxury و Air/Bus/Rail/Other |
| `Hotel` / `HotelTranslation` / `HotelAmenity` | هتل canonical با ستاره/مختصات/امکانات/ترجمه |
| `HotelImage` | گالری تصاویر هتل |
| `HotelRoom` | اتاق/پلن اقامت با ظرفیت و قیمت |
| `PlaceMealPeriod` / `PlaceDietaryOption` | وعده غذایی و رژیم رستوران |
| `Airline` / `Airport` | مرجع canonical ایرلاین/فرودگاه برای فیلتر و Nearby |
| `Place` / `PlaceTranslation` / `PlaceAmenity` | رستوران/جاذبه canonical با Geo و Reservation |
| `PlaceMenuItem` | منوی رستوران با بخش/قیمت/ارز |
| `VisaCountry` / `VisaType` | ویزا با قیمت بزرگسال/کودک، مدارک، مراحل و FAQ |
| `FlightRoute` / `FlightOffer` | متاسرچ پرواز با provider، قیمت، زمان و deep link |

## قواعد

- انتشار محصول نیازمند حداقل یک ترجمه و یک مقصد است.
- Slug محصول یکتاست.
- ترجمه تکراری برای یک locale مجاز نیست.
- هر روز برنامه سفر باید حداقل یک ترجمه داشته باشد.
- روز تکراری در یک محصول مجاز نیست.
- محصول منتشرشده توسط Offerهای آژانس‌ها مصرف می‌شود.

## APIها

| متد | مسیر |
|---|---|
| POST | `/internal/v1/destinations` |
| POST | `/internal/v1/products` |
| POST | `/internal/v1/products/{id}/publish` |
| GET | `/market/v1/products/{id}` |
| POST | `/internal/v1/hotels` |
| GET | `/market/v1/hotels` |
| GET | `/market/v1/hotels/nearby` |
| GET | `/market/v1/hotels/{slug}` |
| GET | `/market/v1/hotels/{slug}/tours` |
| POST | `/internal/v1/places` |
| GET | `/market/v1/places/{slug}` |
| GET | `/market/v1/places/nearby` |
| GET | `/market/v1/geo/nearby` |
| GET | `/market/v1/restaurants` |
| GET | `/market/v1/restaurants/{slug}` |
| GET | `/market/v1/attractions` |
| GET | `/market/v1/attractions/{slug}` |
| POST | `/internal/v1/visas` |
| GET | `/market/v1/visas` |
| GET | `/market/v1/visas/{slug}` |
| POST | `/internal/v1/flights/routes` |
| POST | `/internal/v1/flights/airlines` |
| POST | `/internal/v1/flights/airports` |
| GET | `/market/v1/flights/references` |
| GET | `/market/v1/flights/search` |
| GET | `/market/v1/flights/references` |
| GET | `/market/v1/flights/routes/{slug}` |

## Persistence

- Schema: `catalog`
- جدول‌ها: `tour_products`, `tour_product_translations`, `tour_itinerary_days`, `tour_itinerary_day_translations`, `tour_product_destinations`, `destinations`, `destination_translations`, `hotels`, `hotel_translations`, `hotel_amenities`, `hotel_images`, `hotel_rooms`, `places`, `place_translations`, `place_amenities`, `place_menu_items`, `place_meal_periods`, `place_dietary_options`, `visa_countries`, `visa_country_translations`, `visa_types`, `visa_documents`, `visa_steps`, `visa_faqs`, `flight_routes`, `flight_offers`, `airlines`, `airports`
- Migrationها: `InitialCatalog`, `AddTourContent`, `AddHotelsPlacesAndTourTaxonomy`, `AddGate5Verticals`, `AddGate5VerticalMedia`, `AddGate51VerticalDepth`


## Gate 8 ? Search indexes

- `pg_trgm` GIN indexes on `tour_product_translations` title/summary/description.
- Composite indexes for `(status, updated_at)`, `(status, tour_type, duration_days)`, and `(status, origin_destination_id)`.
- Destination link index for `(destination_id, tour_product_id)`.
- Migration: `AddGate8SearchIndexes`.
- Search queries use `AsSplitQuery()` to avoid collection cartesian explosion.


## Gate 8.1 ? Lastsecond parity

- `DestinationType.Continent` was added.
- Hotel, restaurant/attraction, and tour destination filters resolve the full
  `Continent -> Country -> Province -> City -> Region` subtree.
- Hotel search supports `rating`, `reviews`, `newest`, `alphabetical`, and
  `rank`; `RankInCity` is populated for list results.
- Visa types expose `RelatedArticleSlugs` for guide links.

## Gate 9.1 ? Tour scope

- `TourProduct.Scope` is a persisted `TourScope` (`Foreign` by default,
  `Domestic` for domestic tours) and is exposed by product details and search.
- `CatalogProductFilter.Scope` filters the published product read model.
- The database column is `catalog.tour_products.tour_scope` with a `Foreign`
  default so pre-existing products remain discoverable on the foreign tab.
- Migration: `AddTourScope` (index `(status, tour_scope)`).
- `TourProduct.CoverImageUrl` is a canonical card image (`cover_image_url`,
  max 500) exposed by product details and search; migration
  `AddTourCoverImage`.

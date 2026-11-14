# Supply Module

> **مسئولیت:** مدیریت پیشنهاد آژانس (`AgencyOffer`) و سانس‌های آن (`TourDeparture`) با قیمت، ظرفیت و چرخه تایید.

## اجزای اصلی

| نوع | مسئولیت |
|---|---|
| `AgencyOffer` | پیشنهاد یک آژانس روی یک `TourProduct` مشترک |
| `AgencyOfferStatus` | Draft → Pending → Approved / Rejected → Archived |
| `OfferAccommodationOption` | هتل/اتاق/MealPlan/قیمت |
| `OfferFlightOption` | پرواز رفت/برگشت با ایرلاین/فرودگاه/ساعت/بار |
| `OfferTaxRule` | VAT/Duty هر ارز با نرخ و وضعیت مالیاتی |
| `BookingMode` | Online / ReservationRequest |
| `CollectionMode` | HaniOnline / AgencyOnline / AgencyOffline |
| `SellerOfRecord` / `InvoiceIssuer` | Hani / Agency |
| `InstallmentTerms` | پیش‌پرداخت، سقف ماه، کارمزد ماهانه، چک |
| `TourDeparture` | یک تاریخ اجرای مشخص با ظرفیت و قیمت |
| `DeparturePrice` | قیمت هر نوع اتاق/مسافر برای یک سانس |
| `RoomType` | Double / Single / Triple / Child / Infant |
| `MealPlanType` | RoomOnly / Breakfast / HalfBoard / FullBoard / AllInclusive |
| `DepartureStatus` | Open / SoldOut / Closed / Cancelled |
| `DepartureConcurrencyException` | جلوگیری از بازنویسی هم‌زمان سانس |

## قواعد مهم

- `AgencyOffer` همیشه `AgencyId` دارد (tenant-scoped).
- `ExternalId` یکتای هر آژانس برای upsert idempotent است.
- قیمت و ظرفیت روی `TourDeparture` است، نه `TourProduct`.
- هر Offer می‌تواند چند گزینه اقامت و چند پرواز داشته باشد.
- هر Offer می‌تواند برای هر ارز یک `OfferTaxRule` داشته باشد؛ نرخ‌ها کسری بین ۰ و ۱ هستند.
- `BookingMode=ReservationRequest` یعنی رزرو مستقیم ممنوع است و کاربر فقط درخواست رزرو می‌فرستد.
- `CollectionMode=HaniOnline` یعنی Hani پول را جمع می‌کند؛ `AgencyOnline` و `AgencyOffline` یعنی آژانس جمع‌آوری می‌کند.
- `SellerOfRecord` و `InvoiceIssuer` مستقل از Collector در snapshot ثبت می‌شوند.
- `InstallmentTerms` شامل حداقل پیش‌پرداخت، حداکثر ماه، کارمزد ماهانه و نیاز به چک است.
- `OfferAccommodationOption.HotelId` به Hotel canonical در Catalog وصل می‌شود.
- یک سانس می‌تواند برای یک RoomType چند قیمت ارزی داشته باشد؛ یکتایی `(departure, roomType, currency)` است.
- ویرایش Offer در وضعیت Approved مجاز نیست.
- کاهش/افزایش ظرفیت با `Version` کنترل می‌شود.

## APIها

| متد | مسیر | Auth |
|---|---|---|
| POST | `/supplier/v1/offers` | Supplier |
| PUT | `/supplier/v1/offers/{externalId}` | Supplier + Idempotency-Key |
| GET | `/supplier/v1/offers/{id}` | Supplier |
| POST | `/supplier/v1/offers/{id}/submit` | Supplier |
| DELETE | `/supplier/v1/offers/{id}` | Supplier |
| POST | `/internal/v1/offers/{id}/approve` | Internal |
| POST | `/internal/v1/offers/{id}/reject` | Internal |
| POST | `/supplier/v1/offers/{id}/departures` | Supplier |
| GET | `/supplier/v1/offers/{id}/departures` | Supplier |
| PATCH | `/supplier/v1/departures/{id}/availability` | Supplier |
| PUT | `/supplier/v1/departures/{id}/prices` | Supplier |

## لایه‌ها

```
Domain          → AgencyOffer, TourDeparture, DeparturePrice, وضعیت‌ها
Application     → Command/Query/Handler/Validator/Repository port
Infrastructure  → SupplyDbContext, Configurations, Repositories, Migration
Presentation    → Minimal API endpoints
```

## Persistence

- Schema: `supply`
- جدول‌ها: `agency_offers`, `agency_offer_accommodations`, `agency_offer_flights`, `agency_offer_tax_rules`, `tour_departures`, `tour_departure_prices`, Outbox/Inbox
- Migrationها: `InitialSupply`, `AddTourDepartures`, `AddOfferLifecycle`, `AddOfferOptions`, `AddTaxRulesAndCurrencyPrices`, `AddBookingModes`, `AddAuditRemediationOfferFields`

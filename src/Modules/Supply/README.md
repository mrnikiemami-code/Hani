# Supply Module

> **مسئولیت:** مدیریت پیشنهاد آژانس (`AgencyOffer`) و سانس‌های آن (`TourDeparture`) با قیمت، ظرفیت و چرخه تایید.

## اجزای اصلی

| نوع | مسئولیت |
|---|---|
| `AgencyOffer` | پیشنهاد یک آژانس روی یک `TourProduct` مشترک |
| `AgencyOfferStatus` | Draft → Pending → Approved / Rejected → Archived |
| `TourDeparture` | یک تاریخ اجرای مشخص با ظرفیت و قیمت |
| `DeparturePrice` | قیمت هر نوع اتاق/مسافر برای یک سانس |
| `RoomType` | Double / Single / Triple / Child / Infant |
| `DepartureStatus` | Open / SoldOut / Closed / Cancelled |
| `DepartureConcurrencyException` | جلوگیری از بازنویسی هم‌زمان سانس |

## قواعد مهم

- `AgencyOffer` همیشه `AgencyId` دارد (tenant-scoped).
- `ExternalId` یکتای هر آژانس برای upsert idempotent است.
- قیمت و ظرفیت روی `TourDeparture` است، نه `TourProduct`.
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
- جدول‌ها: `agency_offers`, `tour_departures`, `tour_departure_prices`, Outbox/Inbox
- Migrationها: `InitialSupply`, `AddTourDepartures`, `AddOfferLifecycle`

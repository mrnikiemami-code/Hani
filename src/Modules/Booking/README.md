# Booking Module

> **مسئولیت:** قیمت‌گذاری موقت (Quote)، قفل ظرفیت (Hold) و چرخه عمر آن‌ها تا تبدیل به سفارش.

## جریان

```
Departure (Supply)
   → POST /market/v1/quotes
       → محاسبه قیمت بر اساس RoomType + Adults/Children/Infants
       → Quote با TTL ۱۵ دقیقه
   → POST /market/v1/holds  (Idempotency-Key)
       → رزرو اتمیک صندلی در Supply
       → Hold با TTL ۱۵ دقیقه
   → DELETE /market/v1/holds/{id}
       → آزادسازی صندلی + بازگشت Quote به Active
```

## قواعد

- Quote فقط برای سانس با ظرفیت کافی ساخته می‌شود.
- قیمت بزرگسال از `RoomType` انتخابی؛ کودک از `ChildWithBed` یا `ChildWithoutBed`؛ نوزاد از `Infant`.
- `Seats = Adults + Children` (نوزاد صندلی نمی‌گیرد).
- Hold به‌صورت idempotent است (هم با `Idempotency-Key` و هم با Hold فعال موجود برای Quote).
- در صورت خطای ذخیره Hold، صندلی‌ها آزاد می‌شوند (compensation).
- Release ظرفیت را برمی‌گرداند و Quote را Active می‌کند.

## APIها

| متد | مسیر | Auth |
|---|---|---|
| POST | `/market/v1/quotes` | عمومی |
| GET | `/market/v1/quotes/{id}` | عمومی |
| POST | `/market/v1/holds` | عمومی + Idempotency-Key |
| DELETE | `/market/v1/holds/{id}` | عمومی |

## Persistence

- Schema: `booking`
- جدول‌ها: `quotes`, `holds`
- Migration: `InitialBooking`

## محدودیت فعلی

- Job خودکار انقضای Quote/Hold هنوز اضافه نشده؛ Expiry در خواندن/استفاده بررسی می‌شود.
- تبدیل Hold به Order و پرداخت در تسک‌های بعدی (`TC-027`, `TC-028`).
- تراکنش بین Booking و Supply با compensation است، نه Saga کامل.

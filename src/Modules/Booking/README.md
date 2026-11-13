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
   → POST /market/v1/orders  (Idempotency-Key)
       → مصرف Hold (بدون رزرو مجدد)
       → Quote به Converted
       → Order + Contract immutable
   → GET /market/v1/orders/{id}
   → GET /market/v1/orders/{id}/contract
   → DELETE /market/v1/holds/{id}
       → آزادسازی صندلی + بازگشت Quote به Active
```

## قواعد

- Quote فقط برای سانس با ظرفیت کافی ساخته می‌شود.
- Quote می‌تواند هم‌زمان چند ارز داشته باشد؛ هر ارز یک `PriceComponent` با Base/Duty/VAT/Total جداگانه دارد.
- انتخاب `AccommodationOptionId` باعث می‌شود قیمت بزرگسال از هتل/اتاق/MealPlan انتخابی (در هر ارز موجود) خوانده شود و در Quote/Order/Contract snapshot ثبت شود.
- نرخ VAT و Duty از قوانین ارزی Offer خوانده می‌شود؛ فرمول: `Duty = Base × DutyRate`, `VAT = Base × VATRate`, `Total = Base + Duty + VAT`.
- قیمت بزرگسال از `RoomType` انتخابی؛ کودک از `ChildWithBed` یا `ChildWithoutBed`؛ نوزاد از `Infant` (همه در همان ارز).
- `Seats = Adults + Children` (نوزاد صندلی نمی‌گیرد).
- Hold به‌صورت idempotent است (هم با `Idempotency-Key` و هم با Hold فعال موجود برای Quote).
- در صورت خطای ذخیره Hold، صندلی‌ها آزاد می‌شوند (compensation).
- Release ظرفیت را برمی‌گرداند و Quote را Active می‌کند.
- Order فقط از Hold فعال و Quote در وضعیت Held ساخته می‌شود و صندلی را دوباره رزرو نمی‌کند.
- ساختار مسافران باید دقیقاً با ترکیب Quote (Adults/Children/Infants) بخواند.
- `Contract` snapshot immutable است: قیمت، مسافران، خطوط و شرایط در زمان صدور کپی می‌شوند و بعد از آن تغییر نمی‌کنند.
- `Order` و `Contract` کل `PricingSnapshot` را نگه می‌دارند؛ پرداخت و کمیسیون بر اساس همان snapshot و به تفکیک ارز انجام می‌شود.
- هر Order برای هر ارز یک `PaymentObligation` دارد؛ `PaymentStatus` جدا از `Order.Status` است (Unpaid/PartiallyPaid/Paid).
- Order پس از تسویه همه obligationها `Paid` می‌شود و تا آن زمان lifecycle روی `PendingPayment` می‌ماند.
- Order به‌صورت idempotent با `Idempotency-Key` و همچنین با `HoldId` یکتا است.

## APIها

| متد | مسیر | Auth |
|---|---|---|
| POST | `/market/v1/quotes` | عمومی |
| GET | `/market/v1/quotes/{id}` | عمومی |
| POST | `/market/v1/holds` | عمومی + Idempotency-Key |
| DELETE | `/market/v1/holds/{id}` | عمومی |
| POST | `/market/v1/orders` | عمومی + Idempotency-Key |
| GET | `/market/v1/orders/{id}` | عمومی |
| GET | `/market/v1/orders/{id}/contract` | عمومی |

## Persistence

- Schema: `booking`
- جدول‌ها: `quotes`, `holds`, `orders`, `order_travelers`, `order_lines`, `payment_obligations`, `contracts`, `contract_travelers`, `contract_lines`
- ستون `pricing` از نوع `jsonb` در `quotes`/`orders`/`contracts` snapshot چندارزی و مالیات را نگه می‌دارد.
- Migrationها: `InitialBooking`, `AddOrdersAndContracts`, `AddMultiCurrencyPricing`, `AddPaymentObligations`

## محدودیت فعلی

- Job خودکار انقضای Quote/Hold هنوز اضافه نشده؛ Expiry در خواندن/استفاده بررسی می‌شود.
- پرداخت و تغییر وضعیت Order به Paid در `TC-028` اضافه می‌شود.
- تراکنش بین Booking و Supply با compensation است، نه Saga کامل.

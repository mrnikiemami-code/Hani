# Booking Module

> **مسئولیت:** قیمت‌گذاری موقت (Quote)، قفل ظرفیت (Hold)، سفارش/قرارداد، درخواست رزرو، Lead/RFQ، مغایرت قیمت و برنامه اقساط.

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
   → POST /market/v1/reservation-requests
       → فقط برای Offer با BookingMode=ReservationRequest
       → درخواست بدون Hold/پرداخت تا تایید آژانس
   → POST /market/v1/leads
       → Lead/RFQ برای تور سفارشی، هتل، پرواز، ویزا
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
- Quote از `BookingMode` و `CollectionMode` همان Offer snapshot می‌گیرد و Order/Contract آن را حفظ می‌کند.
- `ReservationRequest` فقط برای Quote با `BookingMode=ReservationRequest` ساخته می‌شود، TTL دارد، و با Confirm/Reject/Accept چرخه می‌شود.
- `LeadRequest` با Match/Close چرخه دارد و برای RFQ تور سفارشی، هتل، پرواز و ویزا استفاده می‌شود.
- `DistributeLead` درخواست را به همه آژانس‌های Active توزیع می‌کند و برای هر آژانس یک `LeadAgencyInvitation` یکتا می‌سازد (بدون تکرار).
- `PriceDiscrepancyReport` مغایرت قیمت نمایش‌داده‌شده با checkout را ثبت و با Resolve بسته می‌شود.
- `InstallmentPlan` برای هر ارز Order ساخته می‌شود؛ جمع اقساط دقیقاً برابر مبلغ آن ارز است و آخرین قسط اختلاف گرد کردن را جبران می‌کند.

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
| POST | `/market/v1/reservation-requests` | عمومی |
| GET | `/market/v1/reservation-requests/{id}` | عمومی |
| POST | `/market/v1/reservation-requests/{id}/accept` | عمومی |
| POST | `/market/v1/leads` | عمومی |
| GET | `/market/v1/leads/{id}` | عمومی |
| POST | `/market/v1/price-discrepancies` | عمومی |
| POST | `/market/v1/orders/{id}/installments` | عمومی |
| GET | `/market/v1/orders/{id}/installments?currency=IRR` | عمومی |
| POST | `/internal/v1/reservation-requests/{id}/confirm` | Internal |
| POST | `/internal/v1/reservation-requests/{id}/reject` | Internal |
| GET | `/internal/v1/leads` | Internal |
| POST | `/internal/v1/leads/{id}/match` | Internal |
| POST | `/internal/v1/leads/{id}/distribute` | Internal |
| POST | `/internal/v1/leads/{id}/close` | Internal |
| GET | `/internal/v1/price-discrepancies` | Internal |
| POST | `/internal/v1/price-discrepancies/{id}/resolve` | Internal |
| POST | `/internal/v1/installments/pay` | Internal |

## Persistence

- Schema: `booking`
- جدول‌ها: `quotes`, `holds`, `orders`, `order_travelers`, `order_lines`, `payment_obligations`, `contracts`, `contract_travelers`, `contract_lines`, `reservation_requests`, `lead_requests`, `lead_agency_invitations`, `price_discrepancy_reports`, `installment_plans`, `installments`
- ستون `pricing` از نوع `jsonb` در `quotes`/`orders`/`contracts`/`reservation_requests` snapshot چندارزی و مالیات را نگه می‌دارد.
- Migrationها: `InitialBooking`, `AddOrdersAndContracts`, `AddMultiCurrencyPricing`, `AddPaymentObligations`, `AddRequestsLeadsDiscrepanciesInstallments`, `AddLeadDistributions`

## محدودیت فعلی

- Job خودکار انقضای Quote/Hold هنوز اضافه نشده؛ Expiry در خواندن/استفاده بررسی می‌شود.
- پرداخت و تغییر وضعیت Order به Paid در `TC-028` اضافه می‌شود.
- تراکنش بین Booking و Supply با compensation است، نه Saga کامل.

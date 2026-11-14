# قراردادهای API

سه سطح مستقل، با DTO و مجوز جدا:

| فایل | مدل | مسیر | بازیگر |
|---|---|---|---|
| `channel-api-v1.openapi.yaml` | Channel | `/channel/v1` | سایت/اپ آژانس |
| `supplier-api-v1.openapi.yaml` | Supplier | `/supplier/v1` | سیستم آژانس |
| `marketplace-api-v1.openapi.yaml` | Marketplace | `/market/v1` | مشتری نهایی |
| `internal-booking-api-v1.openapi.yaml` | Internal Booking | `/internal/v1` | آژانس/ادمین |

## قواعد مشترک

- همه POSTهای مالی/رزرو: `Idempotency-Key`.
- خطاها: RFC 7807 (`application/problem+json`) + `code` + `traceId`.
- صفحه‌بندی: cursor + `limit` (حداکثر ۱۰۰).
- نسخه‌بندی: `/v1`, `/v2`؛ هدرهای `Deprecation`/`Sunset`.
- Webhook: HMAC-SHA256 + timestamp + retry نمایی.
- Sandbox جدا با داده ثابت.

## Channel

- OAuth2 Client Credentials.
- اسکوپ‌ها: `channel.catalog.read`, `channel.inventory.read`, `channel.booking.read`, `channel.booking.write`, `channel.finance.read`.
- فقط Offerهای مجاز همان آژانس.
- `GET /me/entitlements` → پلن، `whiteLabel`، `attributionRequired`، سهمیه، `commissionProfileId`، `seoCanonicalMode`.
- نرخ کمیسیون در `AgencyCommissionRule` (per agency + per ProductType) است؛ در Entitlements نیست.
- `SettlementTerms` per contract؛ حالت تسویه ثابت نیست.
- `/flights/*` → جستجو و رزرو بلیط (فاز ۴).

## Supplier

- API Key + HMAC + IP allowlist.
- `externalId` کلید یکتای آژانس.
- moderation قبل از انتشار.
- ETag/version برای جلوگیری از بازنویسی.

## Marketplace

- JWT کاربر یا مهمان برای جستجو.
- BFF نازک روی Next.js.
- رزرو نیازمند احراز هویت و پذیرش قرارداد.
- `BookingMode` روی Offer تعیین می‌کند کاربر مستقیم رزرو کند یا `ReservationRequest` بفرستد.
- `CollectionMode` یکی از `HaniOnline`، `AgencyOnline` یا `AgencyOffline` است؛ فقط `HaniOnline` PaymentIntent Hani می‌سازد.
- `SellerOfRecord` و `InvoiceIssuer` در snapshot سفارش ثبت می‌شوند.
- `installmentOnly` و `criteria`/`proofType` در APIهای جستجو و Review اضافه شده‌اند.

## Internal Booking

- تأیید/رد `ReservationRequest` توسط آژانس.
- صف `Lead/RFQ` (Safarsaz، تور سفارشی، هتل، ویزا) + Match/Close.
- صف `PriceDiscrepancy` + Resolve.
- ثبت پرداخت اقساط (پیش‌پرداخت/کارمزد/چک) و پرداخت آفلاین (Cash/BankTransfer/Cheque) با رسید.

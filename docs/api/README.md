# قراردادهای API

سه سطح مستقل، با DTO و مجوز جدا:

| فایل | مدل | مسیر | بازیگر |
|---|---|---|---|
| `channel-api-v1.openapi.yaml` | Channel | `/channel/v1` | سایت/اپ آژانس |
| `supplier-api-v1.openapi.yaml` | Supplier | `/supplier/v1` | سیستم آژانس |
| (در PLAN) | Marketplace | `/market/v1` | مشتری نهایی |

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

## Supplier

- API Key + HMAC + IP allowlist.
- `externalId` کلید یکتای آژانس.
- moderation قبل از انتشار.
- ETag/version برای جلوگیری از بازنویسی.

## Marketplace

- JWT کاربر یا مهمان برای جستجو.
- BFF نازک روی Next.js.
- رزرو نیازمند احراز هویت و پذیرش قرارداد.

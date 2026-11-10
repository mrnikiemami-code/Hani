# ADR-0008 — Idempotency در پرداخت و رزرو

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

Retry شبکه، کلیک دوباره کاربر و Webhook تکراری درگاه می‌تواند باعث پرداخت/رزرو دوباره شود.

## تصمیم

- هدر `Idempotency-Key` برای همه POSTهای مالی/رزرو.
- ذخیره در `platform.idempotency_keys` با fingerprint و پاسخ.
- قفل کوتاه Redis برای درخواست‌های هم‌زمان.
- TTL: ۲۴ ساعت (پرداخت ۷ روز).
- Webhook درگاه: `provider_event_id` یکتا + Inbox.
- PaymentIntent با ماشین وضعیت و `IdempotencyKey`.
- Refund idempotent.

## الگوریتم

1. fingerprint = method + path + tenant + hash(body)
2. اگر Completed و fingerprint یکسان → همان پاسخ
3. اگر fingerprint متفاوت → `409 IDEMPOTENCY_CONFLICT`
4. اگر InProgress → `409 REQUEST_IN_PROGRESS`
5. اجرا + ذخیره نتیجه در همان تراکنش

## پیامدها

**مثبت:** جلوگیری از دوبار پرداخت، ایمنی Retry، سازگاری با درگاه‌ها.

**منفی:** نیاز به cleanup و ایندکس؛ افزایش حجم DB.

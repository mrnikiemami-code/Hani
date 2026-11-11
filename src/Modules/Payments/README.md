# Payments Module

> **مسئولیت:** ایجاد PaymentIntent برای سفارش‌های در انتظار پرداخت، اتصال به PSP از طریق پورت Gateway، و نگهداری وضعیت پرداخت. Hani Merchant of Record است و وجه در حساب Hani نگهداری می‌شود.

## جریان

```
Order (Booking, PendingPayment)
   → POST /market/v1/payments/intents  (Idempotency-Key)
       → خواندن snapshot سفارش از Hani.Contracts.Booking
       → PaymentIntent با MerchantScope=Hani و PspAccountRef
       → IPaymentGateway.InitiateAsync
       → Pending + ProviderRef + RedirectUrl
   → GET /market/v1/payments/intents/{id}
```

## قواعد

- پرداخت فقط برای Order با وضعیت `PendingPayment` و مهلت معتبر شروع می‌شود.
- `PaymentIntent` یکتا برای هر Order است؛ درخواست تکراری همان Intent را برمی‌گرداند.
- `MerchantScope` و `FundsHeldBy` روی Intent ثبت می‌شوند؛ برای checkout فعلی Hani است.
- هیچ داده کارت در این ماژول ذخیره نمی‌شود؛ فقط ProviderRef و RedirectUrl نگهداری می‌شود.
- `PaymentIntent` وضعیت‌های Created → Pending → Succeeded/Failed/Expired دارد و `Version` برای Optimistic Concurrency استفاده می‌شود.
- Gateway پیش‌فرض `MockPaymentGateway` است و برای توسعه/تست قابل جایگزینی با PSP واقعی است.
- Webhook، Verify و Refund در `TC-029` اضافه می‌شوند.

## APIها

| متد | مسیر | Auth |
|---|---|---|
| POST | `/market/v1/payments/intents` | عمومی + Idempotency-Key |
| GET | `/market/v1/payments/intents/{id}` | عمومی |

## Persistence

- Schema: `payment`
- جدول‌ها: `payment_intents`
- Migration: `InitialPayments`

## پیکربندی

```json
"Payments": {
  "Provider": "Mock",
  "PspAccountRef": "hani-psp-main",
  "MerchantScope": "Hani",
  "FundsHeldBy": "Hani",
  "ReturnUrlBase": "https://app.hani.ir/payments/return"
}
```

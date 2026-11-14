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
   → POST /market/v1/payments/webhook/{provider}
       → تأیید HMAC + timestamp
       → dedupe با provider_event_id
       → payment.succeeded → Order.Paid
   → POST /internal/v1/payments/offline
       → فقط Order با CollectionMode=AgencyOffline
       → رسید Cash/BankTransfer/Cheque + Paid + Commission
```

## قواعد

- پرداخت برای Order با وضعیت `PendingPayment` و مهلت معتبر شروع می‌شود.
- هر Order برای هر ارز یک `PaymentObligation` دارد و `PaymentIntent` به همان obligation ارجاع می‌دهد؛ یکتایی Intent `(order_id, currency)` است.
- اگر Order چند obligation داشته باشد، ارسال `paymentObligationId` یا `currency` الزامی است.
- `MerchantScope` و `FundsHeldBy` روی Intent ثبت می‌شوند؛ برای checkout فعلی Hani است.
- هیچ داده کارت در این ماژول ذخیره نمی‌شود؛ فقط ProviderRef و RedirectUrl نگهداری می‌شود.
- `PaymentIntent` وضعیت‌های Created → Pending → Succeeded/Failed/Expired دارد و `Version` برای Optimistic Concurrency استفاده می‌شود.
- Webhook با HMAC-SHA256 روی `timestamp.payload` و پنجره زمانی ۵ دقیقه تأیید می‌شود.
- `payment_webhook_events` با `(provider, provider_event_id)` یکتا است؛ event تکراری پردازش مجدد نمی‌شود.
- `payment.succeeded` obligation همان ارز را Paid می‌کند؛ Order فقط وقتی همه obligationها Paid شوند `Paid` می‌شود و `PaymentStatus` مستقل از lifecycle گزارش می‌شود؛ `payment.failed` فقط Intent را Failed می‌کند.
- فقط `CollectionMode=HaniOnline` اجازه ساخت PaymentIntent Hani دارد؛ `AgencyOnline` و `AgencyOffline` با `409` رد می‌شوند.
- `RecordOfflinePayment` فقط برای `CollectionMode=AgencyOffline` مجاز است.
- پرداخت آفلاین باید دقیقاً با مبلغ obligation همان ارز برابر باشد و یک `OfflinePaymentReceipt` با اپراتور/مرجع ثبت می‌کند.
- Gateway پیش‌فرض `MockPaymentGateway` است و برای توسعه/تست قابل جایگزینی با PSP واقعی است.
- Refund و Invoice با مدل `Refund`/`Invoice` اضافه شدند؛ Reconciliation/Payout در Settlement است.
- Refund از `Requested` به `Processed` می‌رود و `Invoice` شامل Issuer/SellerOfRecord است.

## APIها

| متد | مسیر | Auth |
|---|---|---|
| POST | `/market/v1/payments/intents` | عمومی + Idempotency-Key |
| GET | `/market/v1/payments/intents/{id}` | عمومی |
| POST | `/market/v1/payments/webhook/{provider}` | HMAC signature |
| POST | `/internal/v1/payments/offline` | Internal |
| POST | `/internal/v1/payments/refunds` | Internal |
| POST | `/internal/v1/payments/refunds/{id}/process` | Internal |
| GET | `/internal/v1/payments/refunds/{id}` | Internal |
| GET | `/internal/v1/payments/orders/{orderId}/refunds` | Internal |
| POST | `/internal/v1/payments/invoices` | Internal |
| GET | `/internal/v1/payments/invoices/{id}` | Internal |

## Persistence

- Schema: `payment`
- جدول‌ها: `payment_intents`, `payment_webhook_events`, `offline_payment_receipts`
- ایندکس یکتای `payment_intents`: `(order_id, currency)`
- Migrationها: `InitialPayments`, `AddPaymentWebhookEvents`, `AddMultipleIntentsPerOrder`, `AddPaymentObligationReference`, `AddOfflinePayments`, `AddGate7RefundsAndInvoices`

## پیکربندی

```json
"Payments": {
  "Provider": "Mock",
  "PspAccountRef": "hani-psp-main",
  "MerchantScope": "Hani",
  "FundsHeldBy": "Hani",
  "ReturnUrlBase": "https://app.hani.ir/payments/return",
  "WebhookSecret": "hani-dev-webhook-secret"
}
```

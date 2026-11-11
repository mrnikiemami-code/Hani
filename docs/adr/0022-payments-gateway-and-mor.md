# ADR-0022 — ماژول Payments، انتزاع Gateway و Merchant of Record

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-11
- **تصمیم‌گیرندگان:** تیم Hani

## زمینه

پرداخت Hani باید بدون وابستگی Domain/Application به PSP خاص انجام شود. همچنین طبق ADR-0011، Hani Merchant of Record است و وجه در حساب Hani نگهداری می‌شود. داده کارت نباید در سیستم ذخیره شود.

## تصمیم

- ماژول `Payments` با schema جداگانه `payment` و جدول `payment_intents` ایجاد می‌شود.
- `PaymentIntent` فقط `ProviderRef` و `RedirectUrl` را نگهداری می‌کند؛ هیچ PAN/CVV/داده کارت ذخیره نمی‌شود.
- `IPaymentGateway` یک Port در Application است. پیاده‌سازی پیش‌فرض `MockPaymentGateway` در Infrastructure قرار دارد و در production با PSP واقعی جایگزین می‌شود.
- Booking یک قرارداد خواندنی `Hani.Contracts.Booking.IOrderPaymentReadService` ارائه می‌دهد؛ Payments به Infrastructure یا Domain ماژول Booking وابسته نمی‌شود.
- PaymentIntent برای هر Order یکتا است و با `Idempotency-Key` و `OrderId` تکرارپذیر است.
- `MerchantScope` و `FundsHeldBy` روی Intent snapshot می‌شوند؛ برای checkout فعلی هر دو `Hani` هستند.
- `PspAccountRef` از تنظیمات `Payments` خوانده می‌شود.

## پیامدها

- تعویض PSP فقط تغییر پیاده‌سازی `IPaymentGateway` و تنظیمات است.
- مرز ماژول‌ها حفظ می‌شود؛ Payments به Booking.Infrastructure وابسته نیست.
- Webhook/Verify/Refund در `TC-029` روی همین مدل اضافه می‌شوند.
- Idempotency و Version از double-charge و به‌روزرسانی هم‌زمان جلوگیری می‌کنند.

## جایگزین‌های رد شده

- **فراخوانی مستقیم PSP از Booking:** مرز ماژول و قابلیت تعویض PSP را از بین می‌برد.
- **ذخیره داده کارت:** خارج از PCI scope و ممنوع است.

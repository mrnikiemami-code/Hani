# کاتالوگ خطا و سیاست زبان لاگ

## ۱. قالب کد

```
HANI-{AREA}-{4 digits}
```

| AREA | محدوده |
|---|---|
| AUTH | ورود، توکن، نقش |
| CATALOG | محصول/مقصد/هتل |
| SUPPLY | Offer/Departure/ظرفیت |
| BOOKING | Quote/Hold/Order/Contract |
| PAYMENT | پرداخت/Webhook/Refund |
| SETTLEMENT | تسویه/فاکتور/بدهی |
| FLIGHT | جستجو/PNR/Ticketing/Refund |
| SEO | Slug/Sitemap/Redirect |
| COMMON | خطای عمومی |

## ۲. ErrorDefinition

```csharp
public sealed record ErrorDefinition(
    string Code,
    int HttpStatus,
    LogLevel Severity,
    bool IsRetryable,
    string MessageKey,
    string? DocsUrl = null);

public static class ErrorCatalog
{
    public static readonly ErrorDefinition DepartureSoldOut = new(
        Code: "HANI-BOOKING-1001",
        HttpStatus: 409,
        Severity: LogLevel.Warning,
        IsRetryable: false,
        MessageKey: "booking.departure.sold_out");

    public static readonly ErrorDefinition PaymentFailed = new(
        Code: "HANI-PAYMENT-1001",
        HttpStatus: 402,
        Severity: LogLevel.Warning,
        IsRetryable: true,
        MessageKey: "payment.failed");
}
```

## ۳. ترجمه

```
Resources/Errors.fa.resx
Resources/Errors.en.resx
Resources/Errors.ar.resx
```

- کلید = `MessageKey`.
- Fallback: `ar → en → fa`؛ در نهایت `Code`.
- هیچ متن خطای hard-code شده در کد نیست.

## ۴. پاسخ API

```json
{
  "type": "https://api.hani.ir/errors/HANI-BOOKING-1001",
  "title": "ظرفیت این سانس تکمیل شده است.",
  "status": 409,
  "code": "HANI-BOOKING-1001",
  "messageKey": "booking.departure.sold_out",
  "traceId": "01J8Z...",
  "locale": "fa-IR"
}
```

## ۵. لاگ

```csharp
logger.LogWarning(
    "Booking failed {ErrorCode} {MessageKey} {Locale} {TraceId}",
    "HANI-BOOKING-1001",
    "booking.departure.sold_out",
    locale,
    traceId);
```

**قواعد:**

- لاگ فنی فقط انگلیسی.
- متن ترجمه‌شده در لاگ فنی ممنوع.
- `Locale` به‌عنوان context ثبت می‌شود.
- PII Redaction اجباری.
- Audit: `Code` + `Locale` + Actor.
- داشبورد per `ErrorCode` و per `Locale`.

## ۶. چک‌لیست افزودن خطا

- [ ] کد یکتا در `ErrorCatalog`
- [ ] `HttpStatus` درست
- [ ] `IsRetryable` مشخص
- [ ] ترجمه FA/EN/AR
- [ ] تست fallback
- [ ] Frontend mapping
- [ ] مستندات/لینک

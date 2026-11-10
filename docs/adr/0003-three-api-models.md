# ADR-0003 — جداسازی سه مدل Supplier / Channel / Marketplace

- **وضعیت:** Accepted (Locked)
- **تاریخ:** 2026-11-10

## زمینه

سه بازیگر مختلف با نیازها و ریسک‌های متفاوت وجود دارد: آژانس تأمین‌کننده، آژانس کانال فروش، مشتری نهایی. قاطی کردن DTOها و سیاست‌ها باعث نشت داده و پیچیدگی امنیتی می‌شود.

## تصمیم

سه سطح API و سه لایه Presentation مستقل:

| مدل | مسیر | احراز هویت | مالکیت داده |
|---|---|---|---|
| Supplier | `/supplier/v1` | API Key + HMAC / OAuth2 CC | Offer/Departure آژانس |
| Channel | `/channel/v1` | OAuth2 Client Credentials | فقط Offerهای مجاز |
| Marketplace | `/market/v1` + BFF | JWT کاربر/مهمان | سفارش مشتری |

- DTOها و Contractها جدا.
- Application Handlerها جدا.
- Domain مشترک.
- مجوز و rate limit در Endpoint Filter/Gateway.

## قواعد

- DTO Supplier هرگز در Channel استفاده نمی‌شود.
- Channel فقط `AgencyId` خودش را می‌بیند.
- Marketplace همه Offerهای منتشرشده را می‌بیند.
- هیچ منطق تجاری در Endpoint نوشته نمی‌شود.

## پیامدها

**مثبت:** امنیت، شفافیت، امکان قیمت‌گذاری/SLA متفاوت، تست مستقل.

**منفی:** سه برابر شدن سطح API و نیاز به مستندات/تست قرارداد جدا.

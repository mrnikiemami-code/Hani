# Marketplace Module

> **مسئولیت:** خواندن و ترکیب داده کاتالوگ و Supply برای جستجو و مقایسه Offerهای چند آژانس.

## معماری

Marketplace یک ماژول **Read-Only** است:

```
Marketplace.Application
   ├── ICatalogReadService   (Hani.Contracts.Catalog)
   ├── IOfferReadService     (Hani.Contracts.Supply)
   └── IAgencyReadService    (Hani.Contracts.Identity)
```

- هیچ DbContext اختصاصی ندارد.
- هیچ Join بین Schemaها انجام نمی‌دهد.
- داده را از قراردادهای خواندنی ماژول‌ها ترکیب می‌کند.
- در فاز بعد به Read Model/Projection با Outbox ارتقا می‌یابد.

## Endpointها

| متد | مسیر | توضیح |
|---|---|---|
| GET | `/market/v1/search?locale=fa&destinationSlug=&page=1&pageSize=20` | جستجوی محصولات + حداقل قیمت هر ارز + تعداد Offer |
| GET | `/market/v1/products/{id}/compare?locale=fa` | مقایسه Offerهای تاییدشده یک محصول + هتل/پرواز/مالیات |

## قواعد

- فقط `TourProduct` منتشرشده دیده می‌شود.
- فقط `AgencyOffer` با وضعیت `Approved` دیده می‌شود.
- فقط `TourDeparture` با وضعیت `Open` و پایان‌نگرفته دیده می‌شود.
- قیمت مقایسه از قیمت سانس‌ها محاسبه می‌شود؛ در نبود سانس، `BasePrice`.
- حداقل قیمت به تفکیک ارز (`minPrices`) محاسبه می‌شود؛ مقایسه عددی بین ارزها انجام نمی‌شود.
- گزینه‌های اقامت، پرواز و قوانین VAT/Duty هر Offer در پاسخ compare برگردانده می‌شوند.
- عنوان/خلاصه/توضیح بر اساس locale با fallback به زبان پیش‌فرض `Localization:DefaultCulture`.

## محدودیت فعلی

- Query به‌صورت N+1 (صفحه‌ای ۲۰) اجرا می‌شود؛ در فاز بعد Read Model و ایندکس جستجو.
- رتبه‌بندی پیشرفته، فیلتر تاریخ و قیمت هنوز اضافه نشده است.

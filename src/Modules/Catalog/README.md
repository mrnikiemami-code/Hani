# Catalog Module

> **مسئولیت:** کاتالوگ مشترک محصولات سفر (`TourProduct`) و مقاصد (`Destination`) به‌همراه ترجمه FA/EN/AR.

## چرا TourProduct مشترک است؟

لست‌سکند هر تور را به یک آژانس می‌چسباند؛ Hani محصول مشترک دارد و آژانس‌ها روی آن `AgencyOffer` می‌دهند. نتیجه: مقایسه واقعی، SEO واحد و جلوگیری از تکرار.

## اجزای اصلی

| نوع | مسئولیت |
|---|---|
| `TourProduct` | محصول مشترک (مقصد، مدت، نوع تور، وضعیت) |
| `TourProductTranslation` | عنوان/خلاصه/توضیح/SEO برای هر زبان |
| `TourProductDestination` | اتصال محصول به مقاصد با ترتیب |
| `Destination` | کشور/استان/شهر/منطقه |
| `DestinationTranslation` | نام و توضیح مقصد در هر زبان |
| `TourProductStatus` | Draft / Published / Archived |

## قواعد

- انتشار محصول نیازمند حداقل یک ترجمه و یک مقصد است.
- Slug محصول یکتاست.
- ترجمه تکراری برای یک locale مجاز نیست.
- محصول منتشرشده توسط Offerهای آژانس‌ها مصرف می‌شود.

## APIها

| متد | مسیر |
|---|---|
| POST | `/internal/v1/destinations` |
| POST | `/internal/v1/products` |
| POST | `/internal/v1/products/{id}/publish` |
| GET | `/market/v1/products/{id}` |

## Persistence

- Schema: `catalog`
- جدول‌ها: `tour_products`, `tour_product_translations`, `tour_product_destinations`, `destinations`, `destination_translations`
- Migration: `InitialCatalog`

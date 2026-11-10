# ADR-0002 — TourProduct مشترک + AgencyOffer مستقل

- **وضعیت:** Accepted (Locked)
- **تاریخ:** 2026-11-10

## زمینه

گزارش تحلیل لست‌سکند مدلی پیشنهاد داده بود که `TourProduct` مالک آژانس دارد. این مدل برای Hani باعث تکرار محصول، مقایسه سخت و SEO ضعیف می‌شود.

## تصمیم

- `TourProduct` **مشترک** و متعلق به پلتفرم/تیم کاتالوگ است.
- `AgencyOffer` **مستقل** و متعلق به آژانس است (`AgencyId`).
- `TourDeparture` به `AgencyOffer` وصل است.
- قیمت، ظرفیت، کنسلی و هتل‌ها روی Offer/Departure هستند.
- هنگام رزرو، از Offer و Departure snapshot گرفته می‌شود.

## مدل

```
TourProduct 1 ─── * AgencyOffer 1 ─── * TourDeparture
```

## پیامدها

**مثبت:**
- یک صفحه محصول برای مقایسه چند آژانس.
- SEO canonical واحد.
- افزودن آژانس جدید بدون ساخت محصول تکراری.
- گزارش و تسویه شفاف per agency.

**منفی:**
- نیاز به تیم/فرایند curation محصول.
- نیاز به moderation برای نگاشت Offer به Product.

## قواعد

- Offer بدون Product تاییدشده منتشر نمی‌شود.
- تغییر Product پس از انتشار Offer باید نسخه‌دار باشد.
- حذف Product با Offer فعال ممنوع است.

# ADR-0010 — i18n سه‌زبانه و SEO مستقل

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

Hani باید فارسی، انگلیسی و عربی را در UI، محتوا، خطاها و SEO پشتیبانی کند.

## تصمیم

- Localeها: `fa` (پیش‌فرض)، `en`، `ar`.
- Frontend: `[locale]` segment + `next-intl`.
- `dir="rtl"` برای FA/AR و `ltr` برای EN.
- Backend: `LocalizedText` (JSONB) + Resource-based errors.
- تاریخ: UTC در DB؛ نمایش جلالی/میلادی.
- ماژول `Seo`: slug، redirect، meta template، sitemap.
- Sitemap و canonical و hreflang per locale.
- محتوا: ترجمه با وضعیت Draft/Translated/Published + fallback به FA.

## قواعد

- Slug هر زبان مستقل است.
- صفحات فیلترشده بدون ارزش محتوایی `noindex`.
- JSON-LD: TouristTrip/Offer/Hotel/Article/FAQ/Breadcrumb.
- هیچ متن hard-code شده در UI وجود ندارد.

## پیامدها

**مثبت:** دسترسی به بازار عربی/انگلیسی، SEO چندزبانه.

**منفی:** هزینه ترجمه و پیچیدگی تست RTL/LTR.

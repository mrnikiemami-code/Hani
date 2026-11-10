# ADR-0014 — استراتژی SEO و سیاست Canonical کانال

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

SEO برای Hani حیاتی است. سه مدل (Marketplace/Channel/Supplier) و وایت‌لیبل می‌توانند باعث محتوای تکراری و رقابت داخلی شوند.

## تصمیم

- SEO یک Workstream از فاز ۰ است.
- Next.js Server Components + `generateMetadata` + ISR.
- ماژول `Seo` برای Slug/Meta/Redirect/Sitemap/JSON-LD.
- Canonical:
  - Product/Route/Hotel/Article → self.
  - Offer/Facet/Date → Product/Route.
  - Channel Standard → Hani.
  - Channel Professional → Agency/Self فقط با محتوای یکتا.
- `SeoPolicy` در Entitlements.
- Sitemap per type/locale؛ فقط indexable.
- CI: Lighthouse، Schema، broken link، duplicate meta.

## پیامدها

**مثبت:** جلوگیری از محتوای تکراری، رشد پایدار، شفافیت برای آژانس.

**منفی:** نیاز به محتوای یکتا برای Professional؛ پیچیدگی اندازه‌گیری.

## قواعد

- صفحه نازک `noindex`.
- تغییر Slug = 301.
- hreflang کامل FA/EN/AR.

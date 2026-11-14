# Lastsecond Deviation Audit — پس از Gate 6

> **تاریخ:** ۲۳ آبان ۱۴۰۵ (2026-11-14)
> **مرجع:** `docs/reports/lastsecond-full-architecture-audit-2026-11-14.md`
> **وضعیت Gate 6:** ✅ PASSED در سطح GAPهای Baseline
> **نتیجه کوتاه:** Gate 6 از نظر GAPهای Baseline کامل است، اما **پاریتی کامل با Lastsecond هنوز چند انحراف باز دارد**؛ بخشی از آن‌ها عمدی/Hani-Better و بخشی Gate 7/8 یا Frontend است.

---

## ۱. روش بررسی

- Baseline 34 GAP بررسی شد: **۳۴ Done، ۰ باز**.
- Deviation Register اصلی (DEV-01..DEV-20) دوباره با کد و API فعلی تطبیق داده شد.
- Gate 5.1 residual audit و Gate 6 deliverables دوباره کنترل شدند.
- کدهای کلیدی: `PublicAgencyDto`، `AuthorDto`، `Order`، `Payments`، `Settlement`، `SeoMetadataBuilder`، `SearchProductsQueryHandler`، `ContentEndpoints`.

---

## ۲. وضعیت DEV-01..DEV-20

| ID | انحراف اصلی | وضعیت فعلی | Gate |
|---|---|---|---|
| DEV-01 | Lastsecond تراکنش ندارد؛ Hani MoR دارد | **عمدی / ناقص** — checkout و payment هست، اما Refund/Invoice/Payout کامل نیست | Gate 7/8 |
| DEV-02 | CollectionMode دوحالتی | ✅ Resolved — ADR-0026 و A-01 | — |
| DEV-03 | InstallmentTerms ناقص | ✅ Resolved — A-02 | — |
| DEV-04 | Review criteria هتل‌محور | ✅ Resolved — A-03 criteria per target | — |
| DEV-05 | Review proof ندارد | ✅ Resolved — A-03 proof + owner reply | — |
| DEV-06 | Agency public profile ناقص | ⚠️ Partial — مجوز/مدیر/پرسنل/آدرس هست؛ rating و tour count در DTO نیست | Gate 7 |
| DEV-07 | Hotel canonical ندارد | ✅ Resolved — A-05 | — |
| DEV-08 | Geo/Nearby graph ندارد | ✅ Resolved — A-06 + Gate 5.1 airport nearby | — |
| DEV-09 | Search taxonomy ناقص | ✅ Resolved — A-08 | — |
| DEV-10 | Sitemap فقط Tour/Destination | ⚠️ Partial — vertical sitemap هست؛ Blog/Travelogue/Video در sitemap نیست | Gate 6/8 |
| DEV-11 | SEO copy hardcoded انگلیسی | ✅ Mostly Resolved — `Seo:Labels` config-driven؛ fallbackهای انگلیسی باقی است | — |
| DEV-12 | Content/Blog/Travelogue/Video غایب | ✅ Resolved — C-01..C-03 | — |
| DEV-13 | Gamification غایب | ✅ Resolved — C-04 | — |
| DEV-14 | Ads/Newsletter/Campaign غایب | ✅ Resolved — C-05..C-07 | — |
| DEV-15 | Dashboard requests/passengers/documents/messages غایب | ⚠️ Partial — dashboard محتوا/پیام/مدارک هست؛ aggregation درخواست‌ها/مسافران Booking ندارد | Gate 6/7 |
| DEV-16 | Refund/Cancellation/Invoice/Payout غایب | ❌ Open — D-01..D-05 | Gate 7/8 |
| DEV-17 | Order.Cancel ندارد | ❌ Open — D-01 | Gate 7/8 |
| DEV-18 | Auth فقط OTP؛ Lastsecond email/username/Lastgram | ❌ Open — optional | Gate 7/8 |
| DEV-19 | Flight model مشخص نیست | ✅ Resolved — ADR-0027 Metasearch/Redirect | — |
| DEV-20 | Performance/read model ندارد | ❌ Open — D-06 | Gate 8 |

---

## ۳. انحراف‌های باقی‌مانده خارج از DEV Register

| # | انحراف | شدت | محل |
|---|---|---|---|
| E-01 | صفحات Frontend Next.js برای Hotel/Place/Visa/Flight/Content/Growth ساخته نشده‌اند؛ فقط API داریم | **High** | Frontend |
| E-02 | Notification و Newsletter فقط provider لاگ دارند؛ SMS/Email واقعی وصل نیست | High | Gate 7 |
| E-03 | Content SEO کامل نیست: `/seo` برای Blog/Travelogue/Video، `VideoObject` و sitemap محتوا ندارد | Medium | Gate 6/8 |
| E-04 | Author profile آمار بلاگ/سفرنامه/ویدیو، Badge، Level، TravelStyle را در یک DTO عمومی برنمی‌گرداند؛ endpoint جدا هست | Medium | Gate 6/7 |
| E-05 | Home/BFF aggregation (Tour/Hotel/Visa/Blog/Ad/Newsletter) وجود ندارد | Medium | Gate 7/8 |
| E-06 | DestinationType فقط Country/Province/City/Region است؛ Continent ندارد | Medium | Gate 7/8 |
| E-07 | Flight Provider خارجی واقعی credential/قرارداد ندارد؛ adapter با fallback آماده است | Medium | External |
| E-08 | MediaAsset فقط metadata/URL دارد؛ upload باینری و storage واقعی ندارد | Medium | Gate 8 |
| E-09 | Visa related articles/link به Blog وجود ندارد | Low | Gate 7/8 |
| E-10 | Hotel sort options کامل نیست (latest review/review count/alphabet/views)؛ rank فقط در detail است | Low | Gate 8 |

---

## ۴. نتیجه‌گیری

### آیا Gate 6 از نظر Baseline کامل است؟

**بله.** هر ۳۴ GAP Baseline وضعیت Done دارند و Gate 6 از نظر GAPهای خودش PASS شده است.

### آیا پاریتی کامل با Lastsecond وجود دارد؟

**نه.** ۵ انحراف باقی‌مانده در محدوده Gate 6/7 (E-02..E-05) و چند انحراف Gate 7/8/Frontend قابل ردیابی است. مهم‌ترین‌ها:

1. Frontend صفحات
2. Refund/Cancellation/Invoice/Payout
3. Dashboard درخواست‌ها/مسافران
4. Notification/Email/SMS واقعی
5. Content SEO/VideoObject/Sitemap

### آیا Gate 7 مجاز است؟

**بله، با شرط ثبت انحراف‌ها.** Gate 7 از نظر قرارداد فاز مجاز است، چون هیچ P0 باز در Gate 1..6 وجود ندارد. اما نباید ادعا شود پاریتی کامل است؛ DEV-01/06/15/16/17/18/20 و E-01..E-10 باید در Gate 7/8 یا Frontend پیگیری شوند.

---

## ۵. پیشنهاد ترتیب

1. Gate 7: Channel OAuth/Billing + Refund/Cancel/Invoice/Payout
2. Gate 7: Dashboard request/passenger aggregation
3. Gate 7/8: real Notification/SMS/Email provider
4. Gate 8: Search read model/performance/load
5. Frontend: Next.js pages
6. Gate 8: content SEO/VideoObject/sitemap + media upload

> این گزارش عمداً هیچ GAP را جابه‌جا یا Waive نمی‌کند؛ فقط انحراف‌های باقی‌مانده را ثبت می‌کند.

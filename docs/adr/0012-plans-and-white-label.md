# ADR-0012 — پلن‌های Standard/Professional و وایت‌لیبل

- **وضعیت:** Accepted (Locked)
- **تاریخ:** 2026-11-10

## زمینه

Channel API باید هم برای آژانس‌های کوچک (با برند Hani) و هم برای آژانس‌های بزرگ (وایت‌لیبل) قابل فروش باشد.

## تصمیم

- دو پلن:
  - **Standard:** «Powered by Hani» اجباری.
  - **Professional:** وایت‌لیبل کامل + اشتراک بالاتر.
- `Entitlements` منبع حقیقت قابلیت‌هاست.
- `GET /channel/v1/me/entitlements` شامل `whiteLabel`, `attributionRequired`, `customDomain`, `maxOffers`, `apiRateLimitPerMinute`, `commissionProfileId`, `seoCanonicalMode`.
- نرخ کمیسیون در `AgencyCommissionRule` (per agency + per ProductType) است، نه Entitlements.
- Enforcement: قرارداد + checkout میزبانی‌شده + snippet + بازبینی.

## پیامدها

**مثبت:** مدل درآمد انعطاف‌پذیر، امکان فروش به دو Segment.

**منفی:** پیچیدگی branding، custom domain، SEO policy و پشتیبانی.

## قواعد

- هیچ ویژگی Professional بدون Entitlement فعال نمی‌شود.
- تغییر پلن باید Audit شود.
- Attribution در Standard قابل حذف نیست.

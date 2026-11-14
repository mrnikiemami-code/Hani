# Content Module

> **مسئولیت:** محتوای تحریریه و رشد: بلاگ، سفرنامه، ویدیو، نظرات محتوا، تبلیغات، خبرنامه/SMS، کمپین (Blind Tour)، اعلان‌ها و آنالیتیکس.

## چرا ماژول جدا؟

Content یک bounded context مستقل از Catalog/Booking است: محتوا و growth چرخه انتشار و moderation خودشان را دارند و نباید داخل Catalog یا Marketplace قاطی شوند. فقط شناسه کاربر و مقصد به‌صورت id نگهداری می‌شود.

## اجزای اصلی

| نوع | مسئولیت |
|---|---|
| `ContentCategory` | دسته‌بندی بلاگ/ویدیو با ترجمه |
| `BlogPost` | پست بلاگ چندزبانه + SEO + view/like |
| `Travelogue` | سفرنامه چندزبانه + series + destination tags |
| `Video` | ویدیو Aparat/MP4 + level + duration + view/like |
| `ContentComment` | کامنت moderation برای Blog/Travelogue/Video |
| `AdSlot` / `AdCreative` | اسلات و کریتیو تبلیغاتی |
| `AdEvent` | impression/click |
| `NewsletterSubscription` | رضایت‌نامه Email/SMS + verification |
| `Campaign` / `CampaignRegistration` | کمپین/Blind Tour + ثبت‌نام |
| `Notification` | صف اعلان داخلی |
| `AnalyticsEvent` | رخداد آنالیتیکس |

## APIهای عمومی

| Method | Path | توضیح |
|---|---|---|
| GET | `/market/v1/content/blog` | جستجوی بلاگ |
| GET | `/market/v1/content/blog/{slug}` | جزئیات بلاگ + view increment |
| POST | `/market/v1/content/blog/{slug}/comments` | کامنت Pending |
| POST | `/market/v1/content/blog/{slug}/like` | لایک |
| GET | `/market/v1/content/travelogues` | جستجوی سفرنامه |
| GET | `/market/v1/content/travelogues/{slug}` | جزئیات سفرنامه |
| GET | `/market/v1/content/videos` | جستجوی ویدیو |
| GET | `/market/v1/content/videos/{slug}` | جزئیات ویدیو |
| GET | `/market/v1/content/authors/{userId}/stats` | آمار محتوای نویسنده |
| GET | `/market/v1/content/trending` | رتبه‌بندی محتوا |
| GET | `/market/v1/growth/analytics/summary` | خلاصه آنالیتیکس |
| GET | `/market/v1/growth/ads/{slotCode}` | کریتیوهای فعال |
| POST | `/market/v1/growth/ads/events` | ثبت impression/click |
| POST | `/market/v1/growth/newsletter/*` | subscribe/verify/unsubscribe |
| GET | `/market/v1/growth/campaigns` | کمپین‌های فعال |
| GET | `/market/v1/growth/campaigns/{slug}` | جزئیات کمپین |
| POST | `/market/v1/growth/campaigns/{slug}/register` | ثبت‌نام |
| GET | `/market/v1/gamification/users/{userId}` | points/level/travelStyle/badges |
| GET | `/market/v1/gamification/badges` | تعریف نشان‌ها |

## APIهای داخلی

`/internal/v1/content/*` برای ساخت/انتشار و moderation؛ `/internal/v1/growth/*` برای اسلات/کمپین/اعلان/آنالیتیکس؛ `/internal/v1/gamification/*` برای points/badge.

## Persistence

- Schema: `content`
- جداول: `content_categories`, `blog_posts`, `travelogues`, `videos`, `content_comments`, `ad_slots`, `ad_events`, `newsletter_subscriptions`, `campaigns`, `campaign_registrations`, `notifications`, `analytics_events` و جدول‌های ترجمه/owned.
- Migration: `InitialContent`.

## قواعد

- هیچ زبان/کالچری hard-code نمی‌شود؛ locale با `ILanguageCatalog` اعتبارسنجی می‌شود.
- محتوای چندزبانه از `Translations` با fallback از زبان پیش‌فرض config خوانده می‌شود.
- کامنت‌ها تا moderation منتشر نمی‌شوند.
- تبلیغات فقط کریتیو فعال و در بازه زمانی را برمی‌گردانند.

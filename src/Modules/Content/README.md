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
| GET | `/market/v1/dashboard/{userId}` | Dashboard summary |
| GET | `/market/v1/dashboard/{userId}/messages` | پیام‌ها |
| GET | `/market/v1/dashboard/{userId}/documents` | مدارک |
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


## Gate 8 ? Content sitemap

- Public endpoint: `GET /content-sitemap.xml`.
- Includes published blog posts, travelogues, and videos.
- Emits hreflang alternates for every language in `ILanguageCatalog`.
- `robots.txt` advertises both the marketplace and content sitemaps.


## Gate 8.1 ? Lastsecond parity

- JSON-LD endpoints for BlogPosting, Travelogue Article, and VideoObject.
- Blog destination tags and related-post endpoint.
- HTTP email/SMS notification sender; missing provider configuration falls back
  to structured logging.

## Content Entry CMS

- Admin list: `GET /internal/v1/content-entries?page=&pageSize=&q=&type=&status=`
- Admin edit lookup: `GET /internal/v1/content-entries/{id}`
- Create/update: `POST /internal/v1/content-entries`, `PUT /internal/v1/content-entries/{id}`
- Lifecycle: publish, unpublish, schedule, delete, and revision restore
- Public read: `GET /market/v1/content-entries/{slug}`
- Bodies are rich HTML from CKEditor; public rendering sanitizes tags and CSS
  styles before output.
- Admin UI: `/[locale]/admin/content` is the table; create and edit use
  `/[locale]/admin/content/new` and `/[locale]/admin/content/{id}`.

## Media Library

- List: `GET /internal/v1/content-media?page=&pageSize=&q=&folderId=`
- Edit lookup: `GET /internal/v1/content-media/{id}`
- Upload: `POST /internal/v1/content-media`
- Metadata update: `PUT /internal/v1/content-media/{id}`
- Replace binary: `POST /internal/v1/content-media/{id}/replace`
- Admin list uses a filterable, paginated template table; create and edit are
  separate routes under `/[locale]/admin/media`.

## Operations: support and notifications (2026-11-18)

- `SupportTicket` + `SupportMessage` persist customer/admin threads and
  internal notes in `content.support_tickets` and `content.support_messages`.
- Admin endpoints cover ticket list, create, detail, reply, internal notes,
  status, priority, and assignee changes.
- `Notification.Retry()` requeues a permanently failed outbox item. Admin
  retry is audited through the identity governance audit log.
- Admin routes: `/admin/support/tickets`, `/admin/notifications`,
  `/admin/reports`, `/admin/marketing/ads`.
- Migration: `AddSupportTickets`.

## Support SLA and disputes (2026-11-19)

- First-response SLA is derived from ticket priority: Urgent 2h, High 8h,
  Normal 24h, Low 72h. The admin read model returns `SlaDueAt`,
  `FirstResponseAt`, and a `SlaState` of `Met`, `AtRisk`, `Breached`, or
  `Pending`.
- `SupportDispute` persists refund, cancellation, service-quality, pricing,
  no-show, and other disputes in `content.support_disputes`, optionally tied
  to an order and amount.
- Disputes move through `Open`, `Investigating`, `AwaitingCustomer`, then a
  terminal `Resolved` or `Rejected` state. Terminal states require a
  resolution and cannot be changed again.
- Admin endpoints: ticket list/detail/thread/update, dispute list/create/status,
  and `/internal/v1/admin/support/report`.
- Admin routes: `/admin/support/tickets`, `/admin/support/disputes`, and
  `/admin/support/reports`.
- Migration: `AddSupportDisputes`.

## Notification delivery modes

- `Notifications:Mode=Log` logs deliveries and is the local/test default.
- `Notifications:Mode=Http` uses the HTTP email/SMS provider with a named
  `notifications` HttpClient, bearer authentication, request timeouts, and
  `Idempotency-Key`/`X-Hani-Channel`/`X-Hani-Template` headers.
- Failed provider responses throw so the outbox retries with exponential
  backoff (5 attempts). Production startup requires `Mode=Http` unless
  `AllowLogInProduction` is explicitly set.

## Customer support portal (2026-11-19)

- `ICustomerSupportService` provides authenticated customer ticket reads,
  replies, and dispute creation under `/market/v1/support`.
- Customers only see tickets where `user_id` matches their JWT; internal notes
  are removed from customer DTOs.
- Customer replies create an email notification for the assigned admin when one
  exists. Admin replies and dispute status changes create customer notifications
  in the outbox.
- UI routes: `/user/support`, `/user/support/{id}`, `/user/support/new`, and
  `/user/support/disputes`.

## Support attachments and read state (2026-11-19)

- `SupportAttachment` stores private ticket files in `content.support_attachments`
  and on disk under `Support:Attachments:RootPath` (never a public URL).
- Allowed types: JPEG, PNG, WebP, PDF, and plain text; maximum 10 MB.
- Customers can upload/download only attachments on their own tickets and only
  from non-internal messages. Administrators can download any attachment.
- `SupportTicket.CustomerLastReadAt` and `AdminLastReadAt` drive unread badges
  and are updated when the corresponding side opens the ticket.
- Outbox payloads for support notifications include a `deepLink` to the
  customer or admin ticket route.
- Migration: `AddSupportAttachmentsAndReadState`.

## Support security and inbound email (2026-11-19)

- Uploads are scanned through the `ISupportAttachmentScanner` port. When
  `Support:Attachments:ClamAvEnabled=true`, a ClamAV INSTREAM adapter rejects
  infected files before metadata is persisted. Production startup requires the
  scanner to be enabled.
- Image attachments receive a private 320px WebP thumbnail; thumbnails are
  downloaded through authenticated endpoints and are never public URLs.
- Upload endpoints are limited to 10 files per minute per user/IP.
- `POST /internal/v1/support/inbound-email` accepts an HMAC-signed provider
  payload. A subject containing `SUP-XXXXXXXX` appends to that ticket; otherwise
  a new `Email` category ticket is created.
- Support ticket numbers now use the random suffix of the UUID to avoid
  rapid-creation collisions.

## Real-time support and retention (2026-11-19)

- SignalR hub `/hubs/support` pushes `SupportMessageAdded` and
  `SupportDisputeUpdated` events to owner/agent ticket groups.
- Inbound email deduplicates by `ProviderMessageId`; a repeated provider message
  returns the original ticket with `duplicate=true`.
- Pending unlinked attachments older than
  `Support:Attachments:PendingRetentionHours` are purged by a background service
  together with their private thumbnails.
- CORS for the browser hub is configured through `Cors:AllowedOrigins`.

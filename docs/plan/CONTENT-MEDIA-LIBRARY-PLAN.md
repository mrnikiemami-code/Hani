# Content Media Library Plan

Date: 2026-11-17

Status: Phase 1 implemented; phases 2–5 in progress.

Decision: [`../adr/0034-content-media-library.md`](../adr/0034-content-media-library.md)

## Goal

A professional content and media library with:

- WebP-first image pipeline
- responsive variants
- SEO metadata
- local/cloud storage abstraction
- admin media management
- content revisions and usage tracking

## Phase 1 — implemented

### Backend

- `MediaAsset` and `MediaVariant` domain model.
- `content.media_assets` and `content.media_variants` EF tables.
- SkiaSharp conversion of every supported upload to WebP (license-safe).
- Variants at 320/640/1280/1920 plus source width.
- SHA-256 content hash and deduplication.
- EXIF removal on encoded output.
- Local content storage under `wwwroot/media`.
- Admin-only endpoints:
  - `GET /internal/v1/content-media`
  - `POST /internal/v1/content-media`
  - `PUT /internal/v1/content-media/{id}`
  - `DELETE /internal/v1/content-media/{id}`
- Required alt text, 15 MB limit, pixel limit.

### Admin UI

- `/[locale]/admin/media`
- template agency shell
- upload form with alt/caption/credit
- WebP preview grid
- dimensions, original size, variant count
- inline alt editing
- delete
- public URL display

### Example

Uploading `tours-07.jpg` produces:

```text
/media/{hash}/320.webp
/media/{hash}/600.webp
```

The API returns WebP URLs and canonical dimensions.

## Phase 2 — responsive SEO delivery

- `<picture>` / `srcset` component using variants.
- `sizes` presets for hero/card/detail.
- `loading`, `fetchpriority`, width/height.
- LCP preload for hero.
- image sitemap.
- OG image variant.
- CDN/public base URL switch.

## Phase 3 — library operations

- folders and tags
- usage tracking (`media_usages`)
- replace file without changing media id
- crop and focal point
- bulk actions
- storage quota per agency
- audit log

## Phase 4 — content CMS

- pages, sections, banners, articles
- locale translations
- draft/publish/schedule
- revisions
- media references
- SEO fields per content item

## Phase 5 — cloud storage

- S3/R2/Arvan adapter
- presigned direct upload
- CDN invalidation
- migration/copy tool
- storage health/quotas
- signed URLs for private media

## Acceptance criteria

- Every uploaded image is available as WebP with responsive widths.
- Alt text is required.
- No blob is stored in PostgreSQL.
- Local and cloud storage are interchangeable through configuration.
- Admin can upload, inspect, edit alt, and delete media.
- Public assets have immutable, cacheable URLs.
- SEO consumers use width/height and srcset in phase 2.

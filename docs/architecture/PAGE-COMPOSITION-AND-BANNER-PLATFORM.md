# Hani Page Composition & Banner Platform

> Status: Phase 1 foundation implemented; Phase 2 started.
> Related gaps: GAP-12 (content), GAP-27 (admin panels), GAP-28 (SEO),
> GAP-30 (ads), GAP-32 (media), GAP-34 (analytics).

## 1. Problem

The storefront still contains many hardcoded images, headings, banners, and
template sections. The current `/admin/home` page only controls:

- one hero image URL
- section visibility
- section order

It does not let an editor change the content inside a section, choose media
from the library, add a reusable content section, or place a banner on a
specific page and slot. The same gap exists on tour, visa, hotel, flight, and
static pages.

The target is a single page-composition platform that can control every public
page without code changes, while keeping SEO pages static/ISR and keeping the
Dreamstour template as the visual source.

## 2. Current state

### Existing and reusable

- `ContentEntry` with Page/Banner/Article/Section types, draft/publish,
  revisions, scheduling, rich text, hero media.
- Media library with upload, folders, tags, focal point, variants, usage/audit.
- `AdSlot` and `AdCreative` with start/end, impressions, and clicks.
- Home settings persisted as JSON in `content.home_page_settings`.
- Public `/content/{slug}` renderer for CMS pages.
- Admin media and content editors.

### Gaps

- Home settings store `section.imageUrl` but the public home renderer ignores it.
- Home section content is hardcoded to data components; titles, subtitles,
  backgrounds, CTAs, and item selection are not editable.
- Banner and Section entries exist but have no page/placement binding.
- Ad slots exist but no public page renders them and the admin has no
  page/slot/device/locale placement UI.
- Header, footer, about, contact, FAQ, legal, listing heroes, and detail-page
  media are still hardcoded in template components.
- No page draft/preview/publish model for compositions.
- No image slot registry; pages use raw asset paths and duplicated fallbacks.
- No cache tags/invalidation for page compositions.

## 3. Target architecture

### 3.1 Page composition model

Add a Content-module aggregate:

```text
PageComposition
- Id
- PageKey        e.g. home, tours, tours.foreign, visa, visa.detail,
                 hotel.detail, flights, about, contact, header, footer
- Locale         fa | en | ar
- Status         Draft | Published | Scheduled
- Version
- SectionsJson
- SeoJson
- PublishedAt
- CreatedAt / UpdatedAt
```

`SectionsJson` is an ordered array of `PageSection` objects:

```json
{
  "id": "uuid",
  "type": "hero",
  "enabled": true,
  "order": 10,
  "variant": "template-default",
  "title": "...",
  "subtitle": "...",
  "body": "...",
  "mediaId": "uuid",
  "fallbackImageUrl": "/assets/...",
  "cta": { "label": "...", "href": "/tours" },
  "source": { "mode": "auto|manual|collection|content", "ids": [], "limit": 6 },
  "settings": {}
}
```

`PageDefinition` stays in code as a registry of allowed page keys, section
types, variants, required fields, and permissions. Editors can only compose
what the registry allows; the API validates every section.

### 3.2 Section library

Initial section types:

| Type | Purpose |
|---|---|
| `hero` | title, subtitle, background media, overlay, CTA, optional video |
| `search` | flight / hotel / tour / visa search form |
| `banner` | image, link, alt, placement, dates |
| `richText` | heading + rich text + optional image |
| `cardGrid` | manual cards (image, title, text, link) |
| `tourCollection` | auto/latest/manual tours, scope, limit, layout |
| `visaCollection` | auto/latest/manual visas |
| `hotelCollection` | auto/latest/manual hotels |
| `stats` | number + label items |
| `testimonials` | real reviews or editor-managed quotes |
| `faq` | question/answer items |
| `cta` | title, text, button |
| `gallery` | media library gallery |
| `logos` | partner/airline logos |
| `contentEntry` | reference a reusable ContentEntry Section |
| `customHtml` | restricted, sanitized, permission-gated |

Every section supports `enabled`, `order`, `locale`, `media`, `alt`, and a
template `variant`.

### 3.3 Media and image slots

- Every configurable image uses `mediaId` with optional fallback URL.
- The admin uses the existing media picker; uploads go to the media library.
- Renderer resolves `mediaId` to the canonical WebP URL, width/height, alt,
  focal point, and responsive sizes.
- Add an `ImageSlot` component and a registry of expected image slots per page
  so audits can find missing alt text or oversized images.
- Deprecate raw `/assets/...` paths in configurable page components.

### 3.4 Banner and ad placement

Extend `AdSlot` with placement metadata:

```text
AdSlot.PageKey      home, tours, visa.detail, hotel.detail, ...
AdSlot.SlotKey      hero, below-hero, sidebar, between-sections, footer
AdSlot.Locale       optional locale filter
AdSlot.Device       all | desktop | mobile
AdSlot.Priority
```

`AdCreative` adds `MediaAssetId`, `AltText`, and optional `Label`
(“Sponsored”). The public renderer calls the existing ad-slot endpoint and
tracks impressions/clicks. Editorial banners can use the same placement model
with `Label = null`.

Convention: `PageKey.SlotKey` is stable and used by both admin and frontend.
`home.hero`, `home.between-tours`, `visa.detail.sidebar`, etc.

### 3.5 Admin IA

Add under **Content**:

- `Pages` — page list, locale tabs, draft/published state.
- `Page builder` — section palette, canvas with up/down/reorder, settings
  drawer, media picker, preview, save draft, publish.
- `Sections` — reusable ContentEntry Section blocks.
- `Media` — existing library.
- `Global chrome` — header, footer, logo, contact, social links, newsletter,
  app badges.

Extend under **Marketing**:

- `Banners & placements` — page key, slot key, locale, device, image/link,
  schedule, priority, active toggle, preview, impressions/clicks.

### 3.6 Public rendering and SEO

- `PageCompositionRenderer` server component with a registry from section type
  to template component.
- Page metadata comes from `SeoJson` plus section content.
- Page composition is fetched with cache tags:
  `page:{pageKey}:{locale}`. Publishing invalidates the tag.
- Public pages remain static/ISR; only admin preview and personalized routes
  are dynamic.
- Listing/filter URLs remain canonicalized and noindex where appropriate.
- Media alt text and dimensions are required for SEO and CLS.
- Draft preview uses a signed preview cookie/token and `noindex`.

### 3.7 Permissions and audit

- `content.page.view`, `content.page.edit`, `content.page.publish`
- `marketing.banner.edit`, `marketing.banner.publish`
- `media.view`, `media.upload`
- Every publish and placement change is audited with before/after JSON.
- Preview links are scoped to the editor session and expire.

## 4. Phases

### Phase 0 — Inventory and contracts (1–2 days)

Deliverables:

- Page registry: every public page key and route.
- Image inventory: every hardcoded image and its intended slot.
- Section schema v1 and validation rules.
- Admin route map and permission names.
- Migration strategy from `home_page_settings` to `home` composition.

Acceptance:

- No page or image is left unclassified.
- Home is first-class in the registry with all current sections mapped.

### Phase 1 — Composition foundation (4–6 days)

Deliverables:

- `PageComposition` aggregate, repository, migration, endpoints.
- `PageDefinition`/section registry with server-side validation.
- Admin Pages list and builder skeleton.
- Media picker and `ImageSlot` renderer.
- `PageCompositionRenderer` and home fallback adapter.
- Draft/publish and cache tags.

Acceptance:

- Home can be opened in the builder and saved as draft/published.
- Unknown sections are rejected.
- Public home still renders with fallback if no composition exists.

### Phase 2 — Home completion (4–6 days)

Deliverables:

- Hero: title, subtitle, media, overlay, CTA, optional video.
- Every home section: title, subtitle, CTA, background media, variant.
- Section item modes: auto/latest/manual/selected.
- Reusable content sections placed on home.
- Banner slots: hero, between sections, footer.
- Preview and publish.

Acceptance:

- An editor can change every image and every section heading on home without
  code.
- Section order, visibility, and banner placement are editable.
- SEO metadata and JSON-LD still render correctly.

### Phase 3 — Global chrome and static pages (4–6 days)

Deliverables:

- Header: logo, contact, language, auth CTA.
- Footer: columns, social links, app badges, newsletter, legal links.
- About, contact, FAQ, terms, privacy, affiliate, become-an-expert pages.
- Global media slots and fallbacks.

Acceptance:

- Logo and footer/contact details are editable once and reflected everywhere.
- Static pages are fully editable with SEO fields and media.

### Phase 4 — Listing pages (5–7 days)

Deliverables:

- Tours, visas, hotels, flights: hero, intro copy, banner, featured strip,
  SEO copy, empty state.
- Search/filter intro content driven by composition.
- Noindex/canonical rules for filtered URLs.

Acceptance:

- Listing pages can be composed without breaking search/filter behavior.
- SEO canonical/hreflang remains correct.

### Phase 5 — Detail pages and advertising (5–7 days)

Deliverables:

- Tour detail, visa detail, hotel detail: gallery, intro, CTA, content blocks,
  related sections.
- Banner/ad placements with page/slot/locale/device/schedule/priority.
- Impression/click tracking and “Sponsored” label.

Acceptance:

- Banners can be assigned to a specific page and slot and expired automatically.
- Paid placement never changes organic ranking.

### Phase 6 — Governance and rollout (3–5 days)

Deliverables:

- Preview links, scheduled publish, revision restore for page compositions.
- Audit coverage, permission checks, media usage audit.
- Cache invalidation and Lighthouse/SEO regression checks.
- Removal of remaining hardcoded images in migrated pages.

Acceptance:

- Draft preview is noindex and cannot leak publicly.
- Publishing invalidates only the affected page/locale.
- Lighthouse SEO ≥ 95 and no new accessibility regressions.

## 5. Risks and decisions

- **Do not replace the template with a generic page builder.** Section types
  must map to existing Dreamstour template patterns.
- **Do not make public pages dynamic for editing.** Use ISR/cache tags and
  preview tokens.
- **Do not let arbitrary HTML become the default.** Rich text and structured
  sections first; custom HTML only with permission and sanitization.
- **Media first.** Every image must resolve through the media library or an
  explicit fallback slot.
- **Backward compatibility.** Existing `home_page_settings` is migrated into
  the `home` composition; public rendering keeps a fallback.
- **SEO guardrails.** Canonical, hreflang, sitemap, JSON-LD, alt text, and
  image dimensions are part of the section contract, not optional extras.

## 6. First implementation slice

Start with Phase 0 + Phase 1, then complete home in Phase 2:

1. Define page keys and section schemas.
2. Add `PageComposition` persistence and admin endpoints.
3. Build the admin page list and home builder.
4. Migrate the current home settings and hardcoded home images into the
   composition.
5. Add media picker, preview, publish, and cache invalidation.
6. Verify FA/EN/AR and Lighthouse/SEO.

## Implementation status (2026-11-20)

- Phase 1 foundation is implemented:
  - draft/published page composition storage
  - public/admin page composition endpoints
  - admin `/admin/content/pages` list and `/admin/content/pages/[pageKey]`
  - hero, sections, media picker, SEO, save draft, publish
  - published `home` composition feeds hero fallback image and known section
    order/visibility
- Phase 2 has started:
  - generic composed section renderer (`CompositionSection`)
  - composed hero title
  - generic sections appended after known home sections
- Still pending:
  - full section content adapters for all home sections
  - banner placement UI
  - global chrome/static/listing/detail page migration
  - preview links, revisions, cache-tag invalidation

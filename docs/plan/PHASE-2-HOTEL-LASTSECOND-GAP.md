# Phase 2 — Hotel Catalog Parity with Lastsecond

- Status: Planning update (2026-11-18)
- Scope: Hotel content, media, amenities, rooms, reviews, filters, and public detail
- Benchmark: `https://lastsecond.ir/hotels` and a sample detail page
- Sample: `https://lastsecond.ir/hotels/5449-konak-park-hotel`
- Hani owner: Catalog module + Content media + Booking inquiries + Reviews

## 1. Purpose

Hani must not ship a hotel form that only stores name, stars, address, and a few photos. Lastsecond's hotel pages expose a much richer decision surface: destination context, gallery, amenities, review breakdown, city rank, recommendation percentage, contact details, policies, and a reservation-request flow.

This document records the gap between Lastsecond and the current Hani hotel model and adds the missing items to the Phase 2 plan.

## 2. Benchmark fields observed on Lastsecond

### 2.1 Hotel list

- Hotel localized name and English name
- Slug and internal numeric id
- Hero image
- Star rating
- City and country
- Destination hierarchy
- User rating (0–5)
- Review count
- Rank in city (`11 از 79 هتل`)
- Recommendation percentage and vote count
- Destination filters with counts
- Star filters with counts
- Amenity filters grouped by category with counts
- Rating filters
- Search by hotel name
- Sorting
- Total hotel count
- Pagination

### 2.2 Hotel detail

- Localized name and English name
- Breadcrumb hierarchy: continent → country → city → hotel
- Star rating and hotel type label
- City/location
- Recommendation percentage and votes
- Rank in city
- About/description
- Amenity groups: General, Internet, Recreation, etc.
- Gallery with categories (food/restaurant, public areas, rooms, etc.)
- User-submitted photos
- Address
- Phone
- Website
- Review summary:
  - overall rating
  - food quality
  - cleanliness
  - staff
  - entertainment/facilities
  - location
  - value
- Reviews:
  - author
  - review date
  - stay date
  - stay type (family/couple/solo/business/other)
  - text
  - photos
  - helpful votes
  - category ratings
- Review filters: time and category
- Owner claim (“آیا صاحب این کسب‌وکار هستید؟”)
- Reservation request:
  - check-in/check-out
  - rooms
  - adults
  - children
  - request submission
- `LodgingBusiness` JSON-LD:
  - name
  - image
  - location
  - starRating
  - telephone
  - address
  - aggregateRating
  - datePublished/dateModified

Lastsecond is primarily a content/review + reservation-inquiry experience; it does not expose live room inventory on this page. Hani additionally needs agency offers, rates, availability, and booking/payment, but those are marketplace additions, not replacements for the content parity above.

## 3. Gap matrix

Legend:

- **Have** — current Hani model/API/UI supports it.
- **Partial** — model or API exists, but data/UI/workflow is incomplete.
- **Missing** — must be added to Phase 2.
- **P0** — required before the hotel form is considered complete.
- **P1** — required for Lastsecond-equivalent detail quality.
- **P2** — enhancement.

| Area | Lastsecond | Hani today | Status | Action | Priority |
|---|---|---|---|---|---|
| Slug/identity | slug + numeric id | slug | Have | Keep stable public URL | — |
| Localized name | FA + EN | `HotelTranslation` per locale | Have | Ensure FA/EN/AR completeness | P0 |
| Description | about section | translation description | Partial | Rich text with sanitization | P0 |
| Destination hierarchy | continent/country/city | `Destination.ParentId` exists; hotel stores one destination id | Partial | Expose ancestry + city/country in hotel DTO/UI | P0 |
| Star rating | 1–5 | `Stars` | Have | Keep | — |
| Hotel/property type | label/type | no property type | Missing | Add `PropertyType` (hotel, resort, apartment, boutique, etc.) | P1 |
| Address | full address | `Address` | Have | Keep | — |
| Coordinates/map | map | lat/lng | Have | Add map picker/preview in admin | P1 |
| Phone | yes | missing | Missing | Add `ContactPhone` | P0 |
| Website | yes | missing | Missing | Add `WebsiteUrl` | P1 |
| Check-in/out | policy area | missing | Missing | Add check-in/out fields | P1 |
| Hotel policies | cancellation/children/pets | missing | Missing | Add policy model + translations | P0 |
| SEO title/description | page metadata | no hotel SEO fields | Missing | Add SEO title/description/canonical/OG media | P0 |
| Publication state | public page | no hotel status | Missing | Draft → validation → approved → published → suspended | P0 |
| Gallery | categorized gallery | images URL/caption/sort | Partial | Add category, alt, cover, media asset id, sort | P0 |
| User photos | separate user gallery | `UserPhotos` DTO hint only | Partial | Persist provenance/moderation and show separately | P1 |
| Image optimization | responsive photos | media library exists | Partial | Link hotel gallery to `MediaAsset`/variants | P0 |
| Amenities | grouped + counts | category/name strings | Partial | Add amenity catalog code, icon, group, sort, localized labels | P0 |
| Amenity filters | counts and categories | one amenity string filter | Partial | Filter by catalog codes, grouped UI counts | P1 |
| Rooms | no live inventory on Lastsecond detail | name/type/meal/adults/children/price/currency | Have | Keep | — |
| Room inventory | not shown | missing | Missing | Availability, allotment, stop-sell, min-stay | P0 for Hani commerce |
| Rate plans | not shown | one price per room | Missing | Rate plan, refundability, cancellation, tax | P0 |
| Occupancy | adults/children | adults/children | Have | Add max occupancy/extra bed | P1 |
| Room size/bed type/view | not in extracted content | missing | Missing | Add structured room attributes | P2 |
| Reviews | full UGC with categories | Review module supports categories, stay type, visit date, photos, helpful | Partial | Connect hotel detail aggregate + list + breakdown | P0 |
| Overall rating | yes | `AverageRating` | Have | Ensure computed from approved reviews | P0 |
| Review count | yes | `ReviewCount` | Have | Ensure approved only | P0 |
| Recommendation % | yes | DTO field exists | Partial | Compute from review votes and expose | P1 |
| Rank in city | yes | DTO field exists | Partial | Compute by approved rating within destination | P1 |
| Category rating breakdown | yes | Review entity has fields | Partial | Expose category averages | P0 |
| Stay date/type | yes | Review entity has fields | Partial | Expose and filter | P1 |
| Review photos | yes | ReviewPhoto exists | Partial | Public display + moderation | P1 |
| Helpful votes | yes | ReviewHelpful exists | Partial | Public count/action | P2 |
| Owner claim | yes | OwnershipClaim module exists | Partial | Add hotel claim entry point | P2 |
| Reservation request | dates/rooms/adults/children | hotel inquiries exist | Partial | Reuse template booking request widget; no online availability claim | P0 |
| Search filters | destination/star/amenity/rating | destination/minStars/amenity/q/sort | Partial | Add rating filter and grouped amenity UI | P1 |
| Price filter | not on content page | priceFrom exists | Partial | Add price range filter | P2 |
| JSON-LD | LodgingBusiness | not confirmed | Missing | Add Hotel/LodgingBusiness schema | P0 |
| Canonical/hreflang | SEO page | not confirmed | Missing | Add hotel canonical + locale alternates | P0 |
| Sitemap | hotel pages indexed | hotel sitemap? | Partial | Add published hotel sitemap entries | P1 |
| Publication/audit | not exposed | no hotel audit | Missing | Add status + audit events | P0 |

## 4. Phase 2 additions (must be in scope)

### 4.1 Hotel content model

Add to `Hotel`:

- `PropertyType` enum/value
- `ContactPhone`
- `WebsiteUrl`
- `CheckInTime` / `CheckOutTime`
- `Policies` (children, pets, cancellation, extra bed) — localized text
- `Status` (`Draft`, `InReview`, `Published`, `Suspended`, `Archived`)
- `SeoTitle`, `SeoDescription`, `CanonicalUrl`
- `CoverImageId` / primary gallery image
- `PublishedAt`, `UpdatedAt`

Add to translations:

- short description
- full rich description
- policy text per locale
- SEO per locale

### 4.2 Hotel media

Add to `HotelImage`:

- `MediaAssetId` (Media Library)
- `Category` (rooms, restaurant, pool, lobby, exterior, user)
- `AltText`
- `IsCover`
- `Source` (`Hani`, `Agency`, `User`)
- `UploadedByUserId` for user photos
- `ModerationStatus` for user photos

### 4.3 Amenities

Create an amenity catalog:

- stable `Code`
- category
- localized names
- icon
- sort order
- filterable flag

Hotel stores catalog codes, not free-text names. This enables Lastsecond-style grouped filters and counts.

### 4.4 Rooms and rates

Add:

- inventory/allotment
- availability calendar
- stop-sell
- min/max stay
- rate plan
- refundability/cancellation policy
- tax/fee components
- occupancy and extra bed
- room size, bed type, view

### 4.5 Reviews and trust

- Public hotel rating summary from approved reviews only.
- Category averages.
- Recommendation percent.
- City rank.
- Review list with stay date/type, photos, helpful votes.
- Moderation for user photos and reviews.
- Owner claim entry point.

### 4.6 Booking request

- Reuse the template hotel reservation widget:
  - check-in/check-out
  - rooms
  - adults
  - children
- Submit as `HotelInquiry`; do not promise live availability.
- Show SLA and agency response state.
- Connect inquiry to agency and order detail.

### 4.7 SEO and schema

- Canonical and hreflang.
- Hotel/LodgingBusiness JSON-LD.
- Open Graph image from cover media.
- Published hotel entries in sitemap.
- Jalali date display, Gregorian API/DB.

### 4.8 Admin hotel editor

Reuse the purchased template's add-hotel/edit-hotel page structure. Do not build a parallel design. Add tabs:

1. Basic information
2. Location
3. Contact and policies
4. Gallery and media
5. Amenities
6. Rooms and rates
7. Reviews
8. SEO
9. Publication and audit

## 5. Implementation order for Phase 2 hotel slice

### Slice A — content and detail parity

1. Hotel status and publication fields.
2. Contact, website, check-in/out, policies.
3. Destination ancestry in public DTO.
4. Media library categories/alt/cover.
5. Amenity catalog.
6. Public hotel detail sections.
7. JSON-LD/canonical/sitemap.

### Slice B — reviews and trust

1. Category rating aggregates.
2. Recommendation percent and city rank.
3. Review list and filters.
4. User photos + moderation.
5. Owner claim entry.

### Slice C — commerce

1. Room inventory/availability.
2. Rate plans/taxes/cancellation.
3. Hotel reservation inquiry flow.
4. Agency offer integration.
5. Publication workflow and price-mismatch reporting.

## 6. Acceptance checklist for hotel parity

- A hotel can be created with FA/EN/AR content, property type, stars, address, coordinates, phone, website, check-in/out, and policies.
- Gallery supports cover, category, alt text, media variants, and user-photo provenance.
- Amenities are catalog-backed, grouped, localized, and filterable.
- Hotel page shows destination ancestry, rating, review count, recommendation percentage, and city rank.
- Hotel page shows category rating breakdown and approved reviews with stay date/type.
- Hotel page has canonical, hreflang, Open Graph, and LodgingBusiness JSON-LD.
- A reservation request can be submitted with dates, rooms, adults, and children, and appears in admin inquiries.
- Hotel publication has draft/review/published/suspended states and audit history.
- IRR and USD room/rate components remain separate; no cross-currency sum without FX.

## 7. Implementation update (2026-11-18)

Covered in the first parity slice:

- property type
- contact phone and website
- check-in and check-out times
- hotel lifecycle status
- SEO title and description
- gallery category, alt text, cover flag, source, and optional media asset id
- admin hotel editor route at `/[locale]/admin/products/hotels/{id}`
- publication filtering on public hotel read paths

Covered in the second parity slice:

- public hotel detail route `/[locale]/hotel/{slug}`
- gallery, amenities grouped by category, rooms and rates, contact, check-in/out
- review summary, category rating breakdown, review list with photos/stay type
- reservation-request widget connected to hotel inquiries
- LodgingBusiness JSON-LD, canonical metadata, hotel sitemap
- owner-claim entry point

Covered in the third parity slice:

- localized hotel policies text per translation
- amenity code, icon, category, and sort order with admin editing
- room inventory, max occupancy, room size, bed type, view, rate plan,
  cancellation policy, tax percentage, and stop-sell flag
- review helpful/report actions in the public UI
- admin moderation page for pending reviews and user photos

Remaining as a follow-up refinement:

- public amenity filter counts grouped by catalog code
- date-based availability calendar and stop-sell scheduling
- online availability hold versus the current inquiry-only booking request

## 8. Planning decision

The hotel form is **not complete** with the current fields. Lastsecond parity requires the additions above. Slice A and Slice B are part of Phase 2; Slice C is required before Hani sells hotel inventory online.

The existing hotel read-only admin table remains valid, but the create/edit form and public detail page must not be marked complete until this checklist passes.

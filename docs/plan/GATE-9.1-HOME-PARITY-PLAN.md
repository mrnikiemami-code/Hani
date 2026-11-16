# Gate 9.1 — Lastsecond Homepage Parity+ Implementation Plan

- Status: Complete — Phase 1–4, home and listing Lighthouse 100
- Date: 2026-11-16
- Benchmark report: [`../reports/lastsecond-homepage-benchmark-2026-11-16.md`](../reports/lastsecond-homepage-benchmark-2026-11-16.md)
- Visual source: purchased Dreamstour template only
- UX/IA benchmark: Lastsecond homepage
- Locales: `fa`, `en`, `ar`
- Mandatory: no parallel design, no new card/button/form style, no horizontal overflow, mobile-first review

## 1. URL mapping

| Lastsecond | Hani equivalent |
|---|---|
| `https://lastsecond.ir/` | `http://localhost:3000/fa` |
| `https://lastsecond.ir/tours` (foreign) | `http://localhost:3000/fa/tours?scope=foreign` |
| `https://lastsecond.ir/tours/تور-ایرانگردی` (domestic) | `http://localhost:3000/fa/tours?scope=domestic` |
| `https://lastsecond.ir/visa` | `http://localhost:3000/fa/visa` |
| `https://lastsecond.ir/hotels` | `http://localhost:3000/fa/hotels` |
| `https://lastsecond.ir/itineraries` | `http://localhost:3000/fa/itineraries` |
| `https://lastsecond.ir/blog` | `http://localhost:3000/fa/blog` |
| `https://lastsecond.ir/safarsaz` | `http://localhost:3000/fa/safarsaz` |

Rules:

- Homepage tabs are local UI state. They do not change URL or document head.
- Search submit navigates to the canonical listing route:
  - foreign → `/{locale}/tours?scope=foreign`
  - domestic → `/{locale}/tours?scope=domestic`
- The listing route remains server-rendered and shareable.
- No duplicate home page and no parallel tour page.

## 2. Template-first composition

The default home remains the existing template home experience
(`all-services-classic` / `homeServiceOne`). We do not replace the template
shell, header, hero card, card styles, or footer.

### 2.1 Section mapping

| Lastsecond section | Hani template source | Change |
|---|---|---|
| Header + mega menu | existing common header | add/normalize menu links to Hani canonical routes |
| Hero search card | `hero-sec-eight` + `banner-form` | set Tour as default active service; add domestic/foreign scope tabs inside Tour pane |
| Hero foreign fields | template form controls | origin, destination, departure/return, duration, hotel |
| Hero domestic fields | template form controls | city/type + departure date |
| Special tours | `HaniTrendingTours` / `recommended-list-item` | keep template card; drive from API |
| Latest domestic tours | reusable Hani tour section using `place-item`/`recommended-list-item` | new section, template card only |
| Latest foreign tours | same reusable section | new section, template card only |
| Popular visas | `HaniRecommendedVisas` | already template card; add processing time/cover |
| Tours by origin city | template destination/category card pattern | new API-backed section using template card |
| Latest travelogues | `HaniLatestContent` / template article card | split travelogue subset |
| Magazine | `HaniLatestContent` / template article card | split blog subset |
| Trust/agency proof | `DeliverySection`, `TestimonialSection`, `ChooseSection` | keep template sections |
| Guide/experts | `GuideSection` | keep template section |
| Footer | existing `FooterSection` | keep template footer |

### 2.2 Hero search decision

The template hero has service tabs (flight, hotel, car, cruise, tour, bus,
activity, visa, guide). We keep those tabs because they are part of the
template and serve the all-services product.

Inside the **Tour** tab:

- add a scope switch: `تورهای خارجی | تورهای داخلی`
- use the template `nav` / `nav-link` pattern
- switch only the field schema, not the route
- default active service tab = Tour on the Lastsecond-equivalent home
- the other service tabs remain available and unchanged

This matches Lastsecond's tour search task while preserving the template's
broader service capability.

## 3. Search field schema

### Foreign

| Field | Control |
|---|---|
| Origin | `form-select` / template select |
| Destination | `form-select` / template select |
| Departure date | template date picker |
| Return date | template date range picker |
| Duration | template select |
| Hotel | template select |
| Submit | template `btn btn-secondary` |

### Domestic

| Field | Control |
|---|---|
| City or tour type | template select/combobox |
| Departure date | template date picker |
| Submit | template `btn btn-secondary` |

### Behavior

- Tab switch does not reload the page.
- Tab switch does not change URL, title, canonical, or hreflang.
- Tab switch makes one filter-options request.
- Form fields are semantic and labelled.
- Tab state is announced to assistive technologies.

### Date picker

- Reuse `components/common-date-picker/appDatePicker` and
  `components/common-date-range-picker/CommonDateRange`.
- Do not build a new date-picker style.
- Foreign uses range; domestic uses single date.
- Mobile: full-width trigger, bottom-sheet/modal from template, 44px targets.
- Locale-aware formatting for `fa`, `en`, `ar`.
- Visible focus and accessible names.

## 4. Backend contracts

### Home BFF

Extend the home feed so the page does not make N+1 requests:

```text
featuredTours
latestDomesticTours
latestForeignTours
popularVisas
originCities
latestTravelogues
latestBlog
campaigns
```

Existing `HomeFeedDto` can be extended or split into named sections. One BFF
call should be enough for the first paint.

### Search filter options

Add a server-driven options endpoint, scoped by locale/scope:

```text
GET /market/v1/search/options?locale=fa&scope=Foreign
GET /market/v1/search/options?locale=fa&scope=Domestic
```

Returns:

```text
origins[]
destinations[]
durations[]
hotels[]
```

Cache for a short TTL. No client-side hard-coded city/hotel lists.

### Tour card fields

Required on search/home tour items:

- `coverImageUrl`
- `title`
- `slug`
- `destinationNames`
- `durationDays`
- `tourType`
- `vehicleType`
- `difficulty`
- `agencyName`
- `nextDepartureDate`
- `minPrice`
- `currency`
- `offerCount`
- `averageRating`
- `reviewCount`

### Visa card fields

- `coverImageUrl` (missing today)
- `name`
- `processingTime`
- `minPrice`
- `currency`
- `visaTypeCount`

### Origin-city section

Add `originCities` with:

```text
destinationId
slug
name
tourCount
```

### Editorial cards

- `authorUserId` / display name via BFF enrichment
- `readingTimeMinutes`
- `coverUrl`
- `publishedAt`
- `category`

## 5. SEO plan

The homepage tabs are local state, so they do not create indexable URLs.

### Home metadata

- topical H1 (not brand-only)
- localized title + description per locale
- self canonical per locale
- `hreflang` for `fa`, `en`, `ar`
- OG image + Twitter card
- `Organization`, `WebSite`, `SearchAction` JSON-LD
- `ItemList` for featured tours and visas
- no `user-scalable=no`
- semantic `header`, `nav`, `main`, `footer`

### Listing metadata

- canonical and hreflang on `/{locale}/tours?scope=...`
- `ItemList` + `BreadcrumbList`
- sitemap entries for home and listing
- invalid scope handled explicitly (404 or canonical to `/tours`)
- page > 1 canonical/noindex strategy documented

## 6. Accessibility plan

- tabs: `role=tablist`, `role=tab`, `aria-selected`, `aria-controls`
- keyboard: Left/Right/Home/End
- hero form: native labels for every select/input
- date picker: accessible name and keyboard instructions
- live region for filter/result updates
- focus visible everywhere
- touch targets ≥ 44×44
- contrast ≥ 4.5:1
- no zoom lock
- images: explicit dimensions + alt
- one `main` landmark

## 7. Mobile plan

Mandatory widths: 360, 390, 768, 1024.

- no horizontal overflow
- hero search fields stack cleanly
- scope tabs horizontally scrollable, 44px height
- date picker full-width
- cards single column and image ratio stable
- price/title do not truncate incorrectly in FA/AR
- sticky search only if template already supports it
- test FA/AR RTL and EN LTR
- screenshot review at 390px

## 8. Implementation phases

### Phase 1 — Contracts and data

1. extend home BFF
2. add search options endpoint
3. add missing card fields
4. tests + OpenAPI

### Phase 2 — Hero and tabs

1. Tour default active service
2. domestic/foreign scope switch
3. conditional field schema
4. date picker integration
5. filter-options fetch

### Phase 3 — Home sections

1. featured tours
2. latest domestic
3. latest foreign
4. visas
5. origin cities
6. travelogues/blog split
7. trust/guide sections

### Phase 4 ? SEO and accessibility ? complete

1. metadata/canonical/hreflang ? done
2. JSON-LD (Organization/WebSite/SearchAction/ItemList/BreadcrumbList) ? done
3. OG/Twitter ? done
4. labels/landmarks/keyboard/skip-link ? done
5. sitemap/robots ? done
6. home Lighthouse: SEO 100 / Accessibility 100 / Best Practices 100
7. listing Lighthouse: SEO 100 / Best Practices 100 / Accessibility 100
8. FA/EN/AR home: SEO 100 / Accessibility 100 / Best Practices 100
9. Playwright regression: metadata, JSON-LD, sitemap/robots, invalid query fallback

### Phase 5 — Quality gate

- `dotnet build`, `dotnet test`
- frontend build
- Playwright: FA/EN/AR, tab behavior, no reload, mobile viewport
- axe: no serious/critical
- Lighthouse: SEO 100, Accessibility 100, Best Practices 100 (FA/EN/AR, home + listing)
- screenshots for FA/AR RTL + EN LTR + mobile

## 9. Acceptance criteria

- Lastsecond homepage IA is represented without leaving the template.
- No new card/button/form/date-picker style.
- Home search tabs switch schema in place with no reload and no URL/head change.
- Search submit goes to the correct canonical listing route.
- All cards are API-backed; no static mock data.
- Mobile at 390px is clean and has no overflow.
- FA/EN/AR work with correct direction and date formatting.
- SEO and accessibility exceed Lastsecond.
- No duplicate home page or route.
- Documentation and status updated before commit.

## 10. Non-goals

- Redesigning the purchased template.
- Building a new design system.
- Copying Lastsecond's visual identity.
- Adding a second home page.
- Building external provider integrations in this phase.

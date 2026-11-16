# Lastsecond Homepage Benchmark — 2026-11-16

> Scope: only `https://lastsecond.ir/` (desktop Chrome), including the two hero
> search tabs. No other Lastsecond pages were audited except the search targets
> reached by submitting the homepage form.
>
> Method: server HTML (`webfetch`), live DOM inspection, tab interaction,
> `performance.getEntriesByType("resource")`, and Lighthouse
> (accessibility / best-practices / SEO).

## 1. Executive verdict

Lastsecond's homepage is a **strong server-rendered discovery page** with a
clear information architecture and rich card data. Its search tabs are
**local UI state**: clicking a tab changes the form schema and fetches filter
options, but does **not** change the URL or document head.

The page is good at discovery and internal linking, but it has clear gaps:

- the only `<h1>` is the brand logo, not the page topic;
- no JSON-LD structured data;
- no `og:image` and no Twitter card;
- tabs are clickable `<div>` elements with no role/ARIA/keyboard semantics;
- zoom is disabled in the viewport meta;
- 25 of 37 images have no width/height, and none use `loading="lazy"` or `srcset`;
- no `main` landmark;
- Lighthouse accessibility 83 and best-practices 83, while SEO is 100.

## 2. Information architecture

Observed section order on the homepage:

| # | Section | Heading | Primary CTA |
|---|---|---|---|
| 1 | Header + primary navigation | logo `<h1>لست‌سکند</h1>` | login / search |
| 2 | Hero search | text `کجا می‌خواهید بروید؟` (not a heading) | `جستجو` |
| 3 | Ad slot | — | ad link |
| 4 | Special tours carousel | `تورهای ویژه` | card links |
| 5 | Ad slot | — | — |
| 6 | Latest domestic tours | `جدیدترین تورهای داخلی` | `مشاهده تمام تورها` |
| 7 | Ad slot | — | — |
| 8 | Latest foreign tours | `جدیدترین تورهای خارجی` | `مشاهده تمام تورها` |
| 9 | Ad slot | — | — |
| 10 | Popular visas | `ویزای‌های پرطرفدار` | `مشاهده همه ویزاها` |
| 11 | Tours by origin city | `تور از مبدا شهرهای پرطرفدار` | city card links |
| 12 | Latest travelogues | `جدیدترین سفرنامه‌ها` | `مشاهده بیشتر` |
| 13 | Magazine | `مجله گردشگری` | `مشاهده بیشتر` |
| 14 | Footer | — | utility/SEO links, contact, social |

The page mixes **discovery by product** (domestic/foreign tours, visas) with
**discovery by origin** and **editorial discovery** (travelogues, magazine).

## 3. Header and navigation

Primary menu items:

| Label | Target |
|---|---|
| خانه | `/` |
| تور خارجی | `/tours` |
| تور داخلی | `/tours/تور-ایرانگردی` |
| ویزا | `/visa` |
| هتل‌ | `/hotels` |
| سفرساز | `/safarsaz` |
| سفر به ناکجا | `/unknown-tour` |
| بلایندتور | `https://lastsecond.ir/blind-tour` |
| سفرنامه | `/itineraries` |
| بلاگ | `/blog` |
| تماس با ما | `/contact` |

The menu contains mega-menu links for foreign tours, hotels, and visas. The
right side has login/registration and search. The page has one `<nav>` landmark
and no `<main>` landmark.

## 4. Hero search and tab behavior

### 4.1 Visual/state

- Default active tab: **تورهای خارجی**
- Second tab: **تورهای داخلی**
- Both tabs are `<div class="search-tab">` elements.
- They have no `role`, no `tabindex`, no `aria-selected`, and no keyboard
  interaction.
- Active state is visual only (`active` class).

### 4.2 Field schema per tab

| Field | Foreign tours (default) | Domestic tours |
|---|---|---|
| Origin | `مبدا: همه` | — |
| Destination / city/type | `مقصد: همه` | `شهر یا نوع تور` |
| Departure date | `تاریخ رفت` | `تاریخ رفت` |
| Return date | `تاریخ برگشت` | — |
| Duration | `مدت اقامت` | — |
| Hotel | `هتل: همه` | — |
| Submit | `جستجو` | `جستجو` |

This is not a label swap: the domestic tab renders a **different form schema**
with one select and one date. The foreign tab renders four selects and two
dates.

### 4.3 What happens on tab click

Observed sequence when switching tabs:

1. URL stays `https://lastsecond.ir/`.
2. `document.title` stays the homepage title.
3. Canonical stays `https://lastsecond.ir/`.
4. No document reload (`window` marker survives).
5. The form is replaced with the tab-specific schema.
6. One XHR is made:
   - foreign → `https://rapi.lastsecond.ir/top-search/tour-selected-filters`
   - domestic → `https://rapi.lastsecond.ir/top-search/trip-selected-filters`

So the homepage tab is **ephemeral UI state**, not a route or URL state.

### 4.4 Search submission behavior

Submitting the form with empty filters navigates to different listing routes:

| Active tab | Result URL |
|---|---|
| Foreign | `/tours?hotel&list` |
| Domestic | `/tours/تور-ایرانگردی?list` |

This is an important IA decision: the homepage tabs themselves do not change
URL, but the **search action** routes to separate listing landings.

### 4.5 Progressive enhancement

The server HTML contains the form with empty `<select><option></option></select>`
elements. Options and the visible Select2 widgets are populated after
hydration. Without JavaScript the form is not practically usable, although the
rest of the homepage content is server-rendered.

## 5. Card data contracts (observed)

### 5.1 Special tours (`تورهای ویژه`)

- image (300px variant)
- duration in nights
- title (`h3`, linked)
- agency name
- airline name
- starting price in Toman, sometimes also USD
- link to tour detail

### 5.2 Latest domestic tours

- thumbnail (92×69 variant)
- title (`h3`, linked)
- duration in days (supports decimals, e.g. `3.5 روز`)
- next start date
- organizer code
- transport type
- difficulty level
- starting price in Toman
- link to tour detail

### 5.3 Latest foreign tours

- title (`h3`, linked)
- duration in nights
- outbound and return flight times
- agency name
- starting price in Toman, sometimes also USD
- link to tour detail

### 5.4 Popular visas

- image
- visa title (`h3`, linked)
- processing time range
- starting price + currency
- link to visa detail (opens in new tab in the observed markup)

### 5.5 Tours by origin city

- city name
- tour count
- link to filtered tour list (`/tours?list&sources[]=...`)

### 5.6 Travelogues

- title (`h3`, linked)
- author name
- destination/location
- link to itinerary detail

### 5.7 Magazine

- title (`h3`, linked)
- publish date
- category
- link to blog detail

## 6. Design-system observations

Computed values from the live page:

| Token | Value |
|---|---|
| Body font | `iranyekan, sans-serif` |
| Body background | `rgb(244, 244, 249)` |
| Body text | `rgb(47, 55, 66)` |
| CTA / active tab | `rgb(255, 114, 94)` (`#ff725e`) |
| CTA radius | `5px` |
| Card background | white |
| Card radius | `10px` |
| Card shadow | `rgba(189,189,189,0.15) 0 2px 10px 3px` |
| Hero height | ~465px |
| Hero background | SVG asset (`topsearch-background.svg`) |
| Hero padding | `80px 0 42px` |

The design language is: light gray page canvas, white elevated cards, coral CTA
and active tab, IRANYekan typography, rounded cards, and a large illustrated
hero. Search tabs visually merge into the hero card.

## 7. SEO audit

### 7.1 Strong points

- Server-rendered HTML (`data-server-rendered="true"`); cards and text exist
  before hydration.
- Correct `lang="fa"` and `dir="rtl"`.
- Self-referencing canonical: `https://lastsecond.ir/`.
- Descriptive title and meta description.
- `robots` allows large image/snippet previews:
  `max-snippet:-1, max-image-preview:large, max-video-preview:-1`.
- Open Graph type/site/title/description/url are present.
- Clean H2 → H3 card hierarchy.
- Rich internal linking: 107 anchors, 61 unique internal URLs.
- Lighthouse SEO score: **100**.

### 7.2 Weaknesses / risks

| Severity | Finding | Evidence / impact |
|---|---|---|
| High | Only H1 is the brand logo | No topical H1 for “homepage travel discovery”; weakens topical clarity |
| High | No JSON-LD | No `Organization`, `WebSite`, `SearchAction`, `ItemList`, or `BreadcrumbList` |
| Medium | No `og:image` / Twitter card | Weak social sharing previews |
| Medium | No `main` landmark | Accessibility + semantic structure |
| Medium | Tabs are non-semantic divs | No `tablist`/`tab`/`aria-selected`; keyboard users cannot switch |
| Medium | `user-scalable=no` and `maximum-scale=1` | Blocks zoom; Lighthouse `meta-viewport` failure |
| Medium | 25/37 images without dimensions | CLS/image-aspect-ratio risk |
| Medium | 0 lazy-loaded images, 0 `srcset` | Mobile payload and LCP risk |
| Low | 1 `href="#"` link | Lighthouse “crawlable anchors” issue on other pages; home has one |
| Low | 6 links without text/image | Link-name accessibility issue |
| Low | `og:url` is `https://lastsecond.ir` while canonical has trailing slash | Minor consistency issue |
| Low | `keywords` meta present | Obsolete, no ranking value |

### 7.3 Heading/landmark counts

- H1: 1 (brand only)
- H2: 7 (sections)
- H3: 33 (cards)
- Landmarks: `nav` only; no `main`, `header`, `footer` landmarks.

## 8. Accessibility audit

Lighthouse homepage scores:

| Category | Score |
|---|---|
| Accessibility | **83** |
| Best Practices | **83** |
| SEO | **100** |

Observed Lighthouse failures:

- `aria-command-name`
- `color-contrast`
- `landmark-one-main`
- `link-name`
- `meta-viewport`
- `image-aspect-ratio`
- `target-size` (on the search results page)
- `crawlable-anchors` (on the search results page)

Specific interaction issues:

- Search tabs are clickable `<div>`s, not buttons/links.
- No keyboard focus or arrow-key behavior for tabs.
- Form controls rely on Select2’s generated combobox semantics; there are no
  native labels associated with the fields.
- The date picker container has `role="button"` and `tabindex="0"` but no
  accessible name.
- A `main` landmark is missing.

Things Lastsecond does well:

- correct RTL document direction;
- visible text on most links;
- `alt` present on 36/37 images;
- Select2 exposes `role="combobox"` and `tabindex`;
- date picker is keyboard-focusable.

## 9. Performance observations

Observed home document:

- 1,175 DOM nodes
- 25 `<script>` elements
- 37 images
- 107 links
- 7 stylesheets and multiple preloads
- Nuxt SSR payload embedded in the document

Image handling is the main performance risk:

- 0 images with `loading="lazy"`
- 0 images with `srcset`
- 25 images without explicit dimensions
- one Lighthouse `image-aspect-ratio` failure

Lighthouse’s tool here does not benchmark performance, so no synthetic LCP/CLS
score is claimed. The structural evidence is enough to require a stricter image
strategy in Hani.

## 10. What to copy vs what to improve

| Area | Lastsecond | Hani target |
|---|---|---|
| Homepage discovery | Strong section order | Copy the IA, not the visual skin |
| Hero search tabs | Local state; schema changes in place | Same UX, but semantic tabs + keyboard + ARIA |
| Search submission | Two listing routes | Keep one canonical interactive listing route with server-driven scope, plus SEO aliases if required |
| SSR | Cards server-rendered | Required |
| H1 | Brand only | Topical H1 + brand in header |
| Structured data | None | `WebSite`, `SearchAction`, `Organization`, `ItemList`, `BreadcrumbList` |
| Metadata | Title/description/OG partial | Full canonical + hreflang + OG image + Twitter card |
| Tabs a11y | Clickable divs | `role=tablist/tab`, `aria-selected`, arrow keys, visible focus |
| Images | No lazy/srcset/dimensions | `next/image` or explicit dimensions + lazy + responsive sizes |
| Mobile | Zoom disabled | Never disable zoom; min target size 44px |
| Form labels | Generated/unclear | Native labels + accessible names |
| Internal linking | Rich | Preserve rich contextual links |

## 11. Architecture mapping into Hani

The implementation must use the purchased template as the visual source. No
parallel card, form, tab, or button system.

### 11.1 Template slots

| Lastsecond section | Hani template source |
|---|---|
| Header/nav/mega-menu | existing common header |
| Hero search card | existing hero/search block |
| Search tabs | existing `nav`/`nav-link` tab pattern |
| Search fields | existing form controls (`form-control`, `form-select`) |
| Special tours carousel | existing recommended/tour card block |
| Domestic/foreign lists | existing tour list/grid card |
| Popular visas | existing visa card |
| Origin-city cards | existing category/destination card |
| Travelogues/blog | existing article card |
| Footer | existing footer |

Fields that Lastsecond has but Hani’s template cards lack must be placed in
existing template slots (title, meta, badge, price, image, CTA), not in a new
component.

### 11.2 Data contracts needed

- Home feed already aggregates tours, visas, blog, travelogues, campaigns.
- Add/confirm:
  - home search filter schema per scope (domestic vs foreign);
  - tour card `coverImageUrl`, duration, start date, agency, transport,
    difficulty, min price, currency;
  - visa card processing time, min price, currency, cover image;
  - origin-city counts;
  - editorial author and reading time.
- Domain remains server-driven; no client-only filtering for the actual listing.

### 11.3 Routing recommendation

Lastsecond’s homepage tabs are local state; search submission uses separate
listing routes. For Hani, the clean model is:

- Homepage tabs: local UI state, no URL/head mutation.
- Actual listing:
  - one canonical interactive route `/{locale}/tours`;
  - `?scope=domestic|foreign` as server-driven state;
  - SEO aliases/landings can exist only if they are canonicalized and
    hreflang-mapped, otherwise they create duplicate routes.
- If separate landing paths are required for SEO, they must be server-rendered,
  canonicalized, and linked from the homepage; tab clicks must not remount the
  page.

### 11.4 SEO requirements for Hani

1. Topical H1 per homepage and listing.
2. Canonical on every locale/scope variant.
3. `hreflang` for `fa`, `en`, `ar`.
4. OG image + Twitter card.
5. JSON-LD:
   - `Organization`
   - `WebSite` + `SearchAction`
   - `ItemList` for tour/visa sections
   - `BreadcrumbList` for listings.
6. Sitemap including home, listing, and scope variants.
7. No `user-scalable=no`; no `maximum-scale=1`.
8. Explicit image dimensions, lazy loading, responsive `srcset`.
9. Semantic landmarks: `header`, `nav`, `main`, `footer`.
10. Native form labels and accessible names.

### 11.5 Accessibility requirements

- Tabs: `role="tablist"`, each tab `role="tab"`, `aria-selected`,
  `aria-controls`, keyboard Left/Right/Home/End.
- Form: label every select/input; preserve visible placeholder labels.
- Date picker: accessible name and keyboard instructions.
- Focus visible on all interactive elements.
- Touch targets ≥ 44×44.
- Contrast ≥ 4.5:1 for body text.
- No zoom lock.
- Announce result updates with a polite live region.

## 12. Acceptance criteria for the Hani equivalent

- Homepage sections match Lastsecond’s IA while using only template components.
- Domestic/foreign tab switch:
  - changes only the search-field schema;
  - makes one filter-options request;
  - does not reload the page;
  - does not change the document title/canonical (unless intentionally designed
    and documented);
  - is fully keyboard accessible.
- Listing scope:
  - server-rendered on first load;
  - URL remains truthful and shareable;
  - no router remount or visual jump;
  - canonical/hreflang correct.
- Lighthouse:
  - SEO ≥ 95;
  - Accessibility ≥ 95;
  - Best Practices ≥ 95.
- No new visual component outside the template.
- FA/AR RTL and EN LTR verified.
- Card fields populated from API, not static copy.

## 13. Implementation sequence after approval

1. **Home IA composition** using template sections and slots.
2. **Hero search tab schema** + filter-options API + accessible tabs.
3. **Home feed binding** for all card fields.
4. **Listing route/state contract** (single canonical route + scope).
5. **SEO layer**: metadata, canonical, hreflang, OG, JSON-LD, sitemap.
6. **Accessibility layer**: labels, landmarks, keyboard tabs, image dimensions.
7. **Quality gate**: Playwright, axe, Lighthouse, FA/AR/EN screenshots.

## 14. Evidence summary

- Home URL: `https://lastsecond.ir/`
- Title: `انتخاب هوشمند سفر و تفریح | لست سکند، تور لحظه آخری`
- Canonical: `https://lastsecond.ir/`
- Hreflang: none
- JSON-LD blocks: **0**
- H1: **1** (`لست‌سکند`)
- H2: **7**
- H3: **33**
- Links: **107** total, **61** unique internal
- Images: **37** total, **25** without dimensions, **0** lazy, **0** srcset
- Scripts: **25**
- DOM nodes: **1,175**
- Lighthouse (home): SEO **100**, Accessibility **83**, Best Practices **83**
- Tab switch XHR:
  - `rapi.lastsecond.ir/top-search/tour-selected-filters`
  - `rapi.lastsecond.ir/top-search/trip-selected-filters`
- Search targets:
  - foreign: `/tours?hotel&list`
  - domestic: `/tours/تور-ایرانگردی?list`

---

**Verdict:** Lastsecond’s homepage is a strong UX/IA reference but not an SEO
or accessibility ceiling. Hani should copy the discovery model, not the
technical debt. The Hani implementation must be server-rendered, template-first,
canonical/hreflang-safe, JSON-LD-rich, keyboard-accessible, and image-optimized.

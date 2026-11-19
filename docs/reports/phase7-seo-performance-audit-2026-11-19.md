# Phase 7 — SEO, Performance, and Launch Readiness (2026-11-19)

## Objective

Improve public-site SEO, accessibility, and performance without making the
storefront fully dynamic or weakening the nonce CSP used on sensitive routes.

## Baseline Lighthouse (production build, `/fa`)

| Profile | Performance | SEO | Accessibility | Best Practices |
|---|---:|---:|---:|---:|
| Mobile | 71 | 92 | 77 | 96 |
| Desktop | — | — | — | — |

The SEO score in local Lighthouse is 92 only because the production canonical
is `https://hani.ir/fa` while the audit runs on `http://localhost:3001/fa`.
The canonical/hreflang tags themselves are correct.

## Changes implemented

1. **Font payload reduction**
   - Subset Iconsax from ~1.36 MB TTF to ~40 KB WOFF2 using only referenced
     icon classes.
   - Subset Tabler Icons from ~820 KB WOFF2 to ~6 KB.
   - Subset Font Awesome solid/brands/regular to ~2 KB each.
   - Replaced node-module font CSS with local subset font faces and
     `font-display: swap`.
   - Removed the render-blocking Google Fonts `@import` from SCSS.
2. **Accessibility**
   - Fixed tablist markup and roles in the home booking search.
   - Added accessible names to footer social links.
   - Fixed date-picker ARIA roles.
   - Improved footer link target sizes.
   - Added image dimensions to home card images.
   - Mobile Lighthouse Accessibility: **77 → 100**.
3. **SEO**
   - Added tour, hotel, and visa detail URLs to `sitemap.xml` (tours/hotels
     were previously missing because the sitemap request used an invalid page
     size).
   - Added canonical and hreflang metadata to tour detail, visa detail, and
     visa listing pages.
   - Added `TouristTrip`, `Offer`, `BreadcrumbList`, `Service`, and `FAQPage`
     JSON-LD to real tour/visa detail pages.
   - Disallowed private routes in `robots.txt`.
4. **Performance**
   - Mobile FCP: **2.6 s → 1.2 s**.
   - Mobile LCP: **17.4 s → 9.7 s** (legacy hero/H1 paint remains the main
     mobile bottleneck).
   - Desktop LCP: **2.4 s**, desktop performance **87**.
   - Total page weight reduced by replacing/compressing large background
     images and font payloads.

## Current scores after changes

| Profile | Performance | SEO | Accessibility | Best Practices |
|---|---:|---:|---:|---:|
| Mobile | 75 | 92* | 100 | 96 |
| Desktop | 87 | 92* | 100 | 96 |

`*` Local-only canonical host mismatch. Production canonical is
`https://hani.ir`; the page emits correct canonical and hreflang tags.

## Remaining follow-up

- Mobile LCP is still driven by the legacy home hero and large CSS/JS bundle.
  Next step: reduce the home HTML/RSC payload and split below-fold sections.
- Public static pages still use `'unsafe-inline'` for Next hydration; sensitive
  routes use nonce CSP and are not affected.
- Add Lighthouse CI budgets for home, tour detail, visa detail, and flight
  search to prevent regressions.

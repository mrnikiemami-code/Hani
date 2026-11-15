# ADR-0031: Server-driven Domestic/Foreign tour scope

- Status: Accepted
- Date: 2026-11-15
- Gate: 9.1

## Context

Lastsecond separates domestic and foreign tours on the home page and in search.
Hani previously had no first-class way to express that distinction. Filtering
only in the browser would break pagination, SEO landing pages, and the home BFF,
and would duplicate the search page.

The decision also needs stable URLs for search engines while keeping the home
experience simple for users.

## Decision

1. Add `TourScope` (`Foreign = 0`, `Domestic = 1`) to `TourProduct`.
   `Foreign` is the default so existing products stay visible and the enum's
   CLR default matches the database default.
2. Persist `catalog.tour_products.tour_scope`, indexed by
   `(status, tour_scope)`. Existing rows migrate to `Foreign`.
3. Apply the filter in `CatalogProductFilter`, so it is part of the server-side
   read model rather than a frontend-only filter.
4. Expose `scope` on `GET /market/v1/search` and
   `GET /market/v1/home?scope=Domestic|Foreign`.
5. Home tabs use `/fa?scope=domestic` and `/fa?scope=foreign`; they are the same
   page with different server data, not two duplicated pages.
6. SEO landing pages use `/{locale}/tours/domestic` and
   `/{locale}/tours/foreign`; `/{locale}/tours` remains the all-tours listing
   with an optional `?scope=` parameter.
7. The listing UI uses the template's existing `nav`/`nav-link` tabs and the
   existing tour cards. No parallel card or button style is introduced.

## Consequences

- Pagination, cache keys, and SEO landings all share one query contract.
- A product belongs to exactly one scope; agencies choose it at creation.
- Search and home must keep the filter in sync when new filters are added.
- Existing data was assigned `Foreign`; domestic catalog seeding remains an
  operational task, not a code fallback.
- External flight-provider and payment work remains outside this decision.

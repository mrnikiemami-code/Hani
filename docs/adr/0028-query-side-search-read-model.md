# ADR-0028: Query-side search read model with batched hydration and cache

- Status: Accepted
- Date: 2026-11-14
- Gate: 8

## Context

The public `/market/v1/search` path originally loaded approved offers per
product inside a loop (N+1), and PostgreSQL had no index that matched the
published-product filters or the localized `ILIKE` search predicates. The
marketplace must stay responsive while the catalog grows, but the read path
also crosses module boundaries: products live in `catalog`, offers and
departures live in `supply`, and agency labels live in `identity`.

A separate denormalized projection table would require dual writes and a
consistency contract for every publish, offer approval, departure change, and
translation edit. That is a larger operational surface than the current scale
justifies.

## Decision

Use a **query-side read model** for search:

1. `CatalogReadService` filters and pages published products in PostgreSQL
   using indexes on `(status, updated_at)`, `(status, tour_type,
   duration_days)`, `(status, origin_destination_id)`, and the destination
   link table.
2. Localized title/summary/description matching uses `pg_trgm` GIN indexes and
   `EF.Functions.ILike`.
3. `IOfferReadService.GetApprovedOffersByProductIdsAsync` hydrates approved
   offers for the whole page in one batch per child collection, using
   `AsSplitQuery()` to avoid a cartesian explosion.
4. `SearchProductsQueryHandler` caches the final paged result for 30 seconds
   through `ICacheService`. Cache keys include every query field.
5. The read path never returns stale data beyond the cache TTL. There is no
   cross-module dual write.

## Consequences

- The N+1 pattern is removed from the marketplace search path.
- Search latency is index-bound and the read path can scale horizontally with
  the API.
- A 30-second cache window is acceptable for marketplace browsing and keeps
  invalidation simple.
- At very large catalogs, loading the candidate set after price filtering in
  memory becomes the next bottleneck. The accepted scale trigger is 50k
  published products or p95 above 300 ms under the Gate 8 load profile.

## Extraction path

When the trigger is reached, add a `catalog.product_search` materialized view
or a dedicated search projection with an outbox-driven updater. The public
contract (`ICatalogReadService`, `IOfferReadService`) and the search API stay
unchanged; only the implementation is replaced.

## Evidence

- `CatalogReadService.SearchPublishedAsync`
- `OfferReadService.GetApprovedOffersByProductIdsAsync`
- `SearchProductsQueryHandler`
- `20261114151742_AddGate8SearchIndexes`
- `20261114151742_AddGate8OfferSearchIndexes`
- `tests/load/k6/search-load.js`

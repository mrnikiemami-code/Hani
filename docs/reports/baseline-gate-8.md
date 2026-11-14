# Baseline Gate 8 Report — Hardening

- Date: 2026-11-14
- Gate: 8
- Result: **PASSED (Core)**
- Previous gate: Gate 7 PASSED (Core)
- Report owner: architecture

## 1. Result

Gate 8 core hardening is complete. The public read path is indexed and batched,
content is discoverable through a sitemap, integration tests run against a real
PostgreSQL container, load/SLO evidence exists, a logical restore drill passed,
and the API has baseline security headers and rate limiting.

No baseline GAP was added or removed. `baseline.json` remains at 34 GAPs.

## 2. Delivered

### Search / D-06

- Removed the per-product N+1 offer loop.
- Added `GetApprovedOffersByProductIdsAsync` batch hydration with
  `AsSplitQuery()`.
- Added a 30-second paged-result cache keyed by the full request.
- Added `pg_trgm` GIN indexes for localized title/summary/description search.
- Added published-product, tour-type/duration, origin, and destination-link
  indexes.
- Added ADR-0028 for the query-side read model and its scale trigger.
- Added a unit test proving one batch call and cache reuse.

### Content sitemap / D-07

- Added `ContentSitemapEntry` and `ListSitemapEntriesAsync`.
- Added `GET /content-sitemap.xml` with hreflang alternates for all configured
  languages.
- Added the content sitemap to `robots.txt`.
- Added container-backed integration assertion for blog/travelogue/video
  discovery.

### Integration tests / TC-073

- Added `tests/Hani.IntegrationTests` with `Testcontainers.PostgreSql`.
- Applied all seven module migrations to an isolated PostgreSQL 16 container.
- Tests cover readiness/security headers, content sitemap, and the full search
  HTTP path with a seeded product, offer, and departure.

### Load / D-08

Search profile: 50 VUs peak, 60 seconds, 1,699 requests.

| Metric | Target | Observed |
|---|---|---|
| p95 | < 500 ms | 4.13 ms |
| p99 | < 1000 ms | 6.67 ms |
| Failed | < 1% | 0.00% |
| Throughput | — | 28 req/s |

SEO profile: 5 VUs, 30 seconds, 150 iterations / 450 requests.

| Metric | Target | Observed |
|---|---|---|
| p95 | < 800 ms | 21.32 ms |
| Failed | < 1% | 0.00% |

The first run hit the default 600/min per-IP limiter (62.9% 429s). That is
expected protection, not a search failure. `RateLimiting:PermitLimit` is now
configurable; the capacity run used 10,000/min.

### DR / TC-075

`scripts/dr-drill.ps1` result:

| Metric | Result |
|---|---|
| Restored tables | 107 |
| Restored orders | 6 |
| Restored offers | 7 |
| Logical restore RTO | 2.1 s |
| RPO | last successful dump |

### Security / TC-076

- Added `SecurityHeadersMiddleware`.
- Added configurable global per-IP fixed-window rate limiting.
- Added HSTS outside Development.
- Added security review and deployment residual register.
- No unmitigated High code finding; production secret injection is a
  deployment gate.

### Observability / TC-077

- Added `/health/live` and `/health/ready`; readiness probes PostgreSQL.
- Added SLO document, Grafana dashboard JSON, and Prometheus alert rules.

### Microservice decision / TC-078

- Added ADR-0029: keep the modular monolith through Gate 8, with explicit
  extraction triggers and seams.

## 3. Verification

| Check | Result |
|---|---|
| Unit tests | 150 passed |
| Architecture tests | 34 passed |
| Integration tests | 3 passed |
| Total | 187 passed |
| Build | 0 warnings, 0 errors |
| Migration drift | zero |
| `verify.ps1` | green |
| `check-baseline.ps1` | green |
| Search k6 thresholds | green |
| SEO k6 thresholds | green |
| DR drill | green |

## 4. Residuals

- Persistent idempotency and the outbox consumer are follow-up hardening; the
  current idempotency store is process-local.
- Production secrets, WAF/TLS, shared rate limiting, and frontend CSP are
  deployment/frontend responsibilities.
- A materialized search projection is deferred to the ADR-0028 scale trigger.

## 5. Decision

Gate 8 is **PASSED (Core)**. Gate 9 is not started until the residual register
is accepted or scheduled.

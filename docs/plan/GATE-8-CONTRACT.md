# Gate 8 — Hardening Contract

- Gate: 8
- Status: PASSED (Core)
- Date: 2026-11-14
- Baseline GAPs: none directly (Hani-Better hardening)
- Related remediation: D-06, D-07, D-08
- Related tasks: TC-073..TC-078

## Scope

Gate 8 hardens the existing system without adding a new bounded context. It
covers search performance, full sitemap coverage, integration testing,
load/SLO evidence, DR, security review, observability, and the
microservice-extraction decision.

## Deliverables

| ID | Deliverable | Evidence |
|---|---|---|
| D-06 | Search query-side read model, indexes, batching, cache | `CatalogReadService`, `OfferReadService`, `SearchProductsQueryHandler`, Gate 8 migrations, ADR-0028 |
| D-07 | Content sitemap + robots discovery + localized alternates | `ContentSitemapQuery`, `ContentEndpoints`, `SeoMetadataBuilder` |
| D-08 | k6 load tests + SLO report | `tests/load/k6`, `docs/observability/SLO.md`, `docs/reports/baseline-gate-8.md` |
| TC-073 | Testcontainers integration tests | `tests/Hani.IntegrationTests`, `PostgresFixture` |
| TC-074 | Load test | `search-load.js`, `seo-load.js`, recorded results |
| TC-075 | DR drill | `scripts/dr-drill.ps1`, `docs/operations/DR-RUNBOOK.md` |
| TC-076 | Security review | `SecurityHeadersMiddleware`, rate limiting, `docs/security/SECURITY-REVIEW.md` |
| TC-077 | Observability dashboards/SLO | `docs/observability/SLO.md`, dashboard JSON, alert rules |
| TC-078 | Microservice extraction decision | ADR-0029 |

## Acceptance

- Search uses one batched offer query per page and no per-product query loop.
- PostgreSQL has indexes for published-product filters and trigram search.
- Search results are cached with a bounded TTL and full request key.
- `/sitemap.xml`, `/content-sitemap.xml`, and `/robots.txt` return 200 in a
  container-backed integration test.
- Integration tests run against a Testcontainers PostgreSQL database.
- Search k6 p95 < 500 ms, p99 < 1000 ms, failed requests < 1%.
- SEO k6 p95 < 800 ms, failed requests < 1%.
- DR drill restores all module schemas and validates row counts.
- Security headers are present on health and API responses.
- `/health/live` and `/health/ready` exist and the readiness probe checks
  PostgreSQL.
- `verify.ps1` is green and migration drift is zero.

## External/deployment residuals

- Production secrets must come from the platform secret manager (not
  development defaults).
- Rate limiting is per process; a shared limiter is required before horizontal
  scale-out.
- WAF/TLS and the frontend CSP are platform/frontend responsibilities.
- Persistent idempotency and the outbox consumer remain follow-up hardening
  items; they do not block the Gate 8 core read/operations path.

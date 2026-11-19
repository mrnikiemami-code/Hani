# Hani SLOs and Observability

Gate 8 defines the service-level objectives for the public read path and the
transactional API. The SLO is the source of truth for alerts; dashboards are
supporting evidence.

## Objectives

| Area | SLI | SLO | Measurement |
|---|---|---|---|
| Public read availability | Successful `GET` responses | 99.9% monthly | OTel HTTP server metrics |
| Search latency | `GET /market/v1/search` | p95 < 500 ms, p99 < 1000 ms | k6 + OTel duration histogram |
| SEO latency | `/sitemap.xml`, `/content-sitemap.xml`, `/robots.txt` | p95 < 800 ms | k6 + OTel |
| API error rate | 5xx / total | < 1% | OTel status code attribute |
| Booking/payment commands | Successful command responses | 99.5% monthly | Application logs + OTel |
| Health readiness | `/health/ready` | 200 every probe | Health checks |
| Restore objective | Logical restore of all schemas | RTO < 15 min, RPO < 24 h (local profile) | DR drill |

## Observability signals

- Logs: Serilog structured logs with `correlationId`, `service`, and
  `environment`; PII redaction is enabled by `Observability:Logging:RedactPii`.
- Traces: OpenTelemetry OTLP exporter, ASP.NET Core and HTTP instrumentation.
- Metrics: OpenTelemetry OTLP exporter. The SLO rules use the standard
  `http.server.request.duration` histogram and status attributes.
- Health: `/health` (all checks), `/health/live` (process), `/health/ready`
  (PostgreSQL probe).

## Dashboards and alerts

- `docs/observability/grafana-dashboard.json` — latency, traffic, error rate,
  and health panels.
- `docs/observability/alerts.yaml` — Prometheus recording and alerting rules.
- `docs/observability/SLO.md` — this document.

## Gate 8 evidence

Search load profile (`tests/load/k6/search-load.js`, 50 VUs peak, 60 s):

| Metric | Target | Observed |
|---|---|---|
| p95 | < 500 ms | 4.13 ms |
| p99 | < 1000 ms | 6.67 ms |
| Failed requests | < 1% | 0.00% |
| Throughput | — | 28 req/s |

SEO load profile (`tests/load/k6/seo-load.js`, 5 VUs, 30 s):

| Metric | Target | Observed |
|---|---|---|
| p95 | < 800 ms | 21.32 ms |
| Failed requests | < 1% | 0.00% |

The first search load run intentionally hit the per-IP limiter at the default
600 requests/minute and produced 429s. The limit is now configurable through
`RateLimiting:PermitLimit`; the capacity run used 10,000/minute and completed
without failures.

## Batch 12 security/observability follow-up

- The API rate limiter can run on Redis so limits are shared across nodes.
  Redis is a `/health/ready` dependency when configured.
- Rate-limit rejections remain HTTP 429 and are visible through the standard
  HTTP server metrics/status attributes.
- The Next.js frontend emits browser hardening headers in production; sensitive
  routes use a per-request nonce CSP, while public static pages use a baseline
  CSP.
- Review evidence: `docs/reports/security-observability-review-2026-11-19.md`.

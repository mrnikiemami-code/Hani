# Security Review — Gate 8

- Date: 2026-11-14
- Scope: HTTP API, authentication/authorization, tenant isolation, payment
  callbacks, channel webhooks, file/URL handling, dependency surface.

## Implemented controls

| Control | Evidence |
|---|---|
| JWT bearer authentication and role policies | `Program.cs`, module endpoint policies |
| Tenant isolation through `TenantMiddleware` and `ICurrentTenant` | `Hani.BuildingBlocks.AspNetCore` |
| Correlation id on every response and problem detail | `CorrelationIdMiddleware`, `HaniProblemDetails` |
| Problem Details for failures with localized titles | `HaniExceptionHandler`, `ProblemDetailsLocalizer` |
| Baseline security headers on every response | `SecurityHeadersMiddleware` |
| Global per-IP rate limit with configurable window | `RateLimitingOptions`, `Program.cs` |
| HSTS outside Development | `Program.cs` |
| Payment webhook HMAC validation and replay handling | `PaymentEndpoints`, `HandlePaymentWebhookCommand` |
| Channel webhook HMAC signing | `ChannelWebhookPublisher` |
| Idempotency keys on booking/supply/payment writes | `IdempotencyBehavior`, endpoint filters |
| PII redaction in structured logs | `Observability:Logging:RedactPii` |
| Dependency vulnerability scan in CI | `scripts/verify.ps1` (`dotnet list ... --vulnerable`) |
| No secrets in source; development secrets are explicit local defaults | `appsettings*.json`, deployment overrides |

## Findings

| ID | Severity | Finding | Status |
|---|---|---|---|
| S-01 | High | Production secrets must not use development defaults. | Mitigated by deployment requirement; tracked operationally. |
| S-02 | Medium | Rate limiting is per process; multi-node deployments need a shared limiter. | Mitigated in Batch 12S by `RateLimiting:Provider=Redis` and a production guard. |
| S-03 | Medium | No WAF/TLS termination in this repository. | Platform/CDN responsibility; documented in the deployment runbook. |
| S-04 | Medium | Invoice PDF output is generated from server-owned invoice fields. | No user-supplied HTML or script is rendered; keep it that way. |
| S-05 | Low | CSP is API-oriented (`default-src 'none'`); the frontend needs its own CSP. | Mitigated in Batch 12S by `frontend/next.config.ts`. |

No unmitigated High finding remains in the application code. S-01 is a
deployment gate, not a code gap: production must supply secrets through the
platform secret manager.

## Verification

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify.ps1
```

The verify gate builds with warnings as errors, runs all tests, checks migration
drift, verifies formatting, and scans for vulnerable packages.

## Batch 12 follow-up (2026-11-19)

- S-02 is mitigated: `RateLimiting:Provider=Redis` uses a shared atomic
  fixed-window limiter; production requires Redis. Redis errors fall back to a
  process-local limiter.
- S-05 is mitigated: the frontend now sends CSP, HSTS (production),
  X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy,
  COOP, CORP, and X-Permitted-Cross-Domain-Policies from `next.config.ts`.
- New report: `docs/reports/security-observability-review-2026-11-19.md`.

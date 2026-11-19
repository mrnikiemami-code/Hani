# Security and Observability Review — Batch 12 (2026-11-19)

## Scope

- HTTP API authentication, authorization, rate limiting, security headers,
  tenant isolation, payment/support upload surfaces.
- Production configuration guard and secret handling.
- Frontend security headers and CSP.
- Observability signals, health probes, and SLO coverage.
- Verification and regression tests.

## Controls confirmed

| Control | Evidence |
|---|---|
| JWT bearer + API-key authentication | `AuthenticationRegistration` |
| Admin/User/Supplier/Channel policies | `AuthenticationRegistration` |
| Correlation id and RFC 7807 errors | `CorrelationIdMiddleware`, `HaniProblemDetails` |
| Tenant isolation | `TenantMiddleware` |
| API security headers | `SecurityHeadersMiddleware` |
| Production secret/infra guard | `ProductionConfigurationGuard` |
| Payment webhook HMAC | Payment endpoints |
| Upload type/size/scan checks | visa/support/media upload endpoints |
| PII redaction | `Observability:Logging:RedactPii` |
| Dependency vulnerability scan | `scripts/verify.ps1` |
| PostgreSQL/storage/payments/Redis readiness | `/health/ready` |

## Batch 12 changes

1. **Distributed rate limiting**
   - Added `RedisFixedWindowRateLimiter` and a configurable
     `RateLimiting:Provider` (`Memory` or `Redis`).
   - Redis counters use an atomic `INCR` + `PEXPIRE` script and a shared key
     prefix.
   - Redis failures fall back to a process-local limiter so a cache outage does
     not take down the API.
   - `ProductionConfigurationGuard` now requires `RateLimiting:Provider=Redis`.
   - Verified with a 3-request window: the fourth request returned HTTP 429.
2. **Frontend security headers**
   - Added CSP, HSTS in production, `X-Frame-Options`, `X-Content-Type-Options`,
     `Referrer-Policy`, `Permissions-Policy`, COOP, CORP, and
     `X-Permitted-Cross-Domain-Policies` through `next.config.ts`.
   - `poweredByHeader` is disabled.
   - Verified on a production `next start` response.
3. **Security regression tests**
   - Expanded the API security-header integration test.
   - Added an internal/auth cache-control test.
4. **Observability**
   - Redis readiness remains on `/health/ready` when Redis is configured.
   - SLO documentation now covers the distributed limiter and frontend headers.

## Findings after Batch 12

| ID | Severity | Finding | Status |
|---|---|---|---|
| S-01 | High | Production secrets must not use development defaults. | Guarded by `ProductionConfigurationGuard`; deployment secret manager remains mandatory. |
| S-02 | Medium | Rate limiting was process-local. | Fixed with Redis limiter + production guard. |
| S-03 | Medium | WAF/TLS termination outside the repo. | Platform/CDN responsibility; documented. |
| S-04 | Medium | Invoice PDF input. | Server-owned fields only; no user HTML. |
| S-05 | Low | Frontend had no CSP. | Fixed in `next.config.ts`. |

No unmitigated High finding remains in application code. Production still must
provide real secrets and platform-level WAF/TLS.

## Verification

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify.ps1
```

- Build with warnings as errors.
- Unit, architecture, and integration tests.
- Migration drift and formatting checks.
- Vulnerable package scan.
- Manual Redis limiter smoke test (HTTP 429 on the fourth request).
- Manual production-header smoke test (`next start`).

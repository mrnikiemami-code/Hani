# Production Readiness Checklist

This checklist is the release gate for a Hani API deployment. The API now
fails fast when a Production host still uses development secrets or
single-node defaults (`ProductionConfigurationGuard`).

## Required configuration

| Setting | Requirement |
|---|---|
| `ConnectionStrings:Default` | Managed PostgreSQL; not `hani_dev` |
| `Jwt:SigningKey` | Unique secret, at least 32 bytes |
| `Jwt:Issuer`, `Jwt:Audience` | Explicit values |
| `Otp:Pepper` | Unique production secret |
| `Otp:ExposeCodeInResponse` | `false` |
| `Payments:Provider` | Not `Mock` |
| `Payments:BaseUrl` | HTTPS provider endpoint |
| `Payments:ApiKey`, `Payments:PspAccountRef` | Provider credentials |
| `Payments:WebhookSecret` | Unique HMAC secret, at least 24 chars |
| `Notifications:Mode` | `Http` (or explicitly allow log-only) |
| `Notifications:EmailEndpoint` / `SmsEndpoint` | At least one when `Mode=Http` |
| `Cache:Provider` | `Redis` |
| `Messaging:Transport` | `RabbitMq` or `Postgres` |
| `Messaging:Outbox:Enabled` | `true` |
| `AllowedHosts` | Explicit host list, never `*` |
| `Seo:PublicBaseUrl` | HTTPS |
| `Payments:ReturnUrlBase` | HTTPS |
| `Storage:RootPath` | Persistent writable volume |

## Release sequence

1. Apply all seven module migrations with `dotnet ef database update`.
2. Start the API with `ASPNETCORE_ENVIRONMENT=Production`.
3. Confirm the host starts; an unsafe configuration throws immediately.
4. Check `/health/live` and `/health/ready` return JSON with `Healthy`.
5. Run the load smoke:
   `docker run --rm -i --add-host=host.docker.internal:host-gateway -e BASE_URL=... grafana/k6 run - < tests/load/k6/health-load.js`
6. Run the database backup and one restore drill from
   `docs/operations/DR-RUNBOOK.md`.
7. Verify PSP webhooks with the provider sandbox before enabling live traffic.
8. Confirm the notification outbox drains and failed deliveries retry with
   backoff.
9. Rotate development secrets out of every environment and secret store.

## Health endpoints

- `/health/live`: process liveness only.
- `/health/ready`: PostgreSQL, storage, payment configuration, and Redis when
  `Cache:Provider=Redis`.
- Health JSON intentionally omits exception messages to avoid leaking secrets.

## Rollback

- Keep the previous container image and release tag.
- Roll back the application before reverting a migration unless the migration
  is explicitly backward compatible.
- Restore from the latest verified dump or PITR point if data was corrupted.

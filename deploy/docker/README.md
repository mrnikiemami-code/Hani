# Hani local infrastructure

> پورت‌ها طوری انتخاب شده‌اند که با سرویس‌های رایج روی 5432/6379/5672 تداخل نداشته باشند.

## Start

```powershell
docker compose -f deploy/docker/docker-compose.yml up -d
```

## Ports

| Service | Port | Notes |
|---|---|---|
| PostgreSQL | 5433 | db `hani`, user `hani`, password `hani_dev` |
| Redis | 6380 | cache |
| RabbitMQ | 5673 / 15673 | management UI |
| Seq | 5342 / 5381 | logs UI |
| OTel Collector | 4317 / 4318 | gRPC / HTTP |

## Stop

```powershell
docker compose -f deploy/docker/docker-compose.yml down
```

## Reset data

```powershell
docker compose -f deploy/docker/docker-compose.yml down -v
```

## Production differences

The local compose file is not a production manifest. Production requires:

- managed PostgreSQL with PITR and verified restore drills;
- Redis for cache and rate-limit coordination;
- RabbitMQ or PostgreSQL transport with the outbox enabled;
- HTTPS termination, explicit `AllowedHosts`, and secret-manager injection;
- a non-Mock payment provider with a configured webhook secret;
- an HTTP email/SMS provider or an explicit log-only waiver;
- `/health/ready` monitored by the orchestrator.

The API fails fast when these production requirements are missing. See
`docs/operations/PRODUCTION-CHECKLIST.md`.

## Optional ClamAV scanner

Support attachment scanning is enabled with the `security` compose profile:

```powershell
docker compose -f deploy/docker/docker-compose.yml --profile security up -d
```

Set `Support:Attachments:ClamAvEnabled=true` and point `ClamAvHost`/`ClamAvPort`
at `localhost:3310`. ClamAV startup and signature download can take several
minutes on first boot.

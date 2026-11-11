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

# Hani local infrastructure

## Start

```powershell
docker compose -f deploy/docker/docker-compose.yml up -d
```

## Ports

| Service | Port | Notes |
|---|---|---|
| PostgreSQL | 5432 | db `hani`, user `hani`, password `hani_dev` |
| Redis | 6379 | cache |
| RabbitMQ | 5672 / 15672 | management UI |
| Seq | 5341 / 5380 | logs UI |
| OTel Collector | 4317 / 4318 | gRPC / HTTP |

## Stop

```powershell
docker compose -f deploy/docker/docker-compose.yml down
```

## Reset data

```powershell
docker compose -f deploy/docker/docker-compose.yml down -v
```

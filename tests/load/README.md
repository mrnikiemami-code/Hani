# Hani Load Tests

Gate 8 uses k6 to validate the public read path against the SLO in
`docs/observability/SLO.md`.

## Prerequisites

- Hani API running on `http://localhost:5099`
- Docker Desktop (the scripts run through `grafana/k6`)

Start the API:

```powershell
$env:ASPNETCORE_ENVIRONMENT = "Development"
dotnet run --project src/Hani.Api --no-build --urls http://localhost:5099
```

## Run

```powershell
docker run --rm -i --add-host=host.docker.internal:host-gateway `
  -e BASE_URL=http://host.docker.internal:5099 `
  grafana/k6 run - < tests/load/k6/search-smoke.js

docker run --rm -i --add-host=host.docker.internal:host-gateway `
  -e BASE_URL=http://host.docker.internal:5099 `
  grafana/k6 run - < tests/load/k6/search-load.js
```

The search SLO is p95 < 500 ms and p99 < 1000 ms with less than 1% failed
requests. Record the observed result in
`docs/reports/baseline-gate-8.md`.

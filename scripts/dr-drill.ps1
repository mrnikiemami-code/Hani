param(
    [string]$Container = "hani-postgres",
    [string]$Database = "hani",
    [string]$User = "hani"
)

$ErrorActionPreference = "Stop"
$drillDatabase = "hani_dr_drill_$((Get-Date).ToString('yyyyMMddHHmmss'))"
$dumpPath = "/tmp/hani-dr-drill.dump"
$started = Get-Date

Write-Host "== Gate 8 DR drill =="
Write-Host "Container: $Container"
Write-Host "Source database: $Database"
Write-Host "Drill database: $drillDatabase"

Write-Host "== Dump =="
docker exec $Container pg_dump -U $User -d $Database -Fc -f $dumpPath
if ($LASTEXITCODE -ne 0) {
    throw "pg_dump failed with exit code $LASTEXITCODE"
}

Write-Host "== Create restore database =="
docker exec $Container createdb -U $User $drillDatabase
if ($LASTEXITCODE -ne 0) {
    throw "createdb failed with exit code $LASTEXITCODE"
}

try {
    Write-Host "== Restore =="
    docker exec $Container pg_restore -U $User -d $drillDatabase $dumpPath
    if ($LASTEXITCODE -ne 0) {
        throw "pg_restore failed with exit code $LASTEXITCODE"
    }

    Write-Host "== Validate restored schema =="
    $tableCount = docker exec $Container psql -U $User -d $drillDatabase -t -A -c `
        "select count(*) from information_schema.tables where table_schema in ('catalog','supply','content','identity','booking','payment','settlement');"
    if ($LASTEXITCODE -ne 0) {
        throw "restore validation query failed with exit code $LASTEXITCODE"
    }

    $orderCount = docker exec $Container psql -U $User -d $drillDatabase -t -A -c `
        "select count(*) from booking.orders;"
    $offerCount = docker exec $Container psql -U $User -d $drillDatabase -t -A -c `
        "select count(*) from supply.agency_offers;"

    $elapsed = (Get-Date) - $started
    Write-Host "Restored tables: $tableCount"
    Write-Host "Restored orders: $orderCount"
    Write-Host "Restored offers: $offerCount"
    Write-Host ("RTO (logical restore): {0:N1}s" -f $elapsed.TotalSeconds)
    Write-Host "RPO: last successful pg_dump time (no WAL archive configured in local profile)."

    if ([int]$tableCount -le 0) {
        throw "No module tables were restored."
    }
}
finally {
    Write-Host "== Cleanup =="
    docker exec $Container dropdb -U $User --if-exists $drillDatabase
    docker exec $Container rm -f $dumpPath
}

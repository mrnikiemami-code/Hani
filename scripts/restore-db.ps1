param(
    [Parameter(Mandatory = $true)]
    [string]$BackupFile,
    [string]$Container = "hani-postgres",
    [string]$TargetDatabase = "",
    [string]$User = "hani",
    [switch]$AllowProductionDatabase
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not (Test-Path $BackupFile)) {
    throw "Backup file was not found: $BackupFile"
}

$stamp = Get-Date -Format "yyyyMMddHHmmss"
if ([string]::IsNullOrWhiteSpace($TargetDatabase)) {
    $TargetDatabase = "hani_restore_$stamp"
}

if ($TargetDatabase -eq "hani" -and -not $AllowProductionDatabase) {
    throw "Restoring over the live 'hani' database requires -AllowProductionDatabase and a verified incident."
}

$remote = "/tmp/restore-$stamp.dump"
Write-Host "Uploading $BackupFile to $Container..."
docker cp $BackupFile "${Container}:$remote"
if ($LASTEXITCODE -ne 0) {
    throw "docker cp failed with exit code $LASTEXITCODE."
}

Write-Host "Creating database $TargetDatabase..."
docker exec $Container psql -U $User -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE `"$TargetDatabase`""
if ($LASTEXITCODE -ne 0) {
    docker exec $Container rm -f $remote | Out-Null
    throw "CREATE DATABASE failed. The target may already exist."
}

try {
    Write-Host "Restoring into $TargetDatabase..."
    docker exec $Container pg_restore -U $User -d $TargetDatabase --no-owner --exit-on-error $remote
    if ($LASTEXITCODE -ne 0) {
        throw "pg_restore failed with exit code $LASTEXITCODE."
    }

    $tableCount = docker exec $Container psql -U $User -d $TargetDatabase -t -A -c "SELECT count(*) FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema');"
    if ([int]$tableCount -lt 1) {
        throw "Restore validation failed: no application tables were restored."
    }

    Write-Host "Restored $tableCount application tables into $TargetDatabase."
    Write-Host "Point the API connection string at this database only after /health/ready passes."
}
finally {
    docker exec $Container rm -f $remote | Out-Null
}

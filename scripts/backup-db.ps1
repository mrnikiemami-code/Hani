param(
    [string]$Container = "hani-postgres",
    [string]$Database = "hani",
    [string]$User = "hani",
    [string]$OutputDirectory = "backups"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$stamp = Get-Date -Format "yyyyMMddHHmmss"
$fileName = "hani-$stamp.dump"
$remote = "/tmp/$fileName"
$targetDirectory = Join-Path $root $OutputDirectory
New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
$local = Join-Path $targetDirectory $fileName
$checksumFile = "$local.sha256"

Write-Host "Dumping $Database from $Container..."
docker exec $Container pg_dump -U $User -d $Database -Fc -f $remote
if ($LASTEXITCODE -ne 0) {
    throw "pg_dump failed with exit code $LASTEXITCODE."
}

docker cp "${Container}:$remote" $local
if ($LASTEXITCODE -ne 0) {
    throw "docker cp failed with exit code $LASTEXITCODE."
}
docker exec $Container rm -f $remote | Out-Null

if (-not (Test-Path $local) -or (Get-Item $local).Length -le 0) {
    throw "Backup file is empty or missing: $local"
}

$hash = (Get-FileHash -Algorithm SHA256 -Path $local).Hash.ToLowerInvariant()
"$hash  $fileName" | Set-Content -Encoding ASCII $checksumFile

Write-Host "Backup: $local"
Write-Host "SHA256: $hash"
Write-Host "Store this dump and checksum in encrypted object storage."

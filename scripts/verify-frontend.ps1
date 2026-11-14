param(
    [string]$Configuration = "Release"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location (Join-Path $root "frontend")

Write-Host "== Frontend install (locked) =="
npm ci --no-audit --no-fund

Write-Host "== Frontend build =="
npm run build

Write-Host "Frontend gates passed."

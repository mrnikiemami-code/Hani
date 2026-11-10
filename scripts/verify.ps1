param(
    [string]$Configuration = "Debug"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "== Tool restore =="
dotnet tool restore

Write-Host "== Restore (locked) =="
dotnet restore Hani.slnx --locked-mode

Write-Host "== Build (warnings as errors) =="
dotnet build Hani.slnx -c $Configuration -warnaserror --no-restore

Write-Host "== Tests (unit + architecture) =="
dotnet test Hani.slnx -c $Configuration --no-build

Write-Host "== Migrations =="
dotnet ef migrations has-pending-model-changes `
    --project src/Modules/Supply/Hani.Modules.Supply.Infrastructure `
    --startup-project src/Hani.Api `
    --context SupplyDbContext --no-build

Write-Host "== Format =="
dotnet format Hani.slnx --verify-no-changes --no-restore

Write-Host "== Vulnerable packages =="
dotnet list Hani.slnx package --vulnerable --include-transitive

Write-Host "All gates passed."

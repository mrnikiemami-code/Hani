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

Write-Host "== Baseline gate =="
dotnet test tests/Hani.ArchitectureTests/Hani.ArchitectureTests.csproj `
    -c $Configuration `
    --no-build `
    --filter FullyQualifiedName~BaselineCoverageTests

Write-Host "== Tests (unit + architecture) =="
dotnet test Hani.slnx -c $Configuration --no-build

Write-Host "== Migrations =="
dotnet ef migrations has-pending-model-changes `
    --project src/Modules/Supply/Hani.Modules.Supply.Infrastructure `
    --startup-project src/Hani.Api `
    --context SupplyDbContext --no-build

dotnet ef migrations has-pending-model-changes `
    --project src/Modules/Catalog/Hani.Modules.Catalog.Infrastructure `
    --startup-project src/Hani.Api `
    --context CatalogDbContext --no-build

dotnet ef migrations has-pending-model-changes `
    --project src/Modules/Identity/Hani.Modules.Identity.Infrastructure `
    --startup-project src/Hani.Api `
    --context IdentityDbContext --no-build

dotnet ef migrations has-pending-model-changes `
    --project src/Modules/Booking/Hani.Modules.Booking.Infrastructure `
    --startup-project src/Hani.Api `
    --context BookingDbContext --no-build

dotnet ef migrations has-pending-model-changes `
    --project src/Modules/Payments/Hani.Modules.Payments.Infrastructure `
    --startup-project src/Hani.Api `
    --context PaymentsDbContext --no-build

dotnet ef migrations has-pending-model-changes `
    --project src/Modules/Settlement/Hani.Modules.Settlement.Infrastructure `
    --startup-project src/Hani.Api `
    --context SettlementDbContext --no-build

Write-Host "== Format =="
dotnet format Hani.slnx --verify-no-changes --no-restore

Write-Host "== Vulnerable packages =="
dotnet list Hani.slnx package --vulnerable --include-transitive

Write-Host "All gates passed."

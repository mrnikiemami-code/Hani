param(
    [string]$Configuration = "Debug"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

dotnet test tests/Hani.ArchitectureTests/Hani.ArchitectureTests.csproj `
    -c $Configuration `
    --no-build `
    --filter FullyQualifiedName~BaselineCoverageTests

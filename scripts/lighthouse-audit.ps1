param(
  [string]$BaseUrl = "http://localhost:3001",
  [string]$OutDir = "D:\Hani\lighthouse",
  [switch]$Desktop
)

$ErrorActionPreference = "Stop"
$pages = @(
  @{ Name = "home"; Path = "/fa" },
  @{ Name = "tours"; Path = "/fa/tours" },
  @{ Name = "tour-detail"; Path = "/fa/tours/istanbul-111546" },
  @{ Name = "visa-detail"; Path = "/fa/visa/turkey" },
  @{ Name = "flights"; Path = "/fa/flights" }
)

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$failed = $false

foreach ($page in $pages) {
  $jsonPath = Join-Path $OutDir "$($page.Name).json"
  $url = "$BaseUrl$($page.Path)"
  Write-Host "Lighthouse: $url"

  $lighthouseArgs = @(
    "lighthouse", $url,
    "--output", "json",
    "--output-path", $jsonPath,
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
    "--quiet"
  )
  if ($Desktop) {
    $lighthouseArgs += "--preset=desktop"
  }

  npx @lighthouseArgs | Out-Null
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $jsonPath)) {
    Write-Error "Lighthouse failed for $url"
    $failed = $true
    continue
  }

  $report = Get-Content $jsonPath -Raw | ConvertFrom-Json
  $perf = [math]::Round($report.categories.performance.score * 100)
  $seo = [math]::Round($report.categories.seo.score * 100)
  $a11y = [math]::Round($report.categories.accessibility.score * 100)
  $bp = [math]::Round($report.categories."best-practices".score * 100)

  Write-Host "  performance=$perf seo=$seo accessibility=$a11y best-practices=$bp"

  $perfMin = if ($Desktop) { 80 } else { 70 }
  if ($perf -lt $perfMin) {
    Write-Warning "$($page.Name): performance $perf < $perfMin"
    $failed = $true
  }
  if ($seo -lt 95) {
    Write-Warning "$($page.Name): SEO $seo < 95. Build with NEXT_PUBLIC_SITE_URL set to $BaseUrl for a local canonical match."
    $failed = $true
  }
  if ($a11y -lt 95) {
    Write-Warning "$($page.Name): accessibility $a11y < 95"
    $failed = $true
  }
  if ($bp -lt 90) {
    Write-Warning "$($page.Name): best-practices $bp < 90"
    $failed = $true
  }
}

if ($failed) {
  throw "Lighthouse budgets failed. Inspect $OutDir."
}

Write-Host "Lighthouse budgets passed."

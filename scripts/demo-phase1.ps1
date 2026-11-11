param(
    [string]$BaseUrl = "http://localhost:5094"
)

$ErrorActionPreference = "Stop"
$suffix = Get-Date -Format "HHmmss"

function PostJson {
    param($Url, $Body, $Headers = @{})

    Invoke-RestMethod -Method Post `
        -Uri $Url `
        -ContentType "application/json" `
        -Body ($Body | ConvertTo-Json -Depth 10) `
        -Headers $Headers
}

Write-Host "== 1. Create agency =="
$agencyId = PostJson "$BaseUrl/internal/v1/agencies" @{
    slug = "demo-agency-$suffix"
    name = "Demo Agency $suffix"
    licenseNo = "B-$suffix"
    city = "Tehran"
}
Write-Host "AgencyId: $agencyId"

Write-Host "== 2. Create API client =="
$client = PostJson "$BaseUrl/internal/v1/agencies/$agencyId/api-clients" @{
    name = "Demo Website"
    scopes = @("supplier.write", "channel.catalog.read")
}
Write-Host "ClientId: $($client.clientId)"

Write-Host "== 3. Create destination =="
$destinationId = PostJson "$BaseUrl/internal/v1/destinations" @{
    slug = "istanbul-$suffix"
    type = 2
    parentId = $null
    translations = @(
        @{ locale = "fa"; name = "استانبول" },
        @{ locale = "en"; name = "Istanbul" },
        @{ locale = "ar"; name = "إسطنبول" }
    )
}
Write-Host "DestinationId: $destinationId"

Write-Host "== 4. Create and publish tour product =="
$productId = PostJson "$BaseUrl/internal/v1/products" @{
    slug = "istanbul-$suffix"
    durationDays = 4
    tourType = "city-break"
    destinationIds = @($destinationId)
    translations = @(
        @{ locale = "fa"; title = "تور استانبول"; summary = "تور شهرگردی"; description = "برنامه سفر" },
        @{ locale = "en"; title = "Istanbul 4 Nights"; summary = "City break"; description = "Itinerary" },
        @{ locale = "ar"; title = "إسطنبول ٤ ليال"; summary = "رحلة مدينة"; description = "برنامج الرحلة" }
    )
}
Invoke-RestMethod -Method Post -Uri "$BaseUrl/internal/v1/products/$productId/publish" | Out-Null
Write-Host "ProductId: $productId (published)"

$headers = @{
    "X-Api-Key" = $client.clientId
    "X-Api-Secret" = $client.clientSecret
    "Idempotency-Key" = "demo-upsert-$suffix"
}

Write-Host "== 5. Supplier upsert offer =="
$offer = Invoke-RestMethod -Method Put `
    -Uri "$BaseUrl/supplier/v1/offers/ext-istanbul-$suffix" `
    -ContentType "application/json" `
    -Headers $headers `
    -Body (@{
        tourProductId = $productId
        title = "Demo Istanbul Offer"
        basePrice = 45000000
        currency = "IRR"
    } | ConvertTo-Json)
Write-Host "OfferId: $($offer.offerId) / Created: $($offer.created)"

Write-Host "== 5b. Idempotent upsert =="
$offerAgain = Invoke-RestMethod -Method Put `
    -Uri "$BaseUrl/supplier/v1/offers/ext-istanbul-$suffix" `
    -ContentType "application/json" `
    -Headers $headers `
    -Body (@{
        tourProductId = $productId
        title = "Demo Istanbul Offer"
        basePrice = 45000000
        currency = "IRR"
    } | ConvertTo-Json)
Write-Host "SameOffer: $($offerAgain.offerId -eq $offer.offerId) / Created: $($offerAgain.created)"

Write-Host "== 6. Create departure =="
$departureId = PostJson "$BaseUrl/supplier/v1/offers/$($offer.offerId)/departures" @{
    startDate = "2026-11-16"
    endDate = "2026-11-19"
    capacity = 10
    prices = @(
        @{ roomType = 0; amount = 45000000; currency = "IRR" },
        @{ roomType = 1; amount = 60000000; currency = "IRR" }
    )
} $headers
Write-Host "DepartureId: $departureId"

Write-Host "== 7. Update availability =="
Invoke-RestMethod -Method Patch `
    -Uri "$BaseUrl/supplier/v1/departures/$departureId/availability" `
    -ContentType "application/json" `
    -Headers $headers `
    -Body (@{ seatsLeft = 2; version = 1 } | ConvertTo-Json) | Out-Null
Write-Host "Availability updated"

Write-Host "== 8. Read departures =="
$departures = Invoke-RestMethod -Method Get `
    -Uri "$BaseUrl/supplier/v1/offers/$($offer.offerId)/departures" `
    -Headers $headers
Write-Host "SeatsLeft: $($departures[0].seatsLeft) / Version: $($departures[0].version)"

Write-Host "== 8b. Submit and approve offer =="
Invoke-RestMethod -Method Post `
    -Uri "$BaseUrl/supplier/v1/offers/$($offer.offerId)/submit" `
    -Headers $headers | Out-Null
Invoke-RestMethod -Method Post `
    -Uri "$BaseUrl/internal/v1/offers/$($offer.offerId)/approve" | Out-Null
$approved = Invoke-RestMethod -Method Get `
    -Uri "$BaseUrl/supplier/v1/offers/$($offer.offerId)" `
    -Headers $headers
Write-Host "OfferStatus: $($approved.status)"

Write-Host "== 9. Marketplace product =="
$market = Invoke-RestMethod -Method Get -Uri "$BaseUrl/market/v1/products/$productId"
Write-Host "Translations: $($market.translations.Count) / Destinations: $($market.destinationIds.Count)"

Write-Host "== 10. Unauthorized supplier request =="
try {
    Invoke-RestMethod -Method Get -Uri "$BaseUrl/supplier/v1/offers/$($offer.offerId)" | Out-Null
    Write-Host "FAILED: expected 401"
}
catch {
    Write-Host "Received: $($_.Exception.Response.StatusCode.value__)"
}

Write-Host "== 11. Tenant isolation =="
$otherAgencyId = PostJson "$BaseUrl/internal/v1/agencies" @{
    slug = "demo-agency-other-$suffix"
    name = "Other Agency"
    licenseNo = "B-OTHER-$suffix"
    city = "Shiraz"
}
$otherClient = PostJson "$BaseUrl/internal/v1/agencies/$otherAgencyId/api-clients" @{
    name = "Other Website"
    scopes = @("supplier.write")
}
$otherHeaders = @{
    "X-Api-Key" = $otherClient.clientId
    "X-Api-Secret" = $otherClient.clientSecret
}
try {
    Invoke-RestMethod -Method Get `
        -Uri "$BaseUrl/supplier/v1/offers/$($offer.offerId)" `
        -Headers $otherHeaders | Out-Null
    Write-Host "FAILED: expected 404"
}
catch {
    Write-Host "Received: $($_.Exception.Response.StatusCode.value__)"
}

Write-Host "Demo complete."

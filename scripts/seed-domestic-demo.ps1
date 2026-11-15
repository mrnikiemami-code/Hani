param(
    [string]$BaseUrl = "http://localhost:5099"
)

$ErrorActionPreference = "Stop"
$suffix = Get-Date -Format "HHmmss"

function ConvertTo-JsonBody {
    param($Body)
    $json = $Body | ConvertTo-Json -Depth 10 -Compress
    return [System.Text.Encoding]::UTF8.GetBytes($json)
}

function PostJson {
    param($Url, $Body, $Headers = @{})

    Invoke-RestMethod -Method Post `
        -Uri $Url `
        -ContentType "application/json; charset=utf-8" `
        -Body ([byte[]](ConvertTo-JsonBody $Body)) `
        -Headers $Headers
}

Write-Host "== Create domestic demo agency =="
$agencyId = PostJson "$BaseUrl/internal/v1/agencies" @{
    slug = "hani-domestic-$suffix"
    name = "Hani Domestic Tours"
    licenseNo = "D-$suffix"
    city = "Tehran"
}

$client = PostJson "$BaseUrl/internal/v1/agencies/$agencyId/api-clients" @{
    name = "Hani Domestic Seed"
    scopes = @("supplier.write", "channel.catalog.read")
}

Write-Host "== Create domestic destination =="
$destinationId = PostJson "$BaseUrl/internal/v1/destinations" @{
    slug = "kish-island-$suffix"
    type = 2
    parentId = $null
    translations = @(
        @{ locale = "fa"; name = "جزیره کیش" },
        @{ locale = "en"; name = "Kish Island" },
        @{ locale = "ar"; name = "جزيرة كيش" }
    )
}

Write-Host "== Create domestic tour product =="
$productId = PostJson "$BaseUrl/internal/v1/products" @{
    slug = "kish-island-tour-$suffix"
    durationDays = 4
    tourType = "coastal"
    scope = "Domestic"
    destinationIds = @($destinationId)
    translations = @(
        @{
            locale = "fa"
            title = "تور چهار روزه جزیره کیش"
            summary = "اقامت چهار ستاره با پرواز و ترانسفر"
            description = "یک سفر آرام به جزیره کیش با اقامت در هتل چهار ستاره، پرواز رفت و برگشت و ترانسفر فرودگاهی."
        },
        @{
            locale = "en"
            title = "Kish Island 4-Day Tour"
            summary = "Four-star stay with flights and transfers"
            description = "A relaxed four-day trip to Kish Island including a four-star hotel, return flights, and airport transfers."
        },
        @{
            locale = "ar"
            title = "جولة جزيرة كيش لمدة أربعة أيام"
            summary = "إقامة في فندق أربع نجوم مع الرحلات الجوية والتنقلات"
            description = "رحلة هادئة إلى جزيرة كيش تتضمن فندقاً أربع نجوم ورحلات ذهاب وإياب وتنقلات من المطار."
        }
    )
}
Invoke-RestMethod -Method Post -Uri "$BaseUrl/internal/v1/products/$productId/publish" | Out-Null

$headers = @{
    "X-Api-Key" = $client.clientId
    "X-Api-Secret" = $client.clientSecret
    "Idempotency-Key" = "domestic-upsert-$suffix"
}

Write-Host "== Publish domestic offer =="
$offer = Invoke-RestMethod -Method Put `
    -Uri "$BaseUrl/supplier/v1/offers/ext-kish-$suffix" `
    -ContentType "application/json; charset=utf-8" `
    -Headers $headers `
    -Body ([byte[]](ConvertTo-JsonBody @{
        tourProductId = $productId
        title = "Kish Island 4-Day Tour"
        basePrice = 185000000
        currency = "IRR"
    }))

$departureId = PostJson "$BaseUrl/supplier/v1/offers/$($offer.offerId)/departures" @{
    startDate = "2026-12-10"
    endDate = "2026-12-13"
    capacity = 20
    prices = @(
        @{ roomType = 0; amount = 185000000; currency = "IRR" },
        @{ roomType = 1; amount = 240000000; currency = "IRR" }
    )
} $headers

Invoke-RestMethod -Method Patch `
    -Uri "$BaseUrl/supplier/v1/departures/$departureId/availability" `
    -ContentType "application/json; charset=utf-8" `
    -Headers $headers `
    -Body ([byte[]](ConvertTo-JsonBody @{ seatsLeft = 8; version = 1 })) | Out-Null

Invoke-RestMethod -Method Post -Uri "$BaseUrl/supplier/v1/offers/$($offer.offerId)/submit" -Headers $headers | Out-Null
Invoke-RestMethod -Method Post -Uri "$BaseUrl/internal/v1/offers/$($offer.offerId)/approve" | Out-Null

Write-Host "DomesticProductId: $productId"
Write-Host "DomesticDestinationId: $destinationId"
Write-Host "OfferId: $($offer.offerId)"

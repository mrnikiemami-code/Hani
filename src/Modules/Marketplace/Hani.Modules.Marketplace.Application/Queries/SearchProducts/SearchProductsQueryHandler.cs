using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.Contracts.Catalog;
using Hani.Contracts.Identity;
using Hani.Contracts.Supply;

namespace Hani.Modules.Marketplace.Application.Queries.SearchProducts;

internal sealed class SearchProductsQueryHandler(
    ICatalogReadService catalog,
    IOfferReadService offers,
    ILanguageCatalog languages,
    IReviewSummaryReadService reviews,
    IAgencyReadService agencies,
    ICacheService cache)
    : IQueryHandler<SearchProductsQuery, PagedResult<ProductSearchItemDto>>
{
    public async Task<Result<PagedResult<ProductSearchItemDto>>> Handle(
        SearchProductsQuery request,
        CancellationToken cancellationToken)
    {
        var cacheKey = "market:search:" + JsonSerializer.Serialize(request);
        var cached = await cache.GetAsync<PagedResult<ProductSearchItemDto>>(
            cacheKey,
            cancellationToken);

        if (cached is not null)
        {
            return Result<PagedResult<ProductSearchItemDto>>.Success(cached);
        }

        var locale = languages.Normalize(request.Locale);
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var skip = (page - 1) * pageSize;

        var products = await catalog.SearchPublishedAsync(
            new CatalogProductFilter(
                request.DestinationSlug,
                request.OriginSlug,
                request.MinDuration,
                request.MaxDuration,
                request.TourType,
                request.Difficulty,
                request.VehicleType,
                request.AccommodationType,
                request.Q,
                request.Category,
                request.TravelType,
                request.Scope),
            0,
            int.MaxValue,
            cancellationToken);

        var items = new List<SearchCandidate>(products.Count);
        var offersByProduct = await offers.GetApprovedOffersByProductIdsAsync(
            products.Select(product => product.Id).ToArray(),
            cancellationToken);

        var productIds = products.Select(product => product.Id).ToArray();
        var destinationIds = products
            .SelectMany(product => product.DestinationIds)
            .Distinct()
            .ToArray();
        var destinationLookup = destinationIds.Length == 0
            ? new Dictionary<Guid, CatalogDestinationSnapshot>()
            : (await catalog.GetDestinationsAsync(destinationIds, cancellationToken))
                .ToDictionary(destination => destination.Id);
        var reviewLookup = productIds.Length == 0
            ? new Dictionary<Guid, ReviewSummary>()
            : (await reviews.GetSummariesAsync("Tour", productIds, cancellationToken))
                .ToDictionary(item => item.Key, item => item.Value);
        var agencyIds = offersByProduct.Values
            .SelectMany(group => group)
            .Select(offer => offer.AgencyId)
            .Distinct()
            .ToArray();
        var agencyNames = agencyIds.Length == 0
            ? new Dictionary<Guid, string>()
            : (await agencies.GetNamesAsync(agencyIds, cancellationToken))
                .ToDictionary(item => item.Key, item => item.Value);

        foreach (var product in products)
        {
            var productOffers = offersByProduct.TryGetValue(product.Id, out var loadedOffers)
                ? loadedOffers
                : [];

            var filteredOffers = productOffers
                .Select(offer => FilterOffer(offer, request))
                .Where(offer => offer is not null)
                .Cast<OfferSnapshot>()
                .ToArray();

            if (filteredOffers.Length == 0)
            {
                continue;
            }

            var minPrices = ComputeMinPrices(filteredOffers, request.Currency);

            if (!MatchesPrice(minPrices, request))
            {
                continue;
            }

            var primary = minPrices[0];
            var destinationNames = product.DestinationIds
                .Select(id => destinationLookup.TryGetValue(id, out var destination)
                    ? Resolve(destination.Names, locale, languages.DefaultLanguage)
                    : null)
                .Where(name => !string.IsNullOrWhiteSpace(name))
                .Cast<string>()
                .ToArray();
            var firstOffer = filteredOffers[0];
            var agencyName = agencyNames.TryGetValue(firstOffer.AgencyId, out var resolvedAgency)
                ? resolvedAgency
                : null;
            var reviewSummary = reviewLookup.TryGetValue(product.Id, out var summary)
                ? summary
                : null;
            var nextDeparture = filteredOffers
                .SelectMany(offer => offer.Departures)
                .OrderBy(departure => departure.StartDate)
                .Select(departure => (DateOnly?)departure.StartDate)
                .FirstOrDefault();

            items.Add(new SearchCandidate(
                new ProductSearchItemDto(
                    product.Id,
                    product.Slug,
                    Resolve(product.Titles, locale, languages.DefaultLanguage),
                    product.DurationDays,
                    product.TourType,
                    primary.Amount,
                    primary.Currency,
                    filteredOffers.Length,
                    product.DestinationIds,
                    minPrices,
                    product.OriginDestinationId,
                    product.Difficulty,
                    product.VehicleType,
                    product.LocalVehicleType,
                    product.AccommodationType,
                    filteredOffers
                        .Select(offer => offer.BookingMode)
                        .Distinct(StringComparer.OrdinalIgnoreCase)
                        .OrderBy(mode => mode, StringComparer.OrdinalIgnoreCase)
                        .ToArray(),
                    filteredOffers.Any(offer => offer.InstallmentTerms is { IsEnabled: true }),
                    product.Category,
                    product.TravelType,
                    destinationNames,
                    reviewSummary?.AverageRating,
                    reviewSummary?.ReviewCount ?? 0,
                    agencyName,
                    nextDeparture,
                    product.Scope,
                    product.CoverImageUrl),
                product.UpdatedAt));
        }

        var sorted = Sort(items, request.Sort);
        var total = sorted.Length;
        var pageItems = sorted
            .Skip(skip)
            .Take(pageSize)
            .Select(item => item.Dto)
            .ToArray();

        var result = new PagedResult<ProductSearchItemDto>(pageItems, page, pageSize, total);
        await cache.SetAsync(
            cacheKey,
            result,
            TimeSpan.FromSeconds(30),
            cancellationToken);
        return Result<PagedResult<ProductSearchItemDto>>.Success(result);
    }

    private static OfferSnapshot? FilterOffer(OfferSnapshot offer, SearchProductsQuery request)
    {
        if (request.OnlineOnly &&
            !string.Equals(offer.BookingMode, "Online", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        if (request.InstallmentOnly &&
            offer.InstallmentTerms is not { IsEnabled: true })
        {
            return null;
        }

        if (request.AgencyId is { } agencyId && offer.AgencyId != agencyId)
        {
            return null;
        }

        if (request.HotelStars is { } stars &&
            offer.AccommodationOptions.All(option => option.HotelStars != stars))
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(request.MealPlan) &&
            offer.AccommodationOptions.All(option =>
                !string.Equals(option.MealPlan, request.MealPlan, StringComparison.OrdinalIgnoreCase)))
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(request.Hotel) &&
            offer.AccommodationOptions.All(option =>
                !option.HotelName.Contains(request.Hotel, StringComparison.OrdinalIgnoreCase)))
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(request.Airline) &&
            offer.FlightOptions.All(option =>
                !option.Airline.Contains(request.Airline, StringComparison.OrdinalIgnoreCase)))
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(request.Cabin) &&
            offer.FlightOptions.All(option =>
                !option.Cabin.Contains(request.Cabin, StringComparison.OrdinalIgnoreCase)))
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(request.RoomType) &&
            offer.Departures.All(departure => departure.Prices.All(price =>
                !string.Equals(price.RoomType, request.RoomType, StringComparison.OrdinalIgnoreCase))) &&
            offer.AccommodationOptions.All(option =>
                !string.Equals(option.RoomType, request.RoomType, StringComparison.OrdinalIgnoreCase)))
        {
            return null;
        }

        var seats = request.Adults is { } adults
            ? adults + (request.Children ?? 0)
            : 0;

        var departures = offer.Departures
            .Where(departure => seats == 0 || departure.SeatsLeft >= seats)
            .Where(departure =>
                request.StartDate is null || departure.StartDate >= request.StartDate.Value)
            .Where(departure =>
                request.EndDate is null || departure.StartDate <= request.EndDate.Value)
            .Select(departure =>
            {
                if (string.IsNullOrWhiteSpace(request.Currency))
                {
                    return departure;
                }

                var prices = departure.Prices
                    .Where(price => string.Equals(
                        price.Currency,
                        request.Currency,
                        StringComparison.OrdinalIgnoreCase))
                    .ToArray();

                return prices.Length == 0
                    ? null
                    : departure with { Prices = prices };
            })
            .Where(departure => departure is not null)
            .Cast<DepartureSnapshot>()
            .ToArray();

        return departures.Length == 0
            ? null
            : offer with { Departures = departures };
    }

    private static CurrencyPriceDto[] ComputeMinPrices(
        IReadOnlyList<OfferSnapshot> offers,
        string? currency)
    {
        var prices = offers
            .SelectMany(offer => offer.Departures)
            .SelectMany(departure => departure.Prices)
            .Where(price => IsAdultRoomType(price.RoomType))
            .Where(price =>
                string.IsNullOrWhiteSpace(currency) ||
                string.Equals(price.Currency, currency, StringComparison.OrdinalIgnoreCase))
            .ToArray();

        if (prices.Length == 0)
        {
            prices = offers
                .SelectMany(offer => offer.Departures)
                .SelectMany(departure => departure.Prices)
                .Where(price =>
                    string.IsNullOrWhiteSpace(currency) ||
                    string.Equals(price.Currency, currency, StringComparison.OrdinalIgnoreCase))
                .ToArray();
        }

        var groups = prices
            .GroupBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
            .Select(group => new CurrencyPriceDto(
                group.Key,
                group.Min(price => price.Amount)))
            .OrderBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (groups.Length > 0)
        {
            return groups;
        }

        return offers
            .GroupBy(offer => offer.Currency, StringComparer.OrdinalIgnoreCase)
            .Select(group => new CurrencyPriceDto(
                group.Key,
                group.Min(offer => offer.BasePrice)))
            .OrderBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
            .ToArray();
    }

    private static bool MatchesPrice(
        CurrencyPriceDto[] prices,
        SearchProductsQuery request)
    {
        if (prices.Length == 0)
        {
            return false;
        }

        if (!string.IsNullOrWhiteSpace(request.Currency))
        {
            var price = prices[0];
            return (request.MinPrice is null || price.Amount >= request.MinPrice) &&
                   (request.MaxPrice is null || price.Amount <= request.MaxPrice);
        }

        return prices.Any(price =>
            (request.MinPrice is null || price.Amount >= request.MinPrice) &&
            (request.MaxPrice is null || price.Amount <= request.MaxPrice));
    }

    private static SearchCandidate[] Sort(
        IReadOnlyList<SearchCandidate> items,
        string? sort)
        => sort?.Trim().ToLowerInvariant() switch
        {
            "price_asc" => items.OrderBy(item => item.Dto.MinPrice ?? 0m).ToArray(),
            "price_desc" => items.OrderByDescending(item => item.Dto.MinPrice ?? 0m).ToArray(),
            "duration_asc" => items.OrderBy(item => item.Dto.DurationDays).ToArray(),
            "duration_desc" => items.OrderByDescending(item => item.Dto.DurationDays).ToArray(),
            "title" => items
                .OrderBy(item => item.Dto.Title, StringComparer.OrdinalIgnoreCase)
                .ToArray(),
            _ => items.OrderByDescending(item => item.UpdatedAt).ToArray()
        };

    private static bool IsAdultRoomType(string roomType)
        => roomType is "Double" or "Single" or "Triple";

    private static string Resolve(
        IReadOnlyDictionary<string, string> values,
        string locale,
        string defaultLanguage)
    {
        var preferred = values.TryGetValue(locale, out var value)
            ? value
            : values.TryGetValue(defaultLanguage, out var fallback)
                ? fallback
                : values.Values.FirstOrDefault() ?? string.Empty;

        if (!IsCorrupted(preferred))
        {
            return preferred;
        }

        return values.Values.FirstOrDefault(candidate => !IsCorrupted(candidate)) ?? preferred;
    }

    private static bool IsCorrupted(string value)
        => value.Contains('\uFFFD') ||
           value.Contains("???", StringComparison.Ordinal) ||
           value.Count(character => character == '?') >= 3;

    private sealed record SearchCandidate(
        ProductSearchItemDto Dto,
        DateTimeOffset UpdatedAt);
}

using Hani.BuildingBlocks.Application;
using Hani.Contracts.Catalog;
using Hani.Contracts.Identity;
using Hani.Contracts.Supply;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductComparison;

internal sealed class GetProductComparisonQueryHandler(
    ICatalogReadService catalog,
    IOfferReadService offers,
    IAgencyReadService agencies,
    ILanguageCatalog languages)
    : IQueryHandler<GetProductComparisonQuery, ProductComparisonDto>
{
    public async Task<Result<ProductComparisonDto>> Handle(
        GetProductComparisonQuery request,
        CancellationToken cancellationToken)
    {
        var locale = languages.Normalize(request.Locale);
        var product = await catalog.GetPublishedByIdAsync(request.ProductId, cancellationToken);

        if (product is null)
        {
            return Result<ProductComparisonDto>.Failure(
                Error.NotFound("HANI-MARKET-1004", "Published product was not found."));
        }

        var productOffers = await offers.GetApprovedOffersAsync(
            request.ProductId,
            cancellationToken);

        var agencyIds = productOffers
            .Select(offer => offer.AgencyId)
            .Distinct()
            .ToArray();

        var agencyNames = await agencies.GetNamesAsync(agencyIds, cancellationToken);

        var mappedOffers = productOffers
            .Select(offer => MapOffer(offer, agencyNames))
            .OrderBy(offer => offer.MinPrices.Count > 0 ? offer.MinPrices[0].Amount : 0m)
            .ToArray();

        var dto = new ProductComparisonDto(
            product.Id,
            product.Slug,
            Resolve(product.Titles, locale, languages.DefaultLanguage),
            Resolve(product.Summaries, locale, languages.DefaultLanguage),
            Resolve(product.Descriptions, locale, languages.DefaultLanguage),
            product.DurationDays,
            mappedOffers);

        return Result<ProductComparisonDto>.Success(dto);
    }

    private static OfferComparisonDto MapOffer(
        OfferSnapshot offer,
        IReadOnlyDictionary<Guid, string> agencyNames)
    {
        var prices = offer.Departures
            .SelectMany(departure => departure.Prices)
            .Where(price => IsAdultRoomType(price.RoomType))
            .ToArray();

        if (prices.Length == 0)
        {
            prices = offer.Departures
                .SelectMany(departure => departure.Prices)
                .ToArray();
        }

        var minPrices = prices
            .GroupBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
            .Select(group => new CurrencyPriceDto(
                group.Key,
                group.Min(price => price.Amount)))
            .OrderBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (minPrices.Length == 0)
        {
            minPrices =
            [
                new CurrencyPriceDto(offer.Currency, offer.BasePrice)
            ];
        }

        var primaryPrice = minPrices[0];
        var agencyName = agencyNames.TryGetValue(offer.AgencyId, out var name)
            ? name
            : "Agency";

        return new OfferComparisonDto(
            offer.OfferId,
            offer.AgencyId,
            agencyName,
            offer.Title,
            primaryPrice.Amount,
            primaryPrice.Currency,
            minPrices,
            offer.AccommodationOptions
                .Select(option => new AccommodationOptionComparisonDto(
                    option.OptionId,
                    option.HotelName,
                    option.HotelStars,
                    option.RoomType,
                    option.MealPlan,
                    option.Amount,
                    option.Currency,
                    option.Description))
                .ToArray(),
            offer.FlightOptions
                .Select(option => new FlightOptionComparisonDto(
                    option.OptionId,
                    option.Direction,
                    option.Airline,
                    option.FlightNumber,
                    option.DepartureAirport,
                    option.ArrivalAirport,
                    option.DepartureTime,
                    option.ArrivalTime,
                    option.DurationMinutes,
                    option.Cabin,
                    option.BaggageAllowance))
                .ToArray(),
            offer.TaxRules
                .Select(rule => new TaxRuleComparisonDto(
                    rule.Currency,
                    rule.VatStatus,
                    rule.VatRate,
                    rule.DutyStatus,
                    rule.DutyRate,
                    rule.ExemptionReason))
                .ToArray(),
            offer.Departures
                .Select(departure => new DepartureComparisonDto(
                    departure.Id,
                    departure.StartDate,
                    departure.EndDate,
                    departure.SeatsLeft,
                    departure.Status,
                    departure.Prices
                        .Select(price => new DeparturePriceComparisonDto(
                            price.RoomType,
                            price.Amount,
                            price.Currency))
                        .ToArray()))
                .ToArray(),
            offer.BookingMode,
            offer.CollectionMode);
    }

    private static bool IsAdultRoomType(string roomType)
        => roomType is "Double" or "Single" or "Triple";

    private static string Resolve(
        IReadOnlyDictionary<string, string> values,
        string locale,
        string defaultLanguage)
        => values.TryGetValue(locale, out var value)
            ? value
            : values.TryGetValue(defaultLanguage, out var fallback)
                ? fallback
                : values.Values.FirstOrDefault() ?? string.Empty;
}

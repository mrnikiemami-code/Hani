using Hani.BuildingBlocks.Application;
using Hani.Contracts.Catalog;
using Hani.Contracts.Identity;
using Hani.Contracts.Supply;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductComparison;

internal sealed class GetProductComparisonQueryHandler(
    ICatalogReadService catalog,
    IOfferReadService offers,
    IAgencyReadService agencies)
    : IQueryHandler<GetProductComparisonQuery, ProductComparisonDto>
{
    public async Task<Result<ProductComparisonDto>> Handle(
        GetProductComparisonQuery request,
        CancellationToken cancellationToken)
    {
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
            .OrderBy(offer => offer.MinPrice)
            .ToArray();

        var dto = new ProductComparisonDto(
            product.Id,
            product.Slug,
            Resolve(product.Titles, request.Locale),
            Resolve(product.Summaries, request.Locale),
            Resolve(product.Descriptions, request.Locale),
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
            .ToArray();

        var minPrice = prices.Length > 0
            ? prices.Min(price => price.Amount)
            : offer.BasePrice;

        var currency = prices.FirstOrDefault()?.Currency ?? offer.Currency;
        var agencyName = agencyNames.TryGetValue(offer.AgencyId, out var name)
            ? name
            : "Agency";

        return new OfferComparisonDto(
            offer.OfferId,
            offer.AgencyId,
            agencyName,
            offer.Title,
            minPrice,
            currency,
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
                .ToArray());
    }

    private static string Resolve(
        IReadOnlyDictionary<string, string> values,
        string locale)
        => values.TryGetValue(locale, out var value)
            ? value
            : values.TryGetValue("fa", out var fallback)
                ? fallback
                : values.Values.FirstOrDefault() ?? string.Empty;
}

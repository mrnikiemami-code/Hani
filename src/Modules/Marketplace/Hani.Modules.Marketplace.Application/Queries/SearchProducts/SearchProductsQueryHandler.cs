using Hani.BuildingBlocks.Application;
using Hani.Contracts.Catalog;
using Hani.Contracts.Supply;

namespace Hani.Modules.Marketplace.Application.Queries.SearchProducts;

internal sealed class SearchProductsQueryHandler(
    ICatalogReadService catalog,
    IOfferReadService offers,
    ILanguageCatalog languages)
    : IQueryHandler<SearchProductsQuery, PagedResult<ProductSearchItemDto>>
{
    public async Task<Result<PagedResult<ProductSearchItemDto>>> Handle(
        SearchProductsQuery request,
        CancellationToken cancellationToken)
    {
        var locale = languages.Normalize(request.Locale);
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var skip = (page - 1) * pageSize;

        var total = await catalog.CountPublishedAsync(
            request.DestinationSlug,
            cancellationToken);

        var products = await catalog.SearchPublishedAsync(
            request.DestinationSlug,
            skip,
            pageSize,
            cancellationToken);

        // A scoped DbContext is not thread-safe; read offers sequentially for this MVP page size.
        var offersByProduct = new List<IReadOnlyList<OfferSnapshot>>(products.Count);

        foreach (var product in products)
        {
            offersByProduct.Add(await offers.GetApprovedOffersAsync(
                product.Id,
                cancellationToken));
        }

        var items = products
            .Select((product, index) =>
            {
                var productOffers = offersByProduct[index];
                var departurePrices = productOffers
                    .SelectMany(offer => offer.Departures)
                    .SelectMany(departure => departure.Prices)
                    .Where(price => IsAdultRoomType(price.RoomType))
                    .ToArray();

                if (departurePrices.Length == 0)
                {
                    departurePrices = productOffers
                        .SelectMany(offer => offer.Departures)
                        .SelectMany(departure => departure.Prices)
                        .ToArray();
                }

                var minPrices = departurePrices
                    .GroupBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
                    .Select(group => new CurrencyPriceDto(
                        group.Key,
                        group.Min(price => price.Amount)))
                    .OrderBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
                    .ToArray();

                if (minPrices.Length == 0)
                {
                    minPrices = productOffers
                        .GroupBy(offer => offer.Currency, StringComparer.OrdinalIgnoreCase)
                        .Select(group => new CurrencyPriceDto(
                            group.Key,
                            group.Min(offer => offer.BasePrice)))
                        .OrderBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
                        .ToArray();
                }

                var primaryPrice = minPrices.FirstOrDefault();

                return new ProductSearchItemDto(
                    product.Id,
                    product.Slug,
                    Resolve(product.Titles, locale, languages.DefaultLanguage),
                    product.DurationDays,
                    product.TourType,
                    primaryPrice?.Amount,
                    primaryPrice?.Currency,
                    productOffers.Count,
                    product.DestinationIds,
                    minPrices);
            })
            .ToArray();

        return Result<PagedResult<ProductSearchItemDto>>.Success(
            new PagedResult<ProductSearchItemDto>(items, page, pageSize, total));
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

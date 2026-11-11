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
                var minPrice = productOffers
                    .SelectMany(offer => offer.Departures)
                    .SelectMany(departure => departure.Prices)
                    .Select(price => (decimal?)price.Amount)
                    .Min();

                if (minPrice is null)
                {
                    minPrice = productOffers
                        .Select(offer => (decimal?)offer.BasePrice)
                        .Min();
                }

                var currency = productOffers
                    .SelectMany(offer => offer.Departures)
                    .SelectMany(departure => departure.Prices)
                    .Select(price => price.Currency)
                    .FirstOrDefault()
                    ?? productOffers.Select(offer => offer.Currency).FirstOrDefault();

                return new ProductSearchItemDto(
                    product.Id,
                    product.Slug,
                    Resolve(product.Titles, locale, languages.DefaultLanguage),
                    product.DurationDays,
                    product.TourType,
                    minPrice,
                    currency,
                    productOffers.Count,
                    product.DestinationIds);
            })
            .ToArray();

        return Result<PagedResult<ProductSearchItemDto>>.Success(
            new PagedResult<ProductSearchItemDto>(items, page, pageSize, total));
    }

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

using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.SearchProducts;

/// <summary>
/// Query that searches published products and enriches them with offer price/count.
/// </summary>
public sealed record SearchProductsQuery(
    string? Locale,
    string? DestinationSlug = null,
    int Page = 1,
    int PageSize = 20) : IQuery<PagedResult<ProductSearchItemDto>>;

/// <summary>
/// Minimum price for one currency.
/// </summary>
public sealed record CurrencyPriceDto(
    string Currency,
    decimal Amount);

/// <summary>
/// Marketplace search result item.
/// </summary>
public sealed record ProductSearchItemDto(
    Guid ProductId,
    string Slug,
    string Title,
    int DurationDays,
    string TourType,
    decimal? MinPrice,
    string? Currency,
    int OfferCount,
    IReadOnlyList<Guid> DestinationIds,
    IReadOnlyList<CurrencyPriceDto> MinPrices);

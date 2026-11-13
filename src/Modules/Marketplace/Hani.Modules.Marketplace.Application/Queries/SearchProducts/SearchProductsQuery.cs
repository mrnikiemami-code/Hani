using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.SearchProducts;

/// <summary>
/// Query that searches published products and enriches them with offer price/count.
/// </summary>
public sealed record SearchProductsQuery(
    string? Locale,
    string? DestinationSlug = null,
    string? OriginSlug = null,
    DateOnly? StartDate = null,
    DateOnly? EndDate = null,
    int? MinDuration = null,
    int? MaxDuration = null,
    string? TourType = null,
    string? Difficulty = null,
    string? VehicleType = null,
    string? AccommodationType = null,
    decimal? MinPrice = null,
    decimal? MaxPrice = null,
    string? Currency = null,
    int? HotelStars = null,
    string? MealPlan = null,
    string? Airline = null,
    Guid? AgencyId = null,
    int? Adults = null,
    int? Children = null,
    int? Infants = null,
    string? Hotel = null,
    string? RoomType = null,
    string? Cabin = null,
    string? Q = null,
    bool OnlineOnly = false,
    string? Sort = null,
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
    IReadOnlyList<CurrencyPriceDto> MinPrices,
    Guid? OriginDestinationId,
    string Difficulty,
    string VehicleType,
    string LocalVehicleType,
    string AccommodationType);

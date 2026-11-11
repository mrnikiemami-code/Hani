using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductComparison;

/// <summary>
/// Query that returns one product with all approved agency offers for comparison.
/// </summary>
public sealed record GetProductComparisonQuery(Guid ProductId, string? Locale)
    : IQuery<ProductComparisonDto>;

/// <summary>
/// Product comparison read model.
/// </summary>
public sealed record ProductComparisonDto(
    Guid ProductId,
    string Slug,
    string Title,
    string Summary,
    string Description,
    int DurationDays,
    IReadOnlyList<OfferComparisonDto> Offers);

/// <summary>
/// One agency offer in the comparison table.
/// </summary>
public sealed record OfferComparisonDto(
    Guid OfferId,
    Guid AgencyId,
    string AgencyName,
    string Title,
    decimal MinPrice,
    string Currency,
    IReadOnlyList<DepartureComparisonDto> Departures);

/// <summary>
/// One departure option inside an offer.
/// </summary>
public sealed record DepartureComparisonDto(
    Guid Id,
    DateOnly StartDate,
    DateOnly EndDate,
    int SeatsLeft,
    string Status,
    IReadOnlyList<DeparturePriceComparisonDto> Prices);

/// <summary>
/// Price by room/passenger type.
/// </summary>
public sealed record DeparturePriceComparisonDto(
    string RoomType,
    decimal Amount,
    string Currency);

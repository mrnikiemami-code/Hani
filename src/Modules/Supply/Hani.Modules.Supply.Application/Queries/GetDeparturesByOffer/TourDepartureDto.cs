using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;

/// <summary>
/// Departure price read model.
/// </summary>
public sealed record DeparturePriceDto(
    RoomType RoomType,
    decimal Amount,
    string Currency);

/// <summary>
/// Departure read model including prices and version.
/// </summary>
public sealed record TourDepartureDto(
    Guid Id,
    Guid AgencyOfferId,
    DateOnly StartDate,
    DateOnly EndDate,
    int Capacity,
    int SeatsLeft,
    string Status,
    long Version,
    IReadOnlyList<DeparturePriceDto> Prices);

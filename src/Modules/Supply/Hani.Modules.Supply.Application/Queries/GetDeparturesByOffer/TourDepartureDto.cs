using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;

public sealed record DeparturePriceDto(
    RoomType RoomType,
    decimal Amount,
    string Currency);

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

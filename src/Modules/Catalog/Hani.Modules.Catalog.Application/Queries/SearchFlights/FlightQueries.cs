using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Queries.SearchFlights;

/// <summary>
/// Query that searches flight routes and provider offers.
/// </summary>
public sealed record SearchFlightsQuery(
    string? Origin = null,
    string? Destination = null,
    DateOnly? DepartureDate = null,
    string? Cabin = null,
    string? Airline = null,
    int? MaxStops = null,
    decimal? MinPrice = null,
    decimal? MaxPrice = null,
    TimeOnly? DepartureAfter = null,
    TimeOnly? DepartureBefore = null) : IQuery<IReadOnlyList<FlightRouteDto>>;

/// <summary>
/// Query that returns one flight route.
/// </summary>
public sealed record GetFlightRouteQuery(string Slug) : IQuery<FlightRouteDto>;

/// <summary>Flight route read model.</summary>
public sealed record FlightRouteDto(
    Guid RouteId,
    string Slug,
    string OriginCode,
    string DestinationCode,
    string OriginCity,
    string DestinationCity,
    IReadOnlyList<FlightOfferDto> Offers);

/// <summary>Flight offer read model.</summary>
public sealed record FlightOfferDto(
    Guid FlightOfferId,
    string FlightNumber,
    string AirlineCode,
    string AirlineName,
    DateOnly DepartureDate,
    TimeOnly DepartureTime,
    TimeOnly ArrivalTime,
    int DurationMinutes,
    int Stops,
    string Cabin,
    string BaggageAllowance,
    decimal Price,
    string Currency,
    string Provider,
    string DeepLink);

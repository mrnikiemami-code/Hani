using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Commands.CreateFlightReference;

namespace Hani.Modules.Admin.Application;

/// <summary>Admin flight route row.</summary>
public sealed record AdminFlightRouteDto(
    Guid RouteId,
    string Slug,
    string OriginCode,
    string DestinationCode,
    string OriginCity,
    string DestinationCity,
    bool IsActive,
    int OfferCount,
    decimal? MinimumPrice,
    string? Currency);

/// <summary>Paged admin flight routes.</summary>
public sealed record AdminFlightPageDto(
    IReadOnlyList<AdminFlightRouteDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Flight offer creation input.</summary>
public sealed record AdminFlightOfferInput(
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

/// <summary>Flight route creation input.</summary>
public sealed record AdminFlightRouteInput(
    string Slug,
    string OriginCode,
    string DestinationCode,
    string OriginCity,
    string DestinationCity,
    bool IsActive,
    IReadOnlyList<AdminFlightOfferInput> Offers);


/// <summary>Admin flight route detail for editing.</summary>
public sealed record AdminFlightRouteDetailDto(
    Guid RouteId,
    string Slug,
    string OriginCode,
    string DestinationCode,
    string OriginCity,
    string DestinationCity,
    bool IsActive,
    IReadOnlyList<AdminFlightOfferInput> Offers);

/// <summary>Admin flight service.</summary>
public interface IAdminFlightService
{
    Task<AdminFlightPageDto> ListRoutesAsync(
        int page,
        int pageSize,
        string? q,
        CancellationToken cancellationToken);
    Task<FlightReferenceDto> ListReferencesAsync(CancellationToken cancellationToken);
    Task<Result<Guid>> CreateRouteAsync(
        AdminFlightRouteInput input,
        CancellationToken cancellationToken);
    Task<AdminFlightRouteDetailDto?> GetRouteAsync(Guid id, CancellationToken cancellationToken);
    Task<Result<bool>> UpdateRouteAsync(
        Guid id,
        AdminFlightRouteInput input,
        CancellationToken cancellationToken);
    Task<Result<Guid>> CreateAirlineAsync(
        string iata,
        string name,
        CancellationToken cancellationToken);
    Task<Result<Guid>> CreateAirportAsync(
        string iata,
        string name,
        string city,
        string countryCode,
        CancellationToken cancellationToken);
}

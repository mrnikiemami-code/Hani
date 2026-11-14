using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Flights;

namespace Hani.Modules.Catalog.Application.Commands.CreateFlightReference;

/// <summary>
/// Command that creates a canonical airline.
/// </summary>
public sealed record CreateAirlineCommand(string Iata, string Name) : ICommand<Guid>;

/// <summary>
/// Command that creates a canonical airport.
/// </summary>
public sealed record CreateAirportCommand(
    string Iata,
    string Name,
    string City,
    string CountryCode,
    Guid? DestinationId = null,
    decimal? Latitude = null,
    decimal? Longitude = null) : ICommand<Guid>;

/// <summary>
/// Query that lists airline and airport filters.
/// </summary>
public sealed record ListFlightReferencesQuery : IQuery<FlightReferenceDto>;

/// <summary>
/// Flight reference read model.
/// </summary>
public sealed record FlightReferenceDto(
    IReadOnlyList<AirlineDto> Airlines,
    IReadOnlyList<AirportDto> Airports);

/// <summary>Airline read model.</summary>
public sealed record AirlineDto(string Iata, string Name);

/// <summary>Airport read model.</summary>
public sealed record AirportDto(
    string Iata,
    string Name,
    string City,
    string CountryCode,
    decimal? Latitude,
    decimal? Longitude);

internal sealed class CreateAirlineCommandHandler(
    IFlightReferenceRepository references,
    IIdGenerator ids)
    : ICommandHandler<CreateAirlineCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateAirlineCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var airline = Airline.Create(ids, request.Iata, request.Name);
            await references.AddAirlineAsync(airline, cancellationToken);
            return Result<Guid>.Success(airline.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CATALOG-2201", exception.Message));
        }
    }
}

internal sealed class CreateAirportCommandHandler(
    IFlightReferenceRepository references,
    IIdGenerator ids)
    : ICommandHandler<CreateAirportCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateAirportCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var airport = Airport.Create(
                ids,
                request.Iata,
                request.Name,
                request.City,
                request.CountryCode,
                request.DestinationId,
                request.Latitude,
                request.Longitude);
            await references.AddAirportAsync(airport, cancellationToken);
            return Result<Guid>.Success(airport.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CATALOG-2202", exception.Message));
        }
    }
}

internal sealed class ListFlightReferencesQueryHandler(IFlightReferenceRepository references)
    : IQueryHandler<ListFlightReferencesQuery, FlightReferenceDto>
{
    public async Task<Result<FlightReferenceDto>> Handle(
        ListFlightReferencesQuery request,
        CancellationToken cancellationToken)
    {
        var airlines = await references.ListAirlinesAsync(cancellationToken);
        var airports = await references.ListAirportsAsync(cancellationToken);

        return Result<FlightReferenceDto>.Success(new FlightReferenceDto(
            airlines.Select(item => new AirlineDto(item.Iata, item.Name)).ToArray(),
            airports.Select(item => new AirportDto(
                item.Iata,
                item.Name,
                item.City,
                item.CountryCode,
                item.Latitude,
                item.Longitude)).ToArray()));
    }
}

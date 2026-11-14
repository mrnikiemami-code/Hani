using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Flights;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Repositories;

internal sealed class FlightReferenceRepository(CatalogDbContext dbContext)
    : IFlightReferenceRepository
{
    public async Task AddAirlineAsync(Airline airline, CancellationToken cancellationToken)
    {
        await dbContext.Airlines.AddAsync(airline, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AddAirportAsync(Airport airport, CancellationToken cancellationToken)
    {
        await dbContext.Airports.AddAsync(airport, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Airline>> ListAirlinesAsync(
        CancellationToken cancellationToken)
        => await dbContext.Airlines
            .AsNoTracking()
            .Where(airline => airline.IsActive)
            .OrderBy(airline => airline.Iata)
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<Airport>> ListAirportsAsync(
        CancellationToken cancellationToken)
        => await dbContext.Airports
            .AsNoTracking()
            .OrderBy(airport => airport.Iata)
            .ToArrayAsync(cancellationToken);
}

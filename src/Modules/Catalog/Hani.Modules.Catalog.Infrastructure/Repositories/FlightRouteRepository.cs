using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Flights;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Repositories;

internal sealed class FlightRouteRepository(CatalogDbContext dbContext) : IFlightRouteRepository
{
    public async Task AddAsync(FlightRoute route, CancellationToken cancellationToken)
    {
        await dbContext.FlightRoutes.AddAsync(route, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<FlightRoute?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalizedSlug = slug.Trim().ToLowerInvariant();

        return dbContext.FlightRoutes
            .AsNoTracking()
            .Include(route => route.Offers)
            .FirstOrDefaultAsync(
                route => route.Slug == normalizedSlug && route.IsActive,
                cancellationToken);
    }

    public async Task<IReadOnlyList<FlightRoute>> SearchAsync(
        string? origin,
        string? destination,
        DateOnly? departureDate,
        string? cabin,
        CancellationToken cancellationToken)
    {
        var query = dbContext.FlightRoutes
            .AsNoTracking()
            .Include(route => route.Offers)
            .Where(route => route.IsActive);

        if (!string.IsNullOrWhiteSpace(origin))
        {
            var normalizedOrigin = origin.Trim().ToUpperInvariant();
            query = query.Where(route => route.OriginCode == normalizedOrigin);
        }

        if (!string.IsNullOrWhiteSpace(destination))
        {
            var normalizedDestination = destination.Trim().ToUpperInvariant();
            query = query.Where(route => route.DestinationCode == normalizedDestination);
        }

        if (departureDate is not null)
        {
            query = query.Where(route =>
                route.Offers.Any(offer => offer.DepartureDate == departureDate));
        }

        if (!string.IsNullOrWhiteSpace(cabin))
        {
            var normalizedCabin = cabin.Trim();
            query = query.Where(route =>
                route.Offers.Any(offer => offer.Cabin == normalizedCabin));
        }

        return await query
            .OrderBy(route => route.Slug)
            .ToArrayAsync(cancellationToken);
    }
}

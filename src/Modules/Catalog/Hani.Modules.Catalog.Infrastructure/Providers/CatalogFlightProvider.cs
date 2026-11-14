using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Flights;

namespace Hani.Modules.Catalog.Infrastructure.Providers;

internal sealed class CatalogFlightProvider(IFlightRouteRepository routes) : IFlightProvider
{
    public Task<IReadOnlyList<FlightRoute>> SearchAsync(
        string? origin,
        string? destination,
        DateOnly? departureDate,
        string? cabin,
        CancellationToken cancellationToken)
        => routes.SearchAsync(origin, destination, departureDate, cabin, cancellationToken);
}

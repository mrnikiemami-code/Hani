using Hani.Contracts.Catalog;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Infrastructure.Providers;
using Hani.Modules.Catalog.Infrastructure.ReadServices;
using Hani.Modules.Catalog.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Catalog.Infrastructure;

/// <summary>
/// Registers the module infrastructure services.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddCatalogInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<ITourProductRepository, TourProductRepository>();
        services.AddScoped<IDestinationRepository, DestinationRepository>();
        services.AddScoped<IHotelRepository, HotelRepository>();
        services.AddScoped<IPlaceRepository, PlaceRepository>();
        services.AddScoped<IVisaRepository, VisaRepository>();
        services.AddScoped<IFlightRouteRepository, FlightRouteRepository>();
        services.AddScoped<IFlightProvider, CatalogFlightProvider>();
        services.AddScoped<ICatalogReadService, CatalogReadService>();
        return services;
    }
}

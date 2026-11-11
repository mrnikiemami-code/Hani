using Hani.Modules.Catalog.Application.Abstractions;
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
        return services;
    }
}

using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Supply.Infrastructure;

/// <summary>
/// Registers the module infrastructure services.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddSupplyInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IAgencyOfferRepository, AgencyOfferRepository>();
        services.AddScoped<IDepartureRepository, DepartureRepository>();
        return services;
    }
}

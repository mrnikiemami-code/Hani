using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Infrastructure.Caching;
using Hani.BuildingBlocks.Infrastructure.Idempotency;
using Hani.BuildingBlocks.Infrastructure.Ids;
using Hani.BuildingBlocks.Infrastructure.Messaging;
using Hani.BuildingBlocks.Infrastructure.Observability;
using Hani.BuildingBlocks.Infrastructure.Tenancy;
using Hani.Modules.Supply.Infrastructure.Persistence;

namespace Hani.Api.Configuration;

/// <summary>Registers cross-cutting infrastructure services.</summary>
public static class CrossCuttingRegistration
{
    /// <summary>Adds cache, messaging, tenant, idempotency, and IDs.</summary>
    public static IServiceCollection AddHaniCrossCutting(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddHaniCache(configuration);
        services.AddHaniObservability(configuration);
        services.AddHaniMessaging<SupplyDbContext>(configuration);
        services.AddSingleton<ICurrentTenant, CurrentTenant>();
        services.AddSingleton<IIdempotencyStore, InMemoryIdempotencyStore>();
        services.AddSingleton<IIdGenerator, Uuid7IdGenerator>();
        return services;
    }
}

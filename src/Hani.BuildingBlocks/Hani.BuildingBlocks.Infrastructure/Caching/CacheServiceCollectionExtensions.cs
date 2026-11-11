using Hani.BuildingBlocks.Application;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.BuildingBlocks.Infrastructure.Caching;

/// <summary>
/// Registers the configured cache provider.
/// </summary>
public static class CacheServiceCollectionExtensions
{
    public static IServiceCollection AddHaniCache(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var section = configuration.GetSection("Cache");
        var options = section.Get<CacheOptions>() ?? new CacheOptions();

        services.Configure<CacheOptions>(section);

        switch (options.Provider.Trim().ToLowerInvariant())
        {
            case "redis":
                services.AddStackExchangeRedisCache(redis =>
                {
                    redis.Configuration = options.Redis.Configuration;
                    redis.InstanceName = options.Redis.InstanceName;
                });
                services.AddSingleton<ICacheService, RedisCacheService>();
                break;

            case "none":
                services.AddSingleton<ICacheService, NullCacheService>();
                break;

            default:
                services.AddMemoryCache();
                services.AddSingleton<ICacheService, MemoryCacheService>();
                break;
        }

        return services;
    }
}

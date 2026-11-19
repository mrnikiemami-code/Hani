using System.Threading.RateLimiting;
using Hani.BuildingBlocks.Infrastructure.Caching;
using Microsoft.Extensions.DependencyInjection.Extensions;
using StackExchange.Redis;

namespace Hani.Api.Configuration;

/// <summary>Registers health checks and global rate limiting.</summary>
public static class HealthRateLimitingRegistration
{
    /// <summary>Adds health checks and the configured rate limiter.</summary>
    public static IServiceCollection AddHaniHealthAndRateLimiting(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var health = services.AddHealthChecks()
            .AddCheck<PostgresHealthCheck>("postgres", tags: ["ready"])
            .AddCheck<StorageHealthCheck>("storage", tags: ["ready"])
            .AddCheck<PaymentProviderHealthCheck>("payments", tags: ["ready"]);
        var cacheOptions = configuration.GetSection("Cache").Get<CacheOptions>() ??
            new CacheOptions();
        if (string.Equals(
                cacheOptions.Provider,
                "redis",
                StringComparison.OrdinalIgnoreCase))
        {
            health.AddCheck<RedisHealthCheck>("redis", tags: ["ready"]);
        }

        var rateLimiting = configuration
            .GetSection("RateLimiting")
            .Get<RateLimitingOptions>() ?? new RateLimitingOptions();
        var useRedis = string.Equals(
            rateLimiting.Provider,
            "Redis",
            StringComparison.OrdinalIgnoreCase);
        if (useRedis)
        {
            var redisConfiguration = rateLimiting.RedisConfiguration ??
                cacheOptions.Redis.Configuration;
            var options = ConfigurationOptions.Parse(redisConfiguration);
            options.AbortOnConnectFail = false;
            services.TryAddSingleton<IConnectionMultiplexer>(
                _ => ConnectionMultiplexer.Connect(options));
        }

        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
            {
                var key = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
                return CreatePartition(
                    context,
                    useRedis,
                    rateLimiting.RedisKeyPrefix + "global:" + key,
                    rateLimiting.PermitLimit,
                    TimeSpan.FromSeconds(rateLimiting.WindowSeconds));
            });
            options.AddPolicy("support-attachments", context =>
            {
                var key = context.User.FindFirst("user_id")?.Value
                    ?? context.Connection.RemoteIpAddress?.ToString()
                    ?? "unknown";
                return CreatePartition(
                    context,
                    useRedis,
                    rateLimiting.RedisKeyPrefix + "attachments:" + key,
                    10,
                    TimeSpan.FromMinutes(1));
            });
        });

        return services;
    }

    private static RateLimitPartition<string> CreatePartition(
        HttpContext context,
        bool useRedis,
        string key,
        int permitLimit,
        TimeSpan window)
    {
        if (useRedis)
        {
            try
            {
                var redis = context.RequestServices.GetRequiredService<IConnectionMultiplexer>();
                return RateLimitPartition.Get(
                    key,
                    _ => new RedisFixedWindowRateLimiter(
                        redis,
                        key,
                        permitLimit,
                        window));
            }
            catch (InvalidOperationException)
            {
                // Redis is not registered; fall back to a process-local limiter.
            }
        }

        return RateLimitPartition.GetFixedWindowLimiter(key, _ =>
            new FixedWindowRateLimiterOptions
            {
                PermitLimit = permitLimit,
                Window = window,
                QueueLimit = 0,
                AutoReplenishment = true
            });
    }
}

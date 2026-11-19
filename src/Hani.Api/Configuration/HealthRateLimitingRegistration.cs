using System.Threading.RateLimiting;
using Hani.BuildingBlocks.Infrastructure.Caching;

namespace Hani.Api.Configuration;

/// <summary>Registers health checks and global rate limiting.</summary>
public static class HealthRateLimitingRegistration
{
    /// <summary>Adds health checks and the IP fixed-window limiter.</summary>
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
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
            {
                var key = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
                return RateLimitPartition.GetFixedWindowLimiter(key, _ =>
                    new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = rateLimiting.PermitLimit,
                        Window = TimeSpan.FromSeconds(rateLimiting.WindowSeconds),
                        QueueLimit = 0,
                        AutoReplenishment = true
                    });
            });
            options.AddPolicy("support-attachments", context =>
            {
                var key = context.User.FindFirst("user_id")?.Value
                    ?? context.Connection.RemoteIpAddress?.ToString()
                    ?? "unknown";
                return RateLimitPartition.GetFixedWindowLimiter(key, _ =>
                    new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = 10,
                        Window = TimeSpan.FromMinutes(1),
                        QueueLimit = 0,
                        AutoReplenishment = true
                    });
            });
        });

        return services;
    }
}

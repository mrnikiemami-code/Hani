using System.Threading.RateLimiting;

namespace Hani.Api.Configuration;

/// <summary>Registers health checks and global rate limiting.</summary>
public static class HealthRateLimitingRegistration
{
    /// <summary>Adds health checks and the IP fixed-window limiter.</summary>
    public static IServiceCollection AddHaniHealthAndRateLimiting(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddHealthChecks()
            .AddCheck<PostgresHealthCheck>("postgres", tags: ["ready"]);

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
        });

        return services;
    }
}

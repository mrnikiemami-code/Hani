using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Hani.Api;

/// <summary>Verifies that the configured distributed cache can read a probe key.</summary>
internal sealed class RedisHealthCheck(IDistributedCache cache) : IHealthCheck
{
    /// <summary>Reads a non-sensitive probe key from Redis.</summary>
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await cache.GetAsync("health:probe", cancellationToken);
            return HealthCheckResult.Healthy("Redis is reachable.");
        }
        catch (Exception exception)
        {
            return HealthCheckResult.Unhealthy("Redis is unreachable.", exception);
        }
    }
}

/// <summary>Verifies that the media storage root exists and is writable.</summary>
internal sealed class StorageHealthCheck(
    Microsoft.Extensions.Options.IOptions<
        Hani.Modules.Content.Infrastructure.Storage.ContentMediaStorageOptions> options)
    : IHealthCheck
{
    /// <summary>Creates and removes a temporary probe file.</summary>
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var root = options.Value.RootPath;
        if (string.IsNullOrWhiteSpace(root))
        {
            return HealthCheckResult.Unhealthy("Storage root path is not configured.");
        }

        try
        {
            var directory = Path.GetFullPath(root);
            Directory.CreateDirectory(directory);
            var probe = Path.Combine(directory, $".health-{Path.GetRandomFileName()}");
            await File.WriteAllTextAsync(probe, "ready", cancellationToken);
            File.Delete(probe);
            return HealthCheckResult.Healthy("Media storage is writable.");
        }
        catch (Exception exception)
        {
            return HealthCheckResult.Unhealthy("Media storage is not writable.", exception);
        }
    }
}

/// <summary>Verifies that the payment adapter has a usable production configuration.</summary>
internal sealed class PaymentProviderHealthCheck(
    Microsoft.Extensions.Options.IOptions<Hani.Modules.Payments.Application.PaymentOptions> options)
    : IHealthCheck
{
    /// <summary>Checks provider name, merchant reference, and webhook secret.</summary>
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var settings = options.Value;
        if (string.IsNullOrWhiteSpace(settings.Provider))
        {
            return Task.FromResult(HealthCheckResult.Unhealthy(
                "Payment provider is not configured."));
        }

        if (string.IsNullOrWhiteSpace(settings.WebhookSecret))
        {
            return Task.FromResult(HealthCheckResult.Unhealthy(
                "Payment webhook secret is not configured."));
        }

        if (string.Equals(settings.Provider, "Mock", StringComparison.OrdinalIgnoreCase))
        {
            return Task.FromResult(HealthCheckResult.Degraded(
                "Mock payment provider is active."));
        }

        if (string.IsNullOrWhiteSpace(settings.PspAccountRef) ||
            string.IsNullOrWhiteSpace(settings.ApiKey))
        {
            return Task.FromResult(HealthCheckResult.Unhealthy(
                "Payment merchant credentials are incomplete."));
        }

        return Task.FromResult(HealthCheckResult.Healthy(
            "Payment provider configuration is present."));
    }
}

namespace Hani.Api;

/// <summary>
/// Configures the global per-IP request limiter.
/// </summary>
public sealed class RateLimitingOptions
{
    /// <summary>
    /// Limiter backend. <c>Memory</c> is single-process; <c>Redis</c> shares
    /// counters across all API nodes.
    /// </summary>
    public string Provider { get; set; } = "Memory";

    /// <summary>
    /// Maximum requests allowed per client IP in one window.
    /// </summary>
    public int PermitLimit { get; set; } = 600;

    /// <summary>
    /// Window length in seconds.
    /// </summary>
    public int WindowSeconds { get; set; } = 60;

    /// <summary>
    /// Prefix used for distributed limiter keys.
    /// </summary>
    public string RedisKeyPrefix { get; set; } = "hani:ratelimit:";

    /// <summary>
    /// Redis configuration used when <see cref="Provider"/> is <c>Redis</c>.
    /// Falls back to <c>Cache:Redis:Configuration</c> when empty.
    /// </summary>
    public string? RedisConfiguration { get; set; }
}

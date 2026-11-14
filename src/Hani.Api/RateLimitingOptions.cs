namespace Hani.Api;

/// <summary>
/// Configures the global per-IP request limiter.
/// </summary>
public sealed class RateLimitingOptions
{
    /// <summary>
    /// Maximum requests allowed per client IP in one window.
    /// </summary>
    public int PermitLimit { get; set; } = 600;

    /// <summary>
    /// Window length in seconds.
    /// </summary>
    public int WindowSeconds { get; set; } = 60;
}

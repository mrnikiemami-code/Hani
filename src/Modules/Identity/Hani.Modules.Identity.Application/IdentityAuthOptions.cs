namespace Hani.Modules.Identity.Application;

/// <summary>
/// JWT and refresh-token configuration.
/// </summary>
public sealed class JwtOptions
{
    /// <summary>
    /// Token issuer.
    /// </summary>
    public string Issuer { get; set; } = "Hani";

    /// <summary>
    /// Token audience.
    /// </summary>
    public string Audience { get; set; } = "Hani.Marketplace";

    /// <summary>
    /// HMAC signing key. Must be at least 32 characters in non-development environments.
    /// </summary>
    public string SigningKey { get; set; } = string.Empty;

    /// <summary>
    /// Access-token lifetime in minutes.
    /// </summary>
    public int AccessTokenMinutes { get; set; } = 15;

    /// <summary>
    /// Refresh-token lifetime in days.
    /// </summary>
    public int RefreshTokenDays { get; set; } = 30;
}

/// <summary>
/// OTP delivery and verification configuration.
/// </summary>
public sealed class OtpOptions
{
    /// <summary>
    /// OTP lifetime in seconds.
    /// </summary>
    public int LifetimeSeconds { get; set; } = 120;

    /// <summary>
    /// Minimum interval between OTP requests in seconds.
    /// </summary>
    public int ResendCooldownSeconds { get; set; } = 60;

    /// <summary>
    /// Maximum OTP requests per hour.
    /// </summary>
    public int MaxRequestsPerHour { get; set; } = 5;

    /// <summary>
    /// HMAC pepper used for OTP hashing.
    /// </summary>
    public string Pepper { get; set; } = string.Empty;

    /// <summary>
    /// Development-only flag that returns the OTP code in the response.
    /// </summary>
    public bool ExposeCodeInResponse { get; set; }
}

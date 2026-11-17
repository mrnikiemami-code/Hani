namespace Hani.Modules.Identity.Application.Security;

/// <summary>
/// Effective OTP security policy returned by the admin settings service and
/// consumed by the request/verify handlers.
/// </summary>
public sealed record OtpSecurityConfig(
    int LifetimeSeconds,
    int ResendCooldownSeconds,
    int MaxRequestsPerHour,
    int MaxVerifyAttempts,
    int MobileChangeWindowSeconds,
    int MaxMobileChangesPerIp,
    int IpBlockSeconds,
    int MaxIpRequestsPerWindow,
    int IpRequestWindowSeconds)
{
    /// <summary>Safe defaults used when no admin override has been saved.</summary>
    public static OtpSecurityConfig Default { get; } = new(
        120,
        120,
        5,
        5,
        120,
        3,
        900,
        10,
        120);

    /// <summary>Returns a normalized policy with lower/upper safety bounds.</summary>
    public OtpSecurityConfig Normalize() => this with
    {
        LifetimeSeconds = Math.Clamp(LifetimeSeconds, 60, 600),
        ResendCooldownSeconds = Math.Clamp(ResendCooldownSeconds, 30, 600),
        MaxRequestsPerHour = Math.Clamp(MaxRequestsPerHour, 1, 30),
        MaxVerifyAttempts = Math.Clamp(MaxVerifyAttempts, 3, 10),
        MobileChangeWindowSeconds = Math.Clamp(MobileChangeWindowSeconds, 30, 3600),
        MaxMobileChangesPerIp = Math.Clamp(MaxMobileChangesPerIp, 1, 10),
        IpBlockSeconds = Math.Clamp(IpBlockSeconds, 60, 86400),
        MaxIpRequestsPerWindow = Math.Clamp(MaxIpRequestsPerWindow, 1, 100),
        IpRequestWindowSeconds = Math.Clamp(IpRequestWindowSeconds, 30, 3600)
    };
}

/// <summary>Stores and reads the admin-editable OTP security policy.</summary>
public interface IOtpSecuritySettingsService
{
    /// <summary>Returns the persisted policy or safe defaults.</summary>
    Task<OtpSecurityConfig> GetAsync(CancellationToken cancellationToken);

    /// <summary>Persists a normalized policy and returns it.</summary>
    Task<OtpSecurityConfig> UpdateAsync(
        OtpSecurityConfig settings,
        CancellationToken cancellationToken);
}

/// <summary>Reason an OTP request was rejected.</summary>
public enum OtpRequestDenial
{
    None = 0,
    MobileCooldown = 1,
    IpBlocked = 2,
    MobileChangeLimit = 3,
    HourlyLimit = 4,
    IpRequestLimit = 5
}

/// <summary>Decision returned by the OTP rate-limit state.</summary>
public sealed record OtpRequestDecision(
    bool Allowed,
    int RetryAfterSeconds,
    OtpRequestDenial Reason);

/// <summary>
/// Ephemeral OTP rate-limit state. The in-memory implementation is the default;
/// a Redis implementation can be registered later without changing handlers.
/// </summary>
public interface IOtpSecurityState
{
    /// <summary>
    /// Atomically checks cooldown, IP mobile changes, and request quotas, then
    /// records the request when allowed.
    /// </summary>
    Task<OtpRequestDecision> TryAcquireRequestAsync(
        string mobile,
        string? ipAddress,
        OtpSecurityConfig settings,
        CancellationToken cancellationToken);

    /// <summary>Clears cooldowns/blocks for an admin unlock.</summary>
    Task ResetAsync(
        string? mobile,
        string? ipAddress,
        CancellationToken cancellationToken);
}

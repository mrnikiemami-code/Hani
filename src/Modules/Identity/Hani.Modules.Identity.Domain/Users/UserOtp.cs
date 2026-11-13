using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Users;

/// <summary>
/// Hashed one-time password issued to a user.
/// </summary>
public sealed class UserOtp : Entity<Guid>
{
    private UserOtp()
    {
    }

    internal UserOtp(
        Guid id,
        Guid userId,
        string codeHash,
        OtpPurpose purpose,
        DateTimeOffset createdAt,
        DateTimeOffset expiresAt) : base(id)
    {
        UserId = userId;
        CodeHash = codeHash;
        Purpose = purpose;
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
        Attempts = 0;
        MaxAttempts = 5;
    }

    /// <summary>
    /// Owning user.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// HMAC hash of the six-digit code.
    /// </summary>
    public string CodeHash { get; private set; } = string.Empty;

    /// <summary>
    /// OTP purpose.
    /// </summary>
    public OtpPurpose Purpose { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Expiry time.
    /// </summary>
    public DateTimeOffset ExpiresAt { get; private set; }

    /// <summary>
    /// Number of failed verification attempts.
    /// </summary>
    public int Attempts { get; private set; }

    /// <summary>
    /// Maximum failed attempts before the OTP is locked.
    /// </summary>
    public int MaxAttempts { get; private set; }

    /// <summary>
    /// Consumption time, when used.
    /// </summary>
    public DateTimeOffset? ConsumedAt { get; private set; }

    /// <summary>
    /// True when the code can still be verified.
    /// </summary>
    public bool IsActive(DateTimeOffset now)
        => ConsumedAt is null &&
           Attempts < MaxAttempts &&
           now < ExpiresAt;

    /// <summary>
    /// Records a failed verification attempt.
    /// </summary>
    public void RecordFailedAttempt()
    {
        Attempts++;
    }

    /// <summary>
    /// Marks the OTP consumed.
    /// </summary>
    public void Consume(DateTimeOffset now)
    {
        if (!IsActive(now))
        {
            throw new InvalidOperationException("OTP is expired, used, or locked.");
        }

        ConsumedAt = now;
    }
}

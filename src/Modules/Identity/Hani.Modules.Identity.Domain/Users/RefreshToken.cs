using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Users;

/// <summary>
/// Hashed refresh token issued to a user session.
/// </summary>
public sealed class RefreshToken : Entity<Guid>
{
    private RefreshToken()
    {
    }

    internal RefreshToken(
        Guid id,
        Guid userId,
        string tokenHash,
        DateTimeOffset createdAt,
        DateTimeOffset expiresAt) : base(id)
    {
        UserId = userId;
        TokenHash = tokenHash;
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
    }

    /// <summary>
    /// Owning user.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// HMAC hash of the refresh token.
    /// </summary>
    public string TokenHash { get; private set; } = string.Empty;

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Expiry time.
    /// </summary>
    public DateTimeOffset ExpiresAt { get; private set; }

    /// <summary>
    /// Revocation time, when rotated or logged out.
    /// </summary>
    public DateTimeOffset? RevokedAt { get; private set; }

    /// <summary>
    /// Replacement token hash after rotation.
    /// </summary>
    public string? ReplacedByTokenHash { get; private set; }

    /// <summary>
    /// True when the token can still be exchanged.
    /// </summary>
    public bool IsActive(DateTimeOffset now)
        => RevokedAt is null && now < ExpiresAt;

    /// <summary>
    /// Revokes the token, optionally recording its replacement.
    /// </summary>
    public void Revoke(DateTimeOffset now, string? replacedByTokenHash = null)
    {
        if (RevokedAt is not null)
        {
            return;
        }

        RevokedAt = now;
        ReplacedByTokenHash = replacedByTokenHash;
    }
}

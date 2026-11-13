using System.Text.RegularExpressions;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Domain.Users.Events;

namespace Hani.Modules.Identity.Domain.Users;

/// <summary>
/// Marketplace user identified by mobile number with optional public author profile.
/// </summary>
public sealed class User : AggregateRoot<Guid>
{
    private readonly List<UserOtp> _otpCodes = [];
    private readonly List<RefreshToken> _refreshTokens = [];

    private User()
    {
    }

    private User(
        Guid id,
        string mobile,
        string? email,
        string username,
        DateTimeOffset createdAt) : base(id)
    {
        Mobile = mobile;
        Email = email;
        Username = username;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
        Role = UserRole.Customer;
        Status = UserStatus.Pending;
    }

    /// <summary>
    /// Normalized mobile number.
    /// </summary>
    public string Mobile { get; private set; } = string.Empty;

    /// <summary>
    /// Optional email address.
    /// </summary>
    public string? Email { get; private set; }

    /// <summary>
    /// First name.
    /// </summary>
    public string FirstName { get; private set; } = string.Empty;

    /// <summary>
    /// Last name.
    /// </summary>
    public string LastName { get; private set; } = string.Empty;

    /// <summary>
    /// Unique public username used by the author profile.
    /// </summary>
    public string Username { get; private set; } = string.Empty;

    /// <summary>
    /// Short author biography.
    /// </summary>
    public string? Bio { get; private set; }

    /// <summary>
    /// Avatar URL or media reference.
    /// </summary>
    public string? AvatarUrl { get; private set; }

    /// <summary>
    /// Authorization role.
    /// </summary>
    public UserRole Role { get; private set; }

    /// <summary>
    /// Lifecycle state.
    /// </summary>
    public UserStatus Status { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Last profile update.
    /// </summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>
    /// Last successful login.
    /// </summary>
    public DateTimeOffset? LastLoginAt { get; private set; }

    /// <summary>
    /// Issued OTPs.
    /// </summary>
    public IReadOnlyCollection<UserOtp> OtpCodes => _otpCodes;

    /// <summary>
    /// Issued refresh tokens.
    /// </summary>
    public IReadOnlyCollection<RefreshToken> RefreshTokens => _refreshTokens;

    /// <summary>
    /// Display name with a username fallback.
    /// </summary>
    public string DisplayName
    {
        get
        {
            var fullName = $"{FirstName} {LastName}".Trim();
            return string.IsNullOrWhiteSpace(fullName) ? Username : fullName;
        }
    }

    /// <summary>
    /// Creates a pending user for a normalized mobile number.
    /// </summary>
    public static User Create(
        IIdGenerator ids,
        string mobile,
        string? email = null,
        DateTimeOffset? now = null)
    {
        var normalizedMobile = NormalizeMobile(mobile);

        if (!string.IsNullOrWhiteSpace(email) && !IsValidEmail(email))
        {
            throw new ArgumentException("Email is invalid.", nameof(email));
        }

        var id = ids.NewId();
        var createdAt = now ?? DateTimeOffset.UtcNow;
        var username = $"user-{id:N}"[..15];
        var user = new User(
            id,
            normalizedMobile,
            string.IsNullOrWhiteSpace(email) ? null : email.Trim().ToLowerInvariant(),
            username,
            createdAt);

        user.AddDomainEvent(new UserRegisteredDomainEvent(ids.NewId(), user.Id, normalizedMobile));
        return user;
    }

    /// <summary>
    /// Adds a new OTP to the user.
    /// </summary>
    public UserOtp AddOtp(
        IIdGenerator ids,
        string codeHash,
        OtpPurpose purpose,
        DateTimeOffset now,
        TimeSpan lifetime)
    {
        if (string.IsNullOrWhiteSpace(codeHash))
        {
            throw new ArgumentException("OTP hash is required.", nameof(codeHash));
        }

        var otp = new UserOtp(
            ids.NewId(),
            Id,
            codeHash,
            purpose,
            now,
            now.Add(lifetime));
        _otpCodes.Add(otp);
        Touch(now);
        return otp;
    }

    /// <summary>
    /// Returns the newest active OTP for the requested purpose.
    /// </summary>
    public UserOtp? FindActiveOtp(OtpPurpose purpose, DateTimeOffset now)
        => _otpCodes
            .Where(otp => otp.Purpose == purpose && otp.IsActive(now))
            .OrderByDescending(otp => otp.CreatedAt)
            .FirstOrDefault();

    /// <summary>
    /// Marks the user active after a successful OTP verification.
    /// </summary>
    public void Activate(DateTimeOffset now)
    {
        if (Status == UserStatus.Blocked)
        {
            throw new InvalidOperationException("Blocked users cannot be activated.");
        }

        Status = UserStatus.Active;
        LastLoginAt = now;
        Touch(now);
    }

    /// <summary>
    /// Updates the public profile fields.
    /// </summary>
    public void UpdateProfile(
        string firstName,
        string lastName,
        string? email,
        string? bio,
        string? avatarUrl,
        DateTimeOffset now)
    {
        if (string.IsNullOrWhiteSpace(firstName))
        {
            throw new ArgumentException("First name is required.", nameof(firstName));
        }

        if (!string.IsNullOrWhiteSpace(email) && !IsValidEmail(email))
        {
            throw new ArgumentException("Email is invalid.", nameof(email));
        }

        FirstName = firstName.Trim();
        LastName = lastName?.Trim() ?? string.Empty;
        Email = string.IsNullOrWhiteSpace(email) ? null : email.Trim().ToLowerInvariant();
        Bio = string.IsNullOrWhiteSpace(bio) ? null : bio.Trim();
        AvatarUrl = string.IsNullOrWhiteSpace(avatarUrl) ? null : avatarUrl.Trim();
        Touch(now);
    }

    /// <summary>
    /// Changes the unique public username.
    /// </summary>
    public void SetUsername(string username, DateTimeOffset now)
    {
        if (string.IsNullOrWhiteSpace(username) || username.Trim().Length < 3)
        {
            throw new ArgumentException("Username must have at least three characters.", nameof(username));
        }

        if (!Regex.IsMatch(username.Trim(), "^[a-zA-Z0-9][a-zA-Z0-9_-]*$"))
        {
            throw new ArgumentException(
                "Username may only contain letters, digits, underscore, and hyphen.",
                nameof(username));
        }

        Username = username.Trim().ToLowerInvariant();
        Touch(now);
    }

    /// <summary>
    /// Adds a hashed refresh token.
    /// </summary>
    public RefreshToken AddRefreshToken(
        IIdGenerator ids,
        string tokenHash,
        DateTimeOffset now,
        TimeSpan lifetime)
    {
        if (string.IsNullOrWhiteSpace(tokenHash))
        {
            throw new ArgumentException("Refresh token hash is required.", nameof(tokenHash));
        }

        var token = new RefreshToken(
            ids.NewId(),
            Id,
            tokenHash,
            now,
            now.Add(lifetime));
        _refreshTokens.Add(token);
        Touch(now);
        return token;
    }

    /// <summary>
    /// Finds a refresh token by hash.
    /// </summary>
    public RefreshToken? FindRefreshToken(string tokenHash)
        => _refreshTokens.FirstOrDefault(token =>
            string.Equals(token.TokenHash, tokenHash, StringComparison.Ordinal));

    /// <summary>
    /// Revokes a refresh token by hash.
    /// </summary>
    public bool RevokeRefreshToken(
        string tokenHash,
        DateTimeOffset now,
        string? replacedByTokenHash = null)
    {
        var token = FindRefreshToken(tokenHash);

        if (token is null || !token.IsActive(now))
        {
            return false;
        }

        token.Revoke(now, replacedByTokenHash);
        Touch(now);
        return true;
    }

    private void Touch(DateTimeOffset now)
    {
        UpdatedAt = now;
    }

    public static string NormalizeMobile(string mobile)
    {
        if (string.IsNullOrWhiteSpace(mobile))
        {
            throw new ArgumentException("Mobile number is required.", nameof(mobile));
        }

        var normalized = mobile.Trim().Replace(" ", string.Empty).Replace("-", string.Empty);

        if (!Regex.IsMatch(normalized, @"^\+?[0-9]{8,15}$"))
        {
            throw new ArgumentException("Mobile number is invalid.", nameof(mobile));
        }

        return normalized;
    }

    private static bool IsValidEmail(string email)
        => Regex.IsMatch(email.Trim(), @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
}

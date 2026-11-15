namespace Hani.Modules.Identity.Domain.Users;

/// <summary>
/// Persisted layout and display preferences for one authenticated user.
/// </summary>
public sealed class UserPreferences
{
    private UserPreferences()
    {
    }

    private UserPreferences(Guid userId, DateTimeOffset now)
    {
        UserId = userId;
        UpdatedAt = now;
    }

    /// <summary>
    /// Owner user id. One preferences row per user.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Selected home experience id, or <c>null</c> when the server default applies.
    /// </summary>
    public string? HomeExperienceId { get; private set; }

    /// <summary>
    /// Preferred UI locale, or <c>null</c> when the request locale applies.
    /// </summary>
    public string? Locale { get; private set; }

    /// <summary>
    /// Preferred display currency, or <c>null</c> when the product currency applies.
    /// </summary>
    public string? Currency { get; private set; }

    /// <summary>
    /// UI theme: <c>light</c>, <c>dark</c>, or <c>system</c>.
    /// </summary>
    public string? Theme { get; private set; }

    /// <summary>
    /// Whether the user requested reduced motion.
    /// </summary>
    public bool ReducedMotion { get; private set; }

    /// <summary>
    /// Last time any preference changed.
    /// </summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>
    /// Creates an empty preference row for a user.
    /// </summary>
    public static UserPreferences Create(Guid userId, DateTimeOffset now)
        => new(userId, now);

    /// <summary>
    /// Replaces the preference values. Callers normalize and validate ids before
    /// calling this method; <c>null</c> means "use the server default".
    /// </summary>
    public void Update(
        string? homeExperienceId,
        string? locale,
        string? currency,
        string? theme,
        bool reducedMotion,
        DateTimeOffset now)
    {
        HomeExperienceId = homeExperienceId;
        Locale = locale;
        Currency = currency;
        Theme = theme;
        ReducedMotion = reducedMotion;
        UpdatedAt = now;
    }
}

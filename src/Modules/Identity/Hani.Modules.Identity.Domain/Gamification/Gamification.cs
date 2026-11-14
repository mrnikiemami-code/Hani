using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Gamification;

/// <summary>
/// User gamification profile with points, level, travel style, and badges.
/// </summary>
public sealed class UserGamification : AggregateRoot<Guid>
{
    private UserGamification()
    {
    }

    private UserGamification(Guid id, Guid userId) : base(id)
    {
        UserId = userId;
        Points = 0;
        Level = 1;
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>User id.</summary>
    public Guid UserId { get; private set; }

    /// <summary>Accumulated points.</summary>
    public int Points { get; private set; }

    /// <summary>User level from 1 to 4.</summary>
    public int Level { get; private set; }

    /// <summary>Travel style label key.</summary>
    public string? TravelStyle { get; private set; }

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Creates a profile.</summary>
    public static UserGamification Create(IIdGenerator ids, Guid userId)
    {
        if (userId == Guid.Empty)
        {
            throw new ArgumentException("User is required.", nameof(userId));
        }

        return new UserGamification(ids.NewId(), userId);
    }

    /// <summary>Adds points and recalculates level.</summary>
    public void AddPoints(int points)
    {
        if (points < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(points), "Points cannot be negative.");
        }

        Points += points;
        Level = Math.Clamp((Points / 100) + 1, 1, 4);
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Sets the travel style label key.</summary>
    public void SetTravelStyle(string? travelStyle)
    {
        TravelStyle = string.IsNullOrWhiteSpace(travelStyle) ? null : travelStyle.Trim();
        UpdatedAt = DateTimeOffset.UtcNow;
    }
}

/// <summary>
/// Badge definition with a threshold and category.
/// </summary>
public sealed class BadgeDefinition : AggregateRoot<Guid>
{
    private BadgeDefinition()
    {
    }

    private BadgeDefinition(
        Guid id,
        string code,
        string name,
        string description,
        string category,
        int threshold) : base(id)
    {
        Code = code;
        Name = name;
        Description = description;
        Category = category;
        Threshold = threshold;
    }

    /// <summary>Stable badge code.</summary>
    public string Code { get; private set; } = string.Empty;

    /// <summary>Display name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Description.</summary>
    public string Description { get; private set; } = string.Empty;

    /// <summary>Badge family.</summary>
    public string Category { get; private set; } = string.Empty;

    /// <summary>Required content count.</summary>
    public int Threshold { get; private set; }

    /// <summary>Creates a badge definition.</summary>
    public static BadgeDefinition Create(
        IIdGenerator ids,
        string code,
        string name,
        string description,
        string category,
        int threshold)
    {
        if (string.IsNullOrWhiteSpace(code) ||
            string.IsNullOrWhiteSpace(name) ||
            string.IsNullOrWhiteSpace(category) ||
            threshold < 1)
        {
            throw new ArgumentException("Badge code, name, category, and positive threshold are required.");
        }

        return new BadgeDefinition(
            ids.NewId(),
            code.Trim().ToLowerInvariant(),
            name.Trim(),
            description.Trim(),
            category.Trim(),
            threshold);
    }
}

/// <summary>
/// Badge awarded to a user.
/// </summary>
public sealed class UserBadge : AggregateRoot<Guid>
{
    private UserBadge()
    {
    }

    private UserBadge(Guid id, Guid userId, string badgeCode, DateTimeOffset awardedAt) : base(id)
    {
        UserId = userId;
        BadgeCode = badgeCode;
        AwardedAt = awardedAt;
    }

    /// <summary>User id.</summary>
    public Guid UserId { get; private set; }

    /// <summary>Badge code.</summary>
    public string BadgeCode { get; private set; } = string.Empty;

    /// <summary>Award time.</summary>
    public DateTimeOffset AwardedAt { get; private set; }

    /// <summary>Awards a badge.</summary>
    public static UserBadge Award(IIdGenerator ids, Guid userId, string badgeCode)
    {
        if (userId == Guid.Empty || string.IsNullOrWhiteSpace(badgeCode))
        {
            throw new ArgumentException("User and badge code are required.");
        }

        return new UserBadge(
            ids.NewId(),
            userId,
            badgeCode.Trim().ToLowerInvariant(),
            DateTimeOffset.UtcNow);
    }
}

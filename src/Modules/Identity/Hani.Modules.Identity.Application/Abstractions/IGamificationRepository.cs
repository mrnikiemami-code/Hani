using Hani.Modules.Identity.Domain.Gamification;

namespace Hani.Modules.Identity.Application.Abstractions;

/// <summary>
/// Persistence abstraction for user gamification and badges.
/// </summary>
public interface IGamificationRepository
{
    /// <summary>Returns the user's gamification profile, or <c>null</c>.</summary>
    Task<UserGamification?> GetUserAsync(Guid userId, CancellationToken cancellationToken);
    /// <summary>Adds a gamification profile.</summary>
    Task AddUserAsync(UserGamification profile, CancellationToken cancellationToken);
    /// <summary>Adds a badge definition.</summary>
    Task AddBadgeDefinitionAsync(BadgeDefinition definition, CancellationToken cancellationToken);
    /// <summary>Lists badge definitions.</summary>
    Task<IReadOnlyList<BadgeDefinition>> ListDefinitionsAsync(CancellationToken cancellationToken);
    /// <summary>Adds an awarded badge.</summary>
    Task AddUserBadgeAsync(UserBadge badge, CancellationToken cancellationToken);
    /// <summary>Lists badges for a user.</summary>
    Task<IReadOnlyList<UserBadge>> ListUserBadgesAsync(Guid userId, CancellationToken cancellationToken);
    /// <summary>Persists pending changes.</summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

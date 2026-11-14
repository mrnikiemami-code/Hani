using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Gamification;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Repositories;

internal sealed class GamificationRepository(IdentityDbContext dbContext) : IGamificationRepository
{
    public Task<UserGamification?> GetUserAsync(Guid userId, CancellationToken cancellationToken)
        => dbContext.UserGamifications.FirstOrDefaultAsync(item => item.UserId == userId, cancellationToken);

    public async Task AddUserAsync(UserGamification profile, CancellationToken cancellationToken)
    {
        await dbContext.UserGamifications.AddAsync(profile, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AddBadgeDefinitionAsync(BadgeDefinition definition, CancellationToken cancellationToken)
    {
        await dbContext.BadgeDefinitions.AddAsync(definition, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<BadgeDefinition>> ListDefinitionsAsync(CancellationToken cancellationToken)
        => await dbContext.BadgeDefinitions
            .AsNoTracking()
            .OrderBy(item => item.Category)
            .ThenBy(item => item.Threshold)
            .ToArrayAsync(cancellationToken);

    public async Task AddUserBadgeAsync(UserBadge badge, CancellationToken cancellationToken)
    {
        await dbContext.UserBadges.AddAsync(badge, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<UserBadge>> ListUserBadgesAsync(
        Guid userId,
        CancellationToken cancellationToken)
        => await dbContext.UserBadges
            .AsNoTracking()
            .Where(item => item.UserId == userId)
            .OrderByDescending(item => item.AwardedAt)
            .ToArrayAsync(cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

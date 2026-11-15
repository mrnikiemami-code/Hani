using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Users;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Repositories;

internal sealed class UserPreferencesRepository(IdentityDbContext dbContext)
    : IUserPreferencesRepository
{
    public Task<UserPreferences?> GetByUserIdAsync(
        Guid userId,
        CancellationToken cancellationToken)
        => dbContext.UserPreferences
            .FirstOrDefaultAsync(preferences => preferences.UserId == userId, cancellationToken);

    public async Task SaveAsync(
        UserPreferences preferences,
        CancellationToken cancellationToken)
    {
        var exists = await dbContext.UserPreferences
            .AnyAsync(item => item.UserId == preferences.UserId, cancellationToken);

        if (exists)
        {
            dbContext.UserPreferences.Update(preferences);
        }
        else
        {
            await dbContext.UserPreferences.AddAsync(preferences, cancellationToken);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

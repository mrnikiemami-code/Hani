using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Users;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Repositories;

internal sealed class UserRepository(IdentityDbContext dbContext) : IUserRepository
{
    public async Task AddAsync(User user, CancellationToken cancellationToken)
    {
        await dbContext.Users.AddAsync(user, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);

    public Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => QueryUsers()
            .FirstOrDefaultAsync(user => user.Id == id, cancellationToken);

    public Task<User?> GetByMobileAsync(string mobile, CancellationToken cancellationToken)
        => QueryUsers()
            .FirstOrDefaultAsync(user => user.Mobile == mobile, cancellationToken);

    public Task<User?> GetByUsernameAsync(string username, CancellationToken cancellationToken)
        => QueryUsers()
            .FirstOrDefaultAsync(user => user.Username == username, cancellationToken);

    public Task<User?> GetByRefreshTokenHashAsync(
        string tokenHash,
        CancellationToken cancellationToken)
        => QueryUsers()
            .FirstOrDefaultAsync(
                user => user.RefreshTokens.Any(token => token.TokenHash == tokenHash),
                cancellationToken);

    public Task<bool> UsernameExistsAsync(string username, CancellationToken cancellationToken)
        => dbContext.Users.AnyAsync(user => user.Username == username, cancellationToken);

    private IQueryable<User> QueryUsers()
        => dbContext.Users
            .AsSplitQuery()
            .Include(user => user.OtpCodes)
            .Include(user => user.RefreshTokens);
}

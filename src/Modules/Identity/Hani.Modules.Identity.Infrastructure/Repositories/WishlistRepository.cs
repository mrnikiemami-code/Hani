using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Wishlists;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Repositories;

internal sealed class WishlistRepository(IdentityDbContext dbContext) : IWishlistRepository
{
    public async Task<IReadOnlyList<WishlistItem>> ListByUserAsync(
        Guid userId,
        CancellationToken cancellationToken)
        => await dbContext.WishlistItems
            .AsNoTracking()
            .Where(item => item.UserId == userId)
            .OrderByDescending(item => item.CreatedAt)
            .ToArrayAsync(cancellationToken);

    public Task<bool> ExistsAsync(
        Guid userId,
        Guid productId,
        CancellationToken cancellationToken)
        => dbContext.WishlistItems.AnyAsync(
            item => item.UserId == userId && item.ProductId == productId,
            cancellationToken);

    public async Task AddAsync(WishlistItem item, CancellationToken cancellationToken)
    {
        await dbContext.WishlistItems.AddAsync(item, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveAsync(
        Guid userId,
        Guid productId,
        CancellationToken cancellationToken)
    {
        var item = await dbContext.WishlistItems.FirstOrDefaultAsync(
            entry => entry.UserId == userId && entry.ProductId == productId,
            cancellationToken);

        if (item is null)
        {
            return;
        }

        dbContext.WishlistItems.Remove(item);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

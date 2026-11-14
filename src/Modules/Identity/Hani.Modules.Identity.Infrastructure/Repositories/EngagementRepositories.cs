using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Repositories;

internal sealed class ReviewRepository(IdentityDbContext dbContext) : IReviewRepository
{
    public async Task AddAsync(Review review, CancellationToken cancellationToken)
    {
        await dbContext.Reviews.AddAsync(review, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);

    public Task<Review?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Reviews
            .Include(review => review.Photos)
            .Include(review => review.HelpfulVotes)
            .Include(review => review.Reports)
            .FirstOrDefaultAsync(review => review.Id == id, cancellationToken);

    public async Task<IReadOnlyList<Review>> ListAsync(
        ReviewTargetType targetType,
        Guid targetId,
        int? minRating,
        string? sort,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Reviews
            .AsNoTracking()
            .AsSplitQuery()
            .Include(review => review.Photos)
            .Where(review =>
                review.TargetType == targetType &&
                review.TargetId == targetId &&
                review.Status == ReviewStatus.Published);

        if (minRating is not null)
        {
            query = query.Where(review => review.Rating >= minRating);
        }

        query = sort?.Trim().ToLowerInvariant() switch
        {
            "helpful" => query.OrderByDescending(review => review.HelpfulCount),
            "rating" => query.OrderByDescending(review => review.Rating),
            _ => query.OrderByDescending(review => review.PublishedAt)
        };

        return await query.Skip(skip).Take(take).ToArrayAsync(cancellationToken);
    }

    public Task<int> CountAsync(
        ReviewTargetType targetType,
        Guid targetId,
        int? minRating,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Reviews.Where(review =>
            review.TargetType == targetType &&
            review.TargetId == targetId &&
            review.Status == ReviewStatus.Published);

        if (minRating is not null)
        {
            query = query.Where(review => review.Rating >= minRating);
        }

        return query.CountAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Review>> ListPendingAsync(
        int skip,
        int take,
        CancellationToken cancellationToken)
        => await dbContext.Reviews
            .AsNoTracking()
            .AsSplitQuery()
            .Include(review => review.Photos)
            .Where(review => review.Status == ReviewStatus.Pending)
            .OrderBy(review => review.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);

    public Task<int> CountPendingAsync(CancellationToken cancellationToken)
        => dbContext.Reviews.CountAsync(
            review => review.Status == ReviewStatus.Pending,
            cancellationToken);
}

internal sealed class ClaimRepository(IdentityDbContext dbContext) : IClaimRepository
{
    public async Task AddAsync(OwnershipClaim claim, CancellationToken cancellationToken)
    {
        await dbContext.Claims.AddAsync(claim, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);

    public Task<OwnershipClaim?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Claims.FirstOrDefaultAsync(claim => claim.Id == id, cancellationToken);

    public async Task<IReadOnlyList<OwnershipClaim>> ListAsync(
        ClaimStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Claims.AsNoTracking().AsQueryable();

        if (status is not null)
        {
            query = query.Where(claim => claim.Status == status);
        }

        return await query
            .OrderByDescending(claim => claim.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public Task<int> CountAsync(ClaimStatus? status, CancellationToken cancellationToken)
    {
        var query = dbContext.Claims.AsQueryable();

        if (status is not null)
        {
            query = query.Where(claim => claim.Status == status);
        }

        return query.CountAsync(cancellationToken);
    }
}

internal sealed class MediaRepository(IdentityDbContext dbContext) : IMediaRepository
{
    public async Task AddAsync(MediaAsset asset, CancellationToken cancellationToken)
    {
        await dbContext.MediaAssets.AddAsync(asset, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);

    public Task<MediaAsset?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.MediaAssets.FirstOrDefaultAsync(asset => asset.Id == id, cancellationToken);

    public async Task<IReadOnlyList<MediaAsset>> ListAsync(
        MediaStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = dbContext.MediaAssets.AsNoTracking().AsQueryable();

        if (status is not null)
        {
            query = query.Where(asset => asset.Status == status);
        }

        return await query
            .OrderByDescending(asset => asset.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public Task<int> CountAsync(MediaStatus? status, CancellationToken cancellationToken)
    {
        var query = dbContext.MediaAssets.AsQueryable();

        if (status is not null)
        {
            query = query.Where(asset => asset.Status == status);
        }

        return query.CountAsync(cancellationToken);
    }
}

using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;

namespace Hani.Modules.Identity.Application.Abstractions;

/// <summary>
/// Persistence abstraction for reviews.
/// </summary>
public interface IReviewRepository
{
    /// <summary>
    /// Adds a review and saves changes.
    /// </summary>
    Task AddAsync(Review review, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);

    /// <summary>
    /// Returns a review by id, or <c>null</c>.
    /// </summary>
    Task<Review?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a page of reviews matching target and filters.
    /// </summary>
    Task<IReadOnlyList<Review>> ListAsync(
        ReviewTargetType targetType,
        Guid targetId,
        int? minRating,
        string? sort,
        DateOnly? from,
        DateOnly? to,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts reviews matching target, minimum rating, and date range.
    /// </summary>
    Task<int> CountAsync(
        ReviewTargetType targetType,
        Guid targetId,
        int? minRating,
        DateOnly? from,
        DateOnly? to,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns reviews awaiting moderation.
    /// </summary>
    Task<IReadOnlyList<Review>> ListPendingAsync(
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts reviews awaiting moderation.
    /// </summary>
    Task<int> CountPendingAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for ownership claims.
/// </summary>
public interface IClaimRepository
{
    /// <summary>
    /// Adds a claim and saves changes.
    /// </summary>
    Task AddAsync(OwnershipClaim claim, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);

    /// <summary>
    /// Returns a claim by id, or <c>null</c>.
    /// </summary>
    Task<OwnershipClaim?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Lists claims, optionally filtered by status.
    /// </summary>
    Task<IReadOnlyList<OwnershipClaim>> ListAsync(
        ClaimStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts claims, optionally filtered by status.
    /// </summary>
    Task<int> CountAsync(ClaimStatus? status, CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for moderated media assets.
/// </summary>
public interface IMediaRepository
{
    /// <summary>
    /// Adds a media asset and saves changes.
    /// </summary>
    Task AddAsync(MediaAsset asset, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);

    /// <summary>
    /// Returns a media asset by id, or <c>null</c>.
    /// </summary>
    Task<MediaAsset?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Lists media, optionally filtered by status.
    /// </summary>
    Task<IReadOnlyList<MediaAsset>> ListAsync(
        MediaStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts media, optionally filtered by status.
    /// </summary>
    Task<int> CountAsync(MediaStatus? status, CancellationToken cancellationToken);
}

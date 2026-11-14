using Hani.Contracts.Identity;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.ReadServices;

internal sealed class ReviewMediaReadService(IdentityDbContext dbContext)
    : IReviewMediaReadService
{
    public async Task<IReadOnlyList<ReviewMediaItem>> GetPhotoUrlsAsync(
        string targetType,
        IReadOnlyCollection<Guid> targetIds,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<ReviewTargetType>(targetType, ignoreCase: true, out var parsedType) ||
            targetIds.Count == 0)
        {
            return [];
        }

        var ids = targetIds.Distinct().ToArray();
        var reviews = await dbContext.Reviews
            .AsNoTracking()
            .AsSplitQuery()
            .Include(review => review.Photos)
            .Where(review =>
                review.TargetType == parsedType &&
                review.Status == ReviewStatus.Published &&
                ids.Contains(review.TargetId))
            .ToArrayAsync(cancellationToken);

        return reviews
            .SelectMany(review => review.Photos
                .Where(photo => photo.Status == ReviewPhotoStatus.Approved)
                .Select(photo => new ReviewMediaItem(
                    review.TargetId,
                    photo.Url,
                    photo.Caption)))
            .ToArray();
    }
}

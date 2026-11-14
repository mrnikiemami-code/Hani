using Hani.Contracts.Identity;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.ReadServices;

internal sealed class ReviewSummaryReadService(IdentityDbContext dbContext)
    : IReviewSummaryReadService
{
    public async Task<IReadOnlyDictionary<Guid, ReviewSummary>> GetSummariesAsync(
        string targetType,
        IReadOnlyCollection<Guid> targetIds,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<ReviewTargetType>(targetType, ignoreCase: true, out var parsedType) ||
            targetIds.Count == 0)
        {
            return new Dictionary<Guid, ReviewSummary>();
        }

        var ids = targetIds.Distinct().ToArray();
        var summaries = await dbContext.Reviews
            .AsNoTracking()
            .Where(review =>
                review.TargetType == parsedType &&
                review.Status == ReviewStatus.Published &&
                ids.Contains(review.TargetId))
            .GroupBy(review => review.TargetId)
            .Select(group => new
            {
                TargetId = group.Key,
                AverageRating = group.Average(review => (decimal)review.Rating),
                ReviewCount = group.Count()
            })
            .ToArrayAsync(cancellationToken);

        return summaries.ToDictionary(
            item => item.TargetId,
            item => new ReviewSummary(
                item.TargetId,
                Math.Round(item.AverageRating, 2),
                item.ReviewCount));
    }
}

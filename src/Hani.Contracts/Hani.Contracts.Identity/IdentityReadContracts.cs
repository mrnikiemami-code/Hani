namespace Hani.Contracts.Identity;

/// <summary>
/// Read-side contract for published review summaries.
/// </summary>
public interface IReviewSummaryReadService
{
    /// <summary>
    /// Returns aggregate rating and published-review count for the requested targets.
    /// Missing targets are omitted.
    /// </summary>
    Task<IReadOnlyDictionary<Guid, ReviewSummary>> GetSummariesAsync(
        string targetType,
        IReadOnlyCollection<Guid> targetIds,
        CancellationToken cancellationToken);
}

/// <summary>
/// Aggregate review summary for one target.
/// </summary>
public sealed record ReviewSummary(Guid TargetId, decimal AverageRating, int ReviewCount);

/// <summary>
/// Read-side contract for agency display data.
/// </summary>
public interface IAgencyReadService
{
    /// <summary>
    /// Returns agency names keyed by id; missing ids are omitted.
    /// </summary>
    Task<IReadOnlyDictionary<Guid, string>> GetNamesAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns ids of agencies that are active and eligible to receive platform leads.
    /// </summary>
    Task<IReadOnlyList<Guid>> GetActiveAgencyIdsAsync(CancellationToken cancellationToken);
}

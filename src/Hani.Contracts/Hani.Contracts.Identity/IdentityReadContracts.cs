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
public sealed record ReviewSummary(
    Guid TargetId,
    decimal AverageRating,
    int ReviewCount,
    int RecommendedCount = 0);

/// <summary>
/// Read-side contract for published user media.
/// </summary>
public interface IReviewMediaReadService
{
    /// <summary>
    /// Returns approved photo URLs attached to published reviews for the requested targets.
    /// </summary>
    Task<IReadOnlyList<ReviewMediaItem>> GetPhotoUrlsAsync(
        string targetType,
        IReadOnlyCollection<Guid> targetIds,
        CancellationToken cancellationToken);
}

/// <summary>
/// Approved user photo for one reviewed target.
/// </summary>
public sealed record ReviewMediaItem(Guid TargetId, string Url, string? Caption);

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

    /// <summary>
    /// Returns channel settings for an agency, or <c>null</c>.
    /// </summary>
    Task<ChannelSettingsSnapshot?> GetChannelSettingsAsync(
        Guid agencyId,
        CancellationToken cancellationToken);
}

/// <summary>Channel plan and white-label settings.</summary>
public sealed record ChannelSettingsSnapshot(
    string Plan,
    bool WhiteLabelEnabled,
    string? CustomDomain,
    bool AttributionRequired,
    string CanonicalMode);

/// <summary>
/// Publishes booking events to the agency channel webhook.
/// </summary>
public interface IChannelWebhookPublisher
{
    /// <summary>
    /// Sends an event to the agency webhook when configured; delivery errors are logged and not surfaced.
    /// </summary>
    Task PublishAsync(
        Guid agencyId,
        string eventType,
        object payload,
        CancellationToken cancellationToken);
}

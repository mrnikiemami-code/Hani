namespace Hani.Contracts.Identity;

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
}

namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Provides the current tenant (agency) for the request.
/// </summary>
public interface ICurrentTenant
{
    /// <summary>
    /// Current agency id, or <c>null</c> for platform-level requests.
    /// </summary>
    Guid? TenantId { get; }

    /// <summary>
    /// True when the request is not scoped to an agency.
    /// </summary>
    bool IsPlatform { get; }

    /// <summary>
    /// Temporarily changes the tenant and restores the previous value on dispose.
    /// </summary>
    IDisposable Change(Guid? tenantId);
}

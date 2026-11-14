namespace Hani.Modules.Identity.Domain.Agencies;

/// <summary>
/// Lifecycle state of an agency tenant.
/// </summary>
public enum AgencyStatus
{
    Active = 0,
    Suspended = 1,
    Pending = 2,
    Rejected = 3
}

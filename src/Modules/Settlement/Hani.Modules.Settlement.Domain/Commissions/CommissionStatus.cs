namespace Hani.Modules.Settlement.Domain.Commissions;

/// <summary>
/// Lifecycle state of a commission entry.
/// </summary>
public enum CommissionStatus
{
    Accrued = 0,
    AppliedToSettlement = 1,
    Reversed = 2
}

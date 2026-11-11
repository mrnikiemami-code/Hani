namespace Hani.Modules.Settlement.Domain.Ledger;

/// <summary>
/// Stable chart-of-accounts codes used by the settlement ledger.
/// </summary>
public static class LedgerAccounts
{
    /// <summary>
    /// Cash/PSP clearing asset.
    /// </summary>
    public const string PspCash = "psp_cash";

    /// <summary>
    /// Amounts owed to agencies.
    /// </summary>
    public const string AgencyPayable = "agency_payable";

    /// <summary>
    /// Hani commission revenue.
    /// </summary>
    public const string CommissionRevenue = "commission_revenue";
}

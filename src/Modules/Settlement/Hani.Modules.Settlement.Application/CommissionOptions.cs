namespace Hani.Modules.Settlement.Application;

/// <summary>
/// Fallback commission configuration used when no agency/product rule is effective.
/// </summary>
public sealed class CommissionOptions
{
    /// <summary>
    /// Default commission rate between zero and one.
    /// </summary>
    public decimal DefaultRate { get; set; } = 0.10m;

    /// <summary>
    /// Optional minimum commission amount.
    /// </summary>
    public decimal? DefaultMinAmount { get; set; }

    /// <summary>
    /// Optional maximum commission amount.
    /// </summary>
    public decimal? DefaultMaxAmount { get; set; }
}

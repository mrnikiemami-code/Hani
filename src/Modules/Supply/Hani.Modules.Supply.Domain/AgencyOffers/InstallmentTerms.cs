namespace Hani.Modules.Supply.Domain.AgencyOffers;

/// <summary>
/// Agency-specific installment rules. A disabled value means installments are not offered.
/// </summary>
public sealed record InstallmentTerms(
    bool IsEnabled,
    decimal MinDownPaymentRate,
    int MaxMonths,
    decimal MonthlyFeeRate,
    bool RequiresCheque)
{
    /// <summary>
    /// Disabled installment terms.
    /// </summary>
    public static InstallmentTerms None { get; } = new(false, 0m, 0, 0m, false);

    /// <summary>
    /// Creates validated enabled terms.
    /// </summary>
    public static InstallmentTerms Create(
        decimal minDownPaymentRate,
        int maxMonths,
        decimal monthlyFeeRate,
        bool requiresCheque)
    {
        if (minDownPaymentRate is < 0m or > 1m)
        {
            throw new ArgumentOutOfRangeException(
                nameof(minDownPaymentRate),
                "Minimum down payment rate must be between 0 and 1.");
        }

        if (maxMonths is < 1 or > 36)
        {
            throw new ArgumentOutOfRangeException(
                nameof(maxMonths),
                "Maximum installment months must be between 1 and 36.");
        }

        if (monthlyFeeRate is < 0m or > 1m)
        {
            throw new ArgumentOutOfRangeException(
                nameof(monthlyFeeRate),
                "Monthly fee rate must be between 0 and 1.");
        }

        return new InstallmentTerms(
            true,
            minDownPaymentRate,
            maxMonths,
            monthlyFeeRate,
            requiresCheque);
    }
}

namespace Hani.Modules.Admin.Application;

/// <summary>Admin finance summary.</summary>
public sealed record AdminFinanceSummaryDto(
    IReadOnlyList<PaymentCurrencySummary> Payments,
    int RefundCount,
    IReadOnlyList<CommissionCurrencySummary> Commissions,
    IReadOnlyList<PayoutCurrencySummary> Payouts);

/// <summary>Admin payout row.</summary>
public sealed record AdminPayoutDto(
    Guid Id,
    Guid AgencyId,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    decimal Amount,
    string Currency,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? PaidAt,
    string? BankReference,
    string? DocumentUrl,
    Guid? ApprovedBy);

/// <summary>Payment totals by status and currency.</summary>
public sealed record PaymentCurrencySummary(string Status, string Currency, int Count, decimal Amount);

/// <summary>Commission totals by currency.</summary>
public sealed record CommissionCurrencySummary(string Currency, int Count, decimal Amount);

/// <summary>Payout totals by status and currency.</summary>
public sealed record PayoutCurrencySummary(string Status, string Currency, int Count, decimal Amount);

/// <summary>Admin refund row.</summary>
public sealed record AdminRefundDto(
    Guid Id,
    Guid OrderId,
    Guid? PaymentIntentId,
    decimal Amount,
    string Currency,
    string Status,
    string Reason,
    DateTimeOffset RequestedAt,
    DateTimeOffset? ProcessedAt);

/// <summary>Admin invoice row.</summary>
public sealed record AdminInvoiceDto(
    Guid Id,
    string InvoiceNumber,
    Guid OrderId,
    string BuyerEmail,
    decimal Subtotal,
    decimal Tax,
    decimal Total,
    string Currency,
    string Status,
    DateTimeOffset IssuedAt);

/// <summary>Admin reconciliation row.</summary>
public sealed record AdminReconciliationDto(
    Guid Id,
    string Provider,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    string Currency,
    decimal ExpectedAmount,
    decimal ActualAmount,
    decimal Difference,
    string Status,
    DateTimeOffset CreatedAt);

/// <summary>Admin commission row.</summary>
public sealed record AdminCommissionDto(
    Guid Id,
    Guid OrderId,
    Guid AgencyId,
    string ProductType,
    decimal GrossAmount,
    decimal Rate,
    decimal CommissionAmount,
    decimal NetAmount,
    string Currency,
    string Status,
    DateTimeOffset CreatedAt);

/// <summary>Admin ledger transaction row.</summary>
public sealed record AdminLedgerDto(
    Guid Id,
    string ReferenceType,
    Guid ReferenceId,
    string Currency,
    DateTimeOffset CreatedAt,
    IReadOnlyList<AdminLedgerEntryDto> Entries);

/// <summary>Admin ledger entry row.</summary>
public sealed record AdminLedgerEntryDto(
    string AccountCode,
    decimal Debit,
    decimal Credit,
    string Description);

/// <summary>Admin finance read service.</summary>
public interface IAdminFinanceService
{
    /// <summary>Returns finance summary totals.</summary>
    Task<AdminFinanceSummaryDto> GetSummaryAsync(CancellationToken cancellationToken);
    /// <summary>Lists payouts.</summary>
    Task<IReadOnlyList<AdminPayoutDto>> ListPayoutsAsync(CancellationToken cancellationToken);
    /// <summary>Lists refunds.</summary>
    Task<IReadOnlyList<AdminRefundDto>> ListRefundsAsync(CancellationToken cancellationToken);
    /// <summary>Lists invoices.</summary>
    Task<IReadOnlyList<AdminInvoiceDto>> ListInvoicesAsync(CancellationToken cancellationToken);
    /// <summary>Lists reconciliations.</summary>
    Task<IReadOnlyList<AdminReconciliationDto>> ListReconciliationsAsync(CancellationToken cancellationToken);
    /// <summary>Lists commissions.</summary>
    Task<IReadOnlyList<AdminCommissionDto>> ListCommissionsAsync(CancellationToken cancellationToken);
    /// <summary>Lists ledger transactions.</summary>
    Task<IReadOnlyList<AdminLedgerDto>> ListLedgerAsync(CancellationToken cancellationToken);
}

using Hani.Modules.Admin.Application;
using Hani.Modules.Settlement.Domain.Commissions;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminFinanceService
{
    public async Task<AdminFinanceSummaryDto> GetSummaryAsync(
        CancellationToken cancellationToken)
    {
        var paymentRows = await payments.PaymentIntents
            .AsNoTracking()
            .GroupBy(item => new { item.Status, item.Currency })
            .Select(group => new PaymentCurrencySummary(
                group.Key.Status.ToString(),
                group.Key.Currency,
                group.Count(),
                group.Sum(item => item.Amount)))
            .ToArrayAsync(cancellationToken);
        var refundCount = await payments.Refunds.AsNoTracking().CountAsync(cancellationToken);
        var commissionRows = await settlement.CommissionEntries
            .AsNoTracking()
            .Where(item => item.Status == CommissionStatus.Accrued)
            .GroupBy(item => item.Currency)
            .Select(group => new CommissionCurrencySummary(
                group.Key,
                group.Count(),
                group.Sum(item => item.CommissionAmount)))
            .ToArrayAsync(cancellationToken);
        var payoutRows = await settlement.Payouts
            .AsNoTracking()
            .GroupBy(item => new { item.Status, item.Currency })
            .Select(group => new PayoutCurrencySummary(
                group.Key.Status.ToString(),
                group.Key.Currency,
                group.Count(),
                group.Sum(item => item.Amount)))
            .ToArrayAsync(cancellationToken);

        return new AdminFinanceSummaryDto(
            paymentRows,
            refundCount,
            commissionRows,
            payoutRows);
    }

    public async Task<IReadOnlyList<AdminPayoutDto>> ListPayoutsAsync(
        CancellationToken cancellationToken)
        => await settlement.Payouts
            .AsNoTracking()
            .OrderByDescending(item => item.CreatedAt)
            .Take(100)
            .Select(item => new AdminPayoutDto(
                item.Id,
                item.AgencyId,
                item.PeriodStart,
                item.PeriodEnd,
                item.Amount,
                item.Currency,
                item.Status.ToString(),
                item.CreatedAt,
                item.PaidAt,
                item.BankReference,
                item.DocumentUrl,
                item.ApprovedBy))
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<AdminRefundDto>> ListRefundsAsync(
        CancellationToken cancellationToken)
        => await payments.Refunds
            .AsNoTracking()
            .OrderByDescending(item => item.RequestedAt)
            .Take(100)
            .Select(item => new AdminRefundDto(
                item.Id,
                item.OrderId,
                item.PaymentIntentId,
                item.Amount,
                item.Currency,
                item.Status.ToString(),
                item.Reason,
                item.RequestedAt,
                item.ProcessedAt))
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<AdminInvoiceDto>> ListInvoicesAsync(
        CancellationToken cancellationToken)
        => await payments.Invoices
            .AsNoTracking()
            .OrderByDescending(item => item.IssuedAt)
            .Take(100)
            .Select(item => new AdminInvoiceDto(
                item.Id,
                item.InvoiceNumber,
                item.OrderId,
                item.BuyerEmail,
                item.Subtotal,
                item.Tax,
                item.Total,
                item.Currency,
                item.Status.ToString(),
                item.IssuedAt))
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<AdminReconciliationDto>> ListReconciliationsAsync(
        CancellationToken cancellationToken)
        => await payments.Reconciliations
            .AsNoTracking()
            .OrderByDescending(item => item.CreatedAt)
            .Take(100)
            .Select(item => new AdminReconciliationDto(
                item.Id,
                item.Provider,
                item.PeriodStart,
                item.PeriodEnd,
                item.Currency,
                item.ExpectedAmount,
                item.ActualAmount,
                item.Difference,
                item.Status.ToString(),
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<AdminCommissionDto>> ListCommissionsAsync(
        CancellationToken cancellationToken)
        => await settlement.CommissionEntries
            .AsNoTracking()
            .OrderByDescending(item => item.CreatedAt)
            .Take(100)
            .Select(item => new AdminCommissionDto(
                item.Id,
                item.OrderId,
                item.AgencyId,
                item.ProductType.ToString(),
                item.GrossAmount,
                item.Rate,
                item.CommissionAmount,
                item.NetAmount,
                item.Currency,
                item.Status.ToString(),
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<AdminLedgerDto>> ListLedgerAsync(
        CancellationToken cancellationToken)
    {
        var transactions = await settlement.LedgerTransactions
            .AsNoTracking()
            .Include(item => item.Entries)
            .OrderByDescending(item => item.CreatedAt)
            .Take(50)
            .ToArrayAsync(cancellationToken);
        return transactions
            .Select(item => new AdminLedgerDto(
                item.Id,
                item.ReferenceType,
                item.ReferenceId,
                item.Currency,
                item.CreatedAt,
                item.Entries
                    .OrderBy(entry => entry.AccountCode)
                    .Select(entry => new AdminLedgerEntryDto(
                        entry.AccountCode,
                        entry.Debit,
                        entry.Credit,
                        entry.Description))
                    .ToArray()))
            .ToArray();
    }
}

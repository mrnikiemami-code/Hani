using System.Globalization;
using System.Text;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Domain.PaymentIntents;
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

    public async Task<Result<AdminReconciliationDto>> CreateReconciliationAsync(
        string provider,
        DateOnly periodStart,
        DateOnly periodEnd,
        string currency,
        decimal actualAmount,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(provider) ||
            string.IsNullOrWhiteSpace(currency) ||
            currency.Trim().Length != 3)
        {
            return Result<AdminReconciliationDto>.Failure(Error.Validation(
                "HANI-ADMIN-FINANCE-4101",
                "Provider and a three-letter currency are required."));
        }

        if (periodEnd < periodStart)
        {
            return Result<AdminReconciliationDto>.Failure(Error.Validation(
                "HANI-ADMIN-FINANCE-4102",
                "Reconciliation period end cannot be before its start."));
        }

        var normalizedProvider = provider.Trim();
        var normalizedCurrency = currency.Trim().ToUpperInvariant();
        var from = new DateTimeOffset(
            periodStart.ToDateTime(TimeOnly.MinValue),
            TimeSpan.Zero);
        var toExclusive = new DateTimeOffset(
            periodEnd.AddDays(1).ToDateTime(TimeOnly.MinValue),
            TimeSpan.Zero);
        var expected = await payments.PaymentIntents
            .AsNoTracking()
            .Where(item =>
                item.Status == PaymentIntentStatus.Succeeded &&
                item.Provider == normalizedProvider &&
                item.Currency == normalizedCurrency &&
                item.CreatedAt >= from &&
                item.CreatedAt < toExclusive)
            .SumAsync(item => (decimal?)item.Amount, cancellationToken) ?? 0m;

        var result = await sender.Send(
            new CreateReconciliationCommand(
                normalizedProvider,
                periodStart,
                periodEnd,
                normalizedCurrency,
                expected,
                actualAmount),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return Result<AdminReconciliationDto>.Failure(result.Error!);
        }

        var value = result.Value!;
        return Result<AdminReconciliationDto>.Success(
            new AdminReconciliationDto(
                value.ReconciliationId,
                value.Provider,
                value.PeriodStart,
                value.PeriodEnd,
                value.Currency,
                value.ExpectedAmount,
                value.ActualAmount,
                value.Difference,
                value.Status,
                value.CreatedAt));
    }

    public async Task<Result<AdminExportFileDto>> ExportAsync(
        string dataset,
        DateOnly? from,
        DateOnly? to,
        CancellationToken cancellationToken)
    {
        var normalized = dataset.Trim().ToLowerInvariant();
        if (!AdminFinanceExportDatasets.All.Contains(normalized))
        {
            return Result<AdminExportFileDto>.Failure(Error.Validation(
                "HANI-ADMIN-FINANCE-4201",
                "Unsupported export dataset."));
        }

        if (from is { } fromDate && to is { } toDate && toDate < fromDate)
        {
            return Result<AdminExportFileDto>.Failure(Error.Validation(
                "HANI-ADMIN-FINANCE-4202",
                "Export end date cannot be before its start date."));
        }

        var fromInstant = from is { } start
            ? new DateTimeOffset(start.ToDateTime(TimeOnly.MinValue), TimeSpan.Zero)
            : (DateTimeOffset?)null;
        var toInstant = to is { } end
            ? new DateTimeOffset(end.AddDays(1).ToDateTime(TimeOnly.MinValue), TimeSpan.Zero)
            : (DateTimeOffset?)null;

        var csv = normalized switch
        {
            AdminFinanceExportDatasets.Payments => await ExportPaymentsAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            AdminFinanceExportDatasets.Refunds => await ExportRefundsAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            AdminFinanceExportDatasets.Invoices => await ExportInvoicesAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            AdminFinanceExportDatasets.Reconciliations => await ExportReconciliationsAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            AdminFinanceExportDatasets.Commissions => await ExportCommissionsAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            AdminFinanceExportDatasets.Payouts => await ExportPayoutsAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            AdminFinanceExportDatasets.Ledger => await ExportLedgerAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            AdminFinanceExportDatasets.Tax => await ExportTaxAsync(
                fromInstant,
                toInstant,
                cancellationToken),
            _ => string.Empty
        };

        return Result<AdminExportFileDto>.Success(
            new AdminExportFileDto(
                $"{normalized}-{DateTimeOffset.UtcNow:yyyyMMddHHmmss}.csv",
                "text/csv; charset=utf-8",
                $"\uFEFF{csv}"));
    }

    private async Task<string> ExportPaymentsAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = payments.PaymentIntents.AsNoTracking();
        if (from is { } start)
        {
            query = query.Where(item => item.CreatedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.CreatedAt < end);
        }

        var rows = await query
            .GroupBy(item => new { item.Status, item.Currency })
            .Select(group => new
            {
                group.Key.Status,
                group.Key.Currency,
                Count = group.Count(),
                Amount = group.Sum(item => item.Amount)
            })
            .OrderBy(item => item.Currency)
            .ThenBy(item => item.Status)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["status", "currency", "count", "amount"],
            rows.Select(item => new[]
            {
                item.Status.ToString(),
                item.Currency,
                item.Count.ToString(CultureInfo.InvariantCulture),
                Money(item.Amount)
            }));
    }

    private async Task<string> ExportRefundsAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = payments.Refunds.AsNoTracking();
        if (from is { } start)
        {
            query = query.Where(item => item.RequestedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.RequestedAt < end);
        }

        var rows = await query
            .OrderByDescending(item => item.RequestedAt)
            .Take(5000)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["order_id", "payment_intent_id", "amount", "currency", "status", "reason", "requested_at", "processed_at"],
            rows.Select(item => new[]
            {
                item.OrderId.ToString(),
                item.PaymentIntentId?.ToString() ?? string.Empty,
                Money(item.Amount),
                item.Currency,
                item.Status.ToString(),
                item.Reason,
                item.RequestedAt.ToString("O", CultureInfo.InvariantCulture),
                item.ProcessedAt?.ToString("O", CultureInfo.InvariantCulture) ?? string.Empty
            }));
    }

    private async Task<string> ExportInvoicesAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = payments.Invoices.AsNoTracking();
        if (from is { } start)
        {
            query = query.Where(item => item.IssuedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.IssuedAt < end);
        }

        var rows = await query
            .OrderByDescending(item => item.IssuedAt)
            .Take(5000)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["invoice_number", "order_id", "buyer_email", "subtotal", "tax", "total", "currency", "status", "issued_at"],
            rows.Select(item => new[]
            {
                item.InvoiceNumber,
                item.OrderId.ToString(),
                item.BuyerEmail,
                Money(item.Subtotal),
                Money(item.Tax),
                Money(item.Total),
                item.Currency,
                item.Status.ToString(),
                item.IssuedAt.ToString("O", CultureInfo.InvariantCulture)
            }));
    }

    private async Task<string> ExportReconciliationsAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = payments.Reconciliations.AsNoTracking();
        if (from is { } start)
        {
            query = query.Where(item => item.CreatedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.CreatedAt < end);
        }

        var rows = await query
            .OrderByDescending(item => item.CreatedAt)
            .Take(5000)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["provider", "period_start", "period_end", "currency", "expected", "actual", "difference", "status", "created_at"],
            rows.Select(item => new[]
            {
                item.Provider,
                item.PeriodStart.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                item.PeriodEnd.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                item.Currency,
                Money(item.ExpectedAmount),
                Money(item.ActualAmount),
                Money(item.Difference),
                item.Status.ToString(),
                item.CreatedAt.ToString("O", CultureInfo.InvariantCulture)
            }));
    }

    private async Task<string> ExportCommissionsAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = settlement.CommissionEntries.AsNoTracking();
        if (from is { } start)
        {
            query = query.Where(item => item.CreatedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.CreatedAt < end);
        }

        var rows = await query
            .OrderByDescending(item => item.CreatedAt)
            .Take(5000)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["order_id", "agency_id", "product_type", "gross", "rate", "commission", "net", "currency", "status", "created_at"],
            rows.Select(item => new[]
            {
                item.OrderId.ToString(),
                item.AgencyId.ToString(),
                item.ProductType.ToString(),
                Money(item.GrossAmount),
                Money(item.Rate),
                Money(item.CommissionAmount),
                Money(item.NetAmount),
                item.Currency,
                item.Status.ToString(),
                item.CreatedAt.ToString("O", CultureInfo.InvariantCulture)
            }));
    }

    private async Task<string> ExportPayoutsAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = settlement.Payouts.AsNoTracking();
        if (from is { } start)
        {
            query = query.Where(item => item.CreatedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.CreatedAt < end);
        }

        var rows = await query
            .OrderByDescending(item => item.CreatedAt)
            .Take(5000)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["agency_id", "period_start", "period_end", "amount", "currency", "status", "bank_reference", "document_url", "created_at", "paid_at"],
            rows.Select(item => new[]
            {
                item.AgencyId.ToString(),
                item.PeriodStart.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                item.PeriodEnd.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                Money(item.Amount),
                item.Currency,
                item.Status.ToString(),
                item.BankReference ?? string.Empty,
                item.DocumentUrl ?? string.Empty,
                item.CreatedAt.ToString("O", CultureInfo.InvariantCulture),
                item.PaidAt?.ToString("O", CultureInfo.InvariantCulture) ?? string.Empty
            }));
    }

    private async Task<string> ExportLedgerAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = settlement.LedgerTransactions
            .AsNoTracking()
            .Include(item => item.Entries)
            .AsQueryable();
        if (from is { } start)
        {
            query = query.Where(item => item.CreatedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.CreatedAt < end);
        }

        var transactions = await query
            .OrderByDescending(item => item.CreatedAt)
            .Take(1000)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["reference_type", "reference_id", "currency", "created_at", "account", "debit", "credit", "description"],
            transactions.SelectMany(transaction => transaction.Entries
                .OrderBy(entry => entry.AccountCode)
                .Select(entry => new[]
                {
                    transaction.ReferenceType,
                    transaction.ReferenceId.ToString(),
                    transaction.Currency,
                    transaction.CreatedAt.ToString("O", CultureInfo.InvariantCulture),
                    entry.AccountCode,
                    Money(entry.Debit),
                    Money(entry.Credit),
                    entry.Description
                })));
    }

    private async Task<string> ExportTaxAsync(
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var query = payments.Invoices.AsNoTracking();
        if (from is { } start)
        {
            query = query.Where(item => item.IssuedAt >= start);
        }

        if (to is { } end)
        {
            query = query.Where(item => item.IssuedAt < end);
        }

        var rows = await query
            .OrderByDescending(item => item.IssuedAt)
            .Take(5000)
            .ToArrayAsync(cancellationToken);
        return Csv(
            ["invoice_number", "order_id", "currency", "tax", "total", "issued_at"],
            rows.Select(item => new[]
            {
                item.InvoiceNumber,
                item.OrderId.ToString(),
                item.Currency,
                Money(item.Tax),
                Money(item.Total),
                item.IssuedAt.ToString("O", CultureInfo.InvariantCulture)
            }));
    }

    private static string Money(decimal value)
        => value.ToString("0.00", CultureInfo.InvariantCulture);

    private static string Csv(
        IReadOnlyList<string> headers,
        IEnumerable<IReadOnlyList<string>> rows)
    {
        var builder = new StringBuilder();
        builder.AppendLine(string.Join(',', headers.Select(EscapeCsv)));
        foreach (var row in rows)
        {
            builder.AppendLine(string.Join(',', row.Select(EscapeCsv)));
        }

        return builder.ToString();
    }

    private static string EscapeCsv(string value)
    {
        if (value.Contains('"') || value.Contains(',') ||
            value.Contains('\n') || value.Contains('\r'))
        {
            return $"\"{value.Replace("\"", "\"\"")}\"";
        }

        return value;
    }
}

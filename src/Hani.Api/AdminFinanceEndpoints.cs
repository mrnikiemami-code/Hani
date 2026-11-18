using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Admin finance read model for phase-3 dashboards.</summary>
public static class AdminFinanceEndpoints
{
    /// <summary>Maps admin finance endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminFinanceEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/finance/summary", GetAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.GetAdminFinanceSummary")
            .RequireAuthorization("Admin")
            .Produces<AdminFinanceSummaryDto>();

        app.MapGet("/internal/v1/admin/finance/payouts", ListPayoutsAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.ListAdminPayouts")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminPayoutDto>>();

        app.MapGet("/internal/v1/admin/finance/refunds", ListRefundsAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.ListAdminRefunds")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminRefundDto>>();

        app.MapGet("/internal/v1/admin/finance/invoices", ListInvoicesAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.ListAdminInvoices")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminInvoiceDto>>();

        app.MapGet("/internal/v1/admin/finance/reconciliations", ListReconciliationsAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.ListAdminReconciliations")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminReconciliationDto>>();

        app.MapGet("/internal/v1/admin/finance/commissions", ListCommissionsAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.ListAdminCommissions")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminCommissionDto>>();

        app.MapGet("/internal/v1/admin/finance/ledger", ListLedgerAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.ListAdminLedger")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminLedgerDto>>();
        return app;
    }

    private static async Task<IResult> ListRefundsAsync(
        PaymentsDbContext payments,
        CancellationToken cancellationToken)
    {
        var rows = await payments.Refunds
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
        return Results.Ok(rows);
    }

    private static async Task<IResult> ListInvoicesAsync(
        PaymentsDbContext payments,
        CancellationToken cancellationToken)
    {
        var rows = await payments.Invoices
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
        return Results.Ok(rows);
    }

    private static async Task<IResult> ListReconciliationsAsync(
        PaymentsDbContext payments,
        CancellationToken cancellationToken)
    {
        var rows = await payments.Reconciliations
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
        return Results.Ok(rows);
    }

    private static async Task<IResult> ListCommissionsAsync(
        SettlementDbContext settlement,
        CancellationToken cancellationToken)
    {
        var rows = await settlement.CommissionEntries
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
        return Results.Ok(rows);
    }

    private static async Task<IResult> ListLedgerAsync(
        SettlementDbContext settlement,
        CancellationToken cancellationToken)
    {
        var transactions = await settlement.LedgerTransactions
            .AsNoTracking()
            .Include(item => item.Entries)
            .OrderByDescending(item => item.CreatedAt)
            .Take(50)
            .ToArrayAsync(cancellationToken);
        var rows = transactions
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
        return Results.Ok(rows);
    }

    private static async Task<IResult> ListPayoutsAsync(
        SettlementDbContext settlement,
        CancellationToken cancellationToken)
    {
        var payouts = await settlement.Payouts
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
        return Results.Ok(payouts);
    }

    private static async Task<IResult> GetAsync(
        PaymentsDbContext payments,
        SettlementDbContext settlement,
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

        return Results.Ok(new AdminFinanceSummaryDto(
            paymentRows,
            refundCount,
            commissionRows,
            payoutRows));
    }
}

/// <summary>Admin finance summary payload.</summary>
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

/// <summary>Payment totals grouped by status and currency.</summary>
public sealed record PaymentCurrencySummary(
    string Status,
    string Currency,
    int Count,
    decimal Amount);

/// <summary>Accrued commission totals grouped by currency.</summary>
public sealed record CommissionCurrencySummary(
    string Currency,
    int Count,
    decimal Amount);

/// <summary>Payout totals grouped by status and currency.</summary>
public sealed record PayoutCurrencySummary(
    string Status,
    string Currency,
    int Count,
    decimal Amount);

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

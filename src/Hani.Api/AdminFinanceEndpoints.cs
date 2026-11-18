using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Domain.Payouts;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
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
        return app;
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

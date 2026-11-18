using Hani.Modules.Admin.Application;

namespace Hani.Api;

/// <summary>Admin finance read endpoints.</summary>
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

    private static async Task<IResult> GetAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.GetSummaryAsync(cancellationToken));

    private static async Task<IResult> ListPayoutsAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListPayoutsAsync(cancellationToken));

    private static async Task<IResult> ListRefundsAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListRefundsAsync(cancellationToken));

    private static async Task<IResult> ListInvoicesAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListInvoicesAsync(cancellationToken));

    private static async Task<IResult> ListReconciliationsAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListReconciliationsAsync(cancellationToken));

    private static async Task<IResult> ListCommissionsAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListCommissionsAsync(cancellationToken));

    private static async Task<IResult> ListLedgerAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListLedgerAsync(cancellationToken));
}

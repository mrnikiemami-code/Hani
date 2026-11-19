using System.Text;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Admin finance read, settings, reconciliation, and export endpoints.</summary>
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

        app.MapPost("/internal/v1/admin/finance/reconciliations/run", RunReconciliationAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.RunAdminReconciliation")
            .RequireAuthorization("Admin")
            .Produces<AdminReconciliationDto>(StatusCodes.Status201Created);

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

        app.MapGet("/internal/v1/admin/finance/settings", GetSettingsAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.GetAdminFinanceSettings")
            .RequireAuthorization("Admin")
            .Produces<AdminFinanceSettingsDto>();

        app.MapPut("/internal/v1/admin/finance/settings", UpdateSettingsAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.UpdateAdminFinanceSettings")
            .RequireAuthorization("Admin")
            .Produces<AdminFinanceSettingsDto>();

        app.MapGet("/internal/v1/admin/finance/exports/{dataset}", ExportAsync)
            .WithTags("Internal.Admin.Finance")
            .WithName("Internal.ExportAdminFinanceDataset")
            .RequireAuthorization("Admin")
            .Produces(StatusCodes.Status200OK, contentType: "text/csv");
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

    private static async Task<IResult> RunReconciliationAsync(
        RunReconciliationRequest request,
        HttpContext context,
        IAdminFinanceService finance,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await finance.CreateReconciliationAsync(
            request.Provider,
            request.PeriodStart,
            request.PeriodEnd,
            request.Currency,
            request.ActualAmount,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "finance.reconciliation.created",
            "Reconciliation",
            result.Value!.Id.ToString(),
            "Provider reconciliation run from the admin panel",
            after: result.Value,
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/finance/reconciliations/{result.Value.Id}",
            result.Value);
    }

    private static async Task<IResult> ListCommissionsAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListCommissionsAsync(cancellationToken));

    private static async Task<IResult> ListLedgerAsync(
        IAdminFinanceService finance,
        CancellationToken cancellationToken)
        => Results.Ok(await finance.ListLedgerAsync(cancellationToken));

    private static async Task<IResult> GetSettingsAsync(
        IAdminFinanceSettingsService settings,
        CancellationToken cancellationToken)
        => Results.Ok(await settings.GetFinanceSettingsAsync(cancellationToken));

    private static async Task<IResult> UpdateSettingsAsync(
        AdminFinanceSettingsInput request,
        HttpContext context,
        IAdminFinanceSettingsService settings,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var before = await settings.GetFinanceSettingsAsync(cancellationToken);
        var result = await settings.UpdateFinanceSettingsAsync(
            request,
            TryGetUserId(context),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "finance.settings.updated",
            "FinanceSettings",
            "finance",
            "Finance settings updated from the admin panel",
            before: before,
            after: result.Value,
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ExportAsync(
        string dataset,
        [FromQuery] DateOnly? from,
        [FromQuery] DateOnly? to,
        HttpContext context,
        IAdminFinanceService finance,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await finance.ExportAsync(
            dataset,
            from,
            to,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "finance.export.downloaded",
            "FinanceExport",
            dataset,
            "Finance dataset exported from the admin panel",
            after: new { dataset, from, to },
            cancellationToken: cancellationToken);
        var file = result.Value!;
        return Results.File(
            Encoding.UTF8.GetBytes(file.Content),
            file.ContentType,
            file.FileName);
    }

    private static Guid? TryGetUserId(HttpContext context)
        => Guid.TryParse(
            context.User.FindFirst("user_id")?.Value,
            out var userId)
            ? userId
            : null;
}

/// <summary>Admin reconciliation run request.</summary>
public sealed record RunReconciliationRequest(
    string Provider,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    string Currency,
    decimal ActualAmount);

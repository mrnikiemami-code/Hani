using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Microsoft.AspNetCore.Mvc;

namespace Hani.Api;

/// <summary>Two-person approvals and audit trail endpoints.</summary>
public static class AdminGovernanceEndpoints
{
    /// <summary>Maps admin approval and audit endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminGovernanceEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/approvals", ListApprovalsAsync)
            .WithTags("Internal.Admin.Governance")
            .WithName("Internal.ListAdminApprovals")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminApprovalDto>>();

        app.MapPost("/internal/v1/admin/approvals/refunds", RequestRefundAsync)
            .WithTags("Internal.Admin.Governance")
            .WithName("Internal.RequestAdminRefundApproval")
            .RequireAuthorization("Admin")
            .Produces<AdminApprovalDto>(StatusCodes.Status201Created);

        app.MapPost("/internal/v1/admin/approvals/settlements", RequestSettlementAsync)
            .WithTags("Internal.Admin.Governance")
            .WithName("Internal.RequestAdminSettlementApproval")
            .RequireAuthorization("Admin")
            .Produces<AdminApprovalDto>(StatusCodes.Status201Created);

        app.MapPost("/internal/v1/admin/approvals/{id:guid}/approve", ApproveAsync)
            .WithTags("Internal.Admin.Governance")
            .WithName("Internal.ApproveAdminApproval")
            .RequireAuthorization("Admin")
            .Produces<AdminApprovalDto>();

        app.MapPost("/internal/v1/admin/approvals/{id:guid}/reject", RejectAsync)
            .WithTags("Internal.Admin.Governance")
            .WithName("Internal.RejectAdminApproval")
            .RequireAuthorization("Admin")
            .Produces<AdminApprovalDto>();

        app.MapGet("/internal/v1/admin/audit", ListAuditAsync)
            .WithTags("Internal.Admin.Governance")
            .WithName("Internal.ListAdminAudit")
            .RequireAuthorization("Admin")
            .Produces<AdminAuditPageDto>();

        return app;
    }

    private static async Task<IResult> ListApprovalsAsync(
        [FromQuery] string? status,
        IAdminGovernanceService governance,
        CancellationToken cancellationToken)
        => Results.Ok(await governance.ListApprovalsAsync(status, cancellationToken));

    private static async Task<IResult> RequestRefundAsync(
        AdminRefundApprovalRequest request,
        HttpContext context,
        IAdminGovernanceService governance,
        CancellationToken cancellationToken)
    {
        if (!TryGetActor(context, out var actor))
        {
            return Unauthorized(context);
        }

        var result = await governance.RequestRefundAsync(
            new AdminRefundApprovalInput(
                request.OrderId,
                request.PaymentIntentId,
                request.Amount,
                request.Currency,
                request.Reason),
            actor,
            cancellationToken);
        return result.IsSuccess
            ? Results.Created(
                $"/internal/v1/admin/approvals/{result.Value!.Id}",
                result.Value)
            : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> RequestSettlementAsync(
        AdminSettlementApprovalRequest request,
        HttpContext context,
        IAdminGovernanceService governance,
        CancellationToken cancellationToken)
    {
        if (!TryGetActor(context, out var actor))
        {
            return Unauthorized(context);
        }

        var result = await governance.RequestSettlementAsync(
            new AdminSettlementApprovalInput(
                request.PayoutId,
                request.BankReference,
                request.DocumentUrl,
                request.Reason),
            actor,
            cancellationToken);
        return result.IsSuccess
            ? Results.Created(
                $"/internal/v1/admin/approvals/{result.Value!.Id}",
                result.Value)
            : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> ApproveAsync(
        Guid id,
        AdminDecisionRequest request,
        HttpContext context,
        IAdminGovernanceService governance,
        CancellationToken cancellationToken)
    {
        if (!TryGetActor(context, out var actor))
        {
            return Unauthorized(context);
        }

        var result = await governance.ApproveAsync(
            id,
            request.Reason,
            actor,
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> RejectAsync(
        Guid id,
        AdminDecisionRequest request,
        HttpContext context,
        IAdminGovernanceService governance,
        CancellationToken cancellationToken)
    {
        if (!TryGetActor(context, out var actor))
        {
            return Unauthorized(context);
        }

        var result = await governance.RejectAsync(
            id,
            request.Reason,
            actor,
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> ListAuditAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? action,
        IAdminGovernanceService governance,
        CancellationToken cancellationToken)
        => Results.Ok(await governance.ListAuditAsync(
            page,
            pageSize,
            q,
            action,
            cancellationToken));

    private static bool TryGetActor(HttpContext context, out AdminActorContext actor)
        => AdminActorContextFactory.TryCreate(context, out actor);

    private static IResult Unauthorized(HttpContext context)
        => context.ToProblem(new Hani.BuildingBlocks.Application.Error(
            "HANI-GOVERNANCE-4001",
            "An authenticated administrator is required.",
            Hani.BuildingBlocks.Application.ErrorType.Unauthorized));
}

/// <summary>Refund approval request.</summary>
public sealed record AdminRefundApprovalRequest(
    Guid OrderId,
    Guid PaymentIntentId,
    decimal Amount,
    string Currency,
    string Reason);

/// <summary>Settlement approval request.</summary>
public sealed record AdminSettlementApprovalRequest(
    Guid PayoutId,
    string BankReference,
    string DocumentUrl,
    string Reason);

/// <summary>Approve or reject decision.</summary>
public sealed record AdminDecisionRequest(string? Reason);

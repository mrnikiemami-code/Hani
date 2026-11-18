using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Application.Payouts;
using Hani.Modules.Settlement.Domain.Payouts;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Two-person approvals and the immutable administrative audit trail.
/// </summary>
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
        IdentityDbContext identity,
        CancellationToken cancellationToken)
    {
        var query = identity.AdminApprovalRequests.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<AdminApprovalStatus>(status, true, out var parsed))
        {
            query = query.Where(item => item.Status == parsed);
        }

        var rows = await query
            .OrderByDescending(item => item.RequestedAt)
            .Take(100)
            .Select(item => new AdminApprovalDto(
                item.Id,
                item.Type.ToString(),
                item.Status.ToString(),
                item.EntityType,
                item.EntityId,
                item.Amount,
                item.Currency,
                item.PaymentIntentId,
                item.BankReference,
                item.DocumentUrl,
                item.RequestedReason,
                item.RequestedBy,
                identity.Users.Where(user => user.Id == item.RequestedBy)
                    .Select(user => user.Mobile)
                    .FirstOrDefault() ?? string.Empty,
                item.RequestedAt,
                item.DecidedBy,
                item.DecidedBy == null
                    ? null
                    : identity.Users.Where(user => user.Id == item.DecidedBy)
                        .Select(user => user.Mobile)
                        .FirstOrDefault(),
                item.DecidedAt,
                item.DecisionReason,
                item.FailureReason))
            .ToArrayAsync(cancellationToken);

        return Results.Ok(rows);
    }

    private static async Task<IResult> RequestRefundAsync(
        AdminRefundApprovalRequest request,
        HttpContext context,
        IdentityDbContext identity,
        PaymentsDbContext payments,
        IIdGenerator ids,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminAuditWriter.TryGetUserId(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-GOVERNANCE-4001",
                "An authenticated administrator is required."));
        }

        if (string.IsNullOrWhiteSpace(request.Reason))
        {
            return context.ToProblem(Error.Validation(
                "HANI-GOVERNANCE-4002",
                "A refund reason is required."));
        }

        var intent = await payments.PaymentIntents
            .AsNoTracking()
            .Where(item =>
                item.Id == request.PaymentIntentId &&
                item.OrderId == request.OrderId &&
                item.Status == PaymentIntentStatus.Succeeded)
            .FirstOrDefaultAsync(cancellationToken);
        if (intent is null)
        {
            return context.ToProblem(Error.Validation(
                "HANI-GOVERNANCE-4003",
                "A successful payment intent for this order was not found."));
        }

        if (request.Amount <= 0 || request.Amount > intent.Amount)
        {
            return context.ToProblem(Error.Validation(
                "HANI-GOVERNANCE-4004",
                "The refund amount must be within the paid amount."));
        }

        if (!string.Equals(request.Currency, intent.Currency, StringComparison.OrdinalIgnoreCase))
        {
            return context.ToProblem(Error.Validation(
                "HANI-GOVERNANCE-4005",
                "The refund currency must match the payment currency."));
        }

        var duplicate = await identity.AdminApprovalRequests.AnyAsync(
            item =>
                item.Type == AdminApprovalType.Refund &&
                item.Status == AdminApprovalStatus.Pending &&
                item.PaymentIntentId == request.PaymentIntentId,
            cancellationToken);
        if (duplicate)
        {
            return context.ToProblem(Error.Conflict(
                "HANI-GOVERNANCE-4006",
                "A pending refund request already exists for this payment."));
        }

        var approval = AdminApprovalRequest.CreateRefund(
            ids,
            request.OrderId,
            request.PaymentIntentId,
            request.Amount,
            intent.Currency,
            request.Reason,
            actor);
        identity.AdminApprovalRequests.Add(approval);
        audit.Record(
            context,
            identity,
            "finance.refund.requested",
            "Order",
            request.OrderId.ToString(),
            request.Reason,
            after: new
            {
                approvalId = approval.Id,
                amount = approval.Amount,
                currency = approval.Currency,
                status = approval.Status.ToString()
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/approvals/{approval.Id}",
            ToDto(approval, string.Empty, null));
    }

    private static async Task<IResult> RequestSettlementAsync(
        AdminSettlementApprovalRequest request,
        HttpContext context,
        IdentityDbContext identity,
        SettlementDbContext settlement,
        IIdGenerator ids,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminAuditWriter.TryGetUserId(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-GOVERNANCE-4001",
                "An authenticated administrator is required."));
        }

        if (string.IsNullOrWhiteSpace(request.Reason))
        {
            return context.ToProblem(Error.Validation(
                "HANI-GOVERNANCE-4007",
                "A settlement reason is required."));
        }

        var payout = await settlement.Payouts
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == request.PayoutId, cancellationToken);
        if (payout is null || payout.Status != PayoutStatus.Pending)
        {
            return context.ToProblem(Error.Validation(
                "HANI-GOVERNANCE-4008",
                "A pending payout was not found."));
        }

        var duplicate = await identity.AdminApprovalRequests.AnyAsync(
            item =>
                item.Type == AdminApprovalType.Settlement &&
                item.Status == AdminApprovalStatus.Pending &&
                item.EntityId == request.PayoutId,
            cancellationToken);
        if (duplicate)
        {
            return context.ToProblem(Error.Conflict(
                "HANI-GOVERNANCE-4009",
                "A pending settlement request already exists for this payout."));
        }

        AdminApprovalRequest approval;
        try
        {
            approval = AdminApprovalRequest.CreateSettlement(
                ids,
                payout.Id,
                payout.Amount,
                payout.Currency,
                request.BankReference,
                request.DocumentUrl,
                request.Reason,
                actor);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-GOVERNANCE-4010", exception.Message));
        }

        identity.AdminApprovalRequests.Add(approval);
        audit.Record(
            context,
            identity,
            "finance.settlement.requested",
            "Payout",
            payout.Id.ToString(),
            request.Reason,
            agencyId: payout.AgencyId,
            after: new
            {
                approvalId = approval.Id,
                payout.Amount,
                payout.Currency,
                approval.BankReference,
                approval.DocumentUrl,
                status = approval.Status.ToString()
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/approvals/{approval.Id}",
            ToDto(approval, string.Empty, null));
    }

    private static async Task<IResult> ApproveAsync(
        Guid id,
        AdminDecisionRequest request,
        HttpContext context,
        IdentityDbContext identity,
        PaymentsDbContext payments,
        SettlementDbContext settlement,
        ISender sender,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminAuditWriter.TryGetUserId(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-GOVERNANCE-4001",
                "An authenticated administrator is required."));
        }

        var approval = await identity.AdminApprovalRequests
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (approval is null)
        {
            return context.ToProblem(Error.NotFound(
                "HANI-GOVERNANCE-4011",
                "Approval request was not found."));
        }

        if (approval.Status != AdminApprovalStatus.Pending)
        {
            return context.ToProblem(Error.Conflict(
                "HANI-GOVERNANCE-4012",
                "Only pending requests can be approved."));
        }

        if (approval.RequestedBy == actor)
        {
            audit.Record(
                context,
                identity,
                "finance.approval.denied",
                approval.EntityType,
                approval.EntityId.ToString(),
                "Self-approval blocked by the two-person rule.");
            await identity.SaveChangesAsync(cancellationToken);
            return context.ToProblem(new Error(
                "HANI-GOVERNANCE-4013",
                "A second administrator must approve this request.",
                ErrorType.Forbidden));
        }

        var executionReason = string.IsNullOrWhiteSpace(request.Reason)
            ? approval.RequestedReason
            : request.Reason.Trim();

        if (approval.Type == AdminApprovalType.Refund)
        {
            var intentExists = await payments.PaymentIntents.AnyAsync(
                item =>
                    item.Id == approval.PaymentIntentId &&
                    item.OrderId == approval.EntityId &&
                    item.Status == PaymentIntentStatus.Succeeded,
                cancellationToken);
            if (!intentExists)
            {
                return await FailExecutionAsync(
                    context,
                    identity,
                    audit,
                    approval,
                    "The successful payment intent no longer exists.",
                    cancellationToken);
            }

            var result = await sender.Send(
                new RequestRefundCommand(
                    approval.EntityId,
                    approval.PaymentIntentId,
                    approval.Amount,
                    approval.Currency,
                    executionReason),
                cancellationToken);
            if (!result.IsSuccess)
            {
                return await FailExecutionAsync(
                    context,
                    identity,
                    audit,
                    approval,
                    result.Error!.Message,
                    cancellationToken);
            }
        }
        else
        {
            var payout = await settlement.Payouts
                .AsNoTracking()
                .FirstOrDefaultAsync(item => item.Id == approval.EntityId, cancellationToken);
            if (payout is null || payout.Status != PayoutStatus.Pending)
            {
                return await FailExecutionAsync(
                    context,
                    identity,
                    audit,
                    approval,
                    "The pending payout no longer exists.",
                    cancellationToken);
            }

            var result = await sender.Send(
                new MarkPayoutPaidCommand(
                    approval.EntityId,
                    approval.BankReference ?? string.Empty,
                    approval.DocumentUrl ?? string.Empty,
                    actor),
                cancellationToken);
            if (!result.IsSuccess)
            {
                return await FailExecutionAsync(
                    context,
                    identity,
                    audit,
                    approval,
                    result.Error!.Message,
                    cancellationToken);
            }
        }

        approval.Approve(actor, executionReason);
        audit.Record(
            context,
            identity,
            approval.Type == AdminApprovalType.Refund
                ? "finance.refund.approved"
                : "finance.settlement.approved",
            approval.EntityType,
            approval.EntityId.ToString(),
            executionReason,
            after: new
            {
                approval.Id,
                status = approval.Status.ToString(),
                approval.DecidedBy,
                approval.DecidedAt
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(approval, string.Empty, null));
    }

    private static async Task<IResult> RejectAsync(
        Guid id,
        AdminDecisionRequest request,
        HttpContext context,
        IdentityDbContext identity,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminAuditWriter.TryGetUserId(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-GOVERNANCE-4001",
                "An authenticated administrator is required."));
        }

        if (string.IsNullOrWhiteSpace(request.Reason))
        {
            return context.ToProblem(Error.Validation(
                "HANI-GOVERNANCE-4014",
                "A rejection reason is required."));
        }

        var approval = await identity.AdminApprovalRequests
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (approval is null)
        {
            return context.ToProblem(Error.NotFound(
                "HANI-GOVERNANCE-4011",
                "Approval request was not found."));
        }

        if (approval.Status != AdminApprovalStatus.Pending)
        {
            return context.ToProblem(Error.Conflict(
                "HANI-GOVERNANCE-4012",
                "Only pending requests can be rejected."));
        }

        if (approval.RequestedBy == actor)
        {
            audit.Record(
                context,
                identity,
                "finance.approval.denied",
                approval.EntityType,
                approval.EntityId.ToString(),
                "Self-rejection blocked by the two-person rule.");
            await identity.SaveChangesAsync(cancellationToken);
            return context.ToProblem(new Error(
                "HANI-GOVERNANCE-4013",
                "A second administrator must reject this request.",
                ErrorType.Forbidden));
        }

        approval.Reject(actor, request.Reason);
        audit.Record(
            context,
            identity,
            approval.Type == AdminApprovalType.Refund
                ? "finance.refund.rejected"
                : "finance.settlement.rejected",
            approval.EntityType,
            approval.EntityId.ToString(),
            request.Reason,
            after: new
            {
                approval.Id,
                status = approval.Status.ToString(),
                approval.DecidedBy,
                approval.DecidedAt
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(approval, string.Empty, null));
    }

    private static async Task<IResult> ListAuditAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? action,
        IdentityDbContext identity,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 25 : pageSize;
        var query = identity.AdminAuditEvents.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.Action.Contains(term) ||
                item.EntityType.Contains(term) ||
                item.EntityId.Contains(term) ||
                item.Reason.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(action))
        {
            query = query.Where(item => item.Action == action);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.OccurredAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminAuditDto(
                item.Id,
                item.OccurredAt,
                item.ActorUserId,
                item.ActorUserId == null
                    ? null
                    : identity.Users.Where(user => user.Id == item.ActorUserId)
                        .Select(user => user.Mobile)
                        .FirstOrDefault(),
                item.ActorRole,
                item.AgencyId,
                item.Action,
                item.EntityType,
                item.EntityId,
                item.BeforeJson,
                item.AfterJson,
                item.Reason,
                item.CorrelationId,
                item.IpAddress,
                item.UserAgent))
            .ToArrayAsync(cancellationToken);

        return Results.Ok(new AdminAuditPageDto(items, total, normalizedPage, normalizedPageSize));
    }

    private static async Task<IResult> FailExecutionAsync(
        HttpContext context,
        IdentityDbContext identity,
        AdminAuditWriter audit,
        AdminApprovalRequest approval,
        string reason,
        CancellationToken cancellationToken)
    {
        audit.Record(
            context,
            identity,
            approval.Type == AdminApprovalType.Refund
                ? "finance.refund.execution_failed"
                : "finance.settlement.execution_failed",
            approval.EntityType,
            approval.EntityId.ToString(),
            reason,
            after: new { approval.Id, status = approval.Status.ToString() });
        await identity.SaveChangesAsync(cancellationToken);
        return context.ToProblem(Error.Validation("HANI-GOVERNANCE-4015", reason));
    }

    private static AdminApprovalDto ToDto(
        AdminApprovalRequest approval,
        string requestedByMobile,
        string? decidedByMobile)
        => new(
            approval.Id,
            approval.Type.ToString(),
            approval.Status.ToString(),
            approval.EntityType,
            approval.EntityId,
            approval.Amount,
            approval.Currency,
            approval.PaymentIntentId,
            approval.BankReference,
            approval.DocumentUrl,
            approval.RequestedReason,
            approval.RequestedBy,
            requestedByMobile,
            approval.RequestedAt,
            approval.DecidedBy,
            decidedByMobile,
            approval.DecidedAt,
            approval.DecisionReason,
            approval.FailureReason);
}

/// <summary>Refund approval request.</summary>
public sealed record AdminRefundApprovalRequest(
    Guid OrderId,
    Guid PaymentIntentId,
    decimal Amount,
    string Currency,
    string Reason);

/// <summary>Settlement approval request with bank evidence.</summary>
public sealed record AdminSettlementApprovalRequest(
    Guid PayoutId,
    string BankReference,
    string DocumentUrl,
    string Reason);

/// <summary>Approve or reject decision.</summary>
public sealed record AdminDecisionRequest(string? Reason);

/// <summary>Admin approval row.</summary>
public sealed record AdminApprovalDto(
    Guid Id,
    string Type,
    string Status,
    string EntityType,
    Guid EntityId,
    decimal Amount,
    string Currency,
    Guid? PaymentIntentId,
    string? BankReference,
    string? DocumentUrl,
    string RequestedReason,
    Guid RequestedBy,
    string RequestedByMobile,
    DateTimeOffset RequestedAt,
    Guid? DecidedBy,
    string? DecidedByMobile,
    DateTimeOffset? DecidedAt,
    string? DecisionReason,
    string? FailureReason);

/// <summary>Immutable audit row.</summary>
public sealed record AdminAuditDto(
    Guid Id,
    DateTimeOffset OccurredAt,
    Guid? ActorUserId,
    string? ActorMobile,
    string ActorRole,
    Guid? AgencyId,
    string Action,
    string EntityType,
    string EntityId,
    string? BeforeJson,
    string? AfterJson,
    string Reason,
    string CorrelationId,
    string? IpAddress,
    string? UserAgent);

/// <summary>Paged audit response.</summary>
public sealed record AdminAuditPageDto(
    IReadOnlyList<AdminAuditDto> Items,
    int Total,
    int Page,
    int PageSize);

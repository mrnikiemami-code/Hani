using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Settlement.Application.Payouts;
using Hani.Modules.Settlement.Domain.Payouts;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminGovernanceService
{
    private static readonly JsonSerializerOptions AuditJson = new(JsonSerializerDefaults.Web);

    public async Task<IReadOnlyList<AdminApprovalDto>> ListApprovalsAsync(
        string? status,
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

        return rows;
    }

    public async Task<Result<AdminApprovalDto>> RequestRefundAsync(
        AdminRefundApprovalInput input,
        AdminActorContext actor,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(input.Reason))
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4002",
                "A refund reason is required."));
        }

        var intent = await payments.PaymentIntents
            .AsNoTracking()
            .Where(item =>
                item.Id == input.PaymentIntentId &&
                item.OrderId == input.OrderId &&
                item.Status == PaymentIntentStatus.Succeeded)
            .FirstOrDefaultAsync(cancellationToken);
        if (intent is null)
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4003",
                "A successful payment intent for this order was not found."));
        }

        if (input.Amount <= 0 || input.Amount > intent.Amount)
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4004",
                "The refund amount must be within the paid amount."));
        }

        if (!string.Equals(input.Currency, intent.Currency, StringComparison.OrdinalIgnoreCase))
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4005",
                "The refund currency must match the payment currency."));
        }

        var duplicate = await identity.AdminApprovalRequests.AnyAsync(
            item =>
                item.Type == AdminApprovalType.Refund &&
                item.Status == AdminApprovalStatus.Pending &&
                item.PaymentIntentId == input.PaymentIntentId,
            cancellationToken);
        if (duplicate)
        {
            return Result<AdminApprovalDto>.Failure(Error.Conflict(
                "HANI-GOVERNANCE-4006",
                "A pending refund request already exists for this payment."));
        }

        var approval = AdminApprovalRequest.CreateRefund(
            ids,
            input.OrderId,
            input.PaymentIntentId,
            input.Amount,
            intent.Currency,
            input.Reason,
            actor.UserId);
        identity.AdminApprovalRequests.Add(approval);
        AddAudit(
            actor,
            "finance.refund.requested",
            "Order",
            input.OrderId.ToString(),
            input.Reason,
            after: new
            {
                approvalId = approval.Id,
                approval.Amount,
                approval.Currency,
                status = approval.Status.ToString()
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Result<AdminApprovalDto>.Success(ToApprovalDto(approval));
    }

    public async Task<Result<AdminApprovalDto>> RequestSettlementAsync(
        AdminSettlementApprovalInput input,
        AdminActorContext actor,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(input.Reason))
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4007",
                "A settlement reason is required."));
        }

        var payout = await settlement.Payouts
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == input.PayoutId, cancellationToken);
        if (payout is null || payout.Status != PayoutStatus.Pending)
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4008",
                "A pending payout was not found."));
        }

        var duplicate = await identity.AdminApprovalRequests.AnyAsync(
            item =>
                item.Type == AdminApprovalType.Settlement &&
                item.Status == AdminApprovalStatus.Pending &&
                item.EntityId == input.PayoutId,
            cancellationToken);
        if (duplicate)
        {
            return Result<AdminApprovalDto>.Failure(Error.Conflict(
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
                input.BankReference,
                input.DocumentUrl,
                input.Reason,
                actor.UserId);
        }
        catch (ArgumentException exception)
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4010",
                exception.Message));
        }

        identity.AdminApprovalRequests.Add(approval);
        AddAudit(
            actor,
            "finance.settlement.requested",
            "Payout",
            payout.Id.ToString(),
            input.Reason,
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
        return Result<AdminApprovalDto>.Success(ToApprovalDto(approval));
    }

    public async Task<Result<AdminApprovalDto>> ApproveAsync(
        Guid id,
        string? reason,
        AdminActorContext actor,
        CancellationToken cancellationToken)
    {
        var approval = await identity.AdminApprovalRequests
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (approval is null)
        {
            return Result<AdminApprovalDto>.Failure(Error.NotFound(
                "HANI-GOVERNANCE-4011",
                "Approval request was not found."));
        }

        if (approval.Status != AdminApprovalStatus.Pending)
        {
            return Result<AdminApprovalDto>.Failure(Error.Conflict(
                "HANI-GOVERNANCE-4012",
                "Only pending requests can be approved."));
        }

        if (approval.RequestedBy == actor.UserId)
        {
            AddAudit(
                actor,
                "finance.approval.denied",
                approval.EntityType,
                approval.EntityId.ToString(),
                "Self-approval blocked by the two-person rule.");
            await identity.SaveChangesAsync(cancellationToken);
            return Result<AdminApprovalDto>.Failure(new Error(
                "HANI-GOVERNANCE-4013",
                "A second administrator must approve this request.",
                ErrorType.Forbidden));
        }

        var executionReason = string.IsNullOrWhiteSpace(reason)
            ? approval.RequestedReason
            : reason.Trim();

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
                    actor,
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
                    actor,
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
                    actor,
                    approval,
                    "The pending payout no longer exists.",
                    cancellationToken);
            }

            var result = await sender.Send(
                new MarkPayoutPaidCommand(
                    approval.EntityId,
                    approval.BankReference ?? string.Empty,
                    approval.DocumentUrl ?? string.Empty,
                    actor.UserId),
                cancellationToken);
            if (!result.IsSuccess)
            {
                return await FailExecutionAsync(
                    actor,
                    approval,
                    result.Error!.Message,
                    cancellationToken);
            }
        }

        approval.Approve(actor.UserId, executionReason);
        AddAudit(
            actor,
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
        return Result<AdminApprovalDto>.Success(ToApprovalDto(approval));
    }

    public async Task<Result<AdminApprovalDto>> RejectAsync(
        Guid id,
        string? reason,
        AdminActorContext actor,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(reason))
        {
            return Result<AdminApprovalDto>.Failure(Error.Validation(
                "HANI-GOVERNANCE-4014",
                "A rejection reason is required."));
        }

        var approval = await identity.AdminApprovalRequests
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (approval is null)
        {
            return Result<AdminApprovalDto>.Failure(Error.NotFound(
                "HANI-GOVERNANCE-4011",
                "Approval request was not found."));
        }

        if (approval.Status != AdminApprovalStatus.Pending)
        {
            return Result<AdminApprovalDto>.Failure(Error.Conflict(
                "HANI-GOVERNANCE-4012",
                "Only pending requests can be rejected."));
        }

        if (approval.RequestedBy == actor.UserId)
        {
            AddAudit(
                actor,
                "finance.approval.denied",
                approval.EntityType,
                approval.EntityId.ToString(),
                "Self-rejection blocked by the two-person rule.");
            await identity.SaveChangesAsync(cancellationToken);
            return Result<AdminApprovalDto>.Failure(new Error(
                "HANI-GOVERNANCE-4013",
                "A second administrator must reject this request.",
                ErrorType.Forbidden));
        }

        approval.Reject(actor.UserId, reason);
        AddAudit(
            actor,
            approval.Type == AdminApprovalType.Refund
                ? "finance.refund.rejected"
                : "finance.settlement.rejected",
            approval.EntityType,
            approval.EntityId.ToString(),
            reason,
            after: new
            {
                approval.Id,
                status = approval.Status.ToString(),
                approval.DecidedBy,
                approval.DecidedAt
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Result<AdminApprovalDto>.Success(ToApprovalDto(approval));
    }

    public async Task<AdminAuditPageDto> ListAuditAsync(
        int page,
        int pageSize,
        string? q,
        string? action,
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

        return new AdminAuditPageDto(items, total, normalizedPage, normalizedPageSize);
    }

    private async Task<Result<AdminApprovalDto>> FailExecutionAsync(
        AdminActorContext actor,
        AdminApprovalRequest approval,
        string reason,
        CancellationToken cancellationToken)
    {
        AddAudit(
            actor,
            approval.Type == AdminApprovalType.Refund
                ? "finance.refund.execution_failed"
                : "finance.settlement.execution_failed",
            approval.EntityType,
            approval.EntityId.ToString(),
            reason,
            after: new { approval.Id, status = approval.Status.ToString() });
        await identity.SaveChangesAsync(cancellationToken);
        return Result<AdminApprovalDto>.Failure(Error.Validation(
            "HANI-GOVERNANCE-4015",
            reason));
    }

    private void AddAudit(
        AdminActorContext actor,
        string action,
        string entityType,
        string entityId,
        string reason,
        Guid? agencyId = null,
        object? before = null,
        object? after = null)
    {
        identity.AdminAuditEvents.Add(AdminAuditEvent.Create(
            ids,
            actor.UserId,
            actor.Role,
            agencyId,
            action,
            entityType,
            entityId,
            reason,
            actor.CorrelationId,
            before is null ? null : JsonSerializer.Serialize(before, AuditJson),
            after is null ? null : JsonSerializer.Serialize(after, AuditJson),
            actor.IpAddress,
            actor.UserAgent));
    }

    private static AdminApprovalDto ToApprovalDto(AdminApprovalRequest approval)
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
            string.Empty,
            approval.RequestedAt,
            approval.DecidedBy,
            null,
            approval.DecidedAt,
            approval.DecisionReason,
            approval.FailureReason);
}

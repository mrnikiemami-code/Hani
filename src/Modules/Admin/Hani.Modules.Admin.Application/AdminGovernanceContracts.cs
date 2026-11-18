using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Admin.Application;

/// <summary>Authenticated admin actor metadata for audit.</summary>
public sealed record AdminActorContext(
    Guid UserId,
    string Role,
    string CorrelationId,
    string? IpAddress,
    string? UserAgent);

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

/// <summary>Refund approval input.</summary>
public sealed record AdminRefundApprovalInput(
    Guid OrderId,
    Guid PaymentIntentId,
    decimal Amount,
    string Currency,
    string Reason);

/// <summary>Settlement approval input.</summary>
public sealed record AdminSettlementApprovalInput(
    Guid PayoutId,
    string BankReference,
    string DocumentUrl,
    string Reason);

/// <summary>Append-only admin audit writer.</summary>
public interface IAdminAuditWriter
{
    /// <summary>Records and persists one audit event.</summary>
    Task RecordAsync(
        AdminActorContext actor,
        string action,
        string entityType,
        string entityId,
        string reason,
        Guid? agencyId = null,
        object? before = null,
        object? after = null,
        CancellationToken cancellationToken = default);
}

/// <summary>Admin governance service.</summary>
public interface IAdminGovernanceService
{
    Task<IReadOnlyList<AdminApprovalDto>> ListApprovalsAsync(
        string? status,
        CancellationToken cancellationToken);
    Task<Result<AdminApprovalDto>> RequestRefundAsync(
        AdminRefundApprovalInput input,
        AdminActorContext actor,
        CancellationToken cancellationToken);
    Task<Result<AdminApprovalDto>> RequestSettlementAsync(
        AdminSettlementApprovalInput input,
        AdminActorContext actor,
        CancellationToken cancellationToken);
    Task<Result<AdminApprovalDto>> ApproveAsync(
        Guid id,
        string? reason,
        AdminActorContext actor,
        CancellationToken cancellationToken);
    Task<Result<AdminApprovalDto>> RejectAsync(
        Guid id,
        string? reason,
        AdminActorContext actor,
        CancellationToken cancellationToken);
    Task<AdminAuditPageDto> ListAuditAsync(
        int page,
        int pageSize,
        string? q,
        string? action,
        CancellationToken cancellationToken);
}

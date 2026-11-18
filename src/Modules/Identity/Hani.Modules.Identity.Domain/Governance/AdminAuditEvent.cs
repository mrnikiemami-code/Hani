using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Governance;

/// <summary>
/// Immutable record of a sensitive administrative action. Audit rows are
/// append-only and must never be updated or deleted by normal administrators.
/// </summary>
public sealed class AdminAuditEvent : AggregateRoot<Guid>
{
    private AdminAuditEvent()
    {
    }

    private AdminAuditEvent(
        Guid id,
        DateTimeOffset occurredAt,
        Guid? actorUserId,
        string actorRole,
        Guid? agencyId,
        string action,
        string entityType,
        string entityId,
        string? beforeJson,
        string? afterJson,
        string reason,
        string correlationId,
        string? ipAddress,
        string? userAgent) : base(id)
    {
        OccurredAt = occurredAt;
        ActorUserId = actorUserId;
        ActorRole = actorRole;
        AgencyId = agencyId;
        Action = action;
        EntityType = entityType;
        EntityId = entityId;
        BeforeJson = beforeJson;
        AfterJson = afterJson;
        Reason = reason;
        CorrelationId = correlationId;
        IpAddress = ipAddress;
        UserAgent = userAgent;
    }

    /// <summary>Time the action occurred.</summary>
    public DateTimeOffset OccurredAt { get; private set; }

    /// <summary>Authenticated administrator, when available.</summary>
    public Guid? ActorUserId { get; private set; }

    /// <summary>Role snapshot at the time of the action.</summary>
    public string ActorRole { get; private set; } = string.Empty;

    /// <summary>Agency affected by the action, when relevant.</summary>
    public Guid? AgencyId { get; private set; }

    /// <summary>Stable action key such as <c>finance.refund.approved</c>.</summary>
    public string Action { get; private set; } = string.Empty;

    /// <summary>Affected entity type such as <c>Order</c> or <c>Payout</c>.</summary>
    public string EntityType { get; private set; } = string.Empty;

    /// <summary>Affected entity identifier.</summary>
    public string EntityId { get; private set; } = string.Empty;

    /// <summary>JSON snapshot before the change, when applicable.</summary>
    public string? BeforeJson { get; private set; }

    /// <summary>JSON snapshot after the change, when applicable.</summary>
    public string? AfterJson { get; private set; }

    /// <summary>Operator-supplied reason or system reason.</summary>
    public string Reason { get; private set; } = string.Empty;

    /// <summary>Request correlation identifier.</summary>
    public string CorrelationId { get; private set; } = string.Empty;

    /// <summary>Client IP address, when available.</summary>
    public string? IpAddress { get; private set; }

    /// <summary>Client user agent, when available.</summary>
    public string? UserAgent { get; private set; }

    /// <summary>
    /// Creates an immutable audit event. The caller must persist it without
    /// later mutation.
    /// </summary>
    public static AdminAuditEvent Create(
        IIdGenerator ids,
        Guid? actorUserId,
        string actorRole,
        Guid? agencyId,
        string action,
        string entityType,
        string entityId,
        string reason,
        string correlationId,
        string? beforeJson = null,
        string? afterJson = null,
        string? ipAddress = null,
        string? userAgent = null,
        DateTimeOffset? occurredAt = null)
    {
        if (string.IsNullOrWhiteSpace(action) ||
            string.IsNullOrWhiteSpace(entityType) ||
            string.IsNullOrWhiteSpace(entityId) ||
            string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Audit action, entity, and reason are required.");
        }

        return new AdminAuditEvent(
            ids.NewId(),
            occurredAt ?? DateTimeOffset.UtcNow,
            actorUserId,
            actorRole.Trim(),
            agencyId,
            action.Trim(),
            entityType.Trim(),
            entityId.Trim(),
            beforeJson,
            afterJson,
            reason.Trim(),
            correlationId,
            ipAddress,
            userAgent);
    }
}

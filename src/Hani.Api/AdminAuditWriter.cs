using System.Security.Claims;
using System.Text.Json;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Identity.Infrastructure.Persistence;

namespace Hani.Api;

/// <summary>
/// Append-only admin audit writer for the current HTTP actor.
/// </summary>
public sealed class AdminAuditWriter(IIdGenerator ids, IdentityDbContext identity)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    /// <summary>
    /// Records and persists an audit event. The endpoint only supplies HTTP
    /// actor data and the audited change.
    /// </summary>
    public async Task RecordAsync(
        HttpContext context,
        string action,
        string entityType,
        string entityId,
        string reason,
        Guid? agencyId = null,
        object? before = null,
        object? after = null,
        CancellationToken cancellationToken = default)
    {
        Record(context, identity, action, entityType, entityId, reason, agencyId, before, after);
        await identity.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Adds an audit event to the identity context. The caller must call
    /// <c>SaveChangesAsync</c> on the same context.
    /// </summary>
    public AdminAuditEvent Record(
        HttpContext context,
        IdentityDbContext identity,
        string action,
        string entityType,
        string entityId,
        string reason,
        Guid? agencyId = null,
        object? before = null,
        object? after = null)
    {
        TryGetUserId(context, out var actorUserId);
        var actorRole = context.User.FindFirst(ClaimTypes.Role)?.Value ?? "Admin";
        var audit = AdminAuditEvent.Create(
            ids,
            actorUserId == Guid.Empty ? null : actorUserId,
            actorRole,
            agencyId,
            action,
            entityType,
            entityId,
            reason,
            context.TraceIdentifier,
            before is null ? null : JsonSerializer.Serialize(before, JsonOptions),
            after is null ? null : JsonSerializer.Serialize(after, JsonOptions),
            context.Connection.RemoteIpAddress?.ToString(),
            context.Request.Headers.UserAgent.ToString());
        identity.AdminAuditEvents.Add(audit);
        return audit;
    }

    /// <summary>Returns the authenticated administrator identifier.</summary>
    public static bool TryGetUserId(HttpContext context, out Guid userId)
    {
        var value = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? context.User.FindFirst("sub")?.Value;
        return Guid.TryParse(value, out userId);
    }
}

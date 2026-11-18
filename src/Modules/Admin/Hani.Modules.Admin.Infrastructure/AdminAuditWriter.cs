using System.Text.Json;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Identity.Infrastructure.Persistence;

namespace Hani.Modules.Admin.Infrastructure;

/// <summary>Append-only admin audit writer implementation.</summary>
internal sealed class AdminAuditWriter(
    IdentityDbContext identity,
    IIdGenerator ids) : IAdminAuditWriter
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public async Task RecordAsync(
        AdminActorContext actor,
        string action,
        string entityType,
        string entityId,
        string reason,
        Guid? agencyId = null,
        object? before = null,
        object? after = null,
        CancellationToken cancellationToken = default)
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
            before is null ? null : JsonSerializer.Serialize(before, JsonOptions),
            after is null ? null : JsonSerializer.Serialize(after, JsonOptions),
            actor.IpAddress,
            actor.UserAgent));
        await identity.SaveChangesAsync(cancellationToken);
    }
}

using Hani.Modules.Admin.Application;

namespace Hani.Api;

/// <summary>HTTP adapter for the admin audit writer.</summary>
public static class AdminAuditWriterExtensions
{
    /// <summary>Records an audit event using the current HTTP actor.</summary>
    public static Task RecordAsync(
        this IAdminAuditWriter writer,
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
        if (!AdminActorContextFactory.TryCreate(context, out var actor))
        {
            throw new UnauthorizedAccessException("An authenticated administrator is required.");
        }

        return writer.RecordAsync(
            actor,
            action,
            entityType,
            entityId,
            reason,
            agencyId,
            before,
            after,
            cancellationToken);
    }
}

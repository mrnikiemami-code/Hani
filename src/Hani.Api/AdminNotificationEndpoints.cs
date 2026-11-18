using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Admin operational view of the notification outbox and safe manual retries.
/// </summary>
public static class AdminNotificationEndpoints
{
    /// <summary>Maps admin notification endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminNotificationEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/notifications", ListAsync)
            .WithTags("Internal.Admin.Notifications")
            .WithName("Internal.ListAdminNotifications")
            .RequireAuthorization("Admin")
            .Produces<AdminNotificationPageDto>();

        app.MapPost("/internal/v1/admin/notifications/{id:guid}/retry", RetryAsync)
            .WithTags("Internal.Admin.Notifications")
            .WithName("Internal.RetryAdminNotification")
            .RequireAuthorization("Admin")
            .Produces<bool>();
        return app;
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? status,
        [FromQuery] string? channel,
        [FromQuery] string? q,
        ContentDbContext content,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 25 : pageSize;
        var query = content.Notifications.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<NotificationStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        if (!string.IsNullOrWhiteSpace(channel) &&
            Enum.TryParse<ContactChannel>(channel, true, out var parsedChannel))
        {
            query = query.Where(item => item.Channel == parsedChannel);
        }

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.TemplateKey.Contains(term) ||
                item.Payload.Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminNotificationDto(
                item.Id,
                item.UserId,
                item.Channel.ToString(),
                item.TemplateKey,
                item.Payload,
                item.Status.ToString(),
                item.CreatedAt,
                item.SentAt,
                item.AttemptCount,
                item.LastError,
                item.NextAttemptAt))
            .ToArrayAsync(cancellationToken);

        return Results.Ok(new AdminNotificationPageDto(
            items,
            normalizedPage,
            normalizedPageSize,
            total));
    }

    private static async Task<IResult> RetryAsync(
        Guid id,
        HttpContext context,
        ContentDbContext content,
        IdentityDbContext identity,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var notification = await content.Notifications
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (notification is null)
        {
            return context.ToProblem(Error.NotFound(
                "HANI-NOTIFICATION-4001",
                "Notification was not found."));
        }

        if (notification.Status != NotificationStatus.Failed)
        {
            return context.ToProblem(Error.Conflict(
                "HANI-NOTIFICATION-4002",
                "Only failed notifications can be retried."));
        }

        notification.Retry();
        await content.SaveChangesAsync(cancellationToken);
        audit.Record(
            context,
            identity,
            "operations.notification.retried",
            "Notification",
            id.ToString(),
            "Failed notification requeued from the admin panel",
            after: new { status = notification.Status.ToString(), notification.NextAttemptAt });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Ok(true);
    }
}

/// <summary>Admin notification outbox row.</summary>
public sealed record AdminNotificationDto(
    Guid Id,
    Guid? UserId,
    string Channel,
    string TemplateKey,
    string Payload,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? SentAt,
    int AttemptCount,
    string? LastError,
    DateTimeOffset? NextAttemptAt);

/// <summary>Paged notification outbox response.</summary>
public sealed record AdminNotificationPageDto(
    IReadOnlyList<AdminNotificationDto> Items,
    int Page,
    int PageSize,
    int Total);

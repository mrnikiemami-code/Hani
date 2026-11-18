using Hani.Modules.Admin.Application;
using Microsoft.AspNetCore.Mvc;

namespace Hani.Api;

/// <summary>Admin notification outbox endpoints.</summary>
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
        IAdminNotificationService notifications,
        CancellationToken cancellationToken)
        => Results.Ok(await notifications.ListAsync(
            page,
            pageSize,
            status,
            channel,
            q,
            cancellationToken));

    private static async Task<IResult> RetryAsync(
        Guid id,
        HttpContext context,
        IAdminNotificationService notifications,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var retried = await notifications.RetryAsync(id, cancellationToken);
        if (!retried)
        {
            return Results.NotFound();
        }

        await audit.RecordAsync(
            context,
            "operations.notification.retried",
            "Notification",
            id.ToString(),
            "Failed notification requeued from the admin panel",
            after: new { status = "Pending" },
            cancellationToken: cancellationToken);
        return Results.Ok(true);
    }
}

using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Application.Support;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Support intake and admin ticket endpoints.</summary>
public static class AdminSupportEndpoints
{
    /// <summary>Maps support endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminSupportEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/market/v1/support/tickets", CreatePublicAsync)
            .WithTags("Marketplace.Support")
            .WithName("Marketplace.CreateSupportTicket")
            .Produces<SupportTicketCreatedDto>(StatusCodes.Status201Created);

        app.MapGet("/internal/v1/admin/support/tickets", ListAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.ListAdminSupportTickets")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportTicketPageDto>();

        app.MapGet("/internal/v1/admin/support/tickets/{id:guid}", GetAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.GetAdminSupportTicket")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportTicketDetailDto>();

        app.MapPost("/internal/v1/admin/support/tickets", CreateAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.CreateAdminSupportTicket")
            .RequireAuthorization("Admin")
            .Produces<SupportTicketCreatedDto>(StatusCodes.Status201Created);

        app.MapPost("/internal/v1/admin/support/tickets/{id:guid}/messages", ReplyAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.ReplyAdminSupportTicket")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportTicketDetailDto>();

        app.MapPost("/internal/v1/admin/support/tickets/{id:guid}/attachments", UploadAttachmentAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.UploadAdminSupportAttachment")
            .RequireAuthorization("Admin")
            .DisableAntiforgery()
            .Produces<SupportAttachmentDto>(StatusCodes.Status201Created);

        app.MapGet("/internal/v1/admin/support/attachments/{id:guid}", DownloadAttachmentAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.DownloadAdminSupportAttachment")
            .RequireAuthorization("Admin");

        app.MapPost("/internal/v1/admin/support/tickets/{id:guid}/update", UpdateAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.UpdateAdminSupportTicket")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportTicketDetailDto>();

        app.MapGet("/internal/v1/admin/support/disputes", ListDisputesAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.ListAdminSupportDisputes")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportDisputePageDto>();

        app.MapPost("/internal/v1/admin/support/tickets/{id:guid}/disputes", CreateDisputeAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.CreateAdminSupportDispute")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportDisputeDto>(StatusCodes.Status201Created);

        app.MapPost("/internal/v1/admin/support/disputes/{id:guid}/status", UpdateDisputeStatusAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.UpdateAdminSupportDisputeStatus")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportDisputeDto>();

        app.MapGet("/internal/v1/admin/support/report", GetReportAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.GetAdminSupportReport")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportReportDto>();
        return app;
    }

    private static async Task<IResult> CreatePublicAsync(
        PublicSupportTicketRequest request,
        HttpContext context,
        IAdminSupportService support,
        CancellationToken cancellationToken)
    {
        var actorValue = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst("sub")?.Value;
        var userId = Guid.TryParse(actorValue, out var parsed) ? parsed : (Guid?)null;
        try
        {
            var created = await support.CreateAsync(
                new AdminSupportTicketInput(
                    userId,
                    request.ContactName,
                    request.ContactEmail,
                    request.ContactPhone,
                    request.Subject,
                    request.Category,
                    request.Message,
                    "Normal"),
                cancellationToken);
            return Results.Created(
                $"/market/v1/support/tickets/{created.Id}",
                created);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-SUPPORT-4001", exception.Message));
        }
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? status,
        [FromQuery] string? priority,
        IAdminSupportService support,
        CancellationToken cancellationToken)
        => Results.Ok(await support.ListTicketsAsync(
            page,
            pageSize,
            q,
            status,
            priority,
            cancellationToken));

    private static async Task<IResult> GetAsync(
        Guid id,
        IAdminSupportService support,
        CancellationToken cancellationToken)
    {
        var ticket = await support.GetTicketAsync(id, cancellationToken);
        return ticket is null ? Results.NotFound() : Results.Ok(ticket);
    }

    private static async Task<IResult> CreateAsync(
        AdminCreateSupportTicketRequest request,
        HttpContext context,
        IAdminSupportService support,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        try
        {
            var created = await support.CreateAsync(
                new AdminSupportTicketInput(
                    request.UserId,
                    request.ContactName,
                    request.ContactEmail,
                    request.ContactPhone,
                    request.Subject,
                    request.Category,
                    request.Message,
                    request.Priority),
                cancellationToken);
            await audit.RecordAsync(
                context,
                "support.ticket.created",
                "SupportTicket",
                created.Id.ToString(),
                "Support ticket created from the admin panel",
                after: new
                {
                    created.TicketNumber,
                    request.Subject,
                    status = "Open"
                },
                cancellationToken: cancellationToken);
            return Results.Created(
                $"/internal/v1/admin/support/tickets/{created.Id}",
                created);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-SUPPORT-4001", exception.Message));
        }
    }

    private static async Task<IResult> ReplyAsync(
        Guid id,
        AdminSupportReplyRequest request,
        HttpContext context,
        IAdminSupportService support,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminActorContextFactory.TryCreate(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SUPPORT-4003",
                "An authenticated administrator is required."));
        }

        if (string.IsNullOrWhiteSpace(request.Body))
        {
            return context.ToProblem(Error.Validation(
                "HANI-SUPPORT-4004",
                "A support message body is required."));
        }

        var ticket = await support.ReplyAsync(
            id,
            actor.UserId,
            request.Body,
            request.IsInternal,
            request.AttachmentIds,
            cancellationToken);
        if (ticket is null)
        {
            return Results.NotFound();
        }

        await audit.RecordAsync(
            context,
            request.IsInternal ? "support.ticket.note_added" : "support.ticket.replied",
            "SupportTicket",
            id.ToString(),
            "Support message added from the admin panel",
            after: new { ticket.Status, request.IsInternal, ticket.LastMessageAt },
            cancellationToken: cancellationToken);
        return Results.Ok(ticket);
    }

    private static async Task<IResult> ListDisputesAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? status,
        [FromQuery] string? type,
        [FromQuery] Guid? ticketId,
        IAdminSupportService support,
        CancellationToken cancellationToken)
        => Results.Ok(await support.ListDisputesAsync(
            page,
            pageSize,
            status,
            type,
            ticketId,
            cancellationToken));

    private static async Task<IResult> CreateDisputeAsync(
        Guid id,
        AdminSupportDisputeRequest request,
        HttpContext context,
        IAdminSupportService support,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminActorContextFactory.TryCreate(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SUPPORT-4203",
                "An authenticated administrator is required."));
        }

        var result = await support.CreateDisputeAsync(
            id,
            new AdminSupportDisputeInput(
                request.OrderId,
                request.Type,
                request.Amount,
                request.Currency,
                request.Description,
                request.EvidenceUrl),
            actor.UserId,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "support.dispute.opened",
            "SupportDispute",
            result.Value!.Id.ToString(),
            "Support dispute opened from the admin panel",
            after: result.Value,
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/support/disputes/{result.Value.Id}",
            result.Value);
    }

    private static async Task<IResult> UpdateDisputeStatusAsync(
        Guid id,
        AdminSupportDisputeStatusRequest request,
        HttpContext context,
        IAdminSupportService support,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminActorContextFactory.TryCreate(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SUPPORT-4203",
                "An authenticated administrator is required."));
        }

        var result = await support.UpdateDisputeStatusAsync(
            id,
            new AdminSupportDisputeStatusInput(request.Status, request.Resolution),
            actor.UserId,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "support.dispute.status_changed",
            "SupportDispute",
            id.ToString(),
            "Support dispute status changed from the admin panel",
            after: new { request.Status, request.Resolution },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> GetReportAsync(
        [FromQuery] int days,
        IAdminSupportService support,
        CancellationToken cancellationToken)
        => Results.Ok(await support.GetReportAsync(days, cancellationToken));

    private static async Task<IResult> UploadAttachmentAsync(
        Guid id,
        IFormFile file,
        HttpContext context,
        IAdminSupportService support,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminActorContextFactory.TryCreate(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SUPPORT-4003",
                "An authenticated administrator is required."));
        }

        await using var stream = file.OpenReadStream();
        var result = await support.UploadAttachmentAsync(
            id,
            actor.UserId,
            file.FileName,
            file.ContentType,
            file.Length,
            stream,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "support.attachment.uploaded",
            "SupportAttachment",
            result.Value!.Id.ToString(),
            "Support attachment uploaded from the admin panel",
            after: new { result.Value.FileName, result.Value.SizeBytes },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/support/attachments/{result.Value.Id}",
            result.Value);
    }

    private static async Task<IResult> DownloadAttachmentAsync(
        Guid id,
        HttpContext context,
        IAdminSupportService support,
        CancellationToken cancellationToken)
    {
        var attachment = await support.DownloadAttachmentAsync(
            id,
            cancellationToken);
        return attachment is null
            ? context.ToProblem(Error.NotFound(
                "HANI-SUPPORT-4311",
                "Support attachment was not found."))
            : Results.File(
                attachment.Content,
                attachment.ContentType,
                attachment.FileName,
                enableRangeProcessing: true);
    }

    private static async Task<IResult> UpdateAsync(
        Guid id,
        AdminSupportUpdateRequest request,
        HttpContext context,
        IAdminSupportService support,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        try
        {
            var ticket = await support.UpdateAsync(
                id,
                request.Status,
                request.Priority,
                request.AssignedTo,
                cancellationToken);
            if (ticket is null)
            {
                return Results.NotFound();
            }

            await audit.RecordAsync(
                context,
                "support.ticket.updated",
                "SupportTicket",
                id.ToString(),
                "Support ticket state changed from the admin panel",
                after: new { ticket.Status, ticket.Priority, ticket.AssignedTo },
                cancellationToken: cancellationToken);
            return Results.Ok(ticket);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-SUPPORT-4005", exception.Message));
        }
    }
}

/// <summary>Public support ticket request.</summary>
public sealed record PublicSupportTicketRequest(
    string ContactName,
    string ContactEmail,
    string? ContactPhone,
    string Subject,
    string Category,
    string Message);

/// <summary>Admin support ticket request.</summary>
public sealed record AdminCreateSupportTicketRequest(
    Guid? UserId,
    string ContactName,
    string ContactEmail,
    string? ContactPhone,
    string Subject,
    string Category,
    string Message,
    string Priority = "Normal");

/// <summary>Admin support reply request.</summary>
public sealed record AdminSupportReplyRequest(
    string Body,
    bool IsInternal = false,
    IReadOnlyList<Guid>? AttachmentIds = null);

/// <summary>Admin support update request.</summary>
public sealed record AdminSupportUpdateRequest(
    string Status,
    string Priority,
    Guid? AssignedTo);

/// <summary>Admin support dispute request.</summary>
public sealed record AdminSupportDisputeRequest(
    Guid? OrderId,
    string Type,
    decimal? Amount,
    string? Currency,
    string Description,
    string? EvidenceUrl);

/// <summary>Admin support dispute status request.</summary>
public sealed record AdminSupportDisputeStatusRequest(
    string Status,
    string? Resolution);

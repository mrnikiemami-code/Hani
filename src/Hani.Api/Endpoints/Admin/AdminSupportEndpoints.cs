using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
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

        app.MapPost("/internal/v1/admin/support/tickets/{id:guid}/update", UpdateAsync)
            .WithTags("Internal.Admin.Support")
            .WithName("Internal.UpdateAdminSupportTicket")
            .RequireAuthorization("Admin")
            .Produces<AdminSupportTicketDetailDto>();
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
public sealed record AdminSupportReplyRequest(string Body, bool IsInternal = false);

/// <summary>Admin support update request.</summary>
public sealed record AdminSupportUpdateRequest(
    string Status,
    string Priority,
    Guid? AssignedTo);

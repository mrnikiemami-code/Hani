using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Domain.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Customer support intake and the admin ticket workspace. Customer messages
/// and internal notes live in one append-only thread.
/// </summary>
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
        ContentDbContext content,
        IIdGenerator ids,
        CancellationToken cancellationToken)
    {
        var actorValue = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst("sub")?.Value;
        var userId = Guid.TryParse(actorValue, out var parsed) ? parsed : (Guid?)null;
        SupportTicket ticket;
        try
        {
            ticket = SupportTicket.Create(
                ids,
                userId,
                request.ContactName,
                request.ContactEmail,
                request.ContactPhone,
                request.Subject,
                request.Category,
                request.Message);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-SUPPORT-4001", exception.Message));
        }

        content.SupportTickets.Add(ticket);
        await content.SaveChangesAsync(cancellationToken);
        return Results.Created(
            $"/market/v1/support/tickets/{ticket.Id}",
            new SupportTicketCreatedDto(ticket.Id, ticket.TicketNumber));
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? status,
        [FromQuery] string? priority,
        ContentDbContext content,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = content.SupportTickets.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.TicketNumber.Contains(term) ||
                item.Subject.Contains(term) ||
                item.ContactEmail.Contains(term) ||
                item.ContactName.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<SupportTicketStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        if (!string.IsNullOrWhiteSpace(priority) &&
            Enum.TryParse<SupportTicketPriority>(priority, true, out var parsedPriority))
        {
            query = query.Where(item => item.Priority == parsedPriority);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.LastMessageAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminSupportTicketRowDto(
                item.Id,
                item.TicketNumber,
                item.Subject,
                item.ContactName,
                item.ContactEmail,
                item.Category,
                item.Priority.ToString(),
                item.Status.ToString(),
                item.AssignedTo,
                item.Messages.Count,
                item.CreatedAt,
                item.LastMessageAt))
            .ToArrayAsync(cancellationToken);

        return Results.Ok(new AdminSupportTicketPageDto(
            items,
            normalizedPage,
            normalizedPageSize,
            total));
    }

    private static async Task<IResult> GetAsync(
        Guid id,
        HttpContext context,
        ContentDbContext content,
        CancellationToken cancellationToken)
    {
        var ticket = await content.SupportTickets
            .AsNoTracking()
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        return ticket is null
            ? context.ToProblem(Error.NotFound("HANI-SUPPORT-4002", "Support ticket was not found."))
            : Results.Ok(ToDetail(ticket));
    }

    private static async Task<IResult> CreateAsync(
        AdminCreateSupportTicketRequest request,
        HttpContext context,
        ContentDbContext content,
        IdentityDbContext identity,
        IIdGenerator ids,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        SupportTicket ticket;
        try
        {
            ticket = SupportTicket.Create(
                ids,
                request.UserId,
                request.ContactName,
                request.ContactEmail,
                request.ContactPhone,
                request.Subject,
                request.Category,
                request.Message,
                request.Priority);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-SUPPORT-4001", exception.Message));
        }

        content.SupportTickets.Add(ticket);
        await content.SaveChangesAsync(cancellationToken);
        audit.Record(
            context,
            identity,
            "support.ticket.created",
            "SupportTicket",
            ticket.Id.ToString(),
            "Support ticket created from the admin panel",
            after: new { ticket.TicketNumber, ticket.Subject, status = ticket.Status.ToString() });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/support/tickets/{ticket.Id}",
            new SupportTicketCreatedDto(ticket.Id, ticket.TicketNumber));
    }

    private static async Task<IResult> ReplyAsync(
        Guid id,
        AdminSupportReplyRequest request,
        HttpContext context,
        ContentDbContext content,
        IdentityDbContext identity,
        IIdGenerator ids,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminAuditWriter.TryGetUserId(context, out var actor))
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

        var ticket = await content.SupportTickets
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (ticket is null)
        {
            return context.ToProblem(Error.NotFound(
                "HANI-SUPPORT-4002",
                "Support ticket was not found."));
        }

        ticket.AddMessage(
            ids,
            SupportAuthorType.Admin,
            actor,
            request.Body,
            request.IsInternal);
        await content.SaveChangesAsync(cancellationToken);
        audit.Record(
            context,
            identity,
            request.IsInternal ? "support.ticket.note_added" : "support.ticket.replied",
            "SupportTicket",
            id.ToString(),
            "Support message added from the admin panel",
            after: new
            {
                ticket.Status,
                isInternal = request.IsInternal,
                ticket.LastMessageAt
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDetail(ticket));
    }

    private static async Task<IResult> UpdateAsync(
        Guid id,
        AdminSupportUpdateRequest request,
        HttpContext context,
        ContentDbContext content,
        IdentityDbContext identity,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var ticket = await content.SupportTickets
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (ticket is null)
        {
            return context.ToProblem(Error.NotFound(
                "HANI-SUPPORT-4002",
                "Support ticket was not found."));
        }

        var before = new
        {
            status = ticket.Status.ToString(),
            priority = ticket.Priority.ToString(),
            ticket.AssignedTo
        };
        ticket.SetStatus(request.Status);
        ticket.SetPriority(request.Priority);
        ticket.Assign(request.AssignedTo);

        await content.SaveChangesAsync(cancellationToken);
        audit.Record(
            context,
            identity,
            "support.ticket.updated",
            "SupportTicket",
            id.ToString(),
            "Support ticket state changed from the admin panel",
            before: before,
            after: new
            {
                status = ticket.Status.ToString(),
                priority = ticket.Priority.ToString(),
                ticket.AssignedTo
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDetail(ticket));
    }

    private static AdminSupportTicketDetailDto ToDetail(SupportTicket ticket)
        => new(
            ticket.Id,
            ticket.TicketNumber,
            ticket.Subject,
            ticket.ContactName,
            ticket.ContactEmail,
            ticket.ContactPhone,
            ticket.Category,
            ticket.Priority.ToString(),
            ticket.Status.ToString(),
            ticket.AssignedTo,
            ticket.CreatedAt,
            ticket.UpdatedAt,
            ticket.LastMessageAt,
            ticket.Messages
                .OrderBy(message => message.CreatedAt)
                .Select(message => new AdminSupportMessageDto(
                    message.Id,
                    message.AuthorType.ToString(),
                    message.AuthorUserId,
                    message.Body,
                    message.IsInternal,
                    message.CreatedAt))
                .ToArray());
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
    SupportTicketPriority Priority = SupportTicketPriority.Normal);

/// <summary>Admin message on a support ticket.</summary>
public sealed record AdminSupportReplyRequest(string Body, bool IsInternal = false);

/// <summary>Admin ticket state update.</summary>
public sealed record AdminSupportUpdateRequest(
    SupportTicketStatus Status,
    SupportTicketPriority Priority,
    Guid? AssignedTo);

/// <summary>Created ticket identity.</summary>
public sealed record SupportTicketCreatedDto(Guid Id, string TicketNumber);

/// <summary>Admin support ticket list row.</summary>
public sealed record AdminSupportTicketRowDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    string ContactName,
    string ContactEmail,
    string Category,
    string Priority,
    string Status,
    Guid? AssignedTo,
    int MessageCount,
    DateTimeOffset CreatedAt,
    DateTimeOffset LastMessageAt);

/// <summary>Paged support ticket response.</summary>
public sealed record AdminSupportTicketPageDto(
    IReadOnlyList<AdminSupportTicketRowDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Support ticket detail with thread.</summary>
public sealed record AdminSupportTicketDetailDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    string ContactName,
    string ContactEmail,
    string? ContactPhone,
    string Category,
    string Priority,
    string Status,
    Guid? AssignedTo,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    DateTimeOffset LastMessageAt,
    IReadOnlyList<AdminSupportMessageDto> Messages);

/// <summary>Support thread message.</summary>
public sealed record AdminSupportMessageDto(
    Guid Id,
    string AuthorType,
    Guid? AuthorUserId,
    string Body,
    bool IsInternal,
    DateTimeOffset CreatedAt);

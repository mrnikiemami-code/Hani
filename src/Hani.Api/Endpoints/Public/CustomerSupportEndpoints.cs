using System.Security.Claims;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.Support;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Authenticated customer support ticket and dispute endpoints.</summary>
public static class CustomerSupportEndpoints
{
    /// <summary>Maps customer-owned support routes under /market/v1/support.</summary>
    public static IEndpointRouteBuilder MapCustomerSupportEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/market/v1/support")
            .WithTags("Marketplace.Support")
            .RequireAuthorization("User");

        group.MapGet("/tickets", ListTicketsAsync)
            .WithName("Marketplace.ListMySupportTickets")
            .Produces<CustomerSupportTicketPageDto>();

        group.MapGet("/tickets/{id:guid}", GetTicketAsync)
            .WithName("Marketplace.GetMySupportTicket")
            .Produces<CustomerSupportTicketDetailDto>();

        group.MapPost("/tickets/{id:guid}/messages", ReplyAsync)
            .WithName("Marketplace.ReplyMySupportTicket")
            .Produces<CustomerSupportTicketDetailDto>();

        group.MapGet("/disputes", ListDisputesAsync)
            .WithName("Marketplace.ListMySupportDisputes")
            .Produces<CustomerSupportDisputePageDto>();

        group.MapGet("/disputes/{id:guid}", GetDisputeAsync)
            .WithName("Marketplace.GetMySupportDispute")
            .Produces<CustomerSupportDisputeDto>();

        group.MapPost("/tickets/{id:guid}/disputes", CreateDisputeAsync)
            .WithName("Marketplace.CreateMySupportDispute")
            .Produces<CustomerSupportDisputeDto>(StatusCodes.Status201Created);
        return app;
    }

    private static async Task<IResult> ListTicketsAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? status,
        [FromQuery] string? q,
        HttpContext context,
        ICustomerSupportService support,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        return Results.Ok(await support.ListTicketsAsync(
            userId,
            page,
            pageSize,
            status,
            q,
            cancellationToken));
    }

    private static async Task<IResult> GetTicketAsync(
        Guid id,
        HttpContext context,
        ICustomerSupportService support,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var ticket = await support.GetTicketAsync(userId, id, cancellationToken);
        return ticket is null
            ? context.ToProblem(Error.NotFound(
                "HANI-SUPPORT-4302",
                "Support ticket was not found."))
            : Results.Ok(ticket);
    }

    private static async Task<IResult> ReplyAsync(
        Guid id,
        CustomerSupportReplyRequest request,
        HttpContext context,
        ICustomerSupportService support,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var result = await support.ReplyAsync(
            userId,
            id,
            request.Body,
            cancellationToken);
        return result.IsSuccess
            ? Results.Ok(result.Value)
            : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> ListDisputesAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? status,
        HttpContext context,
        ICustomerSupportService support,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        return Results.Ok(await support.ListDisputesAsync(
            userId,
            page,
            pageSize,
            status,
            cancellationToken));
    }

    private static async Task<IResult> GetDisputeAsync(
        Guid id,
        HttpContext context,
        ICustomerSupportService support,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var dispute = await support.GetDisputeAsync(userId, id, cancellationToken);
        return dispute is null
            ? context.ToProblem(Error.NotFound(
                "HANI-SUPPORT-4305",
                "Support dispute was not found."))
            : Results.Ok(dispute);
    }

    private static async Task<IResult> CreateDisputeAsync(
        Guid id,
        CustomerSupportDisputeRequest request,
        HttpContext context,
        ICustomerSupportService support,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var result = await support.CreateDisputeAsync(
            userId,
            id,
            new CustomerSupportDisputeInput(
                request.OrderId,
                request.Type,
                request.Amount,
                request.Currency,
                request.Description,
                request.EvidenceUrl),
            cancellationToken);
        return result.IsSuccess
            ? Results.Created(
                $"/market/v1/support/disputes/{result.Value!.Id}",
                result.Value)
            : context.ToProblem(result.Error!);
    }

    private static bool TryGetUserId(HttpContext context, out Guid userId)
    {
        var value = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? context.User.FindFirst("sub")?.Value;
        return Guid.TryParse(value, out userId);
    }

    private static IResult Unauthorized(HttpContext context)
        => context.ToProblem(Error.Unauthorized(
            "HANI-SUPPORT-4306",
            "An authenticated customer is required."));
}

/// <summary>Customer support reply request.</summary>
public sealed record CustomerSupportReplyRequest(string Body);

/// <summary>Customer support dispute request.</summary>
public sealed record CustomerSupportDisputeRequest(
    Guid? OrderId,
    string Type,
    decimal? Amount,
    string? Currency,
    string Description,
    string? EvidenceUrl);

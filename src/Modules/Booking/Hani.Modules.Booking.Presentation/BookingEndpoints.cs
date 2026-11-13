using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Booking.Application.Commands.CreateHold;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Application.Commands.ReleaseHold;
using Hani.Modules.Booking.Application.Queries.GetContract;
using Hani.Modules.Booking.Application.Queries.GetOrder;
using Hani.Modules.Booking.Application.Queries.GetQuote;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Booking.Presentation;

/// <summary>
/// Marketplace endpoints for quotes and seat holds.
/// </summary>
public static class BookingEndpoints
{
    /// <summary>
    /// Maps quote and hold endpoints under the marketplace API.
    /// </summary>
    public static IEndpointRouteBuilder MapBookingEndpoints(this IEndpointRouteBuilder app)
    {
        var market = app.MapGroup("/market/v1").WithTags("Marketplace.Booking");

        market.MapPost("/quotes", CreateQuoteAsync)
            .WithName("Marketplace.CreateQuote")
            .Produces<QuoteDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status409Conflict);

        market.MapGet("/quotes/{quoteId:guid}", GetQuoteAsync)
            .WithName("Marketplace.GetQuote")
            .Produces<QuoteDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapPost("/holds", CreateHoldAsync)
            .WithName("Marketplace.CreateHold")
            .Produces<HoldDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status409Conflict);

        market.MapDelete("/holds/{holdId:guid}", ReleaseHoldAsync)
            .WithName("Marketplace.ReleaseHold")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapPost("/orders", CreateOrderAsync)
            .WithName("Marketplace.CreateOrder")
            .Produces<OrderDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict);

        market.MapGet("/orders/{orderId:guid}", GetOrderAsync)
            .WithName("Marketplace.GetOrder")
            .Produces<OrderDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapGet("/orders/{orderId:guid}/contract", GetContractAsync)
            .WithName("Marketplace.GetContract")
            .Produces<ContractDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    /// <summary>
    /// Creates a priced quote for a departure and passenger mix.
    /// Returns <c>201</c> with the quote, <c>400</c> for invalid input,
    /// and <c>409</c> when departure capacity is insufficient.
    /// </summary>
    private static async Task<IResult> CreateQuoteAsync(
        CreateQuoteRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateQuoteCommand(
                request.DepartureId,
                request.RoomType,
                request.Adults,
                request.Children,
                request.Infants,
                request.AccommodationOptionId),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/quotes/{result.Value!.QuoteId}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns one quote by id, or <c>404</c> when it does not exist.
    /// </summary>
    private static async Task<IResult> GetQuoteAsync(
        Guid quoteId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetQuoteQuery(quoteId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Reserves seats for a quote using the optional <c>Idempotency-Key</c> header.
    /// Returns <c>201</c> with the hold or <c>409</c> when it cannot be created.
    /// </summary>
    private static async Task<IResult> CreateHoldAsync(
        CreateHoldRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var idempotencyKey = context.Request.Headers["Idempotency-Key"].FirstOrDefault()
            ?? string.Empty;

        var result = await sender.Send(
            new CreateHoldCommand(request.QuoteId, idempotencyKey),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/holds/{result.Value!.HoldId}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Releases a hold and returns its reserved seats.
    /// Returns <c>200</c> on success or <c>404</c> when the hold is missing.
    /// </summary>
    private static async Task<IResult> ReleaseHoldAsync(
        Guid holdId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ReleaseHoldCommand(holdId), cancellationToken);
        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Converts an active hold into an immutable order and contract.
    /// Returns <c>201</c>, or <c>400</c>/<c>404</c>/<c>409</c> for invalid,
    /// missing, or conflicting input.
    /// </summary>
    private static async Task<IResult> CreateOrderAsync(
        CreateOrderRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var idempotencyKey = context.Request.Headers["Idempotency-Key"].FirstOrDefault()
            ?? string.Empty;

        var travelers = (request.Travelers ?? [])
            .Select(traveler => new OrderTravelerInput(
                traveler.FullName,
                traveler.Type,
                traveler.DateOfBirth))
            .ToArray();

        var result = await sender.Send(
            new CreateOrderCommand(
                request.HoldId,
                request.ContactEmail,
                request.ContactPhone,
                travelers,
                idempotencyKey),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/orders/{result.Value!.OrderId}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns one order by id, or <c>404</c> when it does not exist.
    /// </summary>
    private static async Task<IResult> GetOrderAsync(
        Guid orderId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetOrderQuery(orderId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the immutable contract issued for an order, or <c>404</c>.
    /// </summary>
    private static async Task<IResult> GetContractAsync(
        Guid orderId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetContractQuery(orderId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

}

/// <summary>
/// HTTP request to create a quote.
/// </summary>
public sealed record CreateQuoteRequest(
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children = 0,
    int Infants = 0,
    Guid? AccommodationOptionId = null);

/// <summary>
/// HTTP request to create a hold.
/// </summary>
public sealed record CreateHoldRequest(Guid QuoteId);

/// <summary>
/// HTTP request to create an order from a hold.
/// </summary>
public sealed record CreateOrderRequest(
    Guid HoldId,
    string ContactEmail,
    string? ContactPhone,
    IReadOnlyList<OrderTravelerRequest> Travelers);

/// <summary>
/// Traveler supplied when creating an order.
/// </summary>
public sealed record OrderTravelerRequest(
    string FullName,
    string Type,
    DateOnly? DateOfBirth = null);

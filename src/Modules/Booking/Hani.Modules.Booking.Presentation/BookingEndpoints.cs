using System.Globalization;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Booking.Application.Commands.CreateHold;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Application.Commands.ReleaseHold;
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

        return app;
    }

    private static async Task<IResult> CreateQuoteAsync(
        CreateQuoteRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateQuoteCommand(
                request.DepartureId,
                request.RoomType,
                request.Adults,
                request.Children,
                request.Infants),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/quotes/{result.Value!.QuoteId}", result.Value)
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> GetQuoteAsync(
        Guid quoteId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetQuoteQuery(quoteId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : ToProblem(result.Error!);
    }

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
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> ReleaseHoldAsync(
        Guid holdId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ReleaseHoldCommand(holdId), cancellationToken);
        return result.IsSuccess ? Results.Ok() : ToProblem(result.Error!);
    }

    private static IResult ToProblem(Error error)
    {
        var statusCode = error.Type switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ErrorType.Forbidden => StatusCodes.Status403Forbidden,
            _ => StatusCodes.Status500InternalServerError
        };

        var locale = CultureInfo.CurrentUICulture.Name;

        return Results.Problem(
            title: ProblemDetailsLocalizer.Title(error.Type, locale),
            detail: error.Message,
            statusCode: statusCode,
            extensions: new Dictionary<string, object?>
            {
                ["code"] = error.Code,
                ["locale"] = locale
            });
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
    int Infants = 0);

/// <summary>
/// HTTP request to create a hold.
/// </summary>
public sealed record CreateHoldRequest(Guid QuoteId);

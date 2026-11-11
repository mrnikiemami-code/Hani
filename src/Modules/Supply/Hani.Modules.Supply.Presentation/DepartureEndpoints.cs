using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Commands.CreateTourDeparture;
using Hani.Modules.Supply.Application.Commands.UpdateDepartureAvailability;
using Hani.Modules.Supply.Application.Commands.UpdateDeparturePrice;
using Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;
using Hani.Modules.Supply.Domain.Departures;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Supply.Presentation;

public static class DepartureEndpoints
{
    public static IEndpointRouteBuilder MapDepartureEndpoints(this IEndpointRouteBuilder app)
    {
        var supplier = app.MapGroup("/supplier/v1").WithTags("Supplier");

        supplier.MapPost("/offers/{offerId:guid}/departures", CreateDepartureAsync)
            .WithName("Supplier.CreateTourDeparture")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);

        supplier.MapGet("/offers/{offerId:guid}/departures", GetDeparturesAsync)
            .WithName("Supplier.GetTourDepartures")
            .Produces<IReadOnlyList<TourDepartureDto>>();

        supplier.MapPatch("/departures/{departureId:guid}/availability", UpdateAvailabilityAsync)
            .WithName("Supplier.UpdateDepartureAvailability")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict);

        supplier.MapPut("/departures/{departureId:guid}/prices", UpdatePriceAsync)
            .WithName("Supplier.UpdateDeparturePrice")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict);

        return app;
    }

    private static async Task<IResult> CreateDepartureAsync(
        Guid offerId,
        CreateTourDepartureRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new CreateTourDepartureCommand(
            offerId,
            request.StartDate,
            request.EndDate,
            request.Capacity,
            request.Prices
                .Select(price => new DeparturePriceInput(
                    price.RoomType,
                    price.Amount,
                    price.Currency))
                .ToArray());

        var result = await sender.Send(command, cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/supplier/v1/departures/{result.Value}", result.Value)
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> GetDeparturesAsync(
        Guid offerId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetDeparturesByOfferQuery(offerId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : ToProblem(result.Error!);
    }

    private static async Task<IResult> UpdateAvailabilityAsync(
        Guid departureId,
        UpdateDepartureAvailabilityRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new UpdateDepartureAvailabilityCommand(
                departureId,
                request.SeatsLeft,
                request.Version),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : ToProblem(result.Error!);
    }

    private static async Task<IResult> UpdatePriceAsync(
        Guid departureId,
        UpdateDeparturePriceRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new UpdateDeparturePriceCommand(
                departureId,
                request.RoomType,
                request.Amount,
                request.Currency,
                request.Version),
            cancellationToken);

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

        return Results.Problem(
            title: error.Message,
            statusCode: statusCode,
            extensions: new Dictionary<string, object?>
            {
                ["code"] = error.Code
            });
    }
}

public sealed record DeparturePriceRequest(
    RoomType RoomType,
    decimal Amount,
    string Currency);

public sealed record CreateTourDepartureRequest(
    DateOnly StartDate,
    DateOnly EndDate,
    int Capacity,
    IReadOnlyList<DeparturePriceRequest> Prices);

public sealed record UpdateDepartureAvailabilityRequest(
    int SeatsLeft,
    long Version);

public sealed record UpdateDeparturePriceRequest(
    RoomType RoomType,
    decimal Amount,
    string Currency,
    long Version);

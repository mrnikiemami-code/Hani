using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
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

/// <summary>
/// Minimal API endpoints for departures and prices.
/// </summary>
public static class DepartureEndpoints
{
    public static IEndpointRouteBuilder MapDepartureEndpoints(this IEndpointRouteBuilder app)
    {
        var supplier = app.MapGroup("/supplier/v1")
            .WithTags("Supplier")
            .RequireAuthorization("Supplier");

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

    /// <summary>
    /// Creates a departure with per-room and per-currency prices. Returns 201 or 400.
    /// </summary>
    private static async Task<IResult> CreateDepartureAsync(
        Guid offerId,
        CreateTourDepartureRequest request,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var command = new CreateTourDepartureCommand(
            agencyId,
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
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Lists departures for an offer.
    /// </summary>
    private static async Task<IResult> GetDeparturesAsync(
        Guid offerId,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var result = await sender.Send(
            new GetDeparturesByOfferQuery(agencyId, offerId),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Updates departure capacity using the expected concurrency version. Returns 200, 404, or 409.
    /// </summary>
    private static async Task<IResult> UpdateAvailabilityAsync(
        Guid departureId,
        UpdateDepartureAvailabilityRequest request,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var result = await sender.Send(
            new UpdateDepartureAvailabilityCommand(
                agencyId,
                departureId,
                request.SeatsLeft,
                request.Version),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Updates or creates a departure price for a room and currency. Returns 200, 404, or 409.
    /// </summary>
    private static async Task<IResult> UpdatePriceAsync(
        Guid departureId,
        UpdateDeparturePriceRequest request,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var result = await sender.Send(
            new UpdateDeparturePriceCommand(
                agencyId,
                departureId,
                request.RoomType,
                request.Amount,
                request.Currency,
                request.Version),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

}

/// <summary>
/// HTTP price item for a departure.
/// </summary>
public sealed record DeparturePriceRequest(
    RoomType RoomType,
    decimal Amount,
    string Currency);

/// <summary>
/// HTTP request to create a departure.
/// </summary>
public sealed record CreateTourDepartureRequest(
    DateOnly StartDate,
    DateOnly EndDate,
    int Capacity,
    IReadOnlyList<DeparturePriceRequest> Prices);

/// <summary>
/// HTTP request to update departure availability.
/// </summary>
public sealed record UpdateDepartureAvailabilityRequest(
    int SeatsLeft,
    long Version);

/// <summary>
/// HTTP request to update a departure price.
/// </summary>
public sealed record UpdateDeparturePriceRequest(
    RoomType RoomType,
    decimal Amount,
    string Currency,
    long Version);

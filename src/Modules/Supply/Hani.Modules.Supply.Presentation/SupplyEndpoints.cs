using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;
using Hani.Modules.Supply.Application.Commands.ArchiveAgencyOffer;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;
using Hani.Modules.Supply.Application.Commands.SubmitAgencyOffer;
using Hani.Modules.Supply.Application.Commands.UpsertAgencyOffer;
using Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Domain.Departures;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Supply.Presentation;

/// <summary>
/// Minimal API endpoints for agency offers.
/// </summary>
public static class SupplyEndpoints
{
    public static IEndpointRouteBuilder MapSupplyEndpoints(this IEndpointRouteBuilder app)
    {
        var supplier = app.MapGroup("/supplier/v1")
            .WithTags("Supplier")
            .RequireAuthorization("Supplier");

        supplier.MapPost("/offers", CreateOfferAsync)
            .WithName("Supplier.CreateAgencyOffer")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        supplier.MapPut("/offers/{externalId}", UpsertOfferAsync)
            .WithName("Supplier.UpsertAgencyOffer")
            .Produces<UpsertAgencyOfferResult>(StatusCodes.Status200OK)
            .Produces<UpsertAgencyOfferResult>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        supplier.MapGet("/offers/{offerId:guid}", GetOfferAsync)
            .WithName("Supplier.GetAgencyOffer")
            .Produces<AgencyOfferDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        supplier.MapPost("/offers/{offerId:guid}/submit", SubmitOfferAsync)
            .WithName("Supplier.SubmitAgencyOffer")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status409Conflict);

        supplier.MapDelete("/offers/{offerId:guid}", ArchiveOfferAsync)
            .WithName("Supplier.ArchiveAgencyOffer")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound);

        var internalApi = app.MapGroup("/internal/v1/offers").WithTags("Internal.Supply");

        internalApi.MapPost("/{offerId:guid}/approve", ApproveOfferAsync)
            .WithName("Internal.ApproveAgencyOffer")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status409Conflict);

        internalApi.MapPost("/{offerId:guid}/reject", RejectOfferAsync)
            .WithName("Internal.RejectAgencyOffer")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status409Conflict);

        app.MapDepartureEndpoints();

        return app;
    }

    /// <summary>
    /// Creates an agency offer with accommodation, flight, and tax options. Returns 201 or 400.
    /// </summary>
    private static async Task<IResult> CreateOfferAsync(
        CreateAgencyOfferRequest request,
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
            new CreateAgencyOfferCommand(
                agencyId,
                request.TourProductId,
                request.Title,
                request.BasePrice,
                request.Currency,
                request.AccommodationOptions?
                    .Select(option => new AccommodationOptionInput(
                        option.HotelName,
                        option.HotelStars,
                        option.RoomType,
                        option.MealPlan,
                        option.Amount,
                        option.Currency,
                        option.Description))
                    .ToArray(),
                request.FlightOptions?
                    .Select(option => new FlightOptionInput(
                        option.Direction,
                        option.Airline,
                        option.FlightNumber,
                        option.DepartureAirport,
                        option.ArrivalAirport,
                        option.DepartureTime,
                        option.ArrivalTime,
                        option.DurationMinutes,
                        option.Cabin,
                        option.BaggageAllowance))
                    .ToArray(),
                request.TaxRules?
                    .Select(rule => new TaxRuleInput(
                        rule.Currency,
                        rule.VatStatus,
                        rule.VatRate,
                        rule.DutyStatus,
                        rule.DutyRate,
                        rule.ExemptionReason))
                    .ToArray(),
                request.BookingMode,
                request.CollectionMode),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/supplier/v1/offers/{result.Value}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Idempotently creates or updates an agency offer by external id.
    /// </summary>
    private static async Task<IResult> UpsertOfferAsync(
        string externalId,
        UpsertAgencyOfferRequest request,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var idempotencyKey = context.Request.Headers["Idempotency-Key"].FirstOrDefault()
            ?? string.Empty;

        var result = await sender.Send(
            new UpsertAgencyOfferCommand(
                agencyId,
                externalId,
                request.TourProductId,
                request.Title,
                request.BasePrice,
                request.Currency,
                idempotencyKey,
                request.AccommodationOptions?
                    .Select(option => new AccommodationOptionInput(
                        option.HotelName,
                        option.HotelStars,
                        option.RoomType,
                        option.MealPlan,
                        option.Amount,
                        option.Currency,
                        option.Description))
                    .ToArray(),
                request.FlightOptions?
                    .Select(option => new FlightOptionInput(
                        option.Direction,
                        option.Airline,
                        option.FlightNumber,
                        option.DepartureAirport,
                        option.ArrivalAirport,
                        option.DepartureTime,
                        option.ArrivalTime,
                        option.DurationMinutes,
                        option.Cabin,
                        option.BaggageAllowance))
                    .ToArray(),
                request.TaxRules?
                    .Select(rule => new TaxRuleInput(
                        rule.Currency,
                        rule.VatStatus,
                        rule.VatRate,
                        rule.DutyStatus,
                        rule.DutyRate,
                        rule.ExemptionReason))
                    .ToArray(),
                request.BookingMode,
                request.CollectionMode),
            cancellationToken);

        return result.IsSuccess
            ? result.Value!.Created
                ? Results.Created($"/supplier/v1/offers/{result.Value.OfferId}", result.Value)
                : Results.Ok(result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns one agency offer with options and tax rules, or 404.
    /// </summary>
    private static async Task<IResult> GetOfferAsync(
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
            new GetAgencyOfferByIdQuery(offerId, agencyId),
            cancellationToken);

        return result.IsSuccess
            ? Results.Ok(result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Submits a draft offer for moderation. Returns 200 or 409.
    /// </summary>
    private static async Task<IResult> SubmitOfferAsync(
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
            new SubmitAgencyOfferCommand(agencyId, offerId),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Archives an agency offer. Returns 200 or 404.
    /// </summary>
    private static async Task<IResult> ArchiveOfferAsync(
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
            new ArchiveAgencyOfferCommand(agencyId, offerId),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Approves a pending offer through the internal API. Returns 200 or 409.
    /// </summary>
    private static async Task<IResult> ApproveOfferAsync(
        Guid offerId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ApproveAgencyOfferCommand(offerId), cancellationToken);
        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Rejects a pending offer with a reason. Returns 200 or 409.
    /// </summary>
    private static async Task<IResult> RejectOfferAsync(
        Guid offerId,
        RejectAgencyOfferRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RejectAgencyOfferCommand(offerId, request.Reason),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

}

/// <summary>
/// HTTP request for an accommodation option.
/// </summary>
public sealed record AccommodationOptionRequest(
    string HotelName,
    int HotelStars,
    RoomType RoomType,
    MealPlanType MealPlan,
    decimal Amount,
    string Currency,
    string? Description = null);

/// <summary>
/// HTTP request for a flight option.
/// </summary>
public sealed record FlightOptionRequest(
    FlightDirection Direction,
    string Airline,
    string FlightNumber,
    string DepartureAirport,
    string ArrivalAirport,
    TimeOnly DepartureTime,
    TimeOnly ArrivalTime,
    int DurationMinutes,
    string Cabin,
    string BaggageAllowance);

/// <summary>
/// HTTP request for an offer tax rule.
/// </summary>
public sealed record TaxRuleRequest(
    string Currency,
    TaxStatus VatStatus,
    decimal VatRate,
    TaxStatus DutyStatus,
    decimal DutyRate,
    string? ExemptionReason = null);

/// <summary>
/// HTTP request to create an agency offer.
/// </summary>
public sealed record CreateAgencyOfferRequest(
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency,
    IReadOnlyList<AccommodationOptionRequest>? AccommodationOptions = null,
    IReadOnlyList<FlightOptionRequest>? FlightOptions = null,
    IReadOnlyList<TaxRuleRequest>? TaxRules = null,
    BookingMode BookingMode = BookingMode.Online,
    CollectionMode CollectionMode = CollectionMode.Online);

/// <summary>
/// HTTP request to upsert an agency offer.
/// </summary>
public sealed record UpsertAgencyOfferRequest(
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency,
    IReadOnlyList<AccommodationOptionRequest>? AccommodationOptions = null,
    IReadOnlyList<FlightOptionRequest>? FlightOptions = null,
    IReadOnlyList<TaxRuleRequest>? TaxRules = null,
    BookingMode BookingMode = BookingMode.Online,
    CollectionMode CollectionMode = CollectionMode.Online);

/// <summary>
/// HTTP request body for rejecting an offer.
/// </summary>
public sealed record RejectAgencyOfferRequest(string Reason);

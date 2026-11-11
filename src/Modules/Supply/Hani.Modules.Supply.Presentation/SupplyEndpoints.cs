using System.Globalization;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;
using Hani.Modules.Supply.Application.Commands.ArchiveAgencyOffer;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;
using Hani.Modules.Supply.Application.Commands.SubmitAgencyOffer;
using Hani.Modules.Supply.Application.Commands.UpsertAgencyOffer;
using Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;
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

    private static async Task<IResult> CreateOfferAsync(
        CreateAgencyOfferRequest request,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return Results.Unauthorized();
        }

        var result = await sender.Send(
            new CreateAgencyOfferCommand(
                agencyId,
                request.TourProductId,
                request.Title,
                request.BasePrice,
                request.Currency),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/supplier/v1/offers/{result.Value}", result.Value)
            : ToProblem(result.Error!);
    }

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
            return Results.Unauthorized();
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
                idempotencyKey),
            cancellationToken);

        return result.IsSuccess
            ? result.Value!.Created
                ? Results.Created($"/supplier/v1/offers/{result.Value.OfferId}", result.Value)
                : Results.Ok(result.Value)
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> GetOfferAsync(
        Guid offerId,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return Results.Unauthorized();
        }

        var result = await sender.Send(
            new GetAgencyOfferByIdQuery(offerId, agencyId),
            cancellationToken);

        return result.IsSuccess
            ? Results.Ok(result.Value)
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> SubmitOfferAsync(
        Guid offerId,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return Results.Unauthorized();
        }

        var result = await sender.Send(
            new SubmitAgencyOfferCommand(agencyId, offerId),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : ToProblem(result.Error!);
    }

    private static async Task<IResult> ArchiveOfferAsync(
        Guid offerId,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return Results.Unauthorized();
        }

        var result = await sender.Send(
            new ArchiveAgencyOfferCommand(agencyId, offerId),
            cancellationToken);

        return result.IsSuccess ? Results.Ok() : ToProblem(result.Error!);
    }

    private static async Task<IResult> ApproveOfferAsync(
        Guid offerId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ApproveAgencyOfferCommand(offerId), cancellationToken);
        return result.IsSuccess ? Results.Ok() : ToProblem(result.Error!);
    }

    private static async Task<IResult> RejectOfferAsync(
        Guid offerId,
        RejectAgencyOfferRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RejectAgencyOfferCommand(offerId, request.Reason),
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
/// HTTP request to create an agency offer.
/// </summary>
public sealed record CreateAgencyOfferRequest(
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency);

/// <summary>
/// HTTP request to upsert an agency offer.
/// </summary>
public sealed record UpsertAgencyOfferRequest(
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency);

/// <summary>
/// HTTP request body for rejecting an offer.
/// </summary>
public sealed record RejectAgencyOfferRequest(string Reason);

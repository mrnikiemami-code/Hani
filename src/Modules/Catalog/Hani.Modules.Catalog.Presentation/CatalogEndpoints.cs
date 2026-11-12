using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Catalog.Application.Commands.CreateDestination;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Application.Commands.PublishTourProduct;
using Hani.Modules.Catalog.Application.Queries.GetTourProductById;
using Hani.Modules.Catalog.Domain.TourProducts;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Catalog.Presentation;

/// <summary>
/// Minimal API endpoints for the catalog module.
/// </summary>
public static class CatalogEndpoints
{
    public static IEndpointRouteBuilder MapCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        var internalApi = app.MapGroup("/internal/v1/products").WithTags("Internal.Catalog");
        var destinations = app.MapGroup("/internal/v1/destinations").WithTags("Internal.Catalog");
        var market = app.MapGroup("/market/v1/products").WithTags("Marketplace.Catalog");

        destinations.MapPost("/", CreateDestinationAsync)
            .WithName("Internal.CreateDestination")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        internalApi.MapPost("/", CreateProductAsync)
            .WithName("Internal.CreateTourProduct")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        internalApi.MapPost("/{productId:guid}/publish", PublishProductAsync)
            .WithName("Internal.PublishTourProduct")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapGet("/{productId:guid}", GetProductAsync)
            .WithName("Marketplace.GetTourProduct")
            .Produces<TourProductDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<IResult> CreateDestinationAsync(
        CreateDestinationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateDestinationCommand(
                request.Slug,
                request.Type,
                request.ParentId,
                request.Translations
                    .Select(translation => new DestinationTranslationInput(
                        translation.Locale,
                        translation.Name,
                        translation.Description))
                    .ToArray()),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/internal/v1/destinations/{result.Value}", result.Value)
            : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> CreateProductAsync(
        CreateTourProductRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new CreateTourProductCommand(
            request.Slug,
            request.DurationDays,
            request.TourType,
            request.Translations
                .Select(translation => new TourProductTranslationInput(
                    translation.Locale,
                    translation.Title,
                    translation.Summary,
                    translation.Description,
                    translation.SeoTitle,
                    translation.SeoDescription,
                    translation.MealsSummary,
                    translation.IncludedServices,
                    translation.ExcludedServices,
                    translation.CancellationPolicy,
                    translation.AdditionalInfo,
                    translation.RequiredItems))
                .ToArray(),
            request.DestinationIds,
            request.Content is null
                ? null
                : new TourProductContentInput(
                    request.Content.OriginDestinationId,
                    request.Content.Difficulty,
                    request.Content.VehicleType,
                    request.Content.LocalVehicleType,
                    request.Content.AccommodationType,
                    request.Content.ItineraryDays
                        .Select(day => new TourItineraryDayInput(
                            day.DayNumber,
                            day.Breakfast,
                            day.Lunch,
                            day.Dinner,
                            day.Translations
                                .Select(translation => new TourItineraryDayTranslationInput(
                                    translation.Locale,
                                    translation.Title,
                                    translation.Description,
                                    translation.Accommodation))
                                .ToArray()))
                        .ToArray()));

        var result = await sender.Send(command, cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/products/{result.Value}", result.Value)
            : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> PublishProductAsync(
        Guid productId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new PublishTourProductCommand(productId), cancellationToken);
        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> GetProductAsync(
        Guid productId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetTourProductByIdQuery(productId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

}

/// <summary>
/// HTTP request contract.
/// </summary>
public sealed record TourProductTranslationRequest(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle = null,
    string? SeoDescription = null,
    string? MealsSummary = null,
    string? IncludedServices = null,
    string? ExcludedServices = null,
    string? CancellationPolicy = null,
    string? AdditionalInfo = null,
    string? RequiredItems = null);

/// <summary>
/// HTTP request for one itinerary day translation.
/// </summary>
public sealed record TourItineraryDayTranslationRequest(
    string Locale,
    string Title,
    string Description,
    string? Accommodation = null);

/// <summary>
/// HTTP request for one itinerary day.
/// </summary>
public sealed record TourItineraryDayRequest(
    int DayNumber,
    bool Breakfast,
    bool Lunch,
    bool Dinner,
    IReadOnlyList<TourItineraryDayTranslationRequest> Translations);

/// <summary>
/// HTTP request for tour overview and itinerary content.
/// </summary>
public sealed record TourProductContentRequest(
    Guid? OriginDestinationId,
    TourDifficulty Difficulty,
    TourVehicleType VehicleType,
    TourVehicleType LocalVehicleType,
    TourAccommodationType AccommodationType,
    IReadOnlyList<TourItineraryDayRequest> ItineraryDays);

/// <summary>
/// HTTP request contract.
/// </summary>
public sealed record DestinationTranslationRequest(
    string Locale,
    string Name,
    string? Description = null);

/// <summary>
/// HTTP request to create a destination.
/// </summary>
public sealed record CreateDestinationRequest(
    string Slug,
    Hani.Modules.Catalog.Domain.Destinations.DestinationType Type,
    Guid? ParentId,
    IReadOnlyList<DestinationTranslationRequest> Translations);

/// <summary>
/// HTTP request to create a shared tour product.
/// </summary>
public sealed record CreateTourProductRequest(
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyList<TourProductTranslationRequest> Translations,
    IReadOnlyList<Guid> DestinationIds,
    TourProductContentRequest? Content = null);

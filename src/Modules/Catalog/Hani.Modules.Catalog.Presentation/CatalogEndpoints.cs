using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Catalog.Application.Commands.CreateDestination;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Application.Commands.CreatePlace;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Application.Commands.PublishTourProduct;
using Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;
using Hani.Modules.Catalog.Application.Queries.GetPlaceBySlug;
using Hani.Modules.Catalog.Application.Queries.GetTourProductById;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;
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
        var internalHotels = app.MapGroup("/internal/v1/hotels").WithTags("Internal.Catalog");
        var marketHotels = app.MapGroup("/market/v1/hotels").WithTags("Marketplace.Catalog");
        var internalPlaces = app.MapGroup("/internal/v1/places").WithTags("Internal.Catalog");
        var marketPlaces = app.MapGroup("/market/v1/places").WithTags("Marketplace.Catalog");

        internalPlaces.MapPost("/", CreatePlaceAsync)
            .WithName("Internal.CreatePlace")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketPlaces.MapGet("/nearby", GetNearbyPlacesAsync)
            .WithName("Marketplace.GetNearbyPlaces")
            .Produces<IReadOnlyList<NearbyPlaceDto>>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketPlaces.MapGet("/{slug}", GetPlaceAsync)
            .WithName("Marketplace.GetPlace")
            .Produces<PlaceDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        internalHotels.MapPost("/", CreateHotelAsync)
            .WithName("Internal.CreateHotel")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketHotels.MapGet("/{slug}", GetHotelAsync)
            .WithName("Marketplace.GetHotel")
            .Produces<HotelDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

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

    /// <summary>
    /// Creates a canonical restaurant or attraction. Returns 201 or 400.
    /// </summary>
    private static async Task<IResult> CreatePlaceAsync(
        CreatePlaceRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreatePlaceCommand(
                request.Slug,
                request.Type,
                request.DestinationId,
                request.Category,
                request.Cuisine,
                request.PriceBand,
                request.Reservable,
                request.OnlineReservable,
                request.Latitude,
                request.Longitude,
                request.Translations
                    .Select(item => new PlaceTranslationInput(item.Locale, item.Name, item.Description))
                    .ToArray(),
                request.Amenities),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/places/{request.Slug}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns a canonical restaurant or attraction.
    /// </summary>
    private static async Task<IResult> GetPlaceAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetPlaceBySlugQuery(slug), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns nearby restaurants or attractions by distance.
    /// </summary>
    private static async Task<IResult> GetNearbyPlacesAsync(
        decimal latitude,
        decimal longitude,
        PlaceType? type,
        int? radiusKm,
        int? limit,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetNearbyPlacesQuery(
                latitude,
                longitude,
                type,
                radiusKm ?? 10,
                limit ?? 20),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates a canonical hotel. Returns 201 or 400.
    /// </summary>
    private static async Task<IResult> CreateHotelAsync(
        CreateHotelRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateHotelCommand(
                request.Slug,
                request.DestinationId,
                request.Stars,
                request.Address,
                request.Latitude,
                request.Longitude,
                request.Translations
                    .Select(item => new HotelTranslationInput(item.Locale, item.Name, item.Description))
                    .ToArray(),
                request.Amenities
                    .Select(item => new HotelAmenityInput(item.Category, item.Name))
                    .ToArray()),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/hotels/{request.Slug}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns a canonical hotel by slug.
    /// </summary>
    private static async Task<IResult> GetHotelAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetHotelBySlugQuery(slug), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates a destination with localized translations. Returns 201 or 400.
    /// </summary>
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

    /// <summary>
    /// Creates a draft tour product with localized content and itinerary. Returns 201 or 400.
    /// </summary>
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
                        .ToArray()),
            request.Category,
            request.TravelType);

        var result = await sender.Send(command, cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/products/{result.Value}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Publishes a draft tour product. Returns 200 or 404.
    /// </summary>
    private static async Task<IResult> PublishProductAsync(
        Guid productId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new PublishTourProductCommand(productId), cancellationToken);
        return result.IsSuccess ? Results.Ok() : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns one published tour product with content and itinerary, or 404.
    /// </summary>
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
    TourProductContentRequest? Content = null,
    TourCategory Category = TourCategory.Normal,
    TravelType TravelType = TravelType.Other);

/// <summary>
/// HTTP request for a hotel translation.
/// </summary>
public sealed record HotelTranslationRequest(
    string Locale,
    string Name,
    string? Description = null);

/// <summary>
/// HTTP request for a hotel amenity.
/// </summary>
public sealed record HotelAmenityRequest(string Category, string Name);

/// <summary>
/// HTTP request to create a canonical hotel.
/// </summary>
public sealed record CreateHotelRequest(
    string Slug,
    Guid DestinationId,
    int Stars,
    string? Address,
    decimal? Latitude,
    decimal? Longitude,
    IReadOnlyList<HotelTranslationRequest> Translations,
    IReadOnlyList<HotelAmenityRequest> Amenities);

/// <summary>
/// HTTP request for a place translation.
/// </summary>
public sealed record PlaceTranslationRequest(
    string Locale,
    string Name,
    string? Description = null);

/// <summary>
/// HTTP request to create a restaurant or attraction.
/// </summary>
public sealed record CreatePlaceRequest(
    string Slug,
    PlaceType Type,
    Guid DestinationId,
    string Category,
    string? Cuisine,
    string? PriceBand,
    bool Reservable,
    bool OnlineReservable,
    decimal? Latitude,
    decimal? Longitude,
    IReadOnlyList<PlaceTranslationRequest> Translations,
    IReadOnlyList<string> Amenities);

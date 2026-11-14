using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Catalog.Application.Commands.CreateDestination;
using Hani.Modules.Catalog.Application.Commands.CreateFlightRoute;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Application.Commands.CreatePlace;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;
using Hani.Modules.Catalog.Application.Commands.PublishTourProduct;
using Hani.Modules.Catalog.Application.Queries.GetGeoNearby;
using Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;
using Hani.Modules.Catalog.Application.Queries.GetPlaceBySlug;
using Hani.Modules.Catalog.Application.Queries.GetTourProductById;
using Hani.Modules.Catalog.Application.Queries.GetVisaCountry;
using Hani.Modules.Catalog.Application.Queries.SearchFlights;
using Hani.Modules.Catalog.Application.Queries.SearchHotels;
using Hani.Modules.Catalog.Application.Queries.SearchPlaces;
using Hani.Modules.Catalog.Domain.Flights;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Domain.Visas;
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
        var marketGeo = app.MapGroup("/market/v1/geo").WithTags("Marketplace.Catalog");
        var restaurants = app.MapGroup("/market/v1/restaurants").WithTags("Marketplace.Catalog");
        var attractions = app.MapGroup("/market/v1/attractions").WithTags("Marketplace.Catalog");
        var internalVisas = app.MapGroup("/internal/v1/visas").WithTags("Internal.Catalog");
        var marketVisas = app.MapGroup("/market/v1/visas").WithTags("Marketplace.Catalog");
        var internalFlights = app.MapGroup("/internal/v1/flights").WithTags("Internal.Catalog");
        var marketFlights = app.MapGroup("/market/v1/flights").WithTags("Marketplace.Catalog");

        internalPlaces.MapPost("/", CreatePlaceAsync)
            .WithName("Internal.CreatePlace")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketPlaces.MapGet("/nearby", GetNearbyPlacesAsync)
            .WithName("Marketplace.GetNearbyPlaces")
            .Produces<IReadOnlyList<NearbyPlaceDto>>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketGeo.MapGet("/nearby", GetGeoNearbyAsync)
            .WithName("Marketplace.GetGeoNearby")
            .Produces<IReadOnlyList<GeoNearbyItemDto>>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketPlaces.MapGet("/{slug}", GetPlaceAsync)
            .WithName("Marketplace.GetPlace")
            .Produces<PlaceDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        restaurants.MapGet("/", SearchRestaurantsAsync)
            .WithName("Marketplace.SearchRestaurants")
            .Produces<PagedResult<PlaceSummaryDto>>();

        restaurants.MapGet("/{slug}", GetPlaceAsync)
            .WithName("Marketplace.GetRestaurant")
            .Produces<PlaceDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        attractions.MapGet("/", SearchAttractionsAsync)
            .WithName("Marketplace.SearchAttractions")
            .Produces<PagedResult<PlaceSummaryDto>>();

        attractions.MapGet("/{slug}", GetPlaceAsync)
            .WithName("Marketplace.GetAttraction")
            .Produces<PlaceDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        internalVisas.MapPost("/", CreateVisaCountryAsync)
            .WithName("Internal.CreateVisaCountry")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketVisas.MapGet("/", ListVisasAsync)
            .WithName("Marketplace.ListVisaCountries")
            .Produces<IReadOnlyList<VisaCountrySummaryDto>>();

        marketVisas.MapGet("/{slug}", GetVisaAsync)
            .WithName("Marketplace.GetVisaCountry")
            .Produces<VisaCountryDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        internalFlights.MapPost("/routes", CreateFlightRouteAsync)
            .WithName("Internal.CreateFlightRoute")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketFlights.MapGet("/search", SearchFlightsAsync)
            .WithName("Marketplace.SearchFlights")
            .Produces<IReadOnlyList<FlightRouteDto>>();

        marketFlights.MapGet("/routes/{slug}", GetFlightRouteAsync)
            .WithName("Marketplace.GetFlightRoute")
            .Produces<FlightRouteDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        internalHotels.MapPost("/", CreateHotelAsync)
            .WithName("Internal.CreateHotel")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        marketHotels.MapGet("/", SearchHotelsAsync)
            .WithName("Marketplace.SearchHotels")
            .Produces<PagedResult<HotelSummaryDto>>();

        marketHotels.MapGet("/nearby", GetNearbyHotelsAsync)
            .WithName("Marketplace.GetNearbyHotels")
            .Produces<IReadOnlyList<NearbyHotelDto>>();

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
    /// Searches canonical hotels with structural filters.
    /// </summary>
    private static async Task<IResult> SearchHotelsAsync(
        [AsParameters] SearchHotelsRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SearchHotelsQuery(
                request.Locale,
                request.DestinationSlug,
                request.MinStars,
                request.Amenity,
                request.Q,
                request.Page,
                request.PageSize,
                request.SortBy),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns hotels near a coordinate.
    /// </summary>
    private static async Task<IResult> GetNearbyHotelsAsync(
        decimal latitude,
        decimal longitude,
        int? radiusKm,
        int? limit,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetNearbyHotelsQuery(
                latitude,
                longitude,
                radiusKm ?? 10,
                limit ?? 20),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
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
                request.Amenities,
                request.MenuItems?
                    .Select(item => new PlaceMenuItemInput(
                        item.Section,
                        item.Name,
                        item.Price,
                        item.Currency,
                        item.Description,
                        item.SortOrder))
                    .ToArray() ?? []),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/places/{request.Slug}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates a flight route with provider offers.
    /// </summary>
    private static async Task<IResult> CreateFlightRouteAsync(
        CreateFlightRouteRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateFlightRouteCommand(
                request.Slug,
                request.OriginCode,
                request.DestinationCode,
                request.OriginCity,
                request.DestinationCity,
                request.IsActive,
                request.Offers
                    .Select(offer => offer.ToInput())
                    .ToArray()),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/flights/routes/{request.Slug}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Searches flight provider offers.
    /// </summary>
    private static async Task<IResult> SearchFlightsAsync(
        string? origin,
        string? destination,
        DateOnly? departureDate,
        string? cabin,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SearchFlightsQuery(origin, destination, departureDate, cabin),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns one flight route.
    /// </summary>
    private static async Task<IResult> GetFlightRouteAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetFlightRouteQuery(slug), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates a visa country with its visa types.
    /// </summary>
    private static async Task<IResult> CreateVisaCountryAsync(
        CreateVisaCountryRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateVisaCountryCommand(
                request.Slug,
                request.CountryCode,
                request.Translations
                    .Select(item => new VisaCountryTranslationInput(
                        item.Locale,
                        item.Name,
                        item.Description))
                    .ToArray(),
                request.Types
                    .Select(type => new VisaTypeInput(
                        type.Code,
                        type.EntryType,
                        type.ProcessingDaysMin,
                        type.ProcessingDaysMax,
                        type.ValidityDays,
                        type.PriceAdult,
                        type.PriceChild,
                        type.Currency,
                        type.Documents,
                        type.Steps,
                        type.Faqs
                            .Select(faq => new VisaFaqInput(faq.Question, faq.Answer))
                            .ToArray()))
                    .ToArray()),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/visas/{request.Slug}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Lists visa countries.
    /// </summary>
    private static async Task<IResult> ListVisasAsync(
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ListVisaCountriesQuery(locale), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns one visa country.
    /// </summary>
    private static async Task<IResult> GetVisaAsync(
        string slug,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetVisaCountryQuery(slug, locale), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Searches restaurants.
    /// </summary>
    private static Task<IResult> SearchRestaurantsAsync(
        [AsParameters] SearchPlacesRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => SearchPlacesAsync(PlaceType.Restaurant, request, context, sender, cancellationToken);

    /// <summary>
    /// Searches attractions.
    /// </summary>
    private static Task<IResult> SearchAttractionsAsync(
        [AsParameters] SearchPlacesRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => SearchPlacesAsync(PlaceType.Attraction, request, context, sender, cancellationToken);

    /// <summary>
    /// Shared restaurant and attraction search implementation.
    /// </summary>
    private static async Task<IResult> SearchPlacesAsync(
        PlaceType type,
        SearchPlacesRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SearchPlacesQuery(
                request.Locale,
                type,
                request.DestinationSlug,
                request.Category,
                request.Cuisine,
                request.PriceBand,
                request.Amenity,
                request.Reservable,
                request.OnlineReservable,
                request.Q,
                request.Page,
                request.PageSize,
                request.SortBy),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
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
    /// Returns nearby hotels and places as a unified geo result.
    /// </summary>
    private static async Task<IResult> GetGeoNearbyAsync(
        decimal latitude,
        decimal longitude,
        string? type,
        int? radiusKm,
        int? limit,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetGeoNearbyQuery(
                latitude,
                longitude,
                radiusKm ?? 10,
                limit ?? 20,
                type),
            cancellationToken);
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
                    .ToArray(),
                request.Images?
                    .Select(item => new HotelImageInput(item.Url, item.Caption, item.SortOrder))
                    .ToArray() ?? []),
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
/// HTTP request for a hotel gallery image.
/// </summary>
public sealed record HotelImageRequest(string Url, string? Caption = null, int SortOrder = 0);

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
    IReadOnlyList<HotelAmenityRequest> Amenities,
    IReadOnlyList<HotelImageRequest>? Images = null);

/// <summary>
/// HTTP query for hotel search.
/// </summary>
public sealed record SearchHotelsRequest(
    string? Locale = null,
    string? DestinationSlug = null,
    int? MinStars = null,
    string? Amenity = null,
    string? Q = null,
    int Page = 1,
    int PageSize = 20,
    string? SortBy = null);

/// <summary>
/// HTTP request for a place translation.
/// </summary>
public sealed record PlaceTranslationRequest(
    string Locale,
    string Name,
    string? Description = null);

/// <summary>Flight offer request.</summary>
public sealed record FlightOfferRequest(
    string FlightNumber,
    string AirlineCode,
    string AirlineName,
    DateOnly DepartureDate,
    TimeOnly DepartureTime,
    TimeOnly ArrivalTime,
    int DurationMinutes,
    int Stops,
    string Cabin,
    string BaggageAllowance,
    decimal Price,
    string Currency,
    string Provider,
    string DeepLink)
{
    /// <summary>
    /// Maps the request to the domain input.
    /// </summary>
    public FlightOfferInput ToInput()
        => new(
            FlightNumber,
            AirlineCode,
            AirlineName,
            DepartureDate,
            DepartureTime,
            ArrivalTime,
            DurationMinutes,
            Stops,
            Cabin,
            BaggageAllowance,
            Price,
            Currency,
            Provider,
            DeepLink);
}

/// <summary>Flight route creation request.</summary>
public sealed record CreateFlightRouteRequest(
    string Slug,
    string OriginCode,
    string DestinationCode,
    string OriginCity,
    string DestinationCity,
    bool IsActive,
    IReadOnlyList<FlightOfferRequest> Offers);

/// <summary>Visa country translation request.</summary>
public sealed record VisaCountryTranslationRequest(string Locale, string Name, string? Description = null);

/// <summary>Visa FAQ request.</summary>
public sealed record VisaFaqRequest(string Question, string Answer);

/// <summary>Visa type request.</summary>
public sealed record VisaTypeRequest(
    string Code,
    string EntryType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency,
    IReadOnlyList<string> Documents,
    IReadOnlyList<string> Steps,
    IReadOnlyList<VisaFaqRequest> Faqs);

/// <summary>Visa country creation request.</summary>
public sealed record CreateVisaCountryRequest(
    string Slug,
    string CountryCode,
    IReadOnlyList<VisaCountryTranslationRequest> Translations,
    IReadOnlyList<VisaTypeRequest> Types);

/// <summary>
/// HTTP query for restaurant or attraction search.
/// </summary>
public sealed record SearchPlacesRequest(
    string? Locale = null,
    string? DestinationSlug = null,
    string? Category = null,
    string? Cuisine = null,
    string? PriceBand = null,
    string? Amenity = null,
    bool? Reservable = null,
    bool? OnlineReservable = null,
    string? Q = null,
    int Page = 1,
    int PageSize = 20,
    string? SortBy = null);

/// <summary>
/// HTTP request for a restaurant menu item.
/// </summary>
public sealed record PlaceMenuItemRequest(
    string Section,
    string Name,
    decimal Price,
    string Currency,
    string? Description = null,
    int SortOrder = 0);

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
    IReadOnlyList<string> Amenities,
    IReadOnlyList<PlaceMenuItemRequest>? MenuItems = null);

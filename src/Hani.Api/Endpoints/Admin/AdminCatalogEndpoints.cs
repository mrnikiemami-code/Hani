using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Hani.Modules.Catalog.Application.Commands.CreateFlightReference;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Presentation;
using Microsoft.AspNetCore.Mvc;

namespace Hani.Api;

/// <summary>Admin catalogue endpoints.</summary>
public static class AdminCatalogEndpoints
{
    /// <summary>Maps admin catalogue endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/admin/catalog")
            .WithTags("Internal.Admin.Catalog")
            .RequireAuthorization("Admin");

        group.MapGet("/tours", ListToursAsync)
            .WithName("Internal.ListAdminTours")
            .Produces<AdminTourPageDto>();

        group.MapPost("/tours", CreateTourAsync)
            .WithName("Internal.CreateAdminTour")
            .Produces<Guid>(StatusCodes.Status201Created);

        group.MapGet("/tours/{id:guid}", GetTourAsync)
            .WithName("Internal.GetAdminTour")
            .Produces<AdminTourDetailDto>();

        group.MapPut("/tours/{id:guid}", UpdateTourAsync)
            .WithName("Internal.UpdateAdminTour")
            .Produces<bool>();

        group.MapPost("/tours/{id:guid}/publish", PublishTourAsync)
            .WithName("Internal.PublishAdminTour")
            .Produces<bool>();

        group.MapGet("/visas", ListVisaCountriesAsync)
            .WithName("Internal.ListAdminVisaCountries")
            .Produces<AdminVisaCountryPageDto>();

        group.MapPost("/visas", CreateVisaCountryAsync)
            .WithName("Internal.CreateAdminVisaCountry")
            .Produces<Guid>(StatusCodes.Status201Created);

        group.MapGet("/visas/{id:guid}", GetVisaCountryAsync)
            .WithName("Internal.GetAdminVisaCountry")
            .Produces<AdminVisaCountryDetailDto>();

        group.MapPut("/visas/{id:guid}", UpdateVisaCountryAsync)
            .WithName("Internal.UpdateAdminVisaCountry")
            .Produces<bool>();

        group.MapGet("/visa-applications", ListVisaApplicationsAsync)
            .WithName("Internal.ListAdminVisaApplications")
            .Produces<AdminVisaApplicationPageDto>();

        group.MapPost("/visa-applications/{id:guid}/status", UpdateVisaApplicationStatusAsync)
            .WithName("Internal.UpdateAdminVisaApplicationStatus")
            .Produces<bool>();

        group.MapGet("/flights/routes", ListFlightRoutesAsync)
            .WithName("Internal.ListAdminFlightRoutes")
            .Produces<AdminFlightPageDto>();

        group.MapGet("/flights/references", ListFlightReferencesAsync)
            .WithName("Internal.ListAdminFlightReferences")
            .Produces<FlightReferenceDto>();

        group.MapPost("/flights/routes", CreateFlightRouteAsync)
            .WithName("Internal.CreateAdminFlightRoute")
            .Produces<Guid>(StatusCodes.Status201Created);

        group.MapGet("/flights/routes/{id:guid}", GetFlightRouteAsync)
            .WithName("Internal.GetAdminFlightRoute")
            .Produces<AdminFlightRouteDetailDto>();

        group.MapPut("/flights/routes/{id:guid}", UpdateFlightRouteAsync)
            .WithName("Internal.UpdateAdminFlightRoute")
            .Produces<bool>();

        group.MapPost("/flights/airlines", CreateFlightAirlineAsync)
            .WithName("Internal.CreateAdminFlightAirline")
            .Produces<Guid>(StatusCodes.Status201Created);

        group.MapPost("/flights/airports", CreateFlightAirportAsync)
            .WithName("Internal.CreateAdminFlightAirport")
            .Produces<Guid>(StatusCodes.Status201Created);

        group.MapGet("/hotels", ListHotelsAsync)
            .WithName("Internal.ListAdminHotels")
            .Produces<PagedAdminHotelsResponse>();

        group.MapPost("/hotels", CreateHotelAsync)
            .WithName("Internal.CreateAdminHotel")
            .Produces<HotelDto>(StatusCodes.Status201Created);

        group.MapGet("/hotels/{id:guid}", GetHotelAsync)
            .WithName("Internal.GetAdminHotel")
            .Produces<HotelDto>();

        group.MapPut("/hotels/{id:guid}", UpdateHotelAsync)
            .WithName("Internal.UpdateAdminHotel")
            .Produces<HotelDto>();

        group.MapPost("/hotels/{id:guid}/publish", PublishHotelAsync)
            .WithName("Internal.PublishAdminHotel")
            .Produces<HotelDto>();

        return app;
    }

    private static async Task<IResult> ListHotelsAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? locale,
        IAdminCatalogService catalog,
        CancellationToken cancellationToken)
        => Results.Ok(await catalog.ListAsync(
            page,
            pageSize,
            q,
            locale,
            cancellationToken));

    private static async Task<IResult> ListVisaCountriesAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        IAdminVisaService visas,
        CancellationToken cancellationToken)
        => Results.Ok(await visas.ListCountriesAsync(page, pageSize, q, cancellationToken));

    private static async Task<IResult> CreateVisaCountryAsync(
        AdminVisaCountryRequest request,
        HttpContext context,
        IAdminVisaService visas,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await visas.CreateCountryAsync(
            new AdminVisaCountryInput(
                request.Slug,
                request.CountryCode,
                request.CoverImageUrl,
                request.Translations.Select(item => new AdminVisaTranslationInput(
                    item.Locale,
                    item.Name,
                    item.Description)).ToArray(),
                request.Types.Select(item => new AdminVisaTypeInput(
                    item.Code,
                    item.EntryType,
                    item.IssuanceType,
                    item.ProcessingDaysMin,
                    item.ProcessingDaysMax,
                    item.ValidityDays,
                    item.PriceAdult,
                    item.PriceChild,
                    item.Currency)).ToArray()),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.visa.country.created",
            "VisaCountry",
            result.Value.ToString(),
            "Visa country created from the admin panel",
            after: new { request.Slug, request.CountryCode },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/catalog/visas/{result.Value}",
            result.Value);
    }

    private static async Task<IResult> ListVisaApplicationsAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? status,
        IAdminVisaService visas,
        CancellationToken cancellationToken)
        => Results.Ok(await visas.ListApplicationsAsync(
            page,
            pageSize,
            status,
            cancellationToken));

    private static async Task<IResult> UpdateVisaApplicationStatusAsync(
        Guid id,
        AdminVisaApplicationStatusRequest request,
        HttpContext context,
        IAdminVisaService visas,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await visas.UpdateApplicationStatusAsync(
            id,
            request.Status,
            request.RejectionReason,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.visa.application.status_changed",
            "VisaApplication",
            id.ToString(),
            "Visa application status changed from the admin panel",
            after: new { request.Status },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ListFlightRoutesAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        IAdminFlightService flights,
        CancellationToken cancellationToken)
        => Results.Ok(await flights.ListRoutesAsync(page, pageSize, q, cancellationToken));

    private static async Task<IResult> ListFlightReferencesAsync(
        IAdminFlightService flights,
        CancellationToken cancellationToken)
        => Results.Ok(await flights.ListReferencesAsync(cancellationToken));

    private static async Task<IResult> CreateFlightRouteAsync(
        AdminFlightRouteRequest request,
        HttpContext context,
        IAdminFlightService flights,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await flights.CreateRouteAsync(
            new AdminFlightRouteInput(
                request.Slug,
                request.OriginCode,
                request.DestinationCode,
                request.OriginCity,
                request.DestinationCity,
                request.IsActive,
                request.Offers.Select(offer => new AdminFlightOfferInput(
                    offer.FlightNumber,
                    offer.AirlineCode,
                    offer.AirlineName,
                    offer.DepartureDate,
                    offer.DepartureTime,
                    offer.ArrivalTime,
                    offer.DurationMinutes,
                    offer.Stops,
                    offer.Cabin,
                    offer.BaggageAllowance,
                    offer.Price,
                    offer.Currency,
                    offer.Provider,
                    offer.DeepLink)).ToArray()),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.flight.route.created",
            "FlightRoute",
            result.Value.ToString(),
            "Flight route created from the admin panel",
            after: new { request.Slug, request.OriginCode, request.DestinationCode },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/catalog/flights/routes/{result.Value}",
            result.Value);
    }

    private static async Task<IResult> CreateFlightAirlineAsync(
        AdminAirlineRequest request,
        HttpContext context,
        IAdminFlightService flights,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await flights.CreateAirlineAsync(
            request.Iata,
            request.Name,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.flight.airline.created",
            "Airline",
            result.Value.ToString(),
            "Airline created from the admin panel",
            after: request,
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/catalog/flights/airlines/{result.Value}",
            result.Value);
    }

    private static async Task<IResult> CreateFlightAirportAsync(
        AdminAirportRequest request,
        HttpContext context,
        IAdminFlightService flights,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await flights.CreateAirportAsync(
            request.Iata,
            request.Name,
            request.City,
            request.CountryCode,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.flight.airport.created",
            "Airport",
            result.Value.ToString(),
            "Airport created from the admin panel",
            after: request,
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/catalog/flights/airports/{result.Value}",
            result.Value);
    }

    private static async Task<IResult> ListToursAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? status,
        IAdminTourService tours,
        CancellationToken cancellationToken)
        => Results.Ok(await tours.ListToursAsync(page, pageSize, q, status, cancellationToken));


    private static async Task<IResult> GetTourAsync(
        Guid id,
        IAdminTourService tours,
        CancellationToken cancellationToken)
    {
        var tour = await tours.GetTourAsync(id, cancellationToken);
        return tour is null ? Results.NotFound() : Results.Ok(tour);
    }

    private static async Task<IResult> UpdateTourAsync(
        Guid id,
        AdminTourUpdateRequest request,
        HttpContext context,
        IAdminTourService tours,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await tours.UpdateTourAsync(
            id,
            new AdminTourUpdateInput(
                request.DurationDays,
                request.TourType,
                request.Scope,
                request.Category,
                request.TravelType,
                request.CoverImageUrl,
                request.Translations.Select(item => new AdminTourTranslationInput(
                    item.Locale,
                    item.Title,
                    item.Summary,
                    item.Description)).ToArray()),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.tour.updated",
            "TourProduct",
            id.ToString(),
            "Tour product updated from the admin panel",
            after: new { request.DurationDays, request.TourType, request.Scope },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> GetVisaCountryAsync(
        Guid id,
        IAdminVisaService visas,
        CancellationToken cancellationToken)
    {
        var visa = await visas.GetCountryAsync(id, cancellationToken);
        return visa is null ? Results.NotFound() : Results.Ok(visa);
    }

    private static async Task<IResult> UpdateVisaCountryAsync(
        Guid id,
        AdminVisaCountryUpdateRequest request,
        HttpContext context,
        IAdminVisaService visas,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await visas.UpdateCountryAsync(
            id,
            new AdminVisaCountryUpdateInput(
                request.CountryCode,
                request.CoverImageUrl,
                request.Translations.Select(item => new AdminVisaTranslationInput(
                    item.Locale,
                    item.Name,
                    item.Description)).ToArray(),
                request.Types.Select(item => new AdminVisaTypeUpdateInput(
                    item.Id,
                    item.Code,
                    item.EntryType,
                    item.IssuanceType,
                    item.ProcessingDaysMin,
                    item.ProcessingDaysMax,
                    item.ValidityDays,
                    item.PriceAdult,
                    item.PriceChild,
                    item.Currency)).ToArray()),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.visa.updated",
            "VisaCountry",
            id.ToString(),
            "Visa country updated from the admin panel",
            after: new { request.CountryCode },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> GetFlightRouteAsync(
        Guid id,
        IAdminFlightService flights,
        CancellationToken cancellationToken)
    {
        var route = await flights.GetRouteAsync(id, cancellationToken);
        return route is null ? Results.NotFound() : Results.Ok(route);
    }

    private static async Task<IResult> UpdateFlightRouteAsync(
        Guid id,
        AdminFlightRouteRequest request,
        HttpContext context,
        IAdminFlightService flights,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await flights.UpdateRouteAsync(
            id,
            new AdminFlightRouteInput(
                request.Slug,
                request.OriginCode,
                request.DestinationCode,
                request.OriginCity,
                request.DestinationCity,
                request.IsActive,
                request.Offers.Select(offer => new AdminFlightOfferInput(
                    offer.FlightNumber,
                    offer.AirlineCode,
                    offer.AirlineName,
                    offer.DepartureDate,
                    offer.DepartureTime,
                    offer.ArrivalTime,
                    offer.DurationMinutes,
                    offer.Stops,
                    offer.Cabin,
                    offer.BaggageAllowance,
                    offer.Price,
                    offer.Currency,
                    offer.Provider,
                    offer.DeepLink)).ToArray()),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.flight.route.updated",
            "FlightRoute",
            id.ToString(),
            "Flight route updated from the admin panel",
            after: new { request.Slug, request.OriginCode, request.DestinationCode },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> CreateTourAsync(
        AdminTourCreateRequest request,
        HttpContext context,
        IAdminTourService tours,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await tours.CreateAsync(
            new AdminTourCreateInput(
                request.Slug,
                request.DurationDays,
                request.TourType,
                request.Scope,
                request.Category,
                request.TravelType,
                request.CoverImageUrl,
                request.DestinationIds,
                request.Translations.Select(item => new AdminTourTranslationInput(
                    item.Locale,
                    item.Title,
                    item.Summary,
                    item.Description)).ToArray()),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.tour.created",
            "TourProduct",
            result.Value.ToString(),
            "Tour product created from the admin panel",
            after: new { request.Slug, request.DurationDays, request.TourType },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/catalog/tours/{result.Value}",
            result.Value);
    }

    private static async Task<IResult> PublishTourAsync(
        Guid id,
        HttpContext context,
        IAdminTourService tours,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await tours.PublishTourAsync(id, cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.tour.published",
            "TourProduct",
            id.ToString(),
            "Tour product published from the admin panel",
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> CreateHotelAsync(
        CreateHotelRequest request,
        HttpContext context,
        IAdminCatalogService catalog,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await catalog.CreateAsync(ToInput(request), cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "catalog.hotel.created",
            "Hotel",
            result.Value!.HotelId.ToString(),
            "Hotel created from the admin panel",
            after: new { request.Slug, request.Stars, request.Status },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/catalog/hotels/{result.Value.HotelId}",
            result.Value);
    }

    private static async Task<IResult> GetHotelAsync(
        Guid id,
        IAdminCatalogService catalog,
        CancellationToken cancellationToken)
    {
        var hotel = await catalog.GetAsync(id, cancellationToken);
        return hotel is null ? Results.NotFound() : Results.Ok(hotel);
    }

    private static async Task<IResult> UpdateHotelAsync(
        Guid id,
        CreateHotelRequest request,
        IAdminCatalogService catalog,
        CancellationToken cancellationToken)
    {
        var input = ToInput(request);
        var hotel = await catalog.UpdateAsync(id, input, cancellationToken);
        return hotel is null ? Results.NotFound() : Results.Ok(hotel);
    }

    private static async Task<IResult> PublishHotelAsync(
        Guid id,
        IAdminCatalogService catalog,
        CancellationToken cancellationToken)
    {
        var hotel = await catalog.PublishAsync(id, cancellationToken);
        return hotel is null ? Results.NotFound() : Results.Ok(hotel);
    }

    private static AdminHotelUpdateInput ToInput(CreateHotelRequest request)
    {
        var propertyType = Enum.TryParse<HotelPropertyType>(
            request.PropertyType,
            true,
            out var parsedType)
            ? parsedType
            : HotelPropertyType.Hotel;
        var status = Enum.TryParse<HotelStatus>(request.Status, true, out var parsedStatus)
            ? parsedStatus
            : HotelStatus.Draft;

        return new AdminHotelUpdateInput(
            request.Slug,
            request.DestinationId,
            request.Stars,
            request.Address,
            request.Latitude,
            request.Longitude,
            request.Translations.Select(item =>
                new HotelTranslationInput(
                    item.Locale,
                    item.Name,
                    item.Description,
                    item.Policies)).ToArray(),
            request.Amenities.Select(item =>
                new HotelAmenityInput(
                    item.Category,
                    item.Name,
                    item.Code,
                    item.Icon,
                    item.SortOrder)).ToArray(),
            (request.Images ?? []).Select(item =>
                new HotelImageInput(
                    item.Url,
                    item.Caption,
                    item.SortOrder,
                    item.Category,
                    item.AltText,
                    item.IsCover,
                    item.Source,
                    item.MediaAssetId)).ToArray(),
            (request.Rooms ?? []).Select(item =>
                new HotelRoomInput(
                    item.Name,
                    item.RoomType,
                    item.MealPlan,
                    item.Adults,
                    item.Children,
                    item.Price,
                    item.Currency,
                    item.Description,
                    item.SortOrder,
                    item.Inventory,
                    item.MaxOccupancy,
                    item.RoomSize,
                    item.BedType,
                    item.View,
                    item.RatePlan,
                    item.CancellationPolicy,
                    item.TaxPercent,
                    item.StopSell)).ToArray(),
            propertyType,
            request.ContactPhone,
            request.WebsiteUrl,
            request.CheckInTime,
            request.CheckOutTime,
            status,
            request.SeoTitle,
            request.SeoDescription);
    }
}


/// <summary>Tour product creation request.</summary>
public sealed record AdminTourCreateRequest(
    string Slug,
    int DurationDays,
    string TourType,
    string Scope,
    string Category,
    string TravelType,
    string? CoverImageUrl,
    IReadOnlyList<Guid> DestinationIds,
    IReadOnlyList<AdminTourTranslationRequest> Translations);

/// <summary>Localized tour translation request.</summary>
public sealed record AdminTourTranslationRequest(
    string Locale,
    string Title,
    string Summary,
    string Description);


/// <summary>Flight route creation request.</summary>
public sealed record AdminFlightRouteRequest(
    string Slug,
    string OriginCode,
    string DestinationCode,
    string OriginCity,
    string DestinationCity,
    bool IsActive,
    IReadOnlyList<AdminFlightOfferRequest> Offers);

/// <summary>Flight offer creation request.</summary>
public sealed record AdminFlightOfferRequest(
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
    string DeepLink);

/// <summary>Airline creation request.</summary>
public sealed record AdminAirlineRequest(string Iata, string Name);

/// <summary>Airport creation request.</summary>
public sealed record AdminAirportRequest(
    string Iata,
    string Name,
    string City,
    string CountryCode);


/// <summary>Visa country creation request.</summary>
public sealed record AdminVisaCountryRequest(
    string Slug,
    string CountryCode,
    string? CoverImageUrl,
    IReadOnlyList<AdminVisaTranslationRequest> Translations,
    IReadOnlyList<AdminVisaTypeRequest> Types);

/// <summary>Visa translation request.</summary>
public sealed record AdminVisaTranslationRequest(
    string Locale,
    string Name,
    string? Description);

/// <summary>Visa type request.</summary>
public sealed record AdminVisaTypeRequest(
    string Code,
    string EntryType,
    string IssuanceType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency);

/// <summary>Tour product edit request.</summary>
public sealed record AdminTourUpdateRequest(
    int DurationDays,
    string TourType,
    string Scope,
    string Category,
    string TravelType,
    string? CoverImageUrl,
    IReadOnlyList<AdminTourTranslationRequest> Translations);

/// <summary>Visa country edit request.</summary>
public sealed record AdminVisaCountryUpdateRequest(
    string CountryCode,
    string? CoverImageUrl,
    IReadOnlyList<AdminVisaTranslationRequest> Translations,
    IReadOnlyList<AdminVisaTypeUpdateRequest> Types);

/// <summary>Visa type edit request.</summary>
public sealed record AdminVisaTypeUpdateRequest(
    Guid? Id,
    string Code,
    string EntryType,
    string IssuanceType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency);

/// <summary>Visa application status request.</summary>
public sealed record AdminVisaApplicationStatusRequest(
    string Status,
    string? RejectionReason);

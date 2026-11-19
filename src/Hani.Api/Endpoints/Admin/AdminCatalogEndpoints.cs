using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
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

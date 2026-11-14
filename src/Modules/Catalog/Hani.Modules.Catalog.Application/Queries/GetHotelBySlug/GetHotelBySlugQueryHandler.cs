using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Domain.Hotels;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;

internal sealed class GetHotelBySlugQueryHandler(
    IHotelRepository hotels,
    IReviewSummaryReadService reviewSummaries,
    IReviewMediaReadService reviewMedia)
    : IQueryHandler<GetHotelBySlugQuery, HotelDto>
{
    public async Task<Result<HotelDto>> Handle(
        GetHotelBySlugQuery request,
        CancellationToken cancellationToken)
    {
        var hotel = await hotels.GetBySlugAsync(request.Slug, cancellationToken);

        if (hotel is null)
        {
            return Result<HotelDto>.Failure(
                Error.NotFound("HANI-CATALOG-1420", "Hotel was not found."));
        }

        var summaries = await reviewSummaries.GetSummariesAsync(
            "Hotel",
            [hotel.Id],
            cancellationToken);
        summaries.TryGetValue(hotel.Id, out var summary);
        var media = await reviewMedia.GetPhotoUrlsAsync(
            "Hotel",
            [hotel.Id],
            cancellationToken);
        var cityHotels = await hotels.ListByDestinationAsync(hotel.DestinationId, cancellationToken);
        var citySummaries = await reviewSummaries.GetSummariesAsync(
            "Hotel",
            cityHotels.Select(item => item.Id).ToArray(),
            cancellationToken);
        var rank = cityHotels
            .OrderByDescending(item => citySummaries.TryGetValue(item.Id, out var value)
                ? value.AverageRating
                : 0m)
            .ThenByDescending(item => item.Stars)
            .ThenBy(item => item.Slug)
            .Select((item, index) => new { item.Id, Rank = index + 1 })
            .First(item => item.Id == hotel.Id)
            .Rank;

        return Result<HotelDto>.Success(Map(
            hotel,
            summary,
            rank,
            media.Select(item => item.Url).ToArray()));
    }

    private static HotelDto Map(
        Hotel hotel,
        ReviewSummary? summary,
        int rank,
        IReadOnlyList<string> userPhotos)
        => new(
            hotel.Id,
            hotel.Slug,
            hotel.DestinationId,
            hotel.Stars,
            hotel.Address,
            hotel.Latitude,
            hotel.Longitude,
            hotel.Translations
                .Select(item => new HotelTranslationDto(item.Locale, item.Name, item.Description))
                .ToArray(),
            hotel.Amenities
                .Select(item => new HotelAmenityDto(item.Category, item.Name))
                .ToArray(),
            hotel.Images
                .OrderBy(item => item.SortOrder)
                .Select(item => new HotelImageDto(item.Url, item.Caption, item.SortOrder))
                .ToArray(),
            hotel.Rooms
                .OrderBy(item => item.SortOrder)
                .Select(item => new HotelRoomDto(
                    item.Name,
                    item.RoomType,
                    item.MealPlan,
                    item.Adults,
                    item.Children,
                    item.Price,
                    item.Currency,
                    item.Description,
                    item.SortOrder))
                .ToArray(),
            summary?.AverageRating,
            summary?.ReviewCount ?? 0,
            summary is null || summary.ReviewCount == 0
                ? null
                : Math.Round(summary.RecommendedCount * 100m / summary.ReviewCount, 1),
            rank,
            userPhotos);
}

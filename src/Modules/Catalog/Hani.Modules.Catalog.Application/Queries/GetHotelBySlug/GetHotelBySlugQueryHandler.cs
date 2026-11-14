using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Domain.Hotels;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;

internal sealed class GetHotelBySlugQueryHandler(
    IHotelRepository hotels,
    IReviewSummaryReadService reviewSummaries)
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

        return Result<HotelDto>.Success(Map(hotel, summary));
    }

    private static HotelDto Map(Hotel hotel, ReviewSummary? summary)
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
            summary?.AverageRating,
            summary?.ReviewCount ?? 0);
}

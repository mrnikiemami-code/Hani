using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Domain.Hotels;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;

internal sealed class GetHotelBySlugQueryHandler(IHotelRepository hotels)
    : IQueryHandler<GetHotelBySlugQuery, HotelDto>
{
    public async Task<Result<HotelDto>> Handle(
        GetHotelBySlugQuery request,
        CancellationToken cancellationToken)
    {
        var hotel = await hotels.GetBySlugAsync(request.Slug, cancellationToken);

        return hotel is null
            ? Result<HotelDto>.Failure(Error.NotFound("HANI-CATALOG-1420", "Hotel was not found."))
            : Result<HotelDto>.Success(Map(hotel));
    }

    private static HotelDto Map(Hotel hotel)
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
                .ToArray());
}

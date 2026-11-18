using Hani.Modules.Admin.Application;
using Hani.Modules.Catalog.Domain.Hotels;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IHotelFacetService
{
    public async Task<HotelFacetsDto> GetFacetsAsync(CancellationToken cancellationToken)
    {
        var hotels = await catalog.Hotels
            .AsNoTracking()
            .Include(hotel => hotel.Amenities)
            .Where(hotel => hotel.Status == HotelStatus.Published)
            .ToArrayAsync(cancellationToken);

        var stars = Enumerable.Range(1, 5)
            .Select(star => new HotelStarFacet(star, hotels.Count(hotel => hotel.Stars == star)))
            .ToArray();
        var amenities = hotels
            .SelectMany(hotel => hotel.Amenities)
            .GroupBy(amenity => new
            {
                amenity.Category,
                amenity.Code,
                amenity.Name
            })
            .Select(group => new HotelAmenityFacet(
                group.Key.Category,
                group.Key.Code,
                group.Key.Name,
                group.Select(item => item.HotelId).Distinct().Count()))
            .OrderBy(item => item.Category)
            .ThenByDescending(item => item.Count)
            .ThenBy(item => item.Name)
            .ToArray();

        return new HotelFacetsDto(hotels.Length, stars, amenities);
    }
}

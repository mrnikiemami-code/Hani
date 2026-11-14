using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Application.Commands.CreatePlace;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Queries.GetPlaceBySlug;

internal sealed class GetPlaceBySlugQueryHandler(IPlaceRepository places)
    : IQueryHandler<GetPlaceBySlugQuery, PlaceDto>
{
    public async Task<Result<PlaceDto>> Handle(
        GetPlaceBySlugQuery request,
        CancellationToken cancellationToken)
    {
        var place = await places.GetBySlugAsync(request.Slug, cancellationToken);
        return place is null
            ? Result<PlaceDto>.Failure(Error.NotFound("HANI-CATALOG-1520", "Place was not found."))
            : Result<PlaceDto>.Success(PlaceMappings.ToDto(place));
    }
}

internal sealed class GetNearbyPlacesQueryHandler(IPlaceRepository places)
    : IQueryHandler<GetNearbyPlacesQuery, IReadOnlyList<NearbyPlaceDto>>
{
    public async Task<Result<IReadOnlyList<NearbyPlaceDto>>> Handle(
        GetNearbyPlacesQuery request,
        CancellationToken cancellationToken)
    {
        if (request.RadiusKm is < 1 or > 100)
        {
            return Result<IReadOnlyList<NearbyPlaceDto>>.Failure(
                Error.Validation("HANI-CATALOG-1521", "Radius must be between 1 and 100 km."));
        }

        var items = await places.ListAsync(request.Type, cancellationToken);
        var results = items
            .Where(place => place.Latitude is not null && place.Longitude is not null)
            .Select(place => new NearbyPlaceDto(
                PlaceMappings.ToDto(place),
                Math.Round(
                    CalculateDistanceKm(
                        (double)request.Latitude,
                        (double)request.Longitude,
                        (double)place.Latitude!,
                        (double)place.Longitude!),
                    2)))
            .Where(item => item.DistanceKm <= request.RadiusKm)
            .OrderBy(item => item.DistanceKm)
            .Take(Math.Clamp(request.Limit, 1, 100))
            .ToArray();

        return Result<IReadOnlyList<NearbyPlaceDto>>.Success(results);
    }

    private static double CalculateDistanceKm(double lat1, double lon1, double lat2, double lon2)
    {
        const double earthRadiusKm = 6371;
        var dLat = ToRadians(lat2 - lat1);
        var dLon = ToRadians(lon2 - lon1);
        var a = (Math.Sin(dLat / 2) * Math.Sin(dLat / 2)) +
                (Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                 Math.Sin(dLon / 2) * Math.Sin(dLon / 2));
        return earthRadiusKm * 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
    }

    private static double ToRadians(double value) => value * (Math.PI / 180);
}

internal static class PlaceMappings
{
    public static PlaceDto ToDto(Place place)
        => new(
            place.Id,
            place.Slug,
            place.Type.ToString(),
            place.DestinationId,
            place.Category,
            place.Cuisine,
            place.PriceBand,
            place.Reservable,
            place.OnlineReservable,
            place.Latitude,
            place.Longitude,
            place.Translations
                .Select(item => new PlaceTranslationDto(item.Locale, item.Name, item.Description))
                .ToArray(),
            place.Amenities.Select(item => item.Name).ToArray());
}

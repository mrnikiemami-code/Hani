using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Queries.GetGeoNearby;

internal sealed class GetGeoNearbyQueryHandler(
    IHotelRepository hotels,
    IPlaceRepository places,
    IFlightReferenceRepository flightReferences,
    ILanguageCatalog languages)
    : IQueryHandler<GetGeoNearbyQuery, IReadOnlyList<GeoNearbyItemDto>>
{
    public async Task<Result<IReadOnlyList<GeoNearbyItemDto>>> Handle(
        GetGeoNearbyQuery request,
        CancellationToken cancellationToken)
    {
        if (request.RadiusKm is < 1 or > 100)
        {
            return Result<IReadOnlyList<GeoNearbyItemDto>>.Failure(
                Error.Validation("HANI-CATALOG-2001", "Radius must be between 1 and 100 km."));
        }

        var normalizedType = string.IsNullOrWhiteSpace(request.Type)
            ? null
            : request.Type.Trim().ToLowerInvariant();
        var locale = languages.Normalize(null);
        var results = new List<GeoNearbyItemDto>();

        if (normalizedType is null or "hotel")
        {
            var hotelItems = await hotels.ListWithCoordinatesAsync(cancellationToken);
            results.AddRange(hotelItems.Select(hotel => new GeoNearbyItemDto(
                "Hotel",
                hotel.Id,
                hotel.Slug,
                ResolveName(hotel.Translations, locale, languages, hotel.Slug),
                hotel.Latitude!.Value,
                hotel.Longitude!.Value,
                Distance(
                    (double)request.Latitude,
                    (double)request.Longitude,
                    (double)hotel.Latitude,
                    (double)hotel.Longitude))));
        }

        if (normalizedType is null or "restaurant" or "attraction" or "place")
        {
            PlaceType? placeType = normalizedType switch
            {
                "restaurant" => PlaceType.Restaurant,
                "attraction" => PlaceType.Attraction,
                _ => null
            };

            var placeItems = await places.ListAsync(placeType, cancellationToken);
            results.AddRange(placeItems
                .Where(place => place.Latitude is not null && place.Longitude is not null)
                .Select(place => new GeoNearbyItemDto(
                    place.Type.ToString(),
                    place.Id,
                    place.Slug,
                    ResolveName(place.Translations, locale, languages, place.Slug),
                    place.Latitude!.Value,
                    place.Longitude!.Value,
                    Distance(
                        (double)request.Latitude,
                        (double)request.Longitude,
                        (double)place.Latitude,
                        (double)place.Longitude))));
        }

        if (normalizedType is null or "airport")
        {
            var airportItems = await flightReferences.ListAirportsAsync(cancellationToken);
            results.AddRange(airportItems
                .Where(airport => airport.Latitude is not null && airport.Longitude is not null)
                .Select(airport => new GeoNearbyItemDto(
                    "Airport",
                    airport.Id,
                    airport.Iata.ToLowerInvariant(),
                    $"{airport.Name} ({airport.Iata})",
                    airport.Latitude!.Value,
                    airport.Longitude!.Value,
                    Distance(
                        (double)request.Latitude,
                        (double)request.Longitude,
                        (double)airport.Latitude,
                        (double)airport.Longitude))));
        }

        return Result<IReadOnlyList<GeoNearbyItemDto>>.Success(
            results
                .Select(item => item with { DistanceKm = Math.Round(item.DistanceKm, 2) })
                .Where(item => item.DistanceKm <= request.RadiusKm)
                .OrderBy(item => item.DistanceKm)
                .Take(Math.Clamp(request.Limit, 1, 100))
                .ToArray());
    }

    private static string ResolveName(
        IEnumerable<HotelTranslation> translations,
        string locale,
        ILanguageCatalog languages,
        string fallback)
        => translations.FirstOrDefault(item => item.Locale == locale)?.Name
            ?? translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)?.Name
            ?? translations.FirstOrDefault()?.Name
            ?? fallback;

    private static string ResolveName(
        IEnumerable<PlaceTranslation> translations,
        string locale,
        ILanguageCatalog languages,
        string fallback)
        => translations.FirstOrDefault(item => item.Locale == locale)?.Name
            ?? translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)?.Name
            ?? translations.FirstOrDefault()?.Name
            ?? fallback;

    private static double Distance(double lat1, double lon1, double lat2, double lon2)
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

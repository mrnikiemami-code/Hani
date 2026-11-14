using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Application.Commands.CreatePlace;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Queries.GetPlaceBySlug;

internal sealed class GetPlaceBySlugQueryHandler(
    IPlaceRepository places,
    IReviewSummaryReadService reviewSummaries,
    IReviewMediaReadService reviewMedia)
    : IQueryHandler<GetPlaceBySlugQuery, PlaceDto>
{
    public async Task<Result<PlaceDto>> Handle(
        GetPlaceBySlugQuery request,
        CancellationToken cancellationToken)
    {
        var place = await places.GetBySlugAsync(request.Slug, cancellationToken);

        if (place is null)
        {
            return Result<PlaceDto>.Failure(
                Error.NotFound("HANI-CATALOG-1520", "Place was not found."));
        }

        var summaries = await reviewSummaries.GetSummariesAsync(
            place.Type.ToString(),
            [place.Id],
            cancellationToken);
        summaries.TryGetValue(place.Id, out var summary);
        var media = await reviewMedia.GetPhotoUrlsAsync(
            place.Type.ToString(),
            [place.Id],
            cancellationToken);
        var cityPlaces = await places.ListByDestinationAsync(
            place.DestinationId,
            place.Type,
            cancellationToken);
        var citySummaries = await reviewSummaries.GetSummariesAsync(
            place.Type.ToString(),
            cityPlaces.Select(item => item.Id).ToArray(),
            cancellationToken);
        var rank = cityPlaces
            .OrderByDescending(item => citySummaries.TryGetValue(item.Id, out var value)
                ? value.AverageRating
                : 0m)
            .ThenBy(item => item.Slug)
            .Select((item, index) => new { item.Id, Rank = index + 1 })
            .First(item => item.Id == place.Id)
            .Rank;

        return Result<PlaceDto>.Success(PlaceMappings.ToDto(
            place,
            summary,
            rank,
            media.Select(item => item.Url).ToArray()));
    }
}

internal sealed class GetNearbyPlacesQueryHandler(
    IPlaceRepository places,
    IReviewSummaryReadService reviewSummaries)
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
        var summaries = await reviewSummaries.GetSummariesAsync(
            request.Type?.ToString() ?? "Restaurant",
            items.Select(place => place.Id).ToArray(),
            cancellationToken);
        var results = items
            .Where(place => place.Latitude is not null && place.Longitude is not null)
            .Select(place =>
            {
                summaries.TryGetValue(place.Id, out var summary);

                return new NearbyPlaceDto(
                    PlaceMappings.ToDto(place, summary),
                    Math.Round(
                        CalculateDistanceKm(
                            (double)request.Latitude,
                            (double)request.Longitude,
                            (double)place.Latitude!,
                            (double)place.Longitude!),
                        2));
            })
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
    public static PlaceDto ToDto(
        Place place,
        ReviewSummary? summary = null,
        int? rank = null,
        IReadOnlyList<string>? userPhotos = null)
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
            place.Amenities.Select(item => item.Name).ToArray(),
            place.MenuItems
                .OrderBy(item => item.Section)
                .ThenBy(item => item.SortOrder)
                .Select(item => new PlaceMenuItemDto(
                    item.Section,
                    item.Name,
                    item.Description,
                    item.Price,
                    item.Currency,
                    item.SortOrder))
                .ToArray(),
            place.MealPeriods.Select(item => item.Name).ToArray(),
            place.DietaryOptions.Select(item => item.Name).ToArray(),
            summary?.AverageRating,
            summary?.ReviewCount ?? 0,
            summary is null || summary.ReviewCount == 0
                ? null
                : Math.Round(summary.RecommendedCount * 100m / summary.ReviewCount, 1),
            rank,
            userPhotos ?? []);
}

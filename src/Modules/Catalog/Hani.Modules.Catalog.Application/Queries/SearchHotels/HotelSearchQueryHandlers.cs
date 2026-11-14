using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Hotels;

namespace Hani.Modules.Catalog.Application.Queries.SearchHotels;

internal sealed class SearchHotelsQueryHandler(
    IHotelRepository hotels,
    ILanguageCatalog languages,
    IReviewSummaryReadService reviewSummaries)
    : IQueryHandler<SearchHotelsQuery, PagedResult<HotelSummaryDto>>
{
    public async Task<Result<PagedResult<HotelSummaryDto>>> Handle(
        SearchHotelsQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var filter = new HotelFilter(
            request.DestinationSlug,
            request.MinStars,
            request.Amenity,
            request.Q);

        var items = await hotels.SearchAsync(
            filter,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await hotels.CountAsync(filter, cancellationToken);
        var locale = languages.Normalize(request.Locale);
        var summaries = await reviewSummaries.GetSummariesAsync(
            "Hotel",
            items.Select(hotel => hotel.Id).ToArray(),
            cancellationToken);

        if (string.Equals(request.SortBy, "rating", StringComparison.OrdinalIgnoreCase))
        {
            items = await hotels.SearchAsync(filter, 0, 200, cancellationToken);
            summaries = await reviewSummaries.GetSummariesAsync(
                "Hotel",
                items.Select(hotel => hotel.Id).ToArray(),
                cancellationToken);
            items = items
                .OrderByDescending(hotel => summaries.TryGetValue(hotel.Id, out var value)
                    ? value.AverageRating
                    : 0m)
                .ThenByDescending(hotel => hotel.Stars)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToArray();
        }

        return Result<PagedResult<HotelSummaryDto>>.Success(
            new PagedResult<HotelSummaryDto>(
                items.Select(hotel => Map(hotel, locale, languages, summaries)).ToArray(),
                page,
                pageSize,
                total));
    }

    private static HotelSummaryDto Map(
        Hotel hotel,
        string locale,
        ILanguageCatalog languages,
        IReadOnlyDictionary<Guid, ReviewSummary> summaries)
    {
        var name = hotel.Translations.FirstOrDefault(item => item.Locale == locale)?.Name
            ?? hotel.Translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)?.Name
            ?? hotel.Translations.FirstOrDefault()?.Name
            ?? hotel.Slug;

        summaries.TryGetValue(hotel.Id, out var summary);

        return new HotelSummaryDto(
            hotel.Id,
            hotel.Slug,
            hotel.Stars,
            hotel.Address,
            hotel.Latitude,
            hotel.Longitude,
            name,
            hotel.Amenities.Count,
            summary?.AverageRating,
            summary?.ReviewCount ?? 0,
            RecommendedPercent(summary),
            null);
    }

    private static decimal? RecommendedPercent(ReviewSummary? summary)
        => summary is null || summary.ReviewCount == 0
            ? null
            : Math.Round(summary.RecommendedCount * 100m / summary.ReviewCount, 1);
}

internal sealed class GetNearbyHotelsQueryHandler(
    IHotelRepository hotels,
    ILanguageCatalog languages,
    IReviewSummaryReadService reviewSummaries)
    : IQueryHandler<GetNearbyHotelsQuery, IReadOnlyList<NearbyHotelDto>>
{
    public async Task<Result<IReadOnlyList<NearbyHotelDto>>> Handle(
        GetNearbyHotelsQuery request,
        CancellationToken cancellationToken)
    {
        if (request.RadiusKm is < 1 or > 100)
        {
            return Result<IReadOnlyList<NearbyHotelDto>>.Failure(
                Error.Validation("HANI-CATALOG-1601", "Radius must be between 1 and 100 km."));
        }

        var locale = languages.Normalize(null);
        var items = await hotels.ListWithCoordinatesAsync(cancellationToken);
        var summaries = await reviewSummaries.GetSummariesAsync(
            "Hotel",
            items.Select(hotel => hotel.Id).ToArray(),
            cancellationToken);
        var results = items
            .Select(hotel => new NearbyHotelDto(
                Map(hotel, locale, languages, summaries),
                Math.Round(
                    CalculateDistanceKm(
                        (double)request.Latitude,
                        (double)request.Longitude,
                        (double)hotel.Latitude!,
                        (double)hotel.Longitude!),
                    2)))
            .Where(item => item.DistanceKm <= request.RadiusKm)
            .OrderBy(item => item.DistanceKm)
            .Take(Math.Clamp(request.Limit, 1, 100))
            .ToArray();

        return Result<IReadOnlyList<NearbyHotelDto>>.Success(results);
    }

    private static HotelSummaryDto Map(
        Hotel hotel,
        string locale,
        ILanguageCatalog languages,
        IReadOnlyDictionary<Guid, ReviewSummary> summaries)
    {
        var name = hotel.Translations.FirstOrDefault(item => item.Locale == locale)?.Name
            ?? hotel.Translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)?.Name
            ?? hotel.Translations.FirstOrDefault()?.Name
            ?? hotel.Slug;

        summaries.TryGetValue(hotel.Id, out var summary);

        return new HotelSummaryDto(
            hotel.Id,
            hotel.Slug,
            hotel.Stars,
            hotel.Address,
            hotel.Latitude,
            hotel.Longitude,
            name,
            hotel.Amenities.Count,
            summary?.AverageRating,
            summary?.ReviewCount ?? 0,
            RecommendedPercent(summary),
            null);
    }

    private static decimal? RecommendedPercent(ReviewSummary? summary)
        => summary is null || summary.ReviewCount == 0
            ? null
            : Math.Round(summary.RecommendedCount * 100m / summary.ReviewCount, 1);

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

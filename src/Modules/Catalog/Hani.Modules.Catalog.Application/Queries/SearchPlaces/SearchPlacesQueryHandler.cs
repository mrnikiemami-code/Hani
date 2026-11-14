using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Queries.SearchPlaces;

internal sealed class SearchPlacesQueryHandler(
    IPlaceRepository places,
    ILanguageCatalog languages,
    IReviewSummaryReadService reviewSummaries)
    : IQueryHandler<SearchPlacesQuery, PagedResult<PlaceSummaryDto>>
{
    public async Task<Result<PagedResult<PlaceSummaryDto>>> Handle(
        SearchPlacesQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var filter = new PlaceFilter(
            request.Type,
            request.DestinationSlug,
            request.Category,
            request.Cuisine,
            request.PriceBand,
            request.Amenity,
            request.Reservable,
            request.OnlineReservable,
            request.MealPeriod,
            request.DietaryOption,
            request.Q);

        var items = await places.SearchAsync(
            filter,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await places.CountAsync(filter, cancellationToken);
        var locale = languages.Normalize(request.Locale);
        var summaries = await reviewSummaries.GetSummariesAsync(
            request.Type?.ToString() ?? "Restaurant",
            items.Select(place => place.Id).ToArray(),
            cancellationToken);

        if (string.Equals(request.SortBy, "rating", StringComparison.OrdinalIgnoreCase))
        {
            items = await places.SearchAsync(filter, 0, 200, cancellationToken);
            summaries = await reviewSummaries.GetSummariesAsync(
                request.Type?.ToString() ?? "Restaurant",
                items.Select(place => place.Id).ToArray(),
                cancellationToken);
            items = items
                .OrderByDescending(place => summaries.TryGetValue(place.Id, out var value)
                    ? value.AverageRating
                    : 0m)
                .ThenBy(place => place.Slug)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToArray();
        }

        return Result<PagedResult<PlaceSummaryDto>>.Success(
            new PagedResult<PlaceSummaryDto>(
                items.Select(place => Map(place, locale, languages, summaries)).ToArray(),
                page,
                pageSize,
                total));
    }

    private static PlaceSummaryDto Map(
        Place place,
        string locale,
        ILanguageCatalog languages,
        IReadOnlyDictionary<Guid, ReviewSummary> summaries)
    {
        var name = place.Translations.FirstOrDefault(item => item.Locale == locale)?.Name
            ?? place.Translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)?.Name
            ?? place.Translations.FirstOrDefault()?.Name
            ?? place.Slug;

        summaries.TryGetValue(place.Id, out var summary);

        return new PlaceSummaryDto(
            place.Id,
            place.Slug,
            place.Type.ToString(),
            place.Category,
            place.Cuisine,
            place.PriceBand,
            place.Reservable,
            place.OnlineReservable,
            place.Latitude,
            place.Longitude,
            name,
            place.Amenities.Count,
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

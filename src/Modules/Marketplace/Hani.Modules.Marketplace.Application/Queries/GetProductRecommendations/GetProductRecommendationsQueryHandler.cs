using Hani.BuildingBlocks.Application;
using Hani.Contracts.Catalog;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductRecommendations;

internal sealed class GetProductRecommendationsQueryHandler(
    ICatalogReadService catalog,
    ILanguageCatalog languages)
    : IQueryHandler<GetProductRecommendationsQuery, IReadOnlyList<RecommendedProductDto>>
{
    public async Task<Result<IReadOnlyList<RecommendedProductDto>>> Handle(
        GetProductRecommendationsQuery request,
        CancellationToken cancellationToken)
    {
        var target = await catalog.GetPublishedByIdAsync(request.ProductId, cancellationToken);

        if (target is null)
        {
            return Result<IReadOnlyList<RecommendedProductDto>>.Failure(
                Error.NotFound("HANI-MARKET-1311", "Published product was not found."));
        }

        var candidates = await catalog.SearchPublishedAsync(
            new CatalogProductFilter(),
            0,
            200,
            cancellationToken);
        var locale = languages.Normalize(request.Locale);
        var targetDestinations = target.DestinationIds.ToHashSet();
        var limit = Math.Clamp(request.Limit, 1, 20);

        var recommendations = candidates
            .Where(candidate => candidate.Id != target.Id)
            .Select(candidate =>
            {
                var shared = candidate.DestinationIds.Count(targetDestinations.Contains);
                var score = (shared * 10m) +
                    (candidate.TravelType == target.TravelType ? 3m : 0m) +
                    (candidate.Category == target.Category ? 2m : 0m) -
                    (Math.Abs(candidate.DurationDays - target.DurationDays) * 0.1m);

                return new
                {
                    Candidate = candidate,
                    Shared = shared,
                    Score = score
                };
            })
            .OrderByDescending(item => item.Score)
            .ThenByDescending(item => item.Candidate.UpdatedAt)
            .Take(limit)
            .Select(item => new RecommendedProductDto(
                item.Candidate.Id,
                item.Candidate.Slug,
                Resolve(item.Candidate.Titles, locale, languages),
                item.Candidate.DurationDays,
                item.Candidate.TourType,
                item.Candidate.TravelType,
                item.Candidate.Category,
                item.Shared))
            .ToArray();

        return Result<IReadOnlyList<RecommendedProductDto>>.Success(recommendations);
    }

    private static string Resolve(
        IReadOnlyDictionary<string, string> titles,
        string locale,
        ILanguageCatalog languages)
        => titles.TryGetValue(locale, out var title)
            ? title
            : titles.TryGetValue(languages.DefaultLanguage, out var fallback)
                ? fallback
                : titles.Values.FirstOrDefault() ?? string.Empty;
}

using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductRecommendations;

/// <summary>
/// Query that returns related tours for one published product.
/// </summary>
public sealed record GetProductRecommendationsQuery(
    Guid ProductId,
    string? Locale = null,
    int Limit = 8) : IQuery<IReadOnlyList<RecommendedProductDto>>;

/// <summary>
/// Recommended tour summary.
/// </summary>
public sealed record RecommendedProductDto(
    Guid ProductId,
    string Slug,
    string Title,
    int DurationDays,
    string TourType,
    string TravelType,
    string Category,
    int SharedDestinationCount);

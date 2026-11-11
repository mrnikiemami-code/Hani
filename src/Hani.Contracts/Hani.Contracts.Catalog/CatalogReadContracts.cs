namespace Hani.Contracts.Catalog;

/// <summary>
/// Minimal published product projection used by marketplace reads.
/// </summary>
public sealed record CatalogProductSummary(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyDictionary<string, string> Titles,
    IReadOnlyList<Guid> DestinationIds,
    DateTimeOffset UpdatedAt);

/// <summary>
/// Published product details with localized marketing content.
/// </summary>
public sealed record CatalogProductDetails(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyDictionary<string, string> Titles,
    IReadOnlyDictionary<string, string> Summaries,
    IReadOnlyDictionary<string, string> Descriptions,
    IReadOnlyList<Guid> DestinationIds);

/// <summary>
/// Read-side contract exposed by the Catalog module.
/// </summary>
public interface ICatalogReadService
{
    /// <summary>
    /// Returns published products, optionally filtered by destination slug.
    /// </summary>
    Task<IReadOnlyList<CatalogProductSummary>> SearchPublishedAsync(
        string? destinationSlug,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts published products using the same filter as <see cref="SearchPublishedAsync"/>.
    /// </summary>
    Task<int> CountPublishedAsync(
        string? destinationSlug,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns one published product with all translations, or <c>null</c>.
    /// </summary>
    Task<CatalogProductDetails?> GetPublishedByIdAsync(
        Guid id,
        CancellationToken cancellationToken);
}

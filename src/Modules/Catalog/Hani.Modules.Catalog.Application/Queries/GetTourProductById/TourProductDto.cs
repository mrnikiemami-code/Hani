namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

/// <summary>
/// Localized tour product content returned to clients.
/// </summary>
public sealed record TourProductTranslationDto(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle,
    string? SeoDescription);

/// <summary>
/// Tour product read model returned to clients.
/// </summary>
public sealed record TourProductDto(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    string Status,
    DateTimeOffset CreatedAt,
    IReadOnlyList<TourProductTranslationDto> Translations,
    IReadOnlyList<Guid> DestinationIds);

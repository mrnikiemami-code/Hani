namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

public sealed record TourProductTranslationDto(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle,
    string? SeoDescription);

public sealed record TourProductDto(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    string Status,
    DateTimeOffset CreatedAt,
    IReadOnlyList<TourProductTranslationDto> Translations,
    IReadOnlyList<Guid> DestinationIds);

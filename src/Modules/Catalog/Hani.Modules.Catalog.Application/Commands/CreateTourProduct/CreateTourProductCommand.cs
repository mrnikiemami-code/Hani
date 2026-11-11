using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Commands.CreateTourProduct;

/// <summary>
/// Input translation for a tour product command.
/// </summary>
public sealed record TourProductTranslationInput(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>
/// Command that creates a shared tour product with translations.
/// </summary>
public sealed record CreateTourProductCommand(
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyList<TourProductTranslationInput> Translations,
    IReadOnlyList<Guid> DestinationIds) : ICommand<Guid>;

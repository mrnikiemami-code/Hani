using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Commands.CreateTourProduct;

public sealed record TourProductTranslationInput(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle = null,
    string? SeoDescription = null);

public sealed record CreateTourProductCommand(
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyList<TourProductTranslationInput> Translations,
    IReadOnlyList<Guid> DestinationIds) : ICommand<Guid>;

using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.Destinations;

namespace Hani.Modules.Catalog.Application.Commands.CreateDestination;

/// <summary>
/// Input translation for a destination command.
/// </summary>
public sealed record DestinationTranslationInput(
    string Locale,
    string Name,
    string? Description = null);

/// <summary>
/// Command that creates a destination with translations.
/// </summary>
public sealed record CreateDestinationCommand(
    string Slug,
    DestinationType Type,
    Guid? ParentId,
    IReadOnlyList<DestinationTranslationInput> Translations) : ICommand<Guid>;

using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.Destinations;

namespace Hani.Modules.Catalog.Application.Commands.CreateDestination;

public sealed record DestinationTranslationInput(
    string Locale,
    string Name,
    string? Description = null);

public sealed record CreateDestinationCommand(
    string Slug,
    DestinationType Type,
    Guid? ParentId,
    IReadOnlyList<DestinationTranslationInput> Translations) : ICommand<Guid>;

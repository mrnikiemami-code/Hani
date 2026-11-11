using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Commands.PublishTourProduct;

/// <summary>
/// Command that publishes a tour product after validation.
/// </summary>
public sealed record PublishTourProductCommand(Guid TourProductId) : ICommand<bool>;

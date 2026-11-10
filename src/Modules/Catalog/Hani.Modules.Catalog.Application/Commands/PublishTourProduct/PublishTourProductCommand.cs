using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Commands.PublishTourProduct;

public sealed record PublishTourProductCommand(Guid TourProductId) : ICommand<bool>;

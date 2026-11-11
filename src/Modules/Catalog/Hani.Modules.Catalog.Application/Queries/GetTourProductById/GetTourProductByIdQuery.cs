using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

/// <summary>
/// Query that reads a tour product with translations and destinations.
/// </summary>
public sealed record GetTourProductByIdQuery(Guid TourProductId) : IQuery<TourProductDto>;

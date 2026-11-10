using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

public sealed record GetTourProductByIdQuery(Guid TourProductId) : IQuery<TourProductDto>;

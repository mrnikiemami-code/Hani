using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;

namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

internal sealed class GetTourProductByIdQueryHandler(ITourProductRepository tourProducts)
    : IQueryHandler<GetTourProductByIdQuery, TourProductDto>
{
    public async Task<Result<TourProductDto>> Handle(
        GetTourProductByIdQuery request,
        CancellationToken cancellationToken)
    {
        var product = await tourProducts.GetByIdAsync(request.TourProductId, cancellationToken);

        if (product is null)
        {
            return Result<TourProductDto>.Failure(
                Error.NotFound("HANI-CATALOG-1013", "Tour product was not found."));
        }

        return Result<TourProductDto>.Success(TourProductMappings.ToDto(product));
    }
}

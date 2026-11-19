using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;

namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

/// <summary>Query that reads a tour product by its canonical slug.</summary>
public sealed record GetTourProductBySlugQuery(string Slug)
    : IQuery<TourProductDto>;

internal sealed class GetTourProductBySlugQueryHandler(ITourProductRepository tourProducts)
    : IQueryHandler<GetTourProductBySlugQuery, TourProductDto>
{
    public async Task<Result<TourProductDto>> Handle(
        GetTourProductBySlugQuery request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Slug))
        {
            return Result<TourProductDto>.Failure(
                Error.Validation("HANI-CATALOG-1014", "Tour slug is required."));
        }

        var product = await tourProducts.GetBySlugAsync(
            request.Slug.Trim(),
            cancellationToken);
        if (product is null)
        {
            return Result<TourProductDto>.Failure(
                Error.NotFound("HANI-CATALOG-1013", "Tour product was not found."));
        }

        return Result<TourProductDto>.Success(TourProductMappings.ToDto(product));
    }
}

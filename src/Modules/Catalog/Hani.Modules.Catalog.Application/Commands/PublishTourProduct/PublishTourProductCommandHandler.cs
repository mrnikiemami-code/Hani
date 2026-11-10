using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;

namespace Hani.Modules.Catalog.Application.Commands.PublishTourProduct;

internal sealed class PublishTourProductCommandHandler(ITourProductRepository tourProducts)
    : ICommandHandler<PublishTourProductCommand, bool>
{
    public async Task<Result<bool>> Handle(
        PublishTourProductCommand request,
        CancellationToken cancellationToken)
    {
        var product = await tourProducts.GetByIdAsync(request.TourProductId, cancellationToken);

        if (product is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-CATALOG-1011", "Tour product was not found."));
        }

        product.Publish();
        await tourProducts.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}

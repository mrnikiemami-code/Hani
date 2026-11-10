using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.TourProducts;

namespace Hani.Modules.Catalog.Application.Commands.CreateTourProduct;

internal sealed class CreateTourProductCommandHandler(
    ITourProductRepository tourProducts,
    IDestinationRepository destinations)
    : ICommandHandler<CreateTourProductCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateTourProductCommand request,
        CancellationToken cancellationToken)
    {
        var destinationIds = request.DestinationIds.Distinct().ToArray();
        var foundDestinations = await destinations.GetByIdsAsync(destinationIds, cancellationToken);

        if (foundDestinations.Count != destinationIds.Length)
        {
            return Result<Guid>.Failure(
                Error.Validation("HANI-CATALOG-1001", "One or more destinations were not found."));
        }

        var product = TourProduct.Create(
            request.Slug,
            request.DurationDays,
            request.TourType);

        foreach (var translation in request.Translations)
        {
            product.AddTranslation(
                translation.Locale,
                translation.Title,
                translation.Summary,
                translation.Description,
                translation.SeoTitle,
                translation.SeoDescription);
        }

        var sortOrder = 0;
        foreach (var destination in foundDestinations)
        {
            product.AddDestination(destination, sortOrder++);
        }

        await tourProducts.AddAsync(product, cancellationToken);

        return Result<Guid>.Success(product.Id);
    }
}

using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Destinations;

namespace Hani.Modules.Catalog.Application.Commands.CreateDestination;

internal sealed class CreateDestinationCommandHandler(IDestinationRepository destinations)
    : ICommandHandler<CreateDestinationCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateDestinationCommand request,
        CancellationToken cancellationToken)
    {
        var destination = Destination.Create(
            request.Slug,
            request.Type,
            request.ParentId);

        foreach (var translation in request.Translations)
        {
            destination.AddTranslation(
                translation.Locale,
                translation.Name,
                translation.Description);
        }

        await destinations.AddAsync(destination, cancellationToken);

        return Result<Guid>.Success(destination.Id);
    }
}

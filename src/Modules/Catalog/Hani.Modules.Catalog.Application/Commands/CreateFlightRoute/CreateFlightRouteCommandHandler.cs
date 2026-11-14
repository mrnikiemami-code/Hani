using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Flights;

namespace Hani.Modules.Catalog.Application.Commands.CreateFlightRoute;

internal sealed class CreateFlightRouteCommandHandler(
    IFlightRouteRepository routes,
    IIdGenerator ids)
    : ICommandHandler<CreateFlightRouteCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateFlightRouteCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var route = FlightRoute.Create(
                ids,
                request.Slug,
                request.OriginCode,
                request.DestinationCode,
                request.OriginCity,
                request.DestinationCity,
                request.IsActive,
                request.Offers);
            await routes.AddAsync(route, cancellationToken);
            return Result<Guid>.Success(route.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CATALOG-1901", exception.Message));
        }
    }
}

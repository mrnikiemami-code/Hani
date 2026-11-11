using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.UpdateDepartureAvailability;

internal sealed class UpdateDepartureAvailabilityCommandHandler(
    IDepartureRepository departures)
    : ICommandHandler<UpdateDepartureAvailabilityCommand, bool>
{
    public async Task<Result<bool>> Handle(
        UpdateDepartureAvailabilityCommand request,
        CancellationToken cancellationToken)
    {
        var departure = await departures.GetByIdAsync(request.DepartureId, cancellationToken);

        if (departure is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-SUPPLY-1109", "Departure was not found."));
        }

        try
        {
            departure.UpdateAvailability(request.SeatsLeft, request.Version);
        }
        catch (DepartureConcurrencyException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-SUPPLY-1110", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-SUPPLY-1111", exception.Message));
        }

        await departures.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}

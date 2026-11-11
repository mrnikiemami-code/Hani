using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.UpdateDepartureAvailability;

public sealed record UpdateDepartureAvailabilityCommand(
    Guid DepartureId,
    int SeatsLeft,
    long Version) : ICommand<bool>;

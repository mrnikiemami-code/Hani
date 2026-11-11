using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.UpdateDepartureAvailability;

/// <summary>
/// Command that updates departure seats with optimistic concurrency.
/// </summary>
public sealed record UpdateDepartureAvailabilityCommand(
    Guid AgencyId,
    Guid DepartureId,
    int SeatsLeft,
    long Version) : ICommand<bool>;

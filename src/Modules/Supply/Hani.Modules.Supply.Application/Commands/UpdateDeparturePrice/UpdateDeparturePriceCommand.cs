using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.UpdateDeparturePrice;

/// <summary>
/// Command that updates one room price with optimistic concurrency.
/// </summary>
public sealed record UpdateDeparturePriceCommand(
    Guid AgencyId,
    Guid DepartureId,
    RoomType RoomType,
    decimal Amount,
    string Currency,
    long Version) : ICommand<bool>;

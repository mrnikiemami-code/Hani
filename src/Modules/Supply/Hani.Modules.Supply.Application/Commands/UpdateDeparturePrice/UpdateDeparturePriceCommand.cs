using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.UpdateDeparturePrice;

public sealed record UpdateDeparturePriceCommand(
    Guid DepartureId,
    RoomType RoomType,
    decimal Amount,
    string Currency,
    long Version) : ICommand<bool>;

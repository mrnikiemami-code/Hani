using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.CreateTourDeparture;

/// <summary>
/// Input price for a departure command.
/// </summary>
public sealed record DeparturePriceInput(
    RoomType RoomType,
    decimal Amount,
    string Currency);

/// <summary>
/// Command that creates a departure with prices.
/// </summary>
public sealed record CreateTourDepartureCommand(
    Guid AgencyId,
    Guid AgencyOfferId,
    DateOnly StartDate,
    DateOnly EndDate,
    int Capacity,
    IReadOnlyList<DeparturePriceInput> Prices) : ICommand<Guid>;

using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.CreateTourDeparture;

public sealed record DeparturePriceInput(
    RoomType RoomType,
    decimal Amount,
    string Currency);

public sealed record CreateTourDepartureCommand(
    Guid AgencyOfferId,
    DateOnly StartDate,
    DateOnly EndDate,
    int Capacity,
    IReadOnlyList<DeparturePriceInput> Prices) : ICommand<Guid>;

using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.Flights;

namespace Hani.Modules.Catalog.Application.Commands.CreateFlightRoute;

/// <summary>
/// Command that creates a flight route with provider offers.
/// </summary>
public sealed record CreateFlightRouteCommand(
    string Slug,
    string OriginCode,
    string DestinationCode,
    string OriginCity,
    string DestinationCity,
    bool IsActive,
    IReadOnlyList<FlightOfferInput> Offers) : ICommand<Guid>;

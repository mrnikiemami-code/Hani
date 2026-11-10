using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;

public sealed record CreateAgencyOfferCommand(
    Guid AgencyId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency) : ICommand<Guid>;

using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;

/// <summary>
/// Command that creates an agency offer.
/// </summary>
public sealed record CreateAgencyOfferCommand(
    Guid AgencyId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency) : ICommand<Guid>;

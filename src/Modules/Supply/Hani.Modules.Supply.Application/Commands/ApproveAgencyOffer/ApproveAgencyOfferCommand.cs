using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;

/// <summary>
/// Command that approves a pending offer.
/// </summary>
public sealed record ApproveAgencyOfferCommand(Guid OfferId) : ICommand<bool>;

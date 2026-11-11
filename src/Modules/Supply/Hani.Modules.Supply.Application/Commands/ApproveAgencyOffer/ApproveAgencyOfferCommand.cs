using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;

public sealed record ApproveAgencyOfferCommand(Guid OfferId) : ICommand<bool>;

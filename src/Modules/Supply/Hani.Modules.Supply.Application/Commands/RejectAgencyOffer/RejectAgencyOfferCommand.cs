using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;

public sealed record RejectAgencyOfferCommand(Guid OfferId, string Reason) : ICommand<bool>;

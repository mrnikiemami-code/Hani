using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;

/// <summary>
/// Command that rejects a pending offer with a reason.
/// </summary>
public sealed record RejectAgencyOfferCommand(Guid OfferId, string Reason) : ICommand<bool>;

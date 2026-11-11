using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.SubmitAgencyOffer;

/// <summary>
/// Command that submits an offer for moderation.
/// </summary>
public sealed record SubmitAgencyOfferCommand(Guid AgencyId, Guid OfferId) : ICommand<bool>;

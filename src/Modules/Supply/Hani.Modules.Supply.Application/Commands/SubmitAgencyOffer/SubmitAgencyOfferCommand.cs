using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.SubmitAgencyOffer;

public sealed record SubmitAgencyOfferCommand(Guid AgencyId, Guid OfferId) : ICommand<bool>;

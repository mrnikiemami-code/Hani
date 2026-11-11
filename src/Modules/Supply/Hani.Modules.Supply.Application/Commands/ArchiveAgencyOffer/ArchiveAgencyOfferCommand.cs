using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.ArchiveAgencyOffer;

public sealed record ArchiveAgencyOfferCommand(Guid AgencyId, Guid OfferId) : ICommand<bool>;

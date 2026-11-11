using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.ArchiveAgencyOffer;

/// <summary>
/// Command that archives an agency offer.
/// </summary>
public sealed record ArchiveAgencyOfferCommand(Guid AgencyId, Guid OfferId) : ICommand<bool>;

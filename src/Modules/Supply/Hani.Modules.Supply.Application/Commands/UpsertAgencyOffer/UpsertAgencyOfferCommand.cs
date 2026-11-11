using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.UpsertAgencyOffer;

public sealed record UpsertAgencyOfferCommand(
    Guid AgencyId,
    string ExternalId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency,
    string IdempotencyKey = "") : ICommand<UpsertAgencyOfferResult>, IIdempotentCommand
{
    string IIdempotentCommand.IdempotencyKey => IdempotencyKey;
}

public sealed record UpsertAgencyOfferResult(Guid OfferId, bool Created);

using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Commands.UpsertAgencyOffer;

/// <summary>
/// Command that idempotently creates or updates an agency offer by external id.
/// </summary>
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

/// <summary>
/// Result of an upsert, indicating whether the offer was created.
/// </summary>
public sealed record UpsertAgencyOfferResult(Guid OfferId, bool Created);

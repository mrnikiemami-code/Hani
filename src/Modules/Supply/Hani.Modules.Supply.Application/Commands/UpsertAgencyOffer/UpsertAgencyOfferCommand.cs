using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Domain.AgencyOffers;

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
    string IdempotencyKey = "",
    IReadOnlyList<AccommodationOptionInput>? AccommodationOptions = null,
    IReadOnlyList<FlightOptionInput>? FlightOptions = null,
    IReadOnlyList<TaxRuleInput>? TaxRules = null,
    BookingMode BookingMode = BookingMode.Online,
    CollectionMode CollectionMode = CollectionMode.HaniOnline,
    SellerOfRecord SellerOfRecord = SellerOfRecord.Hani,
    InvoiceIssuer InvoiceIssuer = InvoiceIssuer.Hani,
    InstallmentTermsInput? InstallmentTerms = null) : ICommand<UpsertAgencyOfferResult>, IIdempotentCommand
{
    string IIdempotentCommand.IdempotencyKey => IdempotencyKey;
}

/// <summary>
/// Result of an upsert, indicating whether the offer was created.
/// </summary>
public sealed record UpsertAgencyOfferResult(Guid OfferId, bool Created);

using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Domain.AgencyOffers;

namespace Hani.Modules.Supply.Application.Commands.UpsertAgencyOffer;

internal sealed class UpsertAgencyOfferCommandHandler(
    IAgencyOfferRepository offers,
    IIdGenerator ids)
    : ICommandHandler<UpsertAgencyOfferCommand, UpsertAgencyOfferResult>
{
    public async Task<Result<UpsertAgencyOfferResult>> Handle(
        UpsertAgencyOfferCommand request,
        CancellationToken cancellationToken)
    {
        var externalId = request.ExternalId.Trim();
        var price = Money.Of(request.BasePrice, request.Currency);

        var existing = await offers.GetByExternalIdAsync(
            request.AgencyId,
            externalId,
            cancellationToken);

        if (existing is not null)
        {
            if (existing.TourProductId != request.TourProductId)
            {
                return Result<UpsertAgencyOfferResult>.Failure(
                    Error.Conflict(
                        "HANI-SUPPLY-1201",
                        "External offer is already linked to another tour product."));
            }

            try
            {
                existing.UpdateDetails(request.Title, price);
            }
            catch (InvalidOperationException exception)
            {
                return Result<UpsertAgencyOfferResult>.Failure(
                    Error.Conflict("HANI-SUPPLY-1202", exception.Message));
            }

            await offers.SaveChangesAsync(cancellationToken);

            return Result<UpsertAgencyOfferResult>.Success(
                new UpsertAgencyOfferResult(existing.Id, Created: false));
        }

        var offer = AgencyOffer.Create(
            ids,
            request.AgencyId,
            request.TourProductId,
            request.Title,
            price,
            externalId);

        await offers.AddAsync(offer, cancellationToken);

        return Result<UpsertAgencyOfferResult>.Success(
            new UpsertAgencyOfferResult(offer.Id, Created: true));
    }
}

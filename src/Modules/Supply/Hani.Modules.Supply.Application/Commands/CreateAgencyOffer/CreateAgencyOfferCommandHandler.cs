using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Domain.AgencyOffers;

namespace Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;

internal sealed class CreateAgencyOfferCommandHandler(
    IAgencyOfferRepository repository,
    IIdGenerator ids)
    : ICommandHandler<CreateAgencyOfferCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateAgencyOfferCommand request,
        CancellationToken cancellationToken)
    {
        var price = Money.Of(request.BasePrice, request.Currency);

        var offer = AgencyOffer.Create(
            ids,
            request.AgencyId,
            request.TourProductId,
            request.Title,
            price);

        await repository.AddAsync(offer, cancellationToken);

        return Result<Guid>.Success(offer.Id);
    }
}

using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Abstractions;

namespace Hani.Modules.Supply.Application.Commands.ArchiveAgencyOffer;

internal sealed class ArchiveAgencyOfferCommandHandler(IAgencyOfferRepository offers)
    : ICommandHandler<ArchiveAgencyOfferCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ArchiveAgencyOfferCommand request,
        CancellationToken cancellationToken)
    {
        var offer = await offers.GetByIdAsync(
            request.OfferId,
            request.AgencyId,
            cancellationToken);

        if (offer is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-SUPPLY-1312", "Agency offer was not found."));
        }

        offer.Archive();
        await offers.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

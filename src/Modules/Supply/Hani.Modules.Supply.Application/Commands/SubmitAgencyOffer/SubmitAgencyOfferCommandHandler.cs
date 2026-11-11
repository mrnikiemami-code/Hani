using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Abstractions;

namespace Hani.Modules.Supply.Application.Commands.SubmitAgencyOffer;

internal sealed class SubmitAgencyOfferCommandHandler(IAgencyOfferRepository offers)
    : ICommandHandler<SubmitAgencyOfferCommand, bool>
{
    public async Task<Result<bool>> Handle(
        SubmitAgencyOfferCommand request,
        CancellationToken cancellationToken)
    {
        var offer = await offers.GetByIdAsync(
            request.OfferId,
            request.AgencyId,
            cancellationToken);

        if (offer is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-SUPPLY-1301", "Agency offer was not found."));
        }

        try
        {
            offer.SubmitForReview();
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-SUPPLY-1302", exception.Message));
        }

        await offers.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Abstractions;

namespace Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;

internal sealed class RejectAgencyOfferCommandHandler(IAgencyOfferRepository offers)
    : ICommandHandler<RejectAgencyOfferCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectAgencyOfferCommand request,
        CancellationToken cancellationToken)
    {
        var offer = await offers.GetByIdAsync(request.OfferId, cancellationToken);

        if (offer is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-SUPPLY-1308", "Agency offer was not found."));
        }

        try
        {
            offer.Reject(request.Reason);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-SUPPLY-1309", exception.Message));
        }

        await offers.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

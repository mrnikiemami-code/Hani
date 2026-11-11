using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Abstractions;

namespace Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;

internal sealed class ApproveAgencyOfferCommandHandler(IAgencyOfferRepository offers)
    : ICommandHandler<ApproveAgencyOfferCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ApproveAgencyOfferCommand request,
        CancellationToken cancellationToken)
    {
        var offer = await offers.GetByIdAsync(request.OfferId, cancellationToken);

        if (offer is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-SUPPLY-1305", "Agency offer was not found."));
        }

        try
        {
            offer.Approve();
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-SUPPLY-1306", exception.Message));
        }

        await offers.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

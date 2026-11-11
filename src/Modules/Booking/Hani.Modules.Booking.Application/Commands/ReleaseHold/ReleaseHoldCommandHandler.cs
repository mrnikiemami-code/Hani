using Hani.BuildingBlocks.Application;
using Hani.Contracts.Supply;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Holds;

namespace Hani.Modules.Booking.Application.Commands.ReleaseHold;

internal sealed class ReleaseHoldCommandHandler(
    IHoldRepository holds,
    IQuoteRepository quotes,
    IInventoryReservationService inventory)
    : ICommandHandler<ReleaseHoldCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ReleaseHoldCommand request,
        CancellationToken cancellationToken)
    {
        var hold = await holds.GetByIdAsync(request.HoldId, cancellationToken);

        if (hold is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-2201", "Hold was not found."));
        }

        if (hold.Status == HoldStatus.Active)
        {
            await inventory.ReleaseAsync(hold.DepartureId, hold.Seats, cancellationToken);
            hold.Release();
            await holds.SaveChangesAsync(cancellationToken);

            var quote = await quotes.GetByIdAsync(hold.QuoteId, cancellationToken);
            quote?.ReleaseHold();
            await quotes.SaveChangesAsync(cancellationToken);
        }

        return Result<bool>.Success(true);
    }
}

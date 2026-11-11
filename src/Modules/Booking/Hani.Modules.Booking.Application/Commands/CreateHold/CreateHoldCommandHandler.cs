using Hani.BuildingBlocks.Application;
using Hani.Contracts.Supply;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Holds;

namespace Hani.Modules.Booking.Application.Commands.CreateHold;

internal sealed class CreateHoldCommandHandler(
    IQuoteRepository quotes,
    IHoldRepository holds,
    IInventoryReservationService inventory)
    : ICommandHandler<CreateHoldCommand, HoldDto>
{
    public async Task<Result<HoldDto>> Handle(
        CreateHoldCommand request,
        CancellationToken cancellationToken)
    {
        var quote = await quotes.GetByIdAsync(request.QuoteId, cancellationToken);

        if (quote is null)
        {
            return Result<HoldDto>.Failure(
                Error.NotFound("HANI-BOOKING-2101", "Quote was not found."));
        }

        var existing = await holds.GetActiveByQuoteIdAsync(quote.Id, cancellationToken);

        if (existing is not null)
        {
            return Result<HoldDto>.Success(Map(existing));
        }

        if (quote.IsExpired(DateTimeOffset.UtcNow))
        {
            quote.Expire();
            await quotes.SaveChangesAsync(cancellationToken);

            return Result<HoldDto>.Failure(
                Error.Conflict("HANI-BOOKING-2102", "Quote has expired."));
        }

        var reserved = await inventory.TryReserveAsync(
            quote.DepartureId,
            quote.Seats,
            cancellationToken);

        if (!reserved)
        {
            return Result<HoldDto>.Failure(
                Error.Conflict("HANI-BOOKING-2103", "Not enough seats to hold this quote."));
        }

        var hold = Hold.Create(quote.Id, quote.DepartureId, quote.Seats);

        try
        {
            await holds.AddAsync(hold, cancellationToken);
        }
        catch
        {
            await inventory.ReleaseAsync(quote.DepartureId, quote.Seats, cancellationToken);
            throw;
        }

        quote.MarkHeld();
        await quotes.SaveChangesAsync(cancellationToken);

        return Result<HoldDto>.Success(Map(hold));
    }

    private static HoldDto Map(Hold hold)
        => new(
            hold.Id,
            hold.QuoteId,
            hold.DepartureId,
            hold.Seats,
            hold.Status.ToString(),
            hold.ExpiresAt);
}

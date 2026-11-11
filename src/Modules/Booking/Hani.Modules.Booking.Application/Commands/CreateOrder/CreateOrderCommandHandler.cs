using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Application.Orders;
using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.Quotes;

namespace Hani.Modules.Booking.Application.Commands.CreateOrder;

internal sealed class CreateOrderCommandHandler(
    IHoldRepository holds,
    IQuoteRepository quotes,
    IOrderRepository orders,
    IIdGenerator ids)
    : ICommandHandler<CreateOrderCommand, OrderDto>
{
    public async Task<Result<OrderDto>> Handle(
        CreateOrderCommand request,
        CancellationToken cancellationToken)
    {
        var existing = await orders.GetByHoldIdAsync(request.HoldId, cancellationToken);

        if (existing is not null)
        {
            return Result<OrderDto>.Success(OrderMappings.ToDto(existing));
        }

        var hold = await holds.GetByIdAsync(request.HoldId, cancellationToken);

        if (hold is null)
        {
            return Result<OrderDto>.Failure(
                Error.NotFound("HANI-BOOKING-2401", "Hold was not found."));
        }

        if (hold.Status != HoldStatus.Active)
        {
            return Result<OrderDto>.Failure(
                Error.Conflict("HANI-BOOKING-2402", "Hold is not active."));
        }

        if (hold.IsExpired(DateTimeOffset.UtcNow))
        {
            hold.Expire();
            await holds.SaveChangesAsync(cancellationToken);

            return Result<OrderDto>.Failure(
                Error.Conflict("HANI-BOOKING-2403", "Hold has expired."));
        }

        var quote = await quotes.GetByIdAsync(hold.QuoteId, cancellationToken);

        if (quote is null)
        {
            return Result<OrderDto>.Failure(
                Error.NotFound("HANI-BOOKING-2404", "Quote was not found."));
        }

        if (quote.Status != QuoteStatus.Held)
        {
            return Result<OrderDto>.Failure(
                Error.Conflict("HANI-BOOKING-2405", "Quote is not held."));
        }

        if (request.Travelers is null || request.Travelers.Count == 0)
        {
            return Result<OrderDto>.Failure(
                Error.Validation("HANI-BOOKING-2410", "At least one traveler is required."));
        }

        var travelers = new List<TravelerDetails>(request.Travelers.Count);

        foreach (var input in request.Travelers)
        {
            if (!Enum.TryParse<TravelerType>(input.Type, ignoreCase: true, out var type))
            {
                return Result<OrderDto>.Failure(
                    Error.Validation("HANI-BOOKING-2412", "Traveler type is invalid."));
            }

            if (string.IsNullOrWhiteSpace(input.FullName))
            {
                return Result<OrderDto>.Failure(
                    Error.Validation("HANI-BOOKING-2411", "Traveler full name is required."));
            }

            travelers.Add(new TravelerDetails(input.FullName, type, input.DateOfBirth));
        }

        var adultCount = travelers.Count(traveler => traveler.Type == TravelerType.Adult);
        var childCount = travelers.Count(traveler => traveler.Type == TravelerType.Child);
        var infantCount = travelers.Count(traveler => traveler.Type == TravelerType.Infant);

        if (adultCount != quote.Adults ||
            childCount != quote.Children ||
            infantCount != quote.Infants)
        {
            return Result<OrderDto>.Failure(
                Error.Validation(
                    "HANI-BOOKING-2413",
                    "Traveler categories must match the quoted passenger mix."));
        }

        Order order;

        try
        {
            order = Order.Create(
                ids,
                hold,
                quote,
                request.ContactEmail,
                request.ContactPhone,
                travelers);
        }
        catch (InvalidOperationException exception)
        {
            return Result<OrderDto>.Failure(
                Error.Conflict("HANI-BOOKING-2414", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<OrderDto>.Failure(
                Error.Validation("HANI-BOOKING-2415", exception.Message));
        }

        hold.Consume();
        quote.MarkConverted();
        await orders.AddAsync(order, cancellationToken);

        return Result<OrderDto>.Success(OrderMappings.ToDto(order));
    }
}

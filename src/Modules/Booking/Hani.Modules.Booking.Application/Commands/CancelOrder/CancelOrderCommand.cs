using Hani.BuildingBlocks.Application;
using Hani.Contracts.Supply;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Orders;

namespace Hani.Modules.Booking.Application.Commands.CancelOrder;

/// <summary>
/// Command that cancels an order and releases its reserved seats.
/// </summary>
public sealed record CancelOrderCommand(Guid OrderId, string Reason) : ICommand<bool>;

internal sealed class CancelOrderCommandHandler(
    IOrderRepository orders,
    IInventoryReservationService inventory)
    : ICommandHandler<CancelOrderCommand, bool>
{
    public async Task<Result<bool>> Handle(
        CancelOrderCommand request,
        CancellationToken cancellationToken)
    {
        var order = await orders.GetByIdAsync(request.OrderId, cancellationToken);

        if (order is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-BOOKING-2501", "Order was not found."));
        }

        if (order.Status == OrderStatus.Cancelled)
        {
            return Result<bool>.Success(true);
        }

        try
        {
            order.Cancel(request.Reason);
            await orders.SaveChangesAsync(cancellationToken);
            await inventory.ReleaseAsync(order.DepartureId, order.Seats, cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (Exception exception) when (exception is ArgumentException or InvalidOperationException)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-2502", exception.Message));
        }
    }
}

using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Orders;

namespace Hani.Modules.Booking.Application.Queries.GetOrder;

internal sealed class GetOrderQueryHandler(IOrderRepository orders)
    : IQueryHandler<GetOrderQuery, OrderDto>
{
    public async Task<Result<OrderDto>> Handle(
        GetOrderQuery request,
        CancellationToken cancellationToken)
    {
        var order = await orders.GetByIdAsync(request.OrderId, cancellationToken);

        if (order is null)
        {
            return Result<OrderDto>.Failure(
                Error.NotFound("HANI-BOOKING-2420", "Order was not found."));
        }

        return Result<OrderDto>.Success(OrderMappings.ToDto(order));
    }
}

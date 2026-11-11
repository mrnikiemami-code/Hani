using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Orders;

namespace Hani.Modules.Booking.Application.Queries.GetContract;

internal sealed class GetContractQueryHandler(IOrderRepository orders)
    : IQueryHandler<GetContractQuery, ContractDto>
{
    public async Task<Result<ContractDto>> Handle(
        GetContractQuery request,
        CancellationToken cancellationToken)
    {
        var order = await orders.GetByIdAsync(request.OrderId, cancellationToken);

        if (order is null)
        {
            return Result<ContractDto>.Failure(
                Error.NotFound("HANI-BOOKING-2421", "Order was not found."));
        }

        return Result<ContractDto>.Success(OrderMappings.ToContractDto(order));
    }
}

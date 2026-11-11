using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Commands.CreateOrder;

namespace Hani.Modules.Booking.Application.Queries.GetOrder;

/// <summary>
/// Query that reads an order and its contract summary by id.
/// </summary>
public sealed record GetOrderQuery(Guid OrderId) : IQuery<OrderDto>;

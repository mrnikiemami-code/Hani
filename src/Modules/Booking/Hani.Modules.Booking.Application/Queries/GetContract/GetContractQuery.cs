using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Commands.CreateOrder;

namespace Hani.Modules.Booking.Application.Queries.GetContract;

/// <summary>
/// Query that reads the immutable contract issued for an order.
/// </summary>
public sealed record GetContractQuery(Guid OrderId) : IQuery<ContractDto>;

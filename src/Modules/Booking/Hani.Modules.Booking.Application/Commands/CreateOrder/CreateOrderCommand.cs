using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Booking.Application.Commands.CreateOrder;

/// <summary>
/// Command that converts an active hold into an order and issues an immutable contract.
/// </summary>
public sealed record CreateOrderCommand(
    Guid HoldId,
    string ContactEmail,
    string? ContactPhone,
    IReadOnlyList<OrderTravelerInput> Travelers,
    string IdempotencyKey = "") : ICommand<OrderDto>, IIdempotentCommand
{
    string IIdempotentCommand.IdempotencyKey => IdempotencyKey;
}

/// <summary>
/// Traveler supplied when creating an order.
/// </summary>
public sealed record OrderTravelerInput(
    string FullName,
    string Type,
    DateOnly? DateOfBirth = null);

/// <summary>
/// Order read model returned to marketplace clients.
/// </summary>
public sealed record OrderDto(
    Guid OrderId,
    string OrderNumber,
    Guid QuoteId,
    Guid HoldId,
    Guid AgencyId,
    Guid AgencyOfferId,
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children,
    int Infants,
    int Seats,
    decimal UnitPrice,
    decimal Total,
    string Currency,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset PaymentDueAt,
    Guid ContractId,
    string ContractNumber,
    IReadOnlyList<OrderTravelerDto> Travelers,
    IReadOnlyList<OrderLineDto> Lines);

/// <summary>
/// Traveler snapshot returned with orders and contracts.
/// </summary>
public sealed record OrderTravelerDto(
    Guid TravelerId,
    string FullName,
    string Type,
    DateOnly? DateOfBirth);

/// <summary>
/// Priced line snapshot returned with orders and contracts.
/// </summary>
public sealed record OrderLineDto(
    Guid LineId,
    string Description,
    int Quantity,
    decimal UnitPrice,
    decimal Total,
    string Currency);

/// <summary>
/// Immutable contract read model returned to marketplace clients.
/// </summary>
public sealed record ContractDto(
    Guid ContractId,
    string ContractNumber,
    Guid OrderId,
    DateTimeOffset IssuedAt,
    Guid QuoteId,
    Guid HoldId,
    Guid AgencyId,
    Guid AgencyOfferId,
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children,
    int Infants,
    int Seats,
    decimal UnitPrice,
    decimal Total,
    string Currency,
    string ContactEmail,
    string? ContactPhone,
    IReadOnlyList<OrderTravelerDto> Travelers,
    IReadOnlyList<OrderLineDto> Lines);

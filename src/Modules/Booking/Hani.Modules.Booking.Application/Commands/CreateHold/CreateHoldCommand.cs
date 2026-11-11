using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Booking.Application.Commands.CreateHold;

/// <summary>
/// Command that reserves seats for a valid quote.
/// </summary>
public sealed record CreateHoldCommand(
    Guid QuoteId,
    string IdempotencyKey = "") : ICommand<HoldDto>, IIdempotentCommand
{
    string IIdempotentCommand.IdempotencyKey => IdempotencyKey;
}

/// <summary>
/// Hold read model returned to clients.
/// </summary>
public sealed record HoldDto(
    Guid HoldId,
    Guid QuoteId,
    Guid DepartureId,
    int Seats,
    string Status,
    DateTimeOffset ExpiresAt);

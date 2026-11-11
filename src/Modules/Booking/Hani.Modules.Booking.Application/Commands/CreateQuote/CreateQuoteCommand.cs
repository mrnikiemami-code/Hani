using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Booking.Application.Commands.CreateQuote;

/// <summary>
/// Command that prices a departure for a passenger mix and creates a short-lived quote.
/// </summary>
public sealed record CreateQuoteCommand(
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children = 0,
    int Infants = 0) : ICommand<QuoteDto>;

/// <summary>
/// Quote read model returned to marketplace clients.
/// </summary>
public sealed record QuoteDto(
    Guid QuoteId,
    Guid DepartureId,
    Guid AgencyOfferId,
    Guid AgencyId,
    string RoomType,
    int Adults,
    int Children,
    int Infants,
    int Seats,
    decimal UnitPrice,
    decimal Total,
    string Currency,
    string Status,
    DateTimeOffset ExpiresAt);

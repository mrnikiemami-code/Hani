using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>
/// Command that creates a restaurant table reservation request.
/// </summary>
public sealed record CreateRestaurantReservationCommand(
    Guid PlaceId,
    DateOnly ReservationDate,
    TimeOnly ReservationTime,
    int PartySize,
    string ContactName,
    string ContactEmail,
    string ContactPhone,
    string? Notes) : ICommand<RestaurantReservationDto>;

/// <summary>
/// Query that returns one restaurant reservation.
/// </summary>
public sealed record GetRestaurantReservationQuery(Guid ReservationId)
    : IQuery<RestaurantReservationDto>;

/// <summary>
/// Query that lists restaurant reservations for operations.
/// </summary>
public sealed record ListRestaurantReservationsQuery(string? Status, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<RestaurantReservationDto>>;

/// <summary>
/// Command that confirms a restaurant reservation.
/// </summary>
public sealed record ConfirmRestaurantReservationCommand(Guid ReservationId) : ICommand<bool>;

/// <summary>
/// Command that rejects a restaurant reservation.
/// </summary>
public sealed record RejectRestaurantReservationCommand(Guid ReservationId, string Reason)
    : ICommand<bool>;

/// <summary>
/// Restaurant reservation read model.
/// </summary>
public sealed record RestaurantReservationDto(
    Guid ReservationId,
    string ReservationNumber,
    Guid PlaceId,
    DateOnly ReservationDate,
    TimeOnly ReservationTime,
    int PartySize,
    string ContactName,
    string ContactEmail,
    string ContactPhone,
    string? Notes,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? ConfirmedAt,
    string? RejectionReason);

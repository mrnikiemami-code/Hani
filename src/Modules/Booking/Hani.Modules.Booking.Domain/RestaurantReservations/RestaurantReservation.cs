using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.RestaurantReservations;

/// <summary>
/// Lifecycle state of a restaurant reservation.
/// </summary>
public enum RestaurantReservationStatus
{
    Requested = 0,
    Confirmed = 1,
    Rejected = 2,
    Cancelled = 3
}

/// <summary>
/// Table reservation request for a restaurant.
/// </summary>
public sealed class RestaurantReservation : AggregateRoot<Guid>
{
    private RestaurantReservation()
    {
    }

    private RestaurantReservation(
        Guid id,
        string reservationNumber,
        Guid placeId,
        DateOnly reservationDate,
        TimeOnly reservationTime,
        int partySize,
        string contactName,
        string contactEmail,
        string contactPhone,
        string? notes,
        DateTimeOffset createdAt) : base(id)
    {
        ReservationNumber = reservationNumber;
        PlaceId = placeId;
        ReservationDate = reservationDate;
        ReservationTime = reservationTime;
        PartySize = partySize;
        ContactName = contactName;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        Notes = notes;
        CreatedAt = createdAt;
        Status = RestaurantReservationStatus.Requested;
    }

    /// <summary>
    /// Human-readable reservation number.
    /// </summary>
    public string ReservationNumber { get; private set; } = string.Empty;

    /// <summary>
    /// Restaurant place id.
    /// </summary>
    public Guid PlaceId { get; private set; }

    /// <summary>
    /// Reservation date.
    /// </summary>
    public DateOnly ReservationDate { get; private set; }

    /// <summary>
    /// Reservation time.
    /// </summary>
    public TimeOnly ReservationTime { get; private set; }

    /// <summary>
    /// Party size.
    /// </summary>
    public int PartySize { get; private set; }

    /// <summary>
    /// Contact name.
    /// </summary>
    public string ContactName { get; private set; } = string.Empty;

    /// <summary>
    /// Contact email.
    /// </summary>
    public string ContactEmail { get; private set; } = string.Empty;

    /// <summary>
    /// Contact phone.
    /// </summary>
    public string ContactPhone { get; private set; } = string.Empty;

    /// <summary>
    /// Customer notes.
    /// </summary>
    public string? Notes { get; private set; }

    /// <summary>
    /// Current state.
    /// </summary>
    public RestaurantReservationStatus Status { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Confirmation time.
    /// </summary>
    public DateTimeOffset? ConfirmedAt { get; private set; }

    /// <summary>
    /// Rejection reason.
    /// </summary>
    public string? RejectionReason { get; private set; }

    /// <summary>
    /// Creates a requested reservation.
    /// </summary>
    public static RestaurantReservation Create(
        IIdGenerator ids,
        Guid placeId,
        DateOnly reservationDate,
        TimeOnly reservationTime,
        int partySize,
        string contactName,
        string contactEmail,
        string contactPhone,
        string? notes,
        DateTimeOffset? now = null)
    {
        if (placeId == Guid.Empty)
        {
            throw new ArgumentException("Restaurant is required.", nameof(placeId));
        }

        if (reservationDate < DateOnly.FromDateTime(DateTime.UtcNow))
        {
            throw new ArgumentException("Reservation date cannot be in the past.", nameof(reservationDate));
        }

        if (partySize is < 1 or > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(partySize), "Party size must be between 1 and 100.");
        }

        if (string.IsNullOrWhiteSpace(contactName) ||
            string.IsNullOrWhiteSpace(contactEmail) ||
            string.IsNullOrWhiteSpace(contactPhone))
        {
            throw new ArgumentException("Contact name, email, and phone are required.");
        }

        var id = ids.NewId();
        return new RestaurantReservation(
            id,
            $"RST-{id.ToString("N")[..12].ToUpperInvariant()}",
            placeId,
            reservationDate,
            reservationTime,
            partySize,
            contactName.Trim(),
            contactEmail.Trim().ToLowerInvariant(),
            contactPhone.Trim(),
            string.IsNullOrWhiteSpace(notes) ? null : notes.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Confirms the reservation.
    /// </summary>
    public void Confirm(DateTimeOffset? now = null)
    {
        if (Status != RestaurantReservationStatus.Requested)
        {
            throw new InvalidOperationException("Only requested reservations can be confirmed.");
        }

        Status = RestaurantReservationStatus.Confirmed;
        ConfirmedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Rejects the reservation.
    /// </summary>
    public void Reject(string reason, DateTimeOffset? now = null)
    {
        if (Status != RestaurantReservationStatus.Requested)
        {
            throw new InvalidOperationException("Only requested reservations can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(reason));
        }

        Status = RestaurantReservationStatus.Rejected;
        RejectionReason = reason.Trim();
        ConfirmedAt = now ?? DateTimeOffset.UtcNow;
    }
}

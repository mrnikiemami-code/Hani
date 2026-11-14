using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Domain.Pricing;

namespace Hani.Modules.Booking.Domain.ReservationRequests;

/// <summary>
/// Lifecycle state of a reservation request.
/// </summary>
public enum ReservationRequestStatus
{
    PendingAgencyReview = 0,
    Confirmed = 1,
    Rejected = 2,
    CustomerAccepted = 3,
    Expired = 4,
    Cancelled = 5
}

/// <summary>
/// Request sent to an agency when an offer is not instantly bookable.
/// </summary>
public sealed class ReservationRequest : AggregateRoot<Guid>
{
    private ReservationRequest()
    {
    }

    private ReservationRequest(
        Guid id,
        string requestNumber,
        Guid quoteId,
        Guid agencyOfferId,
        Guid agencyId,
        Guid departureId,
        string roomType,
        int adults,
        int children,
        int infants,
        string contactEmail,
        string? contactPhone,
        string? notes,
        PricingSnapshot pricing,
        DateTimeOffset createdAt,
        DateTimeOffset expiresAt) : base(id)
    {
        RequestNumber = requestNumber;
        QuoteId = quoteId;
        AgencyOfferId = agencyOfferId;
        AgencyId = agencyId;
        DepartureId = departureId;
        RoomType = roomType;
        Adults = adults;
        Children = children;
        Infants = infants;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        Notes = notes;
        Pricing = pricing;
        Total = pricing.Components.Sum(component => component.TotalAmount);
        Currency = pricing.Components.FirstOrDefault()?.Currency ?? "IRR";
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
        Status = ReservationRequestStatus.PendingAgencyReview;
    }

    /// <summary>
    /// Human-readable request number.
    /// </summary>
    public string RequestNumber { get; private set; } = string.Empty;

    /// <summary>
    /// Source quote.
    /// </summary>
    public Guid QuoteId { get; private set; }

    /// <summary>
    /// Requested offer.
    /// </summary>
    public Guid AgencyOfferId { get; private set; }

    /// <summary>
    /// Receiving agency.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Requested departure.
    /// </summary>
    public Guid DepartureId { get; private set; }

    /// <summary>
    /// Requested room type.
    /// </summary>
    public string RoomType { get; private set; } = string.Empty;

    /// <summary>
    /// Number of adults.
    /// </summary>
    public int Adults { get; private set; }

    /// <summary>
    /// Number of children.
    /// </summary>
    public int Children { get; private set; }

    /// <summary>
    /// Number of infants.
    /// </summary>
    public int Infants { get; private set; }

    /// <summary>
    /// Contact email.
    /// </summary>
    public string ContactEmail { get; private set; } = string.Empty;

    /// <summary>
    /// Optional contact phone.
    /// </summary>
    public string? ContactPhone { get; private set; }

    /// <summary>
    /// Customer notes for the agency.
    /// </summary>
    public string? Notes { get; private set; }

    /// <summary>
    /// Immutable request pricing snapshot.
    /// </summary>
    public PricingSnapshot Pricing { get; private set; } = new([]);

    /// <summary>
    /// Primary total.
    /// </summary>
    public decimal Total { get; private set; }

    /// <summary>
    /// Primary currency.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Current request state.
    /// </summary>
    public ReservationRequestStatus Status { get; private set; }

    /// <summary>
    /// Agency response note.
    /// </summary>
    public string? AgencyNote { get; private set; }

    /// <summary>
    /// Rejection reason.
    /// </summary>
    public string? RejectionReason { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Response deadline.
    /// </summary>
    public DateTimeOffset ExpiresAt { get; private set; }

    /// <summary>
    /// Agency decision time.
    /// </summary>
    public DateTimeOffset? DecidedAt { get; private set; }

    /// <summary>
    /// Customer acceptance time.
    /// </summary>
    public DateTimeOffset? AcceptedAt { get; private set; }

    /// <summary>
    /// Creates a pending reservation request from a non-expired quote.
    /// </summary>
    public static ReservationRequest Create(
        IIdGenerator ids,
        Guid quoteId,
        Guid agencyOfferId,
        Guid agencyId,
        Guid departureId,
        string roomType,
        int adults,
        int children,
        int infants,
        string contactEmail,
        string? contactPhone,
        string? notes,
        PricingSnapshot pricing,
        DateTimeOffset expiresAt,
        DateTimeOffset? now = null)
    {
        if (agencyOfferId == Guid.Empty || agencyId == Guid.Empty || departureId == Guid.Empty)
        {
            throw new ArgumentException("Offer, agency, and departure are required.");
        }

        if (string.IsNullOrWhiteSpace(contactEmail))
        {
            throw new ArgumentException("Contact email is required.", nameof(contactEmail));
        }

        if (string.Equals(pricing.BookingMode, "Online", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("Offer is not configured for reservation requests.");
        }

        var id = ids.NewId();
        var createdAt = now ?? DateTimeOffset.UtcNow;

        if (expiresAt <= createdAt)
        {
            throw new ArgumentException("Reservation expiry must be in the future.", nameof(expiresAt));
        }

        return new ReservationRequest(
            id,
            $"RSV-{id.ToString("N")[..12].ToUpperInvariant()}",
            quoteId,
            agencyOfferId,
            agencyId,
            departureId,
            roomType.Trim(),
            adults,
            children,
            infants,
            contactEmail.Trim().ToLowerInvariant(),
            string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim(),
            string.IsNullOrWhiteSpace(notes) ? null : notes.Trim(),
            pricing,
            createdAt,
            expiresAt);
    }

    /// <summary>
    /// Confirms the request with an optional agency note.
    /// </summary>
    public void Confirm(string? agencyNote = null, DateTimeOffset? now = null)
    {
        if (Status != ReservationRequestStatus.PendingAgencyReview)
        {
            throw new InvalidOperationException("Only pending requests can be confirmed.");
        }

        Status = ReservationRequestStatus.Confirmed;
        AgencyNote = string.IsNullOrWhiteSpace(agencyNote) ? null : agencyNote.Trim();
        DecidedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Rejects the request with a reason.
    /// </summary>
    public void Reject(string reason, DateTimeOffset? now = null)
    {
        if (Status != ReservationRequestStatus.PendingAgencyReview)
        {
            throw new InvalidOperationException("Only pending requests can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(reason));
        }

        Status = ReservationRequestStatus.Rejected;
        RejectionReason = reason.Trim();
        DecidedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Accepts a confirmed request.
    /// </summary>
    public void Accept(DateTimeOffset? now = null)
    {
        if (Status != ReservationRequestStatus.Confirmed)
        {
            throw new InvalidOperationException("Only confirmed requests can be accepted.");
        }

        Status = ReservationRequestStatus.CustomerAccepted;
        AcceptedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Expires a pending request.
    /// </summary>
    public void Expire(DateTimeOffset now)
    {
        if (Status == ReservationRequestStatus.PendingAgencyReview && now >= ExpiresAt)
        {
            Status = ReservationRequestStatus.Expired;
        }
    }
}

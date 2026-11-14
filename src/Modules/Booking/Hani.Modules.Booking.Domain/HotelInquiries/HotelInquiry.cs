using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.HotelInquiries;

/// <summary>
/// Lifecycle state of a hotel inquiry.
/// </summary>
public enum HotelInquiryStatus
{
    Pending = 0,
    Responded = 1,
    Closed = 2,
    Cancelled = 3
}

/// <summary>
/// Customer inquiry for hotel availability and best price.
/// </summary>
public sealed class HotelInquiry : AggregateRoot<Guid>
{
    private HotelInquiry()
    {
    }

    private HotelInquiry(
        Guid id,
        string inquiryNumber,
        Guid hotelId,
        DateOnly checkIn,
        DateOnly checkOut,
        int rooms,
        int adults,
        int children,
        string contactEmail,
        string? contactPhone,
        string? notes,
        DateTimeOffset createdAt) : base(id)
    {
        InquiryNumber = inquiryNumber;
        HotelId = hotelId;
        CheckIn = checkIn;
        CheckOut = checkOut;
        Rooms = rooms;
        Adults = adults;
        Children = children;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        Notes = notes;
        CreatedAt = createdAt;
        Status = HotelInquiryStatus.Pending;
    }

    /// <summary>
    /// Human-readable inquiry number.
    /// </summary>
    public string InquiryNumber { get; private set; } = string.Empty;

    /// <summary>
    /// Requested hotel.
    /// </summary>
    public Guid HotelId { get; private set; }

    /// <summary>
    /// Check-in date.
    /// </summary>
    public DateOnly CheckIn { get; private set; }

    /// <summary>
    /// Check-out date.
    /// </summary>
    public DateOnly CheckOut { get; private set; }

    /// <summary>
    /// Number of rooms.
    /// </summary>
    public int Rooms { get; private set; }

    /// <summary>
    /// Number of adults.
    /// </summary>
    public int Adults { get; private set; }

    /// <summary>
    /// Number of children.
    /// </summary>
    public int Children { get; private set; }

    /// <summary>
    /// Contact email.
    /// </summary>
    public string ContactEmail { get; private set; } = string.Empty;

    /// <summary>
    /// Optional contact phone.
    /// </summary>
    public string? ContactPhone { get; private set; }

    /// <summary>
    /// Customer notes.
    /// </summary>
    public string? Notes { get; private set; }

    /// <summary>
    /// Current state.
    /// </summary>
    public HotelInquiryStatus Status { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Response time.
    /// </summary>
    public DateTimeOffset? RespondedAt { get; private set; }

    /// <summary>
    /// Operator response note.
    /// </summary>
    public string? ResponseNote { get; private set; }

    /// <summary>
    /// Quoted total, when available.
    /// </summary>
    public decimal? QuotedTotal { get; private set; }

    /// <summary>
    /// Quoted currency.
    /// </summary>
    public string? QuotedCurrency { get; private set; }

    /// <summary>
    /// Creates a pending hotel inquiry.
    /// </summary>
    public static HotelInquiry Create(
        IIdGenerator ids,
        Guid hotelId,
        DateOnly checkIn,
        DateOnly checkOut,
        int rooms,
        int adults,
        int children,
        string contactEmail,
        string? contactPhone,
        string? notes,
        DateTimeOffset? now = null)
    {
        if (hotelId == Guid.Empty)
        {
            throw new ArgumentException("Hotel is required.", nameof(hotelId));
        }

        if (checkOut <= checkIn)
        {
            throw new ArgumentException("Check-out must be after check-in.", nameof(checkOut));
        }

        if (rooms < 1 || adults < 1 || children < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(rooms), "Rooms and adults are required.");
        }

        if (string.IsNullOrWhiteSpace(contactEmail))
        {
            throw new ArgumentException("Contact email is required.", nameof(contactEmail));
        }

        var id = ids.NewId();
        return new HotelInquiry(
            id,
            $"HTL-{id.ToString("N")[..12].ToUpperInvariant()}",
            hotelId,
            checkIn,
            checkOut,
            rooms,
            adults,
            children,
            contactEmail.Trim().ToLowerInvariant(),
            string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim(),
            string.IsNullOrWhiteSpace(notes) ? null : notes.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Records an operator response.
    /// </summary>
    public void Respond(
        string responseNote,
        decimal? quotedTotal = null,
        string? quotedCurrency = null,
        DateTimeOffset? now = null)
    {
        if (Status != HotelInquiryStatus.Pending)
        {
            throw new InvalidOperationException("Only pending inquiries can be responded to.");
        }

        if (string.IsNullOrWhiteSpace(responseNote))
        {
            throw new ArgumentException("Response note is required.", nameof(responseNote));
        }

        if (quotedTotal is not null && (quotedTotal <= 0 || string.IsNullOrWhiteSpace(quotedCurrency)))
        {
            throw new ArgumentException("Quoted total requires a positive amount and currency.");
        }

        Status = HotelInquiryStatus.Responded;
        ResponseNote = responseNote.Trim();
        QuotedTotal = quotedTotal;
        QuotedCurrency = string.IsNullOrWhiteSpace(quotedCurrency)
            ? null
            : quotedCurrency.Trim().ToUpperInvariant();
        RespondedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Closes the inquiry.
    /// </summary>
    public void Close(DateTimeOffset? now = null)
    {
        Status = HotelInquiryStatus.Closed;
        RespondedAt ??= now ?? DateTimeOffset.UtcNow;
    }
}

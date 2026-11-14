using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.PriceDiscrepancies;

/// <summary>
/// Review state of a price-discrepancy report.
/// </summary>
public enum PriceDiscrepancyStatus
{
    Open = 0,
    Reviewed = 1,
    Resolved = 2
}

/// <summary>
/// Customer report that a displayed price differs from the agency/checkout price.
/// </summary>
public sealed class PriceDiscrepancyReport : AggregateRoot<Guid>
{
    private PriceDiscrepancyReport()
    {
    }

    private PriceDiscrepancyReport(
        Guid id,
        Guid agencyOfferId,
        Guid? departureId,
        string? contactEmail,
        decimal reportedPrice,
        string currency,
        string note,
        DateTimeOffset createdAt) : base(id)
    {
        AgencyOfferId = agencyOfferId;
        DepartureId = departureId;
        ContactEmail = contactEmail;
        ReportedPrice = reportedPrice;
        Currency = currency;
        Note = note;
        CreatedAt = createdAt;
        Status = PriceDiscrepancyStatus.Open;
    }

    /// <summary>
    /// Reported offer.
    /// </summary>
    public Guid AgencyOfferId { get; private set; }

    /// <summary>
    /// Optional departure.
    /// </summary>
    public Guid? DepartureId { get; private set; }

    /// <summary>
    /// Reporter contact email.
    /// </summary>
    public string? ContactEmail { get; private set; }

    /// <summary>
    /// Price seen by the reporter.
    /// </summary>
    public decimal ReportedPrice { get; private set; }

    /// <summary>
    /// Report currency.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Report details.
    /// </summary>
    public string Note { get; private set; } = string.Empty;

    /// <summary>
    /// Current status.
    /// </summary>
    public PriceDiscrepancyStatus Status { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Review time.
    /// </summary>
    public DateTimeOffset? ReviewedAt { get; private set; }

    /// <summary>
    /// Resolution note.
    /// </summary>
    public string? Resolution { get; private set; }

    /// <summary>
    /// Creates an open discrepancy report.
    /// </summary>
    public static PriceDiscrepancyReport Create(
        IIdGenerator ids,
        Guid agencyOfferId,
        Guid? departureId,
        string? contactEmail,
        decimal reportedPrice,
        string currency,
        string note,
        DateTimeOffset? now = null)
    {
        if (agencyOfferId == Guid.Empty)
        {
            throw new ArgumentException("Offer is required.", nameof(agencyOfferId));
        }

        if (reportedPrice <= 0 || string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Reported price and currency are required.");
        }

        if (string.IsNullOrWhiteSpace(note) || note.Trim().Length < 5)
        {
            throw new ArgumentException("Report note is required.", nameof(note));
        }

        return new PriceDiscrepancyReport(
            ids.NewId(),
            agencyOfferId,
            departureId,
            string.IsNullOrWhiteSpace(contactEmail) ? null : contactEmail.Trim().ToLowerInvariant(),
            reportedPrice,
            currency.Trim().ToUpperInvariant(),
            note.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Marks the report reviewed.
    /// </summary>
    public void Review(DateTimeOffset? now = null)
    {
        if (Status != PriceDiscrepancyStatus.Open)
        {
            return;
        }

        Status = PriceDiscrepancyStatus.Reviewed;
        ReviewedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Resolves the report with a note.
    /// </summary>
    public void Resolve(string resolution, DateTimeOffset? now = null)
    {
        if (Status == PriceDiscrepancyStatus.Resolved)
        {
            return;
        }

        if (string.IsNullOrWhiteSpace(resolution))
        {
            throw new ArgumentException("Resolution is required.", nameof(resolution));
        }

        Status = PriceDiscrepancyStatus.Resolved;
        Resolution = resolution.Trim();
        ReviewedAt = now ?? DateTimeOffset.UtcNow;
    }
}

using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.VisaApplications;

/// <summary>
/// Lifecycle state of a visa application.
/// </summary>
public enum VisaApplicationStatus
{
    Submitted = 0,
    UnderReview = 1,
    Approved = 2,
    Rejected = 3,
    Cancelled = 4
}

/// <summary>
/// Customer visa application request with uploaded document references.
/// </summary>
public sealed class VisaApplication : AggregateRoot<Guid>
{
    private readonly List<VisaApplicationDocument> _documents = [];

    private VisaApplication()
    {
    }

    private VisaApplication(
        Guid id,
        string applicationNumber,
        Guid visaCountryId,
        Guid visaTypeId,
        string applicantName,
        string passportNo,
        string nationality,
        DateOnly? dateOfBirth,
        DateOnly? travelDate,
        string contactEmail,
        string contactPhone,
        string? notes,
        DateTimeOffset createdAt) : base(id)
    {
        ApplicationNumber = applicationNumber;
        VisaCountryId = visaCountryId;
        VisaTypeId = visaTypeId;
        ApplicantName = applicantName;
        PassportNo = passportNo;
        Nationality = nationality;
        DateOfBirth = dateOfBirth;
        TravelDate = travelDate;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        Notes = notes;
        CreatedAt = createdAt;
        Status = VisaApplicationStatus.Submitted;
    }

    /// <summary>Human-readable application number.</summary>
    public string ApplicationNumber { get; private set; } = string.Empty;

    /// <summary>Visa country id.</summary>
    public Guid VisaCountryId { get; private set; }

    /// <summary>Visa type id.</summary>
    public Guid VisaTypeId { get; private set; }

    /// <summary>Applicant full name.</summary>
    public string ApplicantName { get; private set; } = string.Empty;

    /// <summary>Passport number.</summary>
    public string PassportNo { get; private set; } = string.Empty;

    /// <summary>Nationality.</summary>
    public string Nationality { get; private set; } = string.Empty;

    /// <summary>Date of birth.</summary>
    public DateOnly? DateOfBirth { get; private set; }

    /// <summary>Intended travel date.</summary>
    public DateOnly? TravelDate { get; private set; }

    /// <summary>Contact email.</summary>
    public string ContactEmail { get; private set; } = string.Empty;

    /// <summary>Contact phone.</summary>
    public string ContactPhone { get; private set; } = string.Empty;

    /// <summary>Additional notes.</summary>
    public string? Notes { get; private set; }

    /// <summary>Current status.</summary>
    public VisaApplicationStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Last status update.</summary>
    public DateTimeOffset? UpdatedAt { get; private set; }

    /// <summary>Rejection reason.</summary>
    public string? RejectionReason { get; private set; }

    /// <summary>Document URLs.</summary>
    public IReadOnlyCollection<VisaApplicationDocument> Documents => _documents;

    /// <summary>
    /// Creates a submitted application.
    /// </summary>
    public static VisaApplication Create(
        IIdGenerator ids,
        Guid visaCountryId,
        Guid visaTypeId,
        string applicantName,
        string passportNo,
        string nationality,
        DateOnly? dateOfBirth,
        DateOnly? travelDate,
        string contactEmail,
        string contactPhone,
        string? notes,
        IReadOnlyList<string> documents,
        DateTimeOffset? now = null)
    {
        if (visaCountryId == Guid.Empty || visaTypeId == Guid.Empty)
        {
            throw new ArgumentException("Visa country and type are required.");
        }

        if (string.IsNullOrWhiteSpace(applicantName) ||
            string.IsNullOrWhiteSpace(passportNo) ||
            string.IsNullOrWhiteSpace(nationality) ||
            string.IsNullOrWhiteSpace(contactEmail) ||
            string.IsNullOrWhiteSpace(contactPhone))
        {
            throw new ArgumentException("Applicant, passport, nationality, and contact details are required.");
        }

        if (documents.Count == 0)
        {
            throw new ArgumentException("At least one document is required.", nameof(documents));
        }

        var id = ids.NewId();
        var application = new VisaApplication(
            id,
            $"VSA-{id.ToString("N")[..12].ToUpperInvariant()}",
            visaCountryId,
            visaTypeId,
            applicantName.Trim(),
            passportNo.Trim().ToUpperInvariant(),
            nationality.Trim().ToUpperInvariant(),
            dateOfBirth,
            travelDate,
            contactEmail.Trim().ToLowerInvariant(),
            contactPhone.Trim(),
            string.IsNullOrWhiteSpace(notes) ? null : notes.Trim(),
            now ?? DateTimeOffset.UtcNow);

        foreach (var document in documents.Distinct(StringComparer.OrdinalIgnoreCase))
        {
            application._documents.Add(new VisaApplicationDocument(ids.NewId(), application.Id, document));
        }

        return application;
    }

    /// <summary>
    /// Updates status with validation.
    /// </summary>
    public void SetStatus(
        VisaApplicationStatus status,
        string? rejectionReason = null,
        DateTimeOffset? now = null)
    {
        if (Status is VisaApplicationStatus.Approved or VisaApplicationStatus.Rejected or VisaApplicationStatus.Cancelled)
        {
            throw new InvalidOperationException("Finalized applications cannot change status.");
        }

        if (status == VisaApplicationStatus.Rejected && string.IsNullOrWhiteSpace(rejectionReason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(rejectionReason));
        }

        Status = status;
        RejectionReason = status == VisaApplicationStatus.Rejected ? rejectionReason!.Trim() : null;
        UpdatedAt = now ?? DateTimeOffset.UtcNow;
    }
}

/// <summary>
/// Uploaded visa document reference.
/// </summary>
public sealed class VisaApplicationDocument : Entity<Guid>
{
    private VisaApplicationDocument()
    {
    }

    internal VisaApplicationDocument(Guid id, Guid applicationId, string fileUrl) : base(id)
    {
        ApplicationId = applicationId;
        FileUrl = fileUrl.Trim();
    }

    /// <summary>Parent application.</summary>
    public Guid ApplicationId { get; private set; }

    /// <summary>Document URL.</summary>
    public string FileUrl { get; private set; } = string.Empty;
}

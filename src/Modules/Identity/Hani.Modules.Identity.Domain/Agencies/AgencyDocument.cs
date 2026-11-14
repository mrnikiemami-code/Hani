using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Agencies;

/// <summary>
/// Type of document uploaded during agency onboarding.
/// </summary>
public enum AgencyDocumentType
{
    License = 0,
    Website = 1,
    Contract = 2,
    Other = 3
}

/// <summary>
/// Review state of an agency onboarding document.
/// </summary>
public enum AgencyDocumentStatus
{
    Pending = 0,
    Approved = 1,
    Rejected = 2
}

/// <summary>
/// Supporting document uploaded by an agency during onboarding.
/// </summary>
public sealed class AgencyDocument : Entity<Guid>
{
    private AgencyDocument()
    {
    }

    internal AgencyDocument(
        Guid id,
        Guid agencyId,
        AgencyDocumentType type,
        string fileUrl,
        DateTimeOffset uploadedAt) : base(id)
    {
        AgencyId = agencyId;
        Type = type;
        FileUrl = fileUrl;
        UploadedAt = uploadedAt;
        Status = AgencyDocumentStatus.Pending;
    }

    /// <summary>
    /// Owning agency.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Document type.
    /// </summary>
    public AgencyDocumentType Type { get; private set; }

    /// <summary>
    /// Absolute file URL.
    /// </summary>
    public string FileUrl { get; private set; } = string.Empty;

    /// <summary>
    /// Moderation state.
    /// </summary>
    public AgencyDocumentStatus Status { get; private set; }

    /// <summary>
    /// Upload time.
    /// </summary>
    public DateTimeOffset UploadedAt { get; private set; }

    /// <summary>
    /// Marks the document approved.
    /// </summary>
    public void Approve() => Status = AgencyDocumentStatus.Approved;

    /// <summary>
    /// Marks the document rejected.
    /// </summary>
    public void Reject() => Status = AgencyDocumentStatus.Rejected;
}

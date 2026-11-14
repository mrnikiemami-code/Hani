using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Domain.Agencies.Events;

namespace Hani.Modules.Identity.Domain.Agencies;

/// <summary>
/// Travel agency tenant with license, city, status, and subscription validity.
/// </summary>
public sealed class Agency : AggregateRoot<Guid>
{
    private readonly List<AgencyDocument> _documents = [];

    private Agency()
    {
    }

    private Agency(
        Guid id,
        string slug,
        string name,
        string licenseNo,
        string city,
        DateOnly? subscriptionValidUntil,
        Guid? ownerUserId = null,
        string? website = null,
        string? contactEmail = null,
        string? contactPhone = null,
        string? about = null) : base(id)
    {
        Slug = slug;
        Name = name;
        LicenseNo = licenseNo;
        City = city;
        SubscriptionValidUntil = subscriptionValidUntil;
        OwnerUserId = ownerUserId;
        Website = website;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        About = about;
        Status = AgencyStatus.Active;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public string Slug { get; private set; } = string.Empty;

    public string Name { get; private set; } = string.Empty;

    public string LicenseNo { get; private set; } = string.Empty;

    public string City { get; private set; } = string.Empty;

    public AgencyStatus Status { get; private set; }

    public DateOnly? SubscriptionValidUntil { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Owning marketplace user, when onboarding was self-service.
    /// </summary>
    public Guid? OwnerUserId { get; private set; }

    /// <summary>
    /// Public agency website.
    /// </summary>
    public string? Website { get; private set; }

    /// <summary>
    /// Public contact email.
    /// </summary>
    public string? ContactEmail { get; private set; }

    /// <summary>
    /// Public contact phone.
    /// </summary>
    public string? ContactPhone { get; private set; }

    /// <summary>
    /// Short agency description.
    /// </summary>
    public string? About { get; private set; }

    /// <summary>
    /// Onboarding submission time.
    /// </summary>
    public DateTimeOffset? SubmittedAt { get; private set; }

    /// <summary>
    /// Admin review time.
    /// </summary>
    public DateTimeOffset? ReviewedAt { get; private set; }

    /// <summary>
    /// Rejection reason, when rejected.
    /// </summary>
    public string? RejectionReason { get; private set; }

    /// <summary>
    /// Uploaded onboarding documents.
    /// </summary>
    public IReadOnlyCollection<AgencyDocument> Documents => _documents;

    public static Agency Create(
        IIdGenerator ids,
        string slug,
        string name,
        string licenseNo,
        string city,
        DateOnly? subscriptionValidUntil = null)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is required.", nameof(slug));
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name is required.", nameof(name));
        }

        if (string.IsNullOrWhiteSpace(licenseNo))
        {
            throw new ArgumentException("License number is required.", nameof(licenseNo));
        }

        var agency = new Agency(
            ids.NewId(),
            slug.Trim(),
            name.Trim(),
            licenseNo.Trim(),
            city.Trim(),
            subscriptionValidUntil);

        agency.AddDomainEvent(new AgencyCreatedDomainEvent(ids.NewId(), agency.Id));

        return agency;
    }

    /// <summary>
    /// Creates a pending agency from a self-service onboarding request.
    /// </summary>
    public static Agency CreateOnboarding(
        IIdGenerator ids,
        Guid ownerUserId,
        string slug,
        string name,
        string licenseNo,
        string city,
        string? website,
        string? contactEmail,
        string? contactPhone,
        string? about,
        IReadOnlyCollection<AgencyDocumentInput> documents,
        DateTimeOffset? now = null)
    {
        if (ownerUserId == Guid.Empty)
        {
            throw new ArgumentException("Owner user is required.", nameof(ownerUserId));
        }

        if (documents.Count == 0)
        {
            throw new ArgumentException("At least one onboarding document is required.", nameof(documents));
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;
        var agency = new Agency(
            ids.NewId(),
            slug.Trim(),
            name.Trim(),
            licenseNo.Trim(),
            city.Trim(),
            null,
            ownerUserId,
            string.IsNullOrWhiteSpace(website) ? null : website.Trim(),
            string.IsNullOrWhiteSpace(contactEmail) ? null : contactEmail.Trim().ToLowerInvariant(),
            string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim(),
            string.IsNullOrWhiteSpace(about) ? null : about.Trim())
        {
            Status = AgencyStatus.Pending,
            SubmittedAt = createdAt,
            CreatedAt = createdAt
        };

        foreach (var document in documents)
        {
            agency.AddDocument(ids, document.Type, document.FileUrl, createdAt);
        }

        agency.AddDomainEvent(new AgencyCreatedDomainEvent(ids.NewId(), agency.Id));
        return agency;
    }

    /// <summary>
    /// Adds a document to the onboarding file.
    /// </summary>
    public AgencyDocument AddDocument(
        IIdGenerator ids,
        AgencyDocumentType type,
        string fileUrl,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
        {
            throw new ArgumentException("Document URL is required.", nameof(fileUrl));
        }

        if (Status is AgencyStatus.Active or AgencyStatus.Suspended)
        {
            throw new InvalidOperationException("Documents cannot be added to an active agency.");
        }

        var document = new AgencyDocument(
            ids.NewId(),
            Id,
            type,
            fileUrl.Trim(),
            now ?? DateTimeOffset.UtcNow);
        _documents.Add(document);
        return document;
    }

    /// <summary>
    /// Approves a pending onboarding request.
    /// </summary>
    public void Approve(DateTimeOffset? now = null)
    {
        if (Status != AgencyStatus.Pending)
        {
            throw new InvalidOperationException("Only pending agencies can be approved.");
        }

        Status = AgencyStatus.Active;
        ReviewedAt = now ?? DateTimeOffset.UtcNow;
        RejectionReason = null;

        foreach (var document in _documents)
        {
            document.Approve();
        }
    }

    /// <summary>
    /// Rejects a pending onboarding request.
    /// </summary>
    public void Reject(string reason, DateTimeOffset? now = null)
    {
        if (Status != AgencyStatus.Pending)
        {
            throw new InvalidOperationException("Only pending agencies can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(reason));
        }

        Status = AgencyStatus.Rejected;
        ReviewedAt = now ?? DateTimeOffset.UtcNow;
        RejectionReason = reason.Trim();

        foreach (var document in _documents)
        {
            document.Reject();
        }
    }

    public void Suspend() => Status = AgencyStatus.Suspended;

    public void Activate() => Status = AgencyStatus.Active;

    public void RenewSubscription(DateOnly validUntil)
        => SubscriptionValidUntil = validUntil;
}

/// <summary>
/// Onboarding document input.
/// </summary>
public sealed record AgencyDocumentInput(
    AgencyDocumentType Type,
    string FileUrl);


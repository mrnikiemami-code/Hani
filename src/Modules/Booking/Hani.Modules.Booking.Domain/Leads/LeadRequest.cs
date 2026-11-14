using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Leads;

/// <summary>
/// Service requested through the Safarsaz / RFQ flow.
/// </summary>
public enum LeadServiceType
{
    Tour = 0,
    Hotel = 1,
    Flight = 2,
    Visa = 3,
    Design = 4,
    Custom = 5
}

/// <summary>
/// Lifecycle state of a lead.
/// </summary>
public enum LeadStatus
{
    Open = 0,
    Matched = 1,
    Closed = 2,
    Cancelled = 3
}

/// <summary>
/// State of an agency invitation for a lead.
/// </summary>
public enum LeadInvitationStatus
{
    Invited = 0,
    Responded = 1,
    Declined = 2,
    Selected = 3
}

/// <summary>
/// One agency invited to respond to a lead.
/// </summary>
public sealed class LeadAgencyInvitation : Entity<Guid>
{
    private LeadAgencyInvitation()
    {
    }

    internal LeadAgencyInvitation(
        Guid id,
        Guid leadId,
        Guid agencyId,
        DateTimeOffset invitedAt) : base(id)
    {
        LeadId = leadId;
        AgencyId = agencyId;
        InvitedAt = invitedAt;
        Status = LeadInvitationStatus.Invited;
    }

    /// <summary>
    /// Parent lead.
    /// </summary>
    public Guid LeadId { get; private set; }

    /// <summary>
    /// Invited agency.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Invitation time.
    /// </summary>
    public DateTimeOffset InvitedAt { get; private set; }

    /// <summary>
    /// Invitation state.
    /// </summary>
    public LeadInvitationStatus Status { get; private set; }
}

/// <summary>
/// Customer travel request matched to agencies by the marketplace.
/// </summary>
public sealed class LeadRequest : AggregateRoot<Guid>
{
    private readonly List<LeadAgencyInvitation> _invitations = [];

    private LeadRequest()
    {
    }

    private LeadRequest(
        Guid id,
        string requestNumber,
        LeadServiceType serviceType,
        string? destination,
        DateOnly? startDate,
        DateOnly? endDate,
        int adults,
        int children,
        int infants,
        decimal? budgetAmount,
        string? currency,
        string contactName,
        string contactEmail,
        string contactPhone,
        string? notes,
        DateTimeOffset createdAt) : base(id)
    {
        RequestNumber = requestNumber;
        ServiceType = serviceType;
        Destination = destination;
        StartDate = startDate;
        EndDate = endDate;
        Adults = adults;
        Children = children;
        Infants = infants;
        BudgetAmount = budgetAmount;
        Currency = currency;
        ContactName = contactName;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        Notes = notes;
        CreatedAt = createdAt;
        Status = LeadStatus.Open;
    }

    /// <summary>
    /// Human-readable request number.
    /// </summary>
    public string RequestNumber { get; private set; } = string.Empty;

    /// <summary>
    /// Requested service.
    /// </summary>
    public LeadServiceType ServiceType { get; private set; }

    /// <summary>
    /// Destination or free-form destination text.
    /// </summary>
    public string? Destination { get; private set; }

    /// <summary>
    /// Desired start date.
    /// </summary>
    public DateOnly? StartDate { get; private set; }

    /// <summary>
    /// Desired end date.
    /// </summary>
    public DateOnly? EndDate { get; private set; }

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
    /// Optional budget.
    /// </summary>
    public decimal? BudgetAmount { get; private set; }

    /// <summary>
    /// Budget currency.
    /// </summary>
    public string? Currency { get; private set; }

    /// <summary>
    /// Contact full name.
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
    /// Additional requirements.
    /// </summary>
    public string? Notes { get; private set; }

    /// <summary>
    /// Current state.
    /// </summary>
    public LeadStatus Status { get; private set; }

    /// <summary>
    /// Matched agency, when matched.
    /// </summary>
    public Guid? MatchedAgencyId { get; private set; }

    /// <summary>
    /// Agencies invited to respond to this lead.
    /// </summary>
    public IReadOnlyCollection<LeadAgencyInvitation> Invitations => _invitations;

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Matching time.
    /// </summary>
    public DateTimeOffset? MatchedAt { get; private set; }

    /// <summary>
    /// Closing time.
    /// </summary>
    public DateTimeOffset? ClosedAt { get; private set; }

    /// <summary>
    /// Creates an open lead.
    /// </summary>
    public static LeadRequest Create(
        IIdGenerator ids,
        LeadServiceType serviceType,
        string? destination,
        DateOnly? startDate,
        DateOnly? endDate,
        int adults,
        int children,
        int infants,
        decimal? budgetAmount,
        string? currency,
        string contactName,
        string contactEmail,
        string contactPhone,
        string? notes,
        DateTimeOffset? now = null)
    {
        if (adults < 1 || children < 0 || infants < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(adults));
        }

        if (startDate is not null && endDate is not null && endDate <= startDate)
        {
            throw new ArgumentException("End date must be after start date.", nameof(endDate));
        }

        if (string.IsNullOrWhiteSpace(contactName) ||
            string.IsNullOrWhiteSpace(contactEmail) ||
            string.IsNullOrWhiteSpace(contactPhone))
        {
            throw new ArgumentException("Contact name, email, and phone are required.");
        }

        var id = ids.NewId();
        return new LeadRequest(
            id,
            $"LEAD-{id.ToString("N")[..12].ToUpperInvariant()}",
            serviceType,
            string.IsNullOrWhiteSpace(destination) ? null : destination.Trim(),
            startDate,
            endDate,
            adults,
            children,
            infants,
            budgetAmount,
            string.IsNullOrWhiteSpace(currency) ? null : currency.Trim().ToUpperInvariant(),
            contactName.Trim(),
            contactEmail.Trim().ToLowerInvariant(),
            contactPhone.Trim(),
            string.IsNullOrWhiteSpace(notes) ? null : notes.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Matches the lead to one agency. Repeated calls add further invitations.
    /// </summary>
    public void Match(Guid agencyId, IIdGenerator idGenerator, DateTimeOffset? now = null)
        => InviteAgencies([agencyId], idGenerator, now);

    /// <summary>
    /// Invites one or more agencies to respond to the lead and returns the number
    /// of newly added invitations.
    /// </summary>
    public int InviteAgencies(
        IEnumerable<Guid> agencyIds,
        IIdGenerator idGenerator,
        DateTimeOffset? now = null)
    {
        if (Status is LeadStatus.Closed or LeadStatus.Cancelled)
        {
            throw new InvalidOperationException("Closed or cancelled leads cannot be matched.");
        }

        var newAgencyIds = agencyIds
            .Where(id => id != Guid.Empty)
            .Distinct()
            .Where(id => _invitations.All(invitation => invitation.AgencyId != id))
            .ToArray();

        if (newAgencyIds.Length == 0)
        {
            if (Status == LeadStatus.Open)
            {
                throw new ArgumentException("At least one agency is required.", nameof(agencyIds));
            }

            return 0;
        }

        var invitedAt = now ?? DateTimeOffset.UtcNow;

        foreach (var agencyId in newAgencyIds)
        {
            _invitations.Add(new LeadAgencyInvitation(idGenerator.NewId(), Id, agencyId, invitedAt));
        }

        Status = LeadStatus.Matched;
        MatchedAgencyId ??= newAgencyIds[0];
        MatchedAt ??= invitedAt;
        return newAgencyIds.Length;
    }

    /// <summary>
    /// Closes the lead.
    /// </summary>
    public void Close(DateTimeOffset? now = null)
    {
        if (Status == LeadStatus.Closed)
        {
            return;
        }

        Status = LeadStatus.Closed;
        ClosedAt = now ?? DateTimeOffset.UtcNow;
    }
}

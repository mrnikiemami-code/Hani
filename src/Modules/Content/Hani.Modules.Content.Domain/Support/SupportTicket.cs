using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Support;

/// <summary>Support ticket lifecycle.</summary>
public enum SupportTicketStatus
{
    Open = 0,
    InProgress = 1,
    WaitingCustomer = 2,
    Resolved = 3,
    Closed = 4
}

/// <summary>Support ticket priority.</summary>
public enum SupportTicketPriority
{
    Low = 0,
    Normal = 1,
    High = 2,
    Urgent = 3
}

/// <summary>Author of a support message.</summary>
public enum SupportAuthorType
{
    Customer = 0,
    Admin = 1,
    System = 2
}

/// <summary>
/// Operational support ticket with a customer contact, assignment, priority,
/// and an append-only message thread.
/// </summary>
public sealed class SupportTicket : AggregateRoot<Guid>
{
    private readonly List<SupportMessage> _messages = [];

    private SupportTicket()
    {
    }

    private SupportTicket(
        Guid id,
        string ticketNumber,
        Guid? userId,
        string contactName,
        string contactEmail,
        string? contactPhone,
        string subject,
        string category,
        SupportTicketPriority priority,
        DateTimeOffset createdAt) : base(id)
    {
        TicketNumber = ticketNumber;
        UserId = userId;
        ContactName = contactName;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        Subject = subject;
        Category = category;
        Priority = priority;
        Status = SupportTicketStatus.Open;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
        LastMessageAt = createdAt;
    }

    /// <summary>Human-readable ticket number.</summary>
    public string TicketNumber { get; private set; } = string.Empty;

    /// <summary>Optional authenticated customer.</summary>
    public Guid? UserId { get; private set; }

    /// <summary>Customer display name.</summary>
    public string ContactName { get; private set; } = string.Empty;

    /// <summary>Customer email.</summary>
    public string ContactEmail { get; private set; } = string.Empty;

    /// <summary>Optional customer phone.</summary>
    public string? ContactPhone { get; private set; }

    /// <summary>Short subject.</summary>
    public string Subject { get; private set; } = string.Empty;

    /// <summary>Support category such as Booking or Payment.</summary>
    public string Category { get; private set; } = string.Empty;

    /// <summary>Current priority.</summary>
    public SupportTicketPriority Priority { get; private set; }

    /// <summary>Current lifecycle state.</summary>
    public SupportTicketStatus Status { get; private set; }

    /// <summary>Assigned administrator.</summary>
    public Guid? AssignedTo { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Time of the latest message.</summary>
    public DateTimeOffset LastMessageAt { get; private set; }

    /// <summary>Message thread.</summary>
    public IReadOnlyCollection<SupportMessage> Messages => _messages;

    /// <summary>Creates a support ticket and its opening customer message.</summary>
    public static SupportTicket Create(
        IIdGenerator ids,
        Guid? userId,
        string contactName,
        string contactEmail,
        string? contactPhone,
        string subject,
        string category,
        string message,
        SupportTicketPriority priority = SupportTicketPriority.Normal,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(contactName) ||
            string.IsNullOrWhiteSpace(contactEmail) ||
            string.IsNullOrWhiteSpace(subject) ||
            string.IsNullOrWhiteSpace(category) ||
            string.IsNullOrWhiteSpace(message))
        {
            throw new ArgumentException(
                "Contact name, email, subject, category, and message are required.");
        }

        var id = ids.NewId();
        var createdAt = now ?? DateTimeOffset.UtcNow;
        var ticket = new SupportTicket(
            id,
            $"SUP-{id:N}"[..12].ToUpperInvariant(),
            userId,
            contactName.Trim(),
            contactEmail.Trim().ToLowerInvariant(),
            string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim(),
            subject.Trim(),
            category.Trim(),
            priority,
            createdAt);
        ticket._messages.Add(new SupportMessage(
            ids.NewId(),
            id,
            SupportAuthorType.Customer,
            userId,
            message.Trim(),
            false,
            createdAt));
        return ticket;
    }

    /// <summary>Adds a customer or administrator message.</summary>
    public SupportMessage AddMessage(
        IIdGenerator ids,
        SupportAuthorType authorType,
        Guid? authorUserId,
        string body,
        bool isInternal = false,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(body))
        {
            throw new ArgumentException("A support message body is required.");
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;
        var message = new SupportMessage(
            ids.NewId(),
            Id,
            authorType,
            authorUserId,
            body.Trim(),
            isInternal,
            createdAt);
        _messages.Add(message);
        LastMessageAt = createdAt;
        UpdatedAt = createdAt;
        if (authorType == SupportAuthorType.Admin && !isInternal)
        {
            Status = SupportTicketStatus.WaitingCustomer;
        }
        else if (authorType == SupportAuthorType.Customer &&
                 Status == SupportTicketStatus.WaitingCustomer)
        {
            Status = SupportTicketStatus.Open;
        }

        return message;
    }

    /// <summary>Changes lifecycle state; reopening clears the resolved time.</summary>
    public void SetStatus(SupportTicketStatus status, DateTimeOffset? now = null)
    {
        Status = status;
        UpdatedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Changes priority.</summary>
    public void SetPriority(SupportTicketPriority priority, DateTimeOffset? now = null)
    {
        Priority = priority;
        UpdatedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Assigns or unassigns an administrator.</summary>
    public void Assign(Guid? assignedTo, DateTimeOffset? now = null)
    {
        AssignedTo = assignedTo;
        UpdatedAt = now ?? DateTimeOffset.UtcNow;
    }
}

/// <summary>One message in a support ticket thread.</summary>
public sealed class SupportMessage : Entity<Guid>
{
    private SupportMessage()
    {
    }

    internal SupportMessage(
        Guid id,
        Guid ticketId,
        SupportAuthorType authorType,
        Guid? authorUserId,
        string body,
        bool isInternal,
        DateTimeOffset createdAt) : base(id)
    {
        TicketId = ticketId;
        AuthorType = authorType;
        AuthorUserId = authorUserId;
        Body = body;
        IsInternal = isInternal;
        CreatedAt = createdAt;
    }

    /// <summary>Parent ticket.</summary>
    public Guid TicketId { get; private set; }

    /// <summary>Author type.</summary>
    public SupportAuthorType AuthorType { get; private set; }

    /// <summary>Author user id, when available.</summary>
    public Guid? AuthorUserId { get; private set; }

    /// <summary>Message body.</summary>
    public string Body { get; private set; } = string.Empty;

    /// <summary>Internal notes are hidden from the customer.</summary>
    public bool IsInternal { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }
}

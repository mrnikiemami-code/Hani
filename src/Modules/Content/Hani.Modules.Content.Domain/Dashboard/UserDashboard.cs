using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Dashboard;

/// <summary>User message state.</summary>
public enum UserMessageStatus
{
    Unread = 0,
    Read = 1,
    Archived = 2
}

/// <summary>Dashboard inbox message for one user.</summary>
public sealed class UserMessage : AggregateRoot<Guid>
{
    private UserMessage()
    {
    }

    private UserMessage(Guid id, Guid userId, string subject, string body, DateTimeOffset createdAt)
        : base(id)
    {
        UserId = userId;
        Subject = subject.Trim();
        Body = body.Trim();
        CreatedAt = createdAt;
        Status = UserMessageStatus.Unread;
    }

    /// <summary>Target user.</summary>
    public Guid UserId { get; private set; }

    /// <summary>Message subject.</summary>
    public string Subject { get; private set; } = string.Empty;

    /// <summary>Message body.</summary>
    public string Body { get; private set; } = string.Empty;

    /// <summary>Read state.</summary>
    public UserMessageStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates an unread message.</summary>
    public static UserMessage Create(
        IIdGenerator ids,
        Guid userId,
        string subject,
        string body,
        DateTimeOffset? now = null)
    {
        if (userId == Guid.Empty || string.IsNullOrWhiteSpace(subject) || string.IsNullOrWhiteSpace(body))
        {
            throw new ArgumentException("User, subject, and body are required.");
        }

        return new UserMessage(ids.NewId(), userId, subject, body, now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Marks the message read.</summary>
    public void MarkRead() => Status = UserMessageStatus.Read;

    /// <summary>Archives the message.</summary>
    public void Archive() => Status = UserMessageStatus.Archived;
}

/// <summary>User document state.</summary>
public enum UserDocumentStatus
{
    Pending = 0,
    Verified = 1,
    Rejected = 2
}

/// <summary>Dashboard document owned by one user.</summary>
public sealed class UserDocument : AggregateRoot<Guid>
{
    private UserDocument()
    {
    }

    private UserDocument(
        Guid id,
        Guid userId,
        string name,
        string fileUrl,
        string documentType,
        DateTimeOffset createdAt) : base(id)
    {
        UserId = userId;
        Name = name.Trim();
        FileUrl = fileUrl.Trim();
        DocumentType = documentType.Trim();
        CreatedAt = createdAt;
        Status = UserDocumentStatus.Pending;
    }

    /// <summary>Document owner.</summary>
    public Guid UserId { get; private set; }

    /// <summary>Display name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Document URL.</summary>
    public string FileUrl { get; private set; } = string.Empty;

    /// <summary>Document type such as Passport or Visa.</summary>
    public string DocumentType { get; private set; } = string.Empty;

    /// <summary>Verification state.</summary>
    public UserDocumentStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a pending document.</summary>
    public static UserDocument Create(
        IIdGenerator ids,
        Guid userId,
        string name,
        string fileUrl,
        string documentType,
        DateTimeOffset? now = null)
    {
        if (userId == Guid.Empty ||
            string.IsNullOrWhiteSpace(name) ||
            string.IsNullOrWhiteSpace(fileUrl) ||
            string.IsNullOrWhiteSpace(documentType))
        {
            throw new ArgumentException("User, name, URL, and document type are required.");
        }

        return new UserDocument(
            ids.NewId(),
            userId,
            name,
            fileUrl,
            documentType,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Verifies the document.</summary>
    public void Verify() => Status = UserDocumentStatus.Verified;

    /// <summary>Rejects the document.</summary>
    public void Reject() => Status = UserDocumentStatus.Rejected;
}

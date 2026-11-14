using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Content;

/// <summary>
/// Content family used by categories and comments.
/// </summary>
public enum ContentType
{
    Blog = 0,
    Travelogue = 1,
    Video = 2
}

/// <summary>
/// Publication state shared by content aggregates.
/// </summary>
public enum ContentStatus
{
    Draft = 0,
    Published = 1,
    Archived = 2
}

/// <summary>
/// Moderation state for content comments.
/// </summary>
public enum CommentStatus
{
    Pending = 0,
    Published = 1,
    Rejected = 2
}

/// <summary>
/// Localized content category shared by blog and video.
/// </summary>
public sealed class ContentCategory : AggregateRoot<Guid>
{
    private readonly List<ContentCategoryTranslation> _translations = [];

    private ContentCategory()
    {
    }

    private ContentCategory(Guid id, string slug, ContentType type) : base(id)
    {
        Slug = slug;
        Type = type;
        IsActive = true;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Unique category slug.</summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>Content family.</summary>
    public ContentType Type { get; private set; }

    /// <summary>Whether the category is selectable.</summary>
    public bool IsActive { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Localized names.</summary>
    public IReadOnlyCollection<ContentCategoryTranslation> Translations => _translations;

    /// <summary>Creates a category.</summary>
    public static ContentCategory Create(IIdGenerator ids, string slug, ContentType type)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Category slug is required.", nameof(slug));
        }

        return new ContentCategory(ids.NewId(), slug.Trim().ToLowerInvariant(), type);
    }

    /// <summary>Adds a localized category name.</summary>
    public void AddTranslation(IIdGenerator ids, string locale, string name)
    {
        if (string.IsNullOrWhiteSpace(locale) || string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Category locale and name are required.");
        }

        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Category translation '{locale}' already exists.");
        }

        _translations.Add(new ContentCategoryTranslation(ids.NewId(), Id, locale, name));
    }
}

/// <summary>Localized category name.</summary>
public sealed class ContentCategoryTranslation : Entity<Guid>
{
    private ContentCategoryTranslation()
    {
    }

    internal ContentCategoryTranslation(Guid id, Guid categoryId, string locale, string name) : base(id)
    {
        CategoryId = categoryId;
        Locale = locale.Trim().ToLowerInvariant();
        Name = name.Trim();
    }

    /// <summary>Parent category.</summary>
    public Guid CategoryId { get; private set; }

    /// <summary>Locale code.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Localized name.</summary>
    public string Name { get; private set; } = string.Empty;
}

/// <summary>
/// Comment attached to a blog post, travelogue, or video.
/// </summary>
public sealed class ContentComment : AggregateRoot<Guid>
{
    private ContentComment()
    {
    }

    private ContentComment(
        Guid id,
        ContentType contentType,
        Guid contentId,
        Guid? userId,
        string authorName,
        string body,
        Guid? parentId,
        DateTimeOffset createdAt) : base(id)
    {
        ContentType = contentType;
        ContentId = contentId;
        UserId = userId;
        AuthorName = authorName;
        Body = body;
        ParentId = parentId;
        CreatedAt = createdAt;
        Status = CommentStatus.Pending;
    }

    /// <summary>Commented content family.</summary>
    public ContentType ContentType { get; private set; }

    /// <summary>Commented content id.</summary>
    public Guid ContentId { get; private set; }

    /// <summary>Optional authenticated author id.</summary>
    public Guid? UserId { get; private set; }

    /// <summary>Display name.</summary>
    public string AuthorName { get; private set; } = string.Empty;

    /// <summary>Comment body.</summary>
    public string Body { get; private set; } = string.Empty;

    /// <summary>Optional parent comment id.</summary>
    public Guid? ParentId { get; private set; }

    /// <summary>Moderation state.</summary>
    public CommentStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a pending comment.</summary>
    public static ContentComment Create(
        IIdGenerator ids,
        ContentType contentType,
        Guid contentId,
        Guid? userId,
        string authorName,
        string body,
        Guid? parentId = null,
        DateTimeOffset? now = null)
    {
        if (contentId == Guid.Empty)
        {
            throw new ArgumentException("Content id is required.", nameof(contentId));
        }

        if (string.IsNullOrWhiteSpace(authorName) || string.IsNullOrWhiteSpace(body))
        {
            throw new ArgumentException("Comment author and body are required.");
        }

        return new ContentComment(
            ids.NewId(),
            contentType,
            contentId,
            userId,
            authorName.Trim(),
            body.Trim(),
            parentId,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Publishes the comment.</summary>
    public void Publish() => Status = CommentStatus.Published;

    /// <summary>Rejects the comment.</summary>
    public void Reject() => Status = CommentStatus.Rejected;
}

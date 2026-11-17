using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Content;

/// <summary>Editable content type in the Hani content CMS.</summary>
public enum ContentEntryType
{
    Page = 0,
    Banner = 1,
    Article = 2,
    Section = 3
}

/// <summary>
/// Localized CMS entry with draft/publish workflow and revisions.
/// </summary>
public sealed class ContentEntry : AggregateRoot<Guid>
{
    private readonly List<ContentEntryRevision> _revisions = [];

    private ContentEntry()
    {
    }

    private ContentEntry(
        Guid id,
        ContentEntryType type,
        string slug,
        string locale,
        string title,
        string? excerpt,
        string body,
        Guid? heroMediaId,
        string? heroImageUrl,
        string? seoTitle,
        string? seoDescription) : base(id)
    {
        Type = type;
        Slug = NormalizeSlug(slug);
        Locale = locale.ToLowerInvariant();
        Title = title.Trim();
        Excerpt = excerpt?.Trim();
        Body = body;
        HeroMediaId = heroMediaId;
        HeroImageUrl = heroImageUrl?.Trim();
        SeoTitle = seoTitle?.Trim();
        SeoDescription = seoDescription?.Trim();
        Status = ContentStatus.Draft;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    /// <summary>Content type.</summary>
    public ContentEntryType Type { get; private set; }

    /// <summary>SEO slug unique per type and locale.</summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>Locale such as fa, en, ar.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Display title.</summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>Short summary.</summary>
    public string? Excerpt { get; private set; }

    /// <summary>Body content.</summary>
    public string Body { get; private set; } = string.Empty;

    /// <summary>Optional media library asset id.</summary>
    public Guid? HeroMediaId { get; private set; }

    /// <summary>Optional direct image URL fallback.</summary>
    public string? HeroImageUrl { get; private set; }

    /// <summary>SEO title override.</summary>
    public string? SeoTitle { get; private set; }

    /// <summary>SEO description override.</summary>
    public string? SeoDescription { get; private set; }

    /// <summary>Publication status.</summary>
    public ContentStatus Status { get; private set; }

    /// <summary>Publication time.</summary>
    public DateTimeOffset? PublishedAt { get; private set; }

    /// <summary>Scheduled publication time.</summary>
    public DateTimeOffset? ScheduledAt { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Saved revisions.</summary>
    public IReadOnlyCollection<ContentEntryRevision> Revisions => _revisions;

    /// <summary>Creates a draft entry.</summary>
    public static ContentEntry Create(
        Guid id,
        ContentEntryType type,
        string slug,
        string locale,
        string title,
        string? excerpt,
        string body,
        Guid? heroMediaId,
        string? heroImageUrl,
        string? seoTitle,
        string? seoDescription)
    {
        if (string.IsNullOrWhiteSpace(slug) || string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Slug and title are required.");
        }

        return new ContentEntry(
            id, type, slug, locale, title, excerpt, body,
            heroMediaId, heroImageUrl, seoTitle, seoDescription);
    }

    /// <summary>Updates the entry and captures a revision snapshot.</summary>
    public void Update(
        string slug,
        string title,
        string? excerpt,
        string body,
        Guid? heroMediaId,
        string? heroImageUrl,
        string? seoTitle,
        string? seoDescription,
        Guid revisionId)
    {
        _revisions.Add(new ContentEntryRevision(
            revisionId, Id, Title, Excerpt, Body, HeroMediaId, HeroImageUrl,
            SeoTitle, SeoDescription, UpdatedAt));

        Slug = NormalizeSlug(slug);
        Title = title.Trim();
        Excerpt = excerpt?.Trim();
        Body = body;
        HeroMediaId = heroMediaId;
        HeroImageUrl = heroImageUrl?.Trim();
        SeoTitle = seoTitle?.Trim();
        SeoDescription = seoDescription?.Trim();
        Status = ContentStatus.Draft;
        PublishedAt = null;
        ScheduledAt = null;
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Changes locale/type classification.</summary>
    public void ChangeClassification(ContentEntryType type, string locale)
    {
        Type = type;
        Locale = locale.ToLowerInvariant();
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Publishes the current draft.</summary>
    public void Publish()
    {
        Status = ContentStatus.Published;
        ScheduledAt = null;
        PublishedAt ??= DateTimeOffset.UtcNow;
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Schedules publication.</summary>
    public void Schedule(DateTimeOffset scheduledAt)
    {
        Status = ContentStatus.Scheduled;
        ScheduledAt = scheduledAt.ToUniversalTime();
        PublishedAt = null;
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Returns the entry to draft.</summary>
    public void Unpublish()
    {
        Status = ContentStatus.Draft;
        PublishedAt = null;
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    private static string NormalizeSlug(string slug) =>
        slug.Trim().ToLowerInvariant()
            .Replace(' ', '-')
            .Replace("/", "-");
}

/// <summary>Immutable snapshot of a content entry before an update.</summary>
public sealed class ContentEntryRevision : Entity<Guid>
{
    private ContentEntryRevision()
    {
    }

    internal ContentEntryRevision(
        Guid id,
        Guid contentEntryId,
        string title,
        string? excerpt,
        string body,
        Guid? heroMediaId,
        string? heroImageUrl,
        string? seoTitle,
        string? seoDescription,
        DateTimeOffset capturedAt) : base(id)
    {
        ContentEntryId = contentEntryId;
        Title = title;
        Excerpt = excerpt;
        Body = body;
        HeroMediaId = heroMediaId;
        HeroImageUrl = heroImageUrl;
        SeoTitle = seoTitle;
        SeoDescription = seoDescription;
        CapturedAt = capturedAt;
    }

    /// <summary>Parent entry id.</summary>
    public Guid ContentEntryId { get; private set; }

    /// <summary>Title snapshot.</summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>Excerpt snapshot.</summary>
    public string? Excerpt { get; private set; }

    /// <summary>Body snapshot.</summary>
    public string Body { get; private set; } = string.Empty;

    /// <summary>Hero media id snapshot.</summary>
    public Guid? HeroMediaId { get; private set; }

    /// <summary>Hero URL snapshot.</summary>
    public string? HeroImageUrl { get; private set; }

    /// <summary>SEO title snapshot.</summary>
    public string? SeoTitle { get; private set; }

    /// <summary>SEO description snapshot.</summary>
    public string? SeoDescription { get; private set; }

    /// <summary>Snapshot time.</summary>
    public DateTimeOffset CapturedAt { get; private set; }
}

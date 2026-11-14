using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Content;

/// <summary>
/// Localized blog post with comments, view/like counters, and SEO fields.
/// </summary>
public sealed class BlogPost : AggregateRoot<Guid>
{
    private readonly List<BlogPostTranslation> _translations = [];

    private BlogPost()
    {
    }

    private BlogPost(
        Guid id,
        string slug,
        Guid authorUserId,
        Guid? categoryId,
        string? coverUrl,
        DateTimeOffset createdAt) : base(id)
    {
        Slug = slug;
        AuthorUserId = authorUserId;
        CategoryId = categoryId;
        CoverUrl = coverUrl;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
        Status = ContentStatus.Draft;
    }

    /// <summary>Unique public slug.</summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>Author user id.</summary>
    public Guid AuthorUserId { get; private set; }

    /// <summary>Optional category.</summary>
    public Guid? CategoryId { get; private set; }

    /// <summary>Optional cover image.</summary>
    public string? CoverUrl { get; private set; }

    /// <summary>Publication state.</summary>
    public ContentStatus Status { get; private set; }

    /// <summary>View count.</summary>
    public int ViewCount { get; private set; }

    /// <summary>Like count.</summary>
    public int LikeCount { get; private set; }

    /// <summary>Publication time.</summary>
    public DateTimeOffset? PublishedAt { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Localized content.</summary>
    public IReadOnlyCollection<BlogPostTranslation> Translations => _translations;

    /// <summary>Creates a draft post.</summary>
    public static BlogPost Create(
        IIdGenerator ids,
        string slug,
        Guid authorUserId,
        Guid? categoryId = null,
        string? coverUrl = null,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(slug) || authorUserId == Guid.Empty)
        {
            throw new ArgumentException("Blog slug and author are required.");
        }

        return new BlogPost(
            ids.NewId(),
            slug.Trim().ToLowerInvariant(),
            authorUserId,
            categoryId,
            string.IsNullOrWhiteSpace(coverUrl) ? null : coverUrl.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Adds a localized translation.</summary>
    public void AddTranslation(
        IIdGenerator ids,
        string locale,
        string title,
        string excerpt,
        string body,
        string? seoTitle = null,
        string? seoDescription = null)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Blog translation '{locale}' already exists.");
        }

        _translations.Add(new BlogPostTranslation(
            ids.NewId(),
            Id,
            locale,
            title,
            excerpt,
            body,
            seoTitle,
            seoDescription));
        Touch();
    }

    /// <summary>Publishes the post.</summary>
    public void Publish(DateTimeOffset? now = null)
    {
        Status = ContentStatus.Published;
        PublishedAt ??= now ?? DateTimeOffset.UtcNow;
        Touch();
    }

    /// <summary>Archives the post.</summary>
    public void Archive()
    {
        Status = ContentStatus.Archived;
        Touch();
    }

    /// <summary>Increments the view counter.</summary>
    public void IncrementView() => ViewCount++;

    /// <summary>Increments the like counter.</summary>
    public void IncrementLike()
    {
        LikeCount++;
        Touch();
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}

/// <summary>Localized blog post content.</summary>
public sealed class BlogPostTranslation : Entity<Guid>
{
    private BlogPostTranslation()
    {
    }

    internal BlogPostTranslation(
        Guid id,
        Guid postId,
        string locale,
        string title,
        string excerpt,
        string body,
        string? seoTitle,
        string? seoDescription) : base(id)
    {
        PostId = postId;
        Locale = locale.Trim().ToLowerInvariant();
        Title = title.Trim();
        Excerpt = excerpt.Trim();
        Body = body.Trim();
        SeoTitle = seoTitle?.Trim();
        SeoDescription = seoDescription?.Trim();
    }

    /// <summary>Parent post.</summary>
    public Guid PostId { get; private set; }

    /// <summary>Locale code.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Title.</summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>Excerpt.</summary>
    public string Excerpt { get; private set; } = string.Empty;

    /// <summary>Body.</summary>
    public string Body { get; private set; } = string.Empty;

    /// <summary>Optional SEO title.</summary>
    public string? SeoTitle { get; private set; }

    /// <summary>Optional SEO description.</summary>
    public string? SeoDescription { get; private set; }
}

/// <summary>
/// User travelogue with series, destination tags, comments, and counters.
/// </summary>
public sealed class Travelogue : AggregateRoot<Guid>
{
    private readonly List<TravelogueTranslation> _translations = [];
    private readonly List<TravelogueDestination> _destinations = [];

    private Travelogue()
    {
    }

    private Travelogue(
        Guid id,
        string slug,
        Guid authorUserId,
        string? seriesName,
        string? coverUrl,
        DateTimeOffset createdAt) : base(id)
    {
        Slug = slug;
        AuthorUserId = authorUserId;
        SeriesName = seriesName;
        CoverUrl = coverUrl;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
        Status = ContentStatus.Draft;
    }

    /// <summary>Unique public slug.</summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>Author user id.</summary>
    public Guid AuthorUserId { get; private set; }

    /// <summary>Optional series name.</summary>
    public string? SeriesName { get; private set; }

    /// <summary>Optional cover image.</summary>
    public string? CoverUrl { get; private set; }

    /// <summary>Publication state.</summary>
    public ContentStatus Status { get; private set; }

    /// <summary>View count.</summary>
    public int ViewCount { get; private set; }

    /// <summary>Like count.</summary>
    public int LikeCount { get; private set; }

    /// <summary>Publication time.</summary>
    public DateTimeOffset? PublishedAt { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Localized content.</summary>
    public IReadOnlyCollection<TravelogueTranslation> Translations => _translations;

    /// <summary>Destination tags.</summary>
    public IReadOnlyCollection<TravelogueDestination> Destinations => _destinations;

    /// <summary>Creates a draft travelogue.</summary>
    public static Travelogue Create(
        IIdGenerator ids,
        string slug,
        Guid authorUserId,
        string? seriesName = null,
        string? coverUrl = null,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(slug) || authorUserId == Guid.Empty)
        {
            throw new ArgumentException("Travelogue slug and author are required.");
        }

        return new Travelogue(
            ids.NewId(),
            slug.Trim().ToLowerInvariant(),
            authorUserId,
            string.IsNullOrWhiteSpace(seriesName) ? null : seriesName.Trim(),
            string.IsNullOrWhiteSpace(coverUrl) ? null : coverUrl.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Adds a localized translation.</summary>
    public void AddTranslation(
        IIdGenerator ids,
        string locale,
        string title,
        string body,
        string? seoTitle = null,
        string? seoDescription = null)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Travelogue translation '{locale}' already exists.");
        }

        _translations.Add(new TravelogueTranslation(
            ids.NewId(),
            Id,
            locale,
            title,
            body,
            seoTitle,
            seoDescription));
        Touch();
    }

    /// <summary>Replaces destination tags.</summary>
    public void ReplaceDestinations(IIdGenerator ids, IEnumerable<Guid> destinationIds)
    {
        _destinations.Clear();

        foreach (var destinationId in destinationIds.Distinct())
        {
            _destinations.Add(new TravelogueDestination(ids.NewId(), Id, destinationId));
        }

        Touch();
    }

    /// <summary>Publishes the travelogue.</summary>
    public void Publish(DateTimeOffset? now = null)
    {
        Status = ContentStatus.Published;
        PublishedAt ??= now ?? DateTimeOffset.UtcNow;
        Touch();
    }

    /// <summary>Increments the view counter.</summary>
    public void IncrementView() => ViewCount++;

    /// <summary>Increments the like counter.</summary>
    public void IncrementLike()
    {
        LikeCount++;
        Touch();
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}

/// <summary>Localized travelogue content.</summary>
public sealed class TravelogueTranslation : Entity<Guid>
{
    private TravelogueTranslation()
    {
    }

    internal TravelogueTranslation(
        Guid id,
        Guid travelogueId,
        string locale,
        string title,
        string body,
        string? seoTitle,
        string? seoDescription) : base(id)
    {
        TravelogueId = travelogueId;
        Locale = locale.Trim().ToLowerInvariant();
        Title = title.Trim();
        Body = body.Trim();
        SeoTitle = seoTitle?.Trim();
        SeoDescription = seoDescription?.Trim();
    }

    /// <summary>Parent travelogue.</summary>
    public Guid TravelogueId { get; private set; }

    /// <summary>Locale code.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Title.</summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>Body.</summary>
    public string Body { get; private set; } = string.Empty;

    /// <summary>Optional SEO title.</summary>
    public string? SeoTitle { get; private set; }

    /// <summary>Optional SEO description.</summary>
    public string? SeoDescription { get; private set; }
}

/// <summary>Destination tag on a travelogue.</summary>
public sealed class TravelogueDestination : Entity<Guid>
{
    private TravelogueDestination()
    {
    }

    internal TravelogueDestination(Guid id, Guid travelogueId, Guid destinationId) : base(id)
    {
        TravelogueId = travelogueId;
        DestinationId = destinationId;
    }

    /// <summary>Parent travelogue.</summary>
    public Guid TravelogueId { get; private set; }

    /// <summary>Destination id.</summary>
    public Guid DestinationId { get; private set; }
}

/// <summary>
/// Video content backed by Aparat or direct MP4 with level and counters.
/// </summary>
public sealed class Video : AggregateRoot<Guid>
{
    private readonly List<VideoTranslation> _translations = [];

    private Video()
    {
    }

    private Video(
        Guid id,
        string slug,
        Guid authorUserId,
        Guid? categoryId,
        string videoUrl,
        string provider,
        string? coverUrl,
        int durationSeconds,
        int level,
        DateTimeOffset createdAt) : base(id)
    {
        Slug = slug;
        AuthorUserId = authorUserId;
        CategoryId = categoryId;
        VideoUrl = videoUrl;
        Provider = provider;
        CoverUrl = coverUrl;
        DurationSeconds = durationSeconds;
        Level = level;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
        Status = ContentStatus.Draft;
    }

    /// <summary>Unique public slug.</summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>Author user id.</summary>
    public Guid AuthorUserId { get; private set; }

    /// <summary>Optional category.</summary>
    public Guid? CategoryId { get; private set; }

    /// <summary>Video URL.</summary>
    public string VideoUrl { get; private set; } = string.Empty;

    /// <summary>Provider such as Aparat or Mp4.</summary>
    public string Provider { get; private set; } = string.Empty;

    /// <summary>Optional cover image.</summary>
    public string? CoverUrl { get; private set; }

    /// <summary>Duration in seconds.</summary>
    public int DurationSeconds { get; private set; }

    /// <summary>Content level from 0 to 7.</summary>
    public int Level { get; private set; }

    /// <summary>Publication state.</summary>
    public ContentStatus Status { get; private set; }

    /// <summary>View count.</summary>
    public int ViewCount { get; private set; }

    /// <summary>Like count.</summary>
    public int LikeCount { get; private set; }

    /// <summary>Publication time.</summary>
    public DateTimeOffset? PublishedAt { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Localized content.</summary>
    public IReadOnlyCollection<VideoTranslation> Translations => _translations;

    /// <summary>Creates a draft video.</summary>
    public static Video Create(
        IIdGenerator ids,
        string slug,
        Guid authorUserId,
        string videoUrl,
        string provider,
        Guid? categoryId = null,
        string? coverUrl = null,
        int durationSeconds = 0,
        int level = 0,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(slug) || authorUserId == Guid.Empty ||
            string.IsNullOrWhiteSpace(videoUrl) || string.IsNullOrWhiteSpace(provider))
        {
            throw new ArgumentException("Video slug, author, URL, and provider are required.");
        }

        if (durationSeconds < 0 || level is < 0 or > 7)
        {
            throw new ArgumentOutOfRangeException(nameof(durationSeconds), "Video duration or level is invalid.");
        }

        return new Video(
            ids.NewId(),
            slug.Trim().ToLowerInvariant(),
            authorUserId,
            categoryId,
            videoUrl.Trim(),
            provider.Trim(),
            string.IsNullOrWhiteSpace(coverUrl) ? null : coverUrl.Trim(),
            durationSeconds,
            level,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Adds a localized translation.</summary>
    public void AddTranslation(
        IIdGenerator ids,
        string locale,
        string title,
        string description,
        string? seoTitle = null,
        string? seoDescription = null)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Video translation '{locale}' already exists.");
        }

        _translations.Add(new VideoTranslation(
            ids.NewId(),
            Id,
            locale,
            title,
            description,
            seoTitle,
            seoDescription));
        Touch();
    }

    /// <summary>Publishes the video.</summary>
    public void Publish(DateTimeOffset? now = null)
    {
        Status = ContentStatus.Published;
        PublishedAt ??= now ?? DateTimeOffset.UtcNow;
        Touch();
    }

    /// <summary>Increments the view counter.</summary>
    public void IncrementView() => ViewCount++;

    /// <summary>Increments the like counter.</summary>
    public void IncrementLike()
    {
        LikeCount++;
        Touch();
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}

/// <summary>Localized video content.</summary>
public sealed class VideoTranslation : Entity<Guid>
{
    private VideoTranslation()
    {
    }

    internal VideoTranslation(
        Guid id,
        Guid videoId,
        string locale,
        string title,
        string description,
        string? seoTitle,
        string? seoDescription) : base(id)
    {
        VideoId = videoId;
        Locale = locale.Trim().ToLowerInvariant();
        Title = title.Trim();
        Description = description.Trim();
        SeoTitle = seoTitle?.Trim();
        SeoDescription = seoDescription?.Trim();
    }

    /// <summary>Parent video.</summary>
    public Guid VideoId { get; private set; }

    /// <summary>Locale code.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Title.</summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>Description.</summary>
    public string Description { get; private set; } = string.Empty;

    /// <summary>Optional SEO title.</summary>
    public string? SeoTitle { get; private set; }

    /// <summary>Optional SEO description.</summary>
    public string? SeoDescription { get; private set; }
}

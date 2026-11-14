using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Domain.Content;

namespace Hani.Modules.Content.Application.Commands.Editorial;

/// <summary>Create a content category.</summary>
public sealed record CreateCategoryCommand(
    string Slug,
    ContentType Type,
    IReadOnlyList<CategoryTranslationInput> Translations) : ICommand<Guid>;

/// <summary>Create a draft blog post.</summary>
public sealed record CreateBlogPostCommand(
    string Slug,
    Guid AuthorUserId,
    string? CategorySlug,
    string? CoverUrl,
    IReadOnlyList<BlogTranslationInput> Translations) : ICommand<Guid>;

/// <summary>Publish a blog post.</summary>
public sealed record PublishBlogPostCommand(string Slug) : ICommand<bool>;

/// <summary>Create a draft travelogue.</summary>
public sealed record CreateTravelogueCommand(
    string Slug,
    Guid AuthorUserId,
    string? SeriesName,
    string? CoverUrl,
    IReadOnlyList<Guid> DestinationIds,
    IReadOnlyList<TravelogueTranslationInput> Translations) : ICommand<Guid>;

/// <summary>Publish a travelogue.</summary>
public sealed record PublishTravelogueCommand(string Slug) : ICommand<bool>;

/// <summary>Create a draft video.</summary>
public sealed record CreateVideoCommand(
    string Slug,
    Guid AuthorUserId,
    string VideoUrl,
    string Provider,
    string? CategorySlug,
    string? CoverUrl,
    int DurationSeconds,
    int Level,
    IReadOnlyList<VideoTranslationInput> Translations) : ICommand<Guid>;

/// <summary>Publish a video.</summary>
public sealed record PublishVideoCommand(string Slug) : ICommand<bool>;

/// <summary>Create a pending comment on content.</summary>
public sealed record CreateCommentCommand(
    ContentType ContentType,
    string Slug,
    Guid? UserId,
    string AuthorName,
    string Body,
    Guid? ParentId = null) : ICommand<Guid>;

/// <summary>Publish a pending comment.</summary>
public sealed record PublishCommentCommand(Guid CommentId) : ICommand<bool>;

/// <summary>Reject a pending comment.</summary>
public sealed record RejectCommentCommand(Guid CommentId) : ICommand<bool>;

/// <summary>Increment the like counter of one content item.</summary>
public sealed record LikeContentCommand(ContentType ContentType, string Slug) : ICommand<bool>;

/// <summary>Localized category input.</summary>
public sealed record CategoryTranslationInput(string Locale, string Name);

/// <summary>Localized blog input.</summary>
public sealed record BlogTranslationInput(
    string Locale,
    string Title,
    string Excerpt,
    string Body,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>Localized travelogue input.</summary>
public sealed record TravelogueTranslationInput(
    string Locale,
    string Title,
    string Body,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>Localized video input.</summary>
public sealed record VideoTranslationInput(
    string Locale,
    string Title,
    string Description,
    string? SeoTitle = null,
    string? SeoDescription = null);

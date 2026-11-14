using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Domain.Content;

namespace Hani.Modules.Content.Application.Commands.Editorial;

internal sealed class CreateCategoryCommandHandler(
    IContentRepository repository,
    IIdGenerator ids)
    : ICommandHandler<CreateCategoryCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateCategoryCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var category = ContentCategory.Create(ids, request.Slug, request.Type);

            foreach (var translation in request.Translations)
            {
                category.AddTranslation(ids, translation.Locale, translation.Name);
            }

            await repository.AddCategoryAsync(category, cancellationToken);
            return Result<Guid>.Success(category.Id);
        }
        catch (Exception exception) when (exception is ArgumentException or InvalidOperationException)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CONTENT-1001", exception.Message));
        }
    }
}

internal sealed class CreateBlogPostCommandHandler(
    IContentRepository repository,
    IIdGenerator ids)
    : ICommandHandler<CreateBlogPostCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateBlogPostCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var categoryId = await ResolveCategoryIdAsync(
                repository,
                ContentType.Blog,
                request.CategorySlug,
                cancellationToken);
            var post = BlogPost.Create(
                ids,
                request.Slug,
                request.AuthorUserId,
                categoryId,
                request.CoverUrl);

            foreach (var translation in request.Translations)
            {
                post.AddTranslation(
                    ids,
                    translation.Locale,
                    translation.Title,
                    translation.Excerpt,
                    translation.Body,
                    translation.SeoTitle,
                    translation.SeoDescription);
            }

            await repository.AddBlogAsync(post, cancellationToken);
            return Result<Guid>.Success(post.Id);
        }
        catch (Exception exception) when (exception is ArgumentException or InvalidOperationException)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CONTENT-1002", exception.Message));
        }
    }

    internal static async Task<Guid?> ResolveCategoryIdAsync(
        IContentRepository repository,
        ContentType type,
        string? slug,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return null;
        }

        var category = await repository.GetCategoryBySlugAsync(type, slug, cancellationToken)
            ?? throw new ArgumentException("Category was not found.", nameof(slug));
        return category.Id;
    }
}

internal sealed class PublishBlogPostCommandHandler(IContentRepository repository)
    : ICommandHandler<PublishBlogPostCommand, bool>
{
    public async Task<Result<bool>> Handle(
        PublishBlogPostCommand request,
        CancellationToken cancellationToken)
    {
        var post = await repository.GetBlogBySlugAsync(request.Slug, cancellationToken);

        if (post is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1003", "Blog post was not found."));
        }

        post.Publish();
        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class CreateTravelogueCommandHandler(
    IContentRepository repository,
    IIdGenerator ids)
    : ICommandHandler<CreateTravelogueCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateTravelogueCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var travelogue = Travelogue.Create(
                ids,
                request.Slug,
                request.AuthorUserId,
                request.SeriesName,
                request.CoverUrl);
            travelogue.ReplaceDestinations(ids, request.DestinationIds);

            foreach (var translation in request.Translations)
            {
                travelogue.AddTranslation(
                    ids,
                    translation.Locale,
                    translation.Title,
                    translation.Body,
                    translation.SeoTitle,
                    translation.SeoDescription);
            }

            await repository.AddTravelogueAsync(travelogue, cancellationToken);
            return Result<Guid>.Success(travelogue.Id);
        }
        catch (Exception exception) when (exception is ArgumentException or InvalidOperationException)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CONTENT-1004", exception.Message));
        }
    }
}

internal sealed class PublishTravelogueCommandHandler(IContentRepository repository)
    : ICommandHandler<PublishTravelogueCommand, bool>
{
    public async Task<Result<bool>> Handle(
        PublishTravelogueCommand request,
        CancellationToken cancellationToken)
    {
        var travelogue = await repository.GetTravelogueBySlugAsync(request.Slug, cancellationToken);

        if (travelogue is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1005", "Travelogue was not found."));
        }

        travelogue.Publish();
        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class CreateVideoCommandHandler(
    IContentRepository repository,
    IIdGenerator ids)
    : ICommandHandler<CreateVideoCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateVideoCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var categoryId = await CreateBlogPostCommandHandler.ResolveCategoryIdAsync(
                repository,
                ContentType.Video,
                request.CategorySlug,
                cancellationToken);
            var video = Video.Create(
                ids,
                request.Slug,
                request.AuthorUserId,
                request.VideoUrl,
                request.Provider,
                categoryId,
                request.CoverUrl,
                request.DurationSeconds,
                request.Level);

            foreach (var translation in request.Translations)
            {
                video.AddTranslation(
                    ids,
                    translation.Locale,
                    translation.Title,
                    translation.Description,
                    translation.SeoTitle,
                    translation.SeoDescription);
            }

            await repository.AddVideoAsync(video, cancellationToken);
            return Result<Guid>.Success(video.Id);
        }
        catch (Exception exception) when (exception is ArgumentException or InvalidOperationException)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CONTENT-1006", exception.Message));
        }
    }
}

internal sealed class PublishVideoCommandHandler(IContentRepository repository)
    : ICommandHandler<PublishVideoCommand, bool>
{
    public async Task<Result<bool>> Handle(
        PublishVideoCommand request,
        CancellationToken cancellationToken)
    {
        var video = await repository.GetVideoBySlugAsync(request.Slug, cancellationToken);

        if (video is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1007", "Video was not found."));
        }

        video.Publish();
        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class CreateCommentCommandHandler(
    IContentRepository repository,
    IIdGenerator ids)
    : ICommandHandler<CreateCommentCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateCommentCommand request,
        CancellationToken cancellationToken)
    {
        var contentId = request.ContentType switch
        {
            ContentType.Blog => (await repository.GetBlogBySlugAsync(request.Slug, cancellationToken))?.Id,
            ContentType.Travelogue => (await repository.GetTravelogueBySlugAsync(request.Slug, cancellationToken))?.Id,
            ContentType.Video => (await repository.GetVideoBySlugAsync(request.Slug, cancellationToken))?.Id,
            _ => null
        };

        if (contentId is null)
        {
            return Result<Guid>.Failure(Error.NotFound("HANI-CONTENT-1008", "Content was not found."));
        }

        try
        {
            var comment = ContentComment.Create(
                ids,
                request.ContentType,
                contentId.Value,
                request.UserId,
                request.AuthorName,
                request.Body,
                request.ParentId);
            await repository.AddCommentAsync(comment, cancellationToken);
            return Result<Guid>.Success(comment.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CONTENT-1009", exception.Message));
        }
    }
}

internal sealed class PublishCommentCommandHandler(IContentRepository repository)
    : ICommandHandler<PublishCommentCommand, bool>
{
    public async Task<Result<bool>> Handle(
        PublishCommentCommand request,
        CancellationToken cancellationToken)
    {
        var comment = await repository.GetCommentAsync(request.CommentId, cancellationToken);

        if (comment is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1010", "Comment was not found."));
        }

        comment.Publish();
        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class RejectCommentCommandHandler(IContentRepository repository)
    : ICommandHandler<RejectCommentCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectCommentCommand request,
        CancellationToken cancellationToken)
    {
        var comment = await repository.GetCommentAsync(request.CommentId, cancellationToken);

        if (comment is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1010", "Comment was not found."));
        }

        comment.Reject();
        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class LikeContentCommandHandler(IContentRepository repository)
    : ICommandHandler<LikeContentCommand, bool>
{
    public async Task<Result<bool>> Handle(
        LikeContentCommand request,
        CancellationToken cancellationToken)
    {
        switch (request.ContentType)
        {
            case ContentType.Blog:
                {
                    var post = await repository.GetBlogBySlugAsync(request.Slug, cancellationToken);
                    if (post is null)
                    {
                        return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1003", "Blog post was not found."));
                    }

                    post.IncrementLike();
                    break;
                }
            case ContentType.Travelogue:
                {
                    var travelogue = await repository.GetTravelogueBySlugAsync(request.Slug, cancellationToken);
                    if (travelogue is null)
                    {
                        return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1005", "Travelogue was not found."));
                    }

                    travelogue.IncrementLike();
                    break;
                }
            case ContentType.Video:
                {
                    var video = await repository.GetVideoBySlugAsync(request.Slug, cancellationToken);
                    if (video is null)
                    {
                        return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1007", "Video was not found."));
                    }

                    video.IncrementLike();
                    break;
                }
            default:
                return Result<bool>.Failure(Error.Validation("HANI-CONTENT-1011", "Content type is invalid."));
        }

        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.Commands.Editorial;
using Hani.Modules.Content.Application.Commands.Growth;
using Hani.Modules.Content.Application.Queries.Dashboard;
using Hani.Modules.Content.Application.Queries.Editorial;
using Hani.Modules.Content.Application.Queries.Growth;
using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Domain.Dashboard;
using Hani.Modules.Content.Domain.Growth;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Content.Presentation;

/// <summary>
/// Public and internal content/growth endpoints.
/// </summary>
public static class ContentEndpoints
{
    /// <summary>
    /// Maps content and growth endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapContentEndpoints(this IEndpointRouteBuilder app)
    {
        var content = app.MapGroup("/market/v1/content").WithTags("Content");
        var growth = app.MapGroup("/market/v1/growth").WithTags("Growth");
        var internalContent = app.MapGroup("/internal/v1/content").WithTags("Internal.Content");
        var internalGrowth = app.MapGroup("/internal/v1/growth").WithTags("Internal.Growth");
        var dashboard = app.MapGroup("/market/v1/dashboard").WithTags("Dashboard");
        var internalDashboard = app.MapGroup("/internal/v1/dashboard").WithTags("Internal.Dashboard");

        content.MapGet("/blog", SearchBlogAsync).WithName("Marketplace.SearchBlog");
        content.MapGet("/blog/{slug}", GetBlogAsync).WithName("Marketplace.GetBlog");
        content.MapPost("/blog/{slug}/comments", CreateBlogCommentAsync).WithName("Marketplace.CreateBlogComment");
        content.MapPost("/blog/{slug}/like", LikeBlogAsync).WithName("Marketplace.LikeBlog");
        content.MapGet("/travelogues", SearchTraveloguesAsync).WithName("Marketplace.SearchTravelogues");
        content.MapGet("/travelogues/{slug}", GetTravelogueAsync).WithName("Marketplace.GetTravelogue");
        content.MapPost("/travelogues/{slug}/comments", CreateTravelogueCommentAsync).WithName("Marketplace.CreateTravelogueComment");
        content.MapPost("/travelogues/{slug}/like", LikeTravelogueAsync).WithName("Marketplace.LikeTravelogue");
        content.MapGet("/videos", SearchVideosAsync).WithName("Marketplace.SearchVideos");
        content.MapGet("/videos/{slug}", GetVideoAsync).WithName("Marketplace.GetVideo");
        content.MapPost("/videos/{slug}/comments", CreateVideoCommentAsync).WithName("Marketplace.CreateVideoComment");
        content.MapPost("/videos/{slug}/like", LikeVideoAsync).WithName("Marketplace.LikeVideo");
        content.MapGet("/authors/{userId:guid}/stats", GetAuthorStatsAsync).WithName("Marketplace.GetAuthorContentStats");
        content.MapGet("/trending", GetTrendingAsync).WithName("Marketplace.GetTrendingContent");

        growth.MapGet("/ads/{slotCode}", GetAdSlotAsync).WithName("Marketplace.GetAdSlot");
        growth.MapPost("/ads/events", RecordAdEventAsync).WithName("Marketplace.RecordAdEvent");
        growth.MapPost("/newsletter/subscribe", SubscribeNewsletterAsync).WithName("Marketplace.SubscribeNewsletter");
        growth.MapPost("/newsletter/verify", VerifyNewsletterAsync).WithName("Marketplace.VerifyNewsletter");
        growth.MapPost("/newsletter/unsubscribe", UnsubscribeNewsletterAsync).WithName("Marketplace.UnsubscribeNewsletter");
        growth.MapGet("/campaigns", ListCampaignsAsync).WithName("Marketplace.ListCampaigns");
        growth.MapGet("/campaigns/{slug}", GetCampaignAsync).WithName("Marketplace.GetCampaign");
        growth.MapPost("/campaigns/{slug}/register", RegisterCampaignAsync).WithName("Marketplace.RegisterCampaign");

        internalContent.MapPost("/categories", CreateCategoryAsync).WithName("Internal.CreateContentCategory");
        internalContent.MapPost("/blog", CreateBlogAsync).WithName("Internal.CreateBlogPost");
        internalContent.MapPost("/blog/{slug}/publish", PublishBlogAsync).WithName("Internal.PublishBlogPost");
        internalContent.MapPost("/travelogues", CreateTravelogueAsync).WithName("Internal.CreateTravelogue");
        internalContent.MapPost("/travelogues/{slug}/publish", PublishTravelogueAsync).WithName("Internal.PublishTravelogue");
        internalContent.MapPost("/videos", CreateVideoAsync).WithName("Internal.CreateVideo");
        internalContent.MapPost("/videos/{slug}/publish", PublishVideoAsync).WithName("Internal.PublishVideo");
        internalContent.MapPost("/comments/{commentId:guid}/publish", PublishCommentAsync).WithName("Internal.PublishComment");
        internalContent.MapPost("/comments/{commentId:guid}/reject", RejectCommentAsync).WithName("Internal.RejectComment");

        internalGrowth.MapPost("/ads/slots", CreateAdSlotAsync).WithName("Internal.CreateAdSlot");
        internalGrowth.MapPost("/ads/creatives", AddAdCreativeAsync).WithName("Internal.AddAdCreative");
        internalGrowth.MapPost("/campaigns", CreateCampaignAsync).WithName("Internal.CreateCampaign");
        internalGrowth.MapPost("/campaigns/{slug}/activate", ActivateCampaignAsync).WithName("Internal.ActivateCampaign");
        internalGrowth.MapPost("/notifications", CreateNotificationAsync).WithName("Internal.CreateNotification");
        internalGrowth.MapPost("/analytics", RecordAnalyticsAsync).WithName("Internal.RecordAnalytics");
        growth.MapGet("/analytics/summary", GetAnalyticsSummaryAsync).WithName("Marketplace.GetAnalyticsSummary");

        dashboard.MapGet("/{userId:guid}", GetDashboardAsync).WithName("Marketplace.GetDashboard");
        dashboard.MapGet("/{userId:guid}/messages", ListMessagesAsync).WithName("Marketplace.ListDashboardMessages");
        dashboard.MapGet("/{userId:guid}/documents", ListDocumentsAsync).WithName("Marketplace.ListDashboardDocuments");
        internalDashboard.MapPost("/messages", CreateMessageAsync).WithName("Internal.CreateUserMessage");
        internalDashboard.MapPost("/messages/{messageId:guid}/read", MarkMessageReadAsync).WithName("Internal.MarkUserMessageRead");
        internalDashboard.MapPost("/documents", CreateDocumentAsync).WithName("Internal.CreateUserDocument");
        internalDashboard.MapPost("/documents/{documentId:guid}/status", SetDocumentStatusAsync).WithName("Internal.SetUserDocumentStatus");

        return app;
    }

    /// <summary>Searches published blog posts.</summary>
    private static async Task<IResult> SearchBlogAsync(
        [AsParameters] SearchBlogRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new SearchBlogQuery(
            request.Locale,
            request.CategorySlug,
            request.Q,
            request.Page,
            request.PageSize), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Reads one published blog post.</summary>
    private static async Task<IResult> GetBlogAsync(
        string slug,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetBlogQuery(slug, locale), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a pending blog comment.</summary>
    private static Task<IResult> CreateBlogCommentAsync(
        string slug,
        CreateCommentRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => CreateCommentAsync(ContentType.Blog, slug, request, context, sender, cancellationToken);

    /// <summary>Likes a blog post.</summary>
    private static Task<IResult> LikeBlogAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => LikeAsync(ContentType.Blog, slug, context, sender, cancellationToken);

    /// <summary>Searches published travelogues.</summary>
    private static async Task<IResult> SearchTraveloguesAsync(
        [AsParameters] SearchTravelogueRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new SearchTraveloguesQuery(
            request.Locale,
            request.DestinationId,
            request.Series,
            request.Page,
            request.PageSize), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Reads one travelogue.</summary>
    private static async Task<IResult> GetTravelogueAsync(
        string slug,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetTravelogueQuery(slug, locale), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a pending travelogue comment.</summary>
    private static Task<IResult> CreateTravelogueCommentAsync(
        string slug,
        CreateCommentRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => CreateCommentAsync(ContentType.Travelogue, slug, request, context, sender, cancellationToken);

    /// <summary>Likes a travelogue.</summary>
    private static Task<IResult> LikeTravelogueAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => LikeAsync(ContentType.Travelogue, slug, context, sender, cancellationToken);

    /// <summary>Searches published videos.</summary>
    private static async Task<IResult> SearchVideosAsync(
        [AsParameters] SearchVideosRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new SearchVideosQuery(
            request.Locale,
            request.CategoryId,
            request.Level,
            request.Page,
            request.PageSize), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Reads one video.</summary>
    private static async Task<IResult> GetVideoAsync(
        string slug,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetVideoQuery(slug, locale), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a pending video comment.</summary>
    private static Task<IResult> CreateVideoCommentAsync(
        string slug,
        CreateCommentRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => CreateCommentAsync(ContentType.Video, slug, request, context, sender, cancellationToken);

    /// <summary>Likes a video.</summary>
    private static Task<IResult> LikeVideoAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => LikeAsync(ContentType.Video, slug, context, sender, cancellationToken);

    /// <summary>Reads author content counts.</summary>
    private static async Task<IResult> GetAuthorStatsAsync(
        Guid userId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetAuthorContentStatsQuery(userId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Returns trending content.</summary>
    private static async Task<IResult> GetTrendingAsync(
        string? locale,
        int? limit,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetTrendingContentQuery(locale, limit ?? 10),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Returns active ads for a slot.</summary>
    private static async Task<IResult> GetAdSlotAsync(
        string slotCode,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetAdSlotQuery(slotCode), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Records an ad impression or click.</summary>
    private static async Task<IResult> RecordAdEventAsync(
        RecordAdEventRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new RecordAdEventCommand(
            request.CreativeId,
            request.SlotCode,
            request.Type), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Starts a newsletter or SMS subscription.</summary>
    private static async Task<IResult> SubscribeNewsletterAsync(
        SubscribeNewsletterRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new SubscribeNewsletterCommand(
            request.Contact,
            request.Channel,
            request.Locale), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Verifies a pending subscription.</summary>
    private static async Task<IResult> VerifyNewsletterAsync(
        VerifyNewsletterRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new VerifyNewsletterCommand(
            request.Contact,
            request.Channel,
            request.Code), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Unsubscribes a contact.</summary>
    private static async Task<IResult> UnsubscribeNewsletterAsync(
        UnsubscribeNewsletterRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new UnsubscribeNewsletterCommand(
            request.Contact,
            request.Channel), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Lists active campaigns.</summary>
    private static async Task<IResult> ListCampaignsAsync(
        int? page,
        int? pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ListCampaignsQuery(page ?? 1, pageSize ?? 20),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Reads one campaign.</summary>
    private static async Task<IResult> GetCampaignAsync(
        string slug,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetCampaignQuery(slug, locale), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Registers for a campaign.</summary>
    private static async Task<IResult> RegisterCampaignAsync(
        string slug,
        RegisterCampaignRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new RegisterCampaignCommand(
            slug,
            request.FullName,
            request.Contact,
            request.Channel), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a content category.</summary>
    private static async Task<IResult> CreateCategoryAsync(
        CreateCategoryRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateCategoryCommand(
            request.Slug,
            request.Type,
            request.Translations.Select(item => new CategoryTranslationInput(item.Locale, item.Name)).ToArray()),
            cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/content/categories", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a draft blog post.</summary>
    private static async Task<IResult> CreateBlogAsync(
        CreateBlogRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateBlogPostCommand(
            request.Slug,
            request.AuthorUserId,
            request.CategorySlug,
            request.CoverUrl,
            request.Translations.Select(item => new BlogTranslationInput(
                item.Locale,
                item.Title,
                item.Excerpt,
                item.Body,
                item.SeoTitle,
                item.SeoDescription)).ToArray()), cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/content/blog", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Publishes a blog post.</summary>
    private static Task<IResult> PublishBlogAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => PublishAsync(new PublishBlogPostCommand(slug), context, sender, cancellationToken);

    /// <summary>Creates a draft travelogue.</summary>
    private static async Task<IResult> CreateTravelogueAsync(
        CreateTravelogueRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateTravelogueCommand(
            request.Slug,
            request.AuthorUserId,
            request.SeriesName,
            request.CoverUrl,
            request.DestinationIds,
            request.Translations.Select(item => new TravelogueTranslationInput(
                item.Locale,
                item.Title,
                item.Body,
                item.SeoTitle,
                item.SeoDescription)).ToArray()), cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/content/travelogues", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Publishes a travelogue.</summary>
    private static Task<IResult> PublishTravelogueAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => PublishAsync(new PublishTravelogueCommand(slug), context, sender, cancellationToken);

    /// <summary>Creates a draft video.</summary>
    private static async Task<IResult> CreateVideoAsync(
        CreateVideoRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateVideoCommand(
            request.Slug,
            request.AuthorUserId,
            request.VideoUrl,
            request.Provider,
            request.CategorySlug,
            request.CoverUrl,
            request.DurationSeconds,
            request.Level,
            request.Translations.Select(item => new VideoTranslationInput(
                item.Locale,
                item.Title,
                item.Description,
                item.SeoTitle,
                item.SeoDescription)).ToArray()), cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/content/videos", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Publishes a video.</summary>
    private static Task<IResult> PublishVideoAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        => PublishAsync(new PublishVideoCommand(slug), context, sender, cancellationToken);

    /// <summary>Publishes a pending comment.</summary>
    private static async Task<IResult> PublishCommentAsync(
        Guid commentId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new PublishCommentCommand(commentId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Rejects a pending comment.</summary>
    private static async Task<IResult> RejectCommentAsync(
        Guid commentId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new RejectCommentCommand(commentId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates an ad slot.</summary>
    private static async Task<IResult> CreateAdSlotAsync(
        CreateAdSlotRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateAdSlotCommand(request.Code, request.Name), cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/growth/ads/slots", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Adds an ad creative.</summary>
    private static async Task<IResult> AddAdCreativeAsync(
        AddAdCreativeRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new AddAdCreativeCommand(
            request.SlotCode,
            request.Title,
            request.ImageUrl,
            request.TargetUrl,
            request.StartsAt,
            request.EndsAt), cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/growth/ads/creatives", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a campaign.</summary>
    private static async Task<IResult> CreateCampaignAsync(
        CreateCampaignRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateCampaignCommand(
            request.Slug,
            request.StartsAt,
            request.EndsAt,
            request.DestinationId,
            request.Price,
            request.Currency,
            request.DiscountPercent,
            request.Translations.Select(item => new CampaignTranslationInput(
                item.Locale,
                item.Title,
                item.Description)).ToArray(),
            request.Faqs.Select(item => new CampaignFaqInput(item.Question, item.Answer)).ToArray()),
            cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/growth/campaigns", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Activates a campaign.</summary>
    private static async Task<IResult> ActivateCampaignAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ActivateCampaignCommand(slug), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a notification request.</summary>
    private static async Task<IResult> CreateNotificationAsync(
        CreateNotificationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateNotificationCommand(
            request.UserId,
            request.Channel,
            request.TemplateKey,
            request.Payload), cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/growth/notifications", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Returns a user's dashboard summary.</summary>
    private static async Task<IResult> GetDashboardAsync(
        Guid userId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetDashboardSummaryQuery(userId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Lists a user's dashboard messages.</summary>
    private static async Task<IResult> ListMessagesAsync(
        Guid userId,
        int? page,
        int? pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ListUserMessagesQuery(userId, page ?? 1, pageSize ?? 20),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Lists a user's documents.</summary>
    private static async Task<IResult> ListDocumentsAsync(
        Guid userId,
        int? page,
        int? pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ListUserDocumentsQuery(userId, page ?? 1, pageSize ?? 20),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a dashboard message.</summary>
    private static async Task<IResult> CreateMessageAsync(
        CreateUserMessageRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateUserMessageCommand(request.UserId, request.Subject, request.Body),
            cancellationToken);
        return result.IsSuccess
            ? Results.Created("/internal/v1/dashboard/messages", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>Marks a dashboard message as read.</summary>
    private static async Task<IResult> MarkMessageReadAsync(
        Guid messageId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new MarkUserMessageReadCommand(messageId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a user document.</summary>
    private static async Task<IResult> CreateDocumentAsync(
        CreateUserDocumentRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateUserDocumentCommand(
                request.UserId,
                request.Name,
                request.FileUrl,
                request.DocumentType),
            cancellationToken);
        return result.IsSuccess
            ? Results.Created("/internal/v1/dashboard/documents", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>Sets a document verification status.</summary>
    private static async Task<IResult> SetDocumentStatusAsync(
        Guid documentId,
        SetDocumentStatusRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SetUserDocumentStatusCommand(documentId, request.Status),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Records an analytics event.</summary>
    private static async Task<IResult> RecordAnalyticsAsync(
        RecordAnalyticsRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new RecordAnalyticsEventCommand(
            request.EventName,
            request.EntityType,
            request.EntityId,
            request.UserId,
            request.Metadata), cancellationToken);
        return result.IsSuccess ? Results.Created("/internal/v1/growth/analytics", result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Returns aggregated analytics counts.</summary>
    private static async Task<IResult> GetAnalyticsSummaryAsync(
        string? eventName,
        DateTimeOffset? from,
        DateTimeOffset? to,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetAnalyticsSummaryQuery(eventName, from, to),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates a pending comment for any content family.
    /// </summary>
    private static async Task<IResult> CreateCommentAsync(
        ContentType type,
        string slug,
        CreateCommentRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CreateCommentCommand(
            type,
            slug,
            request.UserId,
            request.AuthorName,
            request.Body,
            request.ParentId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Increments a like counter for any content family.
    /// </summary>
    private static async Task<IResult> LikeAsync(
        ContentType type,
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new LikeContentCommand(type, slug), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> PublishAsync<TCommand>(
        TCommand command,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
        where TCommand : ICommand<bool>
    {
        var result = await sender.Send(command, cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }
}

/// <summary>Blog search request.</summary>
public sealed record SearchBlogRequest(
    string? Locale = null,
    string? CategorySlug = null,
    string? Q = null,
    int Page = 1,
    int PageSize = 20);

/// <summary>Travelogue search request.</summary>
public sealed record SearchTravelogueRequest(
    string? Locale = null,
    Guid? DestinationId = null,
    string? Series = null,
    int Page = 1,
    int PageSize = 20);

/// <summary>Video search request.</summary>
public sealed record SearchVideosRequest(
    string? Locale = null,
    Guid? CategoryId = null,
    int? Level = null,
    int Page = 1,
    int PageSize = 20);

/// <summary>Comment request.</summary>
public sealed record CreateCommentRequest(
    Guid? UserId,
    string AuthorName,
    string Body,
    Guid? ParentId = null);

/// <summary>Ad event request.</summary>
public sealed record RecordAdEventRequest(Guid CreativeId, string SlotCode, AdEventType Type);

/// <summary>Newsletter subscription request.</summary>
public sealed record SubscribeNewsletterRequest(string Contact, ContactChannel Channel, string Locale);

/// <summary>Newsletter verification request.</summary>
public sealed record VerifyNewsletterRequest(string Contact, ContactChannel Channel, string Code);

/// <summary>Newsletter unsubscribe request.</summary>
public sealed record UnsubscribeNewsletterRequest(string Contact, ContactChannel Channel);

/// <summary>Campaign registration request.</summary>
public sealed record RegisterCampaignRequest(string FullName, string Contact, ContactChannel Channel);

/// <summary>Category creation request.</summary>
public sealed record CreateCategoryRequest(
    string Slug,
    ContentType Type,
    IReadOnlyList<CategoryTranslationRequest> Translations);

/// <summary>Category translation request.</summary>
public sealed record CategoryTranslationRequest(string Locale, string Name);

/// <summary>Blog creation request.</summary>
public sealed record CreateBlogRequest(
    string Slug,
    Guid AuthorUserId,
    string? CategorySlug,
    string? CoverUrl,
    IReadOnlyList<BlogTranslationRequest> Translations);

/// <summary>Blog translation request.</summary>
public sealed record BlogTranslationRequest(
    string Locale,
    string Title,
    string Excerpt,
    string Body,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>Travelogue creation request.</summary>
public sealed record CreateTravelogueRequest(
    string Slug,
    Guid AuthorUserId,
    string? SeriesName,
    string? CoverUrl,
    IReadOnlyList<Guid> DestinationIds,
    IReadOnlyList<TravelogueTranslationRequest> Translations);

/// <summary>Travelogue translation request.</summary>
public sealed record TravelogueTranslationRequest(
    string Locale,
    string Title,
    string Body,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>Video creation request.</summary>
public sealed record CreateVideoRequest(
    string Slug,
    Guid AuthorUserId,
    string VideoUrl,
    string Provider,
    string? CategorySlug,
    string? CoverUrl,
    int DurationSeconds,
    int Level,
    IReadOnlyList<VideoTranslationRequest> Translations);

/// <summary>Video translation request.</summary>
public sealed record VideoTranslationRequest(
    string Locale,
    string Title,
    string Description,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>Ad slot creation request.</summary>
public sealed record CreateAdSlotRequest(string Code, string Name);

/// <summary>Ad creative request.</summary>
public sealed record AddAdCreativeRequest(
    string SlotCode,
    string Title,
    string ImageUrl,
    string TargetUrl,
    DateTimeOffset? StartsAt = null,
    DateTimeOffset? EndsAt = null);

/// <summary>Campaign creation request.</summary>
public sealed record CreateCampaignRequest(
    string Slug,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    Guid? DestinationId,
    decimal? Price,
    string? Currency,
    decimal? DiscountPercent,
    IReadOnlyList<CampaignTranslationRequest> Translations,
    IReadOnlyList<CampaignFaqRequest> Faqs);

/// <summary>Campaign translation request.</summary>
public sealed record CampaignTranslationRequest(string Locale, string Title, string Description);

/// <summary>Campaign FAQ request.</summary>
public sealed record CampaignFaqRequest(string Question, string Answer);

/// <summary>Notification creation request.</summary>
public sealed record CreateNotificationRequest(
    Guid? UserId,
    ContactChannel Channel,
    string TemplateKey,
    string Payload);

/// <summary>Analytics event request.</summary>
public sealed record RecordAnalyticsRequest(
    string EventName,
    string EntityType,
    Guid? EntityId = null,
    Guid? UserId = null,
    string? Metadata = null);

/// <summary>Dashboard message request.</summary>
public sealed record CreateUserMessageRequest(Guid UserId, string Subject, string Body);

/// <summary>Dashboard document request.</summary>
public sealed record CreateUserDocumentRequest(
    Guid UserId,
    string Name,
    string FileUrl,
    string DocumentType);

/// <summary>Document status request.</summary>
public sealed record SetDocumentStatusRequest(UserDocumentStatus Status);

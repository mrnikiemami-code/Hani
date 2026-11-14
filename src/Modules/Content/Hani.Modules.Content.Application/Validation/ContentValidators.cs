using FluentValidation;
using Hani.Modules.Content.Application.Commands.Editorial;
using Hani.Modules.Content.Application.Commands.Growth;
using Hani.Modules.Content.Application.Queries.Editorial;

namespace Hani.Modules.Content.Application.Validation;

/// <summary>Validation rules for content categories.</summary>
public sealed class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateCategoryCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(120).WithErrorCode("HANI-CONTENT-1101");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-CONTENT-1102");
    }
}

/// <summary>Validation rules for blog creation.</summary>
public sealed class CreateBlogPostCommandValidator : AbstractValidator<CreateBlogPostCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateBlogPostCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(180).WithErrorCode("HANI-CONTENT-1103");
        RuleFor(command => command.AuthorUserId).NotEmpty().WithErrorCode("HANI-CONTENT-1104");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-CONTENT-1105");
    }
}

/// <summary>Validation rules for blog publication.</summary>
public sealed class PublishBlogPostCommandValidator : AbstractValidator<PublishBlogPostCommand>
{
    /// <summary>Creates validation rules.</summary>
    public PublishBlogPostCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1103");
    }
}

/// <summary>Validation rules for travelogue creation.</summary>
public sealed class CreateTravelogueCommandValidator : AbstractValidator<CreateTravelogueCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateTravelogueCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(180).WithErrorCode("HANI-CONTENT-1106");
        RuleFor(command => command.AuthorUserId).NotEmpty().WithErrorCode("HANI-CONTENT-1104");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-CONTENT-1107");
    }
}

/// <summary>Validation rules for travelogue publication.</summary>
public sealed class PublishTravelogueCommandValidator : AbstractValidator<PublishTravelogueCommand>
{
    /// <summary>Creates validation rules.</summary>
    public PublishTravelogueCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1106");
    }
}

/// <summary>Validation rules for video creation.</summary>
public sealed class CreateVideoCommandValidator : AbstractValidator<CreateVideoCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateVideoCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(180).WithErrorCode("HANI-CONTENT-1108");
        RuleFor(command => command.Level).InclusiveBetween(0, 7).WithErrorCode("HANI-CONTENT-1109");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-CONTENT-1110");
    }
}

/// <summary>Validation rules for video publication.</summary>
public sealed class PublishVideoCommandValidator : AbstractValidator<PublishVideoCommand>
{
    /// <summary>Creates validation rules.</summary>
    public PublishVideoCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1108");
    }
}

/// <summary>Validation rules for comments.</summary>
public sealed class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateCommentCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1111");
        RuleFor(command => command.AuthorName).NotEmpty().MaximumLength(200).WithErrorCode("HANI-CONTENT-1112");
        RuleFor(command => command.Body).NotEmpty().MaximumLength(4000).WithErrorCode("HANI-CONTENT-1113");
    }
}

/// <summary>Validation rules for comment moderation.</summary>
public sealed class PublishCommentCommandValidator : AbstractValidator<PublishCommentCommand>
{
    /// <summary>Creates validation rules.</summary>
    public PublishCommentCommandValidator()
    {
        RuleFor(command => command.CommentId).NotEmpty().WithErrorCode("HANI-CONTENT-1114");
    }
}

/// <summary>Validation rules for comment rejection.</summary>
public sealed class RejectCommentCommandValidator : AbstractValidator<RejectCommentCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RejectCommentCommandValidator()
    {
        RuleFor(command => command.CommentId).NotEmpty().WithErrorCode("HANI-CONTENT-1114");
    }
}

/// <summary>Validation rules for likes.</summary>
public sealed class LikeContentCommandValidator : AbstractValidator<LikeContentCommand>
{
    /// <summary>Creates validation rules.</summary>
    public LikeContentCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1115");
    }
}

/// <summary>Validation rules for content searches.</summary>
public sealed class SearchEditorialQueryValidator : AbstractValidator<SearchBlogQuery>
{
    /// <summary>Creates validation rules.</summary>
    public SearchEditorialQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-CONTENT-1116");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CONTENT-1117");
    }
}

/// <summary>Validation rules for blog reads.</summary>
public sealed class GetBlogQueryValidator : AbstractValidator<GetBlogQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetBlogQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1118");
    }
}

/// <summary>Validation rules for travelogue reads.</summary>
public sealed class GetTravelogueQueryValidator : AbstractValidator<GetTravelogueQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetTravelogueQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1119");
    }
}

/// <summary>Validation rules for video reads.</summary>
public sealed class GetVideoQueryValidator : AbstractValidator<GetVideoQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetVideoQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().WithErrorCode("HANI-CONTENT-1120");
    }
}

/// <summary>Validation rules for growth commands.</summary>
public sealed class GrowthCommandValidator : AbstractValidator<CreateAdSlotCommand>
{
    /// <summary>Creates validation rules.</summary>
    public GrowthCommandValidator()
    {
        RuleFor(command => command.Code).NotEmpty().MaximumLength(80).WithErrorCode("HANI-GROWTH-2101");
        RuleFor(command => command.Name).NotEmpty().MaximumLength(200).WithErrorCode("HANI-GROWTH-2102");
    }
}

/// <summary>Validation rules for ad creatives.</summary>
public sealed class AddAdCreativeCommandValidator : AbstractValidator<AddAdCreativeCommand>
{
    /// <summary>Creates validation rules.</summary>
    public AddAdCreativeCommandValidator()
    {
        RuleFor(command => command.SlotCode).NotEmpty().WithErrorCode("HANI-GROWTH-2103");
        RuleFor(command => command.Title).NotEmpty().WithErrorCode("HANI-GROWTH-2104");
    }
}

/// <summary>Validation rules for newsletter subscriptions.</summary>
public sealed class SubscribeNewsletterCommandValidator : AbstractValidator<SubscribeNewsletterCommand>
{
    /// <summary>Creates validation rules.</summary>
    public SubscribeNewsletterCommandValidator()
    {
        RuleFor(command => command.Contact).NotEmpty().MaximumLength(320).WithErrorCode("HANI-GROWTH-2105");
        RuleFor(command => command.Locale).NotEmpty().WithErrorCode("HANI-GROWTH-2106");
    }
}

/// <summary>Validation rules for campaign registration.</summary>
public sealed class RegisterCampaignCommandValidator : AbstractValidator<RegisterCampaignCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RegisterCampaignCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-GROWTH-2107");
        RuleFor(command => command.FullName).NotEmpty().WithErrorCode("HANI-GROWTH-2108");
        RuleFor(command => command.Contact).NotEmpty().WithErrorCode("HANI-GROWTH-2109");
    }
}

/// <summary>Validation rules for analytics events.</summary>
public sealed class RecordAnalyticsEventCommandValidator : AbstractValidator<RecordAnalyticsEventCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RecordAnalyticsEventCommandValidator()
    {
        RuleFor(command => command.EventName).NotEmpty().MaximumLength(120).WithErrorCode("HANI-GROWTH-2110");
        RuleFor(command => command.EntityType).NotEmpty().MaximumLength(80).WithErrorCode("HANI-GROWTH-2111");
    }
}

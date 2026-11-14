using FluentValidation;
using Hani.Modules.Content.Application.Commands.Growth;
using Hani.Modules.Content.Application.Queries.Editorial;
using Hani.Modules.Content.Application.Queries.Growth;

namespace Hani.Modules.Content.Application.Validation;

/// <summary>Validation rules for travelogue searches.</summary>
public sealed class SearchTraveloguesQueryValidator : AbstractValidator<SearchTraveloguesQuery>
{
    /// <summary>Creates validation rules.</summary>
    public SearchTraveloguesQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-CONTENT-1121");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CONTENT-1122");
    }
}

/// <summary>Validation rules for video searches.</summary>
public sealed class SearchVideosQueryValidator : AbstractValidator<SearchVideosQuery>
{
    /// <summary>Creates validation rules.</summary>
    public SearchVideosQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-CONTENT-1123");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CONTENT-1124");
    }
}

/// <summary>Validation rules for comment lists.</summary>
public sealed class ListCommentsQueryValidator : AbstractValidator<ListCommentsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListCommentsQueryValidator()
    {
        RuleFor(query => query.ContentId).NotEmpty().WithErrorCode("HANI-CONTENT-1125");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CONTENT-1126");
    }
}

/// <summary>Validation rules for author stats.</summary>
public sealed class GetAuthorContentStatsQueryValidator : AbstractValidator<GetAuthorContentStatsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetAuthorContentStatsQueryValidator()
    {
        RuleFor(query => query.UserId).NotEmpty().WithErrorCode("HANI-CONTENT-1127");
    }
}

/// <summary>Validation rules for trending content.</summary>
public sealed class GetTrendingContentQueryValidator : AbstractValidator<GetTrendingContentQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetTrendingContentQueryValidator()
    {
        RuleFor(query => query.Limit).InclusiveBetween(1, 50).WithErrorCode("HANI-CONTENT-1128");
    }
}

/// <summary>Validation rules for ad-slot reads.</summary>
public sealed class GetAdSlotQueryValidator : AbstractValidator<GetAdSlotQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetAdSlotQueryValidator()
    {
        RuleFor(query => query.Code).NotEmpty().WithErrorCode("HANI-GROWTH-2112");
    }
}

/// <summary>Validation rules for campaign lists.</summary>
public sealed class ListCampaignsQueryValidator : AbstractValidator<ListCampaignsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListCampaignsQueryValidator()
    {
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-GROWTH-2113");
    }
}

/// <summary>Validation rules for campaign reads.</summary>
public sealed class GetCampaignQueryValidator : AbstractValidator<GetCampaignQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetCampaignQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().WithErrorCode("HANI-GROWTH-2114");
    }
}

/// <summary>Validation rules for ad events.</summary>
public sealed class RecordAdEventCommandValidator : AbstractValidator<RecordAdEventCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RecordAdEventCommandValidator()
    {
        RuleFor(command => command.CreativeId).NotEmpty().WithErrorCode("HANI-GROWTH-2115");
        RuleFor(command => command.SlotCode).NotEmpty().WithErrorCode("HANI-GROWTH-2116");
    }
}

/// <summary>Validation rules for newsletter verification.</summary>
public sealed class VerifyNewsletterCommandValidator : AbstractValidator<VerifyNewsletterCommand>
{
    /// <summary>Creates validation rules.</summary>
    public VerifyNewsletterCommandValidator()
    {
        RuleFor(command => command.Contact).NotEmpty().WithErrorCode("HANI-GROWTH-2117");
        RuleFor(command => command.Code).NotEmpty().WithErrorCode("HANI-GROWTH-2118");
    }
}

/// <summary>Validation rules for unsubscription.</summary>
public sealed class UnsubscribeNewsletterCommandValidator : AbstractValidator<UnsubscribeNewsletterCommand>
{
    /// <summary>Creates validation rules.</summary>
    public UnsubscribeNewsletterCommandValidator()
    {
        RuleFor(command => command.Contact).NotEmpty().WithErrorCode("HANI-GROWTH-2119");
    }
}

/// <summary>Validation rules for campaign creation.</summary>
public sealed class CreateCampaignCommandValidator : AbstractValidator<CreateCampaignCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateCampaignCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-GROWTH-2120");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-GROWTH-2121");
    }
}

/// <summary>Validation rules for campaign activation.</summary>
public sealed class ActivateCampaignCommandValidator : AbstractValidator<ActivateCampaignCommand>
{
    /// <summary>Creates validation rules.</summary>
    public ActivateCampaignCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().WithErrorCode("HANI-GROWTH-2122");
    }
}

/// <summary>Validation rules for notifications.</summary>
public sealed class CreateNotificationCommandValidator : AbstractValidator<CreateNotificationCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateNotificationCommandValidator()
    {
        RuleFor(command => command.TemplateKey).NotEmpty().WithErrorCode("HANI-GROWTH-2123");
        RuleFor(command => command.Payload).NotEmpty().WithErrorCode("HANI-GROWTH-2124");
    }
}

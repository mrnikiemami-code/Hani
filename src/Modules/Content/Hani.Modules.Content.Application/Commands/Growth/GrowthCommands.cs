using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Domain.Growth;

namespace Hani.Modules.Content.Application.Commands.Growth;

/// <summary>Create an ad slot.</summary>
public sealed record CreateAdSlotCommand(string Code, string Name) : ICommand<Guid>;

/// <summary>Add a creative to an ad slot.</summary>
public sealed record AddAdCreativeCommand(
    string SlotCode,
    string Title,
    string ImageUrl,
    string TargetUrl,
    DateTimeOffset? StartsAt = null,
    DateTimeOffset? EndsAt = null) : ICommand<Guid>;

/// <summary>Record an ad impression or click.</summary>
public sealed record RecordAdEventCommand(
    Guid CreativeId,
    string SlotCode,
    AdEventType Type) : ICommand<Guid>;

/// <summary>Subscribe to newsletter or SMS.</summary>
public sealed record SubscribeNewsletterCommand(
    string Contact,
    ContactChannel Channel,
    string Locale) : ICommand<NewsletterSubscriptionDto>;

/// <summary>Verify a pending newsletter subscription.</summary>
public sealed record VerifyNewsletterCommand(
    string Contact,
    ContactChannel Channel,
    string Code) : ICommand<bool>;

/// <summary>Unsubscribe a contact.</summary>
public sealed record UnsubscribeNewsletterCommand(
    string Contact,
    ContactChannel Channel) : ICommand<bool>;

/// <summary>Create a campaign.</summary>
public sealed record CreateCampaignCommand(
    string Slug,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    Guid? DestinationId,
    decimal? Price,
    string? Currency,
    decimal? DiscountPercent,
    IReadOnlyList<CampaignTranslationInput> Translations,
    IReadOnlyList<CampaignFaqInput> Faqs) : ICommand<Guid>;

/// <summary>Activate a campaign.</summary>
public sealed record ActivateCampaignCommand(string Slug) : ICommand<bool>;

/// <summary>Register for a campaign.</summary>
public sealed record RegisterCampaignCommand(
    string Slug,
    string FullName,
    string Contact,
    ContactChannel Channel) : ICommand<Guid>;

/// <summary>Create a notification request.</summary>
public sealed record CreateNotificationCommand(
    Guid? UserId,
    ContactChannel Channel,
    string TemplateKey,
    string Payload) : ICommand<Guid>;

/// <summary>Record an analytics event.</summary>
public sealed record RecordAnalyticsEventCommand(
    string EventName,
    string EntityType,
    Guid? EntityId = null,
    Guid? UserId = null,
    string? Metadata = null) : ICommand<Guid>;

/// <summary>Localized campaign input.</summary>
public sealed record CampaignTranslationInput(string Locale, string Title, string Description);

/// <summary>Campaign FAQ input.</summary>
public sealed record CampaignFaqInput(string Question, string Answer);

/// <summary>Newsletter subscription read model.</summary>
public sealed record NewsletterSubscriptionDto(
    Guid SubscriptionId,
    string Contact,
    string Channel,
    string Locale,
    string Status);

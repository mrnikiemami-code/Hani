using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Domain.Growth;

namespace Hani.Modules.Content.Application.Commands.Growth;

internal sealed class CreateAdSlotCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<CreateAdSlotCommand, Guid>
{
    public async Task<Result<Guid>> Handle(CreateAdSlotCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var slot = AdSlot.Create(ids, request.Code, request.Name);
            await repository.AddAdSlotAsync(slot, cancellationToken);
            return Result<Guid>.Success(slot.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-GROWTH-2001", exception.Message));
        }
    }
}

internal sealed class AddAdCreativeCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<AddAdCreativeCommand, Guid>
{
    public async Task<Result<Guid>> Handle(AddAdCreativeCommand request, CancellationToken cancellationToken)
    {
        var slot = await repository.GetAdSlotAsync(request.SlotCode, cancellationToken);

        if (slot is null)
        {
            return Result<Guid>.Failure(Error.NotFound("HANI-GROWTH-2002", "Ad slot was not found."));
        }

        try
        {
            var creative = slot.AddCreative(
                ids,
                request.Title,
                request.ImageUrl,
                request.TargetUrl,
                request.StartsAt,
                request.EndsAt);
            await repository.SaveChangesAsync(cancellationToken);
            return Result<Guid>.Success(creative.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-GROWTH-2003", exception.Message));
        }
    }
}

internal sealed class RecordAdEventCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<RecordAdEventCommand, Guid>
{
    public async Task<Result<Guid>> Handle(RecordAdEventCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var adEvent = AdEvent.Create(
                ids,
                request.CreativeId,
                request.SlotCode,
                request.Type);
            await repository.AddAdEventAsync(adEvent, cancellationToken);
            return Result<Guid>.Success(adEvent.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-GROWTH-2004", exception.Message));
        }
    }
}

internal sealed class SubscribeNewsletterCommandHandler(
    IContentRepository repository,
    IIdGenerator ids,
    ILanguageCatalog languages)
    : ICommandHandler<SubscribeNewsletterCommand, NewsletterSubscriptionDto>
{
    public async Task<Result<NewsletterSubscriptionDto>> Handle(
        SubscribeNewsletterCommand request,
        CancellationToken cancellationToken)
    {
        var locale = languages.Normalize(request.Locale);

        if (!languages.IsSupported(request.Locale))
        {
            return Result<NewsletterSubscriptionDto>.Failure(
                Error.Validation("HANI-GROWTH-2005", "Locale is not supported."));
        }

        var existing = await repository.GetSubscriptionAsync(
            request.Channel,
            request.Contact,
            cancellationToken);

        if (existing is not null && existing.Status == SubscriptionStatus.Confirmed)
        {
            return Result<NewsletterSubscriptionDto>.Success(Map(existing));
        }

        try
        {
            var code = ids.NewId().ToString("N")[..6].ToUpperInvariant();
            var subscription = existing ?? NewsletterSubscription.Create(
                ids,
                request.Contact,
                request.Channel,
                locale,
                code);
            await repository.AddSubscriptionAsync(subscription, cancellationToken);
            return Result<NewsletterSubscriptionDto>.Success(Map(subscription));
        }
        catch (ArgumentException exception)
        {
            return Result<NewsletterSubscriptionDto>.Failure(
                Error.Validation("HANI-GROWTH-2006", exception.Message));
        }
    }

    private static NewsletterSubscriptionDto Map(NewsletterSubscription subscription)
        => new(
            subscription.Id,
            subscription.Contact,
            subscription.Channel.ToString(),
            subscription.Locale,
            subscription.Status.ToString());
}

internal sealed class VerifyNewsletterCommandHandler(IContentRepository repository)
    : ICommandHandler<VerifyNewsletterCommand, bool>
{
    public async Task<Result<bool>> Handle(VerifyNewsletterCommand request, CancellationToken cancellationToken)
    {
        var subscription = await repository.GetSubscriptionAsync(
            request.Channel,
            request.Contact,
            cancellationToken);

        if (subscription is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-GROWTH-2007", "Subscription was not found."));
        }

        try
        {
            subscription.Confirm(request.Code);
            await repository.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (Exception exception) when (exception is ArgumentException or InvalidOperationException)
        {
            return Result<bool>.Failure(Error.Validation("HANI-GROWTH-2008", exception.Message));
        }
    }
}

internal sealed class UnsubscribeNewsletterCommandHandler(IContentRepository repository)
    : ICommandHandler<UnsubscribeNewsletterCommand, bool>
{
    public async Task<Result<bool>> Handle(UnsubscribeNewsletterCommand request, CancellationToken cancellationToken)
    {
        var subscription = await repository.GetSubscriptionAsync(
            request.Channel,
            request.Contact,
            cancellationToken);

        if (subscription is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-GROWTH-2007", "Subscription was not found."));
        }

        subscription.Unsubscribe();
        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class CreateCampaignCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<CreateCampaignCommand, Guid>
{
    public async Task<Result<Guid>> Handle(CreateCampaignCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var campaign = Campaign.Create(
                ids,
                request.Slug,
                request.StartsAt,
                request.EndsAt,
                request.DestinationId,
                request.Price,
                request.Currency,
                request.DiscountPercent);

            foreach (var translation in request.Translations)
            {
                campaign.AddTranslation(ids, translation.Locale, translation.Title, translation.Description);
            }

            foreach (var faq in request.Faqs)
            {
                campaign.AddFaq(ids, faq.Question, faq.Answer);
            }

            await repository.AddCampaignAsync(campaign, cancellationToken);
            return Result<Guid>.Success(campaign.Id);
        }
        catch (Exception exception) when (exception is ArgumentException or InvalidOperationException)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-GROWTH-2009", exception.Message));
        }
    }
}

internal sealed class ActivateCampaignCommandHandler(IContentRepository repository)
    : ICommandHandler<ActivateCampaignCommand, bool>
{
    public async Task<Result<bool>> Handle(ActivateCampaignCommand request, CancellationToken cancellationToken)
    {
        var campaign = await repository.GetCampaignBySlugAsync(request.Slug, cancellationToken);

        if (campaign is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-GROWTH-2010", "Campaign was not found."));
        }

        try
        {
            campaign.Activate();
            await repository.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-GROWTH-2011", exception.Message));
        }
    }
}

internal sealed class RegisterCampaignCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<RegisterCampaignCommand, Guid>
{
    public async Task<Result<Guid>> Handle(RegisterCampaignCommand request, CancellationToken cancellationToken)
    {
        var campaign = await repository.GetCampaignBySlugAsync(request.Slug, cancellationToken);

        if (campaign is null)
        {
            return Result<Guid>.Failure(Error.NotFound("HANI-GROWTH-2010", "Campaign was not found."));
        }

        try
        {
            var registration = CampaignRegistration.Create(
                ids,
                campaign.Id,
                request.FullName,
                request.Contact,
                request.Channel);
            await repository.AddCampaignRegistrationAsync(registration, cancellationToken);
            return Result<Guid>.Success(registration.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-GROWTH-2012", exception.Message));
        }
    }
}

internal sealed class CreateNotificationCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<CreateNotificationCommand, Guid>
{
    public async Task<Result<Guid>> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var notification = Notification.Create(
                ids,
                request.UserId,
                request.Channel,
                request.TemplateKey,
                request.Payload);
            await repository.AddNotificationAsync(notification, cancellationToken);
            return Result<Guid>.Success(notification.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-GROWTH-2013", exception.Message));
        }
    }
}

internal sealed class RecordAnalyticsEventCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<RecordAnalyticsEventCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        RecordAnalyticsEventCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var analyticsEvent = AnalyticsEvent.Create(
                ids,
                request.EventName,
                request.EntityType,
                request.EntityId,
                request.UserId,
                request.Metadata);
            await repository.AddAnalyticsEventAsync(analyticsEvent, cancellationToken);
            return Result<Guid>.Success(analyticsEvent.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-GROWTH-2014", exception.Message));
        }
    }
}

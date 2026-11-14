using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Growth;

/// <summary>
/// Type of ad event tracked by the growth module.
/// </summary>
public enum AdEventType
{
    Impression = 0,
    Click = 1
}

/// <summary>
/// Advertisement slot such as home-below-tours.
/// </summary>
public sealed class AdSlot : AggregateRoot<Guid>
{
    private readonly List<AdCreative> _creatives = [];

    private AdSlot()
    {
    }

    private AdSlot(Guid id, string code, string name) : base(id)
    {
        Code = code;
        Name = name;
        IsActive = true;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Stable slot code used by the frontend.</summary>
    public string Code { get; private set; } = string.Empty;

    /// <summary>Display name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Whether the slot is active.</summary>
    public bool IsActive { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creatives assigned to the slot.</summary>
    public IReadOnlyCollection<AdCreative> Creatives => _creatives;

    /// <summary>Creates a slot.</summary>
    public static AdSlot Create(IIdGenerator ids, string code, string name)
    {
        if (string.IsNullOrWhiteSpace(code) || string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Ad slot code and name are required.");
        }

        return new AdSlot(ids.NewId(), code.Trim().ToLowerInvariant(), name.Trim());
    }

    /// <summary>Adds a creative to the slot.</summary>
    public AdCreative AddCreative(
        IIdGenerator ids,
        string title,
        string imageUrl,
        string targetUrl,
        DateTimeOffset? startsAt = null,
        DateTimeOffset? endsAt = null)
    {
        if (string.IsNullOrWhiteSpace(title) ||
            string.IsNullOrWhiteSpace(imageUrl) ||
            string.IsNullOrWhiteSpace(targetUrl))
        {
            throw new ArgumentException("Ad creative title, image, and target are required.");
        }

        var creative = new AdCreative(
            ids.NewId(),
            Id,
            title,
            imageUrl,
            targetUrl,
            startsAt,
            endsAt);
        _creatives.Add(creative);
        return creative;
    }
}

/// <summary>Creative assigned to an ad slot.</summary>
public sealed class AdCreative : Entity<Guid>
{
    private AdCreative()
    {
    }

    internal AdCreative(
        Guid id,
        Guid slotId,
        string title,
        string imageUrl,
        string targetUrl,
        DateTimeOffset? startsAt,
        DateTimeOffset? endsAt) : base(id)
    {
        SlotId = slotId;
        Title = title.Trim();
        ImageUrl = imageUrl.Trim();
        TargetUrl = targetUrl.Trim();
        StartsAt = startsAt?.ToUniversalTime();
        EndsAt = endsAt?.ToUniversalTime();
        IsActive = true;
    }

    /// <summary>Parent slot.</summary>
    public Guid SlotId { get; private set; }

    /// <summary>Creative title.</summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>Image URL.</summary>
    public string ImageUrl { get; private set; } = string.Empty;

    /// <summary>Click-through URL.</summary>
    public string TargetUrl { get; private set; } = string.Empty;

    /// <summary>Optional start time.</summary>
    public DateTimeOffset? StartsAt { get; private set; }

    /// <summary>Optional end time.</summary>
    public DateTimeOffset? EndsAt { get; private set; }

    /// <summary>Whether the creative is active.</summary>
    public bool IsActive { get; private set; }

    /// <summary>Checks availability at a point in time.</summary>
    public bool IsAvailableAt(DateTimeOffset now)
        => IsActive &&
            (StartsAt is null || StartsAt <= now) &&
            (EndsAt is null || EndsAt >= now);
}

/// <summary>Recorded impression or click for an ad creative.</summary>
public sealed class AdEvent : AggregateRoot<Guid>
{
    private AdEvent()
    {
    }

    private AdEvent(
        Guid id,
        Guid creativeId,
        string slotCode,
        AdEventType type,
        DateTimeOffset occurredAt) : base(id)
    {
        CreativeId = creativeId;
        SlotCode = slotCode;
        Type = type;
        OccurredAt = occurredAt;
    }

    /// <summary>Creative id.</summary>
    public Guid CreativeId { get; private set; }

    /// <summary>Slot code.</summary>
    public string SlotCode { get; private set; } = string.Empty;

    /// <summary>Event type.</summary>
    public AdEventType Type { get; private set; }

    /// <summary>Occurrence time.</summary>
    public DateTimeOffset OccurredAt { get; private set; }

    /// <summary>Records an ad event.</summary>
    public static AdEvent Create(
        IIdGenerator ids,
        Guid creativeId,
        string slotCode,
        AdEventType type,
        DateTimeOffset? now = null)
    {
        if (creativeId == Guid.Empty || string.IsNullOrWhiteSpace(slotCode))
        {
            throw new ArgumentException("Creative and slot are required.");
        }

        return new AdEvent(
            ids.NewId(),
            creativeId,
            slotCode.Trim().ToLowerInvariant(),
            type,
            now ?? DateTimeOffset.UtcNow);
    }
}

/// <summary>Newsletter/SMS subscription lifecycle.</summary>
public enum SubscriptionStatus
{
    Pending = 0,
    Confirmed = 1,
    Unsubscribed = 2
}

/// <summary>Contact channel for newsletter/SMS consent.</summary>
public enum ContactChannel
{
    Email = 0,
    Sms = 1
}

/// <summary>Consent-based newsletter or SMS subscription.</summary>
public sealed class NewsletterSubscription : AggregateRoot<Guid>
{
    private NewsletterSubscription()
    {
    }

    private NewsletterSubscription(
        Guid id,
        string contact,
        ContactChannel channel,
        string locale,
        string verificationCode,
        DateTimeOffset createdAt) : base(id)
    {
        Contact = contact;
        Channel = channel;
        Locale = locale;
        VerificationCode = verificationCode;
        CreatedAt = createdAt;
        Status = SubscriptionStatus.Pending;
    }

    /// <summary>Email address or mobile number.</summary>
    public string Contact { get; private set; } = string.Empty;

    /// <summary>Contact channel.</summary>
    public ContactChannel Channel { get; private set; }

    /// <summary>Preferred locale.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Verification code.</summary>
    public string VerificationCode { get; private set; } = string.Empty;

    /// <summary>Subscription status.</summary>
    public SubscriptionStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Confirmation time.</summary>
    public DateTimeOffset? ConfirmedAt { get; private set; }

    /// <summary>Unsubscribe time.</summary>
    public DateTimeOffset? UnsubscribedAt { get; private set; }

    /// <summary>Creates a pending subscription.</summary>
    public static NewsletterSubscription Create(
        IIdGenerator ids,
        string contact,
        ContactChannel channel,
        string locale,
        string verificationCode,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(contact) ||
            string.IsNullOrWhiteSpace(locale) ||
            string.IsNullOrWhiteSpace(verificationCode))
        {
            throw new ArgumentException("Contact, locale, and verification code are required.");
        }

        return new NewsletterSubscription(
            ids.NewId(),
            contact.Trim(),
            channel,
            locale.Trim().ToLowerInvariant(),
            verificationCode.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Confirms the subscription with a matching code.</summary>
    public void Confirm(string code, DateTimeOffset? now = null)
    {
        if (Status != SubscriptionStatus.Pending)
        {
            throw new InvalidOperationException("Only pending subscriptions can be confirmed.");
        }

        if (!string.Equals(VerificationCode, code.Trim(), StringComparison.Ordinal))
        {
            throw new ArgumentException("Verification code is invalid.", nameof(code));
        }

        Status = SubscriptionStatus.Confirmed;
        ConfirmedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Unsubscribes the contact.</summary>
    public void Unsubscribe(DateTimeOffset? now = null)
    {
        Status = SubscriptionStatus.Unsubscribed;
        UnsubscribedAt = now ?? DateTimeOffset.UtcNow;
    }
}

/// <summary>Campaign lifecycle.</summary>
public enum CampaignStatus
{
    Draft = 0,
    Active = 1,
    Closed = 2
}

/// <summary>
/// Marketing campaign such as Blind Tour with localized content and FAQ.
/// </summary>
public sealed class Campaign : AggregateRoot<Guid>
{
    private readonly List<CampaignTranslation> _translations = [];
    private readonly List<CampaignFaq> _faqs = [];

    private Campaign()
    {
    }

    private Campaign(
        Guid id,
        string slug,
        Guid? destinationId,
        decimal? price,
        string? currency,
        decimal? discountPercent,
        DateTimeOffset startsAt,
        DateTimeOffset endsAt) : base(id)
    {
        Slug = slug;
        DestinationId = destinationId;
        Price = price;
        Currency = currency;
        DiscountPercent = discountPercent;
        StartsAt = startsAt.ToUniversalTime();
        EndsAt = endsAt.ToUniversalTime();
        Status = CampaignStatus.Draft;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Unique campaign slug.</summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>Optional destination id.</summary>
    public Guid? DestinationId { get; private set; }

    /// <summary>Optional package price.</summary>
    public decimal? Price { get; private set; }

    /// <summary>Price currency.</summary>
    public string? Currency { get; private set; }

    /// <summary>Optional discount percentage.</summary>
    public decimal? DiscountPercent { get; private set; }

    /// <summary>Campaign start.</summary>
    public DateTimeOffset StartsAt { get; private set; }

    /// <summary>Campaign end.</summary>
    public DateTimeOffset EndsAt { get; private set; }

    /// <summary>Campaign state.</summary>
    public CampaignStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Localized campaign content.</summary>
    public IReadOnlyCollection<CampaignTranslation> Translations => _translations;

    /// <summary>Campaign FAQs.</summary>
    public IReadOnlyCollection<CampaignFaq> Faqs => _faqs;

    /// <summary>Creates a campaign.</summary>
    public static Campaign Create(
        IIdGenerator ids,
        string slug,
        DateTimeOffset startsAt,
        DateTimeOffset endsAt,
        Guid? destinationId = null,
        decimal? price = null,
        string? currency = null,
        decimal? discountPercent = null)
    {
        if (string.IsNullOrWhiteSpace(slug) || endsAt <= startsAt)
        {
            throw new ArgumentException("Campaign slug and valid date range are required.");
        }

        if (price is < 0 || discountPercent is < 0 or > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(price), "Campaign price or discount is invalid.");
        }

        return new Campaign(
            ids.NewId(),
            slug.Trim().ToLowerInvariant(),
            destinationId,
            price,
            string.IsNullOrWhiteSpace(currency) ? null : currency.Trim().ToUpperInvariant(),
            discountPercent,
            startsAt,
            endsAt);
    }

    /// <summary>Adds localized campaign content.</summary>
    public void AddTranslation(IIdGenerator ids, string locale, string title, string description)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Campaign translation '{locale}' already exists.");
        }

        _translations.Add(new CampaignTranslation(ids.NewId(), Id, locale, title, description));
    }

    /// <summary>Adds a campaign FAQ.</summary>
    public void AddFaq(IIdGenerator ids, string question, string answer)
        => _faqs.Add(new CampaignFaq(ids.NewId(), Id, question, answer));

    /// <summary>Activates the campaign.</summary>
    public void Activate(DateTimeOffset? now = null)
    {
        var current = now ?? DateTimeOffset.UtcNow;

        if (current < StartsAt || current > EndsAt)
        {
            throw new InvalidOperationException("Campaign can only be activated within its date range.");
        }

        Status = CampaignStatus.Active;
    }

    /// <summary>Closes the campaign.</summary>
    public void Close() => Status = CampaignStatus.Closed;
}

/// <summary>Localized campaign content.</summary>
public sealed class CampaignTranslation : Entity<Guid>
{
    private CampaignTranslation()
    {
    }

    internal CampaignTranslation(Guid id, Guid campaignId, string locale, string title, string description)
        : base(id)
    {
        CampaignId = campaignId;
        Locale = locale.Trim().ToLowerInvariant();
        Title = title.Trim();
        Description = description.Trim();
    }

    /// <summary>Parent campaign.</summary>
    public Guid CampaignId { get; private set; }

    /// <summary>Locale code.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Title.</summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>Description.</summary>
    public string Description { get; private set; } = string.Empty;
}

/// <summary>Campaign FAQ.</summary>
public sealed class CampaignFaq : Entity<Guid>
{
    private CampaignFaq()
    {
    }

    internal CampaignFaq(Guid id, Guid campaignId, string question, string answer) : base(id)
    {
        CampaignId = campaignId;
        Question = question.Trim();
        Answer = answer.Trim();
    }

    /// <summary>Parent campaign.</summary>
    public Guid CampaignId { get; private set; }

    /// <summary>Question.</summary>
    public string Question { get; private set; } = string.Empty;

    /// <summary>Answer.</summary>
    public string Answer { get; private set; } = string.Empty;
}

/// <summary>Campaign registration state.</summary>
public enum CampaignRegistrationStatus
{
    Pending = 0,
    Confirmed = 1,
    Cancelled = 2
}

/// <summary>User registration for a campaign.</summary>
public sealed class CampaignRegistration : AggregateRoot<Guid>
{
    private CampaignRegistration()
    {
    }

    private CampaignRegistration(
        Guid id,
        Guid campaignId,
        string fullName,
        string contact,
        ContactChannel channel,
        DateTimeOffset createdAt) : base(id)
    {
        CampaignId = campaignId;
        FullName = fullName;
        Contact = contact;
        Channel = channel;
        CreatedAt = createdAt;
        Status = CampaignRegistrationStatus.Pending;
    }

    /// <summary>Campaign id.</summary>
    public Guid CampaignId { get; private set; }

    /// <summary>Registrant name.</summary>
    public string FullName { get; private set; } = string.Empty;

    /// <summary>Email or mobile.</summary>
    public string Contact { get; private set; } = string.Empty;

    /// <summary>Contact channel.</summary>
    public ContactChannel Channel { get; private set; }

    /// <summary>Registration state.</summary>
    public CampaignRegistrationStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a pending registration.</summary>
    public static CampaignRegistration Create(
        IIdGenerator ids,
        Guid campaignId,
        string fullName,
        string contact,
        ContactChannel channel,
        DateTimeOffset? now = null)
    {
        if (campaignId == Guid.Empty ||
            string.IsNullOrWhiteSpace(fullName) ||
            string.IsNullOrWhiteSpace(contact))
        {
            throw new ArgumentException("Campaign, name, and contact are required.");
        }

        return new CampaignRegistration(
            ids.NewId(),
            campaignId,
            fullName.Trim(),
            contact.Trim(),
            channel,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Confirms the registration.</summary>
    public void Confirm() => Status = CampaignRegistrationStatus.Confirmed;

    /// <summary>Cancels the registration.</summary>
    public void Cancel() => Status = CampaignRegistrationStatus.Cancelled;
}

/// <summary>Notification delivery state.</summary>
public enum NotificationStatus
{
    Pending = 0,
    Sent = 1,
    Failed = 2
}

/// <summary>Outbox-style notification requested by a module.</summary>
public sealed class Notification : AggregateRoot<Guid>
{
    private Notification()
    {
    }

    private Notification(
        Guid id,
        Guid? userId,
        ContactChannel channel,
        string templateKey,
        string payload,
        DateTimeOffset createdAt) : base(id)
    {
        UserId = userId;
        Channel = channel;
        TemplateKey = templateKey;
        Payload = payload;
        CreatedAt = createdAt;
        Status = NotificationStatus.Pending;
    }

    /// <summary>Optional target user.</summary>
    public Guid? UserId { get; private set; }

    /// <summary>Delivery channel.</summary>
    public ContactChannel Channel { get; private set; }

    /// <summary>Template key.</summary>
    public string TemplateKey { get; private set; } = string.Empty;

    /// <summary>Serialized payload.</summary>
    public string Payload { get; private set; } = string.Empty;

    /// <summary>Delivery state.</summary>
    public NotificationStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Send time.</summary>
    public DateTimeOffset? SentAt { get; private set; }

    /// <summary>Creates a pending notification.</summary>
    public static Notification Create(
        IIdGenerator ids,
        Guid? userId,
        ContactChannel channel,
        string templateKey,
        string payload,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(templateKey) || string.IsNullOrWhiteSpace(payload))
        {
            throw new ArgumentException("Notification template and payload are required.");
        }

        return new Notification(
            ids.NewId(),
            userId,
            channel,
            templateKey.Trim(),
            payload.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Marks the notification sent.</summary>
    public void MarkSent(DateTimeOffset? now = null)
    {
        Status = NotificationStatus.Sent;
        SentAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Marks the notification failed.</summary>
    public void MarkFailed() => Status = NotificationStatus.Failed;
}

/// <summary>Recorded product/content analytics event.</summary>
public sealed class AnalyticsEvent : AggregateRoot<Guid>
{
    private AnalyticsEvent()
    {
    }

    private AnalyticsEvent(
        Guid id,
        string eventName,
        string entityType,
        Guid? entityId,
        Guid? userId,
        string? metadata,
        DateTimeOffset occurredAt) : base(id)
    {
        EventName = eventName;
        EntityType = entityType;
        EntityId = entityId;
        UserId = userId;
        Metadata = metadata;
        OccurredAt = occurredAt;
    }

    /// <summary>Event name such as view, click, or search.</summary>
    public string EventName { get; private set; } = string.Empty;

    /// <summary>Entity family.</summary>
    public string EntityType { get; private set; } = string.Empty;

    /// <summary>Optional entity id.</summary>
    public Guid? EntityId { get; private set; }

    /// <summary>Optional user id.</summary>
    public Guid? UserId { get; private set; }

    /// <summary>Optional JSON metadata.</summary>
    public string? Metadata { get; private set; }

    /// <summary>Occurrence time.</summary>
    public DateTimeOffset OccurredAt { get; private set; }

    /// <summary>Creates an analytics event.</summary>
    public static AnalyticsEvent Create(
        IIdGenerator ids,
        string eventName,
        string entityType,
        Guid? entityId = null,
        Guid? userId = null,
        string? metadata = null,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(eventName) || string.IsNullOrWhiteSpace(entityType))
        {
            throw new ArgumentException("Analytics event name and entity type are required.");
        }

        return new AnalyticsEvent(
            ids.NewId(),
            eventName.Trim(),
            entityType.Trim(),
            entityId,
            userId,
            metadata,
            now ?? DateTimeOffset.UtcNow);
    }
}

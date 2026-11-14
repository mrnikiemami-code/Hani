using Hani.Modules.Content.Domain.Growth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Content.Infrastructure.Persistence.Configurations;

internal sealed class AdSlotConfiguration : IEntityTypeConfiguration<AdSlot>
{
    public void Configure(EntityTypeBuilder<AdSlot> builder)
    {
        builder.ToTable("ad_slots");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Code).HasColumnName("code").HasMaxLength(80).IsRequired();
        builder.Property(item => item.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
        builder.Property(item => item.IsActive).HasColumnName("is_active").IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => item.Code).IsUnique().HasDatabaseName("ux_ad_slots_code");
        builder.OwnsMany(item => item.Creatives, creatives =>
        {
            creatives.ToTable("ad_creatives");
            creatives.WithOwner().HasForeignKey(item => item.SlotId);
            creatives.HasKey(item => item.Id);
            creatives.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            creatives.Property(item => item.SlotId).HasColumnName("slot_id");
            creatives.Property(item => item.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
            creatives.Property(item => item.ImageUrl).HasColumnName("image_url").HasMaxLength(1000).IsRequired();
            creatives.Property(item => item.TargetUrl).HasColumnName("target_url").HasMaxLength(2000).IsRequired();
            creatives.Property(item => item.StartsAt).HasColumnName("starts_at");
            creatives.Property(item => item.EndsAt).HasColumnName("ends_at");
            creatives.Property(item => item.IsActive).HasColumnName("is_active").IsRequired();
            creatives.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

internal sealed class AdEventConfiguration : IEntityTypeConfiguration<AdEvent>
{
    public void Configure(EntityTypeBuilder<AdEvent> builder)
    {
        builder.ToTable("ad_events");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.CreativeId).HasColumnName("creative_id").IsRequired();
        builder.Property(item => item.SlotCode).HasColumnName("slot_code").HasMaxLength(80).IsRequired();
        builder.Property(item => item.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.OccurredAt).HasColumnName("occurred_at").IsRequired();
        builder.HasIndex(item => new { item.CreativeId, item.Type }).HasDatabaseName("ix_ad_events_creative_type");
    }
}

internal sealed class NewsletterSubscriptionConfiguration : IEntityTypeConfiguration<NewsletterSubscription>
{
    public void Configure(EntityTypeBuilder<NewsletterSubscription> builder)
    {
        builder.ToTable("newsletter_subscriptions");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Contact).HasColumnName("contact").HasMaxLength(320).IsRequired();
        builder.Property(item => item.Channel).HasColumnName("channel").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
        builder.Property(item => item.VerificationCode).HasColumnName("verification_code").HasMaxLength(16).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.ConfirmedAt).HasColumnName("confirmed_at");
        builder.Property(item => item.UnsubscribedAt).HasColumnName("unsubscribed_at");
        builder.HasIndex(item => new { item.Channel, item.Contact }).IsUnique().HasDatabaseName("ux_newsletter_channel_contact");
    }
}

internal sealed class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
{
    public void Configure(EntityTypeBuilder<Campaign> builder)
    {
        builder.ToTable("campaigns");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Slug).HasColumnName("slug").HasMaxLength(180).IsRequired();
        builder.Property(item => item.DestinationId).HasColumnName("destination_id");
        builder.Property(item => item.Price).HasColumnName("price").HasPrecision(18, 2);
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3);
        builder.Property(item => item.DiscountPercent).HasColumnName("discount_percent").HasPrecision(5, 2);
        builder.Property(item => item.StartsAt).HasColumnName("starts_at").IsRequired();
        builder.Property(item => item.EndsAt).HasColumnName("ends_at").IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => item.Slug).IsUnique().HasDatabaseName("ux_campaigns_slug");
        builder.OwnsMany(item => item.Translations, translations =>
        {
            translations.ToTable("campaign_translations");
            translations.WithOwner().HasForeignKey(item => item.CampaignId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.CampaignId).HasColumnName("campaign_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Title).HasColumnName("title").HasMaxLength(300).IsRequired();
            translations.Property(item => item.Description).HasColumnName("description").HasColumnType("text").IsRequired();
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
        builder.OwnsMany(item => item.Faqs, faqs =>
        {
            faqs.ToTable("campaign_faqs");
            faqs.WithOwner().HasForeignKey(item => item.CampaignId);
            faqs.HasKey(item => item.Id);
            faqs.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            faqs.Property(item => item.CampaignId).HasColumnName("campaign_id");
            faqs.Property(item => item.Question).HasColumnName("question").HasMaxLength(500).IsRequired();
            faqs.Property(item => item.Answer).HasColumnName("answer").HasColumnType("text").IsRequired();
            faqs.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

internal sealed class CampaignRegistrationConfiguration : IEntityTypeConfiguration<CampaignRegistration>
{
    public void Configure(EntityTypeBuilder<CampaignRegistration> builder)
    {
        builder.ToTable("campaign_registrations");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.CampaignId).HasColumnName("campaign_id").IsRequired();
        builder.Property(item => item.FullName).HasColumnName("full_name").HasMaxLength(200).IsRequired();
        builder.Property(item => item.Contact).HasColumnName("contact").HasMaxLength(320).IsRequired();
        builder.Property(item => item.Channel).HasColumnName("channel").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => new { item.CampaignId, item.Contact }).HasDatabaseName("ix_campaign_registrations_campaign_contact");
    }
}

internal sealed class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        builder.ToTable("notifications");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.UserId).HasColumnName("user_id");
        builder.Property(item => item.Channel).HasColumnName("channel").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.TemplateKey).HasColumnName("template_key").HasMaxLength(120).IsRequired();
        builder.Property(item => item.Payload).HasColumnName("payload").HasColumnType("text").IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.SentAt).HasColumnName("sent_at");
        builder.HasIndex(item => new { item.UserId, item.Status }).HasDatabaseName("ix_notifications_user_status");
    }
}

internal sealed class AnalyticsEventConfiguration : IEntityTypeConfiguration<AnalyticsEvent>
{
    public void Configure(EntityTypeBuilder<AnalyticsEvent> builder)
    {
        builder.ToTable("analytics_events");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.EventName).HasColumnName("event_name").HasMaxLength(120).IsRequired();
        builder.Property(item => item.EntityType).HasColumnName("entity_type").HasMaxLength(80).IsRequired();
        builder.Property(item => item.EntityId).HasColumnName("entity_id");
        builder.Property(item => item.UserId).HasColumnName("user_id");
        builder.Property(item => item.Metadata).HasColumnName("metadata").HasColumnType("jsonb");
        builder.Property(item => item.OccurredAt).HasColumnName("occurred_at").IsRequired();
        builder.HasIndex(item => new { item.EventName, item.OccurredAt }).HasDatabaseName("ix_analytics_events_name_time");
    }
}

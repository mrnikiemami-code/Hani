using Hani.Modules.Payments.Domain.PaymentWebhooks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Payments.Infrastructure.Persistence.Configurations;

internal sealed class PaymentWebhookEventConfiguration
    : IEntityTypeConfiguration<PaymentWebhookEvent>
{
    public void Configure(EntityTypeBuilder<PaymentWebhookEvent> builder)
    {
        builder.ToTable("payment_webhook_events");

        builder.HasKey(webhook => webhook.Id);
        builder.Property(webhook => webhook.Id).HasColumnName("id");
        builder.Property(webhook => webhook.Provider).HasColumnName("provider").HasMaxLength(64).IsRequired();
        builder.Property(webhook => webhook.ProviderEventId).HasColumnName("provider_event_id").HasMaxLength(128).IsRequired();
        builder.Property(webhook => webhook.PaymentIntentId).HasColumnName("payment_intent_id").IsRequired();
        builder.Property(webhook => webhook.EventType).HasColumnName("event_type").HasMaxLength(64).IsRequired();
        builder.Property(webhook => webhook.Payload).HasColumnName("payload").HasColumnType("text").IsRequired();
        builder.Property(webhook => webhook.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(webhook => webhook.ReceivedAt).HasColumnName("received_at").IsRequired();
        builder.Property(webhook => webhook.ProcessedAt).HasColumnName("processed_at");
        builder.Property(webhook => webhook.FailureReason).HasColumnName("failure_reason").HasMaxLength(500);

        builder.HasIndex(webhook => new { webhook.Provider, webhook.ProviderEventId })
            .IsUnique()
            .HasDatabaseName("ux_payment_webhook_events_provider_event");
        builder.HasIndex(webhook => webhook.PaymentIntentId)
            .HasDatabaseName("ix_payment_webhook_events_intent_id");
    }
}

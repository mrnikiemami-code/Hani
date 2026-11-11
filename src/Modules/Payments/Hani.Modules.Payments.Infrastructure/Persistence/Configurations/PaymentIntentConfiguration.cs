using Hani.Modules.Payments.Domain.PaymentIntents;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Payments.Infrastructure.Persistence.Configurations;

internal sealed class PaymentIntentConfiguration : IEntityTypeConfiguration<PaymentIntent>
{
    public void Configure(EntityTypeBuilder<PaymentIntent> builder)
    {
        builder.ToTable("payment_intents");

        builder.HasKey(intent => intent.Id);
        builder.Property(intent => intent.Id).HasColumnName("id");
        builder.Property(intent => intent.OrderId).HasColumnName("order_id").IsRequired();
        builder.Property(intent => intent.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(intent => intent.Amount).HasColumnName("amount").HasPrecision(18, 2).IsRequired();
        builder.Property(intent => intent.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(intent => intent.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(intent => intent.Provider).HasColumnName("provider").HasMaxLength(64).IsRequired();
        builder.Property(intent => intent.ProviderRef).HasColumnName("provider_ref").HasMaxLength(128);
        builder.Property(intent => intent.RedirectUrl).HasColumnName("redirect_url").HasMaxLength(2048);
        builder.Property(intent => intent.PspAccountRef).HasColumnName("psp_account_ref").HasMaxLength(100).IsRequired();
        builder.Property(intent => intent.MerchantScope).HasColumnName("merchant_scope").HasMaxLength(50).IsRequired();
        builder.Property(intent => intent.FundsHeldBy).HasColumnName("funds_held_by").HasMaxLength(50).IsRequired();
        builder.Property(intent => intent.FailureReason).HasColumnName("failure_reason").HasMaxLength(500);
        builder.Property(intent => intent.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(intent => intent.UpdatedAt).HasColumnName("updated_at").IsRequired();
        builder.Property(intent => intent.ExpiresAt).HasColumnName("expires_at").IsRequired();
        builder.Property(intent => intent.Version).HasColumnName("version").IsConcurrencyToken().IsRequired();

        builder.HasIndex(intent => intent.OrderId)
            .IsUnique()
            .HasDatabaseName("ux_payment_intents_order_id");
        builder.HasIndex(intent => intent.Status)
            .HasDatabaseName("ix_payment_intents_status");
        builder.HasIndex(intent => intent.ExpiresAt)
            .HasDatabaseName("ix_payment_intents_expires_at");
    }
}

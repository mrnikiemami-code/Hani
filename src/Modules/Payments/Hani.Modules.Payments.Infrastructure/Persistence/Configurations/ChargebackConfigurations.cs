using Hani.Modules.Payments.Domain.Chargebacks;
using Hani.Modules.Payments.Domain.Reconciliation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Payments.Infrastructure.Persistence.Configurations;

internal sealed class ChargebackConfiguration : IEntityTypeConfiguration<Chargeback>
{
    public void Configure(EntityTypeBuilder<Chargeback> builder)
    {
        builder.ToTable("chargebacks");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.OrderId).HasColumnName("order_id").IsRequired();
        builder.Property(item => item.PaymentIntentId).HasColumnName("payment_intent_id");
        builder.Property(item => item.Amount).HasColumnName("amount").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(item => item.Reason).HasColumnName("reason").HasMaxLength(1000).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.ResolvedAt).HasColumnName("resolved_at");
        builder.HasIndex(item => item.OrderId).HasDatabaseName("ix_chargebacks_order_id");
    }
}

internal sealed class ReconciliationRecordConfiguration : IEntityTypeConfiguration<ReconciliationRecord>
{
    public void Configure(EntityTypeBuilder<ReconciliationRecord> builder)
    {
        builder.ToTable("reconciliations");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Provider).HasColumnName("provider").HasMaxLength(80).IsRequired();
        builder.Property(item => item.PeriodStart).HasColumnName("period_start").IsRequired();
        builder.Property(item => item.PeriodEnd).HasColumnName("period_end").IsRequired();
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(item => item.ExpectedAmount).HasColumnName("expected_amount").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.ActualAmount).HasColumnName("actual_amount").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Difference).HasColumnName("difference").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => new { item.Provider, item.PeriodStart, item.Currency })
            .HasDatabaseName("ix_reconciliations_provider_period_currency");
    }
}

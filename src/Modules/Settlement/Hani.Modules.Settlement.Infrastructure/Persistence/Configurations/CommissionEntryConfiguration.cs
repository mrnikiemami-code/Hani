using Hani.Modules.Settlement.Domain.Commissions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Settlement.Infrastructure.Persistence.Configurations;

internal sealed class CommissionEntryConfiguration : IEntityTypeConfiguration<CommissionEntry>
{
    public void Configure(EntityTypeBuilder<CommissionEntry> builder)
    {
        builder.ToTable("commission_entries");

        builder.HasKey(entry => entry.Id);
        builder.Property(entry => entry.Id).HasColumnName("id");
        builder.Property(entry => entry.OrderId).HasColumnName("order_id").IsRequired();
        builder.Property(entry => entry.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(entry => entry.ProductType).HasColumnName("product_type").HasConversion<string>().HasMaxLength(40).IsRequired();
        builder.Property(entry => entry.GrossAmount).HasColumnName("gross_amount").HasPrecision(18, 2).IsRequired();
        builder.Property(entry => entry.Rate).HasColumnName("rate").HasPrecision(9, 6).IsRequired();
        builder.Property(entry => entry.CommissionAmount).HasColumnName("commission_amount").HasPrecision(18, 2).IsRequired();
        builder.Property(entry => entry.NetAmount).HasColumnName("net_amount").HasPrecision(18, 2).IsRequired();
        builder.Property(entry => entry.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(entry => entry.RuleId).HasColumnName("rule_id");
        builder.Property(entry => entry.RuleSource).HasColumnName("rule_source").HasMaxLength(32).IsRequired();
        builder.Property(entry => entry.LedgerTransactionId).HasColumnName("ledger_transaction_id").IsRequired();
        builder.Property(entry => entry.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(entry => entry.CreatedAt).HasColumnName("created_at").IsRequired();

        builder.HasIndex(entry => entry.OrderId)
            .IsUnique()
            .HasDatabaseName("ux_commission_entries_order_id");
        builder.HasIndex(entry => new { entry.AgencyId, entry.Status })
            .HasDatabaseName("ix_commission_entries_agency_status");
    }
}

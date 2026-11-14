using Hani.Modules.Payments.Domain.OfflinePayments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Payments.Infrastructure.Persistence.Configurations;

internal sealed class OfflinePaymentReceiptConfiguration
    : IEntityTypeConfiguration<OfflinePaymentReceipt>
{
    public void Configure(EntityTypeBuilder<OfflinePaymentReceipt> builder)
    {
        builder.ToTable("offline_payment_receipts");
        builder.HasKey(receipt => receipt.Id);
        builder.Property(receipt => receipt.Id).HasColumnName("id");
        builder.Property(receipt => receipt.OrderId).HasColumnName("order_id").IsRequired();
        builder.Property(receipt => receipt.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(receipt => receipt.Amount).HasColumnName("amount").HasPrecision(18, 2).IsRequired();
        builder.Property(receipt => receipt.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(receipt => receipt.Method).HasColumnName("method").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(receipt => receipt.Reference).HasColumnName("reference").HasMaxLength(200);
        builder.Property(receipt => receipt.RecordedBy).HasColumnName("recorded_by").HasMaxLength(200).IsRequired();
        builder.Property(receipt => receipt.RecordedAt).HasColumnName("recorded_at").IsRequired();

        builder.HasIndex(receipt => receipt.OrderId).HasDatabaseName("ix_offline_receipts_order_id");
    }
}

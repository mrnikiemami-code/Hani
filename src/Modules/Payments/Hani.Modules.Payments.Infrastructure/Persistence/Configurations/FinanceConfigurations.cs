using Hani.Modules.Payments.Domain.Invoices;
using Hani.Modules.Payments.Domain.Refunds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Payments.Infrastructure.Persistence.Configurations;

internal sealed class RefundConfiguration : IEntityTypeConfiguration<Refund>
{
    public void Configure(EntityTypeBuilder<Refund> builder)
    {
        builder.ToTable("refunds");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.OrderId).HasColumnName("order_id").IsRequired();
        builder.Property(item => item.PaymentIntentId).HasColumnName("payment_intent_id");
        builder.Property(item => item.Amount).HasColumnName("amount").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(item => item.Reason).HasColumnName("reason").HasMaxLength(500).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.RequestedAt).HasColumnName("requested_at").IsRequired();
        builder.Property(item => item.ProcessedAt).HasColumnName("processed_at");
        builder.Property(item => item.ProviderRef).HasColumnName("provider_ref").HasMaxLength(200);
        builder.Property(item => item.FailureReason).HasColumnName("failure_reason").HasMaxLength(1000);
        builder.HasIndex(item => item.OrderId).HasDatabaseName("ix_refunds_order_id");
    }
}

internal sealed class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
{
    public void Configure(EntityTypeBuilder<Invoice> builder)
    {
        builder.ToTable("invoices");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.InvoiceNumber).HasColumnName("invoice_number").HasMaxLength(64).IsRequired();
        builder.Property(item => item.OrderId).HasColumnName("order_id").IsRequired();
        builder.Property(item => item.Issuer).HasColumnName("issuer").HasMaxLength(80).IsRequired();
        builder.Property(item => item.SellerOfRecord).HasColumnName("seller_of_record").HasMaxLength(80).IsRequired();
        builder.Property(item => item.BuyerEmail).HasColumnName("buyer_email").HasMaxLength(320).IsRequired();
        builder.Property(item => item.Subtotal).HasColumnName("subtotal").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Tax).HasColumnName("tax").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Total).HasColumnName("total").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.IssuedAt).HasColumnName("issued_at").IsRequired();
        builder.HasIndex(item => item.InvoiceNumber).IsUnique().HasDatabaseName("ux_invoices_number");
        builder.HasIndex(item => item.OrderId).HasDatabaseName("ix_invoices_order_id");
    }
}

using Hani.Modules.Settlement.Domain.Payouts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Settlement.Infrastructure.Persistence.Configurations;

internal sealed class AgencySettlementTermsConfiguration : IEntityTypeConfiguration<AgencySettlementTerms>
{
    public void Configure(EntityTypeBuilder<AgencySettlementTerms> builder)
    {
        builder.ToTable("agency_settlement_terms");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(item => item.Cycle).HasColumnName("cycle").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.MinimumPayout).HasColumnName("minimum_payout").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(item => item.BankAccountRef).HasColumnName("bank_account_ref").HasMaxLength(200).IsRequired();
        builder.Property(item => item.IsActive).HasColumnName("is_active").IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => item.AgencyId).HasDatabaseName("ix_agency_settlement_terms_agency");
    }
}

internal sealed class PayoutConfiguration : IEntityTypeConfiguration<Payout>
{
    public void Configure(EntityTypeBuilder<Payout> builder)
    {
        builder.ToTable("payouts");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(item => item.PeriodStart).HasColumnName("period_start").IsRequired();
        builder.Property(item => item.PeriodEnd).HasColumnName("period_end").IsRequired();
        builder.Property(item => item.Amount).HasColumnName("amount").HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.PaidAt).HasColumnName("paid_at");
        builder.HasIndex(item => new { item.AgencyId, item.Status }).HasDatabaseName("ix_payouts_agency_status");
    }
}

using Hani.Modules.Settlement.Domain.Commissions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Settlement.Infrastructure.Persistence.Configurations;

internal sealed class AgencyCommissionRuleConfiguration
    : IEntityTypeConfiguration<AgencyCommissionRule>
{
    public void Configure(EntityTypeBuilder<AgencyCommissionRule> builder)
    {
        builder.ToTable("commission_rules");

        builder.HasKey(rule => rule.Id);
        builder.Property(rule => rule.Id).HasColumnName("id");
        builder.Property(rule => rule.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(rule => rule.ProductType).HasColumnName("product_type").HasConversion<string>().HasMaxLength(40).IsRequired();
        builder.Property(rule => rule.Rate).HasColumnName("rate").HasPrecision(9, 6).IsRequired();
        builder.Property(rule => rule.MinAmount).HasColumnName("min_amount").HasPrecision(18, 2);
        builder.Property(rule => rule.MaxAmount).HasColumnName("max_amount").HasPrecision(18, 2);
        builder.Property(rule => rule.EffectiveFrom).HasColumnName("effective_from").IsRequired();
        builder.Property(rule => rule.EffectiveTo).HasColumnName("effective_to");

        builder.HasIndex(rule => new { rule.AgencyId, rule.ProductType, rule.EffectiveFrom })
            .HasDatabaseName("ix_commission_rules_agency_product_effective");
    }
}

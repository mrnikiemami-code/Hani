using Hani.Modules.Identity.Domain.Agencies;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class AgencyConfiguration : IEntityTypeConfiguration<Agency>
{
    public void Configure(EntityTypeBuilder<Agency> builder)
    {
        builder.ToTable("agencies");

        builder.HasKey(agency => agency.Id);

        builder.Property(agency => agency.Id).HasColumnName("id");
        builder.Property(agency => agency.Slug).HasColumnName("slug").HasMaxLength(80).IsRequired();
        builder.Property(agency => agency.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
        builder.Property(agency => agency.LicenseNo).HasColumnName("license_no").HasMaxLength(50).IsRequired();
        builder.Property(agency => agency.City).HasColumnName("city").HasMaxLength(80).IsRequired();
        builder.Property(agency => agency.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(agency => agency.SubscriptionValidUntil).HasColumnName("subscription_valid_until");
        builder.Property(agency => agency.CreatedAt).HasColumnName("created_at").IsRequired();

        builder.HasIndex(agency => agency.Slug)
            .IsUnique()
            .HasDatabaseName("ux_agencies_slug");
    }
}

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
        builder.Property(agency => agency.OwnerUserId).HasColumnName("owner_user_id");
        builder.Property(agency => agency.Website).HasColumnName("website").HasMaxLength(500);
        builder.Property(agency => agency.ContactEmail).HasColumnName("contact_email").HasMaxLength(320);
        builder.Property(agency => agency.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32);
        builder.Property(agency => agency.About).HasColumnName("about").HasMaxLength(2000);
        builder.Property(agency => agency.LicenseType).HasColumnName("license_type").HasMaxLength(50);
        builder.Property(agency => agency.LicenseIssuedAt).HasColumnName("license_issued_at");
        builder.Property(agency => agency.ManagerName).HasColumnName("manager_name").HasMaxLength(200);
        builder.Property(agency => agency.StaffCount).HasColumnName("staff_count");
        builder.Property(agency => agency.Address).HasColumnName("address").HasMaxLength(500);
        builder.Property(agency => agency.Province).HasColumnName("province").HasMaxLength(80);
        builder.Property(agency => agency.LicenseFileUrl).HasColumnName("license_file_url").HasMaxLength(1000);
        builder.Property(agency => agency.SubmittedAt).HasColumnName("submitted_at");
        builder.Property(agency => agency.ReviewedAt).HasColumnName("reviewed_at");
        builder.Property(agency => agency.RejectionReason).HasColumnName("rejection_reason").HasMaxLength(1000);

        builder.HasIndex(agency => agency.Slug)
            .IsUnique()
            .HasDatabaseName("ux_agencies_slug");
        builder.HasIndex(agency => agency.OwnerUserId)
            .HasDatabaseName("ix_agencies_owner_user_id");
        builder.HasIndex(agency => agency.Status)
            .HasDatabaseName("ix_agencies_status");

        builder.OwnsMany(agency => agency.Documents, documents =>
        {
            documents.ToTable("agency_documents");
            documents.WithOwner().HasForeignKey(document => document.AgencyId);
            documents.HasKey(document => document.Id);

            documents.Property(document => document.Id).HasColumnName("id").ValueGeneratedNever();
            documents.Property(document => document.AgencyId).HasColumnName("agency_id");
            documents.Property(document => document.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(32).IsRequired();
            documents.Property(document => document.FileUrl).HasColumnName("file_url").HasMaxLength(1000).IsRequired();
            documents.Property(document => document.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
            documents.Property(document => document.UploadedAt).HasColumnName("uploaded_at").IsRequired();

            documents.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

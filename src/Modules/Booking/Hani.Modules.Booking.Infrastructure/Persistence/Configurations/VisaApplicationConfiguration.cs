using Hani.Modules.Booking.Domain.VisaApplications;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class VisaApplicationConfiguration : IEntityTypeConfiguration<VisaApplication>
{
    public void Configure(EntityTypeBuilder<VisaApplication> builder)
    {
        builder.ToTable("visa_applications");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.ApplicationNumber).HasColumnName("application_number").HasMaxLength(64).IsRequired();
        builder.Property(item => item.VisaCountryId).HasColumnName("visa_country_id").IsRequired();
        builder.Property(item => item.VisaTypeId).HasColumnName("visa_type_id").IsRequired();
        builder.Property(item => item.ApplicantName).HasColumnName("applicant_name").HasMaxLength(200).IsRequired();
        builder.Property(item => item.PassportNo).HasColumnName("passport_no").HasMaxLength(32).IsRequired();
        builder.Property(item => item.Nationality).HasColumnName("nationality").HasMaxLength(80).IsRequired();
        builder.Property(item => item.DateOfBirth).HasColumnName("date_of_birth");
        builder.Property(item => item.TravelDate).HasColumnName("travel_date");
        builder.Property(item => item.ContactEmail).HasColumnName("contact_email").HasMaxLength(320).IsRequired();
        builder.Property(item => item.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32).IsRequired();
        builder.Property(item => item.Notes).HasColumnName("notes").HasColumnType("text");
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at");
        builder.Property(item => item.RejectionReason).HasColumnName("rejection_reason").HasMaxLength(1000);

        builder.HasIndex(item => item.ApplicationNumber)
            .IsUnique()
            .HasDatabaseName("ux_visa_applications_number");
        builder.HasIndex(item => item.VisaTypeId).HasDatabaseName("ix_visa_applications_visa_type");
        builder.HasIndex(item => item.Status).HasDatabaseName("ix_visa_applications_status");

        builder.OwnsMany(item => item.Documents, documents =>
        {
            documents.ToTable("visa_application_documents");
            documents.WithOwner().HasForeignKey(document => document.ApplicationId);
            documents.HasKey(document => document.Id);
            documents.Property(document => document.Id).HasColumnName("id").ValueGeneratedNever();
            documents.Property(document => document.ApplicationId).HasColumnName("application_id");
            documents.Property(document => document.FileUrl).HasColumnName("file_url").HasMaxLength(1000).IsRequired();
            documents.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(item => item.Applicants, applicants =>
        {
            applicants.ToTable("visa_application_applicants");
            applicants.WithOwner().HasForeignKey(applicant => applicant.ApplicationId);
            applicants.HasKey(applicant => applicant.Id);
            applicants.Property(applicant => applicant.Id).HasColumnName("id").ValueGeneratedNever();
            applicants.Property(applicant => applicant.ApplicationId).HasColumnName("application_id");
            applicants.Property(applicant => applicant.FullName).HasColumnName("full_name").HasMaxLength(200).IsRequired();
            applicants.Property(applicant => applicant.PassportNo).HasColumnName("passport_no").HasMaxLength(32).IsRequired();
            applicants.Property(applicant => applicant.Nationality).HasColumnName("nationality").HasMaxLength(80).IsRequired();
            applicants.Property(applicant => applicant.DateOfBirth).HasColumnName("date_of_birth");
            applicants.Property(applicant => applicant.Relation).HasColumnName("relation").HasMaxLength(80);
            applicants.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

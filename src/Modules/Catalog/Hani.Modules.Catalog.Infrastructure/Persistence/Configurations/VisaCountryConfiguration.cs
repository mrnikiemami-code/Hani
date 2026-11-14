using Hani.Modules.Catalog.Domain.Visas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Configurations;

internal sealed class VisaCountryConfiguration : IEntityTypeConfiguration<VisaCountry>
{
    public void Configure(EntityTypeBuilder<VisaCountry> builder)
    {
        builder.ToTable("visa_countries");
        builder.HasKey(country => country.Id);
        builder.Property(country => country.Id).HasColumnName("id");
        builder.Property(country => country.Slug).HasColumnName("slug").HasMaxLength(120).IsRequired();
        builder.Property(country => country.CountryCode).HasColumnName("country_code").HasMaxLength(3).IsRequired();
        builder.Property(country => country.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(country => country.Slug).IsUnique().HasDatabaseName("ux_visa_countries_slug");

        builder.OwnsMany(country => country.Translations, translations =>
        {
            translations.ToTable("visa_country_translations");
            translations.WithOwner().HasForeignKey(item => item.CountryId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.CountryId).HasColumnName("country_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Name).HasColumnName("name").HasMaxLength(250).IsRequired();
            translations.Property(item => item.Description).HasColumnName("description").HasColumnType("text");
            translations.HasIndex(item => new { item.CountryId, item.Locale })
                .IsUnique()
                .HasDatabaseName("ux_visa_country_translations_country_locale");
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(country => country.Types, types =>
        {
            types.ToTable("visa_types");
            types.WithOwner().HasForeignKey(type => type.CountryId);
            types.HasKey(type => type.Id);
            types.Property(type => type.Id).HasColumnName("id").ValueGeneratedNever();
            types.Property(type => type.CountryId).HasColumnName("country_id");
            types.Property(type => type.Code).HasColumnName("code").HasMaxLength(40).IsRequired();
            types.Property(type => type.EntryType).HasColumnName("entry_type").HasMaxLength(40).IsRequired();
            types.Property(type => type.IssuanceType).HasColumnName("issuance_type").HasMaxLength(40).IsRequired();
            types.Property(type => type.ProcessingDaysMin).HasColumnName("processing_days_min").IsRequired();
            types.Property(type => type.ProcessingDaysMax).HasColumnName("processing_days_max").IsRequired();
            types.Property(type => type.ValidityDays).HasColumnName("validity_days").IsRequired();
            types.Property(type => type.PriceAdult).HasColumnName("price_adult").HasPrecision(18, 2).IsRequired();
            types.Property(type => type.PriceChild).HasColumnName("price_child").HasPrecision(18, 2);
            types.Property(type => type.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
            types.HasIndex(type => new { type.CountryId, type.Code })
                .IsUnique()
                .HasDatabaseName("ux_visa_types_country_code");
            types.UsePropertyAccessMode(PropertyAccessMode.Field);

            types.OwnsMany(type => type.Documents, documents =>
            {
                documents.ToTable("visa_documents");
                documents.WithOwner().HasForeignKey(item => item.VisaTypeId);
                documents.HasKey(item => item.Id);
                documents.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
                documents.Property(item => item.VisaTypeId).HasColumnName("visa_type_id");
                documents.Property(item => item.Name).HasColumnName("name").HasMaxLength(300).IsRequired();
                documents.Property(item => item.Category).HasColumnName("category").HasMaxLength(80).IsRequired();
                documents.UsePropertyAccessMode(PropertyAccessMode.Field);
            });

            types.OwnsMany(type => type.Steps, steps =>
            {
                steps.ToTable("visa_steps");
                steps.WithOwner().HasForeignKey(item => item.VisaTypeId);
                steps.HasKey(item => item.Id);
                steps.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
                steps.Property(item => item.VisaTypeId).HasColumnName("visa_type_id");
                steps.Property(item => item.Sequence).HasColumnName("sequence").IsRequired();
                steps.Property(item => item.Description).HasColumnName("description").HasMaxLength(2000).IsRequired();
                steps.UsePropertyAccessMode(PropertyAccessMode.Field);
            });

            types.OwnsMany(type => type.Faqs, faqs =>
            {
                faqs.ToTable("visa_faqs");
                faqs.WithOwner().HasForeignKey(item => item.VisaTypeId);
                faqs.HasKey(item => item.Id);
                faqs.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
                faqs.Property(item => item.VisaTypeId).HasColumnName("visa_type_id");
                faqs.Property(item => item.Question).HasColumnName("question").HasMaxLength(500).IsRequired();
                faqs.Property(item => item.Answer).HasColumnName("answer").HasColumnType("text").IsRequired();
                faqs.UsePropertyAccessMode(PropertyAccessMode.Field);
            });
        });
    }
}

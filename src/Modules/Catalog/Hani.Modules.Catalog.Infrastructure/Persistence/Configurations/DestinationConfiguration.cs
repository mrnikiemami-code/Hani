using Hani.Modules.Catalog.Domain.Destinations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Configurations;

internal sealed class DestinationConfiguration : IEntityTypeConfiguration<Destination>
{
    public void Configure(EntityTypeBuilder<Destination> builder)
    {
        builder.ToTable("destinations");

        builder.HasKey(destination => destination.Id);

        builder.Property(destination => destination.Id).HasColumnName("id");
        builder.Property(destination => destination.Slug).HasColumnName("slug").HasMaxLength(120).IsRequired();
        builder.Property(destination => destination.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(destination => destination.ParentId).HasColumnName("parent_id");
        builder.Property(destination => destination.Latitude).HasColumnName("latitude").HasPrecision(9, 6);
        builder.Property(destination => destination.Longitude).HasColumnName("longitude").HasPrecision(9, 6);

        builder.HasIndex(destination => destination.Slug)
            .IsUnique()
            .HasDatabaseName("ux_destinations_slug");

        builder.OwnsMany(destination => destination.Translations, translations =>
        {
            translations.ToTable("destination_translations");
            translations.WithOwner().HasForeignKey(translation => translation.DestinationId);
            translations.HasKey(translation => translation.Id);

            translations.Property(translation => translation.Id).HasColumnName("id");
            translations.Property(translation => translation.DestinationId).HasColumnName("destination_id");
            translations.Property(translation => translation.Locale).HasColumnName("locale").HasMaxLength(5).IsRequired();
            translations.Property(translation => translation.Name).HasColumnName("name").HasMaxLength(150).IsRequired();
            translations.Property(translation => translation.Description).HasColumnName("description");

            translations.HasIndex(translation => new { translation.DestinationId, translation.Locale })
                .IsUnique()
                .HasDatabaseName("ux_destination_translations_destination_locale");

            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

using Hani.Modules.Catalog.Domain.Places;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Configurations;

internal sealed class PlaceConfiguration : IEntityTypeConfiguration<Place>
{
    public void Configure(EntityTypeBuilder<Place> builder)
    {
        builder.ToTable("places");
        builder.HasKey(place => place.Id);
        builder.Property(place => place.Id).HasColumnName("id");
        builder.Property(place => place.Slug).HasColumnName("slug").HasMaxLength(120).IsRequired();
        builder.Property(place => place.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(place => place.DestinationId).HasColumnName("destination_id").IsRequired();
        builder.Property(place => place.Category).HasColumnName("category").HasMaxLength(120).IsRequired();
        builder.Property(place => place.Cuisine).HasColumnName("cuisine").HasMaxLength(120);
        builder.Property(place => place.PriceBand).HasColumnName("price_band").HasMaxLength(16);
        builder.Property(place => place.Reservable).HasColumnName("reservable").IsRequired();
        builder.Property(place => place.OnlineReservable).HasColumnName("online_reservable").IsRequired();
        builder.Property(place => place.Latitude).HasColumnName("latitude").HasPrecision(9, 6);
        builder.Property(place => place.Longitude).HasColumnName("longitude").HasPrecision(9, 6);
        builder.Property(place => place.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(place => place.UpdatedAt).HasColumnName("updated_at").IsRequired();

        builder.HasIndex(place => place.Slug).IsUnique().HasDatabaseName("ux_places_slug");
        builder.HasIndex(place => new { place.Type, place.DestinationId })
            .HasDatabaseName("ix_places_type_destination");

        builder.OwnsMany(place => place.Translations, translations =>
        {
            translations.ToTable("place_translations");
            translations.WithOwner().HasForeignKey(item => item.PlaceId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.PlaceId).HasColumnName("place_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Name).HasColumnName("name").HasMaxLength(250).IsRequired();
            translations.Property(item => item.Description).HasColumnName("description").HasColumnType("text");
            translations.HasIndex(item => new { item.PlaceId, item.Locale })
                .IsUnique()
                .HasDatabaseName("ux_place_translations_place_locale");
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(place => place.Amenities, amenities =>
        {
            amenities.ToTable("place_amenities");
            amenities.WithOwner().HasForeignKey(item => item.PlaceId);
            amenities.HasKey(item => item.Id);
            amenities.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            amenities.Property(item => item.PlaceId).HasColumnName("place_id");
            amenities.Property(item => item.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
            amenities.HasIndex(item => new { item.PlaceId, item.Name })
                .IsUnique()
                .HasDatabaseName("ux_place_amenities_place_name");
            amenities.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

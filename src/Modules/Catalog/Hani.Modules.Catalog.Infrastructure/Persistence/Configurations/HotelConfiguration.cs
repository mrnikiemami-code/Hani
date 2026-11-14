using Hani.Modules.Catalog.Domain.Hotels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Configurations;

internal sealed class HotelConfiguration : IEntityTypeConfiguration<Hotel>
{
    public void Configure(EntityTypeBuilder<Hotel> builder)
    {
        builder.ToTable("hotels");
        builder.HasKey(hotel => hotel.Id);
        builder.Property(hotel => hotel.Id).HasColumnName("id");
        builder.Property(hotel => hotel.Slug).HasColumnName("slug").HasMaxLength(120).IsRequired();
        builder.Property(hotel => hotel.DestinationId).HasColumnName("destination_id").IsRequired();
        builder.Property(hotel => hotel.Stars).HasColumnName("stars").IsRequired();
        builder.Property(hotel => hotel.Address).HasColumnName("address").HasMaxLength(500);
        builder.Property(hotel => hotel.Latitude).HasColumnName("latitude").HasPrecision(9, 6);
        builder.Property(hotel => hotel.Longitude).HasColumnName("longitude").HasPrecision(9, 6);
        builder.Property(hotel => hotel.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(hotel => hotel.UpdatedAt).HasColumnName("updated_at").IsRequired();

        builder.HasIndex(hotel => hotel.Slug).IsUnique().HasDatabaseName("ux_hotels_slug");
        builder.HasIndex(hotel => hotel.DestinationId).HasDatabaseName("ix_hotels_destination_id");

        builder.OwnsMany(hotel => hotel.Translations, translations =>
        {
            translations.ToTable("hotel_translations");
            translations.WithOwner().HasForeignKey(item => item.HotelId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.HotelId).HasColumnName("hotel_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Name).HasColumnName("name").HasMaxLength(250).IsRequired();
            translations.Property(item => item.Description).HasColumnName("description").HasColumnType("text");
            translations.HasIndex(item => new { item.HotelId, item.Locale })
                .IsUnique()
                .HasDatabaseName("ux_hotel_translations_hotel_locale");
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(hotel => hotel.Amenities, amenities =>
        {
            amenities.ToTable("hotel_amenities");
            amenities.WithOwner().HasForeignKey(item => item.HotelId);
            amenities.HasKey(item => item.Id);
            amenities.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            amenities.Property(item => item.HotelId).HasColumnName("hotel_id");
            amenities.Property(item => item.Category).HasColumnName("category").HasMaxLength(80).IsRequired();
            amenities.Property(item => item.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
            amenities.HasIndex(item => new { item.HotelId, item.Category, item.Name })
                .IsUnique()
                .HasDatabaseName("ux_hotel_amenities_hotel_category_name");
            amenities.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(hotel => hotel.Images, images =>
        {
            images.ToTable("hotel_images");
            images.WithOwner().HasForeignKey(item => item.HotelId);
            images.HasKey(item => item.Id);
            images.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            images.Property(item => item.HotelId).HasColumnName("hotel_id");
            images.Property(item => item.Url).HasColumnName("url").HasMaxLength(1000).IsRequired();
            images.Property(item => item.Caption).HasColumnName("caption").HasMaxLength(300);
            images.Property(item => item.SortOrder).HasColumnName("sort_order").IsRequired();
            images.HasIndex(item => new { item.HotelId, item.SortOrder })
                .HasDatabaseName("ix_hotel_images_hotel_sort");
            images.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

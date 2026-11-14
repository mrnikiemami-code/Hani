using Hani.Modules.Catalog.Domain.TourProducts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Configurations;

internal sealed class TourProductConfiguration : IEntityTypeConfiguration<TourProduct>
{
    public void Configure(EntityTypeBuilder<TourProduct> builder)
    {
        builder.ToTable("tour_products");

        builder.HasKey(product => product.Id);

        builder.Property(product => product.Id).HasColumnName("id");
        builder.Property(product => product.Slug).HasColumnName("slug").HasMaxLength(120).IsRequired();
        builder.Property(product => product.DurationDays).HasColumnName("duration_days").IsRequired();
        builder.Property(product => product.TourType).HasColumnName("tour_type").HasMaxLength(60).IsRequired();
        builder.Property(product => product.OriginDestinationId).HasColumnName("origin_destination_id");
        builder.Property(product => product.Difficulty).HasColumnName("difficulty").HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(product => product.VehicleType).HasColumnName("vehicle_type").HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(product => product.LocalVehicleType).HasColumnName("local_vehicle_type").HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(product => product.AccommodationType).HasColumnName("accommodation_type").HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(product => product.Category).HasColumnName("category").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(product => product.TravelType).HasColumnName("travel_type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(product => product.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(product => product.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(product => product.UpdatedAt).HasColumnName("updated_at").IsRequired();

        builder.HasIndex(product => product.Slug)
            .IsUnique()
            .HasDatabaseName("ux_tour_products_slug");

        builder.OwnsMany(product => product.Translations, translations =>
        {
            translations.ToTable("tour_product_translations");
            translations.WithOwner().HasForeignKey(translation => translation.TourProductId);
            translations.HasKey(translation => translation.Id);

            translations.Property(translation => translation.Id).HasColumnName("id");
            translations.Property(translation => translation.TourProductId).HasColumnName("tour_product_id");
            translations.Property(translation => translation.Locale).HasColumnName("locale").HasMaxLength(5).IsRequired();
            translations.Property(translation => translation.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
            translations.Property(translation => translation.Summary).HasColumnName("summary").HasMaxLength(500).IsRequired();
            translations.Property(translation => translation.Description).HasColumnName("description").IsRequired();
            translations.Property(translation => translation.SeoTitle).HasColumnName("seo_title").HasMaxLength(200);
            translations.Property(translation => translation.SeoDescription).HasColumnName("seo_description").HasMaxLength(300);
            translations.Property(translation => translation.MealsSummary).HasColumnName("meals_summary").HasColumnType("text");
            translations.Property(translation => translation.IncludedServices).HasColumnName("included_services").HasColumnType("text");
            translations.Property(translation => translation.ExcludedServices).HasColumnName("excluded_services").HasColumnType("text");
            translations.Property(translation => translation.CancellationPolicy).HasColumnName("cancellation_policy").HasColumnType("text");
            translations.Property(translation => translation.AdditionalInfo).HasColumnName("additional_info").HasColumnType("text");
            translations.Property(translation => translation.RequiredItems).HasColumnName("required_items").HasColumnType("text");

            translations.HasIndex(translation => new { translation.TourProductId, translation.Locale })
                .IsUnique()
                .HasDatabaseName("ux_tour_product_translations_product_locale");

            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(product => product.Destinations, destinations =>
        {
            destinations.ToTable("tour_product_destinations");
            destinations.WithOwner().HasForeignKey(destination => destination.TourProductId);
            destinations.HasKey(destination => destination.Id);

            destinations.Property(destination => destination.Id).HasColumnName("id");
            destinations.Property(destination => destination.TourProductId).HasColumnName("tour_product_id");
            destinations.Property(destination => destination.DestinationId).HasColumnName("destination_id");
            destinations.Property(destination => destination.SortOrder).HasColumnName("sort_order");

            destinations.HasIndex(destination => new { destination.TourProductId, destination.DestinationId })
                .IsUnique()
                .HasDatabaseName("ux_tour_product_destinations_product_destination");

            destinations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(product => product.ItineraryDays, days =>
        {
            days.ToTable("tour_itinerary_days");
            days.WithOwner().HasForeignKey(day => day.TourProductId);
            days.HasKey(day => day.Id);

            days.Property(day => day.Id).HasColumnName("id");
            days.Property(day => day.TourProductId).HasColumnName("tour_product_id");
            days.Property(day => day.DayNumber).HasColumnName("day_number").IsRequired();
            days.Property(day => day.Breakfast).HasColumnName("breakfast").IsRequired();
            days.Property(day => day.Lunch).HasColumnName("lunch").IsRequired();
            days.Property(day => day.Dinner).HasColumnName("dinner").IsRequired();

            days.HasIndex(day => new { day.TourProductId, day.DayNumber })
                .IsUnique()
                .HasDatabaseName("ux_tour_itinerary_days_product_day");

            days.OwnsMany(day => day.Translations, translations =>
            {
                translations.ToTable("tour_itinerary_day_translations");
                translations.WithOwner().HasForeignKey(translation => translation.TourItineraryDayId);
                translations.HasKey(translation => translation.Id);

                translations.Property(translation => translation.Id).HasColumnName("id");
                translations.Property(translation => translation.TourItineraryDayId).HasColumnName("tour_itinerary_day_id");
                translations.Property(translation => translation.Locale).HasColumnName("locale").HasMaxLength(5).IsRequired();
                translations.Property(translation => translation.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
                translations.Property(translation => translation.Description).HasColumnName("description").HasColumnType("text").IsRequired();
                translations.Property(translation => translation.Accommodation).HasColumnName("accommodation").HasMaxLength(200);

                translations.HasIndex(translation => new { translation.TourItineraryDayId, translation.Locale })
                    .IsUnique()
                    .HasDatabaseName("ux_tour_itinerary_day_translations_day_locale");

                translations.UsePropertyAccessMode(PropertyAccessMode.Field);
            });

            days.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

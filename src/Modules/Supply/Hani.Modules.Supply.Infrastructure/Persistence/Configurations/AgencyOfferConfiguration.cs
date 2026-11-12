using Hani.Modules.Supply.Domain.AgencyOffers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Supply.Infrastructure.Persistence.Configurations;

internal sealed class AgencyOfferConfiguration : IEntityTypeConfiguration<AgencyOffer>
{
    public void Configure(EntityTypeBuilder<AgencyOffer> builder)
    {
        builder.ToTable("agency_offers");

        builder.HasKey(offer => offer.Id);

        builder.Property(offer => offer.Id)
            .HasColumnName("id");

        builder.Property(offer => offer.AgencyId)
            .HasColumnName("agency_id")
            .IsRequired();

        builder.Property(offer => offer.ExternalId)
            .HasColumnName("external_id")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(offer => offer.TourProductId)
            .HasColumnName("tour_product_id")
            .IsRequired();

        builder.Property(offer => offer.Title)
            .HasColumnName("title")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(offer => offer.Status)
            .HasColumnName("status")
            .HasConversion<string>()
            .HasMaxLength(32)
            .IsRequired();

        builder.Property(offer => offer.RejectionReason)
            .HasColumnName("rejection_reason")
            .HasMaxLength(500);

        builder.Property(offer => offer.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        builder.Property(offer => offer.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired();

        builder.ComplexProperty(offer => offer.BasePrice, price =>
        {
            price.Property(money => money.Amount)
                .HasColumnName("base_price")
                .HasPrecision(18, 2)
                .IsRequired();

            price.Property(money => money.Currency)
                .HasColumnName("currency")
                .HasMaxLength(3)
                .IsRequired();
        });

        builder.HasIndex(offer => offer.AgencyId)
            .HasDatabaseName("ix_agency_offers_agency_id");

        builder.HasIndex(offer => offer.TourProductId)
            .HasDatabaseName("ix_agency_offers_tour_product_id");

        builder.OwnsMany(offer => offer.AccommodationOptions, options =>
        {
            options.ToTable("agency_offer_accommodations");
            options.WithOwner().HasForeignKey(option => option.AgencyOfferId);
            options.HasKey(option => option.Id);

            options.Property(option => option.Id).HasColumnName("id");
            options.Property(option => option.AgencyOfferId).HasColumnName("agency_offer_id");
            options.Property(option => option.HotelName).HasColumnName("hotel_name").HasMaxLength(200).IsRequired();
            options.Property(option => option.HotelStars).HasColumnName("hotel_stars").IsRequired();
            options.Property(option => option.RoomType).HasColumnName("room_type").HasConversion<string>().HasMaxLength(32).IsRequired();
            options.Property(option => option.MealPlan).HasColumnName("meal_plan").HasConversion<string>().HasMaxLength(32).IsRequired();
            options.Property(option => option.Amount).HasColumnName("price").HasPrecision(18, 2).IsRequired();
            options.Property(option => option.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
            options.Property(option => option.Description).HasColumnName("description").HasColumnType("text");

            options.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(offer => offer.FlightOptions, options =>
        {
            options.ToTable("agency_offer_flights");
            options.WithOwner().HasForeignKey(option => option.AgencyOfferId);
            options.HasKey(option => option.Id);

            options.Property(option => option.Id).HasColumnName("id");
            options.Property(option => option.AgencyOfferId).HasColumnName("agency_offer_id");
            options.Property(option => option.Direction).HasColumnName("direction").HasConversion<string>().HasMaxLength(16).IsRequired();
            options.Property(option => option.Airline).HasColumnName("airline").HasMaxLength(120).IsRequired();
            options.Property(option => option.FlightNumber).HasColumnName("flight_number").HasMaxLength(32).IsRequired();
            options.Property(option => option.DepartureAirport).HasColumnName("departure_airport").HasMaxLength(120).IsRequired();
            options.Property(option => option.ArrivalAirport).HasColumnName("arrival_airport").HasMaxLength(120).IsRequired();
            options.Property(option => option.DepartureTime).HasColumnName("departure_time").IsRequired();
            options.Property(option => option.ArrivalTime).HasColumnName("arrival_time").IsRequired();
            options.Property(option => option.DurationMinutes).HasColumnName("duration_minutes").IsRequired();
            options.Property(option => option.Cabin).HasColumnName("cabin").HasMaxLength(32).IsRequired();
            options.Property(option => option.BaggageAllowance).HasColumnName("baggage_allowance").HasMaxLength(120).IsRequired();

            options.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.HasIndex(offer => new { offer.AgencyId, offer.ExternalId })
            .IsUnique()
            .HasFilter("external_id <> ''")
            .HasDatabaseName("ux_agency_offers_agency_external");
    }
}

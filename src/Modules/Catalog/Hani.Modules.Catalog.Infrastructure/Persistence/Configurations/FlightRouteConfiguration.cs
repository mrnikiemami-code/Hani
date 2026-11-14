using Hani.Modules.Catalog.Domain.Flights;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Configurations;

internal sealed class FlightRouteConfiguration : IEntityTypeConfiguration<FlightRoute>
{
    public void Configure(EntityTypeBuilder<FlightRoute> builder)
    {
        builder.ToTable("flight_routes");
        builder.HasKey(route => route.Id);
        builder.Property(route => route.Id).HasColumnName("id");
        builder.Property(route => route.Slug).HasColumnName("slug").HasMaxLength(120).IsRequired();
        builder.Property(route => route.OriginCode).HasColumnName("origin_code").HasMaxLength(3).IsRequired();
        builder.Property(route => route.DestinationCode).HasColumnName("destination_code").HasMaxLength(3).IsRequired();
        builder.Property(route => route.OriginCity).HasColumnName("origin_city").HasMaxLength(120).IsRequired();
        builder.Property(route => route.DestinationCity).HasColumnName("destination_city").HasMaxLength(120).IsRequired();
        builder.Property(route => route.IsActive).HasColumnName("is_active").IsRequired();
        builder.Property(route => route.OriginAirportId).HasColumnName("origin_airport_id");
        builder.Property(route => route.DestinationAirportId).HasColumnName("destination_airport_id");
        builder.Property(route => route.CreatedAt).HasColumnName("created_at").IsRequired();

        builder.HasIndex(route => route.Slug).IsUnique().HasDatabaseName("ux_flight_routes_slug");
        builder.HasIndex(route => new { route.OriginCode, route.DestinationCode })
            .HasDatabaseName("ix_flight_routes_origin_destination");

        builder.OwnsMany(route => route.Offers, offers =>
        {
            offers.ToTable("flight_offers");
            offers.WithOwner().HasForeignKey(offer => offer.RouteId);
            offers.HasKey(offer => offer.Id);
            offers.Property(offer => offer.Id).HasColumnName("id").ValueGeneratedNever();
            offers.Property(offer => offer.RouteId).HasColumnName("route_id");
            offers.Property(offer => offer.FlightNumber).HasColumnName("flight_number").HasMaxLength(20).IsRequired();
            offers.Property(offer => offer.AirlineCode).HasColumnName("airline_code").HasMaxLength(3).IsRequired();
            offers.Property(offer => offer.AirlineName).HasColumnName("airline_name").HasMaxLength(120).IsRequired();
            offers.Property(offer => offer.DepartureDate).HasColumnName("departure_date").IsRequired();
            offers.Property(offer => offer.DepartureTime).HasColumnName("departure_time").IsRequired();
            offers.Property(offer => offer.ArrivalTime).HasColumnName("arrival_time").IsRequired();
            offers.Property(offer => offer.DurationMinutes).HasColumnName("duration_minutes").IsRequired();
            offers.Property(offer => offer.Stops).HasColumnName("stops").IsRequired();
            offers.Property(offer => offer.Cabin).HasColumnName("cabin").HasMaxLength(40).IsRequired();
            offers.Property(offer => offer.BaggageAllowance).HasColumnName("baggage_allowance").HasMaxLength(120).IsRequired();
            offers.Property(offer => offer.Price).HasColumnName("price").HasPrecision(18, 2).IsRequired();
            offers.Property(offer => offer.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
            offers.Property(offer => offer.Provider).HasColumnName("provider").HasMaxLength(120).IsRequired();
            offers.Property(offer => offer.DeepLink).HasColumnName("deep_link").HasMaxLength(2000).IsRequired();
            offers.Property(offer => offer.AirlineId).HasColumnName("airline_id");
            offers.HasIndex(offer => new { offer.RouteId, offer.DepartureDate, offer.Price })
                .HasDatabaseName("ix_flight_offers_route_date_price");
            offers.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

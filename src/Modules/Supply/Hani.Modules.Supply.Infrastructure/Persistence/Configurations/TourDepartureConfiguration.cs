using Hani.Modules.Supply.Domain.Departures;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Supply.Infrastructure.Persistence.Configurations;

internal sealed class TourDepartureConfiguration : IEntityTypeConfiguration<TourDeparture>
{
    public void Configure(EntityTypeBuilder<TourDeparture> builder)
    {
        builder.ToTable("tour_departures");

        builder.HasKey(departure => departure.Id);

        builder.Property(departure => departure.Id).HasColumnName("id");
        builder.Property(departure => departure.AgencyOfferId).HasColumnName("agency_offer_id").IsRequired();
        builder.Property(departure => departure.StartDate).HasColumnName("start_date").IsRequired();
        builder.Property(departure => departure.EndDate).HasColumnName("end_date").IsRequired();
        builder.Property(departure => departure.Capacity).HasColumnName("capacity").IsRequired();
        builder.Property(departure => departure.SeatsLeft).HasColumnName("seats_left").IsRequired();
        builder.Property(departure => departure.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(departure => departure.Version).HasColumnName("version").IsRequired();
        builder.Property(departure => departure.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(departure => departure.UpdatedAt).HasColumnName("updated_at").IsRequired();

        builder.HasIndex(departure => new { departure.AgencyOfferId, departure.StartDate })
            .HasDatabaseName("ix_tour_departures_offer_start");

        builder.OwnsMany(departure => departure.Prices, prices =>
        {
            prices.ToTable("tour_departure_prices");
            prices.WithOwner().HasForeignKey(price => price.TourDepartureId);
            prices.HasKey(price => price.Id);

            prices.Property(price => price.Id).HasColumnName("id");
            prices.Property(price => price.TourDepartureId).HasColumnName("tour_departure_id");
            prices.Property(price => price.RoomType).HasColumnName("room_type").HasConversion<string>().HasMaxLength(32).IsRequired();
            prices.Property(price => price.Amount).HasColumnName("amount").HasPrecision(18, 2).IsRequired();
            prices.Property(price => price.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();

            prices.HasIndex(price => new { price.TourDepartureId, price.RoomType })
                .IsUnique()
                .HasDatabaseName("ux_tour_departure_prices_departure_room");

            prices.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

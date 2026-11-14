using Hani.Modules.Booking.Domain.RestaurantReservations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class RestaurantReservationConfiguration
    : IEntityTypeConfiguration<RestaurantReservation>
{
    public void Configure(EntityTypeBuilder<RestaurantReservation> builder)
    {
        builder.ToTable("restaurant_reservations");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.ReservationNumber).HasColumnName("reservation_number").HasMaxLength(64).IsRequired();
        builder.Property(item => item.PlaceId).HasColumnName("place_id").IsRequired();
        builder.Property(item => item.ReservationDate).HasColumnName("reservation_date").IsRequired();
        builder.Property(item => item.ReservationTime).HasColumnName("reservation_time").IsRequired();
        builder.Property(item => item.PartySize).HasColumnName("party_size").IsRequired();
        builder.Property(item => item.ContactName).HasColumnName("contact_name").HasMaxLength(200).IsRequired();
        builder.Property(item => item.ContactEmail).HasColumnName("contact_email").HasMaxLength(320).IsRequired();
        builder.Property(item => item.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32).IsRequired();
        builder.Property(item => item.Notes).HasColumnName("notes").HasColumnType("text");
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.ConfirmedAt).HasColumnName("confirmed_at");
        builder.Property(item => item.RejectionReason).HasColumnName("rejection_reason").HasMaxLength(500);

        builder.HasIndex(item => item.ReservationNumber)
            .IsUnique()
            .HasDatabaseName("ux_restaurant_reservations_number");
        builder.HasIndex(item => item.PlaceId).HasDatabaseName("ix_restaurant_reservations_place");
        builder.HasIndex(item => item.Status).HasDatabaseName("ix_restaurant_reservations_status");
    }
}

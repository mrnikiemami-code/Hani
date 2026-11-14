using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Booking.Domain.ReservationRequests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class ReservationRequestConfiguration : IEntityTypeConfiguration<ReservationRequest>
{
    public void Configure(EntityTypeBuilder<ReservationRequest> builder)
    {
        builder.ToTable("reservation_requests");
        builder.HasKey(request => request.Id);
        builder.Property(request => request.Id).HasColumnName("id");
        builder.Property(request => request.RequestNumber).HasColumnName("request_number").HasMaxLength(64).IsRequired();
        builder.Property(request => request.QuoteId).HasColumnName("quote_id").IsRequired();
        builder.Property(request => request.AgencyOfferId).HasColumnName("agency_offer_id").IsRequired();
        builder.Property(request => request.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(request => request.DepartureId).HasColumnName("departure_id").IsRequired();
        builder.Property(request => request.RoomType).HasColumnName("room_type").HasMaxLength(32).IsRequired();
        builder.Property(request => request.Adults).HasColumnName("adults").IsRequired();
        builder.Property(request => request.Children).HasColumnName("children").IsRequired();
        builder.Property(request => request.Infants).HasColumnName("infants").IsRequired();
        builder.Property(request => request.ContactEmail).HasColumnName("contact_email").HasMaxLength(320).IsRequired();
        builder.Property(request => request.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32);
        builder.Property(request => request.Notes).HasColumnName("notes").HasColumnType("text");
        builder.Property(request => request.Pricing).HasColumnName("pricing").HasColumnType("jsonb")
            .HasConversion(
                snapshot => PricingSnapshotJson.Serialize(snapshot),
                json => PricingSnapshotJson.Deserialize(json));
        builder.Property(request => request.Total).HasColumnName("total").HasPrecision(18, 2).IsRequired();
        builder.Property(request => request.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(request => request.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(request => request.AgencyNote).HasColumnName("agency_note").HasMaxLength(1000);
        builder.Property(request => request.RejectionReason).HasColumnName("rejection_reason").HasMaxLength(1000);
        builder.Property(request => request.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(request => request.ExpiresAt).HasColumnName("expires_at").IsRequired();
        builder.Property(request => request.DecidedAt).HasColumnName("decided_at");
        builder.Property(request => request.AcceptedAt).HasColumnName("accepted_at");

        builder.HasIndex(request => request.RequestNumber).IsUnique().HasDatabaseName("ux_reservation_requests_number");
        builder.HasIndex(request => new { request.AgencyId, request.Status }).HasDatabaseName("ix_reservation_requests_agency_status");
    }
}

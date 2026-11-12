using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Booking.Domain.Quotes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class QuoteConfiguration : IEntityTypeConfiguration<Quote>
{
    public void Configure(EntityTypeBuilder<Quote> builder)
    {
        builder.ToTable("quotes");

        builder.HasKey(quote => quote.Id);
        builder.Property(quote => quote.Id).HasColumnName("id");
        builder.Property(quote => quote.DepartureId).HasColumnName("departure_id").IsRequired();
        builder.Property(quote => quote.AgencyOfferId).HasColumnName("agency_offer_id").IsRequired();
        builder.Property(quote => quote.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(quote => quote.RoomType).HasColumnName("room_type").HasMaxLength(32).IsRequired();
        builder.Property(quote => quote.Adults).HasColumnName("adults").IsRequired();
        builder.Property(quote => quote.Children).HasColumnName("children").IsRequired();
        builder.Property(quote => quote.Infants).HasColumnName("infants").IsRequired();
        builder.Property(quote => quote.Seats).HasColumnName("seats").IsRequired();
        builder.Property(quote => quote.UnitPrice).HasColumnName("unit_price").HasPrecision(18, 2).IsRequired();
        builder.Property(quote => quote.Total).HasColumnName("total").HasPrecision(18, 2).IsRequired();
        builder.Property(quote => quote.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(quote => quote.Pricing).HasColumnName("pricing").HasColumnType("jsonb")
            .HasConversion(
                snapshot => snapshot == null ? null : PricingSnapshotJson.Serialize(snapshot),
                json => json == null ? null : PricingSnapshotJson.Deserialize(json));
        builder.Property(quote => quote.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(quote => quote.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(quote => quote.ExpiresAt).HasColumnName("expires_at").IsRequired();

        builder.HasIndex(quote => quote.DepartureId)
            .HasDatabaseName("ix_quotes_departure_id");
        builder.HasIndex(quote => quote.ExpiresAt)
            .HasDatabaseName("ix_quotes_expires_at");
    }
}

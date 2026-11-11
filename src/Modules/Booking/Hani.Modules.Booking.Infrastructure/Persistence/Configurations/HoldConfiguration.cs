using Hani.Modules.Booking.Domain.Holds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class HoldConfiguration : IEntityTypeConfiguration<Hold>
{
    public void Configure(EntityTypeBuilder<Hold> builder)
    {
        builder.ToTable("holds");

        builder.HasKey(hold => hold.Id);
        builder.Property(hold => hold.Id).HasColumnName("id");
        builder.Property(hold => hold.QuoteId).HasColumnName("quote_id").IsRequired();
        builder.Property(hold => hold.DepartureId).HasColumnName("departure_id").IsRequired();
        builder.Property(hold => hold.Seats).HasColumnName("seats").IsRequired();
        builder.Property(hold => hold.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(hold => hold.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(hold => hold.ExpiresAt).HasColumnName("expires_at").IsRequired();

        builder.HasIndex(hold => new { hold.QuoteId, hold.Status })
            .HasDatabaseName("ix_holds_quote_status");
        builder.HasIndex(hold => hold.ExpiresAt)
            .HasDatabaseName("ix_holds_expires_at");
    }
}

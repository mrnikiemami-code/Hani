using Hani.Modules.Booking.Domain.PriceDiscrepancies;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class PriceDiscrepancyReportConfiguration : IEntityTypeConfiguration<PriceDiscrepancyReport>
{
    public void Configure(EntityTypeBuilder<PriceDiscrepancyReport> builder)
    {
        builder.ToTable("price_discrepancy_reports");
        builder.HasKey(report => report.Id);
        builder.Property(report => report.Id).HasColumnName("id");
        builder.Property(report => report.AgencyOfferId).HasColumnName("agency_offer_id").IsRequired();
        builder.Property(report => report.DepartureId).HasColumnName("departure_id");
        builder.Property(report => report.ContactEmail).HasColumnName("contact_email").HasMaxLength(320);
        builder.Property(report => report.ReportedPrice).HasColumnName("reported_price").HasPrecision(18, 2).IsRequired();
        builder.Property(report => report.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(report => report.Note).HasColumnName("note").HasColumnType("text").IsRequired();
        builder.Property(report => report.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(report => report.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(report => report.ReviewedAt).HasColumnName("reviewed_at");
        builder.Property(report => report.Resolution).HasColumnName("resolution").HasMaxLength(1000);

        builder.HasIndex(report => report.Status).HasDatabaseName("ix_price_discrepancies_status");
        builder.HasIndex(report => report.AgencyOfferId).HasDatabaseName("ix_price_discrepancies_offer");
    }
}

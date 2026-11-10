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
    }
}

using Hani.Modules.Catalog.Domain.Flights;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Configurations;

internal sealed class AirlineConfiguration : IEntityTypeConfiguration<Airline>
{
    public void Configure(EntityTypeBuilder<Airline> builder)
    {
        builder.ToTable("airlines");
        builder.HasKey(airline => airline.Id);
        builder.Property(airline => airline.Id).HasColumnName("id");
        builder.Property(airline => airline.Iata).HasColumnName("iata").HasMaxLength(2).IsRequired();
        builder.Property(airline => airline.Name).HasColumnName("name").HasMaxLength(120).IsRequired();
        builder.Property(airline => airline.IsActive).HasColumnName("is_active").IsRequired();
        builder.Property(airline => airline.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(airline => airline.Iata).IsUnique().HasDatabaseName("ux_airlines_iata");
    }
}

internal sealed class AirportConfiguration : IEntityTypeConfiguration<Airport>
{
    public void Configure(EntityTypeBuilder<Airport> builder)
    {
        builder.ToTable("airports");
        builder.HasKey(airport => airport.Id);
        builder.Property(airport => airport.Id).HasColumnName("id");
        builder.Property(airport => airport.Iata).HasColumnName("iata").HasMaxLength(3).IsRequired();
        builder.Property(airport => airport.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
        builder.Property(airport => airport.City).HasColumnName("city").HasMaxLength(120).IsRequired();
        builder.Property(airport => airport.CountryCode).HasColumnName("country_code").HasMaxLength(3).IsRequired();
        builder.Property(airport => airport.DestinationId).HasColumnName("destination_id");
        builder.Property(airport => airport.Latitude).HasColumnName("latitude").HasPrecision(9, 6);
        builder.Property(airport => airport.Longitude).HasColumnName("longitude").HasPrecision(9, 6);
        builder.Property(airport => airport.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(airport => airport.Iata).IsUnique().HasDatabaseName("ux_airports_iata");
        builder.HasIndex(airport => airport.DestinationId).HasDatabaseName("ix_airports_destination_id");
    }
}

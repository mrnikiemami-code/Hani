using Hani.Modules.Identity.Domain.ApiClients;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class ApiClientConfiguration : IEntityTypeConfiguration<ApiClient>
{
    public void Configure(EntityTypeBuilder<ApiClient> builder)
    {
        builder.ToTable("api_clients");

        builder.HasKey(client => client.Id);

        builder.Property(client => client.Id).HasColumnName("id");
        builder.Property(client => client.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(client => client.Name).HasColumnName("name").HasMaxLength(120).IsRequired();
        builder.Property(client => client.ClientId).HasColumnName("client_id").HasMaxLength(100).IsRequired();
        builder.Property(client => client.SecretHash).HasColumnName("secret_hash").HasMaxLength(128).IsRequired();
        builder.Property(client => client.Scopes).HasColumnName("scopes").HasMaxLength(1000).IsRequired();
        builder.Property(client => client.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(client => client.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(client => client.LastUsedAt).HasColumnName("last_used_at");

        builder.HasIndex(client => client.ClientId)
            .IsUnique()
            .HasDatabaseName("ux_api_clients_client_id");

        builder.HasIndex(client => client.AgencyId)
            .HasDatabaseName("ix_api_clients_agency_id");
    }
}

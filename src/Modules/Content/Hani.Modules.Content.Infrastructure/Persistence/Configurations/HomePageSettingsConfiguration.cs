using Hani.Modules.Content.Domain.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Content.Infrastructure.Persistence.Configurations;

internal sealed class HomePageSettingsConfiguration : IEntityTypeConfiguration<HomePageSettings>
{
    public void Configure(EntityTypeBuilder<HomePageSettings> builder)
    {
        builder.ToTable("home_page_settings");
        builder.HasKey(item => new { item.Key, item.Locale });
        builder.Property(item => item.Key)
            .HasColumnName("key")
            .HasMaxLength(64)
            .IsRequired();
        builder.Property(item => item.Locale)
            .HasColumnName("locale")
            .HasMaxLength(10)
            .IsRequired();
        builder.Property(item => item.SettingsJson)
            .HasColumnName("settings_json")
            .HasColumnType("jsonb")
            .IsRequired();
        builder.Property(item => item.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired();
    }
}

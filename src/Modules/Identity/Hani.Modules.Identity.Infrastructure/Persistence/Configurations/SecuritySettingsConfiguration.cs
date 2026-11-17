using Hani.Modules.Identity.Domain.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class SecuritySettingsConfiguration : IEntityTypeConfiguration<SecuritySettings>
{
    public void Configure(EntityTypeBuilder<SecuritySettings> builder)
    {
        builder.ToTable("security_settings");
        builder.HasKey(item => item.Key);
        builder.Property(item => item.Key).HasColumnName("key").HasMaxLength(60);
        builder.Property(item => item.SettingsJson).HasColumnName("settings_json").IsRequired();
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at");
    }
}

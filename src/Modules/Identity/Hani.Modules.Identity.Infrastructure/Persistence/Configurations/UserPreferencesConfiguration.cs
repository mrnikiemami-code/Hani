using Hani.Modules.Identity.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class UserPreferencesConfiguration : IEntityTypeConfiguration<UserPreferences>
{
    public void Configure(EntityTypeBuilder<UserPreferences> builder)
    {
        builder.ToTable("user_preferences");

        builder.HasKey(preferences => preferences.UserId);
        builder.Property(preferences => preferences.UserId).HasColumnName("user_id");
        builder.Property(preferences => preferences.HomeExperienceId)
            .HasColumnName("home_experience_id")
            .HasMaxLength(64);
        builder.Property(preferences => preferences.Locale)
            .HasColumnName("locale")
            .HasMaxLength(16);
        builder.Property(preferences => preferences.Currency)
            .HasColumnName("currency")
            .HasMaxLength(3);
        builder.Property(preferences => preferences.Theme)
            .HasColumnName("theme")
            .HasMaxLength(16);
        builder.Property(preferences => preferences.ReducedMotion)
            .HasColumnName("reduced_motion")
            .IsRequired();
        builder.Property(preferences => preferences.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired();
    }
}

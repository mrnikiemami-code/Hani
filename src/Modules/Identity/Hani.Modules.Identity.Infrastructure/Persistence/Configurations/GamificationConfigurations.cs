using Hani.Modules.Identity.Domain.Gamification;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class UserGamificationConfiguration : IEntityTypeConfiguration<UserGamification>
{
    public void Configure(EntityTypeBuilder<UserGamification> builder)
    {
        builder.ToTable("user_gamification");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.UserId).HasColumnName("user_id").IsRequired();
        builder.Property(item => item.Points).HasColumnName("points").IsRequired();
        builder.Property(item => item.Level).HasColumnName("level").IsRequired();
        builder.Property(item => item.TravelStyle).HasColumnName("travel_style").HasMaxLength(80);
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at").IsRequired();
        builder.HasIndex(item => item.UserId).IsUnique().HasDatabaseName("ux_user_gamification_user");
    }
}

internal sealed class BadgeDefinitionConfiguration : IEntityTypeConfiguration<BadgeDefinition>
{
    public void Configure(EntityTypeBuilder<BadgeDefinition> builder)
    {
        builder.ToTable("badge_definitions");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Code).HasColumnName("code").HasMaxLength(80).IsRequired();
        builder.Property(item => item.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
        builder.Property(item => item.Description).HasColumnName("description").HasMaxLength(500).IsRequired();
        builder.Property(item => item.Category).HasColumnName("category").HasMaxLength(80).IsRequired();
        builder.Property(item => item.Threshold).HasColumnName("threshold").IsRequired();
        builder.HasIndex(item => item.Code).IsUnique().HasDatabaseName("ux_badge_definitions_code");
    }
}

internal sealed class UserBadgeConfiguration : IEntityTypeConfiguration<UserBadge>
{
    public void Configure(EntityTypeBuilder<UserBadge> builder)
    {
        builder.ToTable("user_badges");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.UserId).HasColumnName("user_id").IsRequired();
        builder.Property(item => item.BadgeCode).HasColumnName("badge_code").HasMaxLength(80).IsRequired();
        builder.Property(item => item.AwardedAt).HasColumnName("awarded_at").IsRequired();
        builder.HasIndex(item => new { item.UserId, item.BadgeCode }).IsUnique().HasDatabaseName("ux_user_badges_user_code");
    }
}

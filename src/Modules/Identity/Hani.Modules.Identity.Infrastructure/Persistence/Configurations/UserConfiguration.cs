using Hani.Modules.Identity.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users");

        builder.HasKey(user => user.Id);
        builder.Property(user => user.Id).HasColumnName("id");
        builder.Property(user => user.Mobile).HasColumnName("mobile").HasMaxLength(20).IsRequired();
        builder.Property(user => user.Email).HasColumnName("email").HasMaxLength(320);
        builder.Property(user => user.FirstName).HasColumnName("first_name").HasMaxLength(100).IsRequired();
        builder.Property(user => user.LastName).HasColumnName("last_name").HasMaxLength(100).IsRequired();
        builder.Property(user => user.Username).HasColumnName("username").HasMaxLength(32).IsRequired();
        builder.Property(user => user.Bio).HasColumnName("bio").HasMaxLength(1000);
        builder.Property(user => user.AvatarUrl).HasColumnName("avatar_url").HasMaxLength(500);
        builder.Property(user => user.Role).HasColumnName("role").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(user => user.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(user => user.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(user => user.UpdatedAt).HasColumnName("updated_at").IsRequired();
        builder.Property(user => user.LastLoginAt).HasColumnName("last_login_at");

        builder.HasIndex(user => user.Mobile)
            .IsUnique()
            .HasDatabaseName("ux_users_mobile");
        builder.HasIndex(user => user.Username)
            .IsUnique()
            .HasDatabaseName("ux_users_username");
        builder.HasIndex(user => user.Status)
            .HasDatabaseName("ix_users_status");

        builder.OwnsMany(user => user.OtpCodes, otp =>
        {
            otp.ToTable("user_otp_codes");
            otp.WithOwner().HasForeignKey(item => item.UserId);
            otp.HasKey(item => item.Id);

            otp.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            otp.Property(item => item.UserId).HasColumnName("user_id");
            otp.Property(item => item.CodeHash).HasColumnName("code_hash").HasMaxLength(128).IsRequired();
            otp.Property(item => item.Purpose).HasColumnName("purpose").HasConversion<string>().HasMaxLength(32).IsRequired();
            otp.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
            otp.Property(item => item.ExpiresAt).HasColumnName("expires_at").IsRequired();
            otp.Property(item => item.Attempts).HasColumnName("attempts").IsRequired();
            otp.Property(item => item.MaxAttempts).HasColumnName("max_attempts").IsRequired();
            otp.Property(item => item.ConsumedAt).HasColumnName("consumed_at");

            otp.HasIndex(item => new { item.UserId, item.CreatedAt })
                .HasDatabaseName("ix_user_otp_codes_user_created");
            otp.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(user => user.RefreshTokens, token =>
        {
            token.ToTable("user_refresh_tokens");
            token.WithOwner().HasForeignKey(item => item.UserId);
            token.HasKey(item => item.Id);

            token.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            token.Property(item => item.UserId).HasColumnName("user_id");
            token.Property(item => item.TokenHash).HasColumnName("token_hash").HasMaxLength(128).IsRequired();
            token.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
            token.Property(item => item.ExpiresAt).HasColumnName("expires_at").IsRequired();
            token.Property(item => item.RevokedAt).HasColumnName("revoked_at");
            token.Property(item => item.ReplacedByTokenHash).HasColumnName("replaced_by_token_hash").HasMaxLength(128);

            token.HasIndex(item => item.TokenHash)
                .IsUnique()
                .HasDatabaseName("ux_user_refresh_tokens_hash");
            token.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

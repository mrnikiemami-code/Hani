using Hani.Modules.Identity.Domain.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class OwnershipClaimConfiguration : IEntityTypeConfiguration<OwnershipClaim>
{
    public void Configure(EntityTypeBuilder<OwnershipClaim> builder)
    {
        builder.ToTable("ownership_claims");

        builder.HasKey(claim => claim.Id);
        builder.Property(claim => claim.Id).HasColumnName("id");
        builder.Property(claim => claim.UserId).HasColumnName("user_id").IsRequired();
        builder.Property(claim => claim.TargetType).HasColumnName("target_type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(claim => claim.TargetId).HasColumnName("target_id").IsRequired();
        builder.Property(claim => claim.ClaimType).HasColumnName("claim_type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(claim => claim.FullName).HasColumnName("full_name").HasMaxLength(200).IsRequired();
        builder.Property(claim => claim.Email).HasColumnName("email").HasMaxLength(320).IsRequired();
        builder.Property(claim => claim.Phone).HasColumnName("phone").HasMaxLength(32);
        builder.Property(claim => claim.Message).HasColumnName("message").HasColumnType("text").IsRequired();
        builder.Property(claim => claim.EvidenceUrl).HasColumnName("evidence_url").HasMaxLength(1000);
        builder.Property(claim => claim.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(claim => claim.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(claim => claim.ReviewedAt).HasColumnName("reviewed_at");
        builder.Property(claim => claim.RejectionReason).HasColumnName("rejection_reason").HasMaxLength(500);

        builder.HasIndex(claim => claim.Status)
            .HasDatabaseName("ix_ownership_claims_status");
        builder.HasIndex(claim => claim.UserId)
            .HasDatabaseName("ix_ownership_claims_user_id");
    }
}

using Hani.Modules.Identity.Domain.Reviews;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> builder)
    {
        builder.ToTable("reviews");

        builder.HasKey(review => review.Id);
        builder.Property(review => review.Id).HasColumnName("id");
        builder.Property(review => review.UserId).HasColumnName("user_id").IsRequired();
        builder.Property(review => review.TargetType).HasColumnName("target_type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(review => review.TargetId).HasColumnName("target_id").IsRequired();
        builder.Property(review => review.Rating).HasColumnName("rating").IsRequired();
        builder.Property(review => review.FoodRating).HasColumnName("food_rating");
        builder.Property(review => review.CleanlinessRating).HasColumnName("cleanliness_rating");
        builder.Property(review => review.StaffRating).HasColumnName("staff_rating");
        builder.Property(review => review.EntertainmentRating).HasColumnName("entertainment_rating");
        builder.Property(review => review.LocationRating).HasColumnName("location_rating");
        builder.Property(review => review.ValueRating).HasColumnName("value_rating");
        builder.Property(review => review.Title).HasColumnName("title").HasMaxLength(200);
        builder.Property(review => review.Comment).HasColumnName("comment").HasColumnType("text").IsRequired();
        builder.Property(review => review.TravelType).HasColumnName("travel_type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(review => review.VisitDate).HasColumnName("visit_date");
        var criteriaProperty = builder.Property(review => review.Criteria)
            .HasColumnName("criteria")
            .HasColumnType("jsonb")
            .HasConversion(
                criteria => System.Text.Json.JsonSerializer.Serialize(criteria, (System.Text.Json.JsonSerializerOptions?)null),
                json => System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, int>>(json, (System.Text.Json.JsonSerializerOptions?)null) ?? new Dictionary<string, int>())
            .IsRequired();
        criteriaProperty.Metadata.SetValueComparer(new ValueComparer<Dictionary<string, int>>(
            (left, right) => left != null && right != null && left.SequenceEqual(right),
            criteria => criteria.Aggregate(
                0,
                (hash, item) => HashCode.Combine(hash, item.Key, item.Value)),
            criteria => new Dictionary<string, int>(criteria)));
        builder.Property(review => review.ProofType)
            .HasColumnName("proof_type")
            .HasConversion<string>()
            .HasMaxLength(32)
            .IsRequired();
        builder.Property(review => review.ProofUrl).HasColumnName("proof_url").HasMaxLength(1000);
        builder.Property(review => review.OwnerReply).HasColumnName("owner_reply").HasColumnType("text");
        builder.Property(review => review.OwnerRepliedAt).HasColumnName("owner_replied_at");
        builder.Property(review => review.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(review => review.ModerationReason).HasColumnName("moderation_reason").HasMaxLength(500);
        builder.Property(review => review.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(review => review.PublishedAt).HasColumnName("published_at");
        builder.Property(review => review.HelpfulCount).HasColumnName("helpful_count").IsRequired();
        builder.Property(review => review.ReportCount).HasColumnName("report_count").IsRequired();

        builder.HasIndex(review => new { review.TargetType, review.TargetId, review.Status })
            .HasDatabaseName("ix_reviews_target_status");
        builder.HasIndex(review => review.UserId)
            .HasDatabaseName("ix_reviews_user_id");
        builder.HasIndex(review => review.Status)
            .HasDatabaseName("ix_reviews_status");

        builder.OwnsMany(review => review.Photos, photos =>
        {
            photos.ToTable("review_photos");
            photos.WithOwner().HasForeignKey(photo => photo.ReviewId);
            photos.HasKey(photo => photo.Id);
            photos.Property(photo => photo.Id).HasColumnName("id").ValueGeneratedNever();
            photos.Property(photo => photo.ReviewId).HasColumnName("review_id");
            photos.Property(photo => photo.Url).HasColumnName("url").HasMaxLength(1000).IsRequired();
            photos.Property(photo => photo.Caption).HasColumnName("caption").HasMaxLength(300);
            photos.Property(photo => photo.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
            photos.Property(photo => photo.CreatedAt).HasColumnName("created_at").IsRequired();
            photos.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(review => review.HelpfulVotes, votes =>
        {
            votes.ToTable("review_helpful_votes");
            votes.WithOwner().HasForeignKey(vote => vote.ReviewId);
            votes.HasKey(vote => vote.Id);
            votes.Property(vote => vote.Id).HasColumnName("id").ValueGeneratedNever();
            votes.Property(vote => vote.ReviewId).HasColumnName("review_id");
            votes.Property(vote => vote.UserId).HasColumnName("user_id").IsRequired();
            votes.Property(vote => vote.CreatedAt).HasColumnName("created_at").IsRequired();
            votes.HasIndex(vote => new { vote.ReviewId, vote.UserId })
                .IsUnique()
                .HasDatabaseName("ux_review_helpful_votes_review_user");
            votes.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(review => review.Reports, reports =>
        {
            reports.ToTable("review_reports");
            reports.WithOwner().HasForeignKey(report => report.ReviewId);
            reports.HasKey(report => report.Id);
            reports.Property(report => report.Id).HasColumnName("id").ValueGeneratedNever();
            reports.Property(report => report.ReviewId).HasColumnName("review_id");
            reports.Property(report => report.UserId).HasColumnName("user_id").IsRequired();
            reports.Property(report => report.Reason).HasColumnName("reason").HasMaxLength(500).IsRequired();
            reports.Property(report => report.CreatedAt).HasColumnName("created_at").IsRequired();
            reports.HasIndex(report => new { report.ReviewId, report.UserId })
                .IsUnique()
                .HasDatabaseName("ux_review_reports_review_user");
            reports.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

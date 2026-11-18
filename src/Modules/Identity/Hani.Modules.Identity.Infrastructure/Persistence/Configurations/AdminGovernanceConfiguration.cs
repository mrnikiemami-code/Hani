using Hani.Modules.Identity.Domain.Governance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class AdminAuditEventConfiguration : IEntityTypeConfiguration<AdminAuditEvent>
{
    public void Configure(EntityTypeBuilder<AdminAuditEvent> builder)
    {
        builder.ToTable("admin_audit_events");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.OccurredAt).HasColumnName("occurred_at").IsRequired();
        builder.Property(item => item.ActorUserId).HasColumnName("actor_user_id");
        builder.Property(item => item.ActorRole).HasColumnName("actor_role").HasMaxLength(64).IsRequired();
        builder.Property(item => item.AgencyId).HasColumnName("agency_id");
        builder.Property(item => item.Action).HasColumnName("action").HasMaxLength(120).IsRequired();
        builder.Property(item => item.EntityType).HasColumnName("entity_type").HasMaxLength(80).IsRequired();
        builder.Property(item => item.EntityId).HasColumnName("entity_id").HasMaxLength(120).IsRequired();
        builder.Property(item => item.BeforeJson).HasColumnName("before_json").HasColumnType("jsonb");
        builder.Property(item => item.AfterJson).HasColumnName("after_json").HasColumnType("jsonb");
        builder.Property(item => item.Reason).HasColumnName("reason").HasMaxLength(1000).IsRequired();
        builder.Property(item => item.CorrelationId).HasColumnName("correlation_id").HasMaxLength(120).IsRequired();
        builder.Property(item => item.IpAddress).HasColumnName("ip_address").HasMaxLength(64);
        builder.Property(item => item.UserAgent).HasColumnName("user_agent").HasMaxLength(500);
        builder.HasIndex(item => item.OccurredAt).HasDatabaseName("ix_admin_audit_events_occurred");
        builder.HasIndex(item => new { item.EntityType, item.EntityId })
            .HasDatabaseName("ix_admin_audit_events_entity");
        builder.HasIndex(item => item.Action).HasDatabaseName("ix_admin_audit_events_action");
        builder.HasIndex(item => item.ActorUserId).HasDatabaseName("ix_admin_audit_events_actor");
    }
}

internal sealed class AdminApprovalRequestConfiguration
    : IEntityTypeConfiguration<AdminApprovalRequest>
{
    public void Configure(EntityTypeBuilder<AdminApprovalRequest> builder)
    {
        builder.ToTable("admin_approval_requests");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Type).HasColumnName("type")
            .HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status")
            .HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.EntityType).HasColumnName("entity_type")
            .HasMaxLength(80).IsRequired();
        builder.Property(item => item.EntityId).HasColumnName("entity_id").IsRequired();
        builder.Property(item => item.Amount).HasColumnName("amount")
            .HasPrecision(18, 2).IsRequired();
        builder.Property(item => item.Currency).HasColumnName("currency")
            .HasMaxLength(3).IsRequired();
        builder.Property(item => item.PaymentIntentId).HasColumnName("payment_intent_id");
        builder.Property(item => item.BankReference).HasColumnName("bank_reference").HasMaxLength(200);
        builder.Property(item => item.DocumentUrl).HasColumnName("document_url").HasMaxLength(1000);
        builder.Property(item => item.RequestedReason).HasColumnName("requested_reason")
            .HasMaxLength(1000).IsRequired();
        builder.Property(item => item.RequestedBy).HasColumnName("requested_by").IsRequired();
        builder.Property(item => item.RequestedAt).HasColumnName("requested_at").IsRequired();
        builder.Property(item => item.DecidedBy).HasColumnName("decided_by");
        builder.Property(item => item.DecidedAt).HasColumnName("decided_at");
        builder.Property(item => item.DecisionReason).HasColumnName("decision_reason").HasMaxLength(1000);
        builder.Property(item => item.FailureReason).HasColumnName("failure_reason").HasMaxLength(1000);
        builder.HasIndex(item => new { item.Status, item.RequestedAt })
            .HasDatabaseName("ix_admin_approval_requests_status_requested");
        builder.HasIndex(item => new { item.Type, item.EntityId })
            .HasDatabaseName("ix_admin_approval_requests_type_entity");
    }
}

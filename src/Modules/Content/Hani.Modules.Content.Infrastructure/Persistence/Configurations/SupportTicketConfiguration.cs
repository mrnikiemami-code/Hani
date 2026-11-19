using Hani.Modules.Content.Domain.Support;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Content.Infrastructure.Persistence.Configurations;

internal sealed class SupportTicketConfiguration : IEntityTypeConfiguration<SupportTicket>
{
    public void Configure(EntityTypeBuilder<SupportTicket> builder)
    {
        builder.ToTable("support_tickets");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.TicketNumber).HasColumnName("ticket_number")
            .HasMaxLength(32).IsRequired();
        builder.Property(item => item.UserId).HasColumnName("user_id");
        builder.Property(item => item.ContactName).HasColumnName("contact_name")
            .HasMaxLength(200).IsRequired();
        builder.Property(item => item.ContactEmail).HasColumnName("contact_email")
            .HasMaxLength(320).IsRequired();
        builder.Property(item => item.ContactPhone).HasColumnName("contact_phone")
            .HasMaxLength(40);
        builder.Property(item => item.Subject).HasColumnName("subject")
            .HasMaxLength(300).IsRequired();
        builder.Property(item => item.Category).HasColumnName("category")
            .HasMaxLength(80).IsRequired();
        builder.Property(item => item.Priority).HasColumnName("priority")
            .HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status")
            .HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.AssignedTo).HasColumnName("assigned_to");
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at").IsRequired();
        builder.Property(item => item.LastMessageAt).HasColumnName("last_message_at").IsRequired();
        builder.Property(item => item.CustomerLastReadAt).HasColumnName("customer_last_read_at");
        builder.Property(item => item.AdminLastReadAt).HasColumnName("admin_last_read_at");
        builder.HasIndex(item => item.TicketNumber).IsUnique()
            .HasDatabaseName("ux_support_tickets_number");
        builder.HasIndex(item => new { item.Status, item.Priority })
            .HasDatabaseName("ix_support_tickets_status_priority");
        builder.HasIndex(item => item.ContactEmail)
            .HasDatabaseName("ix_support_tickets_email");
        builder.OwnsMany(item => item.Messages, messages =>
        {
            messages.ToTable("support_messages");
            messages.WithOwner().HasForeignKey(item => item.TicketId);
            messages.HasKey(item => item.Id);
            messages.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            messages.Property(item => item.TicketId).HasColumnName("ticket_id");
            messages.Property(item => item.AuthorType).HasColumnName("author_type")
                .HasConversion<string>().HasMaxLength(32).IsRequired();
            messages.Property(item => item.AuthorUserId).HasColumnName("author_user_id");
            messages.Property(item => item.Body).HasColumnName("body").HasColumnType("text").IsRequired();
            messages.Property(item => item.IsInternal).HasColumnName("is_internal").IsRequired();
            messages.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
            messages.HasIndex(item => new { item.TicketId, item.CreatedAt })
                .HasDatabaseName("ix_support_messages_ticket_time");
            messages.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

internal sealed class SupportAttachmentConfiguration : IEntityTypeConfiguration<SupportAttachment>
{
    public void Configure(EntityTypeBuilder<SupportAttachment> builder)
    {
        builder.ToTable("support_attachments");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.TicketId).HasColumnName("ticket_id").IsRequired();
        builder.Property(item => item.MessageId).HasColumnName("message_id");
        builder.Property(item => item.FileName).HasColumnName("file_name")
            .HasMaxLength(255).IsRequired();
        builder.Property(item => item.ContentType).HasColumnName("content_type")
            .HasMaxLength(120).IsRequired();
        builder.Property(item => item.SizeBytes).HasColumnName("size_bytes").IsRequired();
        builder.Property(item => item.StorageKey).HasColumnName("storage_key")
            .HasMaxLength(500).IsRequired();
        builder.Property(item => item.UploadedBy).HasColumnName("uploaded_by").IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => item.TicketId)
            .HasDatabaseName("ix_support_attachments_ticket");
        builder.HasIndex(item => item.MessageId)
            .HasDatabaseName("ix_support_attachments_message");
    }
}

internal sealed class SupportDisputeConfiguration : IEntityTypeConfiguration<SupportDispute>
{
    public void Configure(EntityTypeBuilder<SupportDispute> builder)
    {
        builder.ToTable("support_disputes");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.TicketId).HasColumnName("ticket_id").IsRequired();
        builder.Property(item => item.OrderId).HasColumnName("order_id");
        builder.Property(item => item.Type).HasColumnName("type")
            .HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status")
            .HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.Amount).HasColumnName("amount").HasPrecision(18, 2);
        builder.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3);
        builder.Property(item => item.Description).HasColumnName("description")
            .HasColumnType("text").IsRequired();
        builder.Property(item => item.EvidenceUrl).HasColumnName("evidence_url").HasMaxLength(1000);
        builder.Property(item => item.Resolution).HasColumnName("resolution")
            .HasColumnType("text");
        builder.Property(item => item.OpenedBy).HasColumnName("opened_by").IsRequired();
        builder.Property(item => item.OpenedAt).HasColumnName("opened_at").IsRequired();
        builder.Property(item => item.ResolvedBy).HasColumnName("resolved_by");
        builder.Property(item => item.ResolvedAt).HasColumnName("resolved_at");
        builder.HasIndex(item => item.TicketId)
            .HasDatabaseName("ix_support_disputes_ticket");
        builder.HasIndex(item => new { item.Status, item.Type })
            .HasDatabaseName("ix_support_disputes_status_type");
        builder.HasIndex(item => item.OrderId)
            .HasDatabaseName("ix_support_disputes_order");
    }
}

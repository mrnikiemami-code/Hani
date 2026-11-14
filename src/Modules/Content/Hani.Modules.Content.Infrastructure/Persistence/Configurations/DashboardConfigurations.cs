using Hani.Modules.Content.Domain.Dashboard;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Content.Infrastructure.Persistence.Configurations;

internal sealed class UserMessageConfiguration : IEntityTypeConfiguration<UserMessage>
{
    public void Configure(EntityTypeBuilder<UserMessage> builder)
    {
        builder.ToTable("user_messages");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.UserId).HasColumnName("user_id").IsRequired();
        builder.Property(item => item.Subject).HasColumnName("subject").HasMaxLength(300).IsRequired();
        builder.Property(item => item.Body).HasColumnName("body").HasColumnType("text").IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => new { item.UserId, item.Status }).HasDatabaseName("ix_user_messages_user_status");
    }
}

internal sealed class UserDocumentConfiguration : IEntityTypeConfiguration<UserDocument>
{
    public void Configure(EntityTypeBuilder<UserDocument> builder)
    {
        builder.ToTable("user_documents");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.UserId).HasColumnName("user_id").IsRequired();
        builder.Property(item => item.Name).HasColumnName("name").HasMaxLength(300).IsRequired();
        builder.Property(item => item.FileUrl).HasColumnName("file_url").HasMaxLength(2000).IsRequired();
        builder.Property(item => item.DocumentType).HasColumnName("document_type").HasMaxLength(80).IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => new { item.UserId, item.DocumentType }).HasDatabaseName("ix_user_documents_user_type");
    }
}

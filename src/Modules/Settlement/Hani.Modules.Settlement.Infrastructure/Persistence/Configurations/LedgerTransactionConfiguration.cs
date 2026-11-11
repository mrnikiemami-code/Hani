using Hani.Modules.Settlement.Domain.Ledger;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Settlement.Infrastructure.Persistence.Configurations;

internal sealed class LedgerTransactionConfiguration : IEntityTypeConfiguration<LedgerTransaction>
{
    public void Configure(EntityTypeBuilder<LedgerTransaction> builder)
    {
        builder.ToTable("ledger_transactions");

        builder.HasKey(transaction => transaction.Id);
        builder.Property(transaction => transaction.Id).HasColumnName("id");
        builder.Property(transaction => transaction.ReferenceType).HasColumnName("reference_type").HasMaxLength(64).IsRequired();
        builder.Property(transaction => transaction.ReferenceId).HasColumnName("reference_id").IsRequired();
        builder.Property(transaction => transaction.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(transaction => transaction.CreatedAt).HasColumnName("created_at").IsRequired();

        builder.HasIndex(transaction => new { transaction.ReferenceType, transaction.ReferenceId })
            .HasDatabaseName("ix_ledger_transactions_reference");

        builder.OwnsMany(transaction => transaction.Entries, entries =>
        {
            entries.ToTable("ledger_entries");
            entries.WithOwner().HasForeignKey(entry => entry.TransactionId);
            entries.HasKey(entry => entry.Id);

            entries.Property(entry => entry.Id).HasColumnName("id");
            entries.Property(entry => entry.TransactionId).HasColumnName("transaction_id");
            entries.Property(entry => entry.AccountCode).HasColumnName("account_code").HasMaxLength(50).IsRequired();
            entries.Property(entry => entry.Debit).HasColumnName("debit").HasPrecision(18, 2).IsRequired();
            entries.Property(entry => entry.Credit).HasColumnName("credit").HasPrecision(18, 2).IsRequired();
            entries.Property(entry => entry.Description).HasColumnName("description").HasMaxLength(300).IsRequired();

            entries.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

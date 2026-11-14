using Hani.Modules.Booking.Domain.Installments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class InstallmentPlanConfiguration : IEntityTypeConfiguration<InstallmentPlan>
{
    public void Configure(EntityTypeBuilder<InstallmentPlan> builder)
    {
        builder.ToTable("installment_plans");
        builder.HasKey(plan => plan.Id);
        builder.Property(plan => plan.Id).HasColumnName("id");
        builder.Property(plan => plan.OrderId).HasColumnName("order_id").IsRequired();
        builder.Property(plan => plan.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(plan => plan.TotalAmount).HasColumnName("total_amount").HasPrecision(18, 2).IsRequired();
        builder.Property(plan => plan.InstallmentCount).HasColumnName("installment_count").IsRequired();
        builder.Property(plan => plan.IntervalDays).HasColumnName("interval_days").IsRequired();
        builder.Property(plan => plan.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(plan => plan.CreatedAt).HasColumnName("created_at").IsRequired();

        builder.HasIndex(plan => new { plan.OrderId, plan.Currency })
            .IsUnique()
            .HasDatabaseName("ux_installment_plans_order_currency");

        builder.OwnsMany(plan => plan.Installments, installments =>
        {
            installments.ToTable("installments");
            installments.WithOwner().HasForeignKey(installment => installment.PlanId);
            installments.HasKey(installment => installment.Id);
            installments.Property(installment => installment.Id).HasColumnName("id").ValueGeneratedNever();
            installments.Property(installment => installment.PlanId).HasColumnName("plan_id");
            installments.Property(installment => installment.Sequence).HasColumnName("sequence").IsRequired();
            installments.Property(installment => installment.DueDate).HasColumnName("due_date").IsRequired();
            installments.Property(installment => installment.Amount).HasColumnName("amount").HasPrecision(18, 2).IsRequired();
            installments.Property(installment => installment.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
            installments.Property(installment => installment.PaidAt).HasColumnName("paid_at");
            installments.HasIndex(installment => new { installment.PlanId, installment.Sequence })
                .IsUnique()
                .HasDatabaseName("ux_installments_plan_sequence");
            installments.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

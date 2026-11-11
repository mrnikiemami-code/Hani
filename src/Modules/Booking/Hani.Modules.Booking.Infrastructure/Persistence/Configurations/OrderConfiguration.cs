using Hani.Modules.Booking.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("orders");

        builder.HasKey(order => order.Id);
        builder.Property(order => order.Id).HasColumnName("id");
        builder.Property(order => order.OrderNumber).HasColumnName("order_number").HasMaxLength(64).IsRequired();
        builder.Property(order => order.QuoteId).HasColumnName("quote_id").IsRequired();
        builder.Property(order => order.HoldId).HasColumnName("hold_id").IsRequired();
        builder.Property(order => order.AgencyId).HasColumnName("agency_id").IsRequired();
        builder.Property(order => order.AgencyOfferId).HasColumnName("agency_offer_id").IsRequired();
        builder.Property(order => order.DepartureId).HasColumnName("departure_id").IsRequired();
        builder.Property(order => order.RoomType).HasColumnName("room_type").HasMaxLength(32).IsRequired();
        builder.Property(order => order.Adults).HasColumnName("adults").IsRequired();
        builder.Property(order => order.Children).HasColumnName("children").IsRequired();
        builder.Property(order => order.Infants).HasColumnName("infants").IsRequired();
        builder.Property(order => order.Seats).HasColumnName("seats").IsRequired();
        builder.Property(order => order.UnitPrice).HasColumnName("unit_price").HasPrecision(18, 2).IsRequired();
        builder.Property(order => order.Total).HasColumnName("total").HasPrecision(18, 2).IsRequired();
        builder.Property(order => order.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
        builder.Property(order => order.ContactEmail).HasColumnName("contact_email").HasMaxLength(320).IsRequired();
        builder.Property(order => order.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32);
        builder.Property(order => order.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(order => order.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(order => order.PaymentDueAt).HasColumnName("payment_due_at").IsRequired();

        builder.HasIndex(order => order.OrderNumber)
            .IsUnique()
            .HasDatabaseName("ux_orders_order_number");
        builder.HasIndex(order => order.HoldId)
            .IsUnique()
            .HasDatabaseName("ux_orders_hold_id");
        builder.HasIndex(order => order.QuoteId)
            .HasDatabaseName("ix_orders_quote_id");

        builder.OwnsMany(order => order.Travelers, travelers =>
        {
            travelers.ToTable("order_travelers");
            travelers.WithOwner().HasForeignKey(traveler => traveler.OrderId);
            travelers.HasKey(traveler => traveler.Id);

            travelers.Property(traveler => traveler.Id).HasColumnName("id");
            travelers.Property(traveler => traveler.OrderId).HasColumnName("order_id");
            travelers.Property(traveler => traveler.FullName).HasColumnName("full_name").HasMaxLength(200).IsRequired();
            travelers.Property(traveler => traveler.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(16).IsRequired();
            travelers.Property(traveler => traveler.DateOfBirth).HasColumnName("date_of_birth");

            travelers.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsMany(order => order.Lines, lines =>
        {
            lines.ToTable("order_lines");
            lines.WithOwner().HasForeignKey(line => line.OrderId);
            lines.HasKey(line => line.Id);

            lines.Property(line => line.Id).HasColumnName("id");
            lines.Property(line => line.OrderId).HasColumnName("order_id");
            lines.Property(line => line.Description).HasColumnName("description").HasMaxLength(300).IsRequired();
            lines.Property(line => line.Quantity).HasColumnName("quantity").IsRequired();
            lines.Property(line => line.UnitPrice).HasColumnName("unit_price").HasPrecision(18, 2).IsRequired();
            lines.Property(line => line.Total).HasColumnName("total").HasPrecision(18, 2).IsRequired();
            lines.Property(line => line.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();

            lines.UsePropertyAccessMode(PropertyAccessMode.Field);
        });

        builder.OwnsOne(order => order.Contract, contract =>
        {
            contract.ToTable("contracts");
            contract.WithOwner().HasForeignKey(item => item.OrderId);
            contract.HasKey(item => item.Id);

            contract.Property(item => item.Id).HasColumnName("id");
            contract.Property(item => item.OrderId).HasColumnName("order_id");
            contract.Property(item => item.ContractNumber).HasColumnName("contract_number").HasMaxLength(64).IsRequired();
            contract.Property(item => item.IssuedAt).HasColumnName("issued_at").IsRequired();
            contract.Property(item => item.QuoteId).HasColumnName("quote_id").IsRequired();
            contract.Property(item => item.HoldId).HasColumnName("hold_id").IsRequired();
            contract.Property(item => item.AgencyId).HasColumnName("agency_id").IsRequired();
            contract.Property(item => item.AgencyOfferId).HasColumnName("agency_offer_id").IsRequired();
            contract.Property(item => item.DepartureId).HasColumnName("departure_id").IsRequired();
            contract.Property(item => item.RoomType).HasColumnName("room_type").HasMaxLength(32).IsRequired();
            contract.Property(item => item.Adults).HasColumnName("adults").IsRequired();
            contract.Property(item => item.Children).HasColumnName("children").IsRequired();
            contract.Property(item => item.Infants).HasColumnName("infants").IsRequired();
            contract.Property(item => item.Seats).HasColumnName("seats").IsRequired();
            contract.Property(item => item.UnitPrice).HasColumnName("unit_price").HasPrecision(18, 2).IsRequired();
            contract.Property(item => item.Total).HasColumnName("total").HasPrecision(18, 2).IsRequired();
            contract.Property(item => item.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
            contract.Property(item => item.ContactEmail).HasColumnName("contact_email").HasMaxLength(320).IsRequired();
            contract.Property(item => item.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32);

            contract.HasIndex(item => item.ContractNumber)
                .IsUnique()
                .HasDatabaseName("ux_contracts_contract_number");
            contract.HasIndex(item => item.OrderId)
                .IsUnique()
                .HasDatabaseName("ux_contracts_order_id");

            contract.OwnsMany(item => item.Travelers, travelers =>
            {
                travelers.ToTable("contract_travelers");
                travelers.WithOwner().HasForeignKey(traveler => traveler.ContractId);
                travelers.HasKey(traveler => traveler.Id);

                travelers.Property(traveler => traveler.Id).HasColumnName("id");
                travelers.Property(traveler => traveler.ContractId).HasColumnName("contract_id");
                travelers.Property(traveler => traveler.FullName).HasColumnName("full_name").HasMaxLength(200).IsRequired();
                travelers.Property(traveler => traveler.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(16).IsRequired();
                travelers.Property(traveler => traveler.DateOfBirth).HasColumnName("date_of_birth");

                travelers.UsePropertyAccessMode(PropertyAccessMode.Field);
            });

            contract.OwnsMany(item => item.Lines, lines =>
            {
                lines.ToTable("contract_lines");
                lines.WithOwner().HasForeignKey(line => line.ContractId);
                lines.HasKey(line => line.Id);

                lines.Property(line => line.Id).HasColumnName("id");
                lines.Property(line => line.ContractId).HasColumnName("contract_id");
                lines.Property(line => line.Description).HasColumnName("description").HasMaxLength(300).IsRequired();
                lines.Property(line => line.Quantity).HasColumnName("quantity").IsRequired();
                lines.Property(line => line.UnitPrice).HasColumnName("unit_price").HasPrecision(18, 2).IsRequired();
                lines.Property(line => line.Total).HasColumnName("total").HasPrecision(18, 2).IsRequired();
                lines.Property(line => line.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();

                lines.UsePropertyAccessMode(PropertyAccessMode.Field);
            });
        });
    }
}

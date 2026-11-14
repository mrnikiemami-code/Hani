using Hani.Modules.Booking.Domain.HotelInquiries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class HotelInquiryConfiguration : IEntityTypeConfiguration<HotelInquiry>
{
    public void Configure(EntityTypeBuilder<HotelInquiry> builder)
    {
        builder.ToTable("hotel_inquiries");
        builder.HasKey(inquiry => inquiry.Id);
        builder.Property(inquiry => inquiry.Id).HasColumnName("id");
        builder.Property(inquiry => inquiry.InquiryNumber).HasColumnName("inquiry_number").HasMaxLength(64).IsRequired();
        builder.Property(inquiry => inquiry.HotelId).HasColumnName("hotel_id").IsRequired();
        builder.Property(inquiry => inquiry.CheckIn).HasColumnName("check_in").IsRequired();
        builder.Property(inquiry => inquiry.CheckOut).HasColumnName("check_out").IsRequired();
        builder.Property(inquiry => inquiry.Rooms).HasColumnName("rooms").IsRequired();
        builder.Property(inquiry => inquiry.Adults).HasColumnName("adults").IsRequired();
        builder.Property(inquiry => inquiry.Children).HasColumnName("children").IsRequired();
        builder.Property(inquiry => inquiry.ContactEmail).HasColumnName("contact_email").HasMaxLength(320).IsRequired();
        builder.Property(inquiry => inquiry.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32);
        builder.Property(inquiry => inquiry.Notes).HasColumnName("notes").HasColumnType("text");
        builder.Property(inquiry => inquiry.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(inquiry => inquiry.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(inquiry => inquiry.RespondedAt).HasColumnName("responded_at");
        builder.Property(inquiry => inquiry.ResponseNote).HasColumnName("response_note").HasMaxLength(2000);
        builder.Property(inquiry => inquiry.QuotedTotal).HasColumnName("quoted_total").HasPrecision(18, 2);
        builder.Property(inquiry => inquiry.QuotedCurrency).HasColumnName("quoted_currency").HasMaxLength(3);

        builder.HasIndex(inquiry => inquiry.InquiryNumber).IsUnique().HasDatabaseName("ux_hotel_inquiries_number");
        builder.HasIndex(inquiry => inquiry.HotelId).HasDatabaseName("ix_hotel_inquiries_hotel");
        builder.HasIndex(inquiry => inquiry.Status).HasDatabaseName("ix_hotel_inquiries_status");
    }
}

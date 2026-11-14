using Hani.Modules.Booking.Domain.Leads;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Booking.Infrastructure.Persistence.Configurations;

internal sealed class LeadRequestConfiguration : IEntityTypeConfiguration<LeadRequest>
{
    public void Configure(EntityTypeBuilder<LeadRequest> builder)
    {
        builder.ToTable("lead_requests");
        builder.HasKey(lead => lead.Id);
        builder.Property(lead => lead.Id).HasColumnName("id");
        builder.Property(lead => lead.RequestNumber).HasColumnName("request_number").HasMaxLength(64).IsRequired();
        builder.Property(lead => lead.ServiceType).HasColumnName("service_type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(lead => lead.Destination).HasColumnName("destination").HasMaxLength(200);
        builder.Property(lead => lead.StartDate).HasColumnName("start_date");
        builder.Property(lead => lead.EndDate).HasColumnName("end_date");
        builder.Property(lead => lead.Adults).HasColumnName("adults").IsRequired();
        builder.Property(lead => lead.Children).HasColumnName("children").IsRequired();
        builder.Property(lead => lead.Infants).HasColumnName("infants").IsRequired();
        builder.Property(lead => lead.BudgetAmount).HasColumnName("budget_amount").HasPrecision(18, 2);
        builder.Property(lead => lead.Currency).HasColumnName("currency").HasMaxLength(3);
        builder.Property(lead => lead.ContactName).HasColumnName("contact_name").HasMaxLength(200).IsRequired();
        builder.Property(lead => lead.ContactEmail).HasColumnName("contact_email").HasMaxLength(320).IsRequired();
        builder.Property(lead => lead.ContactPhone).HasColumnName("contact_phone").HasMaxLength(32).IsRequired();
        builder.Property(lead => lead.Notes).HasColumnName("notes").HasColumnType("text");
        builder.Property(lead => lead.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(lead => lead.MatchedAgencyId).HasColumnName("matched_agency_id");
        builder.Property(lead => lead.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(lead => lead.MatchedAt).HasColumnName("matched_at");
        builder.Property(lead => lead.ClosedAt).HasColumnName("closed_at");

        builder.HasIndex(lead => lead.RequestNumber).IsUnique().HasDatabaseName("ux_lead_requests_number");
        builder.HasIndex(lead => lead.Status).HasDatabaseName("ix_lead_requests_status");

        builder.OwnsMany(lead => lead.Invitations, invitations =>
        {
            invitations.ToTable("lead_agency_invitations");
            invitations.WithOwner().HasForeignKey(invitation => invitation.LeadId);
            invitations.HasKey(invitation => invitation.Id);
            invitations.Property(invitation => invitation.Id)
                .HasColumnName("id")
                .ValueGeneratedNever();
            invitations.Property(invitation => invitation.LeadId).HasColumnName("lead_id");
            invitations.Property(invitation => invitation.AgencyId).HasColumnName("agency_id").IsRequired();
            invitations.Property(invitation => invitation.InvitedAt).HasColumnName("invited_at").IsRequired();
            invitations.Property(invitation => invitation.Status)
                .HasColumnName("status")
                .HasConversion<string>()
                .HasMaxLength(32)
                .IsRequired();
            invitations.HasIndex(invitation => new { invitation.LeadId, invitation.AgencyId })
                .IsUnique()
                .HasDatabaseName("ux_lead_invitations_lead_agency");
            invitations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

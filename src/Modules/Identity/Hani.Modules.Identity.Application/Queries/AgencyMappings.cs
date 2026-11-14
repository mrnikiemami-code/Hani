using Hani.Modules.Identity.Application.Queries.GetAgencyById;
using Hani.Modules.Identity.Domain.Agencies;

namespace Hani.Modules.Identity.Application.Queries;

internal static class AgencyMappings
{
    public static AgencyDto ToDto(Agency agency)
        => new(
            agency.Id,
            agency.Slug,
            agency.Name,
            agency.LicenseNo,
            agency.City,
            agency.Status.ToString(),
            agency.SubscriptionValidUntil,
            agency.CreatedAt,
            agency.OwnerUserId,
            agency.Website,
            agency.ContactEmail,
            agency.ContactPhone,
            agency.About,
            agency.SubmittedAt,
            agency.ReviewedAt,
            agency.RejectionReason,
            agency.Documents
                .Select(document => new AgencyDocumentDto(
                    document.Id,
                    document.Type.ToString(),
                    document.FileUrl,
                    document.Status.ToString(),
                    document.UploadedAt))
                .ToArray());
}

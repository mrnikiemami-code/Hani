using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Domain.VisaApplications;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>
/// Command that submits a visa application.
/// </summary>
public sealed record CreateVisaApplicationCommand(
    Guid VisaCountryId,
    Guid VisaTypeId,
    string ApplicantName,
    string PassportNo,
    string Nationality,
    DateOnly? DateOfBirth,
    DateOnly? TravelDate,
    string ContactEmail,
    string ContactPhone,
    string? Notes,
    IReadOnlyList<string> Documents,
    IReadOnlyList<VisaApplicantInput>? Applicants = null) : ICommand<VisaApplicationDto>;

/// <summary>
/// Query that returns one visa application.
/// </summary>
public sealed record GetVisaApplicationQuery(Guid ApplicationId) : IQuery<VisaApplicationDto>;

/// <summary>
/// Query that lists visa applications for operations.
/// </summary>
public sealed record ListVisaApplicationsQuery(string? Status, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<VisaApplicationDto>>;

/// <summary>
/// Command that updates a visa application status.
/// </summary>
public sealed record UpdateVisaApplicationStatusCommand(
    Guid ApplicationId,
    VisaApplicationStatus Status,
    string? RejectionReason = null) : ICommand<bool>;

/// <summary>
/// Visa application read model.
/// </summary>
public sealed record VisaApplicationDto(
    Guid ApplicationId,
    string ApplicationNumber,
    Guid VisaCountryId,
    Guid VisaTypeId,
    string ApplicantName,
    string PassportNo,
    string Nationality,
    DateOnly? DateOfBirth,
    DateOnly? TravelDate,
    string ContactEmail,
    string ContactPhone,
    string? Notes,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt,
    string? RejectionReason,
    IReadOnlyList<string> Documents,
    int PassengerCount = 1,
    IReadOnlyList<VisaApplicantDto>? Applicants = null);

/// <summary>
/// Additional applicant read model.
/// </summary>
public sealed record VisaApplicantDto(
    string FullName,
    string PassportNo,
    string Nationality,
    DateOnly? DateOfBirth,
    string? Relation);

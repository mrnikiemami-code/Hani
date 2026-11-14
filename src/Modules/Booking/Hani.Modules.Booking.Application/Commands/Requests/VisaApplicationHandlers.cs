using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.VisaApplications;

namespace Hani.Modules.Booking.Application.Commands.Requests;

internal sealed class CreateVisaApplicationCommandHandler(
    IVisaApplicationRepository applications,
    IIdGenerator ids)
    : ICommandHandler<CreateVisaApplicationCommand, VisaApplicationDto>
{
    public async Task<Result<VisaApplicationDto>> Handle(
        CreateVisaApplicationCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var application = VisaApplication.Create(
                ids,
                request.VisaCountryId,
                request.VisaTypeId,
                request.ApplicantName,
                request.PassportNo,
                request.Nationality,
                request.DateOfBirth,
                request.TravelDate,
                request.ContactEmail,
                request.ContactPhone,
                request.Notes,
                request.Documents);
            await applications.AddAsync(application, cancellationToken);
            return Result<VisaApplicationDto>.Success(Map(application));
        }
        catch (ArgumentException exception)
        {
            return Result<VisaApplicationDto>.Failure(
                Error.Validation("HANI-BOOKING-3601", exception.Message));
        }
    }

    private static VisaApplicationDto Map(VisaApplication application)
        => new(
            application.Id,
            application.ApplicationNumber,
            application.VisaCountryId,
            application.VisaTypeId,
            application.ApplicantName,
            application.PassportNo,
            application.Nationality,
            application.DateOfBirth,
            application.TravelDate,
            application.ContactEmail,
            application.ContactPhone,
            application.Notes,
            application.Status.ToString(),
            application.CreatedAt,
            application.UpdatedAt,
            application.RejectionReason,
            application.Documents.Select(document => document.FileUrl).ToArray());
}

internal sealed class GetVisaApplicationQueryHandler(IVisaApplicationRepository applications)
    : IQueryHandler<GetVisaApplicationQuery, VisaApplicationDto>
{
    public async Task<Result<VisaApplicationDto>> Handle(
        GetVisaApplicationQuery request,
        CancellationToken cancellationToken)
    {
        var application = await applications.GetByIdAsync(request.ApplicationId, cancellationToken);

        return application is null
            ? Result<VisaApplicationDto>.Failure(
                Error.NotFound("HANI-BOOKING-3602", "Visa application was not found."))
            : Result<VisaApplicationDto>.Success(Map(application));
    }

    private static VisaApplicationDto Map(VisaApplication application)
        => new(
            application.Id,
            application.ApplicationNumber,
            application.VisaCountryId,
            application.VisaTypeId,
            application.ApplicantName,
            application.PassportNo,
            application.Nationality,
            application.DateOfBirth,
            application.TravelDate,
            application.ContactEmail,
            application.ContactPhone,
            application.Notes,
            application.Status.ToString(),
            application.CreatedAt,
            application.UpdatedAt,
            application.RejectionReason,
            application.Documents.Select(document => document.FileUrl).ToArray());
}

internal sealed class ListVisaApplicationsQueryHandler(IVisaApplicationRepository applications)
    : IQueryHandler<ListVisaApplicationsQuery, PagedResult<VisaApplicationDto>>
{
    public async Task<Result<PagedResult<VisaApplicationDto>>> Handle(
        ListVisaApplicationsQuery request,
        CancellationToken cancellationToken)
    {
        VisaApplicationStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<VisaApplicationStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<PagedResult<VisaApplicationDto>>.Failure(
                    Error.Validation("HANI-BOOKING-3603", "Visa application status is invalid."));
            }

            status = parsed;
        }

        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await applications.ListAsync(
            status,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await applications.CountAsync(status, cancellationToken);

        return Result<PagedResult<VisaApplicationDto>>.Success(
            new PagedResult<VisaApplicationDto>(items.Select(Map).ToArray(), page, pageSize, total));
    }

    private static VisaApplicationDto Map(VisaApplication application)
        => new(
            application.Id,
            application.ApplicationNumber,
            application.VisaCountryId,
            application.VisaTypeId,
            application.ApplicantName,
            application.PassportNo,
            application.Nationality,
            application.DateOfBirth,
            application.TravelDate,
            application.ContactEmail,
            application.ContactPhone,
            application.Notes,
            application.Status.ToString(),
            application.CreatedAt,
            application.UpdatedAt,
            application.RejectionReason,
            application.Documents.Select(document => document.FileUrl).ToArray());
}

internal sealed class UpdateVisaApplicationStatusCommandHandler(
    IVisaApplicationRepository applications)
    : ICommandHandler<UpdateVisaApplicationStatusCommand, bool>
{
    public async Task<Result<bool>> Handle(
        UpdateVisaApplicationStatusCommand request,
        CancellationToken cancellationToken)
    {
        var application = await applications.GetByIdAsync(request.ApplicationId, cancellationToken);

        if (application is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3602", "Visa application was not found."));
        }

        try
        {
            application.SetStatus(request.Status, request.RejectionReason);
            await applications.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3604", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(Error.Validation("HANI-BOOKING-3605", exception.Message));
        }
    }
}

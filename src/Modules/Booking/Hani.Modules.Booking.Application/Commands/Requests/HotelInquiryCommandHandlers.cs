using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.HotelInquiries;

namespace Hani.Modules.Booking.Application.Commands.Requests;

internal sealed class CreateHotelInquiryCommandHandler(
    IHotelInquiryRepository inquiries,
    IIdGenerator ids)
    : ICommandHandler<CreateHotelInquiryCommand, HotelInquiryDto>
{
    public async Task<Result<HotelInquiryDto>> Handle(
        CreateHotelInquiryCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var inquiry = HotelInquiry.Create(
                ids,
                request.HotelId,
                request.CheckIn,
                request.CheckOut,
                request.Rooms,
                request.Adults,
                request.Children,
                request.ContactEmail,
                request.ContactPhone,
                request.Notes);
            await inquiries.AddAsync(inquiry, cancellationToken);
            return Result<HotelInquiryDto>.Success(Map(inquiry));
        }
        catch (ArgumentException exception)
        {
            return Result<HotelInquiryDto>.Failure(
                Error.Validation("HANI-BOOKING-3401", exception.Message));
        }
    }

    private static HotelInquiryDto Map(HotelInquiry inquiry)
        => new(
            inquiry.Id,
            inquiry.InquiryNumber,
            inquiry.HotelId,
            inquiry.CheckIn,
            inquiry.CheckOut,
            inquiry.Rooms,
            inquiry.Adults,
            inquiry.Children,
            inquiry.ContactEmail,
            inquiry.ContactPhone,
            inquiry.Notes,
            inquiry.Status.ToString(),
            inquiry.CreatedAt,
            inquiry.RespondedAt,
            inquiry.ResponseNote,
            inquiry.QuotedTotal,
            inquiry.QuotedCurrency);
}

internal sealed class GetHotelInquiryQueryHandler(IHotelInquiryRepository inquiries)
    : IQueryHandler<GetHotelInquiryQuery, HotelInquiryDto>
{
    public async Task<Result<HotelInquiryDto>> Handle(
        GetHotelInquiryQuery request,
        CancellationToken cancellationToken)
    {
        var inquiry = await inquiries.GetByIdAsync(request.InquiryId, cancellationToken);
        return inquiry is null
            ? Result<HotelInquiryDto>.Failure(
                Error.NotFound("HANI-BOOKING-3402", "Hotel inquiry was not found."))
            : Result<HotelInquiryDto>.Success(Map(inquiry));
    }

    private static HotelInquiryDto Map(HotelInquiry inquiry)
        => new(
            inquiry.Id,
            inquiry.InquiryNumber,
            inquiry.HotelId,
            inquiry.CheckIn,
            inquiry.CheckOut,
            inquiry.Rooms,
            inquiry.Adults,
            inquiry.Children,
            inquiry.ContactEmail,
            inquiry.ContactPhone,
            inquiry.Notes,
            inquiry.Status.ToString(),
            inquiry.CreatedAt,
            inquiry.RespondedAt,
            inquiry.ResponseNote,
            inquiry.QuotedTotal,
            inquiry.QuotedCurrency);
}

internal sealed class ListHotelInquiriesQueryHandler(IHotelInquiryRepository inquiries)
    : IQueryHandler<ListHotelInquiriesQuery, PagedResult<HotelInquiryDto>>
{
    public async Task<Result<PagedResult<HotelInquiryDto>>> Handle(
        ListHotelInquiriesQuery request,
        CancellationToken cancellationToken)
    {
        HotelInquiryStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<HotelInquiryStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<PagedResult<HotelInquiryDto>>.Failure(
                    Error.Validation("HANI-BOOKING-3403", "Hotel inquiry status is invalid."));
            }

            status = parsed;
        }

        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await inquiries.ListAsync(
            status,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await inquiries.CountAsync(status, cancellationToken);

        return Result<PagedResult<HotelInquiryDto>>.Success(
            new PagedResult<HotelInquiryDto>(items.Select(Map).ToArray(), page, pageSize, total));
    }

    private static HotelInquiryDto Map(HotelInquiry inquiry)
        => new(
            inquiry.Id,
            inquiry.InquiryNumber,
            inquiry.HotelId,
            inquiry.CheckIn,
            inquiry.CheckOut,
            inquiry.Rooms,
            inquiry.Adults,
            inquiry.Children,
            inquiry.ContactEmail,
            inquiry.ContactPhone,
            inquiry.Notes,
            inquiry.Status.ToString(),
            inquiry.CreatedAt,
            inquiry.RespondedAt,
            inquiry.ResponseNote,
            inquiry.QuotedTotal,
            inquiry.QuotedCurrency);
}

internal sealed class RespondHotelInquiryCommandHandler(IHotelInquiryRepository inquiries)
    : ICommandHandler<RespondHotelInquiryCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RespondHotelInquiryCommand request,
        CancellationToken cancellationToken)
    {
        var inquiry = await inquiries.GetByIdAsync(request.InquiryId, cancellationToken);

        if (inquiry is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3402", "Hotel inquiry was not found."));
        }

        try
        {
            inquiry.Respond(request.ResponseNote, request.QuotedTotal, request.QuotedCurrency);
            await inquiries.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3404", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(Error.Validation("HANI-BOOKING-3405", exception.Message));
        }
    }
}

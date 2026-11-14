using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Identity;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Installments;
using Hani.Modules.Booking.Domain.Leads;
using Hani.Modules.Booking.Domain.PriceDiscrepancies;
using Hani.Modules.Booking.Domain.ReservationRequests;

namespace Hani.Modules.Booking.Application.Commands.Requests;

internal sealed class CreateReservationRequestCommandHandler(
    IQuoteRepository quotes,
    IReservationRequestRepository requests,
    IIdGenerator ids)
    : ICommandHandler<CreateReservationRequestCommand, ReservationRequestDto>
{
    public async Task<Result<ReservationRequestDto>> Handle(
        CreateReservationRequestCommand request,
        CancellationToken cancellationToken)
    {
        var quote = await quotes.GetByIdAsync(request.QuoteId, cancellationToken);

        if (quote is null)
        {
            return Result<ReservationRequestDto>.Failure(
                Error.NotFound("HANI-BOOKING-3001", "Quote was not found."));
        }

        if (quote.IsExpired(DateTimeOffset.UtcNow))
        {
            return Result<ReservationRequestDto>.Failure(
                Error.Conflict("HANI-BOOKING-3002", "Quote has expired."));
        }

        try
        {
            var now = DateTimeOffset.UtcNow;
            var entity = ReservationRequest.Create(
                ids,
                quote.Id,
                quote.AgencyOfferId,
                quote.AgencyId,
                quote.DepartureId,
                quote.RoomType,
                quote.Adults,
                quote.Children,
                quote.Infants,
                request.ContactEmail,
                request.ContactPhone,
                request.Notes,
                quote.EffectivePricing,
                now.AddHours(24),
                now);

            await requests.AddAsync(entity, cancellationToken);
            return Result<ReservationRequestDto>.Success(Map(entity));
        }
        catch (ArgumentException exception)
        {
            return Result<ReservationRequestDto>.Failure(
                Error.Validation("HANI-BOOKING-3003", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return Result<ReservationRequestDto>.Failure(
                Error.Conflict("HANI-BOOKING-3004", exception.Message));
        }
    }

    private static ReservationRequestDto Map(ReservationRequest request)
        => new(
            request.Id,
            request.RequestNumber,
            request.QuoteId,
            request.AgencyOfferId,
            request.AgencyId,
            request.DepartureId,
            request.RoomType,
            request.Adults,
            request.Children,
            request.Infants,
            request.Total,
            request.Currency,
            request.Status.ToString(),
            request.AgencyNote,
            request.RejectionReason,
            request.CreatedAt,
            request.ExpiresAt,
            request.DecidedAt,
            request.AcceptedAt);
}

internal sealed class GetReservationRequestQueryHandler(IReservationRequestRepository requests)
    : IQueryHandler<GetReservationRequestQuery, ReservationRequestDto>
{
    public async Task<Result<ReservationRequestDto>> Handle(
        GetReservationRequestQuery request,
        CancellationToken cancellationToken)
    {
        var entity = await requests.GetByIdAsync(request.RequestId, cancellationToken);

        return entity is null
            ? Result<ReservationRequestDto>.Failure(
                Error.NotFound("HANI-BOOKING-3001", "Reservation request was not found."))
            : Result<ReservationRequestDto>.Success(Map(entity));
    }

    private static ReservationRequestDto Map(ReservationRequest request)
        => new(
            request.Id,
            request.RequestNumber,
            request.QuoteId,
            request.AgencyOfferId,
            request.AgencyId,
            request.DepartureId,
            request.RoomType,
            request.Adults,
            request.Children,
            request.Infants,
            request.Total,
            request.Currency,
            request.Status.ToString(),
            request.AgencyNote,
            request.RejectionReason,
            request.CreatedAt,
            request.ExpiresAt,
            request.DecidedAt,
            request.AcceptedAt);
}

internal sealed class ListReservationRequestsQueryHandler(IReservationRequestRepository requests)
    : IQueryHandler<ListReservationRequestsQuery, IReadOnlyList<ReservationRequestDto>>
{
    public async Task<Result<IReadOnlyList<ReservationRequestDto>>> Handle(
        ListReservationRequestsQuery request,
        CancellationToken cancellationToken)
    {
        ReservationRequestStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<ReservationRequestStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<IReadOnlyList<ReservationRequestDto>>.Failure(
                    Error.Validation("HANI-BOOKING-3007", "Reservation request status is invalid."));
            }

            status = parsed;
        }

        var items = await requests.ListByAgencyAsync(request.AgencyId, cancellationToken);
        var filtered = status is null
            ? items
            : items.Where(item => item.Status == status).ToArray();

        return Result<IReadOnlyList<ReservationRequestDto>>.Success(
            filtered.Select(Map).ToArray());
    }

    private static ReservationRequestDto Map(ReservationRequest request)
        => new(
            request.Id,
            request.RequestNumber,
            request.QuoteId,
            request.AgencyOfferId,
            request.AgencyId,
            request.DepartureId,
            request.RoomType,
            request.Adults,
            request.Children,
            request.Infants,
            request.Total,
            request.Currency,
            request.Status.ToString(),
            request.AgencyNote,
            request.RejectionReason,
            request.CreatedAt,
            request.ExpiresAt,
            request.DecidedAt,
            request.AcceptedAt);
}

internal sealed class ConfirmReservationRequestCommandHandler(IReservationRequestRepository requests)
    : ICommandHandler<ConfirmReservationRequestCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ConfirmReservationRequestCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await requests.GetByIdAsync(request.RequestId, cancellationToken);

        if (entity is null || (request.AgencyId is { } agencyId && entity.AgencyId != agencyId))
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3001", "Reservation request was not found."));
        }

        try
        {
            entity.Confirm(request.AgencyNote);
            await requests.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3005", exception.Message));
        }
    }
}

internal sealed class RejectReservationRequestCommandHandler(IReservationRequestRepository requests)
    : ICommandHandler<RejectReservationRequestCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectReservationRequestCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await requests.GetByIdAsync(request.RequestId, cancellationToken);

        if (entity is null || (request.AgencyId is { } agencyId && entity.AgencyId != agencyId))
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3001", "Reservation request was not found."));
        }

        try
        {
            entity.Reject(request.Reason);
            await requests.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3005", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(Error.Validation("HANI-BOOKING-3006", exception.Message));
        }
    }
}

internal sealed class AcceptReservationRequestCommandHandler(IReservationRequestRepository requests)
    : ICommandHandler<AcceptReservationRequestCommand, bool>
{
    public async Task<Result<bool>> Handle(
        AcceptReservationRequestCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await requests.GetByIdAsync(request.RequestId, cancellationToken);

        if (entity is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3001", "Reservation request was not found."));
        }

        try
        {
            entity.Accept();
            await requests.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3005", exception.Message));
        }
    }
}

internal sealed class CreateLeadCommandHandler(ILeadRepository leads, IIdGenerator ids)
    : ICommandHandler<CreateLeadCommand, LeadDto>
{
    public async Task<Result<LeadDto>> Handle(
        CreateLeadCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var lead = LeadRequest.Create(
                ids,
                request.ServiceType,
                request.Destination,
                request.StartDate,
                request.EndDate,
                request.Adults,
                request.Children,
                request.Infants,
                request.BudgetAmount,
                request.Currency,
                request.ContactName,
                request.ContactEmail,
                request.ContactPhone,
                request.Notes);
            await leads.AddAsync(lead, cancellationToken);
            return Result<LeadDto>.Success(Map(lead));
        }
        catch (ArgumentException exception)
        {
            return Result<LeadDto>.Failure(
                Error.Validation("HANI-BOOKING-3101", exception.Message));
        }
    }

    private static LeadDto Map(LeadRequest lead)
        => new(
            lead.Id,
            lead.RequestNumber,
            lead.ServiceType.ToString(),
            lead.Destination,
            lead.StartDate,
            lead.EndDate,
            lead.Adults,
            lead.Children,
            lead.Infants,
            lead.BudgetAmount,
            lead.Currency,
            lead.ContactName,
            lead.ContactEmail,
            lead.ContactPhone,
            lead.Notes,
            lead.Status.ToString(),
            lead.MatchedAgencyId,
            lead.CreatedAt,
            lead.MatchedAt,
            lead.ClosedAt,
            lead.Invitations.Select(invitation => invitation.AgencyId).ToArray());
}

internal sealed class GetLeadQueryHandler(ILeadRepository leads)
    : IQueryHandler<GetLeadQuery, LeadDto>
{
    public async Task<Result<LeadDto>> Handle(
        GetLeadQuery request,
        CancellationToken cancellationToken)
    {
        var lead = await leads.GetByIdAsync(request.LeadId, cancellationToken);
        return lead is null
            ? Result<LeadDto>.Failure(Error.NotFound("HANI-BOOKING-3102", "Lead was not found."))
            : Result<LeadDto>.Success(Map(lead));
    }

    private static LeadDto Map(LeadRequest lead)
        => new(
            lead.Id,
            lead.RequestNumber,
            lead.ServiceType.ToString(),
            lead.Destination,
            lead.StartDate,
            lead.EndDate,
            lead.Adults,
            lead.Children,
            lead.Infants,
            lead.BudgetAmount,
            lead.Currency,
            lead.ContactName,
            lead.ContactEmail,
            lead.ContactPhone,
            lead.Notes,
            lead.Status.ToString(),
            lead.MatchedAgencyId,
            lead.CreatedAt,
            lead.MatchedAt,
            lead.ClosedAt,
            lead.Invitations.Select(invitation => invitation.AgencyId).ToArray());
}

internal sealed class ListLeadsQueryHandler(ILeadRepository leads)
    : IQueryHandler<ListLeadsQuery, PagedResult<LeadDto>>
{
    public async Task<Result<PagedResult<LeadDto>>> Handle(
        ListLeadsQuery request,
        CancellationToken cancellationToken)
    {
        LeadStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<LeadStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<PagedResult<LeadDto>>.Failure(
                    Error.Validation("HANI-BOOKING-3103", "Lead status is invalid."));
            }

            status = parsed;
        }

        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await leads.ListAsync(status, (page - 1) * pageSize, pageSize, cancellationToken);
        var total = await leads.CountAsync(status, cancellationToken);

        return Result<PagedResult<LeadDto>>.Success(new PagedResult<LeadDto>(
            items.Select(Map).ToArray(),
            page,
            pageSize,
            total));
    }

    private static LeadDto Map(LeadRequest lead)
        => new(
            lead.Id,
            lead.RequestNumber,
            lead.ServiceType.ToString(),
            lead.Destination,
            lead.StartDate,
            lead.EndDate,
            lead.Adults,
            lead.Children,
            lead.Infants,
            lead.BudgetAmount,
            lead.Currency,
            lead.ContactName,
            lead.ContactEmail,
            lead.ContactPhone,
            lead.Notes,
            lead.Status.ToString(),
            lead.MatchedAgencyId,
            lead.CreatedAt,
            lead.MatchedAt,
            lead.ClosedAt,
            lead.Invitations.Select(invitation => invitation.AgencyId).ToArray());
}

internal sealed class MatchLeadCommandHandler(ILeadRepository leads, IIdGenerator ids)
    : ICommandHandler<MatchLeadCommand, bool>
{
    public async Task<Result<bool>> Handle(
        MatchLeadCommand request,
        CancellationToken cancellationToken)
    {
        var lead = await leads.GetByIdAsync(request.LeadId, cancellationToken);

        if (lead is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-BOOKING-3102", "Lead was not found."));
        }

        try
        {
            lead.Match(request.AgencyId, ids);
            await leads.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3104", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(Error.Validation("HANI-BOOKING-3105", exception.Message));
        }
    }
}

internal sealed class DistributeLeadCommandHandler(
    ILeadRepository leads,
    IAgencyReadService agencies,
    IIdGenerator ids)
    : ICommandHandler<DistributeLeadCommand, int>
{
    public async Task<Result<int>> Handle(
        DistributeLeadCommand request,
        CancellationToken cancellationToken)
    {
        var lead = await leads.GetByIdAsync(request.LeadId, cancellationToken);

        if (lead is null)
        {
            return Result<int>.Failure(Error.NotFound("HANI-BOOKING-3102", "Lead was not found."));
        }

        var activeAgencyIds = await agencies.GetActiveAgencyIdsAsync(cancellationToken);

        if (activeAgencyIds.Count == 0)
        {
            return Result<int>.Failure(
                Error.Conflict("HANI-BOOKING-3106", "No active agency is available for distribution."));
        }

        try
        {
            var invited = lead.InviteAgencies(activeAgencyIds, ids);
            await leads.SaveChangesAsync(cancellationToken);
            return Result<int>.Success(invited);
        }
        catch (InvalidOperationException exception)
        {
            return Result<int>.Failure(Error.Conflict("HANI-BOOKING-3104", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<int>.Failure(Error.Validation("HANI-BOOKING-3105", exception.Message));
        }
    }
}

internal sealed class CloseLeadCommandHandler(ILeadRepository leads)
    : ICommandHandler<CloseLeadCommand, bool>
{
    public async Task<Result<bool>> Handle(
        CloseLeadCommand request,
        CancellationToken cancellationToken)
    {
        var lead = await leads.GetByIdAsync(request.LeadId, cancellationToken);

        if (lead is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-BOOKING-3102", "Lead was not found."));
        }

        lead.Close();
        await leads.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class CreatePriceDiscrepancyCommandHandler(
    IPriceDiscrepancyRepository reports,
    IIdGenerator ids)
    : ICommandHandler<CreatePriceDiscrepancyCommand, PriceDiscrepancyDto>
{
    public async Task<Result<PriceDiscrepancyDto>> Handle(
        CreatePriceDiscrepancyCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var report = PriceDiscrepancyReport.Create(
                ids,
                request.AgencyOfferId,
                request.DepartureId,
                request.ContactEmail,
                request.ReportedPrice,
                request.Currency,
                request.Note);
            await reports.AddAsync(report, cancellationToken);
            return Result<PriceDiscrepancyDto>.Success(Map(report));
        }
        catch (ArgumentException exception)
        {
            return Result<PriceDiscrepancyDto>.Failure(
                Error.Validation("HANI-BOOKING-3201", exception.Message));
        }
    }

    private static PriceDiscrepancyDto Map(PriceDiscrepancyReport report)
        => new(
            report.Id,
            report.AgencyOfferId,
            report.DepartureId,
            report.ContactEmail,
            report.ReportedPrice,
            report.Currency,
            report.Note,
            report.Status.ToString(),
            report.CreatedAt,
            report.ReviewedAt,
            report.Resolution);
}

internal sealed class ListPriceDiscrepanciesQueryHandler(IPriceDiscrepancyRepository reports)
    : IQueryHandler<ListPriceDiscrepanciesQuery, PagedResult<PriceDiscrepancyDto>>
{
    public async Task<Result<PagedResult<PriceDiscrepancyDto>>> Handle(
        ListPriceDiscrepanciesQuery request,
        CancellationToken cancellationToken)
    {
        PriceDiscrepancyStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<PriceDiscrepancyStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<PagedResult<PriceDiscrepancyDto>>.Failure(
                    Error.Validation("HANI-BOOKING-3202", "Discrepancy status is invalid."));
            }

            status = parsed;
        }

        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await reports.ListAsync(
            status,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await reports.CountAsync(status, cancellationToken);

        return Result<PagedResult<PriceDiscrepancyDto>>.Success(
            new PagedResult<PriceDiscrepancyDto>(
                items.Select(Map).ToArray(),
                page,
                pageSize,
                total));
    }

    private static PriceDiscrepancyDto Map(PriceDiscrepancyReport report)
        => new(
            report.Id,
            report.AgencyOfferId,
            report.DepartureId,
            report.ContactEmail,
            report.ReportedPrice,
            report.Currency,
            report.Note,
            report.Status.ToString(),
            report.CreatedAt,
            report.ReviewedAt,
            report.Resolution);
}

internal sealed class ResolvePriceDiscrepancyCommandHandler(IPriceDiscrepancyRepository reports)
    : ICommandHandler<ResolvePriceDiscrepancyCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ResolvePriceDiscrepancyCommand request,
        CancellationToken cancellationToken)
    {
        var report = await reports.GetByIdAsync(request.ReportId, cancellationToken);

        if (report is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3203", "Discrepancy report was not found."));
        }

        try
        {
            report.Resolve(request.Resolution);
            await reports.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-BOOKING-3204", exception.Message));
        }
    }
}

internal sealed class CreateInstallmentPlanCommandHandler(
    IOrderRepository orders,
    IInstallmentPlanRepository plans,
    IIdGenerator ids)
    : ICommandHandler<CreateInstallmentPlanCommand, InstallmentPlanDto>
{
    public async Task<Result<InstallmentPlanDto>> Handle(
        CreateInstallmentPlanCommand request,
        CancellationToken cancellationToken)
    {
        var order = await orders.GetByIdAsync(request.OrderId, cancellationToken);

        if (order is null)
        {
            return Result<InstallmentPlanDto>.Failure(
                Error.NotFound("HANI-BOOKING-3301", "Order was not found."));
        }

        if (order.Status is Hani.Modules.Booking.Domain.Orders.OrderStatus.Paid or
            Hani.Modules.Booking.Domain.Orders.OrderStatus.Cancelled)
        {
            return Result<InstallmentPlanDto>.Failure(
                Error.Conflict("HANI-BOOKING-3306", "Installments cannot be scheduled for this order status."));
        }

        var component = order.EffectivePricing.Components.FirstOrDefault(item =>
            string.Equals(item.Currency, request.Currency, StringComparison.OrdinalIgnoreCase));

        if (component is null)
        {
            return Result<InstallmentPlanDto>.Failure(
                Error.Validation("HANI-BOOKING-3302", "Currency is not payable for this order."));
        }

        var existing = await plans.GetByOrderIdAsync(
            request.OrderId,
            component.Currency,
            cancellationToken);

        if (existing is not null)
        {
            return Result<InstallmentPlanDto>.Success(Map(existing));
        }

        try
        {
            var plan = InstallmentPlan.Create(
                ids,
                request.OrderId,
                component.Currency,
                component.TotalAmount,
                request.InstallmentCount,
                request.IntervalDays);
            await plans.AddAsync(plan, cancellationToken);
            return Result<InstallmentPlanDto>.Success(Map(plan));
        }
        catch (ArgumentException exception)
        {
            return Result<InstallmentPlanDto>.Failure(
                Error.Validation("HANI-BOOKING-3303", exception.Message));
        }
    }

    private static InstallmentPlanDto Map(InstallmentPlan plan)
        => new(
            plan.Id,
            plan.OrderId,
            plan.Currency,
            plan.TotalAmount,
            plan.InstallmentCount,
            plan.IntervalDays,
            plan.Status.ToString(),
            plan.CreatedAt,
            plan.Installments
                .OrderBy(item => item.Sequence)
                .Select(item => new InstallmentDto(
                    item.Id,
                    item.Sequence,
                    item.DueDate,
                    item.Amount,
                    item.Status.ToString(),
                    item.PaidAt))
                .ToArray());
}

internal sealed class GetInstallmentPlanQueryHandler(IInstallmentPlanRepository plans)
    : IQueryHandler<GetInstallmentPlanQuery, InstallmentPlanDto>
{
    public async Task<Result<InstallmentPlanDto>> Handle(
        GetInstallmentPlanQuery request,
        CancellationToken cancellationToken)
    {
        var plan = await plans.GetByOrderIdAsync(
            request.OrderId,
            request.Currency,
            cancellationToken);

        return plan is null
            ? Result<InstallmentPlanDto>.Failure(
                Error.NotFound("HANI-BOOKING-3304", "Installment plan was not found."))
            : Result<InstallmentPlanDto>.Success(Map(plan));
    }

    private static InstallmentPlanDto Map(InstallmentPlan plan)
        => new(
            plan.Id,
            plan.OrderId,
            plan.Currency,
            plan.TotalAmount,
            plan.InstallmentCount,
            plan.IntervalDays,
            plan.Status.ToString(),
            plan.CreatedAt,
            plan.Installments
                .OrderBy(item => item.Sequence)
                .Select(item => new InstallmentDto(
                    item.Id,
                    item.Sequence,
                    item.DueDate,
                    item.Amount,
                    item.Status.ToString(),
                    item.PaidAt))
                .ToArray());
}

internal sealed class PayInstallmentCommandHandler(IInstallmentPlanRepository plans)
    : ICommandHandler<PayInstallmentCommand, bool>
{
    public async Task<Result<bool>> Handle(
        PayInstallmentCommand request,
        CancellationToken cancellationToken)
    {
        var plan = await plans.GetByOrderIdAsync(
            request.OrderId,
            request.Currency,
            cancellationToken);

        if (plan is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3304", "Installment plan was not found."));
        }

        try
        {
            plan.Pay(request.Sequence);
            await plans.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3305", exception.Message));
        }
    }
}

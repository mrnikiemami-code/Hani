using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Booking.Application.Commands.Requests;
using Hani.Modules.Booking.Application.Commands.UpdateOrderContact;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminBookingService
{
    public async Task<AdminBookingsResponse> ListAsync(
        int page,
        int pageSize,
        string? q,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var term = q?.Trim();

        var ordersQuery = booking.Orders.AsNoTracking();
        var requestsQuery = booking.ReservationRequests.AsNoTracking();
        var inquiriesQuery = booking.HotelInquiries.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(term))
        {
            ordersQuery = ordersQuery.Where(item =>
                item.OrderNumber.Contains(term) || item.ContactEmail.Contains(term));
            requestsQuery = requestsQuery.Where(item =>
                item.RequestNumber.Contains(term) || item.ContactEmail.Contains(term));
            inquiriesQuery = inquiriesQuery.Where(item =>
                item.InquiryNumber.Contains(term) || item.ContactEmail.Contains(term));
        }

        var orderCount = await ordersQuery.CountAsync(cancellationToken);
        var requestCount = await requestsQuery.CountAsync(cancellationToken);
        var inquiryCount = await inquiriesQuery.CountAsync(cancellationToken);
        var orderRows = await ordersQuery
            .Include(item => item.PaymentObligations)
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var orders = orderRows.Select(item => new AdminOrderDto(
            item.Id,
            item.OrderNumber,
            item.AgencyId,
            item.Status.ToString(),
            item.PaymentStatus.ToString(),
            item.Total,
            item.Currency,
            item.ContactEmail,
            item.CreatedAt,
            item.PaymentDueAt)).ToArray();
        var requests = await requestsQuery
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminReservationDto(
                item.Id,
                item.RequestNumber,
                item.AgencyId,
                item.Status.ToString(),
                item.Total,
                item.Currency,
                item.ContactEmail,
                item.CreatedAt,
                item.ExpiresAt))
            .ToArrayAsync(cancellationToken);
        var inquiries = await inquiriesQuery
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminHotelInquiryDto(
                item.Id,
                item.InquiryNumber,
                item.HotelId,
                item.CheckIn,
                item.CheckOut,
                item.Rooms,
                item.Adults,
                item.Children,
                item.Status.ToString(),
                item.ContactEmail,
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

        return new AdminBookingsResponse(
            orderCount,
            requestCount,
            inquiryCount,
            orders,
            requests,
            inquiries);
    }

    public async Task<IReadOnlyList<AdminOrderPaymentDto>> ListPaymentsAsync(
        Guid orderId,
        CancellationToken cancellationToken)
        => await payments.PaymentIntents
            .AsNoTracking()
            .Where(item => item.OrderId == orderId)
            .OrderByDescending(item => item.CreatedAt)
            .Select(item => new AdminOrderPaymentDto(
                item.Id,
                item.Amount,
                item.Currency,
                item.Status.ToString(),
                item.Provider,
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

    public async Task<AdminContractDto?> GetContractAsync(
        Guid orderId,
        CancellationToken cancellationToken)
    {
        var order = await LoadOrderContractAsync(orderId, cancellationToken);
        if (order is null)
        {
            return null;
        }

        var contract = order.Contract;
        return new AdminContractDto(
            contract.Id,
            contract.ContractNumber,
            order.Id,
            order.OrderNumber,
            order.Status.ToString(),
            contract.IssuedAt,
            contract.QuoteId,
            contract.HoldId,
            contract.AgencyId,
            contract.AgencyOfferId,
            contract.DepartureId,
            contract.RoomType,
            contract.Adults,
            contract.Children,
            contract.Infants,
            contract.Seats,
            contract.UnitPrice,
            contract.Total,
            contract.Currency,
            contract.ContactEmail,
            contract.ContactPhone,
            contract.Travelers
                .OrderBy(item => item.FullName)
                .Select(item => new AdminContractTravelerDto(
                    item.Id,
                    item.FullName,
                    item.Type.ToString(),
                    item.DateOfBirth))
                .ToArray(),
            contract.Lines
                .Select(item => new AdminContractLineDto(
                    item.Id,
                    item.Description,
                    item.Quantity,
                    item.UnitPrice,
                    item.Total,
                    item.Currency))
                .ToArray(),
            order.CancelledAt,
            order.CancellationReason);
    }

    public async Task<AdminVoucherDto?> GetVoucherAsync(
        Guid orderId,
        CancellationToken cancellationToken)
    {
        var order = await LoadOrderContractAsync(orderId, cancellationToken);
        if (order is null)
        {
            return null;
        }

        var contract = order.Contract;
        return new AdminVoucherDto(
            $"VCH-{order.OrderNumber}",
            order.Id,
            order.OrderNumber,
            contract.ContractNumber,
            order.Status.ToString(),
            order.PaymentStatus.ToString(),
            contract.IssuedAt,
            order.PaymentDueAt,
            order.AgencyId,
            order.DepartureId,
            order.RoomType,
            order.Adults,
            order.Children,
            order.Infants,
            order.Total,
            order.Currency,
            order.ContactEmail,
            order.ContactPhone,
            contract.Travelers
                .OrderBy(item => item.FullName)
                .Select(item => new AdminContractTravelerDto(
                    item.Id,
                    item.FullName,
                    item.Type.ToString(),
                    item.DateOfBirth))
                .ToArray(),
            contract.Lines
                .Select(item => new AdminContractLineDto(
                    item.Id,
                    item.Description,
                    item.Quantity,
                    item.UnitPrice,
                    item.Total,
                    item.Currency))
                .ToArray(),
            order.CancelledAt,
            order.CancellationReason);
    }

    public async Task<AdminOrderHistoryDto> ListHistoryAsync(
        Guid orderId,
        int page,
        int pageSize,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 25 : pageSize;
        var entityId = orderId.ToString();
        var query = identity.AdminAuditEvents
            .AsNoTracking()
            .Where(item =>
                item.EntityType == "Order" &&
                item.EntityId == entityId);

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.OccurredAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminOrderHistoryEntryDto(
                item.Id,
                item.OccurredAt,
                item.Action,
                item.Reason,
                item.ActorRole,
                item.ActorUserId == null
                    ? null
                    : identity.Users
                        .Where(user => user.Id == item.ActorUserId)
                        .Select(user => user.Mobile)
                        .FirstOrDefault(),
                item.BeforeJson,
                item.AfterJson))
            .ToArrayAsync(cancellationToken);

        return new AdminOrderHistoryDto(items, total, normalizedPage, normalizedPageSize);
    }

    public async Task<IReadOnlyList<AdminRefundDto>> ListRefundsAsync(
        Guid orderId,
        CancellationToken cancellationToken)
        => await payments.Refunds
            .AsNoTracking()
            .Where(item => item.OrderId == orderId)
            .OrderByDescending(item => item.RequestedAt)
            .Select(item => new AdminRefundDto(
                item.Id,
                item.OrderId,
                item.PaymentIntentId,
                item.Amount,
                item.Currency,
                item.Status.ToString(),
                item.Reason,
                item.RequestedAt,
                item.ProcessedAt))
            .ToArrayAsync(cancellationToken);

    public Task<Result<bool>> ConfirmRequestAsync(
        Guid requestId,
        string? note,
        CancellationToken cancellationToken)
        => sender.Send(
            new ConfirmReservationRequestCommand(requestId, note),
            cancellationToken);

    public Task<Result<bool>> RejectRequestAsync(
        Guid requestId,
        string reason,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(reason))
        {
            return Task.FromResult(Result<bool>.Failure(
                Error.Validation(
                    "HANI-ADMIN-BOOKING-4001",
                    "A rejection reason is required.")));
        }

        return sender.Send(
            new RejectReservationRequestCommand(requestId, reason.Trim()),
            cancellationToken);
    }

    public Task<Result<bool>> UpdateContactAsync(
        Guid orderId,
        string contactEmail,
        string? contactPhone,
        CancellationToken cancellationToken)
        => sender.Send(
            new UpdateOrderContactCommand(orderId, contactEmail, contactPhone),
            cancellationToken);

    private Task<Hani.Modules.Booking.Domain.Orders.Order?> LoadOrderContractAsync(
        Guid orderId,
        CancellationToken cancellationToken)
        => booking.Orders
            .AsNoTracking()
            .Include(item => item.Contract)
                .ThenInclude(contract => contract.Travelers)
            .Include(item => item.Contract)
                .ThenInclude(contract => contract.Lines)
            .FirstOrDefaultAsync(item => item.Id == orderId, cancellationToken);
}

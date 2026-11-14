namespace Hani.Contracts.Booking;

/// <summary>
/// Channel-facing order summary.
/// </summary>
public sealed record ChannelOrderSummary(
    Guid OrderId,
    string OrderNumber,
    Guid AgencyId,
    string Status,
    string PaymentStatus,
    decimal Total,
    string Currency,
    string ContactEmail,
    DateTimeOffset CreatedAt);

/// <summary>
/// Read-side contract for channel booking lists.
/// </summary>
public interface IChannelOrderReadService
{
    /// <summary>
    /// Lists orders for one agency with optional status/date filters.
    /// </summary>
    Task<IReadOnlyList<ChannelOrderSummary>> ListByAgencyAsync(
        Guid agencyId,
        string? status,
        DateOnly? from,
        int skip,
        int take,
        CancellationToken cancellationToken);
}

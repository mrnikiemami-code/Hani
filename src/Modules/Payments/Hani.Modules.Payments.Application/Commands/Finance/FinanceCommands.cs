using Hani.BuildingBlocks.Application;
using Hani.Modules.Payments.Domain.Invoices;
using Hani.Modules.Payments.Domain.Refunds;

namespace Hani.Modules.Payments.Application.Commands.Finance;

/// <summary>Request a refund for a paid order.</summary>
public sealed record RequestRefundCommand(
    Guid OrderId,
    Guid? PaymentIntentId,
    decimal Amount,
    string Currency,
    string Reason) : ICommand<RefundDto>;

/// <summary>Process a requested refund.</summary>
public sealed record ProcessRefundCommand(Guid RefundId) : ICommand<RefundDto>;

/// <summary>Create an invoice for an order.</summary>
public sealed record CreateInvoiceCommand(
    Guid OrderId,
    string Issuer,
    string SellerOfRecord,
    string BuyerEmail,
    decimal Subtotal,
    decimal Tax,
    decimal Total,
    string Currency) : ICommand<InvoiceDto>;

/// <summary>Read a refund.</summary>
public sealed record GetRefundQuery(Guid RefundId) : IQuery<RefundDto>;

/// <summary>Read an invoice.</summary>
public sealed record GetInvoiceQuery(Guid InvoiceId) : IQuery<InvoiceDto>;

/// <summary>List refunds for an order.</summary>
public sealed record ListRefundsQuery(Guid OrderId) : IQuery<IReadOnlyList<RefundDto>>;

/// <summary>Refund read model.</summary>
public sealed record RefundDto(
    Guid RefundId,
    Guid OrderId,
    Guid? PaymentIntentId,
    decimal Amount,
    string Currency,
    string Reason,
    string Status,
    DateTimeOffset RequestedAt,
    DateTimeOffset? ProcessedAt,
    string? ProviderRef,
    string? FailureReason);

/// <summary>Invoice read model.</summary>
public sealed record InvoiceDto(
    Guid InvoiceId,
    string InvoiceNumber,
    Guid OrderId,
    string Issuer,
    string SellerOfRecord,
    string BuyerEmail,
    decimal Subtotal,
    decimal Tax,
    decimal Total,
    string Currency,
    string Status,
    DateTimeOffset IssuedAt);

/// <summary>Persistence abstraction for refunds and invoices.</summary>
public interface IFinanceRepository
{
    /// <summary>Adds a refund.</summary>
    Task AddRefundAsync(Refund refund, CancellationToken cancellationToken);
    /// <summary>Returns a refund by id.</summary>
    Task<Refund?> GetRefundAsync(Guid id, CancellationToken cancellationToken);
    /// <summary>Lists refunds for an order.</summary>
    Task<IReadOnlyList<Refund>> ListRefundsAsync(Guid orderId, CancellationToken cancellationToken);
    /// <summary>Adds an invoice.</summary>
    Task AddInvoiceAsync(Invoice invoice, CancellationToken cancellationToken);
    /// <summary>Returns an invoice by id.</summary>
    Task<Invoice?> GetInvoiceAsync(Guid id, CancellationToken cancellationToken);
    /// <summary>Persists pending changes.</summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

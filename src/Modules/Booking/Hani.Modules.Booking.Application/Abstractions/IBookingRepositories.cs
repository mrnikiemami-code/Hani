using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.Quotes;

namespace Hani.Modules.Booking.Application.Abstractions;

/// <summary>
/// Persistence abstraction for quotes.
/// </summary>
public interface IQuoteRepository
{
    /// <summary>
    /// Adds a quote and saves changes.
    /// </summary>
    Task AddAsync(Quote quote, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a quote by id, or <c>null</c>.
    /// </summary>
    Task<Quote?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for holds.
/// </summary>
public interface IHoldRepository
{
    /// <summary>
    /// Adds a hold and saves changes.
    /// </summary>
    Task AddAsync(Hold hold, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a hold by id, or <c>null</c>.
    /// </summary>
    Task<Hold?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns the active hold for a quote, if any.
    /// </summary>
    Task<Hold?> GetActiveByQuoteIdAsync(Guid quoteId, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for orders and their immutable contracts.
/// </summary>
public interface IOrderRepository
{
    /// <summary>
    /// Adds an order and saves all pending booking changes atomically.
    /// </summary>
    Task AddAsync(Order order, CancellationToken cancellationToken);

    /// <summary>
    /// Returns an order with contract, travelers, and lines, or <c>null</c>.
    /// </summary>
    Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns the order created from a hold, or <c>null</c>.
    /// </summary>
    Task<Order?> GetByHoldIdAsync(Guid holdId, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

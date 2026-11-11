using Hani.Modules.Booking.Domain.Holds;
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

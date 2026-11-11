using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Quotes;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.Repositories;

internal sealed class QuoteRepository(BookingDbContext dbContext) : IQuoteRepository
{
    public async Task AddAsync(Quote quote, CancellationToken cancellationToken)
    {
        await dbContext.Quotes.AddAsync(quote, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Quote?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Quotes.FirstOrDefaultAsync(quote => quote.Id == id, cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

internal sealed class HoldRepository(BookingDbContext dbContext) : IHoldRepository
{
    public async Task AddAsync(Hold hold, CancellationToken cancellationToken)
    {
        await dbContext.Holds.AddAsync(hold, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Hold?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Holds.FirstOrDefaultAsync(hold => hold.Id == id, cancellationToken);

    public Task<Hold?> GetActiveByQuoteIdAsync(Guid quoteId, CancellationToken cancellationToken)
        => dbContext.Holds.FirstOrDefaultAsync(
            hold => hold.QuoteId == quoteId && hold.Status == HoldStatus.Active,
            cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

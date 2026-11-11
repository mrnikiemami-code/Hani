using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Orders;
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

internal sealed class OrderRepository(BookingDbContext dbContext) : IOrderRepository
{
    public async Task AddAsync(Order order, CancellationToken cancellationToken)
    {
        await dbContext.Orders.AddAsync(order, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => Details().FirstOrDefaultAsync(order => order.Id == id, cancellationToken);

    public Task<Order?> GetByHoldIdAsync(Guid holdId, CancellationToken cancellationToken)
        => Details().FirstOrDefaultAsync(order => order.HoldId == holdId, cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);

    private IQueryable<Order> Details()
        => dbContext.Orders
            .Include(order => order.Travelers)
            .Include(order => order.Lines)
            .Include(order => order.Contract)
            .ThenInclude(contract => contract.Travelers)
            .Include(order => order.Contract)
            .ThenInclude(contract => contract.Lines)
            .AsSplitQuery();
}

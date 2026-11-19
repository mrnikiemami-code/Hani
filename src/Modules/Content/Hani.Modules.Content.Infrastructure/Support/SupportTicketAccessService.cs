using Hani.Modules.Content.Application.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.Support;

internal sealed class SupportTicketAccessService(ContentDbContext dbContext)
    : ISupportTicketAccessService
{
    public async Task<bool> CanAccessAsync(
        Guid ticketId,
        Guid userId,
        bool isSupportAgent,
        CancellationToken cancellationToken)
    {
        if (ticketId == Guid.Empty || userId == Guid.Empty)
        {
            return false;
        }

        if (isSupportAgent)
        {
            return await dbContext.SupportTickets
                .AsNoTracking()
                .AnyAsync(item => item.Id == ticketId, cancellationToken);
        }

        return await dbContext.SupportTickets
            .AsNoTracking()
            .AnyAsync(
                item => item.Id == ticketId && item.UserId == userId,
                cancellationToken);
    }
}

using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminUserService
{
    public async Task<PagedAdminUsersResponse> ListUsersAsync(
        int page,
        int pageSize,
        string? q,
        string? role,
        string? status,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = identity.Users.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(user =>
                user.Mobile.Contains(term) ||
                user.FirstName.Contains(term) ||
                user.LastName.Contains(term) ||
                user.Username.Contains(term) ||
                (user.Email != null && user.Email.Contains(term)));
        }

        if (Enum.TryParse<UserRole>(role, true, out var parsedRole))
        {
            query = query.Where(user => user.Role == parsedRole);
        }

        if (Enum.TryParse<UserStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(user => user.Status == parsedStatus);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(user => user.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(user => new AdminUserDto(
                user.Id,
                user.Mobile,
                user.Email,
                user.FirstName,
                user.LastName,
                user.Username,
                user.Role.ToString(),
                user.Status.ToString(),
                user.CreatedAt,
                user.LastLoginAt))
            .ToArrayAsync(cancellationToken);

        return new PagedAdminUsersResponse(items, normalizedPage, normalizedPageSize, total);
    }
}

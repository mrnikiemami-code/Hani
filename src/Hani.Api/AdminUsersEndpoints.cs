using Hani.Modules.Identity.Domain.Users;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Read-only admin user directory. Mutations (roles, suspension) arrive in the
/// next phase-1 slice with dedicated permissions and audit events.
/// </summary>
public static class AdminUsersEndpoints
{
    /// <summary>Maps admin user directory endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminUsersEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/users", ListAsync)
            .WithTags("Internal.Admin")
            .WithName("Internal.ListAdminUsers")
            .RequireAuthorization("Admin")
            .Produces<PagedAdminUsersResponse>();

        return app;
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? role,
        [FromQuery] string? status,
        IdentityDbContext db,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = db.Users.AsNoTracking().AsQueryable();

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

        return Results.Ok(new PagedAdminUsersResponse(
            items,
            normalizedPage,
            normalizedPageSize,
            total));
    }
}

/// <summary>Admin user directory row.</summary>
public sealed record AdminUserDto(
    Guid Id,
    string Mobile,
    string? Email,
    string FirstName,
    string LastName,
    string Username,
    string Role,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? LastLoginAt);

/// <summary>Paged admin user directory response.</summary>
public sealed record PagedAdminUsersResponse(
    IReadOnlyList<AdminUserDto> Items,
    int Page,
    int PageSize,
    int Total);

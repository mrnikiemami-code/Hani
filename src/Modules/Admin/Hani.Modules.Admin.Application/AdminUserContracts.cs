namespace Hani.Modules.Admin.Application;

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

/// <summary>Paged admin user directory.</summary>
public sealed record PagedAdminUsersResponse(
    IReadOnlyList<AdminUserDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Admin user directory service.</summary>
public interface IAdminUserService
{
    /// <summary>Lists users with optional search, role, and status filters.</summary>
    Task<PagedAdminUsersResponse> ListUsersAsync(
        int page,
        int pageSize,
        string? q,
        string? role,
        string? status,
        CancellationToken cancellationToken);
}

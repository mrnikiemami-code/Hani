using Hani.Modules.Identity.Domain.Users;

namespace Hani.Modules.Identity.Application.Commands.Auth;

internal static class UserMappings
{
    public static UserDto ToDto(User user)
        => new(
            user.Id,
            user.Mobile,
            user.Email,
            user.FirstName,
            user.LastName,
            user.Username,
            user.Bio,
            user.AvatarUrl,
            user.Role.ToString(),
            user.Status.ToString(),
            user.CreatedAt,
            user.LastLoginAt);

    public static AuthorDto ToAuthorDto(User user)
        => new(
            user.Id,
            user.Username,
            user.DisplayName,
            user.Bio,
            user.AvatarUrl,
            user.CreatedAt);
}

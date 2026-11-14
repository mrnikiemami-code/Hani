using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.Gamification;

/// <summary>Award points to a user.</summary>
public sealed record AwardPointsCommand(Guid UserId, int Points) : ICommand<UserGamificationDto>;

/// <summary>Set a user's travel style label key.</summary>
public sealed record SetTravelStyleCommand(Guid UserId, string? TravelStyle) : ICommand<UserGamificationDto>;

/// <summary>Create a badge definition.</summary>
public sealed record CreateBadgeDefinitionCommand(
    string Code,
    string Name,
    string Description,
    string Category,
    int Threshold) : ICommand<Guid>;

/// <summary>Award a badge to a user.</summary>
public sealed record AwardBadgeCommand(Guid UserId, string BadgeCode) : ICommand<Guid>;

/// <summary>Read a user's gamification profile.</summary>
public sealed record GetUserGamificationQuery(Guid UserId) : IQuery<UserGamificationDto>;

/// <summary>List badge definitions.</summary>
public sealed record ListBadgeDefinitionsQuery : IQuery<IReadOnlyList<BadgeDefinitionDto>>;

/// <summary>User gamification read model.</summary>
public sealed record UserGamificationDto(
    Guid UserId,
    int Points,
    int Level,
    string? TravelStyle,
    IReadOnlyList<string> Badges);

/// <summary>Badge definition read model.</summary>
public sealed record BadgeDefinitionDto(
    string Code,
    string Name,
    string Description,
    string Category,
    int Threshold);

using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Gamification;

namespace Hani.Modules.Identity.Application.Commands.Gamification;

internal sealed class AwardPointsCommandHandler(
    IGamificationRepository repository,
    IIdGenerator ids)
    : ICommandHandler<AwardPointsCommand, UserGamificationDto>
{
    public async Task<Result<UserGamificationDto>> Handle(
        AwardPointsCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var profile = await GetOrCreateAsync(repository, ids, request.UserId, cancellationToken);
            profile.AddPoints(request.Points);
            await repository.SaveChangesAsync(cancellationToken);
            return Result<UserGamificationDto>.Success(await MapAsync(repository, profile, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return Result<UserGamificationDto>.Failure(
                Error.Validation("HANI-IDENTITY-1701", exception.Message));
        }
    }

    internal static async Task<UserGamification> GetOrCreateAsync(
        IGamificationRepository repository,
        IIdGenerator ids,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var profile = await repository.GetUserAsync(userId, cancellationToken);

        if (profile is not null)
        {
            return profile;
        }

        profile = UserGamification.Create(ids, userId);
        await repository.AddUserAsync(profile, cancellationToken);
        return profile;
    }

    internal static async Task<UserGamificationDto> MapAsync(
        IGamificationRepository repository,
        UserGamification profile,
        CancellationToken cancellationToken)
    {
        var badges = await repository.ListUserBadgesAsync(profile.UserId, cancellationToken);
        return new UserGamificationDto(
            profile.UserId,
            profile.Points,
            profile.Level,
            profile.TravelStyle,
            badges.Select(item => item.BadgeCode).ToArray());
    }
}

internal sealed class SetTravelStyleCommandHandler(
    IGamificationRepository repository,
    IIdGenerator ids)
    : ICommandHandler<SetTravelStyleCommand, UserGamificationDto>
{
    public async Task<Result<UserGamificationDto>> Handle(
        SetTravelStyleCommand request,
        CancellationToken cancellationToken)
    {
        var profile = await AwardPointsCommandHandler.GetOrCreateAsync(
            repository,
            ids,
            request.UserId,
            cancellationToken);
        profile.SetTravelStyle(request.TravelStyle);
        await repository.SaveChangesAsync(cancellationToken);
        return Result<UserGamificationDto>.Success(
            await AwardPointsCommandHandler.MapAsync(repository, profile, cancellationToken));
    }
}

internal sealed class CreateBadgeDefinitionCommandHandler(
    IGamificationRepository repository,
    IIdGenerator ids)
    : ICommandHandler<CreateBadgeDefinitionCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateBadgeDefinitionCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var definition = BadgeDefinition.Create(
                ids,
                request.Code,
                request.Name,
                request.Description,
                request.Category,
                request.Threshold);
            await repository.AddBadgeDefinitionAsync(definition, cancellationToken);
            return Result<Guid>.Success(definition.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-IDENTITY-1702", exception.Message));
        }
    }
}

internal sealed class AwardBadgeCommandHandler(
    IGamificationRepository repository,
    IIdGenerator ids)
    : ICommandHandler<AwardBadgeCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        AwardBadgeCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var badge = UserBadge.Award(ids, request.UserId, request.BadgeCode);
            await repository.AddUserBadgeAsync(badge, cancellationToken);
            return Result<Guid>.Success(badge.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-IDENTITY-1703", exception.Message));
        }
    }
}

internal sealed class GetUserGamificationQueryHandler(IGamificationRepository repository)
    : IQueryHandler<GetUserGamificationQuery, UserGamificationDto>
{
    public async Task<Result<UserGamificationDto>> Handle(
        GetUserGamificationQuery request,
        CancellationToken cancellationToken)
    {
        var profile = await repository.GetUserAsync(request.UserId, cancellationToken);

        if (profile is null)
        {
            return Result<UserGamificationDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1704", "Gamification profile was not found."));
        }

        return Result<UserGamificationDto>.Success(
            await AwardPointsCommandHandler.MapAsync(repository, profile, cancellationToken));
    }
}

internal sealed class ListBadgeDefinitionsQueryHandler(IGamificationRepository repository)
    : IQueryHandler<ListBadgeDefinitionsQuery, IReadOnlyList<BadgeDefinitionDto>>
{
    public async Task<Result<IReadOnlyList<BadgeDefinitionDto>>> Handle(
        ListBadgeDefinitionsQuery request,
        CancellationToken cancellationToken)
    {
        var definitions = await repository.ListDefinitionsAsync(cancellationToken);
        return Result<IReadOnlyList<BadgeDefinitionDto>>.Success(
            definitions.Select(item => new BadgeDefinitionDto(
                item.Code,
                item.Name,
                item.Description,
                item.Category,
                item.Threshold)).ToArray());
    }
}

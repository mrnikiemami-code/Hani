using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.Gamification;

/// <summary>Validation rules for awarding points.</summary>
public sealed class AwardPointsCommandValidator : AbstractValidator<AwardPointsCommand>
{
    /// <summary>Creates validation rules.</summary>
    public AwardPointsCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1711");
        RuleFor(command => command.Points).GreaterThanOrEqualTo(0).WithErrorCode("HANI-IDENTITY-1712");
    }
}

/// <summary>Validation rules for travel style.</summary>
public sealed class SetTravelStyleCommandValidator : AbstractValidator<SetTravelStyleCommand>
{
    /// <summary>Creates validation rules.</summary>
    public SetTravelStyleCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1711");
    }
}

/// <summary>Validation rules for badge definitions.</summary>
public sealed class CreateBadgeDefinitionCommandValidator : AbstractValidator<CreateBadgeDefinitionCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateBadgeDefinitionCommandValidator()
    {
        RuleFor(command => command.Code).NotEmpty().MaximumLength(80).WithErrorCode("HANI-IDENTITY-1713");
        RuleFor(command => command.Threshold).GreaterThan(0).WithErrorCode("HANI-IDENTITY-1714");
    }
}

/// <summary>Validation rules for badge awards.</summary>
public sealed class AwardBadgeCommandValidator : AbstractValidator<AwardBadgeCommand>
{
    /// <summary>Creates validation rules.</summary>
    public AwardBadgeCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1711");
        RuleFor(command => command.BadgeCode).NotEmpty().WithErrorCode("HANI-IDENTITY-1715");
    }
}

/// <summary>Validation rules for gamification reads.</summary>
public sealed class GetUserGamificationQueryValidator : AbstractValidator<GetUserGamificationQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetUserGamificationQueryValidator()
    {
        RuleFor(query => query.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1711");
    }
}

/// <summary>Validation rules for badge definition lists.</summary>
public sealed class ListBadgeDefinitionsQueryValidator : AbstractValidator<ListBadgeDefinitionsQuery>
{
    /// <summary>The query has no user input.</summary>
    public ListBadgeDefinitionsQueryValidator()
    {
    }
}

using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.AgencyOnboarding;

/// <summary>
/// Validation rules for agency onboarding.
/// </summary>
public sealed class CreateAgencyOnboardingCommandValidator
    : AbstractValidator<CreateAgencyOnboardingCommand>
{
    /// <summary>
    /// Creates validation rules for onboarding fields.
    /// </summary>
    public CreateAgencyOnboardingCommandValidator()
    {
        RuleFor(command => command.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1410");

        RuleFor(command => command.Slug)
            .NotEmpty()
            .MaximumLength(80)
            .WithErrorCode("HANI-IDENTITY-1411");

        RuleFor(command => command.Name)
            .NotEmpty()
            .MaximumLength(200)
            .WithErrorCode("HANI-IDENTITY-1412");

        RuleFor(command => command.LicenseNo)
            .NotEmpty()
            .MaximumLength(50)
            .WithErrorCode("HANI-IDENTITY-1413");

        RuleFor(command => command.City)
            .NotEmpty()
            .MaximumLength(80)
            .WithErrorCode("HANI-IDENTITY-1414");

        RuleFor(command => command.Documents)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1415");
    }
}

/// <summary>
/// Validation rules for the current-user agency query.
/// </summary>
public sealed class GetMyAgencyQueryValidator : AbstractValidator<GetMyAgencyQuery>
{
    /// <summary>
    /// Creates validation rules for the user id.
    /// </summary>
    public GetMyAgencyQueryValidator()
    {
        RuleFor(query => query.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1410");
    }
}

/// <summary>
/// Validation rules for public agency queries.
/// </summary>
public sealed class GetPublicAgencyQueryValidator : AbstractValidator<GetPublicAgencyQuery>
{
    /// <summary>
    /// Creates validation rules for the agency slug.
    /// </summary>
    public GetPublicAgencyQueryValidator()
    {
        RuleFor(query => query.Slug)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1411");
    }
}

/// <summary>
/// Validation rules for the internal agency list query.
/// </summary>
public sealed class ListAgenciesQueryValidator : AbstractValidator<ListAgenciesQuery>
{
    /// <summary>
    /// The list query has no required input.
    /// </summary>
    public ListAgenciesQueryValidator()
    {
    }
}

/// <summary>
/// Validation rules for approving an agency.
/// </summary>
public sealed class ApproveAgencyCommandValidator : AbstractValidator<ApproveAgencyCommand>
{
    /// <summary>
    /// Creates validation rules for the agency id.
    /// </summary>
    public ApproveAgencyCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1416");
    }
}

/// <summary>
/// Validation rules for rejecting an agency.
/// </summary>
public sealed class RejectAgencyCommandValidator : AbstractValidator<RejectAgencyCommand>
{
    /// <summary>
    /// Creates validation rules for rejection.
    /// </summary>
    public RejectAgencyCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1416");

        RuleFor(command => command.Reason)
            .NotEmpty()
            .MaximumLength(1000)
            .WithErrorCode("HANI-IDENTITY-1417");
    }
}

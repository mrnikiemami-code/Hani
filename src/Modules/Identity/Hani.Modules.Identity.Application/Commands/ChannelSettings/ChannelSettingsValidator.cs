using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.ChannelSettings;

/// <summary>Validation rules for channel settings.</summary>
public sealed class ConfigureChannelSettingsCommandValidator
    : AbstractValidator<ConfigureChannelSettingsCommand>
{
    /// <summary>Creates validation rules.</summary>
    public ConfigureChannelSettingsCommandValidator()
    {
        RuleFor(command => command.AgencyId).NotEmpty().WithErrorCode("HANI-IDENTITY-1811");
        RuleFor(command => command.CanonicalMode).NotEmpty().WithErrorCode("HANI-IDENTITY-1812");
    }
}

/// <summary>Validation rules for channel webhooks.</summary>
public sealed class ConfigureChannelWebhookCommandValidator
    : AbstractValidator<ConfigureChannelWebhookCommand>
{
    /// <summary>Creates validation rules.</summary>
    public ConfigureChannelWebhookCommandValidator()
    {
        RuleFor(command => command.AgencyId).NotEmpty().WithErrorCode("HANI-IDENTITY-1811");
    }
}

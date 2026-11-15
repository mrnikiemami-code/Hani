using Hani.BuildingBlocks.Application;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Users;

namespace Hani.Modules.Identity.Application.Commands.Preferences;

internal sealed class GetUserPreferencesQueryHandler(
    IUserPreferencesRepository preferences,
    ILanguageCatalog languages)
    : IQueryHandler<GetUserPreferencesQuery, UserPreferencesDto>
{
    public async Task<Result<UserPreferencesDto>> Handle(
        GetUserPreferencesQuery request,
        CancellationToken cancellationToken)
    {
        var stored = await preferences.GetByUserIdAsync(request.UserId, cancellationToken);
        return Result<UserPreferencesDto>.Success(Map(request.UserId, stored, languages));
    }

    internal static UserPreferencesDto Map(
        Guid userId,
        UserPreferences? stored,
        ILanguageCatalog languages)
        => new(
            userId,
            stored?.HomeExperienceId ?? HomeExperienceCatalog.DefaultId,
            stored?.Locale ?? languages.DefaultLanguage,
            stored?.Currency ?? HomeExperienceCatalog.DefaultCurrency,
            stored?.Theme ?? "system",
            stored?.ReducedMotion ?? false,
            stored?.UpdatedAt);
}

internal sealed class UpdateUserPreferencesCommandHandler(
    IUserPreferencesRepository preferences,
    ILanguageCatalog languages)
    : ICommandHandler<UpdateUserPreferencesCommand, UserPreferencesDto>
{
    public async Task<Result<UserPreferencesDto>> Handle(
        UpdateUserPreferencesCommand request,
        CancellationToken cancellationToken)
    {
        var stored = await preferences.GetByUserIdAsync(request.UserId, cancellationToken);
        var now = DateTimeOffset.UtcNow;

        if (stored is null)
        {
            stored = UserPreferences.Create(request.UserId, now);
        }

        stored.Update(
            HomeExperienceCatalog.Normalize(request.HomeExperienceId),
            NormalizeLocale(request.Locale, languages),
            NormalizeCurrency(request.Currency),
            NormalizeTheme(request.Theme),
            request.ReducedMotion,
            now);

        await preferences.SaveAsync(stored, cancellationToken);

        return Result<UserPreferencesDto>.Success(
            GetUserPreferencesQueryHandler.Map(request.UserId, stored, languages));
    }

    private static string? NormalizeLocale(string? locale, ILanguageCatalog languages)
        => string.IsNullOrWhiteSpace(locale) || !languages.IsSupported(locale)
            ? null
            : languages.Normalize(locale);

    private static string? NormalizeCurrency(string? currency)
    {
        if (string.IsNullOrWhiteSpace(currency))
        {
            return null;
        }

        var normalized = currency.Trim().ToUpperInvariant();
        return normalized.Length == 3 && normalized.All(char.IsLetter)
            ? normalized
            : null;
    }

    private static string? NormalizeTheme(string? theme)
    {
        if (string.IsNullOrWhiteSpace(theme))
        {
            return null;
        }

        var normalized = theme.Trim().ToLowerInvariant();
        return normalized is "light" or "dark" or "system" ? normalized : null;
    }
}

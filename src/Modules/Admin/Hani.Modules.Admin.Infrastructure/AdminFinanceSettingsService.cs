using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminFinanceSettingsService
{
    private const string FinanceSettingsKey = "finance";
    private static readonly JsonSerializerOptions FinanceJson = new(JsonSerializerDefaults.Web);

    public async Task<AdminFinanceSettingsDto> GetFinanceSettingsAsync(
        CancellationToken cancellationToken)
    {
        var entity = await identity.PlatformSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Key == FinanceSettingsKey,
                cancellationToken);
        if (entity is null)
        {
            return DefaultFinanceSettings();
        }

        var settings = JsonSerializer.Deserialize<AdminFinanceSettingsDto>(
            entity.Json,
            FinanceJson);
        return (settings ?? DefaultFinanceSettings()) with
        {
            UpdatedAt = entity.UpdatedAt
        };
    }

    public async Task<Result<AdminFinanceSettingsDto>> UpdateFinanceSettingsAsync(
        AdminFinanceSettingsInput input,
        Guid? updatedBy,
        CancellationToken cancellationToken)
    {
        var normalized = Normalize(input, out var error);
        if (normalized is null)
        {
            return Result<AdminFinanceSettingsDto>.Failure(
                Error.Validation("HANI-ADMIN-FINANCE-4001", error ?? "Invalid finance settings."));
        }

        var json = JsonSerializer.Serialize(normalized, FinanceJson);
        if (json.Length > 100_000)
        {
            return Result<AdminFinanceSettingsDto>.Failure(Error.Validation(
                "HANI-ADMIN-FINANCE-4002",
                "Finance settings must be at most 100 KB."));
        }

        var entity = await identity.PlatformSettings
            .FirstOrDefaultAsync(
                item => item.Key == FinanceSettingsKey,
                cancellationToken);
        if (entity is null)
        {
            entity = PlatformSettings.Create(
                ids,
                FinanceSettingsKey,
                json,
                updatedBy);
            await identity.PlatformSettings.AddAsync(entity, cancellationToken);
        }
        else
        {
            entity.Update(json, updatedBy);
        }

        await identity.SaveChangesAsync(cancellationToken);
        return Result<AdminFinanceSettingsDto>.Success(
            new AdminFinanceSettingsDto(
                normalized.BankAccounts,
                normalized.Currencies,
                normalized.TaxRules,
                normalized.Settlement,
                entity.UpdatedAt));
    }

    private static AdminFinanceSettingsInput? Normalize(
        AdminFinanceSettingsInput input,
        out string? error)
    {
        error = null;
        if (input.Settlement.PeriodDays <= 0 || input.Settlement.DueDays < 0)
        {
            error = "Settlement period must be positive and due days cannot be negative.";
            return null;
        }

        if (string.IsNullOrWhiteSpace(input.Settlement.Currency) ||
            input.Settlement.Currency.Trim().Length != 3)
        {
            error = "Settlement currency must be a three-letter ISO code.";
            return null;
        }

        var bankAccounts = input.BankAccounts
            .Select(item => item with
            {
                Code = item.Code.Trim().ToUpperInvariant(),
                Name = item.Name.Trim(),
                BankName = item.BankName.Trim(),
                Iban = item.Iban.Trim().ToUpperInvariant(),
                Currency = item.Currency.Trim().ToUpperInvariant(),
                Type = string.IsNullOrWhiteSpace(item.Type) ? "Acquiring" : item.Type.Trim()
            })
            .ToArray();
        if (bankAccounts.Any(item =>
                item.Code.Length == 0 ||
                item.Name.Length == 0 ||
                item.Currency.Length != 3))
        {
            error = "Every bank account needs a code, name, and three-letter currency.";
            return null;
        }

        if (bankAccounts.Select(item => item.Code).Distinct(StringComparer.OrdinalIgnoreCase).Count() !=
            bankAccounts.Length)
        {
            error = "Bank account codes must be unique.";
            return null;
        }

        var currencies = input.Currencies
            .Select(item => item with
            {
                Code = item.Code.Trim().ToUpperInvariant(),
                Name = item.Name.Trim(),
                Symbol = item.Symbol.Trim(),
                Rounding = string.IsNullOrWhiteSpace(item.Rounding)
                    ? "Nearest"
                    : item.Rounding.Trim(),
                FxSource = string.IsNullOrWhiteSpace(item.FxSource)
                    ? null
                    : item.FxSource.Trim()
            })
            .ToArray();
        if (currencies.Any(item =>
                item.Code.Length != 3 ||
                item.Name.Length == 0 ||
                item.Decimals is < 0 or > 6))
        {
            error = "Every currency needs a three-letter code, name, and 0-6 decimals.";
            return null;
        }

        if (currencies.Select(item => item.Code).Distinct(StringComparer.OrdinalIgnoreCase).Count() !=
            currencies.Length)
        {
            error = "Currency codes must be unique.";
            return null;
        }

        if (!currencies.Any(item => item.IsActive))
        {
            error = "At least one currency must be active.";
            return null;
        }

        var taxRules = input.TaxRules
            .Select(item => item with
            {
                Code = item.Code.Trim().ToUpperInvariant(),
                Name = item.Name.Trim(),
                Kind = string.IsNullOrWhiteSpace(item.Kind) ? "VAT" : item.Kind.Trim(),
                Inclusion = string.IsNullOrWhiteSpace(item.Inclusion)
                    ? "Excluded"
                    : item.Inclusion.Trim()
            })
            .ToArray();
        if (taxRules.Any(item =>
                item.Code.Length == 0 ||
                item.Name.Length == 0 ||
                item.RatePercent is < 0 or > 100 ||
                item.EffectiveTo is { } end && end < item.EffectiveFrom))
        {
            error = "Tax rules need a code, name, 0-100 rate, and a valid effective window.";
            return null;
        }

        if (taxRules.Select(item => item.Code).Distinct(StringComparer.OrdinalIgnoreCase).Count() !=
            taxRules.Length)
        {
            error = "Tax rule codes must be unique.";
            return null;
        }

        return new AdminFinanceSettingsInput(
            bankAccounts,
            currencies,
            taxRules,
            input.Settlement with
            {
                Currency = input.Settlement.Currency.Trim().ToUpperInvariant()
            });
    }

    private static AdminFinanceSettingsDto DefaultFinanceSettings()
        => new(
            [],
            [
                new AdminCurrencySettingDto(
                    "IRR",
                    "Iranian Rial",
                    "IRR",
                    0,
                    "Nearest",
                    true,
                    null,
                    null,
                    null),
                new AdminCurrencySettingDto(
                    "USD",
                    "US Dollar",
                    "USD",
                    2,
                    "Nearest",
                    true,
                    null,
                    null,
                    null)
            ],
            [
                new AdminTaxRuleDto(
                    "VAT",
                    "Value added tax",
                    "VAT",
                    9m,
                    "Excluded",
                    new DateOnly(2020, 1, 1),
                    null,
                    true)
            ],
            new AdminSettlementPolicyDto(30, 0m, "IRR", 7),
            null);
}

using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Admin.Application;

/// <summary>Acquiring or settlement bank account shown in finance settings.</summary>
public sealed record AdminBankAccountDto(
    string Code,
    string Name,
    string BankName,
    string Iban,
    string Currency,
    string Type,
    bool IsActive);

/// <summary>Active currency, precision, rounding, and FX configuration.</summary>
public sealed record AdminCurrencySettingDto(
    string Code,
    string Name,
    string Symbol,
    int Decimals,
    string Rounding,
    bool IsActive,
    decimal? FxRate,
    string? FxSource,
    DateOnly? FxEffectiveDate);

/// <summary>Tax or duty rule with inclusion state and effective dates.</summary>
public sealed record AdminTaxRuleDto(
    string Code,
    string Name,
    string Kind,
    decimal RatePercent,
    string Inclusion,
    DateOnly EffectiveFrom,
    DateOnly? EffectiveTo,
    bool IsActive);

/// <summary>Settlement policy defaults used by finance operations.</summary>
public sealed record AdminSettlementPolicyDto(
    int PeriodDays,
    decimal MinimumAmount,
    string Currency,
    int DueDays);

/// <summary>Finance settings payload persisted under the finance settings key.</summary>
public sealed record AdminFinanceSettingsDto(
    IReadOnlyList<AdminBankAccountDto> BankAccounts,
    IReadOnlyList<AdminCurrencySettingDto> Currencies,
    IReadOnlyList<AdminTaxRuleDto> TaxRules,
    AdminSettlementPolicyDto Settlement,
    DateTimeOffset? UpdatedAt);

/// <summary>Finance settings update input.</summary>
public sealed record AdminFinanceSettingsInput(
    IReadOnlyList<AdminBankAccountDto> BankAccounts,
    IReadOnlyList<AdminCurrencySettingDto> Currencies,
    IReadOnlyList<AdminTaxRuleDto> TaxRules,
    AdminSettlementPolicyDto Settlement);

/// <summary>Read and update finance configuration.</summary>
public interface IAdminFinanceSettingsService
{
    /// <summary>Returns persisted finance settings with defaults when none exist.</summary>
    Task<AdminFinanceSettingsDto> GetFinanceSettingsAsync(CancellationToken cancellationToken);

    /// <summary>Validates and persists finance settings.</summary>
    Task<Result<AdminFinanceSettingsDto>> UpdateFinanceSettingsAsync(
        AdminFinanceSettingsInput input,
        Guid? updatedBy,
        CancellationToken cancellationToken);
}

/// <summary>CSV export produced by the finance service.</summary>
public sealed record AdminExportFileDto(
    string FileName,
    string ContentType,
    string Content);

/// <summary>Supported finance export datasets.</summary>
public static class AdminFinanceExportDatasets
{
    /// <summary>Payment intent summary grouped by status and currency.</summary>
    public const string Payments = "payments";
    /// <summary>Refund requests.</summary>
    public const string Refunds = "refunds";
    /// <summary>Agency invoices.</summary>
    public const string Invoices = "invoices";
    /// <summary>Provider reconciliation records.</summary>
    public const string Reconciliations = "reconciliations";
    /// <summary>Commission entries.</summary>
    public const string Commissions = "commissions";
    /// <summary>Agency payouts.</summary>
    public const string Payouts = "payouts";
    /// <summary>Double-entry ledger lines.</summary>
    public const string Ledger = "ledger";
    /// <summary>Tax report derived from invoices.</summary>
    public const string Tax = "tax";

    /// <summary>All supported dataset names.</summary>
    public static readonly IReadOnlyList<string> All =
    [
        Payments,
        Refunds,
        Invoices,
        Reconciliations,
        Commissions,
        Payouts,
        Ledger,
        Tax
    ];
}

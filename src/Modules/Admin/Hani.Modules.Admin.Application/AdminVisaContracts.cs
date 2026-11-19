using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Admin.Application;

/// <summary>Admin visa country row.</summary>
public sealed record AdminVisaCountryDto(
    Guid Id,
    string Slug,
    string CountryCode,
    string Name,
    int TypeCount,
    decimal? MinimumPrice,
    string? Currency);

/// <summary>Paged visa countries.</summary>
public sealed record AdminVisaCountryPageDto(
    IReadOnlyList<AdminVisaCountryDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Visa country translation input.</summary>
public sealed record AdminVisaTranslationInput(
    string Locale,
    string Name,
    string? Description);

/// <summary>Visa type creation input.</summary>
public sealed record AdminVisaTypeInput(
    string Code,
    string EntryType,
    string IssuanceType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency);

/// <summary>Visa country creation input.</summary>
public sealed record AdminVisaCountryInput(
    string Slug,
    string CountryCode,
    string? CoverImageUrl,
    IReadOnlyList<AdminVisaTranslationInput> Translations,
    IReadOnlyList<AdminVisaTypeInput> Types);

/// <summary>Admin visa application row.</summary>
public sealed record AdminVisaApplicationDto(
    Guid Id,
    string ApplicationNumber,
    string ApplicantName,
    string PassportNo,
    string Nationality,
    string ContactEmail,
    string Status,
    DateOnly? TravelDate,
    DateTimeOffset CreatedAt);

/// <summary>Paged visa applications.</summary>
public sealed record AdminVisaApplicationPageDto(
    IReadOnlyList<AdminVisaApplicationDto> Items,
    int Page,
    int PageSize,
    int Total);


/// <summary>Admin visa country detail for editing.</summary>
public sealed record AdminVisaCountryDetailDto(
    Guid Id,
    string Slug,
    string CountryCode,
    string? CoverImageUrl,
    IReadOnlyList<AdminVisaTranslationInput> Translations,
    IReadOnlyList<AdminVisaTypeDto> Types);

/// <summary>Admin visa type detail.</summary>
public sealed record AdminVisaTypeDto(
    Guid Id,
    string Code,
    string EntryType,
    string IssuanceType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency);

/// <summary>Admin visa country edit input.</summary>
public sealed record AdminVisaCountryUpdateInput(
    string CountryCode,
    string? CoverImageUrl,
    IReadOnlyList<AdminVisaTranslationInput> Translations,
    IReadOnlyList<AdminVisaTypeUpdateInput> Types);

/// <summary>Admin visa type edit input.</summary>
public sealed record AdminVisaTypeUpdateInput(
    Guid? Id,
    string Code,
    string EntryType,
    string IssuanceType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency);

/// <summary>Admin visa service.</summary>
public interface IAdminVisaService
{
    Task<AdminVisaCountryPageDto> ListCountriesAsync(
        int page,
        int pageSize,
        string? q,
        CancellationToken cancellationToken);
    Task<Result<Guid>> CreateCountryAsync(
        AdminVisaCountryInput input,
        CancellationToken cancellationToken);
    Task<AdminVisaCountryDetailDto?> GetCountryAsync(Guid id, CancellationToken cancellationToken);
    Task<Result<bool>> UpdateCountryAsync(
        Guid id,
        AdminVisaCountryUpdateInput input,
        CancellationToken cancellationToken);
    Task<AdminVisaApplicationPageDto> ListApplicationsAsync(
        int page,
        int pageSize,
        string? status,
        CancellationToken cancellationToken);
    Task<Result<bool>> UpdateApplicationStatusAsync(
        Guid id,
        string status,
        string? rejectionReason,
        CancellationToken cancellationToken);
}

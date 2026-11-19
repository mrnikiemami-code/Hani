using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Booking.Application.Commands.Requests;
using Hani.Modules.Booking.Domain.VisaApplications;
using Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;
using Hani.Modules.Catalog.Domain.Visas;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminVisaService
{
    public async Task<AdminVisaCountryPageDto> ListCountriesAsync(
        int page,
        int pageSize,
        string? q,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = catalog.VisaCountries
            .AsNoTracking()
            .Include(item => item.Types)
            .AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.Slug.Contains(term) ||
                item.CountryCode.Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderBy(item => item.CountryCode)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var items = rows.Select(item =>
        {
            var cheapest = item.Types.OrderBy(type => type.PriceAdult).FirstOrDefault();
            return new AdminVisaCountryDto(
                item.Id,
                item.Slug,
                item.CountryCode,
                item.Translations.FirstOrDefault(translation =>
                    translation.Locale == languages.DefaultLanguage)?.Name
                    ?? item.Translations.FirstOrDefault()?.Name
                    ?? item.CountryCode,
                item.Types.Count,
                cheapest?.PriceAdult,
                cheapest?.Currency);
        }).ToArray();
        return new AdminVisaCountryPageDto(items, normalizedPage, normalizedPageSize, total);
    }

    public async Task<Result<Guid>> CreateCountryAsync(
        AdminVisaCountryInput input,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(input.Slug) ||
            string.IsNullOrWhiteSpace(input.CountryCode) ||
            input.Translations.Count == 0 ||
            input.Types.Count == 0)
        {
            return Result<Guid>.Failure(Error.Validation(
                "HANI-VISA-4001",
                "Slug, country code, translations, and at least one visa type are required."));
        }

        return await sender.Send(
            new CreateVisaCountryCommand(
                input.Slug,
                input.CountryCode,
                input.Translations.Select(item => new VisaCountryTranslationInput(
                    item.Locale,
                    item.Name,
                    item.Description)).ToArray(),
                input.Types.Select(item => new VisaTypeInput(
                    item.Code,
                    item.EntryType,
                    item.IssuanceType,
                    item.ProcessingDaysMin,
                    item.ProcessingDaysMax,
                    item.ValidityDays,
                    item.PriceAdult,
                    item.PriceChild,
                    item.Currency,
                    [],
                    [],
                    [])).ToArray(),
                input.CoverImageUrl),
            cancellationToken);
    }


    public async Task<AdminVisaCountryDetailDto?> GetCountryAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var item = await catalog.VisaCountries
            .AsNoTracking()
            .Include(country => country.Translations)
            .Include(country => country.Types)
            .FirstOrDefaultAsync(country => country.Id == id, cancellationToken);
        if (item is null)
        {
            return null;
        }

        return new AdminVisaCountryDetailDto(
            item.Id,
            item.Slug,
            item.CountryCode,
            item.CoverImageUrl,
            item.Translations
                .OrderBy(translation => translation.Locale)
                .Select(translation => new AdminVisaTranslationInput(
                    translation.Locale,
                    translation.Name,
                    translation.Description))
                .ToArray(),
            item.Types
                .OrderBy(type => type.Code)
                .Select(type => new AdminVisaTypeDto(
                    type.Id,
                    type.Code,
                    type.EntryType,
                    type.IssuanceType,
                    type.ProcessingDaysMin,
                    type.ProcessingDaysMax,
                    type.ValidityDays,
                    type.PriceAdult,
                    type.PriceChild,
                    type.Currency))
                .ToArray());
    }

    public async Task<Result<bool>> UpdateCountryAsync(
        Guid id,
        AdminVisaCountryUpdateInput input,
        CancellationToken cancellationToken)
    {
        if (input.Translations.Count == 0 || input.Types.Count == 0)
        {
            return Result<bool>.Failure(Error.Validation(
                "HANI-VISA-4003",
                "At least one translation and one visa type are required."));
        }

        var country = await catalog.VisaCountries
            .Include(item => item.Translations)
            .Include(item => item.Types)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (country is null)
        {
            return Result<bool>.Failure(Error.NotFound(
                "HANI-VISA-4040",
                "Visa country was not found."));
        }

        country.UpdateBasics(input.CountryCode, input.CoverImageUrl);
        foreach (var translation in input.Translations)
        {
            country.UpsertTranslation(
                ids,
                translation.Locale,
                translation.Name,
                translation.Description);
        }

        foreach (var type in input.Types)
        {
            var payload = new VisaTypeInput(
                type.Code,
                type.EntryType,
                type.IssuanceType,
                type.ProcessingDaysMin,
                type.ProcessingDaysMax,
                type.ValidityDays,
                type.PriceAdult,
                type.PriceChild,
                type.Currency,
                [],
                [],
                []);
            if (type.Id is { } typeId && country.Types.Any(item => item.Id == typeId))
            {
                country.UpdateType(typeId, payload);
            }
            else
            {
                country.AddType(ids, payload);
            }
        }

        await catalog.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }

    public async Task<AdminVisaApplicationPageDto> ListApplicationsAsync(
        int page,
        int pageSize,
        string? status,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = booking.VisaApplications.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<VisaApplicationStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminVisaApplicationDto(
                item.Id,
                item.ApplicationNumber,
                item.ApplicantName,
                item.PassportNo,
                item.Nationality,
                item.ContactEmail,
                item.Status.ToString(),
                item.TravelDate,
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);
        return new AdminVisaApplicationPageDto(items, normalizedPage, normalizedPageSize, total);
    }

    public async Task<Result<bool>> UpdateApplicationStatusAsync(
        Guid id,
        string status,
        string? rejectionReason,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<VisaApplicationStatus>(status, true, out var parsedStatus))
        {
            return Result<bool>.Failure(Error.Validation(
                "HANI-VISA-4002",
                "Invalid visa application status."));
        }

        return await sender.Send(
            new UpdateVisaApplicationStatusCommand(id, parsedStatus, rejectionReason),
            cancellationToken);
    }
}

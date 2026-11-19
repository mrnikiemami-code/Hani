using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Application.Commands.PublishTourProduct;
using Hani.Modules.Catalog.Domain.TourProducts;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminTourService
{
    public async Task<AdminTourPageDto> ListToursAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = catalog.TourProducts
            .AsNoTracking()
            .Include(item => item.Translations)
            .Include(item => item.Destinations)
            .AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.Slug.Contains(term) ||
                item.Translations.Any(translation => translation.Title.Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<TourProductStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var items = rows.Select(item => new AdminTourDto(
            item.Id,
            item.Slug,
            item.Translations
                .FirstOrDefault(translation => translation.Locale == languages.DefaultLanguage)
                ?.Title
                ?? item.Translations.FirstOrDefault()?.Title
                ?? item.Slug,
            item.DurationDays,
            item.TourType,
            item.Status.ToString(),
            item.Scope.ToString(),
            item.Category.ToString(),
            item.Destinations.Count,
            item.CreatedAt)).ToArray();
        return new AdminTourPageDto(items, normalizedPage, normalizedPageSize, total);
    }

    public async Task<Result<Guid>> CreateAsync(
        AdminTourCreateInput input,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(input.Slug) || input.Translations.Count == 0)
        {
            return Result<Guid>.Failure(Error.Validation(
                "HANI-TOUR-4001",
                "Slug and at least one translation are required."));
        }

        var scope = Enum.TryParse<TourScope>(input.Scope, true, out var parsedScope)
            ? parsedScope
            : TourScope.Foreign;
        var category = Enum.TryParse<TourCategory>(input.Category, true, out var parsedCategory)
            ? parsedCategory
            : TourCategory.Normal;
        var travelType = Enum.TryParse<TravelType>(input.TravelType, true, out var parsedTravel)
            ? parsedTravel
            : TravelType.Other;

        return await sender.Send(
            new CreateTourProductCommand(
                input.Slug,
                input.DurationDays,
                input.TourType,
                input.Translations.Select(item => new TourProductTranslationInput(
                    item.Locale,
                    item.Title,
                    item.Summary,
                    item.Description)).ToArray(),
                input.DestinationIds,
                Content: null,
                category,
                travelType,
                scope,
                input.CoverImageUrl),
            cancellationToken);
    }

    public Task<Result<bool>> PublishTourAsync(Guid id, CancellationToken cancellationToken)
        => sender.Send(new PublishTourProductCommand(id), cancellationToken);
}

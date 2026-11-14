using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Domain.Growth;

namespace Hani.Modules.Content.Application.Queries.Growth;

internal sealed class GetAdSlotQueryHandler(IContentRepository repository)
    : IQueryHandler<GetAdSlotQuery, AdSlotDto>
{
    public async Task<Result<AdSlotDto>> Handle(
        GetAdSlotQuery request,
        CancellationToken cancellationToken)
    {
        var slot = await repository.GetAdSlotAsync(request.Code, cancellationToken);

        if (slot is null || !slot.IsActive)
        {
            return Result<AdSlotDto>.Failure(Error.NotFound("HANI-GROWTH-2002", "Ad slot was not found."));
        }

        var now = DateTimeOffset.UtcNow;
        return Result<AdSlotDto>.Success(new AdSlotDto(
            slot.Code,
            slot.Name,
            slot.Creatives
                .Where(item => item.IsAvailableAt(now))
                .OrderByDescending(item => item.StartsAt)
                .Select(item => new AdCreativeDto(
                    item.Id,
                    item.Title,
                    item.ImageUrl,
                    item.TargetUrl,
                    item.StartsAt,
                    item.EndsAt))
                .ToArray()));
    }
}

internal sealed class ListCampaignsQueryHandler(IContentRepository repository, ILanguageCatalog languages)
    : IQueryHandler<ListCampaignsQuery, PagedResult<CampaignSummaryDto>>
{
    public async Task<Result<PagedResult<CampaignSummaryDto>>> Handle(
        ListCampaignsQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await repository.ListCampaignsAsync(
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var locale = languages.DefaultLanguage;

        return Result<PagedResult<CampaignSummaryDto>>.Success(
            new PagedResult<CampaignSummaryDto>(
                items.Select(item =>
                {
                    var translation = item.Translations.FirstOrDefault(value => value.Locale == locale)
                        ?? item.Translations.FirstOrDefault();
                    return new CampaignSummaryDto(
                        item.Id,
                        item.Slug,
                        translation?.Title ?? item.Slug,
                        translation?.Description ?? string.Empty,
                        item.StartsAt,
                        item.EndsAt,
                        item.Price,
                        item.Currency,
                        item.DiscountPercent);
                }).ToArray(),
                page,
                pageSize,
                items.Count));
    }
}

internal sealed class GetCampaignQueryHandler(IContentRepository repository, ILanguageCatalog languages)
    : IQueryHandler<GetCampaignQuery, CampaignDetailDto>
{
    public async Task<Result<CampaignDetailDto>> Handle(
        GetCampaignQuery request,
        CancellationToken cancellationToken)
    {
        var campaign = await repository.GetCampaignBySlugAsync(request.Slug, cancellationToken);

        if (campaign is null || campaign.Status != CampaignStatus.Active)
        {
            return Result<CampaignDetailDto>.Failure(
                Error.NotFound("HANI-GROWTH-2010", "Campaign was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var translation = campaign.Translations.FirstOrDefault(item => item.Locale == locale)
            ?? campaign.Translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)
            ?? campaign.Translations.FirstOrDefault();

        return Result<CampaignDetailDto>.Success(new CampaignDetailDto(
            campaign.Id,
            campaign.Slug,
            translation?.Locale ?? locale,
            translation?.Title ?? campaign.Slug,
            translation?.Description ?? string.Empty,
            campaign.StartsAt,
            campaign.EndsAt,
            campaign.Price,
            campaign.Currency,
            campaign.DiscountPercent,
            campaign.DestinationId,
            campaign.Faqs
                .Select(faq => new CampaignFaqDto(faq.Question, faq.Answer))
                .ToArray()));
    }
}

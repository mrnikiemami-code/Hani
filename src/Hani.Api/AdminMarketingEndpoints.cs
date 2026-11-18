using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.Commands.Growth;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Admin marketing campaign operations. Campaigns are localized marketing
/// content; activation is separate from creation so drafts can be reviewed.
/// </summary>
public static class AdminMarketingEndpoints
{
    /// <summary>Maps admin marketing endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminMarketingEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/marketing/campaigns", ListCampaignsAsync)
            .WithTags("Internal.Admin.Marketing")
            .WithName("Internal.ListAdminCampaigns")
            .RequireAuthorization("Admin")
            .Produces<AdminCampaignPageDto>();

        app.MapPost("/internal/v1/admin/marketing/campaigns", CreateCampaignAsync)
            .WithTags("Internal.Admin.Marketing")
            .WithName("Internal.CreateAdminCampaign")
            .RequireAuthorization("Admin")
            .Produces<AdminCampaignCreatedDto>(StatusCodes.Status201Created);

        app.MapPost("/internal/v1/admin/marketing/campaigns/{slug}/activate", ActivateCampaignAsync)
            .WithTags("Internal.Admin.Marketing")
            .WithName("Internal.ActivateAdminCampaign")
            .RequireAuthorization("Admin")
            .Produces<bool>();
        return app;
    }

    private static async Task<IResult> ListCampaignsAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? status,
        ContentDbContext content,
        ILanguageCatalog languages,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = content.Campaigns.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.Slug.Contains(term) ||
                item.Translations.Any(translation => translation.Title.Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<CampaignStatus>(status, true, out var parsed))
        {
            query = query.Where(item => item.Status == parsed);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminCampaignDto(
                item.Id,
                item.Slug,
                item.Translations
                    .Where(translation => translation.Locale == languages.DefaultLanguage)
                    .Select(translation => translation.Title)
                    .FirstOrDefault() ??
                    item.Translations.Select(translation => translation.Title).FirstOrDefault() ??
                    item.Slug,
                item.Status.ToString(),
                item.StartsAt,
                item.EndsAt,
                item.Price,
                item.Currency,
                item.DiscountPercent,
                content.CampaignRegistrations.Count(registration => registration.CampaignId == item.Id),
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

        return Results.Ok(new AdminCampaignPageDto(
            items,
            normalizedPage,
            normalizedPageSize,
            total));
    }

    private static async Task<IResult> CreateCampaignAsync(
        AdminCampaignCreateRequest request,
        HttpContext context,
        ISender sender,
        IdentityDbContext identity,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Slug) ||
            request.Translations.Count == 0 ||
            request.EndsAt <= request.StartsAt)
        {
            return context.ToProblem(new Error(
                "HANI-MARKETING-4001",
                "Slug, at least one translation, and a valid date range are required.",
                ErrorType.Validation));
        }

        var result = await sender.Send(
            new CreateCampaignCommand(
                request.Slug,
                request.StartsAt,
                request.EndsAt,
                request.DestinationId,
                request.Price,
                request.Currency,
                request.DiscountPercent,
                request.Translations
                    .Select(item => new CampaignTranslationInput(
                        item.Locale,
                        item.Title,
                        item.Description))
                    .ToArray(),
                request.Faqs
                    .Select(item => new CampaignFaqInput(item.Question, item.Answer))
                    .ToArray()),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        audit.Record(
            context,
            identity,
            "marketing.campaign.created",
            "Campaign",
            result.Value.ToString(),
            "Campaign created from the admin panel",
            after: new
            {
                request.Slug,
                request.StartsAt,
                request.EndsAt,
                request.Price,
                request.Currency,
                request.DiscountPercent
            });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/marketing/campaigns/{request.Slug}",
            new AdminCampaignCreatedDto(result.Value, request.Slug));
    }

    private static async Task<IResult> ActivateCampaignAsync(
        string slug,
        HttpContext context,
        ISender sender,
        IdentityDbContext identity,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ActivateCampaignCommand(slug), cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        audit.Record(
            context,
            identity,
            "marketing.campaign.activated",
            "Campaign",
            slug,
            "Campaign activated from the admin panel",
            after: new { slug, status = "Active" });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Ok(result.Value);
    }
}

/// <summary>Admin campaign row.</summary>
public sealed record AdminCampaignDto(
    Guid Id,
    string Slug,
    string Title,
    string Status,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    decimal? Price,
    string? Currency,
    decimal? DiscountPercent,
    int Registrations,
    DateTimeOffset CreatedAt);

/// <summary>Paged admin campaign response.</summary>
public sealed record AdminCampaignPageDto(
    IReadOnlyList<AdminCampaignDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Admin campaign creation request.</summary>
public sealed record AdminCampaignCreateRequest(
    string Slug,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    Guid? DestinationId,
    decimal? Price,
    string? Currency,
    decimal? DiscountPercent,
    IReadOnlyList<AdminCampaignTranslationRequest> Translations,
    IReadOnlyList<AdminCampaignFaqRequest> Faqs);

/// <summary>Localized campaign input.</summary>
public sealed record AdminCampaignTranslationRequest(
    string Locale,
    string Title,
    string Description);

/// <summary>Campaign FAQ input.</summary>
public sealed record AdminCampaignFaqRequest(string Question, string Answer);

/// <summary>Created campaign identifier.</summary>
public sealed record AdminCampaignCreatedDto(Guid Id, string Slug);

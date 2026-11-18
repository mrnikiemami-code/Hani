using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Application.Commands.Growth;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Admin marketing campaign endpoints.</summary>
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
        IAdminMarketingService marketing,
        CancellationToken cancellationToken)
        => Results.Ok(await marketing.ListCampaignsAsync(
            page,
            pageSize,
            q,
            status,
            cancellationToken));

    private static async Task<IResult> CreateCampaignAsync(
        AdminCampaignCreateRequest request,
        HttpContext context,
        ISender sender,
        IAdminAuditWriter audit,
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

        await audit.RecordAsync(
            context,
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
            },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/marketing/campaigns/{request.Slug}",
            new AdminCampaignCreatedDto(result.Value, request.Slug));
    }

    private static async Task<IResult> ActivateCampaignAsync(
        string slug,
        HttpContext context,
        ISender sender,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ActivateCampaignCommand(slug), cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "marketing.campaign.activated",
            "Campaign",
            slug,
            "Campaign activated from the admin panel",
            after: new { slug, status = "Active" },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }
}

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

using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Contracts.Supply;
using Hani.Modules.Catalog.Application.Queries.GetVisaCountry;
using Hani.Modules.Content.Application.Queries.Editorial;
using Hani.Modules.Content.Application.Queries.Growth;
using Hani.Modules.Identity.Application.Commands.AgencyOnboarding;
using Hani.Modules.Identity.Application.Commands.Auth;
using Hani.Modules.Identity.Application.Commands.Engagement;
using Hani.Modules.Identity.Application.Commands.Gamification;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using MediatR;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// BFF endpoints that compose module reads for Lastsecond-parity public pages.
/// </summary>
public static class LastsecondParityEndpoints
{
    /// <summary>
    /// Maps public directory, author profile, and home feed endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapLastsecondParityEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/market/v1/agencies", ListAgenciesAsync)
            .WithTags("Marketplace.Agency")
            .AllowAnonymous()
            .WithName("Marketplace.ListAgencies")
            .Produces<AgencyDirectoryPage>();

        app.MapGet("/market/v1/agencies/{slug}/profile", GetAgencyProfileAsync)
            .WithTags("Marketplace.Agency")
            .AllowAnonymous()
            .WithName("Marketplace.GetAgencyProfile")
            .Produces<AgencyProfileDto>();

        app.MapGet("/market/v1/authors/{username}/profile", GetAuthorProfileAsync)
            .WithTags("Marketplace.Author")
            .AllowAnonymous()
            .WithName("Marketplace.GetAuthorProfile")
            .Produces<AuthorProfileDto>();

        app.MapGet("/market/v1/home", GetHomeAsync)
            .WithTags("Marketplace.Home")
            .AllowAnonymous()
            .WithName("Marketplace.GetHome")
            .Produces<HomeFeedDto>();

        return app;
    }

    private static async Task<IResult> ListAgenciesAsync(
        string? city,
        string? province,
        string? q,
        int? page,
        int? pageSize,
        HttpContext context,
        ISender sender,
        IOfferReadService offers,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ListPublicAgenciesQuery(
                city,
                province,
                q,
                page is null or 0 ? 1 : page.Value,
                pageSize is null or 0 ? 20 : pageSize.Value),
            cancellationToken);

        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        var counts = await offers.GetApprovedOfferCountsByAgencyIdsAsync(
            result.Value!.Items.Select(agency => agency.Id).ToArray(),
            cancellationToken);

        return Results.Ok(new AgencyDirectoryPage(
            result.Value.Items
                .Select(agency => new AgencyDirectoryItem(
                    agency.Id,
                    agency.Slug,
                    agency.Name,
                    agency.City,
                    agency.Province,
                    agency.LicenseType,
                    agency.MemberSince,
                    agency.AverageRating,
                    agency.ReviewCount,
                    counts.TryGetValue(agency.Id, out var count) ? count : 0))
                .ToArray(),
            result.Value.Page,
            result.Value.PageSize,
            result.Value.TotalCount));
    }

    private static async Task<IResult> GetAgencyProfileAsync(
        string slug,
        HttpContext context,
        ISender sender,
        IOfferReadService offers,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetPublicAgencyQuery(slug), cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        var counts = await offers.GetApprovedOfferCountsByAgencyIdsAsync(
            [result.Value!.Id],
            cancellationToken);

        return Results.Ok(new AgencyProfileDto(
            result.Value,
            counts.TryGetValue(result.Value.Id, out var count) ? count : 0));
    }

    private static async Task<IResult> GetAuthorProfileAsync(
        string username,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var author = await sender.Send(new GetAuthorQuery(username), cancellationToken);
        if (!author.IsSuccess)
        {
            return context.ToProblem(author.Error!);
        }

        var userId = author.Value!.UserId;
        var stats = await sender.Send(new GetAuthorContentStatsQuery(userId), cancellationToken);
        var gamification = await sender.Send(new GetUserGamificationQuery(userId), cancellationToken);
        var reviewCount = await sender.Send(new GetAuthorReviewCountQuery(userId), cancellationToken);

        return Results.Ok(new AuthorProfileDto(
            author.Value,
            stats.IsSuccess
                ? stats.Value!
                : new AuthorContentStatsDto(userId, 0, 0, 0),
            gamification.IsSuccess
                ? gamification.Value!
                : new UserGamificationDto(userId, 0, 1, null, []),
            reviewCount.IsSuccess ? reviewCount.Value : 0));
    }

    private static async Task<IResult> GetHomeAsync(
        string? locale,
        string? scope,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var tours = await sender.Send(
            new SearchProductsQuery(locale, Scope: scope, Sort: "newest", Page: 1, PageSize: 8),
            cancellationToken);
        var visas = await sender.Send(new ListVisaCountriesQuery(locale), cancellationToken);
        var travelogues = await sender.Send(
            new SearchTraveloguesQuery(locale, Page: 1, PageSize: 4),
            cancellationToken);
        var blog = await sender.Send(
            new SearchBlogQuery(locale, Page: 1, PageSize: 4),
            cancellationToken);
        var campaigns = await sender.Send(new ListCampaignsQuery(1, 4), cancellationToken);

        if (!tours.IsSuccess)
        {
            return context.ToProblem(tours.Error!);
        }

        return Results.Ok(new HomeFeedDto(
            tours.Value!,
            visas.IsSuccess ? visas.Value! : [],
            travelogues.IsSuccess
                ? travelogues.Value!
                : new PagedResult<TravelogueSummaryDto>([], 1, 4, 0),
            blog.IsSuccess
                ? blog.Value!
                : new PagedResult<BlogSummaryDto>([], 1, 4, 0),
            campaigns.IsSuccess
                ? campaigns.Value!
                : new PagedResult<CampaignSummaryDto>([], 1, 4, 0)));
    }
}

/// <summary>
/// One agency row in the public directory.
/// </summary>
public sealed record AgencyDirectoryItem(
    Guid Id,
    string Slug,
    string Name,
    string City,
    string? Province,
    string? LicenseType,
    DateTimeOffset MemberSince,
    decimal? AverageRating,
    int ReviewCount,
    int ApprovedTourCount);

/// <summary>
/// Paged public agency directory.
/// </summary>
public sealed record AgencyDirectoryPage(
    IReadOnlyList<AgencyDirectoryItem> Items,
    int Page,
    int PageSize,
    int TotalCount);

/// <summary>
/// Public agency profile with approved tour count.
/// </summary>
public sealed record AgencyProfileDto(PublicAgencyDto Agency, int ApprovedTourCount);

/// <summary>
/// Public author page with content, gamification, and review aggregates.
/// </summary>
public sealed record AuthorProfileDto(
    AuthorDto Author,
    AuthorContentStatsDto Content,
    UserGamificationDto Gamification,
    int ReviewCount);

/// <summary>
/// Home page aggregation across marketplace, content, and campaigns.
/// </summary>
public sealed record HomeFeedDto(
    PagedResult<ProductSearchItemDto> Tours,
    IReadOnlyList<VisaCountrySummaryDto> Visas,
    PagedResult<TravelogueSummaryDto> Travelogues,
    PagedResult<BlogSummaryDto> Blog,
    PagedResult<CampaignSummaryDto> Campaigns);

using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Admin supplier offer moderation endpoints.</summary>
public static class AdminSupplierEndpoints
{
    /// <summary>Maps supplier moderation endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminSupplierEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/admin/suppliers")
            .WithTags("Internal.Admin.Supplier")
            .RequireAuthorization("Admin");

        group.MapGet("/offers", ListAsync)
            .WithName("Internal.ListAdminSupplierOffers")
            .Produces<AdminSupplierOfferPageDto>();

        group.MapPost("/offers/{id:guid}/approve", ApproveAsync)
            .WithName("Internal.ApproveAdminSupplierOffer")
            .Produces<bool>();

        group.MapPost("/offers/{id:guid}/reject", RejectAsync)
            .WithName("Internal.RejectAdminSupplierOffer")
            .Produces<bool>();

        return app;
    }

    private static async Task<IResult> ListAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        IAdminSupplierService suppliers,
        CancellationToken cancellationToken)
        => Results.Ok(await suppliers.ListOffersAsync(
            page,
            pageSize,
            q,
            status,
            cancellationToken));

    private static async Task<IResult> ApproveAsync(
        Guid id,
        HttpContext context,
        IAdminSupplierService suppliers,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await suppliers.ApproveAsync(id, cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "supplier.offer.approved",
            "AgencyOffer",
            id.ToString(),
            "Supplier offer approved from the admin panel",
            after: new { status = "Approved" },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> RejectAsync(
        Guid id,
        AdminSupplierRejectRequest request,
        HttpContext context,
        IAdminSupplierService suppliers,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Reason))
        {
            return context.ToProblem(Error.Validation(
                "HANI-SUPPLIER-4001",
                "A rejection reason is required."));
        }

        var result = await suppliers.RejectAsync(id, request.Reason, cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "supplier.offer.rejected",
            "AgencyOffer",
            id.ToString(),
            request.Reason,
            after: new { status = "Rejected" },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }
}

/// <summary>Supplier offer rejection request.</summary>
public sealed record AdminSupplierRejectRequest(string Reason);

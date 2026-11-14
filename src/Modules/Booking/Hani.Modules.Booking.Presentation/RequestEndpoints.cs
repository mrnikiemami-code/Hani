using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Booking.Application.Commands.Requests;
using Hani.Modules.Booking.Domain.Leads;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Booking.Presentation;

/// <summary>
/// Reservation-request, lead/RFQ, discrepancy, and installment endpoints.
/// </summary>
public static class RequestEndpoints
{
    /// <summary>
    /// Maps Gate 4 request and payment-plan endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapRequestEndpoints(this IEndpointRouteBuilder app)
    {
        var market = app.MapGroup("/market/v1").WithTags("Marketplace.Requests");
        var internalApi = app.MapGroup("/internal/v1").WithTags("Internal.Requests");
        var supplier = app.MapGroup("/supplier/v1")
            .WithTags("Supplier.Requests")
            .RequireAuthorization("Supplier");

        market.MapPost("/reservation-requests", CreateReservationAsync)
            .WithName("Marketplace.CreateReservationRequest")
            .Produces<ReservationRequestDto>()
            .ProducesProblem(StatusCodes.Status409Conflict);

        market.MapGet("/reservation-requests/{requestId:guid}", GetReservationAsync)
            .WithName("Marketplace.GetReservationRequest")
            .Produces<ReservationRequestDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapPost("/reservation-requests/{requestId:guid}/accept", AcceptReservationAsync)
            .WithName("Marketplace.AcceptReservationRequest")
            .Produces<bool>();

        supplier.MapGet("/reservation-requests", ListAgencyReservationsAsync)
            .WithName("Supplier.ListReservationRequests")
            .Produces<IReadOnlyList<ReservationRequestDto>>();

        supplier.MapPost("/reservation-requests/{requestId:guid}/confirm", SupplierConfirmReservationAsync)
            .WithName("Supplier.ConfirmReservationRequest")
            .Produces<bool>();

        supplier.MapPost("/reservation-requests/{requestId:guid}/reject", SupplierRejectReservationAsync)
            .WithName("Supplier.RejectReservationRequest")
            .Produces<bool>();

        internalApi.MapPost("/reservation-requests/{requestId:guid}/confirm", ConfirmReservationAsync)
            .WithName("Internal.ConfirmReservationRequest")
            .Produces<bool>();

        internalApi.MapPost("/reservation-requests/{requestId:guid}/reject", RejectReservationAsync)
            .WithName("Internal.RejectReservationRequest")
            .Produces<bool>();

        market.MapPost("/leads", CreateLeadAsync)
            .WithName("Marketplace.CreateLead")
            .Produces<LeadDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        market.MapGet("/leads/{leadId:guid}", GetLeadAsync)
            .WithName("Marketplace.GetLead")
            .Produces<LeadDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        internalApi.MapGet("/leads", ListLeadsAsync)
            .WithName("Internal.ListLeads")
            .Produces<PagedResult<LeadDto>>();

        internalApi.MapPost("/leads/{leadId:guid}/match", MatchLeadAsync)
            .WithName("Internal.MatchLead")
            .Produces<bool>();

        internalApi.MapPost("/leads/{leadId:guid}/distribute", DistributeLeadAsync)
            .WithName("Internal.DistributeLead")
            .Produces<int>();

        internalApi.MapPost("/leads/{leadId:guid}/close", CloseLeadAsync)
            .WithName("Internal.CloseLead")
            .Produces<bool>();

        market.MapPost("/price-discrepancies", CreateDiscrepancyAsync)
            .WithName("Marketplace.CreatePriceDiscrepancy")
            .Produces<PriceDiscrepancyDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        internalApi.MapGet("/price-discrepancies", ListDiscrepanciesAsync)
            .WithName("Internal.ListPriceDiscrepancies")
            .Produces<PagedResult<PriceDiscrepancyDto>>();

        internalApi.MapPost("/price-discrepancies/{reportId:guid}/resolve", ResolveDiscrepancyAsync)
            .WithName("Internal.ResolvePriceDiscrepancy")
            .Produces<bool>();

        market.MapPost("/orders/{orderId:guid}/installments", CreateInstallmentsAsync)
            .WithName("Marketplace.CreateInstallments")
            .Produces<InstallmentPlanDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        market.MapGet("/orders/{orderId:guid}/installments", GetInstallmentsAsync)
            .WithName("Marketplace.GetInstallments")
            .Produces<InstallmentPlanDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        internalApi.MapPost("/installments/pay", PayInstallmentAsync)
            .WithName("Internal.PayInstallment")
            .Produces<bool>();

        return app;
    }

    /// <summary>Creates a reservation request from a quote.</summary>
    private static async Task<IResult> CreateReservationAsync(
        CreateReservationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateReservationRequestCommand(
                request.QuoteId,
                request.ContactEmail,
                request.ContactPhone,
                request.Notes),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Returns a reservation request.</summary>
    private static async Task<IResult> GetReservationAsync(
        Guid requestId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetReservationRequestQuery(requestId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Accepts a confirmed reservation request.</summary>
    private static async Task<IResult> AcceptReservationAsync(
        Guid requestId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new AcceptReservationRequestCommand(requestId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Lists reservation requests for the authenticated agency.</summary>
    private static async Task<IResult> ListAgencyReservationsAsync(
        string? status,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var result = await sender.Send(
            new ListReservationRequestsQuery(agencyId, status),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Confirms a reservation request owned by the authenticated agency.</summary>
    private static async Task<IResult> SupplierConfirmReservationAsync(
        Guid requestId,
        ConfirmReservationRequest request,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var result = await sender.Send(
            new ConfirmReservationRequestCommand(requestId, request.AgencyNote, agencyId),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Rejects a reservation request owned by the authenticated agency.</summary>
    private static async Task<IResult> SupplierRejectReservationAsync(
        Guid requestId,
        RejectReservationRequest request,
        HttpContext context,
        ICurrentTenant currentTenant,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (currentTenant.TenantId is not { } agencyId)
        {
            return context.TenantRequiredProblem();
        }

        var result = await sender.Send(
            new RejectReservationRequestCommand(requestId, request.Reason, agencyId),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Confirms a pending reservation request.</summary>
    private static async Task<IResult> ConfirmReservationAsync(
        Guid requestId,
        ConfirmReservationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ConfirmReservationRequestCommand(requestId, request.AgencyNote),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Rejects a pending reservation request.</summary>
    private static async Task<IResult> RejectReservationAsync(
        Guid requestId,
        RejectReservationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RejectReservationRequestCommand(requestId, request.Reason),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a Safarsaz/RFQ lead.</summary>
    private static async Task<IResult> CreateLeadAsync(
        CreateLeadRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateLeadCommand(
                request.ServiceType,
                request.Destination,
                request.StartDate,
                request.EndDate,
                request.Adults,
                request.Children,
                request.Infants,
                request.BudgetAmount,
                request.Currency,
                request.ContactName,
                request.ContactEmail,
                request.ContactPhone,
                request.Notes),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Returns one lead.</summary>
    private static async Task<IResult> GetLeadAsync(
        Guid leadId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetLeadQuery(leadId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Lists leads for the admin panel.</summary>
    private static async Task<IResult> ListLeadsAsync(
        string? status,
        int page,
        int pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ListLeadsQuery(
                status,
                page == 0 ? 1 : page,
                pageSize == 0 ? 20 : pageSize),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Matches a lead to an agency.</summary>
    private static async Task<IResult> MatchLeadAsync(
        Guid leadId,
        MatchLeadRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new MatchLeadCommand(leadId, request.AgencyId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Distributes a lead to all active agencies.</summary>
    private static async Task<IResult> DistributeLeadAsync(
        Guid leadId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new DistributeLeadCommand(leadId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Closes a lead.</summary>
    private static async Task<IResult> CloseLeadAsync(
        Guid leadId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new CloseLeadCommand(leadId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a price-discrepancy report.</summary>
    private static async Task<IResult> CreateDiscrepancyAsync(
        CreatePriceDiscrepancyRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreatePriceDiscrepancyCommand(
                request.AgencyOfferId,
                request.DepartureId,
                request.ContactEmail,
                request.ReportedPrice,
                request.Currency,
                request.Note),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Lists price-discrepancy reports.</summary>
    private static async Task<IResult> ListDiscrepanciesAsync(
        string? status,
        int page,
        int pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ListPriceDiscrepanciesQuery(
                status,
                page == 0 ? 1 : page,
                pageSize == 0 ? 20 : pageSize),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Resolves a price-discrepancy report.</summary>
    private static async Task<IResult> ResolveDiscrepancyAsync(
        Guid reportId,
        ResolvePriceDiscrepancyRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ResolvePriceDiscrepancyCommand(reportId, request.Resolution),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates an installment plan for an order currency.</summary>
    private static async Task<IResult> CreateInstallmentsAsync(
        Guid orderId,
        CreateInstallmentPlanRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateInstallmentPlanCommand(
                orderId,
                request.Currency,
                request.InstallmentCount,
                request.IntervalDays,
                request.DownPaymentAmount,
                request.ChequeReference),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Returns an order installment plan.</summary>
    private static async Task<IResult> GetInstallmentsAsync(
        Guid orderId,
        string currency,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetInstallmentPlanQuery(orderId, currency),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Marks one installment paid.</summary>
    private static async Task<IResult> PayInstallmentAsync(
        PayInstallmentRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new PayInstallmentCommand(request.OrderId, request.Currency, request.Sequence),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }
}

/// <summary>Reservation request body.</summary>
public sealed record CreateReservationRequest(
    Guid QuoteId,
    string ContactEmail,
    string? ContactPhone,
    string? Notes);

/// <summary>Reservation confirmation body.</summary>
public sealed record ConfirmReservationRequest(string? AgencyNote);

/// <summary>Reservation rejection body.</summary>
public sealed record RejectReservationRequest(string Reason);

/// <summary>Lead request body.</summary>
public sealed record CreateLeadRequest(
    LeadServiceType ServiceType,
    string? Destination,
    DateOnly? StartDate,
    DateOnly? EndDate,
    int Adults,
    int Children,
    int Infants,
    decimal? BudgetAmount,
    string? Currency,
    string ContactName,
    string ContactEmail,
    string ContactPhone,
    string? Notes);

/// <summary>Lead matching body.</summary>
public sealed record MatchLeadRequest(Guid AgencyId);

/// <summary>Price-discrepancy body.</summary>
public sealed record CreatePriceDiscrepancyRequest(
    Guid AgencyOfferId,
    Guid? DepartureId,
    string? ContactEmail,
    decimal ReportedPrice,
    string Currency,
    string Note);

/// <summary>Price-discrepancy resolution body.</summary>
public sealed record ResolvePriceDiscrepancyRequest(string Resolution);

/// <summary>Installment plan creation body.</summary>
public sealed record CreateInstallmentPlanRequest(
    string Currency,
    int InstallmentCount,
    int IntervalDays,
    decimal? DownPaymentAmount = null,
    string? ChequeReference = null);

/// <summary>Installment payment body.</summary>
public sealed record PayInstallmentRequest(
    Guid OrderId,
    string Currency,
    int Sequence);

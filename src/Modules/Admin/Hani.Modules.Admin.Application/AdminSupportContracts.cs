using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Admin.Application;

/// <summary>Admin support ticket list row.</summary>
public sealed record AdminSupportTicketRowDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    string ContactName,
    string ContactEmail,
    string Category,
    string Priority,
    string Status,
    Guid? AssignedTo,
    int MessageCount,
    DateTimeOffset CreatedAt,
    DateTimeOffset LastMessageAt,
    string? AssignedToName,
    DateTimeOffset SlaDueAt,
    DateTimeOffset? FirstResponseAt,
    string SlaState);

/// <summary>Paged support tickets.</summary>
public sealed record AdminSupportTicketPageDto(
    IReadOnlyList<AdminSupportTicketRowDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Support thread message.</summary>
public sealed record AdminSupportMessageDto(
    Guid Id,
    string AuthorType,
    Guid? AuthorUserId,
    string Body,
    bool IsInternal,
    DateTimeOffset CreatedAt);

/// <summary>Support ticket detail.</summary>
public sealed record AdminSupportTicketDetailDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    string ContactName,
    string ContactEmail,
    string? ContactPhone,
    string Category,
    string Priority,
    string Status,
    Guid? AssignedTo,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    DateTimeOffset LastMessageAt,
    IReadOnlyList<AdminSupportMessageDto> Messages,
    string? AssignedToName,
    DateTimeOffset SlaDueAt,
    DateTimeOffset? FirstResponseAt,
    string SlaState);

/// <summary>Created support ticket.</summary>
public sealed record SupportTicketCreatedDto(Guid Id, string TicketNumber);

/// <summary>Admin support ticket creation input.</summary>
public sealed record AdminSupportTicketInput(
    Guid? UserId,
    string ContactName,
    string ContactEmail,
    string? ContactPhone,
    string Subject,
    string Category,
    string Message,
    string Priority);



/// <summary>Support dispute row.</summary>
public sealed record AdminSupportDisputeDto(
    Guid Id,
    Guid TicketId,
    string TicketNumber,
    Guid? OrderId,
    string Type,
    string Status,
    decimal? Amount,
    string? Currency,
    string Description,
    string? EvidenceUrl,
    string? Resolution,
    Guid OpenedBy,
    DateTimeOffset OpenedAt,
    Guid? ResolvedBy,
    DateTimeOffset? ResolvedAt);

/// <summary>Paged support disputes.</summary>
public sealed record AdminSupportDisputePageDto(
    IReadOnlyList<AdminSupportDisputeDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Support dispute creation input.</summary>
public sealed record AdminSupportDisputeInput(
    Guid? OrderId,
    string Type,
    decimal? Amount,
    string? Currency,
    string Description,
    string? EvidenceUrl);

/// <summary>Support dispute status transition input.</summary>
public sealed record AdminSupportDisputeStatusInput(
    string Status,
    string? Resolution);

/// <summary>SLA count by state.</summary>
public sealed record AdminSupportSlaBreakdownDto(string State, int Count);

/// <summary>Ticket count by category.</summary>
public sealed record AdminSupportCategoryReportDto(string Category, int Count);

/// <summary>Ticket load by assignee.</summary>
public sealed record AdminSupportAssigneeReportDto(
    Guid? AssignedTo,
    string Assignee,
    int OpenCount,
    int TotalCount);

/// <summary>Support quality report.</summary>
public sealed record AdminSupportReportDto(
    int PeriodDays,
    DateTimeOffset From,
    DateTimeOffset To,
    int TotalTickets,
    int OpenTickets,
    int ResolvedTickets,
    int BreachedTickets,
    int AtRiskTickets,
    double AverageFirstResponseHours,
    double AverageResolutionHours,
    IReadOnlyList<AdminSupportSlaBreakdownDto> SlaBreakdown,
    IReadOnlyList<AdminSupportCategoryReportDto> ByCategory,
    IReadOnlyList<AdminSupportAssigneeReportDto> ByAssignee);

/// <summary>Admin support ticket service.</summary>
public interface IAdminSupportService
{
    /// <summary>Lists tickets with filters.</summary>
    Task<AdminSupportTicketPageDto> ListTicketsAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        string? priority,
        CancellationToken cancellationToken);

    /// <summary>Returns one ticket and its thread.</summary>
    Task<AdminSupportTicketDetailDto?> GetTicketAsync(
        Guid id,
        CancellationToken cancellationToken);

    /// <summary>Creates a ticket on behalf of a customer.</summary>
    Task<SupportTicketCreatedDto> CreateAsync(
        AdminSupportTicketInput input,
        CancellationToken cancellationToken);

    /// <summary>Adds an admin reply or internal note.</summary>
    Task<AdminSupportTicketDetailDto?> ReplyAsync(
        Guid id,
        Guid actorUserId,
        string body,
        bool isInternal,
        CancellationToken cancellationToken);

    /// <summary>Updates status, priority, and assignee.</summary>
    Task<AdminSupportTicketDetailDto?> UpdateAsync(
        Guid id,
        string status,
        string priority,
        Guid? assignedTo,
        CancellationToken cancellationToken);

    /// <summary>Lists disputes with optional status, type, and ticket filters.</summary>
    Task<AdminSupportDisputePageDto> ListDisputesAsync(
        int page,
        int pageSize,
        string? status,
        string? type,
        Guid? ticketId,
        CancellationToken cancellationToken);

    /// <summary>Opens a dispute from a support ticket.</summary>
    Task<Result<AdminSupportDisputeDto>> CreateDisputeAsync(
        Guid ticketId,
        AdminSupportDisputeInput input,
        Guid actorUserId,
        CancellationToken cancellationToken);

    /// <summary>Moves a dispute through its lifecycle.</summary>
    Task<Result<AdminSupportDisputeDto>> UpdateDisputeStatusAsync(
        Guid id,
        AdminSupportDisputeStatusInput input,
        Guid actorUserId,
        CancellationToken cancellationToken);

    /// <summary>Returns support quality, SLA, category, and assignee metrics.</summary>
    Task<AdminSupportReportDto> GetReportAsync(
        int days,
        CancellationToken cancellationToken);
}

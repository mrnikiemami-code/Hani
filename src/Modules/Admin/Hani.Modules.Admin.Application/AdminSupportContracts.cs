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
    DateTimeOffset LastMessageAt);

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
    IReadOnlyList<AdminSupportMessageDto> Messages);

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
}

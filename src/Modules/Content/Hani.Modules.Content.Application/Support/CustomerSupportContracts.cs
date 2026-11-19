using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Content.Application.Support;

/// <summary>Customer support ticket summary.</summary>
public sealed record CustomerSupportTicketRowDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    string Category,
    string Status,
    string Priority,
    int MessageCount,
    int UnreadCount,
    DateTimeOffset CreatedAt,
    DateTimeOffset LastMessageAt);

/// <summary>Paged customer support tickets.</summary>
public sealed record CustomerSupportTicketPageDto(
    IReadOnlyList<CustomerSupportTicketRowDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Customer-visible support message. Internal notes are excluded.</summary>
public sealed record CustomerSupportMessageDto(
    Guid Id,
    string AuthorType,
    string Body,
    DateTimeOffset CreatedAt,
    IReadOnlyList<SupportAttachmentDto> Attachments);

/// <summary>Customer support ticket detail.</summary>
public sealed record CustomerSupportTicketDetailDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    string Category,
    string Status,
    string Priority,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    DateTimeOffset LastMessageAt,
    int UnreadCount,
    IReadOnlyList<CustomerSupportMessageDto> Messages,
    IReadOnlyList<CustomerSupportDisputeDto> Disputes);

/// <summary>Customer-visible dispute.</summary>
public sealed record CustomerSupportDisputeDto(
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
    DateTimeOffset OpenedAt,
    DateTimeOffset? ResolvedAt);

/// <summary>Paged customer disputes.</summary>
public sealed record CustomerSupportDisputePageDto(
    IReadOnlyList<CustomerSupportDisputeDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Customer dispute creation input.</summary>
public sealed record CustomerSupportDisputeInput(
    Guid? OrderId,
    string Type,
    decimal? Amount,
    string? Currency,
    string Description,
    string? EvidenceUrl);

/// <summary>Customer ticket and dispute read/write service.</summary>
public interface ICustomerSupportService
{
    /// <summary>Lists tickets owned by one authenticated customer.</summary>
    Task<CustomerSupportTicketPageDto> ListTicketsAsync(
        Guid userId,
        int page,
        int pageSize,
        string? status,
        string? q,
        CancellationToken cancellationToken);

    /// <summary>Returns one owned ticket with non-internal messages and disputes.</summary>
    Task<CustomerSupportTicketDetailDto?> GetTicketAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken);

    /// <summary>Adds a customer reply to an owned ticket.</summary>
    Task<Result<CustomerSupportTicketDetailDto>> ReplyAsync(
        Guid userId,
        Guid id,
        string body,
        IReadOnlyList<Guid>? attachmentIds,
        CancellationToken cancellationToken);

    /// <summary>Lists disputes opened on tickets owned by one customer.</summary>
    Task<CustomerSupportDisputePageDto> ListDisputesAsync(
        Guid userId,
        int page,
        int pageSize,
        string? status,
        CancellationToken cancellationToken);

    /// <summary>Opens a dispute on an owned ticket.</summary>
    Task<Result<CustomerSupportDisputeDto>> CreateDisputeAsync(
        Guid userId,
        Guid ticketId,
        CustomerSupportDisputeInput input,
        CancellationToken cancellationToken);

    /// <summary>Returns one owned dispute.</summary>
    Task<CustomerSupportDisputeDto?> GetDisputeAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken);

    /// <summary>Uploads a private attachment to an owned ticket.</summary>
    Task<Result<SupportAttachmentDto>> UploadAttachmentAsync(
        Guid userId,
        Guid ticketId,
        string fileName,
        string contentType,
        long sizeBytes,
        Stream content,
        CancellationToken cancellationToken);

    /// <summary>Downloads an attachment that belongs to an owned ticket.</summary>
    Task<SupportAttachmentDownloadDto?> DownloadAttachmentAsync(
        Guid userId,
        Guid attachmentId,
        CancellationToken cancellationToken);
}

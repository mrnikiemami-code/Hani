namespace Hani.Modules.Admin.Application;

/// <summary>Admin notification outbox row.</summary>
public sealed record AdminNotificationDto(
    Guid Id,
    Guid? UserId,
    string Channel,
    string TemplateKey,
    string Payload,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? SentAt,
    int AttemptCount,
    string? LastError,
    DateTimeOffset? NextAttemptAt);

/// <summary>Paged notification outbox.</summary>
public sealed record AdminNotificationPageDto(
    IReadOnlyList<AdminNotificationDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Admin notification service.</summary>
public interface IAdminNotificationService
{
    /// <summary>Lists notification outbox rows.</summary>
    Task<AdminNotificationPageDto> ListAsync(
        int page,
        int pageSize,
        string? status,
        string? channel,
        string? q,
        CancellationToken cancellationToken);

    /// <summary>Requeues a failed notification.</summary>
    Task<bool> RetryAsync(Guid id, CancellationToken cancellationToken);
}

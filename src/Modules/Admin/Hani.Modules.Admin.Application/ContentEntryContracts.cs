using Hani.Modules.Content.Domain.Content;

namespace Hani.Modules.Admin.Application;

/// <summary>Content entry read/write model.</summary>
public sealed record ContentEntryDto(
    Guid Id,
    ContentEntryType Type,
    string Slug,
    string Locale,
    string Title,
    string? Excerpt,
    string Body,
    Guid? HeroMediaId,
    string? HeroImageUrl,
    string? SeoTitle,
    string? SeoDescription,
    ContentStatus Status,
    DateTimeOffset? PublishedAt,
    DateTimeOffset? ScheduledAt,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    int RevisionCount);

/// <summary>Paged content entries.</summary>
public sealed record ContentEntryListResponse(
    IReadOnlyList<ContentEntryDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Content entry write input.</summary>
public sealed record ContentEntryWriteRequest(
    ContentEntryType Type,
    string Slug,
    string Locale,
    string Title,
    string? Excerpt,
    string? Body,
    Guid? HeroMediaId,
    string? HeroImageUrl,
    string? SeoTitle,
    string? SeoDescription);

/// <summary>Content scheduling input.</summary>
public sealed record ScheduleContentRequest(DateTimeOffset ScheduledAt);

/// <summary>Content entry service.</summary>
public interface IContentEntryService
{
    Task<ContentEntryListResponse> ListAdminAsync(
        int page,
        int pageSize,
        string? q,
        string? locale,
        ContentEntryType? type,
        ContentStatus? status,
        CancellationToken cancellationToken);
    Task<ContentEntryDto?> GetAdminAsync(Guid id, CancellationToken cancellationToken);
    Task<ContentEntryDto> CreateAsync(
        ContentEntryWriteRequest request,
        CancellationToken cancellationToken);
    Task<ContentEntryDto?> UpdateAsync(
        Guid id,
        ContentEntryWriteRequest request,
        CancellationToken cancellationToken);
    Task<ContentEntryDto?> PublishEntryAsync(Guid id, CancellationToken cancellationToken);
    Task<ContentEntryDto?> UnpublishEntryAsync(Guid id, CancellationToken cancellationToken);
    Task<ContentEntryDto?> RestoreRevisionAsync(
        Guid id,
        Guid revisionId,
        CancellationToken cancellationToken);
    Task<ContentEntryDto?> ScheduleAsync(
        Guid id,
        DateTimeOffset scheduledAt,
        CancellationToken cancellationToken);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<ContentEntryDto>> ListPublishedAsync(
        string? locale,
        ContentEntryType? type,
        CancellationToken cancellationToken);
    Task<ContentEntryDto?> GetPublishedAsync(
        string slug,
        string? locale,
        ContentEntryType? type,
        CancellationToken cancellationToken);
}

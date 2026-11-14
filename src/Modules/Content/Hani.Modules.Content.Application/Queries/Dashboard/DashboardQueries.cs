using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Domain.Dashboard;

namespace Hani.Modules.Content.Application.Queries.Dashboard;

/// <summary>Dashboard summary for one user.</summary>
public sealed record GetDashboardSummaryQuery(Guid UserId) : IQuery<DashboardSummaryDto>;

/// <summary>List a user's dashboard messages.</summary>
public sealed record ListUserMessagesQuery(Guid UserId, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<UserMessageDto>>;

/// <summary>List a user's documents.</summary>
public sealed record ListUserDocumentsQuery(Guid UserId, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<UserDocumentDto>>;

/// <summary>Dashboard summary read model.</summary>
public sealed record DashboardSummaryDto(
    Guid UserId,
    int MessageCount,
    int DocumentCount,
    int Blogs,
    int Travelogues,
    int Videos);

/// <summary>Dashboard message read model.</summary>
public sealed record UserMessageDto(
    Guid MessageId,
    string Subject,
    string Body,
    string Status,
    DateTimeOffset CreatedAt);

/// <summary>Dashboard document read model.</summary>
public sealed record UserDocumentDto(
    Guid DocumentId,
    string Name,
    string FileUrl,
    string DocumentType,
    string Status,
    DateTimeOffset CreatedAt);

/// <summary>Create a dashboard message.</summary>
public sealed record CreateUserMessageCommand(Guid UserId, string Subject, string Body)
    : ICommand<Guid>;

/// <summary>Create a dashboard document.</summary>
public sealed record CreateUserDocumentCommand(
    Guid UserId,
    string Name,
    string FileUrl,
    string DocumentType) : ICommand<Guid>;

/// <summary>Mark a message as read.</summary>
public sealed record MarkUserMessageReadCommand(Guid MessageId) : ICommand<bool>;

/// <summary>Set a document verification status.</summary>
public sealed record SetUserDocumentStatusCommand(
    Guid DocumentId,
    UserDocumentStatus Status) : ICommand<bool>;

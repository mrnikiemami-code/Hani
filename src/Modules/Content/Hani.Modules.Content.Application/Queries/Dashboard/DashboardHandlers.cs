using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Domain.Dashboard;

namespace Hani.Modules.Content.Application.Queries.Dashboard;

internal sealed class GetDashboardSummaryQueryHandler(IContentRepository repository)
    : IQueryHandler<GetDashboardSummaryQuery, DashboardSummaryDto>
{
    public async Task<Result<DashboardSummaryDto>> Handle(
        GetDashboardSummaryQuery request,
        CancellationToken cancellationToken)
    {
        var content = await repository.CountByAuthorAsync(request.UserId, cancellationToken);
        var messages = await repository.CountUserMessagesAsync(request.UserId, cancellationToken);
        var documents = await repository.CountUserDocumentsAsync(request.UserId, cancellationToken);

        return Result<DashboardSummaryDto>.Success(new DashboardSummaryDto(
            request.UserId,
            messages,
            documents,
            content.Blogs,
            content.Travelogues,
            content.Videos));
    }
}

internal sealed class ListUserMessagesQueryHandler(IContentRepository repository)
    : IQueryHandler<ListUserMessagesQuery, PagedResult<UserMessageDto>>
{
    public async Task<Result<PagedResult<UserMessageDto>>> Handle(
        ListUserMessagesQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await repository.ListUserMessagesAsync(
            request.UserId,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await repository.CountUserMessagesAsync(request.UserId, cancellationToken);

        return Result<PagedResult<UserMessageDto>>.Success(
            new PagedResult<UserMessageDto>(
                items.Select(item => new UserMessageDto(
                    item.Id,
                    item.Subject,
                    item.Body,
                    item.Status.ToString(),
                    item.CreatedAt)).ToArray(),
                page,
                pageSize,
                total));
    }
}

internal sealed class ListUserDocumentsQueryHandler(IContentRepository repository)
    : IQueryHandler<ListUserDocumentsQuery, PagedResult<UserDocumentDto>>
{
    public async Task<Result<PagedResult<UserDocumentDto>>> Handle(
        ListUserDocumentsQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await repository.ListUserDocumentsAsync(
            request.UserId,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await repository.CountUserDocumentsAsync(request.UserId, cancellationToken);

        return Result<PagedResult<UserDocumentDto>>.Success(
            new PagedResult<UserDocumentDto>(
                items.Select(item => new UserDocumentDto(
                    item.Id,
                    item.Name,
                    item.FileUrl,
                    item.DocumentType,
                    item.Status.ToString(),
                    item.CreatedAt)).ToArray(),
                page,
                pageSize,
                total));
    }
}

internal sealed class CreateUserMessageCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<CreateUserMessageCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateUserMessageCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var message = UserMessage.Create(ids, request.UserId, request.Subject, request.Body);
            await repository.AddUserMessageAsync(message, cancellationToken);
            return Result<Guid>.Success(message.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CONTENT-1201", exception.Message));
        }
    }
}

internal sealed class CreateUserDocumentCommandHandler(IContentRepository repository, IIdGenerator ids)
    : ICommandHandler<CreateUserDocumentCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateUserDocumentCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var document = UserDocument.Create(
                ids,
                request.UserId,
                request.Name,
                request.FileUrl,
                request.DocumentType);
            await repository.AddUserDocumentAsync(document, cancellationToken);
            return Result<Guid>.Success(document.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CONTENT-1202", exception.Message));
        }
    }
}

internal sealed class MarkUserMessageReadCommandHandler(IContentRepository repository)
    : ICommandHandler<MarkUserMessageReadCommand, bool>
{
    public async Task<Result<bool>> Handle(
        MarkUserMessageReadCommand request,
        CancellationToken cancellationToken)
    {
        var message = await repository.GetUserMessageAsync(request.MessageId, cancellationToken);

        if (message is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1203", "Message was not found."));
        }

        message.MarkRead();
        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class SetUserDocumentStatusCommandHandler(IContentRepository repository)
    : ICommandHandler<SetUserDocumentStatusCommand, bool>
{
    public async Task<Result<bool>> Handle(
        SetUserDocumentStatusCommand request,
        CancellationToken cancellationToken)
    {
        var document = await repository.GetUserDocumentAsync(request.DocumentId, cancellationToken);

        if (document is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-CONTENT-1204", "Document was not found."));
        }

        switch (request.Status)
        {
            case UserDocumentStatus.Verified:
                document.Verify();
                break;
            case UserDocumentStatus.Rejected:
                document.Reject();
                break;
        }

        await repository.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

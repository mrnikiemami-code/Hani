using FluentValidation;

namespace Hani.Modules.Content.Application.Queries.Dashboard;

/// <summary>Validation rules for dashboard summaries.</summary>
public sealed class GetDashboardSummaryQueryValidator : AbstractValidator<GetDashboardSummaryQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetDashboardSummaryQueryValidator()
    {
        RuleFor(query => query.UserId).NotEmpty().WithErrorCode("HANI-CONTENT-1211");
    }
}

/// <summary>Validation rules for message lists.</summary>
public sealed class ListUserMessagesQueryValidator : AbstractValidator<ListUserMessagesQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListUserMessagesQueryValidator()
    {
        RuleFor(query => query.UserId).NotEmpty().WithErrorCode("HANI-CONTENT-1211");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CONTENT-1212");
    }
}

/// <summary>Validation rules for document lists.</summary>
public sealed class ListUserDocumentsQueryValidator : AbstractValidator<ListUserDocumentsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListUserDocumentsQueryValidator()
    {
        RuleFor(query => query.UserId).NotEmpty().WithErrorCode("HANI-CONTENT-1211");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CONTENT-1212");
    }
}

/// <summary>Validation rules for user messages.</summary>
public sealed class CreateUserMessageCommandValidator : AbstractValidator<CreateUserMessageCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateUserMessageCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-CONTENT-1211");
        RuleFor(command => command.Subject).NotEmpty().MaximumLength(300).WithErrorCode("HANI-CONTENT-1213");
    }
}

/// <summary>Validation rules for user documents.</summary>
public sealed class CreateUserDocumentCommandValidator : AbstractValidator<CreateUserDocumentCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateUserDocumentCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-CONTENT-1211");
        RuleFor(command => command.Name).NotEmpty().MaximumLength(300).WithErrorCode("HANI-CONTENT-1214");
        RuleFor(command => command.FileUrl).NotEmpty().WithErrorCode("HANI-CONTENT-1215");
    }
}

/// <summary>Validation rules for message read commands.</summary>
public sealed class MarkUserMessageReadCommandValidator : AbstractValidator<MarkUserMessageReadCommand>
{
    /// <summary>Creates validation rules.</summary>
    public MarkUserMessageReadCommandValidator()
    {
        RuleFor(command => command.MessageId).NotEmpty().WithErrorCode("HANI-CONTENT-1216");
    }
}

/// <summary>Validation rules for document status commands.</summary>
public sealed class SetUserDocumentStatusCommandValidator : AbstractValidator<SetUserDocumentStatusCommand>
{
    /// <summary>Creates validation rules.</summary>
    public SetUserDocumentStatusCommandValidator()
    {
        RuleFor(command => command.DocumentId).NotEmpty().WithErrorCode("HANI-CONTENT-1217");
    }
}

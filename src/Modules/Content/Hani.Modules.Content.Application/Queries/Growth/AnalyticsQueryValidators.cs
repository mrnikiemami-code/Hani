using FluentValidation;

namespace Hani.Modules.Content.Application.Queries.Growth;

/// <summary>Validation rules for analytics summaries.</summary>
public sealed class GetAnalyticsSummaryQueryValidator : AbstractValidator<GetAnalyticsSummaryQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetAnalyticsSummaryQueryValidator()
    {
        RuleFor(query => query.EventName).MaximumLength(120)
            .When(query => query.EventName is not null)
            .WithErrorCode("HANI-GROWTH-2125");
        RuleFor(query => query.To)
            .GreaterThanOrEqualTo(query => query.From)
            .When(query => query.From is not null && query.To is not null)
            .WithErrorCode("HANI-GROWTH-2126");
    }
}

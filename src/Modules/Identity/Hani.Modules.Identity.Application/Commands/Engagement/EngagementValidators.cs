using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.Engagement;

/// <summary>
/// Validation rules for creating reviews.
/// </summary>
public sealed class CreateReviewCommandValidator : AbstractValidator<CreateReviewCommand>
{
    /// <summary>
    /// Creates validation rules for review content.
    /// </summary>
    public CreateReviewCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1510");
        RuleFor(command => command.TargetId).NotEmpty().WithErrorCode("HANI-IDENTITY-1511");
        RuleFor(command => command.Rating).InclusiveBetween(1, 5).WithErrorCode("HANI-IDENTITY-1512");
        RuleFor(command => command.Comment).NotEmpty().MaximumLength(4000).WithErrorCode("HANI-IDENTITY-1513");
        RuleFor(command => command.Photos).Must(photos => photos.Count <= 5).WithErrorCode("HANI-IDENTITY-1514");
    }
}

/// <summary>
/// Validation rules for review lists.
/// </summary>
public sealed class GetReviewsQueryValidator : AbstractValidator<GetReviewsQuery>
{
    /// <summary>
    /// Creates validation rules for review list filters.
    /// </summary>
    public GetReviewsQueryValidator()
    {
        RuleFor(query => query.TargetId).NotEmpty().WithErrorCode("HANI-IDENTITY-1511");
        RuleFor(query => query.MinRating).InclusiveBetween(1, 5)
            .When(query => query.MinRating is not null)
            .WithErrorCode("HANI-IDENTITY-1512");
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-IDENTITY-1515");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-IDENTITY-1516");
    }
}

/// <summary>
/// Validation rules for pending review lists.
/// </summary>
public sealed class GetPendingReviewsQueryValidator : AbstractValidator<GetPendingReviewsQuery>
{
    /// <summary>
    /// Creates paging rules.
    /// </summary>
    public GetPendingReviewsQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-IDENTITY-1515");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-IDENTITY-1516");
    }
}

/// <summary>
/// Validation rules for publishing a review.
/// </summary>
public sealed class PublishReviewCommandValidator : AbstractValidator<PublishReviewCommand>
{
    /// <summary>
    /// Creates validation rules for the review id.
    /// </summary>
    public PublishReviewCommandValidator()
    {
        RuleFor(command => command.ReviewId).NotEmpty().WithErrorCode("HANI-IDENTITY-1517");
    }
}

/// <summary>
/// Validation rules for rejecting a review.
/// </summary>
public sealed class RejectReviewCommandValidator : AbstractValidator<RejectReviewCommand>
{
    /// <summary>
    /// Creates validation rules for rejection.
    /// </summary>
    public RejectReviewCommandValidator()
    {
        RuleFor(command => command.ReviewId).NotEmpty().WithErrorCode("HANI-IDENTITY-1517");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-IDENTITY-1518");
    }
}

/// <summary>
/// Validation rules for helpful votes.
/// </summary>
public sealed class MarkReviewHelpfulCommandValidator : AbstractValidator<MarkReviewHelpfulCommand>
{
    /// <summary>
    /// Creates validation rules for helpful votes.
    /// </summary>
    public MarkReviewHelpfulCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1510");
        RuleFor(command => command.ReviewId).NotEmpty().WithErrorCode("HANI-IDENTITY-1517");
    }
}

/// <summary>
/// Validation rules for review reports.
/// </summary>
public sealed class ReportReviewCommandValidator : AbstractValidator<ReportReviewCommand>
{
    /// <summary>
    /// Creates validation rules for review reports.
    /// </summary>
    public ReportReviewCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1510");
        RuleFor(command => command.ReviewId).NotEmpty().WithErrorCode("HANI-IDENTITY-1517");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-IDENTITY-1518");
    }
}

/// <summary>
/// Validation rules for ownership claims.
/// </summary>
public sealed class CreateClaimCommandValidator : AbstractValidator<CreateClaimCommand>
{
    /// <summary>
    /// Creates validation rules for claims.
    /// </summary>
    public CreateClaimCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1610");
        RuleFor(command => command.TargetId).NotEmpty().WithErrorCode("HANI-IDENTITY-1611");
        RuleFor(command => command.FullName).NotEmpty().MaximumLength(200).WithErrorCode("HANI-IDENTITY-1612");
        RuleFor(command => command.Email).NotEmpty().EmailAddress().WithErrorCode("HANI-IDENTITY-1613");
        RuleFor(command => command.Message).NotEmpty().MinimumLength(10).MaximumLength(4000)
            .WithErrorCode("HANI-IDENTITY-1614");
    }
}

/// <summary>
/// Validation rules for claim lists.
/// </summary>
public sealed class GetClaimsQueryValidator : AbstractValidator<GetClaimsQuery>
{
    /// <summary>
    /// Creates paging rules.
    /// </summary>
    public GetClaimsQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-IDENTITY-1615");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-IDENTITY-1616");
    }
}

/// <summary>
/// Validation rules for approving claims.
/// </summary>
public sealed class ApproveClaimCommandValidator : AbstractValidator<ApproveClaimCommand>
{
    /// <summary>
    /// Creates validation rules for the claim id.
    /// </summary>
    public ApproveClaimCommandValidator()
    {
        RuleFor(command => command.ClaimId).NotEmpty().WithErrorCode("HANI-IDENTITY-1617");
    }
}

/// <summary>
/// Validation rules for rejecting claims.
/// </summary>
public sealed class RejectClaimCommandValidator : AbstractValidator<RejectClaimCommand>
{
    /// <summary>
    /// Creates validation rules for rejection.
    /// </summary>
    public RejectClaimCommandValidator()
    {
        RuleFor(command => command.ClaimId).NotEmpty().WithErrorCode("HANI-IDENTITY-1617");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-IDENTITY-1618");
    }
}

/// <summary>
/// Validation rules for media registration.
/// </summary>
public sealed class RegisterMediaCommandValidator : AbstractValidator<RegisterMediaCommand>
{
    /// <summary>
    /// Creates validation rules for media.
    /// </summary>
    public RegisterMediaCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1710");
        RuleFor(command => command.Url).NotEmpty().MaximumLength(1000).WithErrorCode("HANI-IDENTITY-1711");
        RuleFor(command => command.ContentType).NotEmpty().MaximumLength(100).WithErrorCode("HANI-IDENTITY-1712");
        RuleFor(command => command.SizeBytes).GreaterThan(0).LessThanOrEqualTo(20 * 1024 * 1024)
            .WithErrorCode("HANI-IDENTITY-1713");
    }
}

/// <summary>
/// Validation rules for media lists.
/// </summary>
public sealed class GetMediaQueryValidator : AbstractValidator<GetMediaQuery>
{
    /// <summary>
    /// Creates paging rules.
    /// </summary>
    public GetMediaQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-IDENTITY-1714");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-IDENTITY-1715");
    }
}

/// <summary>
/// Validation rules for approving media.
/// </summary>
public sealed class ApproveMediaCommandValidator : AbstractValidator<ApproveMediaCommand>
{
    /// <summary>
    /// Creates validation rules for the media id.
    /// </summary>
    public ApproveMediaCommandValidator()
    {
        RuleFor(command => command.MediaId).NotEmpty().WithErrorCode("HANI-IDENTITY-1716");
    }
}

/// <summary>
/// Validation rules for rejecting media.
/// </summary>
public sealed class RejectMediaCommandValidator : AbstractValidator<RejectMediaCommand>
{
    /// <summary>
    /// Creates validation rules for media rejection.
    /// </summary>
    public RejectMediaCommandValidator()
    {
        RuleFor(command => command.MediaId).NotEmpty().WithErrorCode("HANI-IDENTITY-1716");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-IDENTITY-1717");
    }
}

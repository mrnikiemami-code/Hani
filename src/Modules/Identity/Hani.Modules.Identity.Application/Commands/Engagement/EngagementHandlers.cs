using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Identity.Domain.Users;

namespace Hani.Modules.Identity.Application.Commands.Engagement;

internal sealed class CreateReviewCommandHandler(
    IReviewRepository reviews,
    IUserRepository users,
    IIdGenerator ids)
    : ICommandHandler<CreateReviewCommand, ReviewDto>
{
    public async Task<Result<ReviewDto>> Handle(
        CreateReviewCommand request,
        CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(request.UserId, cancellationToken);

        if (user is null || user.Status != UserStatus.Active)
        {
            return Result<ReviewDto>.Failure(
                Error.Unauthorized("HANI-IDENTITY-1500", "Active user is required."));
        }

        try
        {
            var review = Review.Create(
                ids,
                request.UserId,
                request.TargetType,
                request.TargetId,
                request.Rating,
                request.FoodRating,
                request.CleanlinessRating,
                request.StaffRating,
                request.EntertainmentRating,
                request.LocationRating,
                request.ValueRating,
                request.Title,
                request.Comment,
                request.TravelType,
                request.VisitDate,
                request.Photos,
                criteria: request.Criteria,
                proofType: request.ProofType,
                proofUrl: request.ProofUrl);

            await reviews.AddAsync(review, cancellationToken);
            return Result<ReviewDto>.Success(EngagementMappings.ToDto(
                review,
                user.Username,
                user.DisplayName,
                user.AvatarUrl));
        }
        catch (ArgumentException exception)
        {
            return Result<ReviewDto>.Failure(
                Error.Validation("HANI-IDENTITY-1501", exception.Message));
        }
    }
}

internal sealed class ReplyToReviewCommandHandler(IReviewRepository reviews)
    : ICommandHandler<ReplyToReviewCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ReplyToReviewCommand request,
        CancellationToken cancellationToken)
    {
        var review = await reviews.GetByIdAsync(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1502", "Review was not found."));
        }

        try
        {
            review.Reply(request.Reply);
            await reviews.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-IDENTITY-1503", exception.Message));
        }
    }
}

internal sealed class GetReviewsQueryHandler(
    IReviewRepository reviews,
    IUserRepository users)
    : IQueryHandler<GetReviewsQuery, PagedResult<ReviewDto>>
{
    public async Task<Result<PagedResult<ReviewDto>>> Handle(
        GetReviewsQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var skip = (page - 1) * pageSize;

        var items = await reviews.ListAsync(
            request.TargetType,
            request.TargetId,
            request.MinRating,
            request.Sort,
            request.From,
            request.To,
            skip,
            pageSize,
            cancellationToken);
        var total = await reviews.CountAsync(
            request.TargetType,
            request.TargetId,
            request.MinRating,
            request.From,
            request.To,
            cancellationToken);

        var authors = new Dictionary<Guid, User>();

        foreach (var userId in items.Select(review => review.UserId).Distinct())
        {
            var user = await users.GetByIdAsync(userId, cancellationToken);

            if (user is not null)
            {
                authors[userId] = user;
            }
        }

        var dtos = items
            .Select(review =>
            {
                authors.TryGetValue(review.UserId, out var author);
                return EngagementMappings.ToDto(
                    review,
                    author?.Username ?? "deleted-user",
                    author?.DisplayName ?? "Deleted user",
                    author?.AvatarUrl);
            })
            .ToArray();

        return Result<PagedResult<ReviewDto>>.Success(
            new PagedResult<ReviewDto>(dtos, page, pageSize, total));
    }
}

internal sealed class GetPendingReviewsQueryHandler(
    IReviewRepository reviews,
    IUserRepository users)
    : IQueryHandler<GetPendingReviewsQuery, PagedResult<ReviewDto>>
{
    public async Task<Result<PagedResult<ReviewDto>>> Handle(
        GetPendingReviewsQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await reviews.ListPendingAsync(
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await reviews.CountPendingAsync(cancellationToken);
        var dtos = new List<ReviewDto>(items.Count);

        foreach (var review in items)
        {
            var author = await users.GetByIdAsync(review.UserId, cancellationToken);
            dtos.Add(EngagementMappings.ToDto(
                review,
                author?.Username ?? "deleted-user",
                author?.DisplayName ?? "Deleted user",
                author?.AvatarUrl));
        }

        return Result<PagedResult<ReviewDto>>.Success(
            new PagedResult<ReviewDto>(dtos, page, pageSize, total));
    }
}

internal sealed class PublishReviewCommandHandler(IReviewRepository reviews)
    : ICommandHandler<PublishReviewCommand, bool>
{
    public async Task<Result<bool>> Handle(
        PublishReviewCommand request,
        CancellationToken cancellationToken)
    {
        var review = await reviews.GetByIdAsync(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1502", "Review was not found."));
        }

        try
        {
            review.Publish();
            await reviews.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1503", exception.Message));
        }
    }
}

internal sealed class RejectReviewCommandHandler(IReviewRepository reviews)
    : ICommandHandler<RejectReviewCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectReviewCommand request,
        CancellationToken cancellationToken)
    {
        var review = await reviews.GetByIdAsync(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1502", "Review was not found."));
        }

        try
        {
            review.Reject(request.Reason);
            await reviews.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1503", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-IDENTITY-1504", exception.Message));
        }
    }
}

internal sealed class MarkReviewHelpfulCommandHandler(
    IReviewRepository reviews,
    IIdGenerator ids)
    : ICommandHandler<MarkReviewHelpfulCommand, bool>
{
    public async Task<Result<bool>> Handle(
        MarkReviewHelpfulCommand request,
        CancellationToken cancellationToken)
    {
        var review = await reviews.GetByIdAsync(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1502", "Review was not found."));
        }

        var marked = review.MarkHelpful(ids, request.UserId);

        if (marked)
        {
            await reviews.SaveChangesAsync(cancellationToken);
        }

        return Result<bool>.Success(marked);
    }
}

internal sealed class ReportReviewCommandHandler(
    IReviewRepository reviews,
    IIdGenerator ids)
    : ICommandHandler<ReportReviewCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ReportReviewCommand request,
        CancellationToken cancellationToken)
    {
        var review = await reviews.GetByIdAsync(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1502", "Review was not found."));
        }

        try
        {
            var reported = review.Report(ids, request.UserId, request.Reason);

            if (reported)
            {
                await reviews.SaveChangesAsync(cancellationToken);
            }

            return Result<bool>.Success(reported);
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-IDENTITY-1505", exception.Message));
        }
    }
}

internal sealed class CreateClaimCommandHandler(
    IClaimRepository claims,
    IIdGenerator ids)
    : ICommandHandler<CreateClaimCommand, ClaimDto>
{
    public async Task<Result<ClaimDto>> Handle(
        CreateClaimCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var claim = OwnershipClaim.Create(
                ids,
                request.UserId,
                request.TargetType,
                request.TargetId,
                request.ClaimType,
                request.FullName,
                request.Email,
                request.Phone,
                request.Message,
                request.EvidenceUrl);

            await claims.AddAsync(claim, cancellationToken);
            return Result<ClaimDto>.Success(EngagementMappings.ToDto(claim));
        }
        catch (ArgumentException exception)
        {
            return Result<ClaimDto>.Failure(
                Error.Validation("HANI-IDENTITY-1600", exception.Message));
        }
    }
}

internal sealed class GetClaimsQueryHandler(IClaimRepository claims)
    : IQueryHandler<GetClaimsQuery, PagedResult<ClaimDto>>
{
    public async Task<Result<PagedResult<ClaimDto>>> Handle(
        GetClaimsQuery request,
        CancellationToken cancellationToken)
    {
        ClaimStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<ClaimStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<PagedResult<ClaimDto>>.Failure(
                    Error.Validation("HANI-IDENTITY-1601", "Claim status is invalid."));
            }

            status = parsed;
        }

        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await claims.ListAsync(
            status,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await claims.CountAsync(status, cancellationToken);

        return Result<PagedResult<ClaimDto>>.Success(
            new PagedResult<ClaimDto>(
                items.Select(EngagementMappings.ToDto).ToArray(),
                page,
                pageSize,
                total));
    }
}

internal sealed class ApproveClaimCommandHandler(IClaimRepository claims)
    : ICommandHandler<ApproveClaimCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ApproveClaimCommand request,
        CancellationToken cancellationToken)
    {
        var claim = await claims.GetByIdAsync(request.ClaimId, cancellationToken);

        if (claim is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1602", "Claim was not found."));
        }

        try
        {
            claim.Approve();
            await claims.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1603", exception.Message));
        }
    }
}

internal sealed class RejectClaimCommandHandler(IClaimRepository claims)
    : ICommandHandler<RejectClaimCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectClaimCommand request,
        CancellationToken cancellationToken)
    {
        var claim = await claims.GetByIdAsync(request.ClaimId, cancellationToken);

        if (claim is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1602", "Claim was not found."));
        }

        try
        {
            claim.Reject(request.Reason);
            await claims.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1603", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-IDENTITY-1604", exception.Message));
        }
    }
}

internal sealed class RegisterMediaCommandHandler(
    IMediaRepository media,
    IIdGenerator ids)
    : ICommandHandler<RegisterMediaCommand, MediaDto>
{
    public async Task<Result<MediaDto>> Handle(
        RegisterMediaCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var asset = MediaAsset.Create(
                ids,
                request.UserId,
                request.Url,
                request.ContentType,
                request.SizeBytes,
                request.Kind);

            await media.AddAsync(asset, cancellationToken);
            return Result<MediaDto>.Success(EngagementMappings.ToDto(asset));
        }
        catch (ArgumentException exception)
        {
            return Result<MediaDto>.Failure(
                Error.Validation("HANI-IDENTITY-1700", exception.Message));
        }
    }
}

internal sealed class GetMediaQueryHandler(IMediaRepository media)
    : IQueryHandler<GetMediaQuery, PagedResult<MediaDto>>
{
    public async Task<Result<PagedResult<MediaDto>>> Handle(
        GetMediaQuery request,
        CancellationToken cancellationToken)
    {
        MediaStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<MediaStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<PagedResult<MediaDto>>.Failure(
                    Error.Validation("HANI-IDENTITY-1701", "Media status is invalid."));
            }

            status = parsed;
        }

        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await media.ListAsync(
            status,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await media.CountAsync(status, cancellationToken);

        return Result<PagedResult<MediaDto>>.Success(
            new PagedResult<MediaDto>(
                items.Select(EngagementMappings.ToDto).ToArray(),
                page,
                pageSize,
                total));
    }
}

internal sealed class ApproveMediaCommandHandler(IMediaRepository media)
    : ICommandHandler<ApproveMediaCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ApproveMediaCommand request,
        CancellationToken cancellationToken)
    {
        var asset = await media.GetByIdAsync(request.MediaId, cancellationToken);

        if (asset is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1702", "Media was not found."));
        }

        try
        {
            asset.Approve();
            await media.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1703", exception.Message));
        }
    }
}

internal sealed class RejectMediaCommandHandler(IMediaRepository media)
    : ICommandHandler<RejectMediaCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectMediaCommand request,
        CancellationToken cancellationToken)
    {
        var asset = await media.GetByIdAsync(request.MediaId, cancellationToken);

        if (asset is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1702", "Media was not found."));
        }

        try
        {
            asset.Reject(request.Reason);
            await media.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1703", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-IDENTITY-1704", exception.Message));
        }
    }
}

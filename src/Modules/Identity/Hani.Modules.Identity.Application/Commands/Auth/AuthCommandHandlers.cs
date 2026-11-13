using System.Security.Cryptography;
using System.Text;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Users;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Identity.Application.Commands.Auth;

internal sealed class RequestOtpCommandHandler(
    IUserRepository users,
    IOtpCodeGenerator generator,
    IOtpCodeHasher hasher,
    IOtpSender sender,
    IOptions<OtpOptions> options,
    IIdGenerator ids)
    : ICommandHandler<RequestOtpCommand, RequestOtpResult>
{
    public async Task<Result<RequestOtpResult>> Handle(
        RequestOtpCommand request,
        CancellationToken cancellationToken)
    {
        string mobile;

        try
        {
            mobile = User.NormalizeMobile(request.Mobile);
        }
        catch (ArgumentException exception)
        {
            return Result<RequestOtpResult>.Failure(
                Error.Validation("HANI-IDENTITY-1100", exception.Message));
        }

        var user = await users.GetByMobileAsync(mobile, cancellationToken);
        var now = DateTimeOffset.UtcNow;
        var configuration = options.Value;

        if (user is not null && user.Status == UserStatus.Blocked)
        {
            return Result<RequestOtpResult>.Failure(
                Error.Conflict("HANI-IDENTITY-1101", "User is blocked."));
        }

        var recent = user?.OtpCodes
            .OrderByDescending(otp => otp.CreatedAt)
            .FirstOrDefault();

        if (recent is not null &&
            recent.CreatedAt > now.AddSeconds(-configuration.ResendCooldownSeconds))
        {
            var retryAfter = Math.Max(
                1,
                (int)Math.Ceiling((recent.CreatedAt.AddSeconds(
                    configuration.ResendCooldownSeconds) - now).TotalSeconds));

            return Result<RequestOtpResult>.Failure(
                Error.Conflict(
                    "HANI-IDENTITY-1102",
                    $"OTP was requested recently. Retry after {retryAfter} seconds."));
        }

        if (user is not null &&
            user.OtpCodes.Count(otp => otp.CreatedAt > now.AddHours(-1)) >=
            configuration.MaxRequestsPerHour)
        {
            return Result<RequestOtpResult>.Failure(
                Error.Conflict("HANI-IDENTITY-1103", "Too many OTP requests."));
        }

        if (user is null)
        {
            user = User.Create(ids, mobile, now: now);
        }

        var code = generator.Generate();
        var otp = user.AddOtp(
            ids,
            hasher.Hash(code),
            OtpPurpose.Login,
            now,
            TimeSpan.FromSeconds(configuration.LifetimeSeconds));

        if (user.Status == UserStatus.Pending)
        {
            await users.AddAsync(user, cancellationToken);
        }
        else
        {
            await users.SaveChangesAsync(cancellationToken);
        }

        await sender.SendAsync(mobile, code, cancellationToken);

        return Result<RequestOtpResult>.Success(new RequestOtpResult(
            otp.ExpiresAt,
            configuration.ResendCooldownSeconds,
            configuration.ExposeCodeInResponse ? code : null));
    }
}

internal sealed class VerifyOtpCommandHandler(
    IUserRepository users,
    IOtpCodeHasher hasher,
    IJwtTokenService tokens,
    IOptions<JwtOptions> jwtOptions,
    IIdGenerator ids)
    : ICommandHandler<VerifyOtpCommand, AuthResultDto>
{
    public async Task<Result<AuthResultDto>> Handle(
        VerifyOtpCommand request,
        CancellationToken cancellationToken)
    {
        string mobile;

        try
        {
            mobile = User.NormalizeMobile(request.Mobile);
        }
        catch (ArgumentException exception)
        {
            return Result<AuthResultDto>.Failure(
                Error.Validation("HANI-IDENTITY-1100", exception.Message));
        }

        var user = await users.GetByMobileAsync(mobile, cancellationToken);

        if (user is null)
        {
            return Result<AuthResultDto>.Failure(
                Error.Validation("HANI-IDENTITY-1104", "OTP is invalid or expired."));
        }

        var now = DateTimeOffset.UtcNow;
        var otp = user.FindActiveOtp(OtpPurpose.Login, now);

        if (otp is null)
        {
            return Result<AuthResultDto>.Failure(
                Error.Validation("HANI-IDENTITY-1104", "OTP is invalid or expired."));
        }

        var providedHash = hasher.Hash(request.Code.Trim());
        var matches = CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(otp.CodeHash),
            Encoding.UTF8.GetBytes(providedHash));

        if (!matches)
        {
            otp.RecordFailedAttempt();
            await users.SaveChangesAsync(cancellationToken);
            return Result<AuthResultDto>.Failure(
                Error.Validation("HANI-IDENTITY-1104", "OTP is invalid or expired."));
        }

        otp.Consume(now);

        try
        {
            user.Activate(now);
        }
        catch (InvalidOperationException exception)
        {
            return Result<AuthResultDto>.Failure(
                Error.Conflict("HANI-IDENTITY-1101", exception.Message));
        }

        if (!string.IsNullOrWhiteSpace(request.FirstName))
        {
            try
            {
                user.UpdateProfile(
                    request.FirstName,
                    request.LastName ?? string.Empty,
                    user.Email,
                    user.Bio,
                    user.AvatarUrl,
                    now);
            }
            catch (ArgumentException exception)
            {
                return Result<AuthResultDto>.Failure(
                    Error.Validation("HANI-IDENTITY-1105", exception.Message));
            }
        }

        var rawRefresh = tokens.CreateRefreshToken();
        var refreshHash = hasher.Hash(rawRefresh);
        user.AddRefreshToken(
            ids,
            refreshHash,
            now,
            TimeSpan.FromDays(jwtOptions.Value.RefreshTokenDays));
        await users.SaveChangesAsync(cancellationToken);

        var access = tokens.CreateAccessToken(user, now);

        return Result<AuthResultDto>.Success(new AuthResultDto(
            access.Token,
            rawRefresh,
            access.ExpiresAt,
            UserMappings.ToDto(user)));
    }
}

internal sealed class RefreshTokenCommandHandler(
    IUserRepository users,
    IOtpCodeHasher hasher,
    IJwtTokenService tokens,
    IOptions<JwtOptions> jwtOptions,
    IIdGenerator ids)
    : ICommandHandler<RefreshTokenCommand, AuthResultDto>
{
    public async Task<Result<AuthResultDto>> Handle(
        RefreshTokenCommand request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.RefreshToken))
        {
            return Result<AuthResultDto>.Failure(
                Error.Unauthorized("HANI-IDENTITY-1200", "Refresh token is required."));
        }

        var hash = hasher.Hash(request.RefreshToken.Trim());
        var user = await users.GetByRefreshTokenHashAsync(hash, cancellationToken);
        var now = DateTimeOffset.UtcNow;
        var existing = user?.FindRefreshToken(hash);

        if (user is null || existing is null || !existing.IsActive(now))
        {
            return Result<AuthResultDto>.Failure(
                Error.Unauthorized("HANI-IDENTITY-1201", "Refresh token is invalid or expired."));
        }

        var rawRefresh = tokens.CreateRefreshToken();
        var newHash = hasher.Hash(rawRefresh);
        user.RevokeRefreshToken(hash, now, newHash);
        user.AddRefreshToken(
            ids,
            newHash,
            now,
            TimeSpan.FromDays(jwtOptions.Value.RefreshTokenDays));
        await users.SaveChangesAsync(cancellationToken);

        var access = tokens.CreateAccessToken(user, now);

        return Result<AuthResultDto>.Success(new AuthResultDto(
            access.Token,
            rawRefresh,
            access.ExpiresAt,
            UserMappings.ToDto(user)));
    }
}

internal sealed class LogoutCommandHandler(
    IUserRepository users,
    IOtpCodeHasher hasher)
    : ICommandHandler<LogoutCommand, bool>
{
    public async Task<Result<bool>> Handle(
        LogoutCommand request,
        CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(request.UserId, cancellationToken);

        if (user is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1106", "User was not found."));
        }

        var revoked = user.RevokeRefreshToken(
            hasher.Hash(request.RefreshToken.Trim()),
            DateTimeOffset.UtcNow);
        await users.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(revoked);
    }
}

internal sealed class UpdateProfileCommandHandler(IUserRepository users)
    : ICommandHandler<UpdateProfileCommand, UserDto>
{
    public async Task<Result<UserDto>> Handle(
        UpdateProfileCommand request,
        CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(request.UserId, cancellationToken);

        if (user is null)
        {
            return Result<UserDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1106", "User was not found."));
        }

        try
        {
            user.UpdateProfile(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Bio,
                request.AvatarUrl,
                DateTimeOffset.UtcNow);
        }
        catch (ArgumentException exception)
        {
            return Result<UserDto>.Failure(
                Error.Validation("HANI-IDENTITY-1105", exception.Message));
        }

        await users.SaveChangesAsync(cancellationToken);
        return Result<UserDto>.Success(UserMappings.ToDto(user));
    }
}

internal sealed class ChangeUsernameCommandHandler(IUserRepository users)
    : ICommandHandler<ChangeUsernameCommand, UserDto>
{
    public async Task<Result<UserDto>> Handle(
        ChangeUsernameCommand request,
        CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(request.UserId, cancellationToken);

        if (user is null)
        {
            return Result<UserDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1106", "User was not found."));
        }

        try
        {
            user.SetUsername(request.Username, DateTimeOffset.UtcNow);
        }
        catch (ArgumentException exception)
        {
            return Result<UserDto>.Failure(
                Error.Validation("HANI-IDENTITY-1107", exception.Message));
        }

        if (await users.UsernameExistsAsync(user.Username, cancellationToken))
        {
            return Result<UserDto>.Failure(
                Error.Conflict("HANI-IDENTITY-1108", "Username is already used."));
        }

        await users.SaveChangesAsync(cancellationToken);
        return Result<UserDto>.Success(UserMappings.ToDto(user));
    }
}

internal sealed class GetMeQueryHandler(IUserRepository users)
    : IQueryHandler<GetMeQuery, UserDto>
{
    public async Task<Result<UserDto>> Handle(
        GetMeQuery request,
        CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(request.UserId, cancellationToken);

        return user is null
            ? Result<UserDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1106", "User was not found."))
            : Result<UserDto>.Success(UserMappings.ToDto(user));
    }
}

internal sealed class GetAuthorQueryHandler(IUserRepository users)
    : IQueryHandler<GetAuthorQuery, AuthorDto>
{
    public async Task<Result<AuthorDto>> Handle(
        GetAuthorQuery request,
        CancellationToken cancellationToken)
    {
        var user = await users.GetByUsernameAsync(
            request.Username.Trim().ToLowerInvariant(),
            cancellationToken);

        return user is null || user.Status == UserStatus.Blocked
            ? Result<AuthorDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1109", "Author was not found."))
            : Result<AuthorDto>.Success(UserMappings.ToAuthorDto(user));
    }
}

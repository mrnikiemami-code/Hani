using Hani.Modules.Identity.Application.Security;

namespace Hani.Modules.Identity.Infrastructure.Security;

/// <summary>
/// Process-local OTP rate-limit state. This is intentionally behind
/// <see cref="IOtpSecurityState"/>; a Redis-backed implementation can replace it
/// for multi-instance deployments without changing request handlers.
/// </summary>
internal sealed class InMemoryOtpSecurityState : IOtpSecurityState
{
    private sealed class IpState
    {
        public DateTimeOffset MobileWindowStartedAt { get; set; }
        public HashSet<string> Mobiles { get; } = new(StringComparer.Ordinal);
        public DateTimeOffset RequestWindowStartedAt { get; set; }
        public int Requests { get; set; }
        public DateTimeOffset? BlockedUntil { get; set; }
    }

    private readonly SemaphoreSlim gate = new(1, 1);
    private readonly Dictionary<string, DateTimeOffset> mobileCooldowns = new(StringComparer.Ordinal);
    private readonly Dictionary<string, List<DateTimeOffset>> mobileRequests = new(StringComparer.Ordinal);
    private readonly Dictionary<string, IpState> ipStates = new(StringComparer.Ordinal);

    public async Task<OtpRequestDecision> TryAcquireRequestAsync(
        string mobile,
        string? ipAddress,
        OtpSecurityConfig settings,
        CancellationToken cancellationToken)
    {
        await gate.WaitAsync(cancellationToken);
        try
        {
            var now = DateTimeOffset.UtcNow;
            var ipKey = string.IsNullOrWhiteSpace(ipAddress) ? "unknown" : ipAddress;

            if (mobileCooldowns.TryGetValue(mobile, out var cooldown) && cooldown > now)
            {
                return Denied(cooldown, now, OtpRequestDenial.MobileCooldown);
            }

            var ip = GetIpState(ipKey, settings, now);

            if (ip.BlockedUntil is { } blockedUntil && blockedUntil > now)
            {
                return Denied(blockedUntil, now, OtpRequestDenial.IpBlocked);
            }

            if (!ip.Mobiles.Contains(mobile) &&
                ip.Mobiles.Count >= settings.MaxMobileChangesPerIp)
            {
                ip.BlockedUntil = now.AddSeconds(settings.IpBlockSeconds);
                return new OtpRequestDecision(
                    false,
                    settings.IpBlockSeconds,
                    OtpRequestDenial.MobileChangeLimit);
            }

            if (ip.Requests >= settings.MaxIpRequestsPerWindow)
            {
                ip.BlockedUntil = now.AddSeconds(settings.IpBlockSeconds);
                return new OtpRequestDecision(
                    false,
                    settings.IpBlockSeconds,
                    OtpRequestDenial.IpRequestLimit);
            }

            if (!mobileRequests.TryGetValue(mobile, out var requests))
            {
                requests = [];
                mobileRequests[mobile] = requests;
            }

            requests.RemoveAll(createdAt => createdAt <= now.AddHours(-1));
            if (requests.Count >= settings.MaxRequestsPerHour)
            {
                var retryAt = requests[0].AddHours(1);
                return Denied(retryAt, now, OtpRequestDenial.HourlyLimit);
            }

            requests.Add(now);
            mobileCooldowns[mobile] = now.AddSeconds(settings.ResendCooldownSeconds);
            ip.Mobiles.Add(mobile);
            ip.Requests++;

            return new OtpRequestDecision(true, 0, OtpRequestDenial.None);
        }
        finally
        {
            gate.Release();
        }
    }

    public async Task ResetAsync(
        string? mobile,
        string? ipAddress,
        CancellationToken cancellationToken)
    {
        await gate.WaitAsync(cancellationToken);
        try
        {
            if (!string.IsNullOrWhiteSpace(mobile))
            {
                var normalized = mobile.Trim();
                mobileCooldowns.Remove(normalized);
                mobileRequests.Remove(normalized);
                foreach (var ip in ipStates.Values)
                {
                    ip.Mobiles.Remove(normalized);
                }
            }

            if (!string.IsNullOrWhiteSpace(ipAddress))
            {
                ipStates.Remove(ipAddress);
            }
        }
        finally
        {
            gate.Release();
        }
    }

    private IpState GetIpState(
        string ipAddress,
        OtpSecurityConfig settings,
        DateTimeOffset now)
    {
        if (!ipStates.TryGetValue(ipAddress, out var state))
        {
            state = new IpState
            {
                MobileWindowStartedAt = now,
                RequestWindowStartedAt = now
            };
            ipStates[ipAddress] = state;
            return state;
        }

        if (state.MobileWindowStartedAt.AddSeconds(
                settings.MobileChangeWindowSeconds) <= now)
        {
            state.MobileWindowStartedAt = now;
            state.Mobiles.Clear();
        }

        if (state.RequestWindowStartedAt.AddSeconds(
                settings.IpRequestWindowSeconds) <= now)
        {
            state.RequestWindowStartedAt = now;
            state.Requests = 0;
        }

        if (state.BlockedUntil is { } blockedUntil && blockedUntil <= now)
        {
            state.BlockedUntil = null;
        }

        return state;
    }

    private static OtpRequestDecision Denied(
        DateTimeOffset retryAt,
        DateTimeOffset now,
        OtpRequestDenial reason)
    {
        var seconds = Math.Max(1, (int)Math.Ceiling((retryAt - now).TotalSeconds));
        return new OtpRequestDecision(false, seconds, reason);
    }
}

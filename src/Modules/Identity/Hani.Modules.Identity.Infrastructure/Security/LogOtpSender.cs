using Hani.Modules.Identity.Application.Abstractions;
using Microsoft.Extensions.Logging;

namespace Hani.Modules.Identity.Infrastructure.Security;

/// <summary>
/// Development OTP sender that writes the code to the application log.
/// Replace with a real SMS provider before production.
/// </summary>
internal sealed class LogOtpSender(ILogger<LogOtpSender> logger) : IOtpSender
{
    public Task SendAsync(string mobile, string code, CancellationToken cancellationToken)
    {
        if (logger.IsEnabled(LogLevel.Information))
        {
            logger.LogInformation(
                "OTP generated for {MobilePrefix}***: {Code}",
                Mask(mobile),
                code);
        }

        return Task.CompletedTask;
    }

    private static string Mask(string mobile)
        => mobile.Length <= 4 ? mobile : mobile[..4];
}

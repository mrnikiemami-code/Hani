using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using Hani.Modules.Identity.Application;
using Hani.Modules.Identity.Application.Abstractions;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Identity.Infrastructure.Security;

/// <summary>
/// Cryptographically random six-digit OTP generator.
/// </summary>
internal sealed class NumericOtpCodeGenerator : IOtpCodeGenerator
{
    public string Generate()
        => RandomNumberGenerator.GetInt32(100_000, 1_000_000)
            .ToString("D6", CultureInfo.InvariantCulture);
}

/// <summary>
/// HMAC-based hasher for OTP codes and refresh tokens.
/// </summary>
internal sealed class HmacOtpCodeHasher(IOptions<OtpOptions> options) : IOtpCodeHasher
{
    public string Hash(string value)
    {
        var pepper = options.Value.Pepper;

        if (string.IsNullOrWhiteSpace(pepper))
        {
            throw new InvalidOperationException("Otp:Pepper is required.");
        }

        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(pepper));
        return Convert.ToHexString(hmac.ComputeHash(Encoding.UTF8.GetBytes(value))).ToLowerInvariant();
    }
}

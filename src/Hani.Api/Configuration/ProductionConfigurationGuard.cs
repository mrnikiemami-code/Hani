namespace Hani.Api.Configuration;

/// <summary>
/// Fails fast when a Production host still uses development secrets or
/// single-node infrastructure. Non-production environments are not validated.
/// </summary>
public static class ProductionConfigurationGuard
{
    /// <summary>Validates production-only settings and throws on unsafe defaults.</summary>
    public static void Validate(IConfiguration configuration, IHostEnvironment environment)
    {
        if (!environment.IsProduction())
        {
            return;
        }

        var errors = new List<string>();
        var signingKey = configuration["Jwt:SigningKey"] ?? string.Empty;
        if (signingKey.Length < 32 || LooksLikeDevelopmentSecret(signingKey))
        {
            errors.Add("Jwt:SigningKey must be a unique production secret of at least 32 bytes.");
        }

        if (string.IsNullOrWhiteSpace(configuration["Jwt:Issuer"]) ||
            string.IsNullOrWhiteSpace(configuration["Jwt:Audience"]))
        {
            errors.Add("Jwt:Issuer and Jwt:Audience are required.");
        }

        var pepper = configuration["Otp:Pepper"] ?? string.Empty;
        if (pepper.Length < 32 || LooksLikeDevelopmentSecret(pepper))
        {
            errors.Add("Otp:Pepper must be a unique production secret.");
        }

        if (configuration.GetValue<bool>("Otp:ExposeCodeInResponse"))
        {
            errors.Add("Otp:ExposeCodeInResponse must be false in Production.");
        }

        var paymentProvider = configuration["Payments:Provider"] ?? string.Empty;
        if (string.Equals(paymentProvider, "Mock", StringComparison.OrdinalIgnoreCase))
        {
            errors.Add("Payments:Provider must not be Mock in Production.");
        }

        var webhookSecret = configuration["Payments:WebhookSecret"] ?? string.Empty;
        if (webhookSecret.Length < 24 || LooksLikeDevelopmentSecret(webhookSecret))
        {
            errors.Add("Payments:WebhookSecret must be a unique production secret.");
        }

        var paymentBaseUrl = configuration["Payments:BaseUrl"] ?? string.Empty;
        if (!paymentBaseUrl.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
        {
            errors.Add("Payments:BaseUrl must use HTTPS in Production.");
        }

        if (string.IsNullOrWhiteSpace(configuration["Payments:ApiKey"]) ||
            string.IsNullOrWhiteSpace(configuration["Payments:PspAccountRef"]))
        {
            errors.Add("Payments:ApiKey and Payments:PspAccountRef are required.");
        }

        var connectionString = configuration.GetConnectionString("Default") ?? string.Empty;
        if (connectionString.Contains("hani_dev", StringComparison.OrdinalIgnoreCase) ||
            connectionString.Contains("Password=hani;", StringComparison.OrdinalIgnoreCase))
        {
            errors.Add("ConnectionStrings:Default still uses development credentials.");
        }

        if (string.Equals(
                configuration["AllowedHosts"],
                "*",
                StringComparison.Ordinal) ||
            string.IsNullOrWhiteSpace(configuration["AllowedHosts"]))
        {
            errors.Add("AllowedHosts must list explicit production hosts.");
        }

        if (!string.Equals(
                configuration["Cache:Provider"],
                "Redis",
                StringComparison.OrdinalIgnoreCase))
        {
            errors.Add("Cache:Provider must be Redis in Production.");
        }

        if (string.Equals(
                configuration["Messaging:Transport"],
                "InMemory",
                StringComparison.OrdinalIgnoreCase))
        {
            errors.Add("Messaging:Transport must be RabbitMq or Postgres in Production.");
        }

        if (!configuration.GetValue<bool>("Messaging:Outbox:Enabled"))
        {
            errors.Add("Messaging:Outbox:Enabled must be true in Production.");
        }

        var notificationMode = configuration["Notifications:Mode"] ?? "Log";
        if (!string.Equals(notificationMode, "Http", StringComparison.OrdinalIgnoreCase) &&
            !configuration.GetValue<bool>("Notifications:AllowLogInProduction"))
        {
            errors.Add("Notifications:Mode must be Http in Production or explicitly allow logging.");
        }

        if (string.Equals(notificationMode, "Http", StringComparison.OrdinalIgnoreCase) &&
            string.IsNullOrWhiteSpace(configuration["Notifications:EmailEndpoint"]) &&
            string.IsNullOrWhiteSpace(configuration["Notifications:SmsEndpoint"]))
        {
            errors.Add("At least one Notifications endpoint is required when Mode is Http.");
        }

        if (!(configuration["Seo:PublicBaseUrl"] ?? string.Empty)
            .StartsWith("https://", StringComparison.OrdinalIgnoreCase))
        {
            errors.Add("Seo:PublicBaseUrl must use HTTPS in Production.");
        }

        if (!(configuration["Payments:ReturnUrlBase"] ?? string.Empty)
            .StartsWith("https://", StringComparison.OrdinalIgnoreCase))
        {
            errors.Add("Payments:ReturnUrlBase must use HTTPS in Production.");
        }

        if (string.IsNullOrWhiteSpace(configuration["Storage:RootPath"]))
        {
            errors.Add("Storage:RootPath is required in Production.");
        }

        if (errors.Count > 0)
        {
            throw new InvalidOperationException(
                "Unsafe production configuration: " + string.Join(" ", errors));
        }
    }

    private static bool LooksLikeDevelopmentSecret(string value)
        => value.Contains("development", StringComparison.OrdinalIgnoreCase) ||
           value.Contains("change-before-production", StringComparison.OrdinalIgnoreCase) ||
           value.Contains("hani-dev", StringComparison.OrdinalIgnoreCase) ||
           value.Contains("hani-development", StringComparison.OrdinalIgnoreCase);
}

using System.Globalization;
using Hani.BuildingBlocks.Infrastructure.Observability;
using Serilog;
using Serilog.Events;

namespace Hani.Api.Configuration;

/// <summary>Registers structured logging for the API host.</summary>
public static class LoggingRegistration
{
    /// <summary>Configures Serilog from the Observability section.</summary>
    public static WebApplicationBuilder AddHaniLogging(this WebApplicationBuilder builder)
    {
        builder.Host.UseSerilog((context, _, configuration) =>
        {
            var options = context.Configuration
                .GetSection("Observability")
                .Get<ObservabilityOptions>() ?? new ObservabilityOptions();

            if (!options.Logging.Enabled)
            {
                configuration.MinimumLevel.Fatal();
                return;
            }

            var level = Enum.TryParse<LogEventLevel>(
                options.Logging.MinimumLevel,
                ignoreCase: true,
                out var parsed)
                ? parsed
                : LogEventLevel.Information;

            configuration
                .MinimumLevel.Is(level)
                .Enrich.FromLogContext()
                .Enrich.WithProperty("service", options.ServiceName)
                .Enrich.WithProperty("environment", options.Environment)
                .WriteTo.Console(
                    outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] [{CorrelationId}] {Message:lj}{NewLine}{Exception}",
                    formatProvider: CultureInfo.InvariantCulture);

            if (options.Logging.Sinks.Any(sink =>
                    string.Equals(sink, "Seq", StringComparison.OrdinalIgnoreCase)) &&
                !string.IsNullOrWhiteSpace(options.Logging.SeqUrl))
            {
                configuration.WriteTo.Seq(
                    options.Logging.SeqUrl,
                    formatProvider: CultureInfo.InvariantCulture);
            }
        });
        return builder;
    }
}

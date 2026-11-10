using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

namespace Hani.BuildingBlocks.Infrastructure.Observability;

public static class ObservabilityServiceCollectionExtensions
{
    public static IServiceCollection AddHaniObservability(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var section = configuration.GetSection("Observability");
        var options = section.Get<ObservabilityOptions>() ?? new ObservabilityOptions();

        services.Configure<ObservabilityOptions>(section);

        if (!options.Tracing.Enabled && !options.Metrics.Enabled)
        {
            return services;
        }

        var openTelemetry = services.AddOpenTelemetry();

        if (options.Tracing.Enabled)
        {
            openTelemetry.WithTracing(tracing => tracing
                .AddAspNetCoreInstrumentation()
                .AddHttpClientInstrumentation()
                .SetSampler(new ParentBasedSampler(
                    new TraceIdRatioBasedSampler(options.Tracing.SamplingRatio)))
                .AddOtlpExporter(exporter =>
                {
                    exporter.Endpoint = new Uri(options.Tracing.Endpoint);
                    exporter.Protocol = OtlpExportProtocol.Grpc;
                }));
        }

        if (options.Metrics.Enabled)
        {
            openTelemetry.WithMetrics(metrics => metrics
                .AddAspNetCoreInstrumentation()
                .AddHttpClientInstrumentation()
                .AddOtlpExporter(exporter =>
                {
                    exporter.Endpoint = new Uri(options.Metrics.Endpoint);
                    exporter.Protocol = OtlpExportProtocol.Grpc;
                }));
        }

        return services;
    }
}

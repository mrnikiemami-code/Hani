namespace Hani.BuildingBlocks.Infrastructure.Observability;

public sealed class ObservabilityOptions
{
    public string ServiceName { get; set; } = "Hani.Api";

    public string Environment { get; set; } = "Development";

    public LoggingOptions Logging { get; set; } = new();

    public TracingOptions Tracing { get; set; } = new();

    public MetricsOptions Metrics { get; set; } = new();
}

public sealed class LoggingOptions
{
    public bool Enabled { get; set; } = true;

    public string MinimumLevel { get; set; } = "Information";

    public List<string> Sinks { get; set; } = ["Console"];

    public string? SeqUrl { get; set; }

    public bool RedactPii { get; set; } = true;
}

public sealed class TracingOptions
{
    public bool Enabled { get; set; } = true;

    public string Endpoint { get; set; } = "http://localhost:4317";

    public double SamplingRatio { get; set; } = 0.2;
}

public sealed class MetricsOptions
{
    public bool Enabled { get; set; } = true;

    public string Endpoint { get; set; } = "http://localhost:4317";
}

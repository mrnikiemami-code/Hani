// Hani API composition root: wires modules, persistence, auth, messaging, caching, and observability.
using System.Globalization;
using FluentValidation;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Infrastructure.Caching;
using Hani.BuildingBlocks.Infrastructure.Idempotency;
using Hani.BuildingBlocks.Infrastructure.Messaging;
using Hani.BuildingBlocks.Infrastructure.Observability;
using Hani.BuildingBlocks.Infrastructure.Tenancy;
using Hani.Modules.Catalog.Application.Commands.CreateDestination;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Application.Commands.PublishTourProduct;
using Hani.Modules.Catalog.Application.Queries.GetTourProductById;
using Hani.Modules.Catalog.Infrastructure;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Catalog.Presentation;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Identity.Application.Commands.CreateApiClient;
using Hani.Modules.Identity.Application.Queries.GetAgencyById;
using Hani.Modules.Identity.Infrastructure;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Identity.Presentation;
using Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;
using Hani.Modules.Supply.Application.Commands.ArchiveAgencyOffer;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Application.Commands.CreateTourDeparture;
using Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;
using Hani.Modules.Supply.Application.Commands.SubmitAgencyOffer;
using Hani.Modules.Supply.Application.Commands.UpdateDepartureAvailability;
using Hani.Modules.Supply.Application.Commands.UpdateDeparturePrice;
using Hani.Modules.Supply.Application.Commands.UpsertAgencyOffer;
using Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;
using Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;
using Hani.Modules.Supply.Infrastructure;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Hani.Modules.Supply.Presentation;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;

// ---------------------------------------------------------------------------
// Host and structured logging
// ---------------------------------------------------------------------------
var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) =>
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
        .WriteTo.Console(formatProvider: CultureInfo.InvariantCulture);

    if (options.Logging.Sinks.Any(sink =>
            string.Equals(sink, "Seq", StringComparison.OrdinalIgnoreCase)) &&
        !string.IsNullOrWhiteSpace(options.Logging.SeqUrl))
    {
        configuration.WriteTo.Seq(
            options.Logging.SeqUrl,
            formatProvider: CultureInfo.InvariantCulture);
    }
});

// ---------------------------------------------------------------------------
// Persistence: one DbContext per module/schema
// ---------------------------------------------------------------------------
var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? "Host=localhost;Database=hani;Username=postgres;Password=postgres";

builder.Services.AddDbContext<SupplyDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<CatalogDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<IdentityDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddSupplyInfrastructure();
builder.Services.AddCatalogInfrastructure();
builder.Services.AddIdentityInfrastructure();

// ---------------------------------------------------------------------------
// Cross-cutting infrastructure: cache, messaging, tenant, idempotency, telemetry
// ---------------------------------------------------------------------------
builder.Services.AddHaniCache(builder.Configuration);
builder.Services.AddHaniObservability(builder.Configuration);
builder.Services.AddHaniMessaging<SupplyDbContext>(builder.Configuration);
builder.Services.AddSingleton<ICurrentTenant, CurrentTenant>();
builder.Services.AddSingleton<IIdempotencyStore, InMemoryIdempotencyStore>();

// ---------------------------------------------------------------------------
// CQRS: MediatR handlers + pipeline behaviors (log -> validate -> idempotency)
// ---------------------------------------------------------------------------
builder.Services.AddMediatR(configuration =>
    configuration.RegisterServicesFromAssemblies(
        typeof(CreateAgencyOfferCommand).Assembly,
        typeof(CreateTourProductCommand).Assembly,
        typeof(CreateAgencyCommand).Assembly));

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(IdempotencyBehavior<,>));

// ---------------------------------------------------------------------------
// FluentValidation validators (explicit registration keeps startup deterministic)
// ---------------------------------------------------------------------------
builder.Services.AddScoped<IValidator<CreateAgencyOfferCommand>, CreateAgencyOfferCommandValidator>();
builder.Services.AddScoped<IValidator<UpsertAgencyOfferCommand>, UpsertAgencyOfferCommandValidator>();
builder.Services.AddScoped<IValidator<SubmitAgencyOfferCommand>, SubmitAgencyOfferCommandValidator>();
builder.Services.AddScoped<IValidator<ApproveAgencyOfferCommand>, ApproveAgencyOfferCommandValidator>();
builder.Services.AddScoped<IValidator<RejectAgencyOfferCommand>, RejectAgencyOfferCommandValidator>();
builder.Services.AddScoped<IValidator<ArchiveAgencyOfferCommand>, ArchiveAgencyOfferCommandValidator>();
builder.Services.AddScoped<IValidator<GetAgencyOfferByIdQuery>, GetAgencyOfferByIdQueryValidator>();
builder.Services.AddScoped<IValidator<CreateTourDepartureCommand>, CreateTourDepartureCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateDepartureAvailabilityCommand>, UpdateDepartureAvailabilityCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateDeparturePriceCommand>, UpdateDeparturePriceCommandValidator>();
builder.Services.AddScoped<IValidator<GetDeparturesByOfferQuery>, GetDeparturesByOfferQueryValidator>();
builder.Services.AddScoped<IValidator<CreateDestinationCommand>, CreateDestinationCommandValidator>();
builder.Services.AddScoped<IValidator<CreateTourProductCommand>, CreateTourProductCommandValidator>();
builder.Services.AddScoped<IValidator<PublishTourProductCommand>, PublishTourProductCommandValidator>();
builder.Services.AddScoped<IValidator<GetTourProductByIdQuery>, GetTourProductByIdQueryValidator>();
builder.Services.AddScoped<IValidator<CreateAgencyCommand>, CreateAgencyCommandValidator>();
builder.Services.AddScoped<IValidator<CreateApiClientCommand>, CreateApiClientCommandValidator>();
builder.Services.AddScoped<IValidator<GetAgencyByIdQuery>, GetAgencyByIdQueryValidator>();

// ---------------------------------------------------------------------------
// Authentication: API key scheme for Supplier API + authorization policies
// ---------------------------------------------------------------------------
builder.Services.AddAuthentication(ApiKeyAuthenticationHandler.SchemeName)
    .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>(
        ApiKeyAuthenticationHandler.SchemeName,
        _ => { });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Supplier", policy => policy
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "supplier.write"));
});

// ---------------------------------------------------------------------------
// Localization: FA (default), EN, AR for API problem titles
// ---------------------------------------------------------------------------
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var cultureNames = new List<string> { "fa-IR", "en-US", "ar-SA" };
    var cultures = cultureNames
        .Select(culture => new CultureInfo(culture))
        .ToArray();

    options.DefaultRequestCulture = new RequestCulture("fa-IR");
    options.SupportedCultures = cultures;
    options.SupportedUICultures = cultures;
});

builder.Services.AddHealthChecks();

var app = builder.Build();

// Request pipeline: localization -> authentication -> tenant -> authorization
app.UseRequestLocalization();
app.UseAuthentication();
app.UseMiddleware<TenantMiddleware>();
app.UseAuthorization();
app.MapHealthChecks("/health");
app.MapSupplyEndpoints();
app.MapCatalogEndpoints();
app.MapIdentityEndpoints();

app.Run();

/// <summary>
/// Entry point marker used by integration tests and tooling.
/// </summary>
public partial class Program;

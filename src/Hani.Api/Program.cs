// Hani API composition root: wires modules, persistence, auth, messaging, caching, and observability.
using System.Globalization;
using System.Text;
using System.Text.Json.Serialization;
using FluentValidation;
using Hani.Api;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Infrastructure.Caching;
using Hani.BuildingBlocks.Infrastructure.Idempotency;
using Hani.BuildingBlocks.Infrastructure.Ids;
using Hani.BuildingBlocks.Infrastructure.Localization;
using Hani.BuildingBlocks.Infrastructure.Messaging;
using Hani.BuildingBlocks.Infrastructure.Observability;
using Hani.BuildingBlocks.Infrastructure.Tenancy;
using Hani.Modules.Booking.Application.Commands.CancelOrder;
using Hani.Modules.Booking.Application.Commands.CreateHold;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Application.Commands.ReleaseHold;
using Hani.Modules.Booking.Application.Commands.Requests;
using Hani.Modules.Booking.Application.Queries.GetContract;
using Hani.Modules.Booking.Application.Queries.GetOrder;
using Hani.Modules.Booking.Application.Queries.GetQuote;
using Hani.Modules.Booking.Infrastructure;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Booking.Presentation;
using Hani.Modules.Catalog.Application.Commands.CreateDestination;
using Hani.Modules.Catalog.Application.Commands.CreateFlightReference;
using Hani.Modules.Catalog.Application.Commands.CreateFlightRoute;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Application.Commands.CreatePlace;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;
using Hani.Modules.Catalog.Application.Commands.PublishTourProduct;
using Hani.Modules.Catalog.Application.Queries.GetGeoNearby;
using Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;
using Hani.Modules.Catalog.Application.Queries.GetHotelTours;
using Hani.Modules.Catalog.Application.Queries.GetPlaceBySlug;
using Hani.Modules.Catalog.Application.Queries.GetTourProductById;
using Hani.Modules.Catalog.Application.Queries.GetVisaCountry;
using Hani.Modules.Catalog.Application.Queries.SearchFlights;
using Hani.Modules.Catalog.Application.Queries.SearchHotels;
using Hani.Modules.Catalog.Application.Queries.SearchPlaces;
using Hani.Modules.Catalog.Infrastructure;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Catalog.Infrastructure.Providers;
using Hani.Modules.Catalog.Presentation;
using Hani.Modules.Content.Application.Commands.Editorial;
using Hani.Modules.Content.Infrastructure;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Content.Presentation;
using Hani.Modules.Identity.Application;
using Hani.Modules.Identity.Application.Commands.AgencyOnboarding;
using Hani.Modules.Identity.Application.Commands.Auth;
using Hani.Modules.Identity.Application.Commands.ChannelSettings;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Identity.Application.Commands.CreateApiClient;
using Hani.Modules.Identity.Application.Commands.Engagement;
using Hani.Modules.Identity.Application.Commands.Gamification;
using Hani.Modules.Identity.Application.Queries.GetAgencyById;
using Hani.Modules.Identity.Infrastructure;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Identity.Presentation;
using Hani.Modules.Marketplace.Application;
using Hani.Modules.Marketplace.Application.Queries.GetProductComparison;
using Hani.Modules.Marketplace.Application.Queries.GetProductRecommendations;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Hani.Modules.Marketplace.Application.Queries.Seo;
using Hani.Modules.Marketplace.Infrastructure;
using Hani.Modules.Marketplace.Presentation;
using Hani.Modules.Payments.Application;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Application.Commands.HandlePaymentWebhook;
using Hani.Modules.Payments.Application.Commands.RecordOfflinePayment;
using Hani.Modules.Payments.Application.Queries.GetPaymentIntent;
using Hani.Modules.Payments.Infrastructure;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Payments.Presentation;
using Hani.Modules.Settlement.Application;
using Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;
using Hani.Modules.Settlement.Application.Payouts;
using Hani.Modules.Settlement.Application.Queries.GetCommission;
using Hani.Modules.Settlement.Application.Queries.GetLedgerTransaction;
using Hani.Modules.Settlement.Infrastructure;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Hani.Modules.Settlement.Presentation;
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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;

// ---------------------------------------------------------------------------
// Host and structured logging
// ---------------------------------------------------------------------------
var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

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

// ---------------------------------------------------------------------------
// Persistence: one DbContext per module/schema
// ---------------------------------------------------------------------------
var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? "Host=localhost;Database=hani;Username=postgres;Password=postgres";

builder.Services.AddDbContext<SupplyDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<CatalogDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<ContentDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<IdentityDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<BookingDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<PaymentsDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddDbContext<SettlementDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddSupplyInfrastructure();
builder.Services.AddCatalogInfrastructure();
builder.Services.AddContentInfrastructure();
builder.Services.AddIdentityInfrastructure();
builder.Services.AddMarketplaceInfrastructure();
builder.Services.AddBookingInfrastructure();
builder.Services.AddPaymentsInfrastructure();
builder.Services.AddSettlementInfrastructure();
builder.Services.Configure<PaymentOptions>(builder.Configuration.GetSection("Payments"));
builder.Services.Configure<CommissionOptions>(builder.Configuration.GetSection("Commissions"));
builder.Services.Configure<SeoOptions>(builder.Configuration.GetSection("Seo"));
builder.Services.Configure<FlightProviderOptions>(
    builder.Configuration.GetSection("FlightProvider"));
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));
builder.Services.Configure<OtpOptions>(builder.Configuration.GetSection("Otp"));
builder.Services.Configure<TrustOptions>(builder.Configuration.GetSection("Trust"));

// ---------------------------------------------------------------------------
// Cross-cutting infrastructure: cache, messaging, tenant, idempotency, telemetry
// ---------------------------------------------------------------------------
builder.Services.AddHaniCache(builder.Configuration);
builder.Services.AddHaniObservability(builder.Configuration);
builder.Services.AddHaniMessaging<SupplyDbContext>(builder.Configuration);
builder.Services.AddSingleton<ICurrentTenant, CurrentTenant>();
builder.Services.AddSingleton<IIdempotencyStore, InMemoryIdempotencyStore>();
builder.Services.AddSingleton<IIdGenerator, Uuid7IdGenerator>();

// ---------------------------------------------------------------------------
// CQRS: MediatR handlers + pipeline behaviors (log -> validate -> idempotency)
// ---------------------------------------------------------------------------
builder.Services.AddMediatR(configuration =>
    configuration.RegisterServicesFromAssemblies(
        typeof(CreateAgencyOfferCommand).Assembly,
        typeof(CreateTourProductCommand).Assembly,
        typeof(CreateAgencyCommand).Assembly,
        typeof(SearchProductsQuery).Assembly,
        typeof(CreateQuoteCommand).Assembly,
        typeof(CreatePaymentIntentCommand).Assembly,
        typeof(CreateCommissionRuleCommand).Assembly,
        typeof(CreateCategoryCommand).Assembly));

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
builder.Services.AddScoped<IValidator<CreateHotelCommand>, CreateHotelCommandValidator>();
builder.Services.AddScoped<IValidator<GetHotelBySlugQuery>, GetHotelBySlugQueryValidator>();
builder.Services.AddScoped<IValidator<CreatePlaceCommand>, CreatePlaceCommandValidator>();
builder.Services.AddScoped<IValidator<GetPlaceBySlugQuery>, GetPlaceBySlugQueryValidator>();
builder.Services.AddScoped<IValidator<GetNearbyPlacesQuery>, GetNearbyPlacesQueryValidator>();
builder.Services.AddScoped<IValidator<GetGeoNearbyQuery>, GetGeoNearbyQueryValidator>();
builder.Services.AddScoped<IValidator<GetHotelToursQuery>, GetHotelToursQueryValidator>();
builder.Services.AddScoped<IValidator<SearchHotelsQuery>, SearchHotelsQueryValidator>();
builder.Services.AddScoped<IValidator<GetNearbyHotelsQuery>, GetNearbyHotelsQueryValidator>();
builder.Services.AddScoped<IValidator<SearchPlacesQuery>, SearchPlacesQueryValidator>();
builder.Services.AddScoped<IValidator<CreateVisaCountryCommand>, CreateVisaCountryCommandValidator>();
builder.Services.AddScoped<IValidator<GetVisaCountryQuery>, GetVisaCountryQueryValidator>();
builder.Services.AddScoped<IValidator<ListVisaCountriesQuery>, ListVisaCountriesQueryValidator>();
builder.Services.AddScoped<IValidator<CreateFlightRouteCommand>, CreateFlightRouteCommandValidator>();
builder.Services.AddScoped<IValidator<SearchFlightsQuery>, SearchFlightsQueryValidator>();
builder.Services.AddScoped<IValidator<GetFlightRouteQuery>, GetFlightRouteQueryValidator>();
builder.Services.AddScoped<IValidator<CreateAirlineCommand>, CreateAirlineCommandValidator>();
builder.Services.AddScoped<IValidator<CreateAirportCommand>, CreateAirportCommandValidator>();
builder.Services.AddScoped<IValidator<ListFlightReferencesQuery>, ListFlightReferencesQueryValidator>();
builder.Services.AddScoped<IValidator<PublishTourProductCommand>, PublishTourProductCommandValidator>();
builder.Services.AddScoped<IValidator<GetTourProductByIdQuery>, GetTourProductByIdQueryValidator>();
builder.Services.AddScoped<IValidator<CreateAgencyCommand>, CreateAgencyCommandValidator>();
builder.Services.AddScoped<IValidator<CreateApiClientCommand>, CreateApiClientCommandValidator>();
builder.Services.AddScoped<IValidator<GetAgencyByIdQuery>, GetAgencyByIdQueryValidator>();
builder.Services.AddScoped<IValidator<RequestOtpCommand>, RequestOtpCommandValidator>();
builder.Services.AddScoped<IValidator<VerifyOtpCommand>, VerifyOtpCommandValidator>();
builder.Services.AddScoped<IValidator<RefreshTokenCommand>, RefreshTokenCommandValidator>();
builder.Services.AddScoped<IValidator<LogoutCommand>, LogoutCommandValidator>();
builder.Services.AddScoped<IValidator<UpdateProfileCommand>, UpdateProfileCommandValidator>();
builder.Services.AddScoped<IValidator<ChangeUsernameCommand>, ChangeUsernameCommandValidator>();
builder.Services.AddScoped<IValidator<GetMeQuery>, GetMeQueryValidator>();
builder.Services.AddScoped<IValidator<GetAuthorQuery>, GetAuthorQueryValidator>();
builder.Services.AddScoped<IValidator<CreateAgencyOnboardingCommand>, CreateAgencyOnboardingCommandValidator>();
builder.Services.AddScoped<IValidator<GetMyAgencyQuery>, GetMyAgencyQueryValidator>();
builder.Services.AddScoped<IValidator<GetPublicAgencyQuery>, GetPublicAgencyQueryValidator>();
builder.Services.AddScoped<IValidator<ListAgenciesQuery>, ListAgenciesQueryValidator>();
builder.Services.AddScoped<IValidator<ApproveAgencyCommand>, ApproveAgencyCommandValidator>();
builder.Services.AddScoped<IValidator<RejectAgencyCommand>, RejectAgencyCommandValidator>();
builder.Services.AddScoped<IValidator<CreateReviewCommand>, CreateReviewCommandValidator>();
builder.Services.AddScoped<IValidator<ConfigureChannelSettingsCommand>, ConfigureChannelSettingsCommandValidator>();
builder.Services.AddScoped<IValidator<ConfigureChannelWebhookCommand>, ConfigureChannelWebhookCommandValidator>();
builder.Services.AddScoped<IValidator<AwardPointsCommand>, AwardPointsCommandValidator>();
builder.Services.AddScoped<IValidator<SetTravelStyleCommand>, SetTravelStyleCommandValidator>();
builder.Services.AddScoped<IValidator<CreateBadgeDefinitionCommand>, CreateBadgeDefinitionCommandValidator>();
builder.Services.AddScoped<IValidator<AwardBadgeCommand>, AwardBadgeCommandValidator>();
builder.Services.AddScoped<IValidator<GetUserGamificationQuery>, GetUserGamificationQueryValidator>();
builder.Services.AddScoped<IValidator<ListBadgeDefinitionsQuery>, ListBadgeDefinitionsQueryValidator>();
builder.Services.AddScoped<IValidator<ReplyToReviewCommand>, ReplyToReviewCommandValidator>();
builder.Services.AddScoped<IValidator<GetReviewsQuery>, GetReviewsQueryValidator>();
builder.Services.AddScoped<IValidator<GetPendingReviewsQuery>, GetPendingReviewsQueryValidator>();
builder.Services.AddScoped<IValidator<PublishReviewCommand>, PublishReviewCommandValidator>();
builder.Services.AddScoped<IValidator<RejectReviewCommand>, RejectReviewCommandValidator>();
builder.Services.AddScoped<IValidator<MarkReviewHelpfulCommand>, MarkReviewHelpfulCommandValidator>();
builder.Services.AddScoped<IValidator<ReportReviewCommand>, ReportReviewCommandValidator>();
builder.Services.AddScoped<IValidator<CreateClaimCommand>, CreateClaimCommandValidator>();
builder.Services.AddScoped<IValidator<GetClaimsQuery>, GetClaimsQueryValidator>();
builder.Services.AddScoped<IValidator<ApproveClaimCommand>, ApproveClaimCommandValidator>();
builder.Services.AddScoped<IValidator<RejectClaimCommand>, RejectClaimCommandValidator>();
builder.Services.AddScoped<IValidator<RegisterMediaCommand>, RegisterMediaCommandValidator>();
builder.Services.AddScoped<IValidator<GetMediaQuery>, GetMediaQueryValidator>();
builder.Services.AddScoped<IValidator<ApproveMediaCommand>, ApproveMediaCommandValidator>();
builder.Services.AddScoped<IValidator<RejectMediaCommand>, RejectMediaCommandValidator>();
builder.Services.AddScoped<IValidator<SearchProductsQuery>, SearchProductsQueryValidator>();
builder.Services.AddScoped<IValidator<GetProductSeoQuery>, GetProductSeoQueryValidator>();
builder.Services.AddScoped<IValidator<GetLandingSeoQuery>, GetLandingSeoQueryValidator>();
builder.Services.AddScoped<IValidator<GetVerticalSeoQuery>, GetVerticalSeoQueryValidator>();
builder.Services.AddScoped<IValidator<GetVerticalLandingSeoQuery>, GetVerticalLandingSeoQueryValidator>();
builder.Services.AddScoped<IValidator<GetSitemapQuery>, GetSitemapQueryValidator>();
builder.Services.AddScoped<IValidator<GetRobotsQuery>, GetRobotsQueryValidator>();
builder.Services.AddScoped<IValidator<GetProductComparisonQuery>, GetProductComparisonQueryValidator>();
builder.Services.AddScoped<IValidator<GetProductRecommendationsQuery>, GetProductRecommendationsQueryValidator>();
builder.Services.AddScoped<IValidator<CreateQuoteCommand>, CreateQuoteCommandValidator>();
builder.Services.AddScoped<IValidator<CreateHoldCommand>, CreateHoldCommandValidator>();
builder.Services.AddScoped<IValidator<CancelOrderCommand>, CancelOrderCommandValidator>();
builder.Services.AddScoped<IValidator<ReleaseHoldCommand>, ReleaseHoldCommandValidator>();
builder.Services.AddScoped<IValidator<GetQuoteQuery>, GetQuoteQueryValidator>();
builder.Services.AddScoped<IValidator<CreateOrderCommand>, CreateOrderCommandValidator>();
builder.Services.AddScoped<IValidator<GetOrderQuery>, GetOrderQueryValidator>();
builder.Services.AddScoped<IValidator<GetContractQuery>, GetContractQueryValidator>();
builder.Services.AddScoped<IValidator<CreateReservationRequestCommand>, CreateReservationRequestCommandValidator>();
builder.Services.AddScoped<IValidator<GetReservationRequestQuery>, GetReservationRequestQueryValidator>();
builder.Services.AddScoped<IValidator<ListReservationRequestsQuery>, ListReservationRequestsQueryValidator>();
builder.Services.AddScoped<IValidator<CreateHotelInquiryCommand>, CreateHotelInquiryCommandValidator>();
builder.Services.AddScoped<IValidator<GetHotelInquiryQuery>, GetHotelInquiryQueryValidator>();
builder.Services.AddScoped<IValidator<ListHotelInquiriesQuery>, ListHotelInquiriesQueryValidator>();
builder.Services.AddScoped<IValidator<RespondHotelInquiryCommand>, RespondHotelInquiryCommandValidator>();
builder.Services.AddScoped<IValidator<CreateRestaurantReservationCommand>, CreateRestaurantReservationCommandValidator>();
builder.Services.AddScoped<IValidator<GetRestaurantReservationQuery>, GetRestaurantReservationQueryValidator>();
builder.Services.AddScoped<IValidator<ListRestaurantReservationsQuery>, ListRestaurantReservationsQueryValidator>();
builder.Services.AddScoped<IValidator<ConfirmRestaurantReservationCommand>, ConfirmRestaurantReservationCommandValidator>();
builder.Services.AddScoped<IValidator<RejectRestaurantReservationCommand>, RejectRestaurantReservationCommandValidator>();
builder.Services.AddScoped<IValidator<CreateVisaApplicationCommand>, CreateVisaApplicationCommandValidator>();
builder.Services.AddScoped<IValidator<GetVisaApplicationQuery>, GetVisaApplicationQueryValidator>();
builder.Services.AddScoped<IValidator<ListVisaApplicationsQuery>, ListVisaApplicationsQueryValidator>();
builder.Services.AddScoped<IValidator<UpdateVisaApplicationStatusCommand>, UpdateVisaApplicationStatusCommandValidator>();
builder.Services.AddScoped<IValidator<ConfirmReservationRequestCommand>, ConfirmReservationRequestCommandValidator>();
builder.Services.AddScoped<IValidator<RejectReservationRequestCommand>, RejectReservationRequestCommandValidator>();
builder.Services.AddScoped<IValidator<AcceptReservationRequestCommand>, AcceptReservationRequestCommandValidator>();
builder.Services.AddScoped<IValidator<CreateLeadCommand>, CreateLeadCommandValidator>();
builder.Services.AddScoped<IValidator<GetLeadQuery>, GetLeadQueryValidator>();
builder.Services.AddScoped<IValidator<ListLeadsQuery>, ListLeadsQueryValidator>();
builder.Services.AddScoped<IValidator<MatchLeadCommand>, MatchLeadCommandValidator>();
builder.Services.AddScoped<IValidator<DistributeLeadCommand>, DistributeLeadCommandValidator>();
builder.Services.AddScoped<IValidator<CloseLeadCommand>, CloseLeadCommandValidator>();
builder.Services.AddScoped<IValidator<CreatePriceDiscrepancyCommand>, CreatePriceDiscrepancyCommandValidator>();
builder.Services.AddScoped<IValidator<ListPriceDiscrepanciesQuery>, ListPriceDiscrepanciesQueryValidator>();
builder.Services.AddScoped<IValidator<ResolvePriceDiscrepancyCommand>, ResolvePriceDiscrepancyCommandValidator>();
builder.Services.AddScoped<IValidator<CreateInstallmentPlanCommand>, CreateInstallmentPlanCommandValidator>();
builder.Services.AddScoped<IValidator<GetInstallmentPlanQuery>, GetInstallmentPlanQueryValidator>();
builder.Services.AddScoped<IValidator<PayInstallmentCommand>, PayInstallmentCommandValidator>();
builder.Services.AddScoped<IValidator<CreatePaymentIntentCommand>, CreatePaymentIntentCommandValidator>();
builder.Services.AddScoped<IValidator<GetPaymentIntentQuery>, GetPaymentIntentQueryValidator>();
builder.Services.AddScoped<IValidator<HandlePaymentWebhookCommand>, HandlePaymentWebhookCommandValidator>();
builder.Services.AddScoped<IValidator<RecordOfflinePaymentCommand>, RecordOfflinePaymentCommandValidator>();
builder.Services.AddScoped<IValidator<RequestRefundCommand>, RequestRefundCommandValidator>();
builder.Services.AddScoped<IValidator<ProcessRefundCommand>, ProcessRefundCommandValidator>();
builder.Services.AddScoped<IValidator<CreateInvoiceCommand>, CreateInvoiceCommandValidator>();
builder.Services.AddScoped<IValidator<SendInvoiceReminderCommand>, SendInvoiceReminderCommandValidator>();
builder.Services.AddScoped<IValidator<OpenChargebackCommand>, OpenChargebackCommandValidator>();
builder.Services.AddScoped<IValidator<ResolveChargebackCommand>, ResolveChargebackCommandValidator>();
builder.Services.AddScoped<IValidator<CreateReconciliationCommand>, CreateReconciliationCommandValidator>();
builder.Services.AddScoped<IValidator<GetRefundQuery>, GetRefundQueryValidator>();
builder.Services.AddScoped<IValidator<GetInvoiceQuery>, GetInvoiceQueryValidator>();
builder.Services.AddScoped<IValidator<ListRefundsQuery>, ListRefundsQueryValidator>();
builder.Services.AddScoped<IValidator<CreateCommissionRuleCommand>, CreateCommissionRuleCommandValidator>();
builder.Services.AddScoped<IValidator<GetCommissionQuery>, GetCommissionQueryValidator>();
builder.Services.AddScoped<IValidator<GetLedgerTransactionQuery>, GetLedgerTransactionQueryValidator>();
builder.Services.AddScoped<IValidator<CreateSettlementTermsCommand>, CreateSettlementTermsCommandValidator>();
builder.Services.AddScoped<IValidator<CreatePayoutCommand>, CreatePayoutCommandValidator>();
builder.Services.AddScoped<IValidator<MarkPayoutPaidCommand>, MarkPayoutPaidCommandValidator>();
builder.Services.AddScoped<IValidator<GetSettlementTermsQuery>, GetSettlementTermsQueryValidator>();
builder.Services.AddScoped<IValidator<ListPayoutsQuery>, ListPayoutsQueryValidator>();

// Content module validators are registered by convention from the module assembly.
foreach (var validatorType in typeof(CreateCategoryCommand).Assembly
             .GetTypes()
             .Where(type => !type.IsAbstract && !type.IsGenericTypeDefinition))
{
    foreach (var contract in validatorType.GetInterfaces().Where(type =>
                 type.IsGenericType &&
                 type.GetGenericTypeDefinition() == typeof(IValidator<>)))
    {
        builder.Services.AddScoped(contract, validatorType);
    }
}

// ---------------------------------------------------------------------------
// Authentication: JWT for marketplace users + API key scheme for Supplier API
// ---------------------------------------------------------------------------
var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JwtOptions>() ?? new JwtOptions();

if (string.IsNullOrWhiteSpace(jwtOptions.SigningKey) ||
    Encoding.UTF8.GetByteCount(jwtOptions.SigningKey) < 32)
{
    throw new InvalidOperationException("Jwt:SigningKey must be at least 32 bytes.");
}

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = "HaniAuth";
        options.DefaultChallengeScheme = "HaniAuth";
    })
    .AddPolicyScheme("HaniAuth", "HaniAuth", options =>
    {
        options.ForwardDefaultSelector = context =>
            context.Request.Headers.ContainsKey("X-Api-Key")
                ? ApiKeyAuthenticationHandler.SchemeName
                : JwtBearerDefaults.AuthenticationScheme;
    })
    .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>(
        ApiKeyAuthenticationHandler.SchemeName,
        _ => { })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtOptions.SigningKey)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Supplier", policy => policy
        .AddAuthenticationSchemes(ApiKeyAuthenticationHandler.SchemeName)
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "supplier.write"));

    options.AddPolicy("User", policy => policy.RequireAuthenticatedUser());

    options.AddPolicy("Channel", policy => policy
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .RequireAssertion(context => context.User
            .FindAll("scope")
            .Any(claim => claim.Value.StartsWith("channel.", StringComparison.OrdinalIgnoreCase))));

    options.AddPolicy("ChannelFinance", policy => policy
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "channel.finance.read"));

    options.AddPolicy("ChannelCatalog", policy => policy
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "channel.catalog.read"));

    options.AddPolicy("ChannelBookingRead", policy => policy
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "channel.booking.read"));

    options.AddPolicy("ChannelBookingWrite", policy => policy
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "channel.booking.write"));
});

// ---------------------------------------------------------------------------
// Localization: languages and problem titles are configuration-driven
// ---------------------------------------------------------------------------
var localizationOptions = builder.Configuration
    .GetSection("Localization")
    .Get<LocalizationOptions>() ?? new LocalizationOptions();

if (localizationOptions.SupportedCultures is not { Count: > 0 } ||
    string.IsNullOrWhiteSpace(localizationOptions.DefaultCulture))
{
    throw new InvalidOperationException(
        "Localization configuration is required: configure Localization:SupportedCultures and Localization:DefaultCulture.");
}

ProblemDetailsLocalizer.Configure(localizationOptions);
builder.Services.Configure<LocalizationOptions>(
    builder.Configuration.GetSection("Localization"));
builder.Services.AddSingleton<ILanguageCatalog, LanguageCatalog>();

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var cultures = localizationOptions.SupportedCultures
        .Select(culture => new CultureInfo(culture))
        .ToArray();

    options.DefaultRequestCulture = new RequestCulture(localizationOptions.DefaultCulture);
    options.SupportedCultures = cultures;
    options.SupportedUICultures = cultures;
});

builder.Services.AddHealthChecks();
builder.Services.AddExceptionHandler<HaniExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

// Request pipeline: correlation -> exception -> localization -> auth -> tenant -> authorization
app.UseMiddleware<CorrelationIdMiddleware>();
app.UseExceptionHandler();
app.UseRequestLocalization();
app.UseAuthentication();
app.UseMiddleware<TenantMiddleware>();
app.UseStatusCodePages(async context =>
{
    var httpContext = context.HttpContext;

    if (httpContext.Response.HasStarted)
    {
        return;
    }

    var problem = HaniProblemDetails.Create(httpContext, httpContext.Response.StatusCode);
    await HaniProblemDetails.WriteAsync(httpContext, problem);
});
app.UseAuthorization();
app.MapHealthChecks("/health");
app.MapSupplyEndpoints();
app.MapCatalogEndpoints();
app.MapContentEndpoints();
app.MapIdentityEndpoints();
app.MapGamificationEndpoints();
app.MapIdentityAuthEndpoints();
app.MapChannelAuthEndpoints();
app.MapChannelSettingsEndpoints();
app.MapAgencyOnboardingEndpoints();
app.MapEngagementEndpoints();
app.MapTrustEndpoints();
app.MapMarketplaceEndpoints();
app.MapChannelEndpoints();
app.MapDashboardEndpoints();
app.MapBookingEndpoints();
app.MapRequestEndpoints();
app.MapPaymentEndpoints();
app.MapSettlementEndpoints();

app.Run();

/// <summary>
/// Entry point marker used by integration tests and tooling.
/// </summary>
public partial class Program;

using FluentValidation;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;
using Hani.Modules.Supply.Infrastructure;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Hani.Modules.Supply.Presentation;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? "Host=localhost;Database=hani;Username=postgres;Password=postgres";

builder.Services.AddDbContext<SupplyDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddSupplyInfrastructure();

builder.Services.AddMediatR(configuration =>
    configuration.RegisterServicesFromAssembly(typeof(CreateAgencyOfferCommand).Assembly));

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

builder.Services.AddScoped<IValidator<CreateAgencyOfferCommand>, CreateAgencyOfferCommandValidator>();
builder.Services.AddScoped<IValidator<GetAgencyOfferByIdQuery>, GetAgencyOfferByIdQueryValidator>();

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/health");
app.MapSupplyEndpoints();

app.Run();

public partial class Program;

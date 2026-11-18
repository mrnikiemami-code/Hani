# API Composition Root Contract

- **Status:** Mandatory
- **Scope:** `src/Hani.Api`
- **Related:** `AGENTS.md`, `docs/reports/architecture-review-endpoint-db-access.md`

## 1. Rule

`Program.cs` is a **thin composition root**. It may contain only:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.AddHaniApi();

var app = builder.Build();
app.UseHaniApi();
app.Run();

public partial class Program;
```

It must not contain:

- `AddDbContext`, `AddScoped`, `AddSingleton`, `AddTransient`
- authentication/authorization configuration
- localization configuration
- rate limiting or health check registration
- `UseMiddleware` or the request pipeline
- endpoint mapping
- business logic or persistence queries

## 2. Folder Contract

```text
src/Hani.Api/
  Program.cs                    thin composition root
  Configuration/                service registration extensions
  Pipeline/                     middleware and request pipeline extensions
  Endpoints/                    endpoint registration
  Endpoints/Admin/              admin endpoint files
  Endpoints/Public/             public endpoint files
  Endpoints/Channel/            channel endpoint files
  Middleware/                   API-specific middleware
  Health/                       health checks
  Auditing/                     HTTP actor/audit adapters
```

## 3. Registration Rules

- Each service area gets one extension class under `Configuration/`.
- `HaniApiBuilderExtensions.AddHaniApi` is the only aggregate entry point.
- Validators are registered by assembly convention; do not paste 100
  `AddScoped<IValidator<...>>` lines into `Program.cs`.
- Endpoint mapping lives in `Endpoints/EndpointRegistration.cs` and is
  grouped by admin/public/channel/module ownership.
- The request pipeline lives in `Pipeline/HaniApiPipelineExtensions.cs`.
- A new module must add its infrastructure registration to
  `PersistenceRegistration` and its endpoints to `EndpointRegistration`.

## 4. Enforcement

`tests/Hani.ArchitectureTests/ProgramCompositionTests.cs` fails when:

- `Program.cs` contains service registration or middleware calls
- the required composition files are missing
- endpoint registration is moved back into `Program.cs`

`EndpointDbContextRatchetTests` separately fails when an endpoint injects a
`DbContext` or references EF Core.

## 5. Review Checklist

- [ ] `Program.cs` remains under ~15 lines.
- [ ] No `DbContext` in `Endpoints/**`.
- [ ] No `AddScoped`/`AddSingleton` in `Program.cs`.
- [ ] New middleware is in `Middleware/` and registered in `Pipeline/`.
- [ ] New endpoint files are in `Endpoints/{Admin|Public|Channel}/`.
- [ ] `MapHaniEndpoints` is the only endpoint aggregation point.
- [ ] `verify.ps1` is green.

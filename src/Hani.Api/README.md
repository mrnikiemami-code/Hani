# Hani API Host

## Composition root

`Program.cs` is intentionally tiny:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.AddHaniApi();

var app = builder.Build();
app.UseHaniApi();
app.Run();

public partial class Program;
```

## Folder layout

```text
src/Hani.Api/
  Configuration/        service registration extensions
  Pipeline/             request pipeline extension
  Endpoints/            endpoint registration
  Endpoints/Admin/      admin endpoint files
  Endpoints/Public/     public endpoint files
  Endpoints/Channel/    channel endpoint files
  Middleware/           API-specific middleware
  Health/               health checks
  Auditing/             HTTP actor/audit adapters
```

## Rules

- Do not add `AddScoped`/`AddDbContext`/auth/localization/rate limiting to
  `Program.cs`.
- Add service registrations under `Configuration/`.
- Add middleware under `Middleware/` and register it in `Pipeline/`.
- Add endpoint files under `Endpoints/{Admin|Public|Channel}/` and map them
  in `Endpoints/EndpointRegistration.cs`.
- Do not inject `DbContext` into endpoints.
- Read `docs/architecture/API-COMPOSITION-ROOT.md`.

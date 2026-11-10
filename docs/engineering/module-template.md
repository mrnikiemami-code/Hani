# قالب ماژول (Module Template)

> هر ماژول جدید **فقط** از این قالب ساخته می‌شود. ساختار متفاوت = rejection در review.

---

## ۱. درخت استاندارد

```
src/Modules/{Module}/
├─ TravelCore.Modules.{Module}.Domain/
│  ├─ TravelCore.Modules.{Module}.Domain.csproj
│  ├─ {Aggregate}/
│  │  ├─ {Aggregate}.cs
│  │  ├─ {Aggregate}Id.cs
│  │  └─ {Aggregate}Status.cs
│  ├─ Events/
│  │  └─ {Aggregate}{PastTense}DomainEvent.cs
│  ├─ ValueObjects/
│  └─ Abstractions/
│
├─ TravelCore.Modules.{Module}.Application/
│  ├─ TravelCore.Modules.{Module}.Application.csproj
│  ├─ Abstractions/
│  │  └─ I{Aggregate}Repository.cs
│  ├─ Commands/
│  │  └─ {UseCase}/
│  │     ├─ {UseCase}Command.cs
│  │     ├─ {UseCase}CommandHandler.cs
│  │     ├─ {UseCase}CommandValidator.cs
│  │     └─ {UseCase}Result.cs
│  ├─ Queries/
│  │  └─ {UseCase}/
│  │     ├─ {UseCase}Query.cs
│  │     ├─ {UseCase}QueryHandler.cs
│  │     ├─ {UseCase}QueryValidator.cs
│  │     └─ {UseCase}Dto.cs
│  ├─ Common/
│  │  ├─ Dtos/
│  │  └─ Mappings/
│  └─ DependencyInjection.cs
│
├─ TravelCore.Modules.{Module}.Infrastructure/
│  ├─ TravelCore.Modules.{Module}.Infrastructure.csproj
│  ├─ Persistence/
│  │  ├─ {Module}DbContext.cs
│  │  ├─ Configurations/
│  │  │  └─ {Aggregate}Configuration.cs
│  │  └─ Migrations/
│  ├─ Repositories/
│  │  └─ {Aggregate}Repository.cs
│  ├─ ReadServices/
│  │  └─ {UseCase}ReadService.cs
│  └─ DependencyInjection.cs
│
└─ TravelCore.Modules.{Module}.Presentation/
   ├─ TravelCore.Modules.{Module}.Presentation.csproj
   ├─ Supplier/
   │  ├─ {UseCase}Endpoint.cs
   │  └─ Contracts/
   ├─ Channel/
   │  ├─ {UseCase}Endpoint.cs
   │  └─ Contracts/
   ├─ Marketplace/
   │  ├─ {UseCase}Endpoint.cs
   │  └─ Contracts/
   └─ DependencyInjection.cs
```

## ۲. قالب پروژه‌ها

### Domain.csproj

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <RootNamespace>TravelCore.Modules.{Module}.Domain</RootNamespace>
  </PropertyGroup>
  <ItemGroup>
    <ProjectReference Include="..\..\..\TravelCore.BuildingBlocks\TravelCore.BuildingBlocks.Domain\TravelCore.BuildingBlocks.Domain.csproj" />
  </ItemGroup>
</Project>
```

### Application.csproj

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <RootNamespace>TravelCore.Modules.{Module}.Application</RootNamespace>
  </PropertyGroup>
  <ItemGroup>
    <ProjectReference Include="..\TravelCore.Modules.{Module}.Domain\TravelCore.Modules.{Module}.Domain.csproj" />
    <ProjectReference Include="..\..\..\TravelCore.BuildingBlocks\TravelCore.BuildingBlocks.Application\TravelCore.BuildingBlocks.Application.csproj" />
    <ProjectReference Include="..\..\..\TravelCore.Contracts\TravelCore.Contracts.{Module}\TravelCore.Contracts.{Module}.csproj" />
  </ItemGroup>
</Project>
```

### Infrastructure.csproj

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <RootNamespace>TravelCore.Modules.{Module}.Infrastructure</RootNamespace>
  </PropertyGroup>
  <ItemGroup>
    <ProjectReference Include="..\TravelCore.Modules.{Module}.Application\TravelCore.Modules.{Module}.Application.csproj" />
    <ProjectReference Include="..\..\..\TravelCore.BuildingBlocks\TravelCore.BuildingBlocks.Infrastructure\TravelCore.BuildingBlocks.Infrastructure.csproj" />
  </ItemGroup>
</Project>
```

### Presentation.csproj

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <RootNamespace>TravelCore.Modules.{Module}.Presentation</RootNamespace>
  </PropertyGroup>
  <ItemGroup>
    <ProjectReference Include="..\TravelCore.Modules.{Module}.Application\TravelCore.Modules.{Module}.Application.csproj" />
    <ProjectReference Include="..\..\..\TravelCore.BuildingBlocks\TravelCore.BuildingBlocks.AspNetCore\TravelCore.BuildingBlocks.AspNetCore.csproj" />
  </ItemGroup>
</Project>
```

## ۳. فایل‌های اجباری

| فایل | مسئولیت |
|---|---|
| `DependencyInjection.cs` | ثبت سرویس‌های همان لایه |
| `{Module}DbContext.cs` | Schema و DbSetها |
| `{Aggregate}Configuration.cs` | Mapping و Index |
| `{UseCase}CommandValidator.cs` | اعتبارسنجی |
| `ModuleInfo.cs` (اختیاری) | نام/Schema/نسخه برای Drift Report |

## ۴. قواعد نام‌گذاری

| مورد | قاعده | مثال |
|---|---|---|
| Command | `{Verb}{Aggregate}Command` | `PublishAgencyOfferCommand` |
| Query | `Get{Aggregate}Query` / `Search{Aggregate}Query` | `GetAgencyOffersQuery` |
| Handler | `{Command}Handler` | `PublishAgencyOfferCommandHandler` |
| Validator | `{Command}Validator` | `PublishAgencyOfferCommandValidator` |
| Endpoint | `{Verb}{Aggregate}Endpoint` | `PublishAgencyOfferEndpoint` |
| DTO | `{Aggregate}Dto` | `AgencyOfferDto` |
| Domain Event | `{Aggregate}{Past}DomainEvent` | `AgencyOfferPublishedDomainEvent` |
| Integration Event | `{Aggregate}{Past}IntegrationEvent` | `AgencyOfferPublishedIntegrationEvent` |
| جدول | `snake_case` جمع | `agency_offers` |
| Schema | نام ماژول | `supply` |
| Index | `ix_{table}_{cols}` | `ix_agency_offers_agency_id` |

## ۵. اسکلت Handler

```csharp
internal sealed class PublishAgencyOfferCommandHandler
    : ICommandHandler<PublishAgencyOfferCommand, Guid>
{
    private readonly IAgencyOfferRepository _offers;
    private readonly IUnitOfWork _uow;

    public PublishAgencyOfferCommandHandler(
        IAgencyOfferRepository offers,
        IUnitOfWork uow)
    {
        _offers = offers;
        _uow = uow;
    }

    public async Task<Result<Guid>> Handle(
        PublishAgencyOfferCommand request,
        CancellationToken ct)
    {
        var offer = await _offers.GetAsync(
            new AgencyOfferId(request.OfferId), ct);

        if (offer is null)
            return Result<Guid>.Failure(
                Error.NotFound("OFFER_NOT_FOUND"));

        offer.Publish(request.ActorId);
        await _uow.SaveChangesAsync(ct);

        return Result<Guid>.Success(offer.Id.Value);
    }
}
```

## ۶. اسکلت Endpoint

```csharp
internal static class PublishAgencyOfferEndpoint
{
    public static IEndpointRouteBuilder MapPublishAgencyOffer(
        this IEndpointRouteBuilder app)
    {
        app.MapPost("/channel/v1/offers/{offerId:guid}/publish",
            async (Guid offerId, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(
                    new PublishAgencyOfferCommand(offerId), ct);

                return result.IsSuccess
                    ? Results.Ok(result.Value)
                    : result.Error!.ToProblemDetails();
            })
            .WithName("Channel.PublishAgencyOffer")
            .WithTags("Channel")
            .RequireAuthorization("channel.booking.write")
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict);

        return app;
    }
}
```

## ۷. چک‌لیست ماژول جدید

- [ ] نام ماژول در `Modules` ثبت شد
- [ ] ۴ پروژه ساخته شد
- [ ] Project Referenceها فقط مطابق قاعده است
- [ ] Schema در `bootstrap.sql` اضافه شد
- [ ] DbContext + Configuration + Migration
- [ ] یک Command + Handler + Validator
- [ ] یک Query + Handler + Validator
- [ ] یک Endpoint در سطح درست (Supplier/Channel/Marketplace)
- [ ] تست Unit + Integration
- [ ] ArchitectureTests سبز
- [ ] `scripts/verify.ps1` سبز

## ۸. تولید خودکار

```powershell
dotnet new travelcore-module -n Supply -s supply
```

یا موقتاً:

```powershell
.\scripts\new-module.ps1 -Name Supply -Schema supply
```

> تا زمانی که قالب‌ساز آماده نشده، کپی دستی از این سند مجاز است؛ ولی ساختار باید مو‌به‌مو یکسان باشد.

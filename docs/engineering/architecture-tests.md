# تست‌های معماری (Architecture Tests)

> این تست‌ها **اجرایی** هستند و در CI باید سبز باشند. هر تست یک قاعده از `architecture-governance.md` را تضمین می‌کند.

---

## ۱. پروژه

```
tests/Hani.ArchitectureTests/
├─ Hani.ArchitectureTests.csproj
├─ ModuleBoundaryTests.cs
├─ LayerDependencyTests.cs
├─ CqrsConventionTests.cs
├─ NamingConventionTests.cs
└─ TestAssembly.cs
```

پکیج‌ها:

```xml
<PackageReference Include="NetArchTest.Rules" Version="1.3.2" />
<PackageReference Include="xunit" Version="2.9.3" />
<PackageReference Include="Shouldly" Version="4.3.0" />
```

> NetArchTest.Rules (MIT) انتخاب شده؛ ArchUnitNET جایگزین قابل بررسی است.

---

## ۲. مرز ماژول‌ها

```csharp
public sealed class ModuleBoundaryTests
{
    private static readonly Assembly[] ModuleAssemblies =
    {
        typeof(Hani.Modules.Catalog.Domain.TourProduct).Assembly,
        typeof(Hani.Modules.Supply.Domain.AgencyOffer).Assembly,
        typeof(Hani.Modules.Booking.Domain.Order).Assembly,
        typeof(Hani.Modules.Payments.Domain.PaymentIntent).Assembly,
        typeof(Hani.Modules.Flights.Domain.Pnr).Assembly,
        typeof(Hani.Modules.Billing.Domain.Subscription).Assembly
    };

    [Fact]
    public void Module_Should_Not_Reference_Another_Module()
    {
        foreach (var assembly in ModuleAssemblies)
        {
            var moduleName = assembly.GetName().Name!;
            var references = assembly.GetReferencedAssemblies()
                .Select(a => a.Name!)
                .Where(n => n.StartsWith("Hani.Modules."))
                .Where(n => !n.StartsWith(moduleName))
                .ToArray();

            references.ShouldBeEmpty(
                $"{moduleName} نباید به ماژول دیگری reference داشته باشد: " +
                string.Join(", ", references));
        }
    }
}
```

---

## ۳. وابستگی لایه‌ها

```csharp
public sealed class LayerDependencyTests
{
    [Fact]
    public void Domain_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(
                typeof(Hani.Modules.Supply.Domain.AgencyOffer).Assembly)
            .That().ResideInNamespace("Hani.Modules.Supply.Domain")
            .ShouldNot().HaveDependencyOnAny(
                "Microsoft.EntityFrameworkCore",
                "Microsoft.AspNetCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? Array.Empty<string>()));
    }

    [Fact]
    public void Application_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(
                typeof(Hani.Modules.Supply.Application.CreateAgencyOfferCommand).Assembly)
            .That().ResideInNamespace("Hani.Modules.Supply.Application")
            .ShouldNot().HaveDependencyOnAny(
                "Hani.Modules.Supply.Infrastructure",
                "Microsoft.EntityFrameworkCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue();
    }

    [Fact]
    public void Presentation_Should_Not_Use_DbContext()
    {
        var result = Types.InAssembly(
                typeof(Hani.Modules.Supply.Presentation.UpsertOfferEndpoint).Assembly)
            .That().ResideInNamespace("Hani.Modules.Supply.Presentation")
            .ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue();
    }
}
```

> برای همه ماژول‌ها به‌صورت Data-Driven تکرار شود (MemberData از لیست ماژول‌ها).

---

## ۴. قواعد CQRS

```csharp
public sealed class CqrsConventionTests
{
    private static readonly Assembly ApplicationAssembly =
        typeof(Hani.Modules.Supply.Application.CreateAgencyOfferCommand).Assembly;

    [Fact]
    public void Every_Command_Should_Have_Exactly_One_Handler()
    {
        var commands = ApplicationAssembly.GetTypes()
            .Where(t => !t.IsAbstract && !t.IsInterface)
            .Where(t => t.GetInterfaces().Any(i =>
                i.IsGenericType &&
                i.GetGenericTypeDefinition() == typeof(ICommand<>)))
            .ToArray();

        foreach (var command in commands)
        {
            var handlers = ApplicationAssembly.GetTypes()
                .Where(t => t.GetInterfaces().Any(i =>
                    i.IsGenericType &&
                    i.GetGenericTypeDefinition() == typeof(ICommandHandler<,>) &&
                    i.GetGenericArguments()[0] == command))
                .ToArray();

            handlers.Length.ShouldBe(1,
                $"{command.Name} باید دقیقاً یک Handler داشته باشد.");
        }
    }

    [Fact]
    public void Every_Command_And_Query_Should_Have_A_Validator()
    {
        var requests = ApplicationAssembly.GetTypes()
            .Where(t => !t.IsAbstract && !t.IsInterface)
            .Where(t => t.GetInterfaces().Any(i =>
                i.IsGenericType &&
                (i.GetGenericTypeDefinition() == typeof(ICommand<>) ||
                 i.GetGenericTypeDefinition() == typeof(IQuery<>))))
            .ToArray();

        var validators = ApplicationAssembly.GetTypes()
            .Where(t => !t.IsAbstract)
            .Where(t => t.BaseType is { IsGenericType: true } &&
                        t.BaseType.GetGenericTypeDefinition() == typeof(AbstractValidator<>))
            .ToArray();

        foreach (var request in requests)
        {
            var expected = typeof(AbstractValidator<>).MakeGenericType(request);
            validators.Any(v => expected.IsAssignableFrom(v))
                .ShouldBeTrue($"{request.Name} باید Validator داشته باشد.");
        }
    }

    [Fact]
    public void Handlers_Should_Be_Internal_And_Sealed()
    {
        var handlers = ApplicationAssembly.GetTypes()
            .Where(t => t.GetInterfaces().Any(i =>
                i.IsGenericType &&
                (i.GetGenericTypeDefinition() == typeof(ICommandHandler<,>) ||
                 i.GetGenericTypeDefinition() == typeof(IQueryHandler<,>))))
            .ToArray();

        foreach (var handler in handlers)
        {
            handler.IsSealed.ShouldBeTrue($"{handler.Name} باید sealed باشد.");
            handler.IsPublic.ShouldBeFalse($"{handler.Name} نباید public باشد.");
        }
    }
}
```

---

## ۵. نام‌گذاری

```csharp
public sealed class NamingConventionTests
{
    [Theory]
    [InlineData("Command")]
    [InlineData("Query")]
    [InlineData("Handler")]
    [InlineData("Validator")]
    [InlineData("Endpoint")]
    public void Types_Should_Follow_Suffix(string suffix)
    {
        var types = typeof(Hani.Modules.Supply.Application.CreateAgencyOfferCommand)
            .Assembly.GetTypes()
            .Where(t => t.Name.EndsWith(suffix, StringComparison.Ordinal))
            .ToArray();

        types.ShouldNotBeEmpty();
    }
}
```

> تست نام فایل = نام نوع با یک اسکریپت ساده در CI (`scripts/check-file-names.ps1`) انجام می‌شود؛ Reflection مسیر فایل ندارد.

---

## ۶. قواعد مکمل (Analyzer)

موارد زیر در تست معماری سخت‌اند و با Analyzer/BannedSymbols اجرا می‌شوند:

- `DateTime.Now` / `Guid.NewGuid` → BannedSymbols
- `DbContext` در Application/Presentation → BannedSymbols
- `Console.WriteLine` → BannedSymbols
- `Task.Run` در مسیر request → BannedSymbols
- Endpoint فقط `ISender` → Code Review + Banned `DbContext`

---

## ۷. اجرا

```powershell
dotnet test tests/Hani.ArchitectureTests/Hani.ArchitectureTests.csproj
```

در CI:

```yaml
- name: Architecture tests
  run: dotnet test tests/Hani.ArchitectureTests --no-build --verbosity normal
```

---

## ۸. قاعده افزودن تست جدید

1. هر ADR جدید → حداقل یک تست معماری.
2. هر باگ معماری که در review کشف شد → یک تست که تکرار آن را غیرممکن کند.
3. تست باید سریع (< ۲ ثانیه) و بدون I/O باشد.
4. پیام شکست باید بگوید «چه چیزی» و «کجا» نقض شده است.

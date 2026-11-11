# Hani BuildingBlocks

> کد مشترک و قابل استفاده مجدد در همه ماژول‌ها. هیچ منطق تور/هتل/رزرو اینجا نیست.

| پروژه | مسئولیت |
|---|---|
| `Hani.BuildingBlocks.Domain` | `Entity`, `AggregateRoot`, `IDomainEvent`, `Money`, `IIdGenerator` |
| `Hani.BuildingBlocks.Application` | CQRS contracts، `Result`/`Error`، Behaviorها، Portها، `ILanguageCatalog` |
| `Hani.BuildingBlocks.Infrastructure` | Cache، Messaging، Idempotency، Observability، Tenancy، `Uuid7IdGenerator`، `LanguageCatalog` |
| `Hani.BuildingBlocks.AspNetCore` | ProblemDetails محلی، TenantMiddleware |
| `Hani.BuildingBlocks.Testing` | (فاز بعد) Fixtures و Fakes |

## اصول

- Domain بدون وابستگی خارجی.
- Application فقط به Portها وابسته است.
- Infrastructure پیاده‌سازی Portهاست.
- AspNetCore فقط نگرانی‌های HTTP.
- هیچ ماژول دامنه‌ای به BuildingBlocks وابسته نیست (برعکسش درست است).

## زبان و شناسه‌ها

- فهرست زبان‌ها، زبان پیش‌فرض و عنوان خطاها از بخش `Localization` در `appsettings.json` خوانده می‌شود. افزودن زبان جدید فقط تغییر تنظیمات است و تغییر کد لازم ندارد.
- تولید کلیدهای GUID فقط از طریق `IIdGenerator` انجام می‌شود. پیاده‌سازی پیش‌فرض `Uuid7IdGenerator` است تا Fragmentation ایندکس کمتر باشد. تست معماری استفاده مستقیم از `Guid.NewGuid`/`Guid.CreateVersion7` در لایه‌های دامنه/کاربرد را رد می‌کند.

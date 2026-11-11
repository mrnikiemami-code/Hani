# Hani BuildingBlocks

> کد مشترک و قابل استفاده مجدد در همه ماژول‌ها. هیچ منطق تور/هتل/رزرو اینجا نیست.

| پروژه | مسئولیت |
|---|---|
| `Hani.BuildingBlocks.Domain` | `Entity`, `AggregateRoot`, `IDomainEvent`, `Money` |
| `Hani.BuildingBlocks.Application` | CQRS contracts، `Result`/`Error`، Behaviorها، Portها |
| `Hani.BuildingBlocks.Infrastructure` | Cache، Messaging، Idempotency، Observability، Tenancy |
| `Hani.BuildingBlocks.AspNetCore` | ProblemDetails محلی، TenantMiddleware |
| `Hani.BuildingBlocks.Testing` | (فاز بعد) Fixtures و Fakes |

## اصول

- Domain بدون وابستگی خارجی.
- Application فقط به Portها وابسته است.
- Infrastructure پیاده‌سازی Portهاست.
- AspNetCore فقط نگرانی‌های HTTP.
- هیچ ماژول دامنه‌ای به BuildingBlocks وابسته نیست (برعکسش درست است).

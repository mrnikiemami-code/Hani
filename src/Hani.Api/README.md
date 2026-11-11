# Hani API Host

> Composition Root: تنها جایی که ماژول‌ها، DbContextها، Auth، Cache، Messaging و Observability به هم وصل می‌شوند.

## مسئولیت‌ها

- ثبت MediatR برای همه ماژول‌ها
- ثبت Validatorها
- ثبت `DbContext`ها (Supply / Catalog / Identity)
- ثبت Cache / Messaging / Observability
- ثبت Authentication (API Key) و Authorization Policy
- Request Localization (FA/EN/AR)
- TenantMiddleware
- Map کردن Endpointهای ماژول‌ها
- `/health`

## قواعد

- هیچ منطق دامنه‌ای در `Program.cs` نوشته نمی‌شود.
- هر ماژول فقط `Presentation` و `Infrastructure` خودش را expose می‌کند.
- Endpointهای Supplier با policy `Supplier` محافظت می‌شوند.

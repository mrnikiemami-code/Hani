# ADR-0020 — ProblemDetails مرکزی و Correlation ID سراسری

- **وضعیت:** Accepted (Locked)
- **تاریخ:** 2026-11-11
- **تصمیم‌گیرندگان:** تیم Hani

## زمینه

هر ماژول یک متد `ToProblem` محلی داشت و خطاها را با `Results.Problem` دوباره می‌ساخت. این کار باعث تکرار mapping وضعیت‌ها، ناسازگاری شکل خروجی، نبود `correlationId` در برخی پاسخ‌ها و سخت شدن ردیابی درخواست در لاگ‌ها و تراس‌ها می‌شد. همچنین خطاهای فریم‌ورک (401/403/404/400 بایندینگ) و استثناهای مدیریت‌نشده شکل یکسانی نداشتند.

## تصمیم

- کل خروجی خطا از یک نقطه مرکزی به نام `HaniProblemDetails` در `Hani.BuildingBlocks.AspNetCore` ساخته می‌شود.
- تمام endpointها فقط از `HttpContext.ToProblem(...)` استفاده می‌کنند؛ استفاده از `Results.Problem`، `Results.BadRequest`، `Results.NotFound`، `Results.Conflict`، `Results.Unauthorized`، `Results.Forbid` یا `ProblemDetailsLocalizer` در لایه Presentation ممنوع است.
- خروجی خطا همیشه `application/problem+json` است و شامل این فیلدهاست:
  - استاندارد RFC 7807: `type`, `title`, `status`, `detail`, `instance`
  - افزونه‌های Hani: `code`, `correlationId`, `traceId`, `locale`
  - در خطای اعتبارسنجی: `errors` به‌صورت property → array of messages
- `CorrelationIdMiddleware` اولین middleware خط لوله است:
  - `X-Correlation-Id` یا `X-Request-Id` معتبر را می‌پذیرد؛ در غیر این صورت UUIDv7 می‌سازد.
  - مقدار را در `HttpContext.TraceIdentifier`، `HttpContext.Items`، هدر پاسخ `X-Correlation-Id`، `Activity` tag/baggage و scope لاگ قرار می‌دهد.
  - طول مجاز ۱۲۸ کاراکتر و کاراکترهای امن دارد.
- `HaniExceptionHandler` استثناهای مدیریت‌نشده را به 500 ProblemDetails تبدیل می‌کند. `BadHttpRequestException`های 4xx (مثل بایندینگ نامعتبر) با همان وضعیت 4xx و ProblemDetails برگردانده می‌شوند.
- `UseStatusCodePages` برای 401/403/404/405/415 و سایر پاسخ‌های خالی، ProblemDetails مرکزی می‌نویسد.
- OpenAPI هر سه API یک schema مشترک `Problem` با `correlationId` و `traceId` دارد.

## پیامدها

- همه خطاها شکل یکسان و قابل ماشین‌خوان دارند و با `correlationId` در لاگ/تراس قابل ردیابی هستند.
- endpoint جدیدی که خروجی خطای دستی بسازد، توسط `ProblemDetailsConventionTests` رد می‌شود.
- `HaniProblemDetailsTests`، `CorrelationIdMiddlewareTests` و `HaniExceptionHandlerTests` قرارداد را تضمین می‌کنند.
- لاگ‌های Serilog با property `CorrelationId` غنی می‌شوند.
- خطاهای 4xx بایندینگ دیگر به‌اشتباه 500 نمی‌شوند.

## جایگزین‌های رد شده

- **متد `ToProblem` در هر ماژول:** تکرار، ناسازگاری و نبود ردیابی یکسان؛ رد شد.
- **فقط `AddProblemDetails` پیش‌فرض فریم‌ورک:** برای خطاهای دامنه، localization، `code` و `correlationId` کافی نبود.
- **استفاده از `TraceIdentifier` به‌عنوان correlation id بدون ورودی کلاینت:** امکان همبستگی با سیستم‌های خارجی را از بین می‌برد.

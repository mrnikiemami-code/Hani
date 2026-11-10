# ADR-0005 — MassTransit 8.5.12 و Transport قابل سوییچ

- **وضعیت:** Accepted (Locked)
- **تاریخ:** 2026-11-10

## زمینه

MassTransit از نسخه ۹ لایسنس تجاری دارد. همچنین تیم می‌خواهد بدون تغییر کد، بین RabbitMQ و PostgreSQL SQL Transport جابه‌جا شود.

## تصمیم

- نسخه **8.5.12** (Apache-2.0) قفل می‌شود.
- پکیج‌ها:
  - `MassTransit`
  - `MassTransit.RabbitMQ`
  - `MassTransit.SqlTransport.PostgreSql`
  - `MassTransit.EntityFrameworkCore`
- انتخاب Transport با تنظیمات `Messaging:Transport` (`RabbitMq` | `Postgres`).
- Application فقط `IIntegrationEventPublisher` را می‌شناسد.
- Outbox/Inbox با EF Core فعال است.

## پیامدها

**مثبت:** بدون وابستگی لایسنسی، انعطاف زیرساخت، یکپارچگی تراکنشی با Outbox.

**منفی:** نسخه ۸ قابلیت‌های جدید ۹+ را ندارد؛ SQL Transport throughput کمتری از RabbitMQ دارد.

## قواعد

- هیچ Consumer مستقیماً `IBus` را در Domain/Application استفاده نمی‌کند.
- نام پیام نسخه‌دار: `travelcore.{module}.{event}.v1`.
- Retry نمایی + DLQ + داشبورد.

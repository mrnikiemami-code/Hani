# ADR-0007 — Observability با Toggle

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

تیم باید بتواند لاگ/تلمتری را در محیط‌های مختلف و حتی برای یک ماژول خاص خاموش کند، بدون تغییر کد یا انتشار مجدد.

## تصمیم

- Serilog برای Log، OpenTelemetry برای Trace/Metric.
- Toggleها:
  - `Observability:Logging:Enabled`
  - `Observability:Tracing:Enabled`
  - `Observability:Metrics:Enabled`
  - override در `Modules:{Module}:Logging:Level`
- `Enabled=false` → No-op/Null implementation.
- Enricherها: TraceId, SpanId, TenantId, AgencyId, UserId, Module.
- PII Redaction اجباری.
- Audit Log جدا و همیشه روشن.

## خروجی‌ها

| محیط | Sink |
|---|---|
| Local | Console + Seq |
| Staging | Seq + OTLP |
| Production | OTLP → Tempo/Loki/Prometheus |

## پیامدها

**مثبت:** کنترل هزینه، دیباگ ماژولی، انطباق با محیط.

**منفی:** خطر خاموش ماندن ناخواسته در تولید؛ نیاز به هشدار پیکربندی.

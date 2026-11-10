# ADR-0006 — انتزاع Cache قابل جایگزینی

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

کش باید در توسعه (Memory)، تولید (Redis) و تست (Null) بدون تغییر کد کار کند. وابستگی مستقیم به Redis در Application ممنوع است.

## تصمیم

- قرارداد `ICacheService` در `BuildingBlocks.Application`.
- پیاده‌سازی‌ها:
  - `RedisCacheService`
  - `MemoryCacheService`
  - `HybridCacheService` (L1 + L2)
  - `NullCacheService`
- انتخاب با `Cache:Provider`.
- Tag برای invalidation گروهی.
- Invalidation با Domain Event/Outbox.

## قواعد کلید

```
tc:{env}:{module}:{entity}:{id}:{locale}
```

## چه چیزی کش نشود

- داده پرداخت/کارت
- PII حساس
- موجودی/قیمت بدون نسخه و TTL کوتاه
- پاسخ‌های وابسته به کاربر بدون کلید کاربر

## پیامدها

**مثبت:** تست ساده، مهاجرت آسان، خاموش کردن کش بدون کد.

**منفی:** خطر کش کهنه در صورت invalidation ناقص؛ نیاز به پایش hit ratio.

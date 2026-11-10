# ADR-0009 — PostgreSQL با Schema مستقل برای هر ماژول

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

Modular Monolith نیاز به مرز داده‌ای دارد تا استخراج میکروسرویس ممکن شود.

## تصمیم

- یک دیتابیس PostgreSQL.
- Schema جدا: `identity`, `catalog`, `supply`, `marketplace`, `booking`, `payment`, `settlement`, `review`, `content`, `seo`, `notification`, `platform`, `transport`.
- هر ماژول `DbContext` و Migration مستقل.
- `MigrationsHistoryTable` در همان Schema.
- ممنوعیت Join بین Schemaها.
- گزارش‌ها با Read Model/Materialized View.

## انواع داده

- `uuid` (UUIDv7) برای شناسه
- `bigint` برای پول (minor units) + `char(3)` currency
- `timestamptz` برای زمان
- `jsonb` برای LocalizedText
- `bigint` برای concurrency

## پیامدها

**مثبت:** مرز واضح، استخراج آسان، migration مستقل.

**منفی:** نیاز به composition در Application، پیچیدگی گزارش‌های cross-module.

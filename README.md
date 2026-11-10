# TravelCore

مارکت‌پلیس چندآژانسه سفر با سه مدل مستقل:

1. **Supplier API** — ورود موجودی، ظرفیت و قیمت توسط آژانس
2. **Channel API** — فروش تورهای مجاز از سایت/اپ خود آژانس
3. **Marketplace** — مقایسه و رزرو مستقیم مشتری در TravelCore

## وضعیت

🚧 **فاز برنامه‌ریزی — معماری قفل‌شده**

این مخزن در حال حاضر شامل برنامه معماری، تصمیم‌ها (ADR)، قراردادهای API و تحلیل سایت مرجع است. پیاده‌سازی از فاز ۰ (Bootstrap) آغاز می‌شود.

## سند اصلی

👉 **[PLAN.md](PLAN.md)** — برنامه کامل معماری، فولدر بندی، CQRS، BuildingBlocks، لاگینگ، Idempotency، Messaging، Cache، دیتابیس، i18n، SEO، نقشه راه و بک‌لاگ.

## تصمیم‌های قفل‌شده

| بخش | تصمیم |
|---|---|
| Backend | ASP.NET Core 10 / Minimal API |
| Frontend | Next.js 16 / React 19 |
| معماری | Modular Monolith + Clean Architecture |
| Database | PostgreSQL + Schema per Module |
| Cache | Redis با انتزاع قابل جایگزینی |
| زبان‌ها | FA / EN / AR |
| MediatR | 12.5.0 (آخرین Apache-2.0) |
| MassTransit | 8.5.12 (آخرین Apache-2.0) |
| Transport | RabbitMQ یا PostgreSQL SQL Transport |

## مستندات

- [برنامه اصلی](PLAN.md)
- [تصمیم‌های معماری (ADR)](docs/adr/)
- [قرارداد Channel API](docs/api/channel-api-v1.openapi.yaml)
- [قرارداد Supplier API](docs/api/supplier-api-v1.openapi.yaml)
- [تحلیل سایت مرجع](docs/research/lastsecond-architecture-report.md)
- [رهنمود مشارکت](CONTRIBUTING.md)

## همگام‌سازی

```powershell
git pull --rebase
# تغییرات
git add -A
git commit -m "docs: ..."
git push
```

مخزن: https://github.com/mrnikiemami-code/Hani

## مجوز

TBD — تا زمان تصمیم مالک محصول، همه حقوق محفوظ است.

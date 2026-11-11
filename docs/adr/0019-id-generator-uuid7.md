# ADR-0019 — تولید شناسه از طریق IIdGenerator با UUIDv7

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-11
- **تصمیم‌گیرندگان:** تیم Hani

## زمینه

شناسه‌ها در سازنده‌های aggregate و domain eventها مستقیماً با `Guid.CreateVersion7()` ساخته می‌شدند. این کار تعویض الگوریتم (برای مثال UUIDv7، ULID یا شناسه قابل پیش‌بینی در تست) و اعمال سیاست یکسان در همه ماژول‌ها را دشوار می‌کرد و در فازهای تکمیل‌شده نیز پراکنده بود.

## تصمیم

- پورت `IIdGenerator` در `Hani.BuildingBlocks.Domain` تعریف می‌شود.
- پیاده‌سازی پیش‌فرض `Uuid7IdGenerator` در Infrastructure است و از `Guid.CreateVersion7()` استفاده می‌کند تا ترتیب زمانی و fragmentation کمتر ایندکس داشته باشیم.
- `IIdGenerator` به‌صورت singleton در DI ثبت می‌شود و handlerهای Application آن را به factoryهای دامنه پاس می‌دهند.
- factoryهای aggregate و متدهای افزودن فرزند (ترجمه، مقصد، قیمت) و همچنین domain eventها شناسه را از همان پورت می‌گیرند؛ هیچ `Guid.NewGuid`/`Guid.CreateVersion7` مستقیمی در Domain/Application/Presentation نیست.
- تست معماری `IdGenerationTests` استفاده مستقیم از GUID را خارج از Infrastructure رد می‌کند. Infrastructure تنها جایی است که پیاده‌سازی `IIdGenerator` مجاز به ساخت GUID است.

## پیامدها

- تعویض الگوریتم شناسه فقط تغییر ثبت DI/پیاده‌سازی است، نه تغییر aggregateها.
- تست‌ها می‌توانند از پیاده‌سازی deterministic یا `Uuid7IdGenerator` استفاده کنند.
- دامنه به یک پورت کوچک وابسته می‌شود؛ این وابستگی به‌معنای وابستگی به Infrastructure نیست.
- شناسه‌های UUIDv7 مرتب‌تر هستند و درج/ایندکس Postgres کم‌هزینه‌تر است.

## جایگزین‌های رد شده

- **پاس دادن `Guid id` از handler و تولید داخلی event id:** شناسه eventها دوباره مستقیم ساخته می‌شد و سیاست یکسان نمی‌شد.
- **static helper سراسری:** تست‌پذیری و تعویض پیاده‌سازی را بدتر می‌کرد و وابستگی پنهان ایجاد می‌کرد.

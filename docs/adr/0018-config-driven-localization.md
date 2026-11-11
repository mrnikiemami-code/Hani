# ADR-0018 — زبان‌های قابل تنظیم و حذف فهرست hard-code

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-11
- **تصمیم‌گیرندگان:** تیم Hani

## زمینه

فهرست زبان‌ها در چند نقطه hard-code شده بود: `Program.cs`، `ProblemDetailsLocalizer`، validatorهای Catalog/Marketplace و fallback هندلرهای Marketplace. افزودن یک زبان جدید نیاز به تغییر کد و انتشار مجدد داشت، در حالی که زبان یک داده عملیاتی است و باید بدون deploy کد قابل افزودن باشد.

## تصمیم

- تنظیمات زبان در بخش `Localization` فایل `appsettings.json` نگهداری می‌شود:
  - `DefaultCulture`
  - `SupportedCultures`
  - `ProblemTitles` (به ازای هر زبان و هر `ErrorType`)
- `ILanguageCatalog` در `Hani.BuildingBlocks.Application` قرار دارد و پیاده‌سازی `LanguageCatalog` در Infrastructure آن را از `IOptions<LocalizationOptions>` می‌سازد.
- validatorها و هندلرها به‌جای مقایسه با `"fa"`/`"en"`/`"ar"` از `ILanguageCatalog.IsSupported` و `Normalize` استفاده می‌کنند.
- `ProblemDetailsLocalizer` یک‌بار در startup با `LocalizationOptions` پیکربندی می‌شود و عنوان‌ها را از تنظیمات می‌خواند.
- `locale` در OpenAPI به‌صورت string توصیف می‌شود (نه enum ثابت) تا افزودن زبان، تغییر قرارداد API نباشد.
- متن ترجمه‌شده محتوا همچنان داده است (جدول translation) و افزودن زبان یعنی افزودن ردیف داده/فایل ترجمه، نه تغییر منطق.

## پیامدها

- افزودن زبان جدید فقط با تغییر تنظیمات و داده ترجمه انجام می‌شود.
- زبان ناشناخته به زبان پیش‌فرض fallback می‌کند.
- تست‌های `LanguageCatalogTests` و `ProblemDetailsLocalizerTests` این رفتار را تضمین می‌کنند.
- `ProblemTitles` باید برای هر زبان جدید تکمیل شود؛ در غیر این صورت fallback پیش‌فرض اعمال می‌شود.

## جایگزین‌های رد شده

- **فقط resx ثابت:** افزودن زبان نیاز به تغییر کد/build دارد و خلاف هدف است.
- **خواندن زبان‌ها از DB در هر request:** برای تنظیمات پایه API پیچیدگی و وابستگی غیرضروری ایجاد می‌کند؛ پیکربندی startup کافی است.

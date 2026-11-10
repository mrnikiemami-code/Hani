# ADR-0016 — استاندارد خطای کددار و ترجمه‌شده

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

خطاهای خام و متن‌های hard-code شده باعث تجربه ناهمگون، نبود قابلیت جستجو و ترجمه ناقص می‌شوند. لست‌سکند در برخی مسیرها `response.data.message` خام را نمایش می‌دهد.

## تصمیم

- هر خطا یک کد ثابت دارد: `HANI-{AREA}-{4 digits}`.
- هر خطا یک `ErrorDefinition` دارد:
  - `Code`, `HttpStatus`, `Severity`, `IsRetryable`, `MessageKey`, `DocsUrl`.
- پاسخ‌ها RFC 7807 + `code` + `messageKey` + `traceId` + `locale`.
- ترجمه در `Errors.fa.resx`, `Errors.en.resx`, `Errors.ar.resx`.
- Fallback: `ar → en → fa`؛ در نهایت خود `Code`.
- FluentValidation با `WithErrorCode` و `WithMessage("key")`.
- هیچ Stack Trace یا متن Exception به کاربر نمی‌رسد.
- Frontend با `code` پیام محلی را map می‌کند.

## پیامدها

**مثبت:** تجربه یکدست، ترجمه کامل، پشتیبانی با `traceId`، داشبورد per code.

**منفی:** نیاز به کاتالوگ متمرکز و انضباط افزودن کد/ترجمه.

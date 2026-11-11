# Hani — Agent Instructions

> این فایل برای **هر Agent** (OpenCode / Cursor / AI) الزامی است. مستندسازی بخشی از تعریف «انجام‌شده» است، نه کار جانبی.

## 1. قبل از شروع

1. `PLAN.md` را بخوان.
2. `docs/plan/STATUS.md` و `docs/plan/TASKS.md` را بخوان.
3. ADR مرتبط در `docs/adr/` را بخوان.
4. فقط روی **فاز فعال** و تسک انتخاب‌شده کار کن.

## 2. قبل از هر commit (اجباری)

- [ ] برای هر `public class/interface/record/enum` جدید، `/// <summary>` نوشته شود.
- [ ] برای هر متد public اینترفیس، قرارداد و خطاها مستند شود.
- [ ] اگر API، جریان داده یا رفتار ماژول تغییر کرد، `src/Modules/{Module}/README.md` به‌روز شود.
- [ ] اگر قرارداد API تغییر کرد، `docs/api/*.openapi.yaml` به‌روز شود.
- [ ] اگر تصمیم معماری تغییر کرد، ADR جدید ثبت شود.
- [ ] `docs/plan/STATUS.md` و `docs/plan/DONE.md` به‌روز شوند.
- [ ] `scripts/verify.ps1` سبز باشد.
- [ ] commit + push انجام شود.

## 3. قواعد مستندسازی

| مورد | الزام |
|---|---|
| Public type | XML `<summary>` |
| Interface | هدف + قرارداد متدها |
| Command/Query | use case + side effect |
| Endpoint | auth، خطاهای اصلی، خروجی |
| Domain aggregate | invariantها و وضعیت‌ها |
| Module | README با مسئولیت، نوع‌ها، API، persistence |
| تصمیم | ADR |

- زبان کامنت: **انگلیسی**.
- «چرا» مهم‌تر از «چه» است.
- کد تولیدشده (Migrations) از این قاعده مستثناست.
- `DocumentationTests` در CI این قواعد را اجرا می‌کند.

## 4. ممنوع

- merge کد بدون XML summary برای type عمومی.
- تغییر API بدون به‌روزرسانی OpenAPI.
- تغییر معماری بدون ADR.
- رها کردن `STATUS.md` / `TASKS.md` / `DONE.md` به‌صورت کهنه.
- commit بدون اجرای `scripts/verify.ps1`.

## 5. تعریف Done

یک تسک فقط وقتی Done است که:

1. کد + تست دارد.
2. XML docs و README مرتبط به‌روز است.
3. `STATUS.md` و `DONE.md` به‌روز است.
4. `verify.ps1` سبز است.
5. commit و push شده است.

> اگر یکی از این‌ها نباشد، تسک Done نیست — حتی اگر کد کار کند.

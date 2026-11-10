# ADR-0015 — حاکمیت اجرایی معماری و یکدستی ماژول‌ها

- **وضعیت:** Accepted (Proposed for approval)
- **تاریخ:** 2026-11-10

## زمینه

پروژه باید یکدست بماند و توسط انسان و AI توسعه یابد. قواعد مکتوب بدون اجرا، در عمل نقض می‌شوند.

## تصمیم

حاکمیت شش‌لایه:

1. **سند:** ADR + PLAN + Module Template
2. **کامپایلر:** Project References + Central Package Management + SDK Pin
3. **تحلیل ایستا:** NetAnalyzers + BannedSymbols + `dotnet format`
4. **تست معماری:** NetArchTest برای مرز ماژول/لایه/CQRS/نام‌گذاری
5. **قرارداد:** OpenAPI Diff + Event Contract + Migration Check
6. **انسان/متریک:** CODEOWNERS + PR Template + ARB + Drift Report

## قواعد کلیدی

- هر ماژول فقط از `docs/engineering/module-template.md` ساخته می‌شود.
- ماژول به ماژول دیگر reference نمی‌دهد.
- `Domain` بدون وابستگی خارجی؛ `Application` بدون EF/HTTP/Messaging.
- هر Command/Query یک Handler و یک Validator دارد.
- Banned APIs در Application/Presentation اجرا می‌شود.
- CI بدون همه Gateها سبز نمی‌شود.
- استثنا فقط با Waiver تاریخ‌دار (حداکثر ۲ در هر ماژول).
- تغییر معماری فقط با ADR Accepted.

## پیامدها

**مثبت:** یکدستی بالا، کاهش drift، onboarding سریع، ایمنی برای AI.

**منفی:** هزینه اولیه زیرساخت (فاز ۰)، سخت‌گیری در PRهای کوچک، نیاز به ARB.

## الزامات

- `TC-001A` قبل از هر کد دامنه‌ای تکمیل شود.
- `scripts/verify.ps1` نقطه ورود واحد باشد.
- Drift Report ماهانه منتشر شود.

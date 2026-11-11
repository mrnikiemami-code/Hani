# سیستم برنامه‌ریزی Hani

> **قاعده:** فقط یک فاز در هر زمان فعال است. فاز بعدی تا عبور از **Phase Gate** شروع نمی‌شود.

## اسناد

| سند | نقش |
|---|---|
| [`ROADMAP.md`](ROADMAP.md) | فازها، تحویل‌دادنی‌ها، معیار پذیرش و Phase Gate |
| [`STATUS.md`](STATUS.md) | وضعیت زنده: انجام‌شده / در حال انجام / بعدی |
| [`TASKS.md`](TASKS.md) | بک‌لاگ تسک‌ها با ID، وابستگی، DoD و commit |
| [`DONE.md`](DONE.md) | دفتر کارهای تحویل‌شده (Done Ledger) |
| [`../engineering/code-documentation.md`](../engineering/code-documentation.md) | استاندارد کامنت‌گذاری و XML docs |
| [`../../PLAN.md`](../../PLAN.md) | معماری، تصمیم‌ها، جزئیات فنی |

## چرخه کار

```
1. انتخاب تسک از TASKS.md (فقط از فاز فعال)
2. به‌روزرسانی STATUS.md: In Progress
3. پیاده‌سازی + تست + migration
4. XML docs + README ماژول + OpenAPI/ADR (در صورت نیاز)
5. اجرای scripts/verify.ps1
6. commit + push
7. به‌روزرسانی STATUS.md / DONE.md: Done + commit hash
```

## قواعد

- هیچ تسکی خارج از فاز فعال شروع نمی‌شود.
- هر تسک باید DoD داشته باشد.
- تسک بزرگ‌تر از ۱ روز به زیرتسک شکسته می‌شود.
- Phase Gate بدون دموی قابل اجرا و `verify.ps1` سبز بسته نمی‌شود.
- تغییر معماری فقط با ADR.
- هر commit فقط یک تسک/یک تغییر معنادار.

## وضعیت فعلی

- فاز فعال: **هیچ — توقف برای بازبینی**
- Phase 0: ✅ بسته شد
- Phase 1: ✅ Gate Passed
- Phase 2: ⏳ شروع نشده
- فازهای ۳ تا ۶: ⏳ شروع نشده

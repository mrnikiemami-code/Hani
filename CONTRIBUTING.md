# رهنمود مشارکت در TravelCore

## ۱. قبل از شروع

```powershell
git pull --rebase
git switch -c feat/<short-name>
```

- هیچ تغییری مستقیم روی `main` انجام نمی‌شود.
- قبل از کدنویسی، تسک مربوطه در `PLAN.md` (بخش بک‌لاگ) را انتخاب کنید.
- اگر تسک بزرگ‌تر از یک روز شد، آن را به زیرتسک بشکنید.

## ۲. قواعد معماری (غیرقابل مذاکره)

> سند کامل: [`docs/engineering/architecture-governance.md`](docs/engineering/architecture-governance.md)
> قالب ماژول: [`docs/engineering/module-template.md`](docs/engineering/module-template.md)
> تست‌های معماری: [`docs/engineering/architecture-tests.md`](docs/engineering/architecture-tests.md)

- هر ماژول جدید فقط از قالب `dotnet new travelcore-module` ساخته می‌شود.
- هر ماژول فقط ۴ پروژه دارد: `Domain`, `Application`, `Infrastructure`, `Presentation`.
- ماژول A به `Domain` یا `Application` ماژول B ارجاع نمی‌دهد؛ فقط `Contracts`.
- `Domain` هیچ وابستگی خارجی ندارد (نه EF، نه ASP.NET، نه Redis).
- `Application` فقط به Portها وابسته است، نه پیاده‌سازی.
- هر Command/Query در پوشه خودش با Handler و Validator جدا.
- هیچ `Helper`/`Manager`/`Utils` عمومی ساخته نشود.
- نسخه `MediatR` روی `12.5.0` و `MassTransit` روی `8.5.12` قفل است.
- Transport و Cache فقط از طریق تنظیمات عوض می‌شوند، نه تغییر کد دامنه.

## ۳. Commit

فرمت Conventional Commits:

```
feat(supply): add agency offer upsert endpoint
fix(payments): deduplicate gateway callback
docs(adr): add cache abstraction decision
chore(ci): add architecture tests
```

## ۴. Pull Request

- عنوان واضح + لینک تسک (TC-xxx).
- توضیح: چه تغییر کرد، چرا، چگونه تست شد.
- CI باید سبز باشد: build، unit، integration، architecture، OpenAPI diff.
- حداقل یک بازبینی.
- تغییرات شکستنی API فقط با نسخه جدید (`/v2`).

## ۵. Definition of Done

- [ ] تست واحد برای Domain/Application
- [ ] تست Integration برای زیرساخت (در صورت تغییر)
- [ ] ArchitectureTests سبز
- [ ] لاگ ساختاریافته + Trace
- [ ] Idempotency برای POST مالی
- [ ] مستندات/ADR به‌روز
- [ ] بدون Secret در کد
- [ ] i18n برای پیام‌های کاربر

## ۶. همگام‌سازی

```powershell
git pull --rebase
git add -A
git commit -m "feat(...): ..."
git push
```

- `main` محافظت‌شده است.
- force push ممنوع.
- قبل از پایان هر جلسه، تغییرات commit و push شوند.

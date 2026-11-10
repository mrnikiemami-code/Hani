# Architecture Drift Report — 2026-11

> اولین گزارش پس از **TC-001A — Architecture Governance Bootstrap**

## وضعیت کلی

| متریک | مقدار | هدف | وضعیت |
|---|---|---|---|
| Architecture violations | 0 | 0 | ✅ |
| Cross-module references | 0 | 0 | ✅ |
| Build warnings | 0 | 0 | ✅ |
| Banned API usages | 0 | 0 | ✅ |
| Active waivers | 0 | ≤ 2/ماژول | ✅ |
| License violations | 0 | 0 | ✅ |
| Unit tests | 6 passed | — | ✅ |
| Architecture tests | 7 passed | — | ✅ |
| Locked restore | ✅ | ✅ | ✅ |
| Format check | ✅ | ✅ | ✅ |

## ماژول‌ها

| ماژول | ساختار ۴ لایه | ArchitectureTests | وضعیت |
|---|---|---|---|
| Supply | ✅ | ✅ | نمونه پایلوت |

## گیت‌های فعال

- `Directory.Packages.props` — نسخه‌های قفل‌شده (MediatR 12.5.0، MassTransit 8.5.12)
- `Directory.Build.props` — Central Package Management + lock files
- `BannedSymbols.txt` — RS0030 برای Application/Presentation
- `Hani.ArchitectureTests` — مرز ماژول، لایه، CQRS، Validator
- `scripts/verify.ps1` — build + test + format + vulnerability
- `.github/workflows/ci.yml` — همین گیت‌ها در CI
- `.github/CODEOWNERS` + PR template

## ریسک‌ها / اقدام بعدی

1. فقط یک ماژول نمونه (Supply) داریم؛ با افزودن ماژول‌های بعدی، تست‌های مرز باید گسترش یابند.
2. `dotnet new hani-module` هنوز ساخته نشده؛ فعلاً `scripts/new-module.ps1` جایگزین است.
3. Frontend هنوز scaffold نشده؛ ESLint boundaries در فاز بعد اضافه می‌شود.
4. Integration tests (Testcontainers) هنوز فعال نیستند؛ در فاز ۱.

## تأیید

- `dotnet build Hani.slnx -warnaserror` → 0 warning
- `dotnet test Hani.slnx` → 13 passed
- `dotnet format --verify-no-changes` → clean
- `dotnet list package --vulnerable` → none

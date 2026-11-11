# استاندارد کامنت‌گذاری کد

> هدف: هر توسعه‌دهنده جدید بدون خواندن کل کد بفهمد هر فایل/کلاس/اینترفیس چه مسئولیتی دارد.

## ۱. چه چیزی باید کامنت داشته باشد؟

| مورد | الزام |
|---|---|
| هر `public class` | `/// <summary>` درباره مسئولیت |
| هر `public interface` | هدف قرارداد و پیاده‌سازی‌های مجاز |
| هر `public record` / DTO | معنای داده و مصرف‌کننده |
| هر `public enum` | معنای وضعیت‌ها |
| متدهای public اینترفیس | ورودی/خروجی/خطاها |
| منطق پیچیده | `//` کوتاه درباره «چرا»، نه «چه» |
| Endpointها | resource، auth، خطاهای مهم |
| Command/Query | use case و side effect |

## ۲. قالب

```csharp
/// <summary>
/// Creates a new agency offer for the current supplier tenant.
/// </summary>
/// <remarks>
/// The offer starts in <see cref="AgencyOfferStatus.Draft"/> and must be
/// submitted for moderation before it can be published.
/// </remarks>
```

## ۳. قواعد

- زبان کامنت: **انگلیسی** (هم‌راستا با کد و لاگ).
- «چرا» مهم‌تر از «چه» است.
- از تکرار نام کلاس در کامنت پرهیز کنید.
- پیوند به نوع/وضعیت با `<see cref="..."/>`.
- برای کد تولیدشده (Migrations) کامنت اجباری نیست.
- کامنت نباید جای نام‌گذاری خوب را بگیرد.

## ۴. کامنت‌های اجباری در PR

- [ ] همه typeهای public summary دارند
- [ ] اینترفیس‌ها هدف و قرارداد را توضیح می‌دهند
- [ ] Command/Query side effect را می‌گویند
- [ ] Endpointها auth و خطاهای اصلی را می‌گویند
- [ ] منطق غیرشهودی توضیح «چرا» دارد

## ۵. اجرا

`DocumentationTests` در `Hani.ArchitectureTests` بررسی می‌کند هر type عمومی
در `src/` (به‌جز Migrations) حداقل یک `<summary>` داشته باشد.

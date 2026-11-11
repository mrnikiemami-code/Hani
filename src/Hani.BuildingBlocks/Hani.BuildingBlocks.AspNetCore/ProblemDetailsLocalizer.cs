using Hani.BuildingBlocks.Application;

namespace Hani.BuildingBlocks.AspNetCore;

/// <summary>
/// Localizes RFC 7807 problem titles for FA/EN/AR.
/// </summary>
public static class ProblemDetailsLocalizer
{
    public static string Title(ErrorType errorType, string? culture)
    {
        var language = (culture ?? "fa").Split('-')[0].ToLowerInvariant();

        return (errorType, language) switch
        {
            (ErrorType.Validation, "en") => "The request is invalid.",
            (ErrorType.Validation, "ar") => "البيانات المدخلة غير صالحة.",
            (ErrorType.Validation, _) => "داده‌های ورودی نامعتبر است.",

            (ErrorType.NotFound, "en") => "The requested item was not found.",
            (ErrorType.NotFound, "ar") => "لم يتم العثور على العنصر المطلوب.",
            (ErrorType.NotFound, _) => "موردی یافت نشد.",

            (ErrorType.Conflict, "en") => "The current state does not allow this operation.",
            (ErrorType.Conflict, "ar") => "الحالة الحالية لا تسمح بهذه العملية.",
            (ErrorType.Conflict, _) => "وضعیت فعلی اجازه این عملیات را نمی‌دهد.",

            (ErrorType.Unauthorized, "en") => "Authentication is required.",
            (ErrorType.Unauthorized, "ar") => "المصادقة مطلوبة.",
            (ErrorType.Unauthorized, _) => "احراز هویت لازم است.",

            (ErrorType.Forbidden, "en") => "Access is denied.",
            (ErrorType.Forbidden, "ar") => "الوصول مرفوض.",
            (ErrorType.Forbidden, _) => "دسترسی مجاز نیست.",

            (_, "en") => "An unexpected error occurred.",
            (_, "ar") => "حدث خطأ غير متوقع.",
            _ => "خطای غیرمنتظره رخ داد."
        };
    }
}

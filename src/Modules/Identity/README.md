# Identity Module

> **مسئولیت:** هویت کاربران و آژانس‌ها، OTP/JWT، پروفایل نویسنده و کلاینت‌های API (Supplier/Channel).

## اجزای اصلی

| نوع | مسئولیت |
|---|---|
| `User` | کاربر مارکت‌پلیس، موبایل، پروفایل و نقش |
| `UserOtp` | OTP هش‌شده با TTL، attempt limit و consumption |
| `RefreshToken` | Refresh token هش‌شده با rotation/revoke |
| `UserStatus` | Pending / Active / Blocked / Deleted |
| `UserRole` | Customer / Author / AgencyStaff / Admin |
| `Agency` | آژانس، مجوز، شهر، وضعیت و اعتبار اشتراک |
| `ApiClient` | کلاینت ماشین‌به‌ماشین برای هر آژانس |
| `ISecretGenerator` | تولید ClientId و Secret |
| `ISecretHasher` | هش SHA-256 برای ذخیره Secret |
| `IApiKeyValidator` | اعتبارسنجی `X-Api-Key` + `X-Api-Secret` |
| `IJwtTokenService` | صدور JWT access + opaque refresh |
| `IOtpSender` | ارسال OTP (Log در توسعه، SMS در تولید) |
| `ApiKeyAuthenticationHandler` | Scheme احراز هویت API Key |
| `TenantMiddleware` | استخراج `agency_id` از claim |

## جریان احراز هویت

### کاربر Marketplace

```
POST /market/v1/auth/otp/request
  → OTP 6 رقمی + HMAC hash + TTL + cooldown/rate limit
  → IOtpSender

POST /market/v1/auth/otp/verify
  → User.Activate + LastLoginAt
  → JWT access (15m) + refresh (30d)

POST /market/v1/auth/refresh
  → rotation: revoke old + issue new

GET/PUT /market/v1/auth/me
GET /market/v1/authors/{username}
```

### Supplier API

```
Client → X-Api-Key + X-Api-Secret
      → ApiKeyAuthenticationHandler
      → IApiKeyValidator (hash + status)
      → Claims: agency_id, api_client_id, scope
      → TenantMiddleware
      → Supplier endpoints (policy: supplier.write)
```

## قواعد امنیتی

- Secret فقط یک بار در پاسخ ایجاد برمی‌گردد.
- در DB فقط hash ذخیره می‌شود.
- OTP و Refresh Token با HMAC pepper هش می‌شوند.
- مقایسه hash با `CryptographicOperations.FixedTimeEquals`.
- OTP حداکثر ۵ تلاش و TTL ۲ دقیقه دارد.
- Refresh token rotate می‌شود و token قدیمی revoke می‌شود.
- JWT signing key باید حداقل ۳۲ بایت باشد.
- کلاینت Revoked رد می‌شود.
- Scope اجباری است (`supplier.write`).

## APIها

| متد | مسیر |
|---|---|
| POST | `/market/v1/auth/otp/request` |
| POST | `/market/v1/auth/otp/verify` |
| POST | `/market/v1/auth/refresh` |
| POST | `/market/v1/auth/logout` |
| GET/PUT | `/market/v1/auth/me` |
| PUT | `/market/v1/auth/me/username` |
| GET | `/market/v1/authors/{username}` |
| POST | `/market/v1/agencies/onboarding` |
| GET | `/market/v1/agencies/me` |
| GET | `/market/v1/agencies/{slug}` |
| GET | `/market/v1/trust` |
| GET/POST | `/market/v1/reviews` |
| POST | `/market/v1/reviews/{id}/helpful` |
| POST | `/market/v1/reviews/{id}/report` |
| POST | `/market/v1/claims` |
| POST | `/market/v1/media` |
| GET | `/internal/v1/agencies?status=` |
| POST | `/internal/v1/agencies/{id}/approve` |
| POST | `/internal/v1/agencies/{id}/reject` |
| GET | `/internal/v1/reviews` |
| POST | `/internal/v1/reviews/{id}/publish` |
| POST | `/internal/v1/reviews/{id}/reject` |
| GET | `/internal/v1/claims` |
| POST | `/internal/v1/claims/{id}/approve` |
| POST | `/internal/v1/claims/{id}/reject` |
| GET | `/internal/v1/media` |
| POST | `/internal/v1/media/{id}/approve` |
| POST | `/internal/v1/media/{id}/reject` |
| POST | `/internal/v1/agencies` |
| GET | `/internal/v1/agencies/{id}` |
| POST | `/internal/v1/agencies/{id}/api-clients` |

## Trust, Reviews, Claims, Media

- Onboarding آژانس با مدارک License/Website/Contract/Other و وضعیت Pending/Active/Rejected/Suspended.
- Review چندمعیاره با عکس، helpful vote، report و moderation.
- Claim مالکیت/اصلاح اطلاعات با evidence و moderation.
- MediaAsset با محدودیت ۲۰MB و moderation.
- `/market/v1/trust` اطلاعات پشتیبانی/Enamad/قوانین را از `Trust` config می‌خواند.

## Persistence

- Schema: `identity`
- جدول‌ها: `users`, `user_otp_codes`, `user_refresh_tokens`, `agencies`, `agency_documents`, `api_clients`, `reviews`, `review_photos`, `review_helpful_votes`, `review_reports`, `ownership_claims`, `media_assets`
- Migrationها: `InitialIdentity`, `AddUsersAndOtp`, `AddTrustAgencyAndEngagement`

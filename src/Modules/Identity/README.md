# Identity Module

> **مسئولیت:** هویت آژانس‌ها و کلاینت‌های API (Supplier/Channel) + احراز هویت API Key.

## اجزای اصلی

| نوع | مسئولیت |
|---|---|
| `Agency` | آژانس، مجوز، شهر، وضعیت و اعتبار اشتراک |
| `ApiClient` | کلاینت ماشین‌به‌ماشین برای هر آژانس |
| `ApiClientStatus` | Active / Revoked |
| `ISecretGenerator` | تولید ClientId و Secret |
| `ISecretHasher` | هش SHA-256 برای ذخیره Secret |
| `IApiKeyValidator` | اعتبارسنجی `X-Api-Key` + `X-Api-Secret` |
| `ApiKeyAuthenticationHandler` | Scheme احراز هویت API Key |
| `TenantMiddleware` | استخراج `agency_id` از claim |

## جریان احراز هویت

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
- مقایسه hash با `CryptographicOperations.FixedTimeEquals`.
- کلاینت Revoked رد می‌شود.
- Scope اجباری است (`supplier.write`).

## APIها

| متد | مسیر |
|---|---|
| POST | `/internal/v1/agencies` |
| GET | `/internal/v1/agencies/{id}` |
| POST | `/internal/v1/agencies/{id}/api-clients` |

## Persistence

- Schema: `identity`
- جدول‌ها: `agencies`, `api_clients`
- Migration: `InitialIdentity`

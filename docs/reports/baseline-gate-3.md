# Baseline Gate 3 Report — Identity, Trust & Agency

> **تاریخ:** ۱۴ نوامبر ۲۰۲۶
> **کد commit:** `fc26e43`
> **وضعیت:** ✅ **PASSED**
> **Gate بعدی:** Gate 4 — Booking, Request & Lead

---

## ۱. GAPهای بسته‌شده

| GAP | عنوان | تسک | شاهد |
|---|---|---|---|
| GAP-09 | User Auth/OTP | TC-086 | `User`, `UserOtp`, `JwtTokenService`, `IdentityAuthEndpoints` |
| GAP-10 | Profiles/Authors | TC-086 | `Profile` endpoints + `/authors/{username}` |
| GAP-26 | Agency Onboarding | TC-087 | `Agency.CreateOnboarding`, documents, approve/reject |
| GAP-27 | Agency/Admin Panels | TC-087 | onboarding/admin APIs + existing supplier APIs |
| GAP-31 | Trust/Legal | TC-087 | `/market/v1/trust` + config |
| GAP-11 | Reviews/UGC | TC-089 | `Review`, photos, criteria, helpful/report, moderation |
| GAP-20 | Ownership Claims | TC-089 | `OwnershipClaim`, approve/reject |
| GAP-32 | Media/UGC | TC-089 | `MediaAsset`, moderation |

---

## ۲. قابلیت‌های تحویل‌شده

### Identity

- OTP 6 رقمی با HMAC hash، TTL ۲ دقیقه، cooldown، rate limit و ۵ attempt.
- JWT access + refresh rotation/revoke.
- پروفایل کاربر و پروفایل عمومی نویسنده.
- Author profile عمومی.

### Agency / Trust

- Onboarding آژانس با مدارک (License/Website/Contract/Other).
- وضعیت Pending/Active/Rejected/Suspended.
- پنل داخلی لیست/Approve/Reject.
- پروفایل عمومی آژانس.
- Trust endpoint: تلفن/ایمیل/Enamad/قوانین/درباره.

### Reviews / Claims / Media

- Review چندمعیاره: Food/Cleanliness/Staff/Entertainment/Location/Value.
- عکس، helpful vote، report و moderation.
- Claim مالکیت/اصلاح اطلاعات با evidence و moderation.
- Media asset با نوع، size limit و moderation.

---

## ۳. Smoke Test واقعی

```text
OTP request/verify → access + refresh
GET /auth/me → user profile
POST /agencies/onboarding → Pending + document
GET /internal/v1/agencies?status=Pending → 1
POST /internal/v1/agencies/{id}/approve → Active
GET /market/v1/agencies/{slug} → public profile
GET /market/v1/trust → support info
POST /reviews → Pending
POST /internal/v1/reviews/{id}/publish → Published
GET /market/v1/reviews → author + rating
POST /reviews/{id}/helpful → true
POST /claims → Pending → Approve
POST /media → Pending → Approve
```

---

## ۴. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۱۰۷ passed |
| Architecture Tests | ۳۴ passed |
| Total | **۱۴۱ passed** |
| Migration drift | ندارد |
| `verify.ps1` | سبز |
| `check-baseline.ps1` | سبز |

---

## ۵. Deviation Audit علیه Lastsecond

| مورد | Lastsecond | Hani پس از Gate 3 |
|---|---|---|
| OTP/Login | موبایل/ایمیل/username | موبایل + OTP + JWT/refresh |
| Author profile | `/u/{username}` | `/market/v1/authors/{username}` |
| Reviews | چندمعیاره + عکس + like/report | همان + moderation |
| Agency onboarding | مدارک/شرایط | مدارک + Pending/Approve/Reject |
| Claims/Correction | فرم مالکیت/اصلاح | Claim + Evidence + moderation |
| Media/UGC | گالری کاربران | MediaAsset + moderation |
| Trust | Enamad/تماس/قوانین | Trust config endpoint |
| چندزبانه | تک‌زبانه | Hani-Better FA/EN/AR |

**نتیجه:** هیچ GAP باز در محدوده Gate 3 باقی نمانده است. گزینه‌های وابسته به Gateهای بعدی (BookingMode، Lead/RFQ، Hotel/Visa/Flights) وارد این Gate نشده‌اند.

---

## ۶. تصمیم

Gate 3 بسته شد. `currentGate = 4` و Gate بعدی **Booking, Request & Lead** است.

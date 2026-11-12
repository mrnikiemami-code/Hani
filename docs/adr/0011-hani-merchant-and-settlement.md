# ADR-0011 — مرچنت Hani، تسویه با آژانس و کمیسیون داینامیک

- **وضعیت:** Accepted (Locked) — با ADR-0024 تعدیل شده است
- **تاریخ:** 2026-11-10

> **تعدیل:** ADR-0024 مدل Merchant of Record را بر اساس `CollectionMode` تفکیک می‌کند؛ Online همچنان Hani-MoR است و ReservationRequest آژانس-MoR. متن تاریخی این ADR حفظ می‌شود.

## زمینه

مدل اولیه آژانس را Merchant of Record می‌دانست. تصمیم نهایی محصول این است که **پول مشتری به حساب Hani برسد** و Hani با آژانس تسویه کند؛ همچنین کمیسیون برای هر آژانس و هر محصول متفاوت باشد.

## تصمیم

1. **Hani Merchant of Record است.**
2. مشتری به درگاه/حساب Hani پرداخت می‌کند.
3. Hani فاکتور مشتری و فاکتور کمیسیون/تسویه را صادر می‌کند.
4. سهم آژانس بر اساس `SettlementTerms` قرارداد تسویه می‌شود.
5. `SettlementTerms` قابل تنظیم است:
   - پیش‌پرداخت / پس‌پرداخت
   - per booking / دوره‌ای (هفتگی، دوهفته‌ای، ماهانه)
   - پس از رزرو / پس از اتمام سفر
   - ناخالص / پس از کسر کمیسیون
   - Holdback برای refund/chargeback
   - Credit Limit
6. `PaymentIntent` دارای `MerchantScope=Hani`, `PspAccountRef=Hani PSP`, `FundsHeldBy=Hani`.
7. کمیسیون **داینامیک** است:
   - `AgencyCommissionRule(AgencyId, ProductType, Rate, Min, Max, EffectiveFrom/To)`
   - ProductType: `TOUR`, `FLIGHT_DOMESTIC`, `FLIGHT_INTERNATIONAL`, `HOTEL`, `VISA`
   - پلن فقط نرخ پایه می‌دهد؛ قرارداد آژانس override می‌کند.
   - نرخ در زمان رزرو snapshot می‌شود.
8. Split Payment فقط اگر PSP پشتیبانی کند؛ در غیر این صورت حساب واحد Hani + تسویه.

## پیامدها

**مثبت:** کنترل کامل تجربه پرداخت، یک فاکتور رسمی، امکان کمیسیون مذاکره‌ای، تسویه منعطف.

**منفی:** نیاز به PSP مناسب/ساختار حقوقی، مدیریت نقدینگی، Refund/Chargeback، Reconciliation و Settlement دقیق.

## جایگزین رد شده

- Merchant = آژانس: کنترل کمتر روی پرداخت و تسویه، عدم تطابق با تصمیم محصول.

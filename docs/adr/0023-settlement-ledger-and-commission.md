# ADR-0023 — Settlement Ledger و Accrual کمیسیون

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-12
- **تصمیم‌گیرندگان:** تیم Hani

## زمینه

پس از پرداخت موفق، Hani به‌عنوان Merchant of Record باید سهم خود (کمیسیون) و مبلغ قابل پرداخت به آژانس را ثبت کند. ثبت ساده مبلغ، قابلیت حسابرسی و double-entry را ندارد و نمی‌تواند پوشش refund/chargeback آینده را تضمین کند. نرخ کمیسیون هم باید per agency و per ProductType و بر اساس زمان سفارش snapshot شود.

## تصمیم

- ماژول `Settlement` با schema جداگانه `settlement` ایجاد می‌شود.
- پس از `payment.succeeded`، Payments از طریق قرارداد `ICommissionAccrualService` کمیسیون را accrual می‌کند.
- `AgencyCommissionRule` شامل `AgencyId`، `ProductType`، `Rate`، `MinAmount/MaxAmount` و بازه Effective است. اگر قاعده مؤثر نباشد، `Commissions:DefaultRate` استفاده می‌شود.
- `CommissionEntry` برای هر Order یکتاست و نرخ/منبع قاعده را snapshot می‌کند.
- `LedgerTransaction` و `LedgerEntry` الگوی double-entry را enforce می‌کنند:
  - مجموع Debit = مجموع Credit
  - هر خط فقط Debit یا Credit
  - حداقل دو خط
- حساب‌های اولیه: `psp_cash` (دارایی)، `agency_payable` (بدهی)، `commission_revenue` (درآمد).
- Accrual برای هر Order idempotent است.

## پیامدها

- هر پرداخت موفق، CommissionEntry + LedgerTransaction متوازن تولید می‌کند.
- محاسبه کمیسیون قابل audit و قابل snapshot است.
- Refund/Chargeback در آینده با Reversal/Offset روی همین Ledger مدل می‌شود.
- اگر ذخیره کمیسیون شکست بخورد، webhook قابل retry است و accrual دوباره اجرا نمی‌شود.

## جایگزین‌های رد شده

- **ثبت فقط یک مبلغ commission بدون Ledger:** double-entry و حسابرسی را از دست می‌دهد.
- **محاسبه commission در زمان گزارش:** نرخ/قاعده ممکن است تغییر کند و snapshot تاریخی از بین می‌رود.

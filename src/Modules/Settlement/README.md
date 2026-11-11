# Settlement Module

> **مسئولیت:** ثبت کمیسیون Hani برای سفارش‌های پرداخت‌شده و پست تراکنش‌های Double-Entry در Ledger. Hani Merchant of Record است و کمیسیون/مبلغ قابل پرداخت به آژانس از هم جدا نگهداری می‌شود.

## جریان

```
Order.Paid (Booking)
   → ICommissionAccrualService.AccrueAsync
       → انتخاب AgencyCommissionRule مؤثر (Agency + ProductType + زمان)
       → fallback به Commissions:DefaultRate
       → CommissionEntry(Accrued)
       → LedgerTransaction:
            Dr psp_cash            gross
            Cr agency_payable      net
            Cr commission_revenue  commission
```

## قواعد

- Accrual برای هر Order یکتاست (`ux_commission_entries_order_id`) و تکرار آن idempotent است.
- نرخ و منبع قانون (Rule/Default) در `CommissionEntry` snapshot می‌شوند.
- `commission = clamp(gross * rate, min, max)` و `net = gross - commission`.
- هر LedgerTransaction باید حداقل دو خط داشته باشد، هر خط فقط Debit یا Credit باشد و مجموع Debit = مجموع Credit.
- حساب‌ها: `psp_cash` (دارایی)، `agency_payable` (بدهی به آژانس)، `commission_revenue` (درآمد Hani).
- پس از پرداخت موفق، Payments این سرویس را از طریق `ICommissionAccrualService` صدا می‌زند.

## APIها

| متد | مسیر | Auth |
|---|---|---|
| POST | `/internal/v1/settlements/commission-rules` | داخلی |
| GET | `/internal/v1/settlements/commissions/{orderId}` | داخلی |
| GET | `/internal/v1/settlements/ledger/{transactionId}` | داخلی |

## Persistence

- Schema: `settlement`
- جدول‌ها: `commission_rules`, `commission_entries`, `ledger_transactions`, `ledger_entries`
- Migration: `InitialSettlement`

## پیکربندی

```json
"Commissions": {
  "DefaultRate": 0.10,
  "DefaultMinAmount": null,
  "DefaultMaxAmount": null
}
```

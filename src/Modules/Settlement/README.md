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

- Accrual برای هر `(OrderId, Currency)` یکتاست (`ux_commission_entries_order_currency`) و تکرار آن idempotent است.
- نرخ و منبع قانون (Rule/Default) در `CommissionEntry` snapshot می‌شوند.
- کمیسیون روی مبلغ نهایی همان ارز (شامل VAT/Duty) محاسبه می‌شود؛ برای Order چندارزی چند entry جدا ثبت می‌شود.
- `commission = clamp(gross * rate, min, max)` و `net = gross - commission`.
- هر LedgerTransaction باید حداقل دو خط داشته باشد، هر خط فقط Debit یا Credit باشد و مجموع Debit = مجموع Credit.
- حساب‌ها: `psp_cash` (دارایی)، `agency_payable` (بدهی به آژانس)، `commission_revenue` (درآمد Hani).
- پس از پرداخت موفق هر ارز، Payments این سرویس را از طریق `ICommissionAccrualService` صدا می‌زند.
- خواندن کمیسیون با `?currency=IRR` برای انتخاب ارز انجام می‌شود؛ بدون آن اولین entry برگردانده می‌شود.

## APIها

| متد | مسیر | Auth |
|---|---|---|
| POST | `/internal/v1/settlements/commission-rules` | داخلی |
| GET | `/internal/v1/settlements/commissions/{orderId}` | داخلی |
| GET | `/internal/v1/settlements/ledger/{transactionId}` | داخلی |
| POST | `/internal/v1/settlements/terms` | داخلی |
| GET | `/internal/v1/settlements/terms/{agencyId}` | داخلی |
| POST | `/internal/v1/settlements/payouts` | داخلی |
| POST | `/internal/v1/settlements/payouts/{payoutId}/paid` | داخلی |
| GET | `/internal/v1/settlements/payouts/{agencyId}` | داخلی |

## Persistence

- Schema: `settlement`
- جدول‌ها: `commission_rules`, `commission_entries`, `ledger_transactions`, `ledger_entries`
- Migrationها: `InitialSettlement`, `AddCommissionPerCurrency`, `AddGate7SettlementTermsAndPayouts`

## پیکربندی

```json
"Commissions": {
  "DefaultRate": 0.10,
  "DefaultMinAmount": null,
  "DefaultMaxAmount": null
}
```

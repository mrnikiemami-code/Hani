# ADR-0013 — ماژول Flights و چرخه PNR/Ticketing

- **وضعیت:** Accepted
- **تاریخ:** 2026-11-10

## زمینه

بلیط هواپیما از تور متفاوت است: موجودی سمت Supplier، Fare Rule، PNR، Ticketing Deadline و Refund.

## تصمیم

- ماژول مستقل `Flights` با Schema `flight`.
- Adapter pattern: `IFlightSupplier` + Mock + Consolidator/GDS.
- چرخه: Search → Quote → PNR → Payment → Ticketing → Refund.
- Saga با حالت‌های Quoted/PnrCreated/PaymentPending/Paid/Ticketed/Expired/Cancelled.
- Ticketing Deadline Job.
- Idempotency برای PNR/Ticket/Refund.
- **پرواز داخلی + بین‌المللی** هر دو در دامنه.
- فاز ۴ با یک Supplier پایلوت داخلی + یک Supplier پایلوت بین‌المللی (Consolidator/GDS).

## پیامدها

**مثبت:** جداسازی دامنه پرریسک، امکان افزودن Supplier، تطابق با واقعیت صنعت.

**منفی:** وابستگی به GDS/Consolidator، پیچیدگی Refund و Reconciliation.

## قواعد

- موجودی محلی منبع حقیقت نیست.
- قبل از retry، وضعیت PNR از Supplier خوانده شود.
- هیچ Ticketing بدون پرداخت تاییدشده انجام نمی‌شود.

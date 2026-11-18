"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { formatMoney } from "@/lib/hani/money";
import { refundAdminOrder } from "../application/admin-booking-actions";

/** Refunds a single payment intent so each currency is refunded separately. */
export function RefundPaymentAction({
  orderId,
  paymentIntentId,
  amount,
  currency,
  locale
}: {
  orderId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  locale: string;
}) {
  const t = useTranslations("adminBookings");
  const messages = useMessageBox();
  const [pending, startTransition] = useTransition();

  const refund = async () => {
    const confirmed = await messages.confirm({
      kind: "warning",
      title: t("refundConfirm"),
      message: t("refundHint", {
        amount: formatMoney(amount, currency, locale)
      }),
      confirmLabel: t("refund")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await refundAdminOrder(
        orderId,
        paymentIntentId,
        amount,
        t("refundReason")
      );
      if (result.ok) {
        messages.toast({ kind: "success", message: t("refunded") });
      } else {
        messages.toast({ kind: "error", message: t("refundError") });
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-outline-primary btn-sm"
      onClick={refund}
      disabled={pending}
    >
      {pending ? t("refunding") : t("refund")}
    </button>
  );
}

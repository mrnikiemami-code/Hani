"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { formatMoney } from "@/lib/hani/money";
import { refundAdminOrder } from "../application/admin-booking-actions";

/** Requests a refund approval for one payment intent. */
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
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const refund = async () => {
    const confirmed = await messages.confirm({
      kind: "warning",
      title: t("refundConfirm"),
      message: t("refundHint", {
        amount: formatMoney(amount, currency, locale)
      }),
      confirmLabel: t("requestRefund")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await refundAdminOrder(
        orderId,
        paymentIntentId,
        amount,
        currency,
        t("refundReason")
      );
      if (result.ok) {
        messages.toast({ kind: "success", message: t("refundRequested") });
        router.refresh();
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
      {pending ? t("requesting") : t("requestRefund")}
    </button>
  );
}

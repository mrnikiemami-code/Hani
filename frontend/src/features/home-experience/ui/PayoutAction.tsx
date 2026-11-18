"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { markPayoutPaid } from "../application/admin-booking-actions";

/** Marks a pending agency payout as paid. */
export function PayoutAction({ payoutId }: { payoutId: string }) {
  const t = useTranslations("adminFinance");
  const messages = useMessageBox();
  const [pending, startTransition] = useTransition();

  const markPaid = async () => {
    const confirmed = await messages.confirm({
      kind: "question",
      title: t("markPaidConfirm"),
      message: t("markPaidHint"),
      confirmLabel: t("markPaid")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await markPayoutPaid(payoutId);
      if (result.ok) {
        messages.toast({ kind: "success", message: t("paid") });
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-light btn-sm"
      onClick={markPaid}
      disabled={pending}
    >
      {pending ? t("saving") : t("markPaid")}
    </button>
  );
}

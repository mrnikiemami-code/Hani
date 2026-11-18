"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { cancelAdminOrder } from "../application/admin-booking-actions";

/** Cancel action for an admin order detail page. */
export function OrderActions({ orderId, disabled }: { orderId: string; disabled: boolean }) {
  const t = useTranslations("adminBookings");
  const messages = useMessageBox();
  const [pending, startTransition] = useTransition();

  const cancel = async () => {
    const confirmed = await messages.confirm({
      kind: "warning",
      title: t("cancelConfirm"),
      message: t("cancelReason"),
      confirmLabel: t("cancel")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await cancelAdminOrder(orderId, t("cancelReason"));
      if (result.ok) {
        messages.toast({ kind: "success", message: t("cancelled") });
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-light btn-sm text-danger"
      onClick={cancel}
      disabled={disabled || pending}
    >
      {pending ? t("cancelling") : t("cancel")}
    </button>
  );
}

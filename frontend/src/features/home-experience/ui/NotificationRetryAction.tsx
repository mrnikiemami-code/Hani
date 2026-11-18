"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { retryNotification } from "../application/admin-notification-actions";

/** Requeues a failed notification after confirmation. */
export function NotificationRetryAction({ id }: { id: string }) {
  const t = useTranslations("adminNotifications");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const retry = async () => {
    const confirmed = await messages.confirm({
      kind: "question",
      title: t("retryConfirm"),
      message: t("retryHint"),
      confirmLabel: t("retry")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await retryNotification(id);
      if (result.ok) {
        messages.toast({ kind: "success", message: t("retried") });
        router.refresh();
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-light btn-sm"
      onClick={retry}
      disabled={pending}
    >
      {pending ? t("saving") : t("retry")}
    </button>
  );
}

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { publishAdminTour } from "../application/admin-tour-actions";

/** Publishes a draft tour product. */
export function TourActions({ id }: { id: string }) {
  const t = useTranslations("adminTours");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const publish = async () => {
    const confirmed = await messages.confirm({
      kind: "question",
      title: t("publishConfirm"),
      message: t("publishHint"),
      confirmLabel: t("publish")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await publishAdminTour(id);
      if (result.ok) {
        messages.toast({ kind: "success", message: t("published") });
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
      onClick={publish}
      disabled={pending}
    >
      {pending ? t("saving") : t("publish")}
    </button>
  );
}

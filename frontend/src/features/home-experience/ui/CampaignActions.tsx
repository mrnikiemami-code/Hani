"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { activateAdminCampaign } from "../application/admin-marketing-actions";

/** Activates a draft campaign after a confirmation. */
export function CampaignActions({ slug }: { slug: string }) {
  const t = useTranslations("adminMarketing");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const activate = async () => {
    const confirmed = await messages.confirm({
      kind: "question",
      title: t("activateConfirm"),
      message: t("activateHint"),
      confirmLabel: t("activate")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await activateAdminCampaign(slug);
      if (result.ok) {
        messages.toast({ kind: "success", message: t("activated") });
        router.refresh();
      } else {
        messages.toast({ kind: "error", message: t("activateError") });
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-light btn-sm"
      onClick={activate}
      disabled={pending}
    >
      {pending ? t("saving") : t("activate")}
    </button>
  );
}

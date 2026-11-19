"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { updateVisaApplicationStatus } from "../application/admin-visa-actions";

/** Inline status transition for a visa application. */
export function VisaApplicationStatus({
  id,
  status
}: {
  id: string;
  status: string;
}) {
  const t = useTranslations("adminVisas");
  const messages = useMessageBox();
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [pending, setPending] = useState(false);

  const change = async (next: string) => {
    setValue(next);
    setPending(true);
    const result = await updateVisaApplicationStatus(id, next);
    setPending(false);
    if (!result.ok) {
      setValue(status);
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("updated") });
    router.refresh();
  };

  return (
    <select
      className="form-select form-select-sm"
      value={value}
      disabled={pending}
      onChange={(event) => change(event.target.value)}
      aria-label={t("status")}
    >
      {["Submitted", "UnderReview", "Approved", "Rejected", "Cancelled"].map(
        (item) => (
          <option value={item} key={item}>
            {item}
          </option>
        )
      )}
    </select>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5099";

/** Helpful/report actions for a published review. */
export function HotelReviewActions({
  reviewId,
  helpfulCount
}: {
  reviewId: string;
  helpfulCount: number;
}) {
  const t = useTranslations("hotelDetail");
  const messages = useMessageBox();
  const [helpful, setHelpful] = useState(helpfulCount);
  const [pending, setPending] = useState(false);

  const send = async (path: string, body?: unknown) => {
    setPending(true);
    try {
      const response = await fetch(`${apiBase}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body)
      });
      if (response.status === 401) {
        messages.toast({ kind: "warning", message: t("loginRequired") });
        return;
      }
      if (!response.ok) throw new Error("failed");
      messages.toast({ kind: "success", message: t("actionDone") });
    } catch {
      messages.toast({ kind: "error", message: t("actionError") });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="d-flex gap-3 align-items-center mt-2">
      <button
        type="button"
        className="btn btn-link p-0 fs-12"
        disabled={pending}
        onClick={() => {
          setHelpful((current) => current + 1);
          void send(`/market/v1/reviews/${reviewId}/helpful`);
        }}
      >
        {t("helpful")} ({helpful})
      </button>
      <button
        type="button"
        className="btn btn-link p-0 fs-12 text-danger"
        disabled={pending}
        onClick={() =>
          void send(`/market/v1/reviews/${reviewId}/report`, {
            reason: t("reportReason")
          })
        }
      >
        {t("report")}
      </button>
    </div>
  );
}

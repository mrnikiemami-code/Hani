"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { replySupportTicket } from "../application/admin-support-actions";

/** Adds an admin reply or an internal note to a support ticket. */
export function SupportReplyForm({ id }: { id: string }) {
  const t = useTranslations("adminSupport");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [body, setBody] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) {
      messages.toast({ kind: "error", message: t("messageRequired") });
      return;
    }

    setPending(true);
    const result = await replySupportTicket(id, body.trim(), isInternal);
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setBody("");
    setIsInternal(false);
    messages.toast({ kind: "success", message: t("replyAdded") });
    router.refresh();
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{t("replyTitle")}</h2>
      </div>
      <div className="card-body">
        <textarea
          className="form-control mb-3"
          rows={4}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={5000}
          placeholder={t("replyPlaceholder")}
          required
        />
        <div className="form-check">
          <input
            id="support-internal-note"
            className="form-check-input"
            type="checkbox"
            checked={isInternal}
            onChange={(event) => setIsInternal(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="support-internal-note">
            {t("internalNoteHint")}
          </label>
        </div>
      </div>
      <div className="card-footer bg-white d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? t("saving") : t("sendReply")}
        </button>
      </div>
    </form>
  );
}

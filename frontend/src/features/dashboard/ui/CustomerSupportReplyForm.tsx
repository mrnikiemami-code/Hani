"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { replyMySupportTicket } from "../application/customer-support-actions";

/** Customer reply form for one support ticket. */
export function CustomerSupportReplyForm({ id }: { id: string }) {
  const t = useTranslations("supportCenter");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [body, setBody] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) {
      messages.toast({ kind: "error", message: t("messageRequired") });
      return;
    }

    setPending(true);
    const result = await replyMySupportTicket(id, body.trim());
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setBody("");
    messages.toast({ kind: "success", message: t("replyAdded") });
    router.refresh();
  };

  return (
    <form className="card" onSubmit={submit}>
      <div className="card-header">
        <h5 className="mb-0">{t("replyTitle")}</h5>
      </div>
      <div className="card-body">
        <textarea
          className="form-control"
          rows={4}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={5000}
          placeholder={t("replyPlaceholder")}
          required
        />
      </div>
      <div className="card-footer bg-white d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? t("saving") : t("sendReply")}
        </button>
      </div>
    </form>
  );
}

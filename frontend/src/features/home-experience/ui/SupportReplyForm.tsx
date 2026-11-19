"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import {
  replySupportTicket,
  uploadSupportAttachment
} from "../application/admin-support-actions";

/** Adds an admin reply or an internal note to a support ticket. */
export function SupportReplyForm({ id }: { id: string }) {
  const t = useTranslations("adminSupport");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [body, setBody] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) {
      messages.toast({ kind: "error", message: t("messageRequired") });
      return;
    }

    const tooLarge = files.find((file) => file.size > 10 * 1024 * 1024);
    if (tooLarge) {
      messages.toast({ kind: "error", message: t("attachmentTooLarge") });
      return;
    }

    setPending(true);
    const attachmentIds: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const upload = await uploadSupportAttachment(id, formData);
      if (!upload.ok || !upload.id) {
        setPending(false);
        messages.toast({ kind: "error", message: t("attachmentError") });
        return;
      }
      attachmentIds.push(upload.id);
    }

    const result = await replySupportTicket(
      id,
      body.trim(),
      isInternal,
      attachmentIds
    );
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setBody("");
    setIsInternal(false);
    setFiles([]);
    if (fileInput.current) fileInput.current.value = "";
    messages.toast({ kind: "success", message: t("replyAdded") });
    router.refresh();
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{t("replyTitle")}</h2>
      </div>
      <div className="card-body">
        <select
          className="form-select mb-3"
          value=""
          onChange={(event) => {
            if (event.target.value) {
              setBody(t(event.target.value));
            }
          }}
          aria-label={t("quickReply")}
        >
          <option value="">{t("quickReply")}</option>
          <option value="quickReplyChecking">{t("quickReplyChecking")}</option>
          <option value="quickReplyMoreInfo">{t("quickReplyMoreInfo")}</option>
          <option value="quickReplyResolved">{t("quickReplyResolved")}</option>
        </select>
        <textarea
          className="form-control mb-3"
          rows={4}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={5000}
          placeholder={t("replyPlaceholder")}
          required
        />
        <div className="mt-3">
          <label className="form-label" htmlFor="admin-support-files">
            {t("attachments")}
          </label>
          <input
            ref={fileInput}
            id="admin-support-files"
            type="file"
            className="form-control"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf,.txt"
            onChange={(event) =>
              setFiles(Array.from(event.target.files ?? []))
            }
          />
          <span className="fs-12 text-gray-6">{t("attachmentHint")}</span>
        </div>
        <div className="form-check mt-3">
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

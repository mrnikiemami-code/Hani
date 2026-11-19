"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import {
  replyMySupportTicket,
  uploadMySupportAttachment
} from "../application/customer-support-actions";

/** Customer reply form for one support ticket. */
export function CustomerSupportReplyForm({ id }: { id: string }) {
  const t = useTranslations("supportCenter");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [body, setBody] = useState("");
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
      const upload = await uploadMySupportAttachment(id, formData);
      if (!upload.ok || !upload.id) {
        setPending(false);
        messages.toast({ kind: "error", message: t("attachmentError") });
        return;
      }
      attachmentIds.push(upload.id);
    }

    const result = await replyMySupportTicket(id, body.trim(), attachmentIds);
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setBody("");
    setFiles([]);
    if (fileInput.current) fileInput.current.value = "";
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
        <div className="mt-3">
          <label className="form-label" htmlFor="customer-support-files">
            {t("attachments")}
          </label>
          <input
            ref={fileInput}
            id="customer-support-files"
            type="file"
            className="form-control"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf,.txt"
            onChange={(event) =>
              setFiles(Array.from(event.target.files ?? []))
            }
          />
          <span className="fs-12 text-gray-6">
            {t("attachmentHint")}
          </span>
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

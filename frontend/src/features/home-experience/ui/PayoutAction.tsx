"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { requestSettlementApproval } from "../application/admin-booking-actions";

/**
 * Settlement request form. The payout is not marked paid here; a second
 * administrator must approve the request with its bank evidence.
 */
export function PayoutAction({ payoutId }: { payoutId: string }) {
  const t = useTranslations("adminFinance");
  const messages = useMessageBox();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [bankReference, setBankReference] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!bankReference.trim() || !documentUrl.trim() || !reason.trim()) {
      setError(t("settlementEvidenceRequired"));
      return;
    }
    try {
      const parsed = new URL(documentUrl);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        setError(t("settlementDocumentInvalid"));
        return;
      }
    } catch {
      setError(t("settlementDocumentInvalid"));
      return;
    }

    setPending(true);
    const result = await requestSettlementApproval(
      payoutId,
      bankReference.trim(),
      documentUrl.trim(),
      reason.trim()
    );
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    setOpen(false);
    setBankReference("");
    setDocumentUrl("");
    setReason("");
    messages.toast({ kind: "success", message: t("settlementRequested") });
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-light btn-sm"
        onClick={() => setOpen(true)}
      >
        {t("requestSettlement")}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settlement-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="settlement-modal-title">
                      {t("settlementTitle")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <p className="fs-13 text-gray-6">
                      {t("settlementHint")}
                    </p>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="settlement-bank-ref">
                        {t("bankReference")}
                      </label>
                      <input
                        id="settlement-bank-ref"
                        className="form-control"
                        value={bankReference}
                        onChange={(event) => setBankReference(event.target.value)}
                        maxLength={200}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="settlement-document">
                        {t("settlementDocument")}
                      </label>
                      <input
                        id="settlement-document"
                        className="form-control"
                        dir="ltr"
                        inputMode="url"
                        placeholder="https://"
                        value={documentUrl}
                        onChange={(event) => setDocumentUrl(event.target.value)}
                        maxLength={1000}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label" htmlFor="settlement-reason">
                        {t("reason")}
                      </label>
                      <textarea
                        id="settlement-reason"
                        className="form-control"
                        rows={3}
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        maxLength={1000}
                        required
                      />
                    </div>
                    {error && (
                      <div className="alert alert-danger py-2 mb-0" role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setOpen(false)}
                      disabled={pending}
                    >
                      {t("cancel")}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={pending}>
                      {pending ? t("saving") : t("requestSettlement")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
      {open &&
        typeof document !== "undefined" &&
        createPortal(<div className="modal-backdrop fade show" />, document.body)}
    </>
  );
}

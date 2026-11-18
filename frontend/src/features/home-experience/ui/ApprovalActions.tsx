"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import {
  approveAdminApproval,
  rejectAdminApproval
} from "../application/admin-booking-actions";

type DecisionMode = "approve" | "reject";

/** Approve or reject a pending two-person financial request. */
export function ApprovalActions({ approvalId }: { approvalId: string }) {
  const t = useTranslations("adminFinance");
  const messages = useMessageBox();
  const router = useRouter();
  const [mode, setMode] = useState<DecisionMode | null>(null);
  const [reason, setReason] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mode) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mode]);

  const close = () => {
    setMode(null);
    setReason("");
    setError(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mode) return;
    if (mode === "reject" && !reason.trim()) {
      setError(t("approvalReasonRequired"));
      return;
    }

    setPending(true);
    const result =
      mode === "approve"
        ? await approveAdminApproval(approvalId, reason.trim())
        : await rejectAdminApproval(approvalId, reason.trim());
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    close();
    messages.toast({
      kind: "success",
      message: mode === "approve" ? t("approved") : t("rejected")
    });
    router.refresh();
  };

  return (
    <>
      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setMode("approve")}
        >
          {t("approve")}
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm text-danger"
          onClick={() => setMode("reject")}
        >
          {t("reject")}
        </button>
      </div>
      {mode &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="approval-modal-title">
                      {mode === "approve" ? t("approveTitle") : t("rejectTitle")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={close}
                    />
                  </div>
                  <div className="modal-body">
                    <p className="fs-13 text-gray-6">
                      {mode === "approve" ? t("approveHint") : t("rejectHint")}
                    </p>
                    <label className="form-label" htmlFor="approval-reason">
                      {t("reason")}
                      {mode === "reject" ? "" : ` (${t("optional")})`}
                    </label>
                    <textarea
                      id="approval-reason"
                      className="form-control"
                      rows={3}
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      maxLength={1000}
                      required={mode === "reject"}
                    />
                    {error && (
                      <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={close}
                      disabled={pending}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      className={`btn ${
                        mode === "approve" ? "btn-primary" : "btn-danger"
                      }`}
                      disabled={pending}
                    >
                      {pending
                        ? t("saving")
                        : mode === "approve"
                          ? t("approve")
                          : t("reject")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
      {mode &&
        typeof document !== "undefined" &&
        createPortal(<div className="modal-backdrop fade show" />, document.body)}
    </>
  );
}

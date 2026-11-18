"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import {
  approveSupplierOffer,
  rejectSupplierOffer
} from "../application/admin-supplier-actions";

/** Approve or reject one supplier offer. */
export function SupplierOfferActions({ offerId }: { offerId: string }) {
  const t = useTranslations("adminSuppliers");
  const messages = useMessageBox();
  const router = useRouter();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rejecting) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [rejecting]);

  const approve = async () => {
    const confirmed = await messages.confirm({
      kind: "question",
      title: t("approveConfirm"),
      message: t("approveHint"),
      confirmLabel: t("approve")
    });
    if (!confirmed) return;

    setPending(true);
    const result = await approveSupplierOffer(offerId);
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("approved") });
    router.refresh();
  };

  const reject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reason.trim()) {
      setError(t("reasonRequired"));
      return;
    }

    setPending(true);
    const result = await rejectSupplierOffer(offerId, reason.trim());
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }
    setRejecting(false);
    setReason("");
    setError(null);
    messages.toast({ kind: "success", message: t("rejected") });
    router.refresh();
  };

  return (
    <>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={approve} disabled={pending}>
          {t("approve")}
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm text-danger"
          onClick={() => setRejecting(true)}
          disabled={pending}
        >
          {t("reject")}
        </button>
      </div>
      {rejecting &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="supplier-reject-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setRejecting(false);
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={reject}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="supplier-reject-title">
                      {t("rejectTitle")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={() => setRejecting(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <label className="form-label" htmlFor="supplier-reject-reason">
                      {t("reason")}
                    </label>
                    <textarea
                      id="supplier-reject-reason"
                      className="form-control"
                      rows={3}
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      maxLength={1000}
                      required
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
                      onClick={() => setRejecting(false)}
                      disabled={pending}
                    >
                      {t("cancel")}
                    </button>
                    <button type="submit" className="btn btn-danger" disabled={pending}>
                      {pending ? t("saving") : t("reject")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
      {rejecting &&
        typeof document !== "undefined" &&
        createPortal(<div className="modal-backdrop fade show" />, document.body)}
    </>
  );
}

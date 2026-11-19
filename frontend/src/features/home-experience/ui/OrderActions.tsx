"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { cancelAdminOrder } from "../application/admin-booking-actions";

/** Cancels an admin order after capturing an explicit reason. */
export function OrderActions({
  orderId,
  disabled
}: {
  orderId: string;
  disabled: boolean;
}) {
  const t = useTranslations("adminBookings");
  const messages = useMessageBox();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [pending, setPending] = useState(false);
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

  const close = () => {
    setOpen(false);
    setReason("");
    setError(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reason.trim()) {
      setError(t("cancelReasonRequired"));
      return;
    }

    setPending(true);
    const result = await cancelAdminOrder(orderId, reason.trim());
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    close();
    messages.toast({ kind: "success", message: t("cancelled") });
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-light btn-sm text-danger"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        {t("cancel")}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-order-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="cancel-order-title">
                      {t("cancelTitle")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={close}
                    />
                  </div>
                  <div className="modal-body">
                    <p className="fs-13 text-gray-6">{t("cancelHint")}</p>
                    <label className="form-label" htmlFor="cancel-order-reason">
                      {t("cancelReason")}
                    </label>
                    <textarea
                      id="cancel-order-reason"
                      className="form-control"
                      rows={3}
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      maxLength={500}
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
                      onClick={close}
                      disabled={pending}
                    >
                      {t("back")}
                    </button>
                    <button type="submit" className="btn btn-danger" disabled={pending}>
                      {pending ? t("cancelling") : t("cancel")}
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

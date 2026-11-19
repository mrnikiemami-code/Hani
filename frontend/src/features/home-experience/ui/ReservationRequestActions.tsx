"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import {
  confirmAdminReservation,
  rejectAdminReservation
} from "../application/admin-booking-actions";

type RequestDecisionMode = "confirm" | "reject";

/** Confirms or rejects a pending reservation request. */
export function ReservationRequestActions({ requestId }: { requestId: string }) {
  const t = useTranslations("adminBookings");
  const messages = useMessageBox();
  const router = useRouter();
  const [mode, setMode] = useState<RequestDecisionMode | null>(null);
  const [text, setText] = useState("");
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
    setText("");
    setError(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mode) return;
    if (mode === "reject" && !text.trim()) {
      setError(t("requestReasonRequired"));
      return;
    }

    setPending(true);
    const result =
      mode === "confirm"
        ? await confirmAdminReservation(requestId, text.trim() || null)
        : await rejectAdminReservation(requestId, text.trim());
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    close();
    messages.toast({
      kind: "success",
      message:
        mode === "confirm" ? t("requestConfirmed") : t("requestRejected")
    });
    router.refresh();
  };

  return (
    <>
      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setMode("confirm")}
        >
          {t("confirmRequest")}
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm text-danger"
          onClick={() => setMode("reject")}
        >
          {t("rejectRequest")}
        </button>
      </div>
      {mode &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="request-modal-title">
                      {mode === "confirm"
                        ? t("confirmRequestTitle")
                        : t("rejectRequestTitle")}
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
                      {mode === "confirm"
                        ? t("confirmRequestHint")
                        : t("rejectRequestHint")}
                    </p>
                    <label className="form-label" htmlFor="request-text">
                      {mode === "confirm" ? t("note") : t("reason")}
                      {mode === "confirm" ? ` (${t("optional")})` : ""}
                    </label>
                    <textarea
                      id="request-text"
                      className="form-control"
                      rows={3}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
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
                        mode === "confirm" ? "btn-primary" : "btn-danger"
                      }`}
                      disabled={pending}
                    >
                      {pending
                        ? t("saving")
                        : mode === "confirm"
                          ? t("confirmRequest")
                          : t("rejectRequest")}
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

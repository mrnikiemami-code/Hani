"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { createMySupportDispute } from "../application/customer-support-actions";

const TYPES = [
  "Refund",
  "Cancellation",
  "ServiceQuality",
  "Pricing",
  "NoShow",
  "Other"
] as const;

/** Opens a dispute on the customer's own support ticket. */
export function CustomerDisputeForm({ ticketId }: { ticketId: string }) {
  const t = useTranslations("supportCenter");
  const messages = useMessageBox();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [type, setType] = useState("Refund");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("IRR");
  const [description, setDescription] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
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
    if (!description.trim()) {
      setError(t("disputeDescriptionRequired"));
      return;
    }

    if (amount.trim() && !/^[A-Za-z]{3}$/.test(currency.trim())) {
      setError(t("disputeCurrencyInvalid"));
      return;
    }

    setPending(true);
    const result = await createMySupportDispute(ticketId, {
      orderId: orderId.trim() || null,
      type,
      amount: amount.trim() ? Number(amount) : null,
      currency: amount.trim() ? currency.trim().toUpperCase() : null,
      description: description.trim(),
      evidenceUrl: evidenceUrl.trim() || null
    });
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    setOpen(false);
    setDescription("");
    setAmount("");
    setEvidenceUrl("");
    setOrderId("");
    messages.toast({ kind: "success", message: t("disputeOpened") });
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        onClick={() => setOpen(true)}
      >
        {t("openDispute")}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-dispute-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <form onSubmit={submit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="customer-dispute-title">
                      {t("openDispute")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="customer-dispute-type">
                          {t("disputeType")}
                        </label>
                        <select
                          id="customer-dispute-type"
                          className="form-select"
                          value={type}
                          onChange={(event) => setType(event.target.value)}
                        >
                          {TYPES.map((item) => (
                            <option key={item} value={item}>
                              {t(`disputeType${item}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="customer-dispute-order">
                          {t("order")}
                        </label>
                        <input
                          id="customer-dispute-order"
                          className="form-control"
                          dir="ltr"
                          value={orderId}
                          onChange={(event) => setOrderId(event.target.value)}
                          maxLength={36}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="customer-dispute-amount">
                          {t("amount")}
                        </label>
                        <input
                          id="customer-dispute-amount"
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          value={amount}
                          onChange={(event) => setAmount(event.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="customer-dispute-currency">
                          {t("currency")}
                        </label>
                        <input
                          id="customer-dispute-currency"
                          className="form-control"
                          dir="ltr"
                          maxLength={3}
                          value={currency}
                          onChange={(event) =>
                            setCurrency(event.target.value.toUpperCase())
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="customer-dispute-evidence">
                          {t("evidenceUrl")}
                        </label>
                        <input
                          id="customer-dispute-evidence"
                          className="form-control"
                          dir="ltr"
                          value={evidenceUrl}
                          onChange={(event) => setEvidenceUrl(event.target.value)}
                          maxLength={1000}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label" htmlFor="customer-dispute-description">
                          {t("description")}
                        </label>
                        <textarea
                          id="customer-dispute-description"
                          className="form-control"
                          rows={4}
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                          maxLength={4000}
                          required
                        />
                      </div>
                    </div>
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
                      onClick={() => setOpen(false)}
                      disabled={pending}
                    >
                      {t("cancel")}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={pending}>
                      {pending ? t("saving") : t("openDispute")}
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

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { SupportDispute } from "../domain/admin-support";
import {
  createSupportDispute,
  updateSupportDisputeStatus
} from "../application/admin-support-actions";

const TYPES = [
  "Refund",
  "Cancellation",
  "ServiceQuality",
  "Pricing",
  "NoShow",
  "Other"
] as const;

const TERMINAL = ["Resolved", "Rejected"];

/** Lists disputes for a ticket and exposes the dispute workflow. */
export function SupportDisputePanel({
  ticketId,
  disputes
}: {
  ticketId: string;
  disputes: SupportDispute[];
}) {
  const t = useTranslations("adminSupport");
  const locale = useLocale();
  const messages = useMessageBox();
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [manage, setManage] = useState<{
    dispute: SupportDispute;
    status: string;
  } | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("Refund");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("IRR");
  const [description, setDescription] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [resolution, setResolution] = useState("");

  useEffect(() => {
    if (!createOpen && !manage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCreateOpen(false);
        setManage(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [createOpen, manage]);

  const resetCreate = () => {
    setType("Refund");
    setOrderId("");
    setAmount("");
    setCurrency("IRR");
    setDescription("");
    setEvidenceUrl("");
    setError(null);
  };

  const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
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
    const result = await createSupportDispute(ticketId, {
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

    setCreateOpen(false);
    resetCreate();
    messages.toast({ kind: "success", message: t("disputeOpened") });
    router.refresh();
  };

  const submitStatus = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!manage) return;
    setError(null);
    if (
      ["Resolved", "Rejected"].includes(manage.status) &&
      !resolution.trim()
    ) {
      setError(t("disputeResolutionRequired"));
      return;
    }

    setPending(true);
    const result = await updateSupportDisputeStatus(
      manage.dispute.id,
      manage.status,
      resolution.trim() || null
    );
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    setManage(null);
    setResolution("");
    messages.toast({ kind: "success", message: t("disputeUpdated") });
    router.refresh();
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h2 className="h5 mb-0">{t("disputes")}</h2>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setCreateOpen(true)}
        >
          {t("openDispute")}
        </button>
      </div>
      <div className="card-body">
        {disputes.length === 0 && (
          <p className="fs-13 text-gray-6 mb-0">{t("noDisputes")}</p>
        )}
        {disputes.map((dispute) => (
          <div className="border rounded p-3 mb-3" key={dispute.id}>
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
              <div>
                <strong className="fs-14">
                  {t(`disputeType${dispute.type}`)} · {t(`disputeStatus${dispute.status}`)}
                </strong>
                {dispute.amount != null && dispute.currency && (
                  <span className="d-block fs-13 text-gray-6">
                    {formatMoney(dispute.amount, dispute.currency, locale)}
                  </span>
                )}
                {dispute.orderId && (
                  <span className="d-block fs-12 text-gray-6" dir="ltr">
                    {t("order")}: {dispute.orderId}
                  </span>
                )}
              </div>
              <span className="fs-12 text-gray-6">
                {formatIsoInstant(dispute.openedAt, locale, {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </span>
            </div>
            <p className="fs-14 mb-2 text-break">{dispute.description}</p>
            {dispute.evidenceUrl && (
              <a
                href={dispute.evidenceUrl}
                target="_blank"
                rel="noreferrer"
                className="link-primary fs-13 d-inline-block mb-2"
              >
                {t("evidence")}
              </a>
            )}
            {dispute.resolution && (
              <div className="alert alert-light py-2 mb-2">
                <span className="fs-12 text-gray-6 d-block">
                  {t("resolution")}
                </span>
                <span className="fs-14 text-break">{dispute.resolution}</span>
              </div>
            )}
            {!TERMINAL.includes(dispute.status) && (
              <div className="d-flex flex-wrap gap-2">
                {["Investigating", "AwaitingCustomer", "Resolved", "Rejected"].map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      className={`btn btn-sm ${
                        status === "Rejected" ? "btn-light text-danger" : "btn-light"
                      }`}
                      onClick={() => {
                        setResolution("");
                        setError(null);
                        setManage({ dispute, status });
                      }}
                    >
                      {t(`disputeAction${status}`)}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {createOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dispute-create-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setCreateOpen(false);
            }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <form onSubmit={submitCreate}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="dispute-create-title">
                      {t("openDispute")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={() => setCreateOpen(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="dispute-type">
                          {t("disputeType")}
                        </label>
                        <select
                          id="dispute-type"
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
                        <label className="form-label" htmlFor="dispute-order">
                          {t("order")}
                        </label>
                        <input
                          id="dispute-order"
                          className="form-control"
                          dir="ltr"
                          value={orderId}
                          onChange={(event) => setOrderId(event.target.value)}
                          maxLength={36}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="dispute-amount">
                          {t("amount")}
                        </label>
                        <input
                          id="dispute-amount"
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          value={amount}
                          onChange={(event) => setAmount(event.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="dispute-currency">
                          {t("currency")}
                        </label>
                        <input
                          id="dispute-currency"
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
                        <label className="form-label" htmlFor="dispute-evidence">
                          {t("evidenceUrl")}
                        </label>
                        <input
                          id="dispute-evidence"
                          className="form-control"
                          dir="ltr"
                          value={evidenceUrl}
                          onChange={(event) => setEvidenceUrl(event.target.value)}
                          maxLength={1000}
                        />
                      </div>
                      <div className="col-12">
                        <label
                          className="form-label"
                          htmlFor="dispute-description"
                        >
                          {t("description")}
                        </label>
                        <textarea
                          id="dispute-description"
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
                      onClick={() => setCreateOpen(false)}
                      disabled={pending}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={pending}
                    >
                      {pending ? t("saving") : t("openDispute")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}

      {manage &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dispute-status-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setManage(null);
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submitStatus}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="dispute-status-title">
                      {t(`disputeAction${manage.status}`)}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={() => setManage(null)}
                    />
                  </div>
                  <div className="modal-body">
                    <p className="fs-13 text-gray-6">
                      {t(`disputeStatusHint${manage.status}`)}
                    </p>
                    {["Resolved", "Rejected"].includes(manage.status) && (
                      <div>
                        <label
                          className="form-label"
                          htmlFor="dispute-resolution"
                        >
                          {t("resolution")}
                        </label>
                        <textarea
                          id="dispute-resolution"
                          className="form-control"
                          rows={4}
                          value={resolution}
                          onChange={(event) => setResolution(event.target.value)}
                          maxLength={4000}
                          required
                        />
                      </div>
                    )}
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
                      onClick={() => setManage(null)}
                      disabled={pending}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={pending}
                    >
                      {pending ? t("saving") : t("save")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}

      {(createOpen || manage) &&
        typeof document !== "undefined" &&
        createPortal(<div className="modal-backdrop fade show" />, document.body)}
    </div>
  );
}

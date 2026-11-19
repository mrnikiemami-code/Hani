"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import { useMessageBox } from "@/components/hani/message-provider";
import type { IsoDate } from "@/lib/hani/calendar";
import { addIsoDays, todayIsoDate } from "@/lib/hani/calendar";
import { runReconciliation } from "../application/admin-finance-actions";

/** Runs a provider reconciliation for a date range and currency. */
export function RunReconciliationAction({
  currencies
}: {
  currencies: string[];
}) {
  const t = useTranslations("adminFinance");
  const messages = useMessageBox();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [provider, setProvider] = useState("");
  const [start, setStart] = useState<IsoDate>(addIsoDays(todayIsoDate(), -30));
  const [end, setEnd] = useState<IsoDate>(todayIsoDate());
  const [currency, setCurrency] = useState(currencies[0] ?? "IRR");
  const [actualAmount, setActualAmount] = useState("");
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
    if (!provider.trim() || !actualAmount.trim()) {
      setError(t("reconciliationRequired"));
      return;
    }

    if (!start || !end || end < start) {
      setError(t("reconciliationPeriodInvalid"));
      return;
    }

    setPending(true);
    const result = await runReconciliation({
      provider: provider.trim(),
      periodStart: start,
      periodEnd: end,
      currency,
      actualAmount: Number(actualAmount)
    });
    setPending(false);
    if (!result.ok) {
      setError(t("error"));
      return;
    }

    setOpen(false);
    setProvider("");
    setActualAmount("");
    messages.toast({ kind: "success", message: t("reconciliationCreated") });
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => setOpen(true)}
      >
        {t("runReconciliation")}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reconciliation-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="reconciliation-modal-title">
                      {t("runReconciliation")}
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
                      {t("runReconciliationHint")}
                    </p>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="reconciliation-provider">
                        {t("provider")}
                      </label>
                      <input
                        id="reconciliation-provider"
                        className="form-control"
                        dir="ltr"
                        value={provider}
                        onChange={(event) => setProvider(event.target.value)}
                        maxLength={80}
                        required
                      />
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label">
                          {t("periodStart")}
                        </label>
                        <HaniDatePicker
                          value={start}
                          onChange={(value) => value && setStart(value)}
                          ariaLabel={t("periodStart")}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">{t("periodEnd")}</label>
                        <HaniDatePicker
                          value={end}
                          onChange={(value) => value && setEnd(value)}
                          ariaLabel={t("periodEnd")}
                        />
                      </div>
                    </div>
                    <div className="row g-3 mb-2">
                      <div className="col-sm-6">
                        <label
                          className="form-label"
                          htmlFor="reconciliation-currency"
                        >
                          {t("currency")}
                        </label>
                        <select
                          id="reconciliation-currency"
                          className="form-select"
                          value={currency}
                          onChange={(event) => setCurrency(event.target.value)}
                        >
                          {currencies.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label
                          className="form-label"
                          htmlFor="reconciliation-actual"
                        >
                          {t("actualAmount")}
                        </label>
                        <input
                          id="reconciliation-actual"
                          type="number"
                          className="form-control"
                          min={0}
                          step="0.01"
                          value={actualAmount}
                          onChange={(event) =>
                            setActualAmount(event.target.value)
                          }
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={pending}
                    >
                      {pending ? t("saving") : t("runReconciliation")}
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

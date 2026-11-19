"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import { useMessageBox } from "@/components/hani/message-provider";
import type { IsoDate } from "@/lib/hani/calendar";
import { todayIsoDate } from "@/lib/hani/calendar";
import type {
  AdminBankAccount,
  AdminCurrencySetting,
  AdminFinanceSettings,
  AdminTaxRule
} from "../domain/admin-finance-settings";
import { saveFinanceSettings } from "../application/admin-finance-actions";

const ROUNDING = ["Nearest", "Up", "Down", "None"] as const;
const INCLUSION = ["Included", "Excluded", "Exempt", "NotApplicable"] as const;
const BANK_TYPES = ["Acquiring", "Settlement"] as const;

const iso = (value: string | null): IsoDate | null =>
  (value as IsoDate | null) ?? null;

const newBank = (): AdminBankAccount => ({
  code: "",
  name: "",
  bankName: "",
  iban: "",
  currency: "IRR",
  type: "Acquiring",
  isActive: true
});

const newCurrency = (): AdminCurrencySetting => ({
  code: "",
  name: "",
  symbol: "",
  decimals: 2,
  rounding: "Nearest",
  isActive: true,
  fxRate: null,
  fxSource: null,
  fxEffectiveDate: null
});

const newTaxRule = (): AdminTaxRule => ({
  code: "",
  name: "",
  kind: "VAT",
  ratePercent: 0,
  inclusion: "Excluded",
  effectiveFrom: todayIsoDate(),
  effectiveTo: null,
  isActive: true
});

/** Edits bank accounts, currencies, tax rules, and settlement policy. */
export function FinanceSettingsEditor({
  initial
}: {
  initial: AdminFinanceSettings;
}) {
  const t = useTranslations("adminFinance");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bankAccounts, setBankAccounts] = useState(initial.bankAccounts);
  const [currencies, setCurrencies] = useState(initial.currencies);
  const [taxRules, setTaxRules] = useState(initial.taxRules);
  const [settlement, setSettlement] = useState(initial.settlement);

  const updateBank = (index: number, patch: Partial<AdminBankAccount>) =>
    setBankAccounts((items) =>
      items.map((item, current) =>
        current === index ? { ...item, ...patch } : item
      )
    );

  const updateCurrency = (
    index: number,
    patch: Partial<AdminCurrencySetting>
  ) =>
    setCurrencies((items) =>
      items.map((item, current) =>
        current === index ? { ...item, ...patch } : item
      )
    );

  const updateTax = (index: number, patch: Partial<AdminTaxRule>) =>
    setTaxRules((items) =>
      items.map((item, current) =>
        current === index ? { ...item, ...patch } : item
      )
    );

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!currencies.some((item) => item.isActive)) {
      setError(t("activeCurrencyRequired"));
      return;
    }

    setPending(true);
    const result = await saveFinanceSettings({
      bankAccounts,
      currencies,
      taxRules,
      settlement
    });
    setPending(false);
    if (!result.ok || !result.data) {
      setError(t("error"));
      return;
    }

    setBankAccounts(result.data.bankAccounts);
    setCurrencies(result.data.currencies);
    setTaxRules(result.data.taxRules);
    setSettlement(result.data.settlement);
    messages.toast({ kind: "success", message: t("saved") });
    router.refresh();
  };

  return (
    <form onSubmit={submit}>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("bankAccounts")}</h2>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => setBankAccounts((items) => [...items, newBank()])}
          >
            {t("addBankAccount")}
          </button>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("code")}</th>
                <th>{t("name")}</th>
                <th>{t("bankName")}</th>
                <th>{t("iban")}</th>
                <th>{t("currency")}</th>
                <th>{t("type")}</th>
                <th>{t("active")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bankAccounts.map((item, index) => (
                <tr key={`${item.code}-${index}`}>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      value={item.code}
                      onChange={(event) =>
                        updateBank(index, { code: event.target.value })
                      }
                      maxLength={40}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={item.name}
                      onChange={(event) =>
                        updateBank(index, { name: event.target.value })
                      }
                      maxLength={200}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={item.bankName}
                      onChange={(event) =>
                        updateBank(index, { bankName: event.target.value })
                      }
                      maxLength={200}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      value={item.iban}
                      onChange={(event) =>
                        updateBank(index, { iban: event.target.value })
                      }
                      maxLength={64}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      value={item.currency}
                      onChange={(event) =>
                        updateBank(index, {
                          currency: event.target.value.toUpperCase()
                        })
                      }
                      maxLength={3}
                      required
                    />
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={item.type}
                      onChange={(event) =>
                        updateBank(index, { type: event.target.value })
                      }
                    >
                      {BANK_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={item.isActive}
                      onChange={(event) =>
                        updateBank(index, { isActive: event.target.checked })
                      }
                    />
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-light btn-sm text-danger"
                      onClick={() =>
                        setBankAccounts((items) =>
                          items.filter((_, current) => current !== index)
                        )
                      }
                    >
                      {t("remove")}
                    </button>
                  </td>
                </tr>
              ))}
              {bankAccounts.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("currencies")}</h2>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => setCurrencies((items) => [...items, newCurrency()])}
          >
            {t("addCurrency")}
          </button>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("code")}</th>
                <th>{t("name")}</th>
                <th>{t("symbol")}</th>
                <th>{t("decimals")}</th>
                <th>{t("rounding")}</th>
                <th>{t("fxRate")}</th>
                <th>{t("fxSource")}</th>
                <th>{t("fxEffectiveDate")}</th>
                <th>{t("active")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {currencies.map((item, index) => (
                <tr key={`${item.code}-${index}`}>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      value={item.code}
                      onChange={(event) =>
                        updateCurrency(index, {
                          code: event.target.value.toUpperCase()
                        })
                      }
                      maxLength={3}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={item.name}
                      onChange={(event) =>
                        updateCurrency(index, { name: event.target.value })
                      }
                      maxLength={120}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={item.symbol}
                      onChange={(event) =>
                        updateCurrency(index, { symbol: event.target.value })
                      }
                      maxLength={20}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      min={0}
                      max={6}
                      value={item.decimals}
                      onChange={(event) =>
                        updateCurrency(index, {
                          decimals: Number(event.target.value)
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={item.rounding}
                      onChange={(event) =>
                        updateCurrency(index, { rounding: event.target.value })
                      }
                    >
                      {ROUNDING.map((rounding) => (
                        <option key={rounding} value={rounding}>
                          {rounding}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      dir="ltr"
                      min={0}
                      step="0.00000001"
                      value={item.fxRate ?? ""}
                      onChange={(event) =>
                        updateCurrency(index, {
                          fxRate: event.target.value
                            ? Number(event.target.value)
                            : null
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      value={item.fxSource ?? ""}
                      onChange={(event) =>
                        updateCurrency(index, {
                          fxSource: event.target.value || null
                        })
                      }
                      maxLength={120}
                    />
                  </td>
                  <td className="text-nowrap">
                    <HaniDatePicker
                      className="form-control form-control-sm datetimepicker"
                      value={iso(item.fxEffectiveDate)}
                      onChange={(value) =>
                        updateCurrency(index, { fxEffectiveDate: value })
                      }
                      ariaLabel={t("fxEffectiveDate")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={item.isActive}
                      onChange={(event) =>
                        updateCurrency(index, { isActive: event.target.checked })
                      }
                    />
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-light btn-sm text-danger"
                      onClick={() =>
                        setCurrencies((items) =>
                          items.filter((_, current) => current !== index)
                        )
                      }
                    >
                      {t("remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("taxRules")}</h2>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => setTaxRules((items) => [...items, newTaxRule()])}
          >
            {t("addTaxRule")}
          </button>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("code")}</th>
                <th>{t("name")}</th>
                <th>{t("kind")}</th>
                <th>{t("ratePercent")}</th>
                <th>{t("inclusion")}</th>
                <th>{t("effectiveFrom")}</th>
                <th>{t("effectiveTo")}</th>
                <th>{t("active")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {taxRules.map((item, index) => (
                <tr key={`${item.code}-${index}`}>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      value={item.code}
                      onChange={(event) =>
                        updateTax(index, {
                          code: event.target.value.toUpperCase()
                        })
                      }
                      maxLength={40}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={item.name}
                      onChange={(event) =>
                        updateTax(index, { name: event.target.value })
                      }
                      maxLength={160}
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      value={item.kind}
                      onChange={(event) =>
                        updateTax(index, { kind: event.target.value })
                      }
                      maxLength={20}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      min={0}
                      max={100}
                      step="0.01"
                      value={item.ratePercent}
                      onChange={(event) =>
                        updateTax(index, {
                          ratePercent: Number(event.target.value)
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={item.inclusion}
                      onChange={(event) =>
                        updateTax(index, { inclusion: event.target.value })
                      }
                    >
                      {INCLUSION.map((inclusion) => (
                        <option key={inclusion} value={inclusion}>
                          {inclusion}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-nowrap">
                    <HaniDatePicker
                      className="form-control form-control-sm datetimepicker"
                      value={iso(item.effectiveFrom)}
                      onChange={(value) =>
                        updateTax(index, { effectiveFrom: value ?? "" })
                      }
                      ariaLabel={t("effectiveFrom")}
                    />
                  </td>
                  <td className="text-nowrap">
                    <HaniDatePicker
                      className="form-control form-control-sm datetimepicker"
                      value={iso(item.effectiveTo)}
                      onChange={(value) =>
                        updateTax(index, { effectiveTo: value })
                      }
                      ariaLabel={t("effectiveTo")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={item.isActive}
                      onChange={(event) =>
                        updateTax(index, { isActive: event.target.checked })
                      }
                    />
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-light btn-sm text-danger"
                      onClick={() =>
                        setTaxRules((items) =>
                          items.filter((_, current) => current !== index)
                        )
                      }
                    >
                      {t("remove")}
                    </button>
                  </td>
                </tr>
              ))}
              {taxRules.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("settlementPolicy")}</h2>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label" htmlFor="settlement-period">
                {t("settlementPeriodDays")}
              </label>
              <input
                id="settlement-period"
                type="number"
                className="form-control"
                min={1}
                value={settlement.periodDays}
                onChange={(event) =>
                  setSettlement((current) => ({
                    ...current,
                    periodDays: Number(event.target.value)
                  }))
                }
              />
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="settlement-minimum">
                {t("minimumAmount")}
              </label>
              <input
                id="settlement-minimum"
                type="number"
                className="form-control"
                min={0}
                step="0.01"
                value={settlement.minimumAmount}
                onChange={(event) =>
                  setSettlement((current) => ({
                    ...current,
                    minimumAmount: Number(event.target.value)
                  }))
                }
              />
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="settlement-currency">
                {t("currency")}
              </label>
              <input
                id="settlement-currency"
                className="form-control"
                dir="ltr"
                maxLength={3}
                value={settlement.currency}
                onChange={(event) =>
                  setSettlement((current) => ({
                    ...current,
                    currency: event.target.value.toUpperCase()
                  }))
                }
              />
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="settlement-due">
                {t("settlementDueDays")}
              </label>
              <input
                id="settlement-due"
                type="number"
                className="form-control"
                min={0}
                value={settlement.dueDays}
                onChange={(event) =>
                  setSettlement((current) => ({
                    ...current,
                    dueDays: Number(event.target.value)
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-footer bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span className="fs-12 text-gray-6">
            {initial.updatedAt ? `${t("updatedAt")}: ${initial.updatedAt}` : ""}
          </span>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? t("saving") : t("save")}
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { formatIsoDate } from "@/lib/hani/calendar";
import type { AdminChannelAgency } from "../domain/admin-channel";
import {
  updateChannelSettings,
  updateChannelWebhook
} from "../application/admin-channel-actions";

/** Plan, white-label, and webhook settings for agency channel tenants. */
export function ChannelSettingsManager({
  agencies,
  locale
}: {
  agencies: AdminChannelAgency[];
  locale: string;
}) {
  const t = useTranslations("adminChannel");
  const messages = useMessageBox();
  const router = useRouter();
  const [selected, setSelected] = useState<AdminChannelAgency | null>(null);
  const [pending, setPending] = useState(false);
  const [plan, setPlan] = useState("Standard");
  const [whiteLabel, setWhiteLabel] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [attribution, setAttribution] = useState(true);
  const [canonicalMode, setCanonicalMode] = useState("marketplace");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");

  useEffect(() => {
    if (!selected) return;
    setPlan(selected.plan);
    setWhiteLabel(selected.whiteLabelEnabled);
    setCustomDomain(selected.customDomain ?? "");
    setAttribution(selected.attributionRequired);
    setCanonicalMode(selected.canonicalMode);
    setWebhookUrl("");
    setWebhookSecret("");
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;

    setPending(true);
    const settings = await updateChannelSettings(selected.agencyId, {
      plan,
      whiteLabelEnabled: whiteLabel,
      customDomain: customDomain.trim() || null,
      attributionRequired: attribution,
      canonicalMode: canonicalMode.trim() || "marketplace"
    });
    let webhookOk = true;
    if (webhookUrl.trim()) {
      const webhook = await updateChannelWebhook(
        selected.agencyId,
        webhookUrl.trim(),
        webhookSecret.trim() || null
      );
      webhookOk = webhook.ok;
    }
    setPending(false);

    if (!settings.ok || !webhookOk) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setSelected(null);
    messages.toast({ kind: "success", message: t("updated") });
    router.refresh();
  };

  return (
    <>
      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("agencies")}</h2>
          <span className="fs-13 text-gray-6">{agencies.length}</span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("agency")}</th>
                <th>{t("plan")}</th>
                <th>{t("whiteLabel")}</th>
                <th className="d-none d-lg-table-cell">{t("customDomain")}</th>
                <th className="d-none d-md-table-cell">{t("attribution")}</th>
                <th className="d-none d-md-table-cell">{t("subscription")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency) => (
                <tr key={agency.agencyId}>
                  <td className="text-break">{agency.name}</td>
                  <td>{agency.plan}</td>
                  <td>{agency.whiteLabelEnabled ? t("yes") : t("no")}</td>
                  <td className="d-none d-lg-table-cell" dir="ltr">
                    {agency.customDomain ?? "—"}
                  </td>
                  <td className="d-none d-md-table-cell">
                    {agency.attributionRequired ? t("yes") : t("no")}
                  </td>
                  <td className="d-none d-md-table-cell">
                    {agency.subscriptionValidUntil
                      ? formatIsoDate(
                          agency.subscriptionValidUntil,
                          locale,
                          "medium"
                        )
                      : "—"}
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={() => setSelected(agency)}
                    >
                      {t("edit")}
                    </button>
                  </td>
                </tr>
              ))}
              {agencies.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-6 py-4">
                    {t("emptyAgencies")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="channel-settings-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <form onSubmit={save}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="channel-settings-title">
                      {t("editTitle")} — {selected.name}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label={t("close")}
                      onClick={() => setSelected(null)}
                    />
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="channel-plan">
                          {t("plan")}
                        </label>
                        <select
                          id="channel-plan"
                          className="form-select"
                          value={plan}
                          onChange={(event) => setPlan(event.target.value)}
                        >
                          <option value="Standard">Standard</option>
                          <option value="Pro">Pro</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="channel-canonical">
                          {t("canonicalMode")}
                        </label>
                        <input
                          id="channel-canonical"
                          className="form-control"
                          dir="ltr"
                          value={canonicalMode}
                          onChange={(event) => setCanonicalMode(event.target.value)}
                          maxLength={80}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="channel-domain">
                          {t("customDomain")}
                        </label>
                        <input
                          id="channel-domain"
                          className="form-control"
                          dir="ltr"
                          value={customDomain}
                          onChange={(event) => setCustomDomain(event.target.value)}
                          maxLength={200}
                          placeholder="partner.example.com"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            id="channel-white-label"
                            className="form-check-input"
                            type="checkbox"
                            checked={whiteLabel}
                            onChange={(event) => setWhiteLabel(event.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="channel-white-label">
                            {t("whiteLabel")}
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            id="channel-attribution"
                            className="form-check-input"
                            type="checkbox"
                            checked={attribution}
                            onChange={(event) => setAttribution(event.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="channel-attribution">
                            {t("attribution")}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="channel-webhook">
                          {t("webhookUrl")}
                        </label>
                        <input
                          id="channel-webhook"
                          className="form-control"
                          dir="ltr"
                          value={webhookUrl}
                          onChange={(event) => setWebhookUrl(event.target.value)}
                          maxLength={1000}
                          placeholder="https://partner.example.com/webhook"
                        />
                        <label className="form-label mt-2" htmlFor="channel-webhook-secret">
                          {t("webhookSecret")}
                        </label>
                        <input
                          id="channel-webhook-secret"
                          className="form-control"
                          dir="ltr"
                          value={webhookSecret}
                          onChange={(event) => setWebhookSecret(event.target.value)}
                          maxLength={200}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setSelected(null)}
                      disabled={pending}
                    >
                      {t("cancel")}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={pending}>
                      {pending ? t("saving") : t("save")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
      {selected &&
        typeof document !== "undefined" &&
        createPortal(<div className="modal-backdrop fade show" />, document.body)}
    </>
  );
}

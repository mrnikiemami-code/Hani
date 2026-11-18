"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminApiClient, AdminChannelAgency } from "../domain/admin-channel";
import {
  createChannelClient,
  revokeChannelClient
} from "../application/admin-channel-actions";

const SCOPES = [
  "channel.catalog.read",
  "channel.booking.read",
  "channel.booking.write",
  "channel.finance.read"
] as const;

/** Admin API client management with one-time secret display. */
export function ChannelClientManager({
  clients,
  agencies,
  locale
}: {
  clients: AdminApiClient[];
  agencies: AdminChannelAgency[];
  locale: string;
}) {
  const t = useTranslations("adminChannel");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [agencyId, setAgencyId] = useState(agencies[0]?.agencyId ?? "");
  const [name, setName] = useState("");
  const [scopes, setScopes] = useState<string[]>([
    "channel.catalog.read",
    "channel.booking.read"
  ]);

  const toggleScope = (scope: string) => {
    setScopes((current) =>
      current.includes(scope)
        ? current.filter((item) => item !== scope)
        : [...current, scope]
    );
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agencyId || !name.trim() || scopes.length === 0) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    setPending(true);
    const result = await createChannelClient({
      agencyId,
      name: name.trim(),
      scopes
    });
    setPending(false);
    if (!result.ok || !result.data) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    setName("");
    await messages.alert({
      kind: "success",
      title: t("secretTitle"),
      message: `${t("clientId")}: ${result.data.clientId}\n${t("clientSecret")}: ${result.data.clientSecret}`,
      confirmLabel: t("close")
    });
    router.refresh();
  };

  const revoke = async (client: AdminApiClient) => {
    const confirmed = await messages.confirm({
      kind: "warning",
      title: t("revokeConfirm"),
      message: client.name,
      confirmLabel: t("revoke")
    });
    if (!confirmed) return;

    const result = await revokeChannelClient(client.id);
    if (result.ok) {
      messages.toast({ kind: "success", message: t("revoked") });
      router.refresh();
    } else {
      messages.toast({ kind: "error", message: t("error") });
    }
  };

  return (
    <>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("createClientTitle")}</h2>
        </div>
        <div className="card-body">
          <form className="row g-2 align-items-end" onSubmit={submit}>
            <div className="col-md-3">
              <label className="form-label" htmlFor="channel-agency">
                {t("agency")}
              </label>
              <select
                id="channel-agency"
                className="form-select"
                value={agencyId}
                onChange={(event) => setAgencyId(event.target.value)}
              >
                {agencies.map((agency) => (
                  <option value={agency.agencyId} key={agency.agencyId}>
                    {agency.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="channel-client-name">
                {t("clientName")}
              </label>
              <input
                id="channel-client-name"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={200}
                required
              />
            </div>
            <div className="col-md-3">
              <span className="form-label d-block">{t("scopes")}</span>
              {SCOPES.map((scope) => (
                <div className="form-check" key={scope}>
                  <input
                    id={`scope-${scope}`}
                    className="form-check-input"
                    type="checkbox"
                    checked={scopes.includes(scope)}
                    onChange={() => toggleScope(scope)}
                  />
                  <label className="form-check-label fs-12" htmlFor={`scope-${scope}`} dir="ltr">
                    {scope}
                  </label>
                </div>
              ))}
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100" disabled={pending}>
                {pending ? t("saving") : t("createClient")}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("clients")}</h2>
          <span className="fs-13 text-gray-6">{clients.length}</span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("agency")}</th>
                <th>{t("clientName")}</th>
                <th className="d-none d-lg-table-cell">{t("clientId")}</th>
                <th className="d-none d-lg-table-cell">{t("scopes")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-md-table-cell">{t("lastUsed")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="text-break">{client.agencyName}</td>
                  <td className="text-break">{client.name}</td>
                  <td className="d-none d-lg-table-cell" dir="ltr">
                    {client.clientId}
                  </td>
                  <td className="d-none d-lg-table-cell" dir="ltr">
                    {client.scopes}
                  </td>
                  <td>{client.status}</td>
                  <td className="d-none d-md-table-cell">
                    {client.lastUsedAt
                      ? new Date(client.lastUsedAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="text-end">
                    {client.status === "Active" ? (
                      <button
                        type="button"
                        className="btn btn-light btn-sm text-danger"
                        onClick={() => revoke(client)}
                      >
                        {t("revoke")}
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-6 py-4">
                    {t("emptyClients")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

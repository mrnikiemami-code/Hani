"use client";

import { useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { useMessageBox } from "@/components/hani/message-provider";
import type { AdminAgency } from "../domain/admin-agency";
import { approveAgency } from "../application/agency-actions";

const PAGE_SIZE = 10;

const statusClass: Record<string, string> = {
  Active: "badge-success",
  Pending: "badge-warning",
  Suspended: "badge-secondary",
  Rejected: "badge-danger",
  Blocked: "badge-danger"
};

/**
 * Agency directory using the template table language. Approval is a phase-1
 * action; contracts and detail tabs are added in the next slice.
 */
export function AgencyManager({
  locale,
  initialAgencies
}: {
  locale: string;
  initialAgencies: AdminAgency[];
}) {
  const t = useTranslations("adminAgencies");
  const messages = useMessageBox();
  const [agencies, setAgencies] = useState(initialAgencies);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return agencies.filter((agency) => {
      const matchesStatus = !status || agency.status === status;
      const matchesQuery =
        !term ||
        agency.name.toLowerCase().includes(term) ||
        agency.licenseNo.toLowerCase().includes(term) ||
        agency.city.toLowerCase().includes(term) ||
        agency.slug.toLowerCase().includes(term);
      return matchesStatus && matchesQuery;
    });
  }, [agencies, q, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const approve = async (agency: AdminAgency) => {
    const confirmed = await messages.confirm({
      kind: "question",
      title: t("approveConfirm"),
      message: agency.name,
      confirmLabel: t("approve")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await approveAgency(agency.id);
      if (result.ok) {
        setAgencies((current) =>
          current.map((item) =>
            item.id === agency.id ? { ...item, status: "Active" } : item
          )
        );
        messages.toast({ kind: "success", message: t("approved") });
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header">
        <h2 className="h5 mb-1">{t("title")}</h2>
        <p className="fs-13 text-gray-6 mb-0">{t("subtitle")}</p>
      </div>
      <div className="card-body">
        <div className="row g-2 align-items-end mb-3">
          <div className="col-lg-6">
            <label className="form-label" htmlFor="agency-search">
              {t("searchLabel")}
            </label>
            <input
              id="agency-search"
              className="form-control"
              value={q}
              placeholder={t("searchPlaceholder")}
              onChange={(event) => {
                setQ(event.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label" htmlFor="agency-status">
              {t("status")}
            </label>
            <select
              id="agency-status"
              className="form-select"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="">{t("allStatuses")}</option>
              {["Pending", "Active", "Suspended", "Rejected"].map((item) => (
                <option key={item} value={item}>
                  {t(`status${item}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-2 text-lg-end">
            <span className="text-gray-6 fs-13">
              {t("count", { count: filtered.length })}
            </span>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="table datatable admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("agency")}</th>
                <th className="d-none d-md-table-cell">{t("license")}</th>
                <th className="d-none d-md-table-cell">{t("city")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-lg-table-cell">{t("createdAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((agency) => (
                <tr key={agency.id}>
                  <td>
                    <strong className="d-block text-truncate">{agency.name}</strong>
                    <span className="fs-12 text-gray-6" dir="ltr">
                      /{agency.slug}
                    </span>
                  </td>
                  <td className="d-none d-md-table-cell">{agency.licenseNo}</td>
                  <td className="d-none d-md-table-cell">{agency.city}</td>
                  <td>
                    <span className={`badge rounded-pill ${statusClass[agency.status] ?? "badge-secondary"}`}>
                      {t(`status${agency.status}`)}
                    </span>
                  </td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(agency.createdAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td className="text-end">
                    {agency.status === "Pending" ? (
                      <button
                        type="button"
                        className="btn btn-light btn-sm"
                        onClick={() => approve(agency)}
                        disabled={pending}
                      >
                        {t("approve")}
                      </button>
                    ) : (
                      <span className="text-gray-5">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-gray-6 fs-13">
              {t("pageInfo", { page: currentPage, total: totalPages })}
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage <= 1}
              >
                {t("previous")}
              </button>
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={currentPage >= totalPages}
              >
                {t("next")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

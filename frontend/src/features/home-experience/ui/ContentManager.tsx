"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "next/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { useMessageBox } from "@/components/hani/message-provider";
import type {
  ContentEntry,
  ContentEntryStatus,
  ContentEntryType
} from "../domain/content-entry";
import { changeContentStatus } from "../application/content-actions";
import {
  CONTENT_STATUS_LABEL_KEYS,
  CONTENT_TYPE_LABEL_KEYS
} from "./content-labels";

const statusClass: Record<ContentEntryStatus, string> = {
  Published: "badge-success",
  Draft: "badge-warning",
  Scheduled: "badge-info",
  Archived: "badge-secondary"
};

const pageItems = (page: number, totalPages: number): Array<number | "ellipsis"> => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  if (page >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

/**
 * Filterable, paginated content index. The editor is intentionally kept on
 * separate create/edit routes.
 */
export function ContentManager({
  locale,
  initialEntries,
  initialTotal,
  page,
  pageSize,
  filters
}: {
  locale: string;
  initialEntries: ContentEntry[];
  initialTotal: number;
  page: number;
  pageSize: number;
  filters: { q: string; type: string; status: string };
}) {
  const t = useTranslations("adminContent");
  const messages = useMessageBox();
  const router = useRouter();
  const pathname = usePathname();
  const [entries, setEntries] = useState(initialEntries);
  const [total, setTotal] = useState(initialTotal);
  const [q, setQ] = useState(filters.q);
  const [type, setType] = useState(filters.type);
  const [status, setStatus] = useState(filters.status);
  const [pending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const listHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    if (nextPage > 1) params.set("page", String(nextPage));
    const search = params.toString();
    return `/admin/content${search ? `?${search}` : ""}`;
  };

  const applyFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(listHref(1));
  };

  const resetFilters = () => {
    setQ("");
    setType("");
    setStatus("");
    router.push(pathname);
  };

  const remove = async (entry: ContentEntry) => {
    const confirmed = await messages.confirm({
      kind: "question",
      title: t("deleteConfirm"),
      message: entry.title,
      confirmLabel: t("delete")
    });
    if (!confirmed) return;
    startTransition(async () => {
      const result = await changeContentStatus(entry.id, "delete");
      if (result.ok) {
        setEntries((current) => current.filter((item) => item.id !== entry.id));
        setTotal((current) => Math.max(0, current - 1));
        messages.toast({ kind: "success", message: t("deleted") });
        router.refresh();
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  const typeOptions: ContentEntryType[] = ["Page", "Banner", "Article", "Section"];
  const statusOptions: ContentEntryStatus[] = [
    "Draft",
    "Published",
    "Scheduled",
    "Archived"
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h2 className="h5 mb-0">{t("entries")}</h2>
        <Link href="/admin/content/new" className="btn btn-primary btn-sm">
          <i className="isax isax-add me-1" />
          {t("new")}
        </Link>
      </div>
      <div className="card-body">
        <form className="row g-2 align-items-end mb-3 media-filter-form" onSubmit={applyFilters}>
          <div className="col-lg-4">
            <label className="form-label" htmlFor="content-search">
              {t("searchLabel")}
            </label>
            <input
              id="content-search"
              className="form-control"
              value={q}
              placeholder={t("searchPlaceholder")}
              onChange={(event) => setQ(event.target.value)}
            />
          </div>
          <div className="col-lg-3">
            <label className="form-label" htmlFor="content-filter-type">
              {t("type")}
            </label>
            <select
              id="content-filter-type"
              className="form-select"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="">{t("allTypes")}</option>
              {typeOptions.map((item) => (
                <option key={item} value={item}>
                  {t(CONTENT_TYPE_LABEL_KEYS[item])}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3">
            <label className="form-label" htmlFor="content-filter-status">
              {t("status")}
            </label>
            <select
              id="content-filter-status"
              className="form-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">{t("allStatuses")}</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {t(CONTENT_STATUS_LABEL_KEYS[item])}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-2 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1" disabled={pending}>
              {t("search")}
            </button>
            <button
              type="button"
              className="btn btn-light text-nowrap"
              onClick={resetFilters}
              disabled={pending || (!q && !type && !status)}
            >
              {t("reset")}
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <span className="text-gray-6 fs-14">{t("count", { count: total })}</span>
        </div>

        <div className="admin-table-wrap">
          <table className="table datatable admin-data-table content-data-table align-middle mb-0">
            <caption className="visually-hidden">{t("entries")}</caption>
            <thead className="thead-light">
              <tr>
                <th>{t("titleField")}</th>
                <th className="d-none d-md-table-cell">{t("type")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-lg-table-cell">{t("updatedAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <Link
                      href={`/admin/content/${entry.id}`}
                      className="link-primary fw-medium d-block text-truncate"
                      title={entry.title}
                    >
                      {entry.title}
                    </Link>
                    <span className="fs-12 text-gray-6 d-block text-truncate" dir="ltr">
                      /{entry.locale}/{entry.slug}
                    </span>
                  </td>
                  <td className="d-none d-md-table-cell">
                    {t(CONTENT_TYPE_LABEL_KEYS[entry.type])}
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${statusClass[entry.status]}`}>
                      {t(CONTENT_STATUS_LABEL_KEYS[entry.status])}
                    </span>
                  </td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(entry.updatedAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td>
                    <div className="d-flex justify-content-end gap-1 media-table-actions">
                      <Link
                        href={`/admin/content/${entry.id}`}
                        className="btn btn-light btn-sm"
                        aria-label={`${t("edit")}: ${entry.title}`}
                      >
                        <i className="isax isax-edit-2" />
                        <span className="media-action-label ms-1">{t("edit")}</span>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-light btn-sm text-danger"
                        onClick={() => remove(entry)}
                        disabled={pending}
                        aria-label={`${t("delete")}: ${entry.title}`}
                      >
                        <i className="isax isax-trash" />
                        <span className="media-action-label ms-1">{t("delete")}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-4">
            <span className="text-gray-6 fs-13">
              {t("pageInfo", { page, total: totalPages })}
            </span>
            <nav aria-label={t("paginationLabel")}>
              <ul className="paginations d-flex justify-content-center align-items-center mb-0">
                <li className={`page-item me-2 ${page <= 1 ? "disabled" : ""}`}>
                  <Link
                    className="page-link-1 d-flex justify-content-center align-items-center"
                    href={listHref(Math.max(1, page - 1))}
                    aria-disabled={page <= 1}
                  >
                    <i className="isax isax-arrow-left-2" />
                  </Link>
                </li>
                {pageItems(page, totalPages).map((item, index) =>
                  item === "ellipsis" ? (
                    <li key={`ellipsis-${index}`} className="page-item me-2">
                      <span className="page-link-1 d-flex justify-content-center align-items-center">
                        …
                      </span>
                    </li>
                  ) : (
                    <li key={item} className="page-item me-2">
                      <Link
                        className={`page-link-1 d-flex justify-content-center align-items-center ${
                          item === page ? "active" : ""
                        }`}
                        href={listHref(item)}
                        aria-current={item === page ? "page" : undefined}
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
                <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                  <Link
                    className="page-link-1 d-flex justify-content-center align-items-center"
                    href={listHref(Math.min(totalPages, page + 1))}
                    aria-disabled={page >= totalPages}
                  >
                    <i className="isax isax-arrow-right-2" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

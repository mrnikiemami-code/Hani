"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { ContentEntry, ContentEntryStatus } from "../domain/content-entry";
import { changeContentStatus } from "../application/content-actions";

const statusClass: Record<ContentEntryStatus, string> = {
  Published: "badge-success",
  Draft: "badge-warning",
  Scheduled: "badge-info",
  Archived: "badge-secondary"
};

/**
 * Content index page. Entries are displayed in a template table and the editor
 * lives on separate create/edit routes behind explicit row actions.
 */
export function ContentManager({
  locale,
  initialEntries
}: {
  locale: string;
  initialEntries: ContentEntry[];
}) {
  const t = useTranslations("adminContent");
  const [entries, setEntries] = useState(initialEntries);
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();

  const remove = (entry: ContentEntry) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    startTransition(async () => {
      const result = await changeContentStatus(entry.id, "delete");
      if (result.ok) {
        setEntries((current) => current.filter((item) => item.id !== entry.id));
        setError(false);
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h2 className="h5 mb-0">{t("entries")}</h2>
        <Link href="/admin/content/new" className="btn btn-primary btn-sm">
          <i className="isax isax-add me-1" />
          {t("new")}
        </Link>
      </div>
      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3" role="alert">
            {t("error")}
          </div>
        )}
        <div className="custom-datatable-filter table-responsive">
          <table className="table datatable align-middle mb-0">
            <caption className="visually-hidden">{t("entries")}</caption>
            <thead className="thead-light">
              <tr>
                <th>{t("titleField")}</th>
                <th>{t("type")}</th>
                <th>{t("slug")}</th>
                <th>{t("locale")}</th>
                <th>{t("status")}</th>
                <th>{t("updatedAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <Link
                      href={`/admin/content/${entry.id}`}
                      className="link-primary fw-medium"
                    >
                      {entry.title}
                    </Link>
                  </td>
                  <td>{entry.type}</td>
                  <td dir="ltr" className="text-start">
                    /{entry.slug}
                  </td>
                  <td>{entry.locale}</td>
                  <td>
                    <span
                      className={`badge rounded-pill ${statusClass[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td>
                    {formatIsoInstant(entry.updatedAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <Link
                        href={`/admin/content/${entry.id}`}
                        className="btn btn-light btn-sm"
                        aria-label={`${t("edit")}: ${entry.title}`}
                      >
                        <i className="isax isax-edit-2 me-1" />
                        {t("edit")}
                      </Link>
                      <button
                        type="button"
                        className="btn btn-light btn-sm text-danger"
                        onClick={() => remove(entry)}
                        disabled={pending}
                        aria-label={`${t("delete")}: ${entry.title}`}
                      >
                        <i className="isax isax-trash me-1" />
                        {t("delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

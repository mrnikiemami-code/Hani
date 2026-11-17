"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "next/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { MediaAsset, MediaFolder } from "../domain/media";
import {
  bulkDeleteMedia,
  deleteMedia
} from "../application/media-actions";
import { HaniMediaImage } from "./HaniMediaImage";

function pageItems(page: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  if (page >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
}

/**
 * Filterable, paginated media table. Upload and metadata editing live on
 * separate admin routes.
 */
export function MediaManager({
  locale,
  initialItems,
  initialTotal,
  page,
  pageSize,
  folders,
  filters
}: {
  locale: string;
  initialItems: MediaAsset[];
  initialTotal: number;
  page: number;
  pageSize: number;
  folders: MediaFolder[];
  filters: { q: string; folderId: string };
}) {
  const t = useTranslations("adminMedia");
  const router = useRouter();
  const pathname = usePathname();
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState(filters.q);
  const [folderId, setFolderId] = useState(filters.folderId);
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const listHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (folderId) params.set("folderId", folderId);
    if (nextPage > 1) params.set("page", String(nextPage));
    const search = params.toString();
    return `/admin/media${search ? `?${search}` : ""}`;
  };

  const applyFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(listHref(1));
  };

  const resetFilters = () => {
    setQuery("");
    setFolderId("");
    router.push(pathname);
  };

  const remove = (item: MediaAsset) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    startTransition(async () => {
      const result = await deleteMedia(item.id);
      if (result.ok) {
        setItems((current) => current.filter((entry) => entry.id !== item.id));
        setTotal((current) => Math.max(0, current - 1));
        setSelectedIds((current) => current.filter((id) => id !== item.id));
        setError(false);
        router.refresh();
      } else {
        setError(true);
      }
    });
  };

  const removeSelected = () => {
    if (selectedIds.length === 0 || !window.confirm(t("bulkDeleteConfirm"))) {
      return;
    }
    startTransition(async () => {
      const result = await bulkDeleteMedia(selectedIds);
      if (result.ok) {
        setItems((current) =>
          current.filter((item) => !selectedIds.includes(item.id))
        );
        setTotal((current) => Math.max(0, current - selectedIds.length));
        setSelectedIds([]);
        setError(false);
        router.refresh();
      } else {
        setError(true);
      }
    });
  };

  const allSelected =
    items.length > 0 && items.every((item) => selectedIds.includes(item.id));

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h2 className="h5 mb-0">{t("libraryTitle")}</h2>
        <Link href="/admin/media/new" className="btn btn-primary btn-sm">
          <i className="isax isax-add me-1" />
          {t("upload")}
        </Link>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {t("error")}
          </div>
        )}

        <form className="row g-2 align-items-end mb-3 media-filter-form" onSubmit={applyFilters}>
          <div className="col-lg-5">
            <label className="form-label" htmlFor="media-search">
              {t("searchLabel")}
            </label>
            <input
              id="media-search"
              className="form-control"
              value={query}
              placeholder={t("searchPlaceholder")}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label" htmlFor="media-filter-folder">
              {t("folder")}
            </label>
            <select
              id="media-filter-folder"
              className="form-select"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
            >
              <option value="">{t("allFolders")}</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1" disabled={pending}>
              {t("search")}
            </button>
            <button
              type="button"
              className="btn btn-light text-nowrap"
              onClick={resetFilters}
              disabled={pending || (!query && !folderId)}
            >
              {t("reset")}
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <span className="text-gray-6 fs-14">
            {t("count", { count: total })}
            {selectedIds.length > 0 ? ` · ${t("selected", { count: selectedIds.length })}` : ""}
          </span>
          <button
            type="button"
            className="btn btn-light btn-sm"
            disabled={selectedIds.length === 0 || pending}
            onClick={removeSelected}
          >
            {t("bulkDelete")}
          </button>
        </div>

        <div className="custom-datatable-filter table-responsive">
          <table className="table datatable align-middle mb-0">
            <caption className="visually-hidden">{t("libraryTitle")}</caption>
            <thead className="thead-light">
              <tr>
                <th className="w-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    aria-label={t("selectAll")}
                    checked={allSelected}
                    onChange={(event) => {
                      setSelectedIds(
                        event.target.checked ? items.map((item) => item.id) : []
                      );
                    }}
                  />
                </th>
                <th>{t("preview")}</th>
                <th>{t("file")}</th>
                <th>{t("altText")}</th>
                <th>{t("folder")}</th>
                <th>{t("tags")}</th>
                <th>{t("dimensions")}</th>
                <th>{t("createdAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const folder = folders.find((entry) => entry.id === item.folderId);
                return (
                  <tr key={item.id}>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        aria-label={t("select")}
                        checked={selectedIds.includes(item.id)}
                        onChange={(event) => {
                          setSelectedIds((current) =>
                            event.target.checked
                              ? [...current, item.id]
                              : current.filter((id) => id !== item.id)
                          );
                        }}
                      />
                    </td>
                    <td>
                      <HaniMediaImage
                        media={item}
                        sizes="72px"
                        width={72}
                        height={54}
                        className="rounded media-table-thumb"
                        style={{ width: 72, height: 54, objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <Link
                        href={`/admin/media/${item.id}`}
                        className="link-primary fw-medium d-block text-truncate"
                        style={{ maxWidth: 180 }}
                        title={item.originalFileName}
                      >
                        {item.originalFileName}
                      </Link>
                      <span className="fs-12 text-gray-6">
                        {(item.sizeBytes / 1024).toFixed(0)} KB
                      </span>
                    </td>
                    <td>
                      <span className="d-block text-truncate" style={{ maxWidth: 220 }}>
                        {item.altText}
                      </span>
                    </td>
                    <td>{folder?.name ?? "—"}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="badge bg-light text-dark border">
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="badge bg-light text-dark border">
                            +{item.tags.length - 2}
                          </span>
                        )}
                        {item.tags.length === 0 && <span className="text-gray-5">—</span>}
                      </div>
                    </td>
                    <td dir="ltr" className="text-start text-nowrap">
                      {item.width}×{item.height}
                    </td>
                    <td className="text-nowrap">
                      {formatIsoInstant(item.createdAt, locale, {
                        dateStyle: "medium"
                      })}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <Link
                          href={`/admin/media/${item.id}`}
                          className="btn btn-light btn-sm"
                          aria-label={`${t("edit")}: ${item.originalFileName}`}
                        >
                          <i className="isax isax-edit-2 me-1" />
                          {t("edit")}
                        </Link>
                        <button
                          type="button"
                          className="btn btn-light btn-sm text-danger"
                          onClick={() => remove(item)}
                          disabled={pending}
                          aria-label={`${t("delete")}: ${item.originalFileName}`}
                        >
                          <i className="isax isax-trash me-1" />
                          {t("delete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <nav aria-label={t("paginationLabel")} className="mt-4">
            <ul className="paginations d-flex justify-content-center align-items-center">
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
        )}
      </div>
    </div>
  );
}

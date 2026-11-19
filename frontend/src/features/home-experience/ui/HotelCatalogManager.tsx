"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "next/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminHotelListResponse } from "../domain/admin-hotel";

const pageItems = (page: number, totalPages: number): Array<number | "ellipsis"> => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  if (page >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

/** Read-only hotel catalogue table for the opening phase-2 slice. */
export function HotelCatalogManager({
  locale,
  initial,
  q
}: {
  locale: string;
  initial: AdminHotelListResponse;
  q: string;
}) {
  const t = useTranslations("adminProducts");
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(q);
  const totalPages = Math.max(1, Math.ceil(initial.total / initial.pageSize));

  const href = (nextPage: number) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (nextPage > 1) params.set("page", String(nextPage));
    const search = params.toString();
    return `/admin/products/hotels${search ? `?${search}` : ""}`;
  };

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(href(1));
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h2 className="h5 mb-1">{t("hotelsTitle")}</h2>
          <p className="fs-13 text-gray-6 mb-0">{t("hotelsSubtitle")}</p>
        </div>
        <Link href="/admin/products/hotels/new" className="btn btn-primary btn-sm">
          {t("createHotel")}
        </Link>
      </div>
      <div className="card-body">
        <form className="row g-2 align-items-end mb-3" onSubmit={apply}>
          <div className="col-lg-6">
            <label className="form-label" htmlFor="hotel-search">
              {t("search")}
            </label>
            <input
              id="hotel-search"
              className="form-control"
              value={query}
              placeholder={t("searchPlaceholder")}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-lg-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">
              {t("search")}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setQuery("");
                router.push(pathname);
              }}
              disabled={!query}
            >
              {t("reset")}
            </button>
          </div>
          <div className="col-lg-3 text-lg-end">
            <span className="text-gray-6 fs-13">
              {t("count", { count: initial.total })}
            </span>
          </div>
        </form>

        <div className="admin-table-wrap">
          <table className="table datatable admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("hotel")}</th>
                <th>{t("stars")}</th>
                <th className="d-none d-md-table-cell">{t("address")}</th>
                <th className="d-none d-lg-table-cell">{t("rooms")}</th>
                <th className="d-none d-lg-table-cell">{t("images")}</th>
                <th className="d-none d-lg-table-cell">{t("createdAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {initial.items.map((hotel) => (
                <tr key={hotel.id}>
                  <td>
                    <strong className="d-block text-truncate">{hotel.name}</strong>
                    <span className="fs-12 text-gray-6" dir="ltr">
                      /{hotel.slug}
                    </span>
                  </td>
                  <td className="text-warning text-nowrap">
                    {"★".repeat(Math.max(0, hotel.stars))}
                  </td>
                  <td className="d-none d-md-table-cell">
                    <span className="d-block text-truncate" style={{ maxWidth: 220 }}>
                      {hotel.address ?? "—"}
                    </span>
                  </td>
                  <td className="d-none d-lg-table-cell">{hotel.roomCount}</td>
                  <td className="d-none d-lg-table-cell">{hotel.imageCount}</td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(hotel.createdAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td className="text-end">
                    <Link
                      href={`/admin/products/hotels/${hotel.id}`}
                      className="btn btn-light btn-sm"
                    >
                      {t("edit")}
                    </Link>
                  </td>
                </tr>
              ))}
              {initial.items.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {initial.total > 0 && (
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3">
            <span className="text-gray-6 fs-13">
              {t("pageInfo", { page: initial.page, total: totalPages })}
            </span>
            <nav aria-label={t("paginationLabel")}>
              <ul className="paginations d-flex justify-content-center align-items-center mb-0">
                <li className={`page-item me-2 ${initial.page <= 1 ? "disabled" : ""}`}>
                  <Link
                    className="page-link-1 d-flex justify-content-center align-items-center"
                    href={href(Math.max(1, initial.page - 1))}
                  >
                    <i className="isax isax-arrow-left-2" />
                  </Link>
                </li>
                {pageItems(initial.page, totalPages).map((item, index) =>
                  item === "ellipsis" ? (
                    <li key={`ellipsis-${index}`} className="page-item me-2">
                      <span className="page-link-1">…</span>
                    </li>
                  ) : (
                    <li key={item} className="page-item me-2">
                      <Link
                        className={`page-link-1 d-flex justify-content-center align-items-center ${
                          item === initial.page ? "active" : ""
                        }`}
                        href={href(item)}
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
                <li className={`page-item ${initial.page >= totalPages ? "disabled" : ""}`}>
                  <Link
                    className="page-link-1 d-flex justify-content-center align-items-center"
                    href={href(Math.min(totalPages, initial.page + 1))}
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

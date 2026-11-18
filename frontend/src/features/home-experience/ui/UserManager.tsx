"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "next/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminUser, AdminUserListResponse } from "../domain/admin-user";
import { UserRoleSelect } from "./UserRoleSelect";

const pageItems = (page: number, totalPages: number): Array<number | "ellipsis"> => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  if (page >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

/** Read-only phase-1 user directory. Role editing arrives in the next slice. */
export function UserManager({
  locale,
  initial,
  filters
}: {
  locale: string;
  initial: AdminUserListResponse;
  filters: { q: string; role: string; status: string };
}) {
  const t = useTranslations("adminUsers");
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(filters.q);
  const [role, setRole] = useState(filters.role);
  const [status, setStatus] = useState(filters.status);
  const totalPages = Math.max(1, Math.ceil(initial.total / initial.pageSize));

  const href = (nextPage: number) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (role) params.set("role", role);
    if (status) params.set("status", status);
    if (nextPage > 1) params.set("page", String(nextPage));
    const search = params.toString();
    return `/admin/users${search ? `?${search}` : ""}`;
  };

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(href(1));
  };

  const reset = () => {
    setQ("");
    setRole("");
    setStatus("");
    router.push(pathname);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="h5 mb-1">{t("title")}</h2>
          <p className="fs-13 text-gray-6 mb-0">{t("subtitle")}</p>
        </div>
      </div>
      <div className="card-body">
        <form className="row g-2 align-items-end mb-3" onSubmit={apply}>
          <div className="col-lg-4">
            <label className="form-label" htmlFor="user-search">
              {t("search")}
            </label>
            <input
              id="user-search"
              className="form-control"
              value={q}
              placeholder={t("searchPlaceholder")}
              onChange={(event) => setQ(event.target.value)}
            />
          </div>
          <div className="col-lg-3">
            <label className="form-label" htmlFor="user-role">
              {t("role")}
            </label>
            <select
              id="user-role"
              className="form-select"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="">{t("allRoles")}</option>
              {["Customer", "Author", "AgencyStaff", "Admin"].map((item) => (
                <option key={item} value={item}>
                  {t(`role${item}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3">
            <label className="form-label" htmlFor="user-status">
              {t("status")}
            </label>
            <select
              id="user-status"
              className="form-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">{t("allStatuses")}</option>
              {["Pending", "Active", "Blocked"].map((item) => (
                <option key={item} value={item}>
                  {t(`status${item}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-2 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">
              {t("search")}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={reset}
              disabled={!q && !role && !status}
            >
              {t("reset")}
            </button>
          </div>
        </form>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-gray-6 fs-13">
            {t("count", { count: initial.total })}
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="table datatable admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("user")}</th>
                <th className="d-none d-md-table-cell">{t("role")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-lg-table-cell">{t("createdAt")}</th>
                <th className="d-none d-lg-table-cell">{t("lastLogin")}</th>
              </tr>
            </thead>
            <tbody>
              {initial.items.map((user: AdminUser) => (
                <tr key={user.id}>
                  <td>
                    <strong className="d-block text-truncate">
                      {[user.firstName, user.lastName].filter(Boolean).join(" ") ||
                        user.username ||
                        user.mobile}
                    </strong>
                    <span className="fs-12 text-gray-6" dir="ltr">
                      {user.mobile}
                      {user.email ? ` · ${user.email}` : ""}
                    </span>
                  </td>
                  <td className="d-none d-md-table-cell">
                    <UserRoleSelect userId={user.id} role={user.role} />
                  </td>
                  <td>
                    <span className="badge rounded-pill badge-secondary">
                      {t(`status${user.status}`)}
                    </span>
                  </td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(user.createdAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {user.lastLoginAt
                      ? formatIsoInstant(user.lastLoginAt, locale, {
                          dateStyle: "medium"
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
              {initial.items.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-6 py-4">
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

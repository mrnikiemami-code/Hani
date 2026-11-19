"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import type { TourScopeValue, TourSearchFilters } from "../domain/tour-search";

/** Server-backed tour filters. Every value is sent to the search API. */
export function TourFilters({
  locale,
  filters,
  tourTypes
}: {
  locale: string;
  filters: TourSearchFilters;
  tourTypes: string[];
}) {
  const t = useTranslations("tourFilters");
  const scopePath =
    filters.scope === "Domestic"
      ? "?scope=domestic"
      : filters.scope === "Foreign"
        ? "?scope=foreign"
        : "";

  return (
    <div className="card filter-sidebar mb-4 mb-lg-0">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h3 className="h5">{t("title")}</h3>
        <Link href={`/${locale}/tours${scopePath}`} className="fs-14 link-primary">
          {t("reset")}
        </Link>
      </div>
      <div className="card-body p-0">
        <form method="get" action={`/${locale}/tours`}>
          {filters.scope ? (
            <input type="hidden" name="scope" value={filters.scope.toLowerCase()} />
          ) : null}
          {filters.originSlug ? (
            <input type="hidden" name="origin" value={filters.originSlug} />
          ) : null}
          <div className="p-3 border-bottom">
            <label className="form-label fs-16" htmlFor="tour-q">
              {t("search")}
            </label>
            <div className="input-icon">
              <span className="input-icon-addon">
                <i className="isax isax-search-normal" />
              </span>
              <input
                id="tour-q"
                name="q"
                type="search"
                className="form-control"
                placeholder={t("searchPlaceholder")}
                defaultValue={filters.q ?? ""}
              />
            </div>
          </div>

          <div className="p-3 border-bottom">
            <label className="form-label fs-16">{t("price")}</label>
            <div className="row g-2">
              <div className="col-6">
                <input
                  name="minPrice"
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder={t("min")}
                  defaultValue={filters.minPrice ?? ""}
                />
              </div>
              <div className="col-6">
                <input
                  name="maxPrice"
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder={t("max")}
                  defaultValue={filters.maxPrice ?? ""}
                />
              </div>
            </div>
          </div>

          <div className="p-3 border-bottom">
            <label className="form-label fs-16">{t("duration")}</label>
            <div className="row g-2">
              <div className="col-6">
                <input
                  name="minDuration"
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder={t("minDays")}
                  defaultValue={filters.minDuration ?? ""}
                />
              </div>
              <div className="col-6">
                <input
                  name="maxDuration"
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder={t("maxDays")}
                  defaultValue={filters.maxDuration ?? ""}
                />
              </div>
            </div>
          </div>

          <div className="p-3 border-bottom">
            <label className="form-label fs-16" htmlFor="tour-type">
              {t("tourType")}
            </label>
            <select
              id="tour-type"
              name="tourType"
              className="form-select"
              defaultValue={filters.tourType ?? ""}
            >
              <option value="">{t("allTypes")}</option>
              {tourTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 border-bottom">
            <label className="form-label fs-16" htmlFor="tour-sort">
              {t("sort")}
            </label>
            <select
              id="tour-sort"
              name="sort"
              className="form-select"
              defaultValue={filters.sort ?? "newest"}
            >
              <option value="newest">{t("sortNewest")}</option>
              <option value="price_asc">{t("priceAsc")}</option>
              <option value="price_desc">{t("priceDesc")}</option>
              <option value="duration_asc">{t("durationAsc")}</option>
              <option value="rating">{t("rating")}</option>
            </select>
          </div>

          <div className="p-3">
            <button type="submit" className="btn btn-primary w-100">
              {t("apply")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

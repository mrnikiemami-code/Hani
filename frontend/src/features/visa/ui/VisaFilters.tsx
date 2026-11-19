"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export type VisaFilterValues = {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  maxProcessingDays?: number;
};

/** Server-backed visa filters. */
export function VisaFilters({
  locale,
  filters
}: {
  locale: string;
  filters: VisaFilterValues;
}) {
  const t = useTranslations("visaFilters");

  return (
    <div className="col-xl-3 col-lg-4 theiaStickySidebar">
      <div className="card filter-sidebar mb-4 mb-lg-0">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5>{t("title")}</h5>
          <Link href={`/${locale}/visa`} className="fs-14 link-primary">
            {t("reset")}
          </Link>
        </div>
        <div className="card-body p-0">
          <form method="get" action={`/${locale}/visa`}>
            <div className="p-3 border-bottom">
              <label className="form-label fs-16" htmlFor="visa-q">
                {t("search")}
              </label>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal" />
                </span>
                <input
                  id="visa-q"
                  name="q"
                  type="search"
                  className="form-control"
                  placeholder={t("searchPlaceholder")}
                  defaultValue={filters.q ?? ""}
                />
              </div>
            </div>

            <div className="accordion accordion-list">
              <div className="accordion-item border-bottom p-3">
                <div className="accordion-header">
                  <div
                    className="accordion-button p-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#visa-price"
                    aria-expanded="true"
                    aria-controls="visa-price"
                    role="button"
                  >
                    <i className="isax isax-coin me-2 text-primary" />
                    {t("price")}
                  </div>
                </div>
                <div
                  id="visa-price"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
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
                </div>
              </div>

              <div className="accordion-item border-bottom p-3">
                <div className="accordion-header">
                  <div
                    className="accordion-button p-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#visa-processing"
                    aria-expanded="true"
                    aria-controls="visa-processing"
                    role="button"
                  >
                    <i className="isax isax-clock me-2 text-primary" />
                    {t("processing")}
                  </div>
                </div>
                <div
                  id="visa-processing"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <label className="form-label" htmlFor="visa-max-days">
                      {t("maxProcessingDays")}
                    </label>
                    <input
                      id="visa-max-days"
                      name="maxProcessingDays"
                      type="number"
                      min="1"
                      className="form-control"
                      defaultValue={filters.maxProcessingDays ?? ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3">
              <button type="submit" className="btn btn-primary w-100">
                {t("apply")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

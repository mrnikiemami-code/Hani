"use client";

import { useLocale, useTranslations } from "next-intl";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/hani/money";
import { useHomeFeed } from "./HomeFeedProvider";

export function HaniTrendingTours({
  scope
}: {
  scope?: "Domestic" | "Foreign";
}) {
  const feed = useHomeFeed();
  const t = useTranslations("common");
  const locale = useLocale();
  const activeScope =
    scope === "Domestic" ? "domestic" : scope === "Foreign" ? "foreign" : null;
  const tours = feed?.tours.items.slice(0, 4) ?? [];
  const allToursHref =
    activeScope === "domestic"
      ? "/tours?scope=domestic"
      : activeScope === "foreign"
        ? "/tours?scope=foreign"
        : "/tours";

  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="section recommended-sec">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div className="section-header-eight mb-0 wow fadeInUp">
            <h2>
              {t("trendingTours")}{" "}
              <ImageWithBasePath src="./assets/img/bg/heading-bg-03.png" alt="" />
            </h2>
          </div>
          <ul className="nav">
            <li>
              <Link
                href="/"
                className={`nav-link ${activeScope ? "" : "active"}`}
                aria-current={activeScope ? undefined : "page"}
              >
                {t("scopeAll")}
              </Link>
            </li>
            <li>
              <Link
                href="/?scope=domestic"
                className={`nav-link ${activeScope === "domestic" ? "active" : ""}`}
                aria-current={activeScope === "domestic" ? "page" : undefined}
              >
                {t("scopeDomestic")}
              </Link>
            </li>
            <li>
              <Link
                href="/?scope=foreign"
                className={`nav-link ${activeScope === "foreign" ? "active" : ""}`}
                aria-current={activeScope === "foreign" ? "page" : undefined}
              >
                {t("scopeForeign")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="row row-gap-4">
          {tours.map((tour, index) => (
            <div className="col-lg-3 col-md-6" key={tour.productId}>
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href={`/tour/tour-details?slug=${encodeURIComponent(tour.slug)}`}>
                    <ImageWithBasePath
                      src={
                        tour.coverImageUrl ??
                        `assets/img/destination/destination-${54 + index}.jpg`
                      }
                      loading="lazy" className="img-fluid"
                      alt={tour.title}
                    />
                  </Link>
                  <div className="fav-item fs-14">
                    <span className="me-2">
                      <i className="isax isax-calendar-tick me-1" />
                      {t("daysCount", { count: tour.durationDays })}
                    </span>
                    <span>
                      <i className="isax isax-profile-2user4 me-1" />
                      {t("offersCount", { count: tour.offerCount })}
                    </span>
                  </div>
                  <div className="recommended-amount">
                    <p className="text-white mb-1">{t("from")}</p>
                    <span className="text-white fs-18 fw-semibold">
                      {formatMoney(tour.minPrice, tour.currency, locale)}
                    </span>
                  </div>
                </div>
                <div className="recommended-content">
                  <div className="d-flex align-items-center gap-2 justify-content-center mb-3">
                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                      {tour.averageRating?.toFixed(1) ?? "-"}
                    </span>
                    <span className="fs-14 text-gray-5">
                      {t("reviewsCount", { count: tour.reviewCount })}
                    </span>
                  </div>
                  <div className="mb-1 home-eight-title text-dark">
                    <Link href={`/tour/tour-details?slug=${encodeURIComponent(tour.slug)}`}>
                      {tour.title}
                    </Link>
                  </div>
                  <span>{tour.destinationNames?.[0] ?? tour.agencyName ?? ""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href={allToursHref} className="btn btn-primary">
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}

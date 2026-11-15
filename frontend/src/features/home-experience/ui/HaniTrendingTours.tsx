"use client";

import { useLocale, useTranslations } from "next-intl";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/hani/money";
import { useHomeFeed } from "./HomeFeedProvider";

export function HaniTrendingTours() {
  const feed = useHomeFeed();
  const t = useTranslations("common");
  const locale = useLocale();
  const tours = feed?.tours.items.slice(0, 4) ?? [];

  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="section recommended-sec">
      <div className="container">
        <div className="section-header-eight wow fadeInUp">
          <h2>
            {t("trendingTours")}{" "}
            <ImageWithBasePath src="./assets/img/bg/heading-bg-03.png" alt="" />
          </h2>
        </div>
        <div className="row row-gap-4">
          {tours.map((tour, index) => (
            <div className="col-lg-3 col-md-6" key={tour.productId}>
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href={`/tour/tour-details?slug=${encodeURIComponent(tour.slug)}`}>
                    <ImageWithBasePath
                      src={`assets/img/destination/destination-${54 + index}.jpg`}
                      className="img-fluid"
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
      </div>
    </section>
  );
}

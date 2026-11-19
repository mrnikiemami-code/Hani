"use client";

import { useLocale, useTranslations } from "next-intl";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/hani/money";
import { useHomeFeed } from "./HomeFeedProvider";

export function HaniRecommendedVisas() {
  const feed = useHomeFeed();
  const t = useTranslations("common");
  const locale = useLocale();
  const visas = feed?.visas.slice(0, 4) ?? [];

  if (visas.length === 0) {
    return null;
  }

  return (
    <section className="section recommended-sec">
      <div className="container">
        <div className="section-header-eight wow fadeInUp">
          <h2>{t("popularVisas")}</h2>
        </div>
        <div className="row row-gap-4">
          {visas.map((visa, index) => (
            <div className="col-lg-3 col-md-6" key={visa.countryId}>
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href={`/visa/${encodeURIComponent(visa.slug)}`}>
                    <ImageWithBasePath
                      src={
                        visa.coverImageUrl ??
                        `assets/img/visa/visa-0${(index % 6) + 1}.jpg`
                      }
                      width={400}
                      height={260}
                      loading="lazy"
                      className="img-fluid"
                      alt={visa.name}
                    />
                  </Link>
                  <div className="recommended-amount">
                    <p className="text-white mb-1">{t("from")}</p>
                    <span className="text-white fs-18 fw-semibold">
                      {formatMoney(
                        visa.minimumPrice,
                        visa.minimumPriceCurrency,
                        locale
                      )}
                    </span>
                  </div>
                </div>
                <div className="recommended-content">
                  <div className="mb-1 home-eight-title text-dark">
                    <Link href={`/visa/${encodeURIComponent(visa.slug)}`}>
                      {visa.name}
                    </Link>
                  </div>
                  <span>
                    {visa.typeCount} {t("visa")}
                    {visa.processingDaysMin != null && visa.processingDaysMax != null
                      ? ` | ${t("processingTime", {
                          min: visa.processingDaysMin,
                          max: visa.processingDaysMax
                        })}`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

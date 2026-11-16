"use client";

import { useTranslations } from "next-intl";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { useHomeFeed } from "./HomeFeedProvider";

export function HaniOriginCities() {
  const feed = useHomeFeed();
  const t = useTranslations("common");
  const cities = feed?.originCities.slice(0, 4) ?? [];

  if (cities.length === 0) {
    return null;
  }

  return (
    <section className="section recommended-sec">
      <div className="container">
        <div className="section-header-eight wow fadeInUp">
          <h2>{t("toursByOrigin")}</h2>
        </div>
        <div className="row row-gap-4">
          {cities.map((city, index) => (
            <div className="col-lg-3 col-md-6" key={`${city.slug}-${index}`}>
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href={`/tours?origin=${encodeURIComponent(city.slug)}`}>
                    <ImageWithBasePath
                      src={`assets/img/destination/destination-${54 + index}.jpg`}
                      className="img-fluid"
                      alt={city.name}
                    />
                  </Link>
                </div>
                <div className="recommended-content">
                  <div className="mb-1 home-eight-title text-dark">
                    <Link href={`/tours?origin=${encodeURIComponent(city.slug)}`}>
                      {t("toursFrom", { city: city.name })}
                    </Link>
                  </div>
                  <span>{t("toursCount", { count: city.tourCount })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

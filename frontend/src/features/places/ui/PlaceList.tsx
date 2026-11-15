import { getTranslations } from "next-intl/server";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { getPlaces, type PlaceKind } from "../infrastructure/places-api";

export async function PlaceList({
  locale,
  kind,
  page = 1
}: {
  locale: string;
  kind: PlaceKind;
  page?: number;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const result = await getPlaces(locale, kind, page, 9);
  const title = kind === "restaurants" ? t("restaurants") : t("attractions");

  return (
    <section className="section">
      <div className="container">
        <div className="section-header-eight text-center mb-4">
          <h2>{title}</h2>
        </div>
        <div className="row row-gap-4">
          {result.items.map((place, index) => (
            <div className="col-xl-4 col-md-6 d-flex" key={place.placeId}>
              <div className="place-item common-grid-slider mb-4 flex-fill">
                <div className="place-img">
                  <Link href={`/${kind}/${encodeURIComponent(place.slug)}`}>
                    <ImageWithBasePath
                      src={`assets/img/destination/destination-${(index % 6) + 54}.jpg`}
                      className="img-fluid"
                      alt={place.name}
                    />
                  </Link>
                  <div className="fav-item">
                    <span className="badge bg-white text-dark d-inline-flex align-items-center">
                      {place.category}
                    </span>
                  </div>
                </div>
                <div className="place-content">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="d-flex align-items-center">
                      <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                        {place.averageRating?.toFixed(1) ?? "-"}
                      </span>
                      <p className="fs-14 mb-0">
                        ({t("reviewsCount", { count: place.reviewCount })})
                      </p>
                    </div>
                    {place.rankInCity ? (
                      <span className="fs-14">
                        {t("rankLabel")} {place.rankInCity}
                      </span>
                    ) : null}
                  </div>
                  <h5 className="mb-1 text-truncate">
                    <Link href={`/${kind}/${encodeURIComponent(place.slug)}`}>
                      {place.name}
                    </Link>
                  </h5>
                  <p className="d-flex align-items-center mb-3">
                    <i className="isax isax-location5 me-2" />
                    {place.cuisine ?? place.category}
                  </p>
                  <div className="d-flex align-items-center justify-content-between border-top pt-3">
                    <span className="fs-14">
                      {t("amenitiesCount", { count: place.amenityCount })}
                    </span>
                    <Link
                      href={`/${kind}/${encodeURIComponent(place.slug)}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      {t("view")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {result.items.length === 0 && (
            <div className="col-12">
              <p className="text-center text-gray-6">{t("noResults")}</p>
            </div>
          )}
        </div>
        {result.totalPages > 1 && (
          <nav className="pagination-nav mt-4">
            <ul className="pagination justify-content-center">
              {Array.from({ length: result.totalPages }, (_, index) => (
                <li
                  className={`page-item ${index + 1 === result.page ? "active" : ""}`}
                  key={index + 1}
                >
                  <Link className="page-link" href={`/${kind}?page=${index + 1}`}>
                    {index + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}

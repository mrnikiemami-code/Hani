import { getTranslations } from "next-intl/server";
import ImageWithBasePath from "@/components/image-with-base-path";
import { formatMoney } from "@/lib/hani/money";
import { getPlace, type PlaceKind } from "../infrastructure/places-api";

export async function PlaceDetail({
  locale,
  kind,
  slug
}: {
  locale: string;
  kind: PlaceKind;
  slug: string;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const place = await getPlace(locale, kind, slug);
  const name =
    place?.translations.find((item) => item.locale === locale)?.name ??
    place?.translations[0]?.name ??
    slug;

  if (!place) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-center text-gray-6">{t("noResults")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm overflow-hidden">
              <ImageWithBasePath
                src="assets/img/destination/destination-54.jpg"
                className="img-fluid w-100"
                alt={name}
              />
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                  <h2 className="mb-0">{name}</h2>
                  <span className="badge bg-primary">{place.category}</span>
                </div>
                <p className="text-gray-6 mb-2">
                  <i className="isax isax-location5 me-2" />
                  {place.cuisine ?? place.category}
                </p>
                <div className="d-flex align-items-center gap-3">
                  <span className="badge badge-warning text-gray-9">
                    {place.averageRating?.toFixed(1) ?? "-"}
                  </span>
                  <span>{t("reviewsCount", { count: place.reviewCount })}</span>
                  {place.rankInCity ? (
                    <span>
                      {t("rankLabel")} {place.rankInCity}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">{t("amenities")}</h5>
                <ul className="list-unstyled mb-0">
                  {place.amenities.map((amenity) => (
                    <li className="mb-2" key={amenity}>
                      <i className="isax isax-tick-circle text-primary me-2" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {place.menuItems.length > 0 && (
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h5 className="mb-3">{t("menu")}</h5>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <tbody>
                    {place.menuItems.map((item) => (
                      <tr key={`${item.section}-${item.name}`}>
                        <td>
                          <strong>{item.name}</strong>
                          <div className="text-gray-6 fs-14">
                            {item.section} · {item.description}
                          </div>
                        </td>
                        <td className="text-end">
                          {formatMoney(item.price, item.currency, locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

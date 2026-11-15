import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAgencies } from "../infrastructure/agency-api";

export async function AgencyList({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const result = await getAgencies(1, 12);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header-eight text-center mb-4">
          <h2>{t("agencies")}</h2>
        </div>
        <div className="row row-gap-4">
          {result.items.map((agency) => (
            <div className="col-xl-4 col-md-6 d-flex" key={agency.id}>
              <div className="place-item mb-4 flex-fill">
                <div className="place-content p-4">
                  <h5 className="mb-1">
                    <Link href={`/agencies/${encodeURIComponent(agency.slug)}`}>
                      {agency.name}
                    </Link>
                  </h5>
                  <p className="text-gray-6 mb-2">
                    <i className="isax isax-location5 me-2" />
                    {agency.city}
                    {agency.province ? ` · ${agency.province}` : ""}
                  </p>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="badge badge-warning text-gray-9">
                      {agency.averageRating?.toFixed(1) ?? "-"}
                    </span>
                    <span>{t("reviewsCount", { count: agency.reviewCount })}</span>
                  </div>
                  <div className="border-top pt-3 d-flex align-items-center justify-content-between">
                    <span>
                      {agency.approvedTourCount} {t("tours")}
                    </span>
                    <Link
                      href={`/agencies/${encodeURIComponent(agency.slug)}`}
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
      </div>
    </section>
  );
}

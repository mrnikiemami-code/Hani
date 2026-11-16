import { getTranslations } from "next-intl/server";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { getAgencyProfile } from "../infrastructure/agency-api";

export async function AgencyProfileView({
  locale,
  slug
}: {
  locale: string;
  slug: string;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const profile = await getAgencyProfile(slug);

  if (!profile) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-center text-gray-6">{t("noResults")}</p>
        </div>
      </section>
    );
  }

  const agency = profile.agency;

  return (
    <section className="section">
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4">
              <div>
                <h1 className="mb-2">{agency.name}</h1>
                <p className="text-gray-6 mb-0">
                  <i className="isax isax-location5 me-2" />
                  {agency.city}
                  {agency.province ? ` · ${agency.province}` : ""}
                </p>
              </div>
              <div className="text-end">
                <span className="badge badge-warning text-gray-9 fs-16">
                  {agency.averageRating?.toFixed(1) ?? "-"}
                </span>
                <p className="mb-0 mt-1">
                  {t("reviewsCount", { count: agency.reviewCount })}
                </p>
              </div>
            </div>

            {agency.about ? <p className="text-gray-7">{agency.about}</p> : null}

            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("license")}</div>
                  <strong>{agency.licenseNo}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("memberSince")}</div>
                  <strong>
                    {formatIsoInstant(agency.memberSince, locale, {
                      dateStyle: "medium"
                    })}
                  </strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("manager")}</div>
                  <strong>{agency.managerName ?? "-"}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("staff")}</div>
                  <strong>{agency.staffCount ?? "-"}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("approvedTours")}</div>
                  <strong>
                    {profile.approvedTourCount} {t("tours")}
                  </strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("website")}</div>
                  <strong>{agency.website ?? "-"}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("contact")}</div>
                  <strong>{agency.contactPhone ?? agency.contactEmail ?? "-"}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <div className="text-gray-6">{t("location")}</div>
                  <strong>{agency.address ?? agency.city}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

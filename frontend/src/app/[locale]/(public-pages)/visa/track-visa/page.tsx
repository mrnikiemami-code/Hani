import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { trackVisaApplication } from "@/features/visa/infrastructure/visa-detail-api";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visaTrack" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function TrackVisaPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ number?: string; contact?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "visaTrack" });
  const number = query.number?.trim();
  const contact = query.contact?.trim();
  const application =
    number && contact ? await trackVisaApplication(number, contact) : null;

  return (
    <div className="content">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header">
                <h3 className="h5 mb-0">{t("title")}</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-6">{t("subtitle")}</p>
                <form method="get" action={`/${locale}/visa/track-visa`}>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-5">
                      <label className="form-label" htmlFor="track-number">
                        {t("applicationNumber")}
                      </label>
                      <input
                        id="track-number"
                        name="number"
                        className="form-control"
                        dir="ltr"
                        defaultValue={number ?? ""}
                        placeholder="VSA-XXXXXXXXXXXX"
                        required
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="form-label" htmlFor="track-contact">
                        {t("contact")}
                      </label>
                      <input
                        id="track-contact"
                        name="contact"
                        className="form-control"
                        dir="ltr"
                        defaultValue={contact ?? ""}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <button type="submit" className="btn btn-primary w-100">
                        {t("track")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {number && contact && !application ? (
              <div className="alert alert-warning">{t("notFound")}</div>
            ) : null}

            {application ? (
              <div className="card border-0 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="h6 mb-0" dir="ltr">
                    {application.applicationNumber}
                  </h4>
                  <span className="badge badge-soft-info rounded-pill">
                    {application.status}
                  </span>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    {[
                      [t("applicant"), application.applicantName],
                      [t("passport"), application.passportNo],
                      [t("nationality"), application.nationality],
                      [t("email"), application.contactEmail],
                      [t("phone"), application.contactPhone],
                      [
                        t("travelDate"),
                        application.travelDate
                          ? formatIsoDate(application.travelDate, locale, "short")
                          : "—"
                      ],
                      [
                        t("submittedAt"),
                        formatIsoInstant(application.createdAt, locale, {
                          dateStyle: "medium",
                          timeStyle: "short"
                        })
                      ],
                      [
                        t("updatedAt"),
                        application.updatedAt
                          ? formatIsoInstant(application.updatedAt, locale, {
                              dateStyle: "medium",
                              timeStyle: "short"
                            })
                          : "—"
                      ]
                    ].map(([label, value]) => (
                      <div className="col-md-6" key={label}>
                        <span className="fs-12 text-gray-6 d-block">{label}</span>
                        <strong className="fs-14" dir="auto">
                          {value}
                        </strong>
                      </div>
                    ))}
                  </div>
                  {application.rejectionReason ? (
                    <div className="alert alert-danger mt-3 mb-0">
                      {application.rejectionReason}
                    </div>
                  ) : null}
                  {application.documents.length > 0 ? (
                    <div className="mt-3">
                      <span className="fs-12 text-gray-6 d-block mb-1">
                        {t("documents")}
                      </span>
                      <ul className="mb-0">
                        {application.documents.map((document, index) => (
                          <li key={`${document}-${index}`}>
                            <a
                              href={document}
                              target="_blank"
                              rel="noopener noreferrer"
                              dir="ltr"
                            >
                              {t("document", { number: index + 1 })}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="card-footer bg-white">
                  <Link href="/visa" className="btn btn-light">
                    {t("back")}
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

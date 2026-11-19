import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { getVisaApplication } from "@/features/visa/infrastructure/visa-detail-api";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visaApplication" });
  return { title: t("confirmationTitle"), robots: { index: false, follow: false } };
}

export default async function VisaConfirmationPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ application?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "visaApplication" });
  const application = query.application
    ? await getVisaApplication(query.application)
    : null;
  if (!application) notFound();

  return (
    <div className="content">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="text-center mb-4">
                  <span className="badge badge-success rounded-pill mb-2">
                    {t("submitted")}
                  </span>
                  <h3 className="mb-1" dir="ltr">
                    {application.applicationNumber}
                  </h3>
                  <p className="text-gray-6 mb-0">{t("confirmationHint")}</p>
                </div>
                <div className="row g-3">
                  {[
                    [t("applicantName"), application.applicantName],
                    [t("passportNo"), application.passportNo],
                    [t("nationality"), application.nationality],
                    [t("email"), application.contactEmail],
                    [t("phone"), application.contactPhone],
                    [
                      t("travelDate"),
                      application.travelDate
                        ? formatIsoDate(application.travelDate, locale, "short")
                        : "—"
                    ],
                    [t("status"), application.status],
                    [
                      t("submittedAt"),
                      formatIsoInstant(application.createdAt, locale, {
                        dateStyle: "medium",
                        timeStyle: "short"
                      })
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
              </div>
              <div className="card-footer bg-white d-flex gap-2 flex-wrap">
                <Link href="/visa" className="btn btn-light">
                  {t("backToVisas")}
                </Link>
                <Link href="/user/customer-visa-booking" className="btn btn-primary">
                  {t("myVisas")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

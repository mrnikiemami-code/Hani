import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminAgencyDetail } from "@/features/home-experience/domain/admin-agency-detail";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { AgencyReviewActions } from "@/features/home-experience/ui/AgencyReviewActions";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminAgencies" });
  return { title: t("detailTitle"), robots: { index: false, follow: false } };
}

export default async function AdminAgencyDetailPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminAgencies" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminAgencyDetail>(
    `/internal/v1/agencies/${id}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("detailTitle")}
        activeSection="agencies"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  if (result.status === 404 || !result.data) notFound();
  const agency = result.data;

  return (
    <AdminPageShell
      locale={locale}
      title={`${t("detailTitle")} — ${agency.name}`}
      subtitle={`/${agency.slug}`}
      active={t("detailTitle")}
      activeSection="agencies"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h2 className="h5 mb-1">{agency.name}</h2>
            <p className="fs-13 text-gray-6 mb-0">
              {agency.licenseNo} · {agency.city} · {agency.status}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link href="/admin/agencies" className="btn btn-light btn-sm">
              {t("back")}
            </Link>
            <AgencyReviewActions agencyId={agency.id} status={agency.status} />
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              [t("license"), agency.licenseNo],
              [t("licenseType"), agency.licenseType ?? "—"],
              [t("city"), agency.city],
              [t("province"), agency.province ?? "—"],
              [t("managerName"), agency.managerName ?? "—"],
              [t("staffCount"), agency.staffCount?.toString() ?? "—"],
              [t("contactEmail"), agency.contactEmail ?? "—"],
              [t("contactPhone"), agency.contactPhone ?? "—"],
              [t("website"), agency.website ?? "—"],
              [
                t("subscription"),
                agency.subscriptionValidUntil
                  ? formatIsoDate(agency.subscriptionValidUntil, locale, "medium")
                  : "—"
              ],
              [
                t("submittedAt"),
                agency.submittedAt
                  ? formatIsoInstant(agency.submittedAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })
                  : "—"
              ],
              [
                t("reviewedAt"),
                agency.reviewedAt
                  ? formatIsoInstant(agency.reviewedAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })
                  : "—"
              ]
            ].map(([label, value]) => (
              <div className="col-md-4" key={label}>
                <span className="fs-12 text-gray-6 d-block">{label}</span>
                <strong className="fs-14 text-break" dir="auto">
                  {value}
                </strong>
              </div>
            ))}
          </div>
          {agency.rejectionReason && (
            <div className="alert alert-warning mt-3 mb-0">
              {t("rejectReason")}: {agency.rejectionReason}
            </div>
          )}
          {agency.about && (
            <p className="fs-14 text-gray-6 mt-3 mb-0">{agency.about}</p>
          )}
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("documents")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("documentType")}</th>
                <th>{t("documentStatus")}</th>
                <th className="d-none d-md-table-cell">{t("uploadedAt")}</th>
                <th className="text-end">{t("document")}</th>
              </tr>
            </thead>
            <tbody>
              {agency.documents.map((document) => (
                <tr key={document.documentId}>
                  <td>{document.type}</td>
                  <td>{document.status}</td>
                  <td className="d-none d-md-table-cell">
                    {formatIsoInstant(document.uploadedAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td className="text-end">
                    <a
                      href={document.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-light btn-sm"
                    >
                      {t("openDocument")}
                    </a>
                  </td>
                </tr>
              ))}
              {agency.documents.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-6 py-4">
                    {t("noDocuments")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("contract")}</h2>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <span className="fs-12 text-gray-6 d-block">{t("licenseFile")}</span>
              {agency.licenseFileUrl ? (
                <a
                  href={agency.licenseFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-primary"
                >
                  {t("openDocument")}
                </a>
              ) : (
                <strong>—</strong>
              )}
            </div>
            <div className="col-md-4">
              <span className="fs-12 text-gray-6 d-block">{t("licenseIssuedAt")}</span>
              <strong>
                {agency.licenseIssuedAt
                  ? formatIsoDate(agency.licenseIssuedAt, locale, "medium")
                  : "—"}
              </strong>
            </div>
            <div className="col-md-4">
              <span className="fs-12 text-gray-6 d-block">{t("address")}</span>
              <strong className="text-break">{agency.address ?? "—"}</strong>
            </div>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}

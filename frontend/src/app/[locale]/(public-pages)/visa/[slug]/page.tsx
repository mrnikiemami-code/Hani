import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/hani/money";
import { getVisaBySlug } from "@/features/visa/infrastructure/visa-detail-api";
import { routing } from "@/i18n/routing";
import { VisaStructuredData } from "@/features/visa/ui/VisaStructuredData";
import { absoluteUrl } from "@/lib/hani/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const visa = await getVisaBySlug(locale, slug);
  return {
    title: visa ? `${visa.name} | Hani` : "Hani",
    description: visa?.description ?? undefined,
    alternates: visa
      ? {
          canonical: absoluteUrl(`/${locale}/visa/${visa.slug}`),
          languages: Object.fromEntries(
            routing.locales.map((item) => [
              item,
              absoluteUrl(`/${item}/visa/${visa.slug}`)
            ])
          )
        }
      : undefined,
    robots: { index: true, follow: true }
  };
}

export default async function VisaDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "visaDetail" });
  const visa = await getVisaBySlug(locale, slug);
  if (!visa) notFound();
  const firstType = visa.types[0];

  return (
    <>
      <VisaStructuredData
        locale={locale}
        slug={visa.slug}
        name={visa.name}
        description={visa.description}
        types={visa.types.map((type) => ({
          code: type.code,
          priceAdult: type.priceAdult,
          currency: type.currency,
          faqs: type.faqs
        }))}
      />
      <Breadcrumb
        title={visa.name}
        breadcrumbs={[
          { label: t("home"), link: "/", active: false },
          { label: t("visas"), link: "/visa", active: false },
          { label: visa.name, active: true }
        ]}
        backgroundClass="breadcrumb-bg-04"
      />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <div>
                      <h3 className="mb-1">{visa.name}</h3>
                      <span className="badge badge-soft-info rounded-pill">
                        {visa.countryCode}
                      </span>
                    </div>
                    {firstType && (
                      <Link
                        href={`/visa/visa-application?slug=${encodeURIComponent(visa.slug)}`}
                        className="btn btn-primary"
                      >
                        {t("apply")}
                      </Link>
                    )}
                  </div>
                  {visa.description && (
                    <p className="text-gray-6 mt-3 mb-0" style={{ whiteSpace: "pre-line" }}>
                      {visa.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header">
                  <h5 className="mb-0">{t("types")}</h5>
                </div>
                <div className="card-body p-0 table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>{t("type")}</th>
                        <th>{t("entry")}</th>
                        <th>{t("issuance")}</th>
                        <th>{t("processing")}</th>
                        <th>{t("validity")}</th>
                        <th>{t("adult")}</th>
                        <th>{t("child")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visa.types.map((type) => (
                        <tr key={type.visaTypeId}>
                          <td className="fw-medium">{type.code}</td>
                          <td>{type.entryType}</td>
                          <td>{type.issuanceType}</td>
                          <td>
                            {type.processingDaysMin}–{type.processingDaysMax} {t("days")}
                          </td>
                          <td>{type.validityDays} {t("days")}</td>
                          <td>{formatMoney(type.priceAdult, type.currency, locale)}</td>
                          <td>
                            {type.priceChild == null
                              ? "—"
                              : formatMoney(type.priceChild, type.currency, locale)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {firstType?.documents.length ? (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">{t("documents")}</h5>
                  </div>
                  <div className="card-body">
                    <ul className="mb-0">
                      {firstType.documents.map((document) => (
                        <li key={`${document.category}-${document.name}`}>
                          <strong>{document.name}</strong>
                          <span className="text-gray-6"> — {document.category}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {firstType?.steps.length ? (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">{t("steps")}</h5>
                  </div>
                  <div className="card-body">
                    <ol className="mb-0">
                      {firstType.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="col-xl-4">
              {firstType && (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">{t("startApplication")}</h5>
                  </div>
                  <div className="card-body">
                    <p className="fs-14 text-gray-6">
                      {t("startHint", { country: visa.name })}
                    </p>
                    <Link
                      href={`/visa/visa-application?slug=${encodeURIComponent(visa.slug)}`}
                      className="btn btn-primary w-100"
                    >
                      {t("apply")}
                    </Link>
                  </div>
                </div>
              )}
              {firstType?.faqs.length ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">{t("faq")}</h5>
                  </div>
                  <div className="card-body">
                    {firstType.faqs.map((faq) => (
                      <div className="mb-3" key={faq.question}>
                        <strong className="fs-14 d-block">{faq.question}</strong>
                        <span className="fs-13 text-gray-6">{faq.answer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

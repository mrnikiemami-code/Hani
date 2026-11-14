import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { VisaCountry } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function VisaDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const visa = await apiGet<VisaCountry>(`/market/v1/visas/${slug}?locale=${locale}`);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!visa ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <>
              <h1>{visa.name}</h1>
              <p>{visa.description}</p>
              <div className="grid">
                {visa.types.map((type) => (
                  <article className="card" key={type.visaTypeId}>
                    <h3>{type.code}</h3>
                    <div className="muted">
                      {type.entryType} · {type.issuanceType} · {type.processingDaysMin}-
                      {type.processingDaysMax} days
                    </div>
                    <div className="price">
                      {formatMoney(type.priceAdult, type.currency)}
                      {type.priceChild != null
                        ? ` / child ${formatMoney(type.priceChild, type.currency)}`
                        : ""}
                    </div>
                    <ul>
                      {type.documents.map((document) => (
                        <li className="muted" key={`${type.visaTypeId}-${document.name}`}>
                          {document.name} ({document.category})
                        </li>
                      ))}
                    </ul>
                    {type.relatedArticleSlugs.length > 0 && (
                      <div className="muted">Guides: {type.relatedArticleSlugs.join(", ")}</div>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

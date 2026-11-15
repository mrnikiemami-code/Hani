import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { VisaSummary } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function VisaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const visas = (await apiGet<VisaSummary[]>(`/market/v1/visas?locale=${locale}`)) ?? [];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("visa")}</h1>
          <div className="grid">
            {visas.map((visa) => (
              <Link className="card" key={visa.countryId} href={`/visa/${visa.slug}`}>
                <h3>{visa.name}</h3>
                <div className="muted">{visa.typeCount} types</div>
                <div className="price">
                  {t("from")}{" "}
                  {formatMoney(visa.minimumPrice, visa.minimumPriceCurrency, locale)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

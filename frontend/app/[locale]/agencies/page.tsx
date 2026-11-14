import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { AgencyDirectoryPage } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function AgenciesPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ city?: string; q?: string; page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const page = Math.max(1, Number(query.page ?? "1"));
  const data = await apiGet<AgencyDirectoryPage>(
    `/market/v1/agencies?page=${page}&pageSize=20` +
      `&city=${encodeURIComponent(query.city ?? "")}` +
      `&q=${encodeURIComponent(query.q ?? "")}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("agencies")}</h1>
          <form className="filters" action={`/${locale}/agencies`}>
            <input className="input" name="city" defaultValue={query.city ?? ""} placeholder="city" />
            <input className="input" name="q" defaultValue={query.q ?? ""} placeholder={t("search")} />
            <button className="button" type="submit">
              {t("search")}
            </button>
          </form>
          <div className="grid">
            {(data?.items ?? []).map((agency) => (
              <Link className="card" key={agency.id} href={`/agencies/${agency.slug}`}>
                <h3>{agency.name}</h3>
                <div className="muted">
                  {agency.city} {agency.province ? `· ${agency.province}` : ""}
                </div>
                <div className="muted">
                  {agency.averageRating ?? "—"} / 5 · {agency.reviewCount} reviews
                </div>
                <div className="badge">{agency.approvedTourCount} tours</div>
              </Link>
            ))}
          </div>
          {!data?.items.length && <p className="muted">{t("noResults")}</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

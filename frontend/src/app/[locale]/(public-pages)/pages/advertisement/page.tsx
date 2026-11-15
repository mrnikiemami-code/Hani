import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AdvertisementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  return (
    <section className="section">
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5 text-center">
            <h1 className="mb-3">{t("advertisement")}</h1>
            <p className="text-gray-6 mb-4">{t("advertisementDescription")}</p>
            <Link className="btn btn-primary" href="/pages/contact-us">{t("contactUs")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

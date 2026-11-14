import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("login")}</h1>
          <p className="muted">
            OTP login is available through <code>POST /market/v1/auth/otp/request</code> and
            <code>POST /market/v1/auth/otp/verify</code>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

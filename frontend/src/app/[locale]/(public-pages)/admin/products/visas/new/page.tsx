import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { VisaCountryForm } from "@/features/home-experience/ui/VisaCountryForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminVisas" });
  return { title: t("createCountry"), robots: { index: false, follow: false } };
}

export default async function NewVisaCountryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminVisas" });

  return (
    <AdminPageShell
      locale={locale}
      title={t("createCountry")}
      subtitle={t("createSubtitle")}
      active={t("createCountry")}
      activeSection="products"
      activeChild="visas"
    >
      <VisaCountryForm />
    </AdminPageShell>
  );
}

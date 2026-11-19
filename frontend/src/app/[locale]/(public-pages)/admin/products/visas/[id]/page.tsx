import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminVisaCountryDetail } from "@/features/home-experience/domain/admin-visa";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { VisaCountryForm } from "@/features/home-experience/ui/VisaCountryForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminVisas" });
  return { title: t("editCountry"), robots: { index: false, follow: false } };
}

export default async function EditVisaPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminVisas" });
  const result = await sessionGet<AdminVisaCountryDetail>(
    `/internal/v1/admin/catalog/visas/${encodeURIComponent(id)}`
  );
  if (!result.data) notFound();

  return (
    <AdminPageShell
      locale={locale}
      title={t("editCountry")}
      subtitle={t("editSubtitle")}
      active={t("editCountry")}
      activeSection="products"
      activeChild="visas"
    >
      <VisaCountryForm initial={result.data} edit />
    </AdminPageShell>
  );
}

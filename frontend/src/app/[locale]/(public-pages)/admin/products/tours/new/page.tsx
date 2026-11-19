import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { TourForm } from "@/features/home-experience/ui/TourForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminTours" });
  return { title: t("createTitle"), robots: { index: false, follow: false } };
}

export default async function NewTourPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminTours" });

  return (
    <AdminPageShell
      locale={locale}
      title={t("createTitle")}
      subtitle={t("createSubtitle")}
      active={t("createTitle")}
      activeSection="products"
      activeChild="tours"
    >
      <TourForm />
    </AdminPageShell>
  );
}

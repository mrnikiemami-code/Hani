import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminTourDetail } from "@/features/home-experience/domain/admin-tour";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { TourForm } from "@/features/home-experience/ui/TourForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminTours" });
  return { title: t("editTitle"), robots: { index: false, follow: false } };
}

export default async function EditTourPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminTours" });
  const result = await sessionGet<AdminTourDetail>(
    `/internal/v1/admin/catalog/tours/${encodeURIComponent(id)}`
  );
  if (!result.data) notFound();

  return (
    <AdminPageShell
      locale={locale}
      title={t("editTitle")}
      subtitle={t("editSubtitle")}
      active={t("editTitle")}
      activeSection="products"
      activeChild="tours"
    >
      <TourForm initial={result.data} edit />
    </AdminPageShell>
  );
}

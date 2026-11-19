import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminFlightRouteDetail } from "@/features/home-experience/domain/admin-flight";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { FlightRouteForm } from "@/features/home-experience/ui/FlightRouteForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminFlights" });
  return { title: t("editRoute"), robots: { index: false, follow: false } };
}

export default async function EditFlightPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminFlights" });
  const result = await sessionGet<AdminFlightRouteDetail>(
    `/internal/v1/admin/catalog/flights/routes/${encodeURIComponent(id)}`
  );
  if (!result.data) notFound();

  return (
    <AdminPageShell
      locale={locale}
      title={t("editRoute")}
      subtitle={t("editSubtitle")}
      active={t("editRoute")}
      activeSection="products"
      activeChild="flights"
    >
      <FlightRouteForm initial={result.data} edit />
    </AdminPageShell>
  );
}

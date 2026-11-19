import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { FlightRouteForm } from "@/features/home-experience/ui/FlightRouteForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminFlights" });
  return { title: t("createRoute"), robots: { index: false, follow: false } };
}

export default async function NewFlightRoutePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminFlights" });

  return (
    <AdminPageShell
      locale={locale}
      title={t("createRoute")}
      subtitle={t("createSubtitle")}
      active={t("createRoute")}
      activeSection="products"
      activeChild="flights"
    >
      <FlightRouteForm />
    </AdminPageShell>
  );
}

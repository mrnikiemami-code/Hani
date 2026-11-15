import { getPageMetadata } from "@/config/metadata";
import { setRequestLocale } from "next-intl/server";
import { searchVisas } from "@/features/visa/infrastructure/visa-api";
import VisaGridClient from "./visaGridClient";

export const generateMetadata = () => getPageMetadata("Visa Grid");

export default async function VisaGridPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const visas = await searchVisas(locale);

  return <VisaGridClient visas={visas} locale={locale} />;
}

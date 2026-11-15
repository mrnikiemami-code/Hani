import { setRequestLocale } from "next-intl/server";
import { AgencyList } from "@/features/agencies/ui/AgencyList";

export default async function AgenciesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AgencyList locale={locale} />;
}

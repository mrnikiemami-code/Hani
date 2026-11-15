import { setRequestLocale } from "next-intl/server";
import { ContentList } from "@/features/content/ui/ContentList";

export default async function ItinerariesPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  return <ContentList locale={locale} kind="itineraries" page={Math.max(1, Number(query.page ?? "1"))} />;
}

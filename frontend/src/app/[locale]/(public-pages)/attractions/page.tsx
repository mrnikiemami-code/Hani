import { setRequestLocale } from "next-intl/server";
import { PlaceList } from "@/features/places/ui/PlaceList";

export default async function AttractionsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  return <PlaceList locale={locale} kind="attractions" page={Math.max(1, Number(query.page ?? "1"))} />;
}

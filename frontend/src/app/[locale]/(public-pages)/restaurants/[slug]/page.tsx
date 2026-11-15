import { setRequestLocale } from "next-intl/server";
import { PlaceDetail } from "@/features/places/ui/PlaceDetail";

export default async function RestaurantDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <PlaceDetail locale={locale} kind="restaurants" slug={slug} />;
}

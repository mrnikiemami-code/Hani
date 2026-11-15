import { getPageMetadata } from "@/config/metadata";
import { setRequestLocale } from "next-intl/server";
import { searchHotels } from "@/features/hotels/infrastructure/hotels-api";
import HotelGridClient from "./hotelGridClient";

export const generateMetadata = () => getPageMetadata("Hotel Grid");

export default async function HotelGridPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; sortBy?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const page = Math.max(1, Number(query.page ?? "1"));
  const result = await searchHotels(locale, page, 9, query.sortBy ?? "newest");

  return (
    <HotelGridClient
      hotels={result.items}
      totalCount={result.totalCount}
      page={result.page}
      locale={locale}
    />
  );
}

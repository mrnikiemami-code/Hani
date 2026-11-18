import { getPageMetadata } from "@/config/metadata";
import { setRequestLocale } from "next-intl/server";
import { getHotelFacets, searchHotels } from "@/features/hotels/infrastructure/hotels-api";
import HotelGridClient from "./hotelGridClient";

export const generateMetadata = () => getPageMetadata("Hotel Grid");

export default async function HotelGridPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    q?: string;
    minStars?: string;
    amenity?: string;
  }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const page = Math.max(1, Number(query.page ?? "1"));
  const filters = {
    q: query.q?.trim() ?? "",
    minStars: query.minStars ?? "",
    amenity: query.amenity ?? ""
  };
  const [result, facets] = await Promise.all([
    searchHotels(locale, page, 9, query.sortBy ?? "newest", {
      q: filters.q || undefined,
      minStars: filters.minStars ? Number(filters.minStars) : undefined,
      amenity: filters.amenity || undefined
    }),
    getHotelFacets()
  ]);

  return (
    <HotelGridClient
      hotels={result.items}
      totalCount={result.totalCount}
      page={result.page}
      locale={locale}
      facets={facets}
      filters={filters}
    />
  );
}

"use client";

import dynamic from "next/dynamic";
import type { HotelSearchItem } from "@/features/hotels/domain/hotel-search";
import type { HotelFacets } from "@/features/hotels/infrastructure/hotels-api";

const HotelGridView = dynamic(() => import("@/views/hotel/hotel-grid/hotelGrid"), {
  ssr: false
});

export default function HotelGridClient({
  hotels,
  totalCount,
  page,
  locale,
  facets,
  filters
}: {
  hotels: HotelSearchItem[];
  totalCount: number;
  page: number;
  locale: string;
  facets: HotelFacets | null;
  filters: { q: string; minStars: string; amenity: string };
}) {
  return (
    <HotelGridView
      hotels={hotels}
      totalCount={totalCount}
      page={page}
      locale={locale}
      facets={facets}
      filters={filters}
    />
  );
}

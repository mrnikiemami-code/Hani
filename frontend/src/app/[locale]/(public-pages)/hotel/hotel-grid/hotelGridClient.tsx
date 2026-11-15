"use client";

import dynamic from "next/dynamic";
import type { HotelSearchItem } from "@/features/hotels/domain/hotel-search";

const HotelGridView = dynamic(() => import("@/views/hotel/hotel-grid/hotelGrid"), {
  ssr: false
});

export default function HotelGridClient({
  hotels,
  totalCount,
  page,
  locale
}: {
  hotels: HotelSearchItem[];
  totalCount: number;
  page: number;
  locale: string;
}) {
  return (
    <HotelGridView
      hotels={hotels}
      totalCount={totalCount}
      page={page}
      locale={locale}
    />
  );
}

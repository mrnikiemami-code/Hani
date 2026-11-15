"use client";

import dynamic from "next/dynamic";

const HotelListView = dynamic(() => import("@/views/hotel/hotel-list/hotelList"), { ssr: false });

export default function HotelListClient() {
  return <HotelListView />;
}

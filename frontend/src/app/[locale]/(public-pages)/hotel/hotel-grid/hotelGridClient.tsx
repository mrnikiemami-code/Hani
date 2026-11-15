"use client";

import dynamic from "next/dynamic";

const HotelGridView = dynamic(() => import("@/views/hotel/hotel-grid/hotelGrid"), { ssr: false });

export default function HotelGridClient() {
  return <HotelGridView />;
}

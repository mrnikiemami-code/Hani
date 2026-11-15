"use client";

import dynamic from "next/dynamic";

const HotelDetailsView = dynamic(() => import("@/views/hotel/hotel-details/hotelDetails"), { ssr: false });

export default function HotelDetailsClient() {
  return <HotelDetailsView />;
}

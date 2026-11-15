"use client";

import dynamic from "next/dynamic";

const HotelMapView = dynamic(() => import("@/views/hotel/hotel-map/hotelMap"), { ssr: false });

export default function HotelMapClient() {
  return <HotelMapView />;
}

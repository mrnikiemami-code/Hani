"use client";

import dynamic from "next/dynamic";

const HotelRoomSelectionView = dynamic(() => import("@/views/hotel/hotel-room-selection/hotelRoomSelection"), { ssr: false });

export default function HotelRoomSelectionClient() {
  return <HotelRoomSelectionView />;
}

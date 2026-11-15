"use client";

import dynamic from "next/dynamic";

const HotelBookingView = dynamic(() => import("@/views/hotel/hotel-booking/hotelBooking"), { ssr: false });

export default function HotelBookingClient() {
  return <HotelBookingView />;
}

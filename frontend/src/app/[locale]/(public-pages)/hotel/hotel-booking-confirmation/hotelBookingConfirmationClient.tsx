"use client";

import dynamic from "next/dynamic";

const HotelBookingConfirmationView = dynamic(() => import("@/views/hotel/hotel-booking-confirmation/hotelBookingConfirmation"), { ssr: false });

export default function HotelBookingConfirmationClient() {
  return <HotelBookingConfirmationView />;
}

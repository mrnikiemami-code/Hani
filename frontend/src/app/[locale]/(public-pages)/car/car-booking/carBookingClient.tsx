"use client";

import dynamic from "next/dynamic";

const CarBookingView = dynamic(() => import("@/views/car/car-booking/carBooking"), { ssr: false });

export default function CarBookingClient() {
  return <CarBookingView />;
}

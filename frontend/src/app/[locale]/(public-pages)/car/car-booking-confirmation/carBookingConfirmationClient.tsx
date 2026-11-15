"use client";

import dynamic from "next/dynamic";

const CarBookingConfirmationView = dynamic(() => import("@/views/car/car-booking-confirmation/carBookingConfirmation"), { ssr: false });

export default function CarBookingConfirmationClient() {
  return <CarBookingConfirmationView />;
}

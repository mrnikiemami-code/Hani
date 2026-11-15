"use client";

import dynamic from "next/dynamic";

const TourBookingView = dynamic(() => import("@/views/tour/tour-booking/tourBooking"), { ssr: false });

export default function TourBookingClient() {
  return <TourBookingView />;
}

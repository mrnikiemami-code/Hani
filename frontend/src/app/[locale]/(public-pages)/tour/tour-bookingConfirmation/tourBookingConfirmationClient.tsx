"use client";

import dynamic from "next/dynamic";

const TourBookingConfirmationView = dynamic(() => import("@/views/tour/tour-booking-confirmation/tourBookingConfirmation"), { ssr: false });

export default function TourBookingConfirmationClient() {
  return <TourBookingConfirmationView />;
}

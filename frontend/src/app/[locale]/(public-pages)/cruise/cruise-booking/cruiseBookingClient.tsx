"use client";

import dynamic from "next/dynamic";

const CruiseBookingView = dynamic(() => import("@/views/cruise/cruise-booking/cruiseBooking"), { ssr: false });

export default function CruiseBookingClient() {
  return <CruiseBookingView />;
}

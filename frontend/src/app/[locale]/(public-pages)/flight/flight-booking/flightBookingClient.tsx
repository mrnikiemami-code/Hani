"use client";

import dynamic from "next/dynamic";

const FlightBookingView = dynamic(() => import("@/views/flight/flight-booking/flightBooking"), { ssr: false });

export default function FlightBookingClient() {
  return <FlightBookingView />;
}

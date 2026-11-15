"use client";

import dynamic from "next/dynamic";

const FlightBookingConfirmationView = dynamic(() => import("@/views/flight/flight-booking-confirmation/flightBookingConfirmation"), { ssr: false });

export default function FlightBookingConfirmationClient() {
  return <FlightBookingConfirmationView />;
}

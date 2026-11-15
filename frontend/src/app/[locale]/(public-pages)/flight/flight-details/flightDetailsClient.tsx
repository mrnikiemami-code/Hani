"use client";

import dynamic from "next/dynamic";

const FlightDetailsView = dynamic(() => import("@/views/flight/flight-details/flightDetails"), { ssr: false });

export default function FlightDetailsClient() {
  return <FlightDetailsView />;
}

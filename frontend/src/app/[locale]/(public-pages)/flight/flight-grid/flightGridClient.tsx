"use client";

import dynamic from "next/dynamic";

const FlightGridView = dynamic(() => import("@/views/flight/flight-grid/flightGrid"), { ssr: false });

export default function FlightGridClient() {
  return <FlightGridView />;
}

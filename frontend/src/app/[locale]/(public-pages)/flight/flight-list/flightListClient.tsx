"use client";

import dynamic from "next/dynamic";

const FlightListView = dynamic(() => import("@/views/flight/flight-list/flightList"), { ssr: false });

export default function FlightListClient() {
  return <FlightListView />;
}

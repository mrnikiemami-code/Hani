"use client";

import dynamic from "next/dynamic";

const FlightSeatSelectionView = dynamic(() => import("@/views/flight/flight-seat-selection/flightSeatSelection"), { ssr: false });

export default function FlightSeatSelectionClient() {
  return <FlightSeatSelectionView />;
}

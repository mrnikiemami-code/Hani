"use client";

import dynamic from "next/dynamic";

const AddFlightView = dynamic(() => import("@/views/flight/addFlight"), { ssr: false });

export default function AddFlightClient() {
  return <AddFlightView />;
}

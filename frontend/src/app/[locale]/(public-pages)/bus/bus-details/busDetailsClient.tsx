"use client";

import dynamic from "next/dynamic";

const BusDetailsView = dynamic(() => import("@/views/bus/bus-details/busDetails"), { ssr: false });

export default function BusDetailsClient() {
  return <BusDetailsView />;
}
